"""Booking intent detection plus stateful slot collection.

The bot tracks which field it just asked for so the next user reply can be
parsed against that field FIRST. Falls back to regex, then LLM extraction.
If the user reply doesn't validate, the bot returns a clear correction
prompt instead of repeating the original question.
"""
import re
from services.llm import complete_json


# ===== Intent detection =====

INTENT_PATTERNS = [
    r"\bbook(?:\s+a|\s+me)?\s+(?:call|meeting|appointment|demo|consult|session|slot)",
    r"\bschedule\s+(?:a|me|us|the|an)",
    r"\bappointment\b",
    r"\bavailable\s+(?:slot|time|date|day|next)",
    r"\bwhen\s+can\s+(?:you|we|i)\s+(?:meet|call|talk|chat|speak)",
    r"\bcall\s+me\b",
    r"\bset\s+up\s+(?:a\s+)?call\b",
    r"\b(?:discovery|free)\s+call\b",
    r"\bbook\s+a\s+demo\b",
    r"\bfree\s+consultation\b",
    r"\btalk\s+to\s+(?:someone|a\s+human|the\s+team)\b",
    r"\bget\s+on\s+(?:a\s+)?call\b",
    r"\bspeak\s+(?:to|with)\s+(?:someone|a|the\s+team)\b",
    r"\bI(?:'m|\s+am)?\s+interested\b",
    r"\b(?:please\s+)?contact\s+me\b",
    r"\breach\s+out\s+to\s+me\b",
    r"\b(?:I\s+want|I'd\s+like|i\s+would\s+like)\s+to\s+(?:book|schedule|talk|chat|speak|meet)\b",
]
_RE = [re.compile(p, re.IGNORECASE) for p in INTENT_PATTERNS]


def detect_intent(message: str) -> bool:
    return any(r.search(message) for r in _RE)


SOFT_SIGNAL_PATTERNS = [
    r"\bhow\s+much\b", r"\bprice\b", r"\bcost\b", r"\bquote\b", r"\bpricing\b",
    r"\bfees?\b", r"\btimeline\b", r"\bhow\s+long\b",
    r"\b(?:does|do)\s+(?:it|you)\s+take\b",
]
_SOFT = [re.compile(p, re.IGNORECASE) for p in SOFT_SIGNAL_PATTERNS]


def detect_soft_signal(message: str) -> bool:
    return any(r.search(message) for r in _SOFT)


CANCEL_PATTERNS = [
    r"^\s*stop\s*\.?$",
    r"^\s*cancel\s*\.?$",
    r"^\s*exit\s*\.?$",
    r"^\s*quit\s*\.?$",
    r"^\s*abort\s*\.?$",
    r"^\s*nvm\s*\.?$",
    r"\bnever\s*mind\b",
    r"\bnot\s+now\b",
    r"\bmaybe\s+later\b",
    r"\bchanged?\s+my\s+mind\b",
    r"\bdon'?t\s+want\s+to\s+book\b",
    r"\bskip\s+this\b",
    r"\bforget\s+it\b",
]
_CANCEL = [re.compile(p, re.IGNORECASE) for p in CANCEL_PATTERNS]


def detect_cancel(message: str) -> bool:
    return any(r.search(message) for r in _CANCEL)


QUESTION_HINTS = [
    r"\?",
    r"\b(?:can|could|would|do|does|is|are|will)\s+(?:you|i|we|it)\b",
    r"\b(?:what|when|where|how|why|which|who)\b",
    r"\btell\s+me\s+about\b",
]
_QHINT = [re.compile(p, re.IGNORECASE) for p in QUESTION_HINTS]


def looks_like_question(message: str) -> bool:
    return any(r.search(message) for r in _QHINT)


# ===== Validators =====

EMAIL_FULL_RE = re.compile(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")
EMAIL_FIND_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
PHONE_FIND_RE = re.compile(r"(\+?\d[\d\s\-()]{6,}\d)")


def looks_like_email(s: str) -> str | None:
    if not s:
        return None
    s = s.strip()
    if "@" not in s:
        return None
    m = EMAIL_FIND_RE.search(s)
    if not m:
        return None
    candidate = m.group(0).rstrip(".,;:!?)")
    if EMAIL_FULL_RE.match(candidate):
        return candidate
    return None


def looks_like_phone(s: str) -> str | None:
    if not s:
        return None
    m = PHONE_FIND_RE.search(s.strip())
    if not m:
        return None
    raw = m.group(0)
    cleaned = re.sub(r"[^\d+]", "", raw)
    digit_count = sum(c.isdigit() for c in cleaned)
    if digit_count < 7:
        return None
    return cleaned


def looks_like_name(s: str) -> str | None:
    if not s:
        return None
    s = s.strip().strip(".,;:")
    if "@" in s:
        return None
    words = s.split()
    if not (1 <= len(words) <= 5):
        return None
    letters = sum(c.isalpha() for c in s)
    if letters < 2:
        return None
    lower = s.lower()
    if lower in {"hi", "hello", "hey", "yes", "no", "ok", "okay", "yeah", "yep", "nope", "sure", "thanks", "thank you", "ya"}:
        return None
    return s.title() if s.islower() else s


def looks_like_company(s: str) -> str | None:
    if not s:
        return None
    s = s.strip().strip(".,;:")
    if "@" in s:
        return None
    words = s.split()
    if not (1 <= len(words) <= 8):
        return None
    lower = s.lower()
    if lower in {"yes", "no", "n/a", "na", "none", "skip", "later"}:
        return None
    return s


def normalise_service(s: str) -> str | None:
    if not s:
        return None
    t = s.lower()
    table = [
        ("zoho-books", ["zoho books", "books", "accounting", "vat", "bookkeeping"]),
        ("zoho-crm", ["zoho crm", "crm", "sales", "pipeline"]),
        ("zoho-workplace", ["workplace", "workspace", "email", "mail", "migration", "google workspace", "microsoft 365"]),
        ("zoho-finance-suite", ["finance suite", "finance", "inventory", "payroll", "expense", "invoice"]),
        ("zoho-one", ["zoho one", "all", "everything", "full stack", "bundle"]),
        ("training", ["training", "course", "certification", "learn", "class", "tally"]),
    ]
    for slug, keys in table:
        if any(k in t for k in keys):
            return slug
    return None


# Legacy aliases kept for any external callers
def extract_phone(text: str) -> str | None:
    return looks_like_phone(text or "")


def extract_email(text: str) -> str | None:
    return looks_like_email(text or "")


# ===== Required field set =====

REQUIRED_FIELDS = ["name", "email", "phone", "company", "service", "preferred_time"]
OPTIONAL_FIELDS = ["current_system", "team_size", "notes"]


def required_fields() -> list[str]:
    return list(REQUIRED_FIELDS)


def next_missing(state: dict) -> str | None:
    for f in REQUIRED_FIELDS:
        if not state.get(f):
            return f
    return None


# ===== Prompts =====

PROMPT_FIRST = {
    "name": "Great. What's your name?",
    "email": "What's the best email to send a follow-up summary to?",
    "phone": "What's the best phone number to reach you on? WhatsApp or call is fine.",
    "company": "Which company are you with?",
    "service": "Which service are you most interested in: Zoho Books, CRM, Workplace, Finance Suite, Zoho One, or training?",
    "preferred_time": "What works for a 45-minute discovery call? Any day this week or next, between 9 AM and 6 PM GST.",
}

PROMPT_RETRY = {
    "name": "That didn't look like a name. Could you share your first and last name, for example 'Sarah Khan'?",
    "email": "That doesn't look like a valid email. Please share one in the format yourname@example.com.",
    "phone": "That doesn't look like a valid phone number. UAE numbers usually look like +971 50 123 4567, or share whatever number works.",
    "company": "What's the name of your business or company?",
    "service": "Which one fits best: Zoho Books, Zoho CRM, Zoho Workplace, Zoho Finance Suite, Zoho One, or training?",
    "preferred_time": "Any day and a rough time works, for example 'Tuesday afternoon' or 'Wed 11 AM'.",
}

PROMPT_FALLBACK = (
    "I'm having trouble capturing that. The fastest route is WhatsApp on +971 58 899 1583, "
    "the team replies during working hours (Mon-Sat, 9 AM to 9 PM GST)."
)


def prompt_for(field: str, attempt: int = 0) -> str:
    if attempt == 0:
        return PROMPT_FIRST.get(field, "Could you share a bit more so we can prepare the call?")
    if attempt == 1:
        return PROMPT_RETRY.get(field, PROMPT_FIRST.get(field, "Could you share a bit more?"))
    return PROMPT_FALLBACK


# ===== Stateful extraction =====

def extract_for_field(field: str, message: str) -> str | None:
    """Extract a SPECIFIC field. Returns the value or None if the reply doesn't validate."""
    if not message or not field:
        return None
    msg = message.strip()
    if field == "email":
        return looks_like_email(msg)
    if field == "phone":
        return looks_like_phone(msg)
    if field == "name":
        return looks_like_name(msg)
    if field == "company":
        return looks_like_company(msg)
    if field == "service":
        return normalise_service(msg)
    if field == "preferred_time":
        cleaned = msg.strip()
        if len(cleaned) >= 3 and "@" not in cleaned:
            return cleaned
        return None
    return None


def extract_opportunistic(message: str) -> dict:
    """Pull any recognisable field from a free-text message."""
    out: dict = {}
    em = looks_like_email(message)
    if em:
        out["email"] = em
    ph = looks_like_phone(message)
    if ph and ph != em:
        out["phone"] = ph
    svc = normalise_service(message)
    if svc:
        out["service"] = svc
    return out


# ===== LLM-based extraction =====

EXTRACTION_PROMPT = """You extract booking details from a single user message in a chat.
Return a JSON object with these keys (use null where not mentioned):
- name (full name if given, else null)
- email (email address if given, else null)
- phone (phone number as written, else null)
- company (company name if given, else null)
- service (one of: zoho-books, zoho-crm, zoho-workplace, zoho-finance-suite, zoho-one, training; else null)
- preferred_time (free-text preferred time/date, else null)
- current_system (Excel, Tally, QuickBooks, Sage, SAP, etc, else null)
- team_size (number or range as text, else null)
- notes (anything else worth noting, else null)

Rules:
- Do not invent values. Only extract what is explicitly stated.
- Output VALID JSON only. No prose."""


def extract_fields_llm(message: str, already_known: dict | None = None) -> dict:
    known = already_known or {}
    user = f"User message: {message!r}\nAlready known: {known}\nReturn JSON only."
    parsed = complete_json(
        [
            {"role": "system", "content": EXTRACTION_PROMPT},
            {"role": "user", "content": user},
        ],
        temperature=0.0,
        max_tokens=300,
    )
    if not isinstance(parsed, dict):
        return {}
    out: dict = {}
    for k in REQUIRED_FIELDS + OPTIONAL_FIELDS:
        v = parsed.get(k)
        if v and isinstance(v, (str, int)) and str(v).strip().lower() not in ("null", "none", "n/a", ""):
            out[k] = str(v).strip()
    return out


def extract_fields(message: str, already_known: dict | None = None) -> dict:
    """Legacy hybrid extractor — kept for backwards compatibility."""
    fields: dict = {}
    em = looks_like_email(message)
    if em:
        fields["email"] = em
    ph = looks_like_phone(message)
    if ph and ph != em:
        fields["phone"] = ph
    llm_fields = extract_fields_llm(message, already_known)
    for k, v in llm_fields.items():
        if k not in fields:
            fields[k] = v
    return fields
