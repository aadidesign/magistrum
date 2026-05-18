"""CLI: python -m rag.ingest — re-embed the KB."""
import _ssl_patch  # noqa: F401 — must be first
from rag.loader import load_kb
from rag.vectorstore import index
from config import config


def main():
    chunks = load_kb(config.KB_PATH)
    n = index(chunks)
    print(f"Indexed {n} chunks into {config.CHROMA_PATH}")


if __name__ == "__main__":
    main()
