"""Chroma persistence + retrieve with cosine similarity and priority re-rank."""
from typing import List, Dict
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
from config import config

_model = None
_client = None
_collection = None
COLLECTION_NAME = "magistrum_kb_v2"  # bumped so we recreate with cosine metric


def get_model():
    global _model
    if _model is None:
        _model = SentenceTransformer(config.EMBEDDING_MODEL)
    return _model


def get_collection():
    global _client, _collection
    if _collection is not None:
        return _collection
    _client = chromadb.PersistentClient(path=config.CHROMA_PATH, settings=Settings(anonymized_telemetry=False))
    _collection = _client.get_or_create_collection(
        name=COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"},
    )
    return _collection


def index(chunks: List[Dict]) -> int:
    coll = get_collection()
    # clean slate
    try:
        existing = coll.get()
        if existing["ids"]:
            coll.delete(ids=existing["ids"])
    except Exception:
        pass
    if not chunks:
        return 0
    model = get_model()
    texts = [c["text"] for c in chunks]
    embs = model.encode(texts, show_progress_bar=False).tolist()
    coll.add(
        ids=[c["chunk_id"] for c in chunks],
        embeddings=embs,
        documents=texts,
        metadatas=[{
            "doc_id": c["doc_id"], "source": c["source"], "priority": c["priority"],
            "title": c["title"], "rel_path": c["rel_path"],
        } for c in chunks],
    )
    return len(chunks)


def retrieve(query: str, k: int = 7, sim_threshold: float = 0.05) -> list[dict]:
    """Top-k retrieval with cosine similarity, priority-aware re-rank.

    With hnsw:space=cosine, Chroma returns cosine distance in [0, 2].
    Similarity is 1 - distance. Threshold of 0.05 just drops obvious garbage.
    """
    coll = get_collection()
    model = get_model()
    q_emb = model.encode([query], show_progress_bar=False).tolist()
    n_pool = max(k * 3, 12)
    res = coll.query(query_embeddings=q_emb, n_results=n_pool)
    docs = res["documents"][0] if res["documents"] else []
    metas = res["metadatas"][0] if res["metadatas"] else []
    distances = res["distances"][0] if res["distances"] else []
    items = []
    for d, m, dist in zip(docs, metas, distances):
        sim = 1.0 - float(dist)
        if sim < sim_threshold:
            continue
        items.append({"text": d, "meta": m, "sim": sim})
    # Sort: priority first (lower number = higher priority), then sim desc
    items.sort(key=lambda x: (x["meta"].get("priority", 3), -x["sim"]))
    return items[:k]
