# How to update this chatbot

The Magistrum chatbot reads its knowledge from markdown files in `/kb/`. To change what it says, you edit those files and re-ingest. No code change, no redeploy, no retraining.

## 1. To change a price, hours or any specific detail

Add or edit a file under `/kb/client-overrides/`. Files here have `priority: 0` and **override every other source**.

Example: you want to add "our standard Zoho Books implementation starts at AED 7,500":

1. Copy `/kb/client-overrides/_template.md` to `/kb/client-overrides/pricing-books.md`.
2. Edit the frontmatter: set `doc_id: override-pricing-books`, `priority: 0`, `last_updated: <today>`.
3. Write the content in Magistrum's voice.
4. Run `python -m rag.ingest` from the `/chatbot` folder.

That's it. Live within 30 seconds.

## 2. To add a new service

1. Copy `/kb/services/_template.md` to `/kb/services/<new-slug>.md`.
2. Fill in the sections: Overview, What's included, Typical timeline, What it costs, Common questions, Related services.
3. Run `python -m rag.ingest`.
4. Also remember to add the service to `/web/lib/business.ts` so it appears on the website.

## 3. To add a new service area

1. Copy `/kb/areas/_template.md` to `/kb/areas/<area-slug>.md`.
2. Fill in: Coverage, Neighbourhoods, Notes.
3. Run `python -m rag.ingest`.
4. Add to `/web/lib/business.ts` `areas` array.

## 4. To update an FAQ

Edit `/kb/faq.md`. Each H3 (`### Question`) becomes a chunk. Add new H3s under the relevant H2 category, or add a new H2 category for new topics.

Run `python -m rag.ingest`.

## 5. After ANY KB change

```
cd chatbot
python -m rag.ingest
```

Takes 20-40 seconds (re-embeds everything via sentence-transformers). The Chroma store rebuilds in `./chroma/`. The running FastAPI service picks up the new index on its next query — no restart needed.

## 6. To change tone, voice, or rules

Edit `/chatbot/SYSTEM-PROMPT.md`. Restart the FastAPI service for the change to take effect:

```
# kill the running uvicorn, then:
uvicorn app:app --reload
```

## 7. To rollback any change

Every KB file is in git. To revert:

```
git log --oneline -- kb/
git revert <commit>
python -m rag.ingest
```

## 8. To audit what the chatbot said

Every transcript is saved to MongoDB collection `transcripts`. Each document has `session_id`, `messages` (the full conversation), and `created_at`. Query MongoDB Atlas in the Dubai cluster.

## 9. To test changes before going live

Run the eval set:

```
# In one terminal, start the server:
uvicorn app:app --reload

# In another, run evals:
python eval.py
```

This produces `evals-report.md` with pass/fail across 15 test cases. Aim for 13+ passes before considering a change shipped.
