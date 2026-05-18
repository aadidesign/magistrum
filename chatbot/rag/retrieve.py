"""Lightweight keyword retriever over KB chunks. No external deps.

Scores each KB chunk against the user query using term-frequency overlap,
boosted by chunk priority (from front-matter) and a few hand-tuned aliases
(e.g. "price" matches "cost" too). Returns the top-N most relevant chunks.

Falls back to highest-priority chunks if the query has no recognisable terms.
"""
import re
from rag.loader import load_kb
from config import config

_STOPWORDS = {
    "a", "an", "the", "and", "or", "but", "if", "is", "are", "was", "were",
    "be", "been", "being", "have", "has", "had", "do", "does", "did", "of",
    "in", "on", "at", "to", "for", "with", "by", "from", "as", "into", "you",
    "i", "we", "they", "it", "this", "that", "these", "those", "my", "your",
    "our", "us", "me", "us", "what", "how", "when", "where", "why", "which",
    "who", "can", "could", "would", "should", "will", "may", "might", "about",
    "any", "all", "some", "than", "then", "so", "just", "too", "also", "very",
    "much", "more", "most", "less", "least", "really", "actually",
}

# Synonyms / aliases — searching for the key also matches any of its values.
_ALIASES = {
    "price": ["cost", "pricing", "fee", "fees", "quote", "rate", "rates", "aed", "dh", "dirham"],
    "cost": ["price", "pricing", "fee", "fees", "quote", "aed"],
    "timeline": ["time", "duration", "long", "weeks", "days", "schedule"],
    "implementation": ["implement", "setup", "install", "rollout", "deploy", "deployment", "go-live", "golive"],
    "books": ["zohobooks", "accounting", "bookkeeping", "ledger"],
    "crm": ["sales", "leads", "pipeline", "customer"],
    "workplace": ["email", "mail", "workspace", "office", "migration"],
    "training": ["course", "courses", "certification", "learn", "class", "classes", "teach"],
    "tax": ["vat", "fta", "corporate", "compliance", "filing", "return"],
    "vat": ["tax", "fta", "filing", "return"],
    "tally": ["migrate", "migration", "switch"],
    "quickbooks": ["migrate", "migration", "qb"],
    "discovery": ["call", "meeting", "appointment", "consult", "consultation"],
    "book": ["booking", "schedule", "appointment", "call", "meet"],
    "location": ["address", "based", "office", "dubai", "where", "headquarter", "dip"],
    "hours": ["timing", "open", "closed", "weekend", "sunday", "saturday"],
    "team": ["founder", "co-founder", "haridas", "seema", "consultant", "staff", "people"],
    "magistrum": ["company", "firm", "business", "you"],
    "service": ["services", "offer", "offering", "provide", "do"],
    "support": ["help", "issue", "problem", "stuck", "broken"],
    "remote": ["online", "abroad", "outside", "international"],
    "training-zoho-books": ["certification", "certified"],
    "sharjah": ["northern", "emirates"],
    "abu": ["dhabi", "capital"],
    "ajman": ["northern"],
}


def _tokenize(text: str) -> list[str]:
    text = text.lower()
    tokens = re.findall(r"[a-z0-9][a-z0-9\-]*", text)
    return [t for t in tokens if t not in _STOPWORDS and len(t) > 1]


def _expand_query(tokens: list[str]) -> set[str]:
    expanded: set[str] = set(tokens)
    for t in tokens:
        if t in _ALIASES:
            expanded.update(_ALIASES[t])
    return expanded


def _score_chunk(chunk: dict, query_terms: set[str]) -> float:
    """Term-frequency overlap with light priority boost."""
    text = chunk["text"].lower()
    score = 0.0
    for term in query_terms:
        if not term:
            continue
        # Word-boundary count to avoid "vat" matching "vatican".
        hits = len(re.findall(r"\b" + re.escape(term) + r"\b", text))
        if hits:
            score += hits
    if score == 0:
        return 0.0
    priority = chunk.get("priority", 3) or 3
    # Lower numeric priority = more authoritative (1 > 3). Boost top-priority by ~50%.
    boost = 1.0 + max(0, 3 - priority) * 0.25
    return score * boost


_chunks_cache: list[dict] | None = None


def _get_chunks() -> list[dict]:
    global _chunks_cache
    if _chunks_cache is None:
        _chunks_cache = load_kb(config.KB_PATH)
    return _chunks_cache


def retrieve(query: str, history: list[dict] | None = None, top_k: int = 4) -> list[dict]:
    """Return top-k KB chunks most relevant to the query.

    If the query has no scorable terms (e.g. "hi"), returns the highest-priority
    chunks as a safe default so the model always has SOME context.
    """
    chunks = _get_chunks()
    if not chunks:
        return []

    # Pull recent assistant + user turns into the query so follow-ups
    # like "and how long does it take?" still retrieve the right chunks.
    extra = ""
    if history:
        recent_user = [m["content"] for m in history[-4:] if m.get("role") == "user"]
        extra = " ".join(recent_user)

    full_query = f"{query} {extra}".strip()
    tokens = _tokenize(full_query)
    if not tokens:
        return sorted(chunks, key=lambda c: c.get("priority", 3))[:top_k]

    query_terms = _expand_query(tokens)
    scored = [(c, _score_chunk(c, query_terms)) for c in chunks]
    scored = [s for s in scored if s[1] > 0]

    if not scored:
        # No keyword match. Fall back to highest-priority business + faq chunks.
        return sorted(chunks, key=lambda c: c.get("priority", 3))[:top_k]

    scored.sort(key=lambda s: s[1], reverse=True)
    return [c for c, _ in scored[:top_k]]
