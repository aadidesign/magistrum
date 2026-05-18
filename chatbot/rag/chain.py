"""Compose retrieved context + system prompt + user msg into LLM messages."""
from pathlib import Path
from rag.vectorstore import retrieve

SYSTEM_PROMPT_PATH = Path(__file__).resolve().parent.parent / "SYSTEM-PROMPT.md"


def load_system_prompt() -> str:
    if SYSTEM_PROMPT_PATH.exists():
        return SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")
    # Fallback minimal prompt
    return (
        "You are Magistrum's website assistant, a Zoho Authorised Partner in Dubai. "
        "Answer briefly (2-4 sentences), only from the provided context. "
        "If the context is silent, offer a callback."
    )


def build_messages(history: list[dict], user_msg: str) -> tuple[list[dict], list[dict]]:
    """Returns (messages_for_llm, retrieved_chunks)."""
    retrieved = retrieve(user_msg, k=5)
    context_block = "\n\n".join(
        f"[{i+1}] (priority={c['meta'].get('priority',3)} · source={c['meta'].get('source','?')})\n{c['text']}"
        for i, c in enumerate(retrieved)
    ) or "(no matching context — be honest about it)"

    system = load_system_prompt() + "\n\n--- KB CONTEXT ---\n" + context_block

    messages = [{"role": "system", "content": system}]
    # last 6 turns of history
    for m in history[-6:]:
        messages.append({"role": m["role"], "content": m["content"]})
    messages.append({"role": "user", "content": user_msg})
    return messages, retrieved
