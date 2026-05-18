"""Central config. Loaded once from env."""
import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    LLM_PROVIDER = os.getenv("LLM_PROVIDER", "groq")
    GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
    GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
    OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
    OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:3b")

    MONGODB_URI = os.getenv("MONGODB_URI", "")
    MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "pitch_magistrum")

    BREVO_API_KEY = os.getenv("BREVO_API_KEY", "")
    BREVO_FROM_EMAIL = os.getenv("BREVO_FROM_EMAIL", "pitches@example.com")
    BREVO_TO_EMAIL = os.getenv("BREVO_TO_EMAIL", "you@example.com")

    KB_PATH = os.getenv("KB_PATH", "./kb")
    CHROMA_PATH = os.getenv("CHROMA_PATH", "./chroma")
    EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")

    SAMPLE_MODE = os.getenv("SAMPLE_MODE", "true").lower() == "true"
    ALLOWED_ORIGINS = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",") if o.strip()]

    BUSINESS_NAME = "Magistrum Corpserve Solutions LLC"
    BUSINESS_PHONE = "+971 58 899 1583"
    BUSINESS_WHATSAPP = "https://wa.me/971588991583"
    BUSINESS_EMAIL = "info@magistrum.net"


config = Config()
