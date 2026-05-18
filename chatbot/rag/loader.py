"""Load KB markdown files into chunks ready for embedding."""
import os
import re
from pathlib import Path
import frontmatter

H2 = re.compile(r"^##\s+", re.MULTILINE)


def load_kb(kb_path: str) -> list[dict]:
    """Returns a list of {doc_id, source, priority, chunk_id, text, title}."""
    chunks: list[dict] = []
    root = Path(kb_path)
    if not root.exists():
        print(f"[loader] KB path {root} doesn't exist")
        return []

    for fp in root.rglob("*.md"):
        if fp.parent.name == "_research":
            continue  # working material — not indexed
        if fp.name.startswith("_template"):
            continue
        try:
            post = frontmatter.load(fp)
        except Exception as e:
            print(f"[loader] failed to parse {fp}: {e}")
            continue
        meta = post.metadata or {}
        body = post.content
        doc_id = meta.get("doc_id", fp.stem)
        priority = int(meta.get("priority", 3))
        source = meta.get("source", "kb")

        # Split on H2 headers
        parts = H2.split(body)
        # First part is whatever comes before the first H2
        if parts and parts[0].strip():
            text = parts[0].strip()
            chunks.append({
                "doc_id": doc_id, "source": source, "priority": priority,
                "chunk_id": f"{doc_id}#0", "text": text, "title": fp.stem,
                "rel_path": str(fp.relative_to(root)),
            })
        # Remaining parts each begin with their H2 title line
        for i, p in enumerate(parts[1:], start=1):
            chunk_text = ("## " + p).strip()
            if len(chunk_text) < 30:
                continue
            chunks.append({
                "doc_id": doc_id, "source": source, "priority": priority,
                "chunk_id": f"{doc_id}#{i}", "text": chunk_text, "title": fp.stem,
                "rel_path": str(fp.relative_to(root)),
            })
    print(f"[loader] loaded {len(chunks)} chunks from {kb_path}")
    return chunks
