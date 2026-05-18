"""Async MongoDB helper."""
from motor.motor_asyncio import AsyncIOMotorClient
from config import config

_client = None
_db = None


def get_db():
    global _client, _db
    if _db is not None:
        return _db
    if not config.MONGODB_URI:
        return None
    _client = AsyncIOMotorClient(config.MONGODB_URI)
    _db = _client[config.MONGODB_DB_NAME]
    return _db


async def save_transcript(session_id: str, role: str, content: str):
    db = get_db()
    if db is None:
        return
    await db.transcripts.update_one(
        {"session_id": session_id},
        {"$push": {"messages": {"role": role, "content": content}}, "$setOnInsert": {"created_at": __import__("datetime").datetime.utcnow()}},
        upsert=True,
    )


async def save_appointment(payload: dict) -> str | None:
    db = get_db()
    if db is None:
        return None
    payload["created_at"] = __import__("datetime").datetime.utcnow()
    r = await db.appointments.insert_one(payload)
    return str(r.inserted_id)


async def save_lead(payload: dict) -> str | None:
    db = get_db()
    if db is None:
        return None
    payload["created_at"] = __import__("datetime").datetime.utcnow()
    r = await db.leads.insert_one(payload)
    return str(r.inserted_id)
