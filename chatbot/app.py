"""FastAPI entrypoint for the Magistrum chatbot.

Booking flow is stateful: the server remembers which field it just asked the
user for, and parses the next reply against that field first. If the reply
doesn't validate, the bot returns a clear correction prompt rather than
repeating itself.
"""
import _ssl_patch  # noqa: F401 (must be first)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import Optional
import asyncio
import json

from config import config
from services import llm, mongo, brevo, booking
from rag.chain import build_messages

app = FastAPI(title="Magistrum Chatbot", version="0.3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


SESSIONS: dict[str, dict] = {}


def session(sid: str) -> dict:
    if sid not in SESSIONS:
        SESSIONS[sid] = {
            "history": [],
            "booking": {},
            "in_booking_flow": False,
            "asked_field": None,        # which field we just asked for
            "field_attempts": {},        # field -> retry count
            "turn_count": 0,
            "last_save_at": 0,
        }
    return SESSIONS[sid]


class ChatRequest(BaseModel):
    session_id: str = Field(min_length=1, max_length=120)
    message: str = Field(min_length=1, max_length=2000)


class BookRequest(BaseModel):
    session_id: str
    name: str
    phone: str
    email: Optional[str] = None
    company: Optional[str] = None
    service: Optional[str] = None
    preferred_time: Optional[str] = None
    area: Optional[str] = None
    notes: Optional[str] = None


class LeadRequest(BaseModel):
    session_id: str
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    notes: Optional[str] = None


@app.get("/health")
def health():
    return {
        "status": "ok",
        "provider": config.LLM_PROVIDER,
        "model": config.GROQ_MODEL if config.LLM_PROVIDER == "groq" else config.OLLAMA_MODEL,
        "sample_mode": config.SAMPLE_MODE,
        "active_sessions": len(SESSIONS),
    }


def _booking_complete_message(b: dict) -> str:
    name = (b.get("name") or "").strip()
    phone = (b.get("phone") or "").strip()
    parts = []
    parts.append(f"Thanks {name}," if name else "Thanks,")
    parts.append("we've got your details.")
    if phone:
        parts.append(f"The team will call you on {phone}")
    else:
        parts.append("The team will reach out")
    parts.append("during working hours (Monday to Saturday, 9 AM to 9 PM GST).")
    parts.append("You should hear from us within one working day. If you'd like a faster reply, WhatsApp +971 58 899 1583.")
    return " ".join(parts)


async def _save_partial_lead(session_id: str, b: dict, source: str = "chatbot-partial"):
    if not b:
        return
    if not any(b.get(k) for k in ("name", "email", "phone", "company")):
        return
    payload = {"session_id": session_id, "source": source, **b}
    try:
        await mongo.save_lead(payload)
    except Exception as e:
        print(f"[lead] mongo save failed: {e}", flush=True)
    try:
        brevo.send_email(
            subject=f"Chatbot partial lead, {b.get('name') or b.get('company') or 'anonymous'}",
            html_body=f"<h2>Partial booking info captured</h2><pre>{json.dumps(payload, default=str, indent=2)}</pre>",
        )
    except Exception as e:
        print(f"[lead] brevo send failed: {e}", flush=True)


def _handle_booking_turn(s: dict, user_msg: str) -> str:
    """Run one booking-flow turn. Returns the reply text."""
    b = s["booking"]
    attempts = s["field_attempts"]
    asked = s.get("asked_field")

    # Step 1: if we asked for a specific field, try to extract that field first
    if asked:
        value = booking.extract_for_field(asked, user_msg)
        if value:
            b[asked] = value
            attempts[asked] = 0  # reset count on success
            s["asked_field"] = None

    # Step 2: opportunistically capture any other recognisable info in the same message
    opp = booking.extract_opportunistic(user_msg)
    for k, v in opp.items():
        if not b.get(k):
            b[k] = v

    # Step 3: if we still haven't captured fields, try the LLM extractor (one network call)
    if not all(b.get(f) for f in booking.REQUIRED_FIELDS):
        try:
            llm_fields = booking.extract_fields_llm(user_msg, dict(b))
            for k, v in llm_fields.items():
                if k in booking.REQUIRED_FIELDS + booking.OPTIONAL_FIELDS and not b.get(k):
                    b[k] = v
        except Exception as e:
            print(f"[booking] LLM extraction failed: {e}", flush=True)

    # Step 4: figure out the next missing field
    missing = booking.next_missing(b)
    if not missing:
        # All required fields captured. Finalise.
        s["asked_field"] = None
        return ""  # caller will detect and finalise

    # Step 5: if we asked for THIS field already and the user response didn't satisfy it,
    # increment the retry count and give a corrective prompt.
    if asked == missing:
        # User didn't manage to give us the asked-for field. Step up the prompt.
        attempts[missing] = attempts.get(missing, 0) + 1
        prompt = booking.prompt_for(missing, attempts[missing])
        s["asked_field"] = missing
        return prompt

    # Step 6: new field we haven't asked for. First-time prompt.
    attempts.setdefault(missing, 0)
    s["asked_field"] = missing
    return booking.prompt_for(missing, attempts[missing])


@app.post("/chat")
async def chat(req: ChatRequest):
    s = session(req.session_id)
    user_msg = req.message.strip()
    s["history"].append({"role": "user", "content": user_msg})
    s["turn_count"] += 1
    asyncio.create_task(mongo.save_transcript(req.session_id, "user", user_msg))

    soft_signal = booking.detect_soft_signal(user_msg)
    intent_now = booking.detect_intent(user_msg)

    # Escape hatch: if user wants to stop the booking flow, honour it immediately.
    if s["in_booking_flow"] and booking.detect_cancel(user_msg):
        partial = dict(s.get("booking") or {})
        if any(partial.get(k) for k in ("name", "email", "phone", "company")):
            asyncio.create_task(_save_partial_lead(req.session_id, partial, source="chatbot-booking-cancelled"))
        s["in_booking_flow"] = False
        s["booking"] = {}
        s["asked_field"] = None
        s["field_attempts"] = {}
        reply = "No problem, I've stopped. Ask me anything else, or WhatsApp +971 58 899 1583 whenever you're ready."
        s["history"].append({"role": "assistant", "content": reply})
        asyncio.create_task(mongo.save_transcript(req.session_id, "assistant", reply))

        async def stream_cancel():
            for word in reply.split(" "):
                yield word + " "
                await asyncio.sleep(0.012)

        return StreamingResponse(stream_cancel(), media_type="text/plain")

    # Off-topic question mid-booking: pause the flow, answer via RAG, keep captured fields.
    if s["in_booking_flow"] and booking.looks_like_question(user_msg):
        asked = s.get("asked_field")
        if not asked or not booking.extract_for_field(asked, user_msg):
            s["in_booking_flow"] = False  # pause; partial data is preserved in s["booking"]
            # fall through to the regular RAG path below

    if s["in_booking_flow"] or intent_now:
        if not s["in_booking_flow"]:
            s["in_booking_flow"] = True

        try:
            reply = await asyncio.get_event_loop().run_in_executor(
                None, lambda: _handle_booking_turn(s, user_msg)
            )
        except Exception as e:
            print(f"[booking] turn failed: {e}", flush=True)
            reply = "Sorry, something went wrong on our side. WhatsApp +971 58 899 1583 and we'll come back to you within a working day."

        if reply == "":
            # All fields captured — finalise the booking
            b = s["booking"]
            payload = {"session_id": req.session_id, **b}
            try:
                appt_id = await mongo.save_appointment(payload)
                payload["_appointment_id"] = appt_id
            except Exception as e:
                print(f"[booking] mongo save failed: {e}", flush=True)
            try:
                brevo.send_email(
                    subject=f"Chatbot booking, {b.get('name', '(no name)')}",
                    html_body=(
                        "<h2>New discovery-call request</h2>"
                        f"<pre>{json.dumps(payload, default=str, indent=2)}</pre>"
                    ),
                )
            except Exception as e:
                print(f"[booking] brevo send failed: {e}", flush=True)
            reply = _booking_complete_message(b)
            s["in_booking_flow"] = False
            s["booking"] = {}
            s["asked_field"] = None
            s["field_attempts"] = {}

        # Periodically persist partial state so dropoffs aren't lost
        if s["turn_count"] - s["last_save_at"] >= 2 and s["booking"]:
            s["last_save_at"] = s["turn_count"]
            asyncio.create_task(_save_partial_lead(req.session_id, dict(s["booking"]), source="chatbot-booking-partial"))

        s["history"].append({"role": "assistant", "content": reply})
        asyncio.create_task(mongo.save_transcript(req.session_id, "assistant", reply))

        async def stream_reply():
            for word in reply.split(" "):
                yield word + " "
                await asyncio.sleep(0.012)

        return StreamingResponse(stream_reply(), media_type="text/plain")

    # ===== Regular RAG path =====
    messages, _retrieved = build_messages(s["history"][:-1], user_msg)

    if soft_signal:
        messages[0]["content"] += (
            "\n\nThe user asked about pricing or timeline. After answering, in one short sentence, offer "
            "a free 45-minute discovery call so the team can give a more precise number."
        )

    async def stream():
        acc = ""
        try:
            for tok in llm.stream_completion(messages, temperature=0.15, max_tokens=600):
                acc += tok
                yield tok
        except Exception as e:
            err = " (Sorry, I had a problem. WhatsApp +971 58 899 1583 and we'll respond within a working day.)"
            yield err
            acc += err
            print(f"[chat] stream error: {type(e).__name__}: {e}", flush=True)
        s["history"].append({"role": "assistant", "content": acc})
        asyncio.create_task(mongo.save_transcript(req.session_id, "assistant", acc))

    return StreamingResponse(stream(), media_type="text/plain")


@app.post("/book")
async def book(req: BookRequest):
    payload = req.model_dump(exclude_none=True)
    payload["source"] = "direct-book"
    try:
        appt_id = await mongo.save_appointment(payload)
        payload["_appointment_id"] = appt_id
    except Exception as e:
        appt_id = None
        print(f"[/book] mongo save failed: {e}", flush=True)
    try:
        brevo.send_email(
            subject=f"Chatbot booking, {req.name}",
            html_body=f"<h2>Booking request</h2><pre>{json.dumps(payload, default=str, indent=2)}</pre>",
        )
    except Exception as e:
        print(f"[/book] brevo send failed: {e}", flush=True)
    return {"ok": True, "appointment_id": appt_id}


@app.post("/lead")
async def lead(req: LeadRequest):
    payload = req.model_dump(exclude_none=True)
    payload["source"] = "direct-lead"
    try:
        lid = await mongo.save_lead(payload)
    except Exception as e:
        lid = None
        print(f"[/lead] mongo save failed: {e}", flush=True)
    try:
        brevo.send_email(
            subject=f"Chatbot partial lead, {req.name or req.company or 'anonymous'}",
            html_body=f"<pre>{json.dumps(payload, default=str, indent=2)}</pre>",
        )
    except Exception as e:
        print(f"[/lead] brevo send failed: {e}", flush=True)
    return {"ok": True, "lead_id": lid}


@app.post("/session/end")
async def session_end(payload: dict):
    sid = payload.get("session_id")
    if not sid:
        return {"ok": False, "error": "session_id required"}
    s = SESSIONS.get(sid)
    if not s:
        return {"ok": True, "saved": False}
    await _save_partial_lead(sid, dict(s.get("booking") or {}), source="chatbot-session-end")
    return {"ok": True, "saved": True}
