"""Compose KB context + system prompt + user msg into LLM messages.

Uses a lightweight keyword retriever (see rag/retrieve.py) so only the
2-4 most relevant KB chunks are sent per turn, instead of the full KB.
This keeps each request well under Groq's free-tier 12K TPM cap and
leaves room for a longer conversation history.
"""
from pathlib import Path
from rag.retrieve import retrieve

SYSTEM_PROMPT_PATH = Path(__file__).resolve().parent.parent / "SYSTEM-PROMPT.md"

HISTORY_TURNS = 20  # last N messages of history sent with each request
RETRIEVAL_TOP_K = 4  # number of KB chunks to inline per turn


def load_system_prompt() -> str:
    if SYSTEM_PROMPT_PATH.exists():
        return SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")
    return (
        "You are Magistrum's website assistant, a Zoho Authorised Partner in Dubai. "
        "Answer briefly (2-4 sentences), only from the provided context. "
        "If the context is silent, offer a callback."
    )


def _format_chunks(chunks: list[dict]) -> str:
    if not chunks:
        return "(no relevant KB content found for this query)"
    blocks = [
        f"[{c.get('rel_path', c.get('chunk_id', '?'))} · priority={c.get('priority', 3)}]\n{c['text']}"
        for c in chunks
    ]
    return "\n\n".join(blocks)


def build_messages(history: list[dict], user_msg: str) -> tuple[list[dict], list[dict]]:
    """Returns (messages_for_llm, retrieved_chunks)."""
    retrieved = retrieve(user_msg, history=history, top_k=RETRIEVAL_TOP_K)
    system = (
        load_system_prompt()
        + "\n\n--- RELEVANT KB CONTEXT ---\n"
        + _format_chunks(retrieved)
    )

    messages = [{"role": "system", "content": system}]
    for m in history[-HISTORY_TURNS:]:
        messages.append({"role": m["role"], "content": m["content"]})
    messages.append({"role": "user", "content": user_msg})
    return messages, retrieved
