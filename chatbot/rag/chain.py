"""Compose KB context + system prompt + user msg into LLM messages.

For demo/free-tier deployment: full KB inlined into system prompt (no vector
retrieval). KB is ~42KB / ~10K tokens — well within Groq's context window.
"""
from pathlib import Path
from rag.loader import load_kb
from config import config

SYSTEM_PROMPT_PATH = Path(__file__).resolve().parent.parent / "SYSTEM-PROMPT.md"

_kb_cache: str | None = None


def load_system_prompt() -> str:
    if SYSTEM_PROMPT_PATH.exists():
        return SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")
    return (
        "You are Magistrum's website assistant, a Zoho Authorised Partner in Dubai. "
        "Answer briefly (2-4 sentences), only from the provided context. "
        "If the context is silent, offer a callback."
    )


def get_kb_context() -> str:
    global _kb_cache
    if _kb_cache is not None:
        return _kb_cache
    chunks = load_kb(config.KB_PATH)
    chunks.sort(key=lambda c: (c.get("priority", 3), c.get("rel_path", "")))
    blocks = [
        f"[{c['rel_path']} · priority={c.get('priority', 3)}]\n{c['text']}"
        for c in chunks
    ]
    _kb_cache = "\n\n".join(blocks) if blocks else "(no KB content found)"
    return _kb_cache


def build_messages(history: list[dict], user_msg: str) -> tuple[list[dict], list[dict]]:
    """Returns (messages_for_llm, retrieved_chunks).

    retrieved_chunks kept for API compatibility — always empty now.
    """
    system = load_system_prompt() + "\n\n--- KB CONTEXT ---\n" + get_kb_context()

    messages = [{"role": "system", "content": system}]
    for m in history[-6:]:
        messages.append({"role": m["role"], "content": m["content"]})
    messages.append({"role": "user", "content": user_msg})
    return messages, []
