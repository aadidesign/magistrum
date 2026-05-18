"""LLM wrapper for Groq (sample) or Ollama (production VPS)."""
import json as _json
from typing import Iterator, Any
import httpx
from config import config

try:
    from groq import Groq, APIError, APIConnectionError, RateLimitError
except ImportError:
    Groq = None
    APIError = APIConnectionError = RateLimitError = Exception


_groq_client = None


def get_groq_client():
    global _groq_client
    if _groq_client is None and Groq and config.GROQ_API_KEY:
        _groq_client = Groq(api_key=config.GROQ_API_KEY, timeout=60.0)
    return _groq_client


def _stream_groq(messages: list[dict], temperature: float, max_tokens: int) -> Iterator[str]:
    client = get_groq_client()
    if client is None:
        yield "I'm not fully configured yet (no LLM key). You can reach us on WhatsApp at +971 58 899 1583 or email info@magistrum.net."
        return
    try:
        stream = client.chat.completions.create(
            model=config.GROQ_MODEL,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
            stream=True,
            top_p=0.95,
        )
        for chunk in stream:
            try:
                delta = chunk.choices[0].delta.content
            except (IndexError, AttributeError):
                continue
            if delta:
                yield delta
    except RateLimitError:
        yield "We're getting a lot of questions right now and the assistant is rate-limited. You can reach the team directly on WhatsApp at +971 58 899 1583."
    except APIConnectionError:
        yield "I'm having trouble reaching our assistant right now. Please WhatsApp +971 58 899 1583 or email info@magistrum.net and we'll reply within a working day."
    except APIError as e:
        print(f"[llm] Groq APIError: {e}", flush=True)
        yield "Something went wrong with our assistant. The Magistrum team is at +971 58 899 1583 or info@magistrum.net."
    except Exception as e:
        print(f"[llm] unexpected error: {type(e).__name__}: {e}", flush=True)
        yield "Sorry, I hit an unexpected problem. WhatsApp the team on +971 58 899 1583 and we'll come back to you."


def _stream_ollama(messages: list[dict], temperature: float) -> Iterator[str]:
    try:
        with httpx.stream(
            "POST",
            f"{config.OLLAMA_HOST}/api/chat",
            json={"model": config.OLLAMA_MODEL, "messages": messages, "stream": True, "options": {"temperature": temperature}},
            timeout=60.0,
        ) as r:
            for line in r.iter_lines():
                if not line:
                    continue
                try:
                    data = _json.loads(line)
                    content = data.get("message", {}).get("content", "")
                    if content:
                        yield content
                except Exception:
                    continue
    except Exception as e:
        print(f"[llm] ollama error: {e}", flush=True)
        yield "Local LLM is unreachable. Please try again or contact us directly."


def stream_completion(messages: list[dict], temperature: float = 0.2, max_tokens: int = 600) -> Iterator[str]:
    if config.LLM_PROVIDER == "groq":
        yield from _stream_groq(messages, temperature, max_tokens)
    else:
        yield from _stream_ollama(messages, temperature)


def complete(messages: list[dict], temperature: float = 0.2, max_tokens: int = 600) -> str:
    return "".join(stream_completion(messages, temperature, max_tokens))


def complete_json(messages: list[dict], temperature: float = 0.0, max_tokens: int = 400) -> dict | None:
    """Ask the LLM for a JSON object. Returns parsed dict, or None on failure."""
    if config.LLM_PROVIDER == "groq":
        client = get_groq_client()
        if client is None:
            return None
        try:
            resp = client.chat.completions.create(
                model=config.GROQ_MODEL,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                response_format={"type": "json_object"},
            )
            raw = resp.choices[0].message.content or "{}"
            return _json.loads(raw)
        except Exception as e:
            print(f"[llm] complete_json failed: {e}", flush=True)
            return None
    text = complete(messages, temperature, max_tokens)
    try:
        return _json.loads(text)
    except Exception:
        return None
