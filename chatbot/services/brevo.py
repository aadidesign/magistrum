"""Brevo transactional email — bare httpx, no SDK."""
import httpx
from config import config


def send_email(subject: str, html_body: str, to: str | None = None) -> bool:
    if not config.BREVO_API_KEY:
        print("[brevo] missing API key, skipping send")
        return False
    target = to or config.BREVO_TO_EMAIL
    try:
        r = httpx.post(
            "https://api.brevo.com/v3/smtp/email",
            headers={
                "accept": "application/json",
                "api-key": config.BREVO_API_KEY,
                "content-type": "application/json",
            },
            json={
                "sender": {"name": "Magistrum Chatbot", "email": config.BREVO_FROM_EMAIL},
                "to": [{"email": target}],
                "subject": subject,
                "htmlContent": html_body,
            },
            timeout=10.0,
        )
        return r.status_code < 300
    except Exception as e:
        print(f"[brevo] send failed: {e}")
        return False
