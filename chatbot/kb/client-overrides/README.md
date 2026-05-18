---
doc_id: client-overrides-readme
source: meta
last_updated: 2026-05-18
authority: low
priority: 99
---

## Purpose of this folder

Files placed here have `priority: 0` in their frontmatter and **override every other source** during retrieval. Use this folder after the client signs on to:

- Pin specific prices ("our basic call-out is AED 85")
- Add services not yet on GMB
- Update policies that diverge from the templated defaults
- Time-box promotions (set an `expires` date in the frontmatter)

## How to add an override

1. Copy `_template.md` to `<slug>.md` in this folder.
2. Set `priority: 0` in the frontmatter.
3. Write the content in Magistrum's voice.
4. Run `python -m rag.ingest` from the `/chatbot` folder.

That's it. The chatbot picks up the change within 30 seconds — no redeploy.

This README itself is set to `priority: 99` so it doesn't pollute retrieval.
