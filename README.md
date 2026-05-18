# Magistrum Pitch Site

A pitch-ready Lead Capture System for **Magistrum Corpserve Solutions LLC** — a Zoho Authorised Training & Implementation Partner in Dubai, UAE.

Two services:

- **`/web`** — Next.js 14 App Router website (the public site).
- **`/chatbot`** — FastAPI + RAG chatbot service (answers Zoho questions, captures discovery-call bookings).

Designed to be deployed on **Vercel** (web) + **Render** (chatbot) with MongoDB Atlas for lead storage and Brevo for transactional email.

---

## Quick start (local)

### Prerequisites

- Node.js 20.x
- Python 3.11 or 3.12
- (Optional) MongoDB Atlas account, Brevo account, Groq API key

### Web

```powershell
cd web
copy .env.example .env.local
# Edit .env.local with your values
npm install
npm run dev
# Site on http://localhost:3000
```

If `npm install` fails with `UNABLE_TO_VERIFY_LEAF_SIGNATURE` (corporate proxy / cert chain issue):

```powershell
# One-off bypass for this install only (NOT a permanent config):
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
npm install
Remove-Item Env:NODE_TLS_REJECT_UNAUTHORIZED
```

### Chatbot

```powershell
cd chatbot
copy .env.example .env
# Edit .env with your values
pip install -r requirements.txt
python -m rag.ingest          # builds the Chroma index from /kb
uvicorn app:app --reload      # service on http://localhost:8000
```

The web `.env.local` should set `NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:8000` for the widget to talk to the local FastAPI service.

---

## Deployment (5-command path)

### 1. MongoDB Atlas (one-time)

Create a free M0 cluster named `pitch-samples`. Database name: `pitch_magistrum`. IP allowlist `0.0.0.0/0` for sample simplicity (tighten post-conversion). Copy the connection string.

### 2. Brevo (one-time)

Verify a sender domain or single-sender email. Generate an API key.

### 3. Groq (one-time)

Get an API key at console.groq.com. Free tier is more than enough for sample-mode traffic.

### 4. Vercel (web)

```powershell
cd web
npx vercel --prod
# Add env vars in Vercel dashboard from .env.example
# Set NEXT_PUBLIC_CHATBOT_API_URL to the Render URL once chatbot is deployed
```

### 5. Render (chatbot)

- New → Web Service → connect this repo, root `/chatbot`.
- Render auto-detects `render.yaml`.
- Fill the `sync: false` env vars from your Groq / MongoDB / Brevo accounts.
- After first deploy, copy the Render URL into the Vercel env `NEXT_PUBLIC_CHATBOT_API_URL` and redeploy web.

---

## Production migration (post-conversion)

When the client signs on and wants to move off the sample stack:

1. **VPS option** (Hostinger or similar): Migrate chatbot to a small VPS, switch `LLM_PROVIDER=ollama`, run `ollama pull llama3.2:3b` on the VPS, point the widget at the new chatbot URL.
2. **No code change required.** The LLM wrapper (`services/llm.py`) is provider-agnostic.
3. **Tighten MongoDB**: IP allowlist to the VPS only, dedicated user with least-privilege access.
4. **Brevo**: Move from single-sender to a domain sender on the client's domain.

See `PITCH.md` for the full pitch and migration notes.

---

## Repository structure

```
/web                Next.js 14 App Router site
  /app              Pages + API routes
  /components       UI primitives, sections, motion, chatbot widget
  /lib              business data, format, schema, db, brevo, cn helpers
  /content/blog     Blog post index + content
  /public/brand     Logo, favicon, OG image
  /.env.example
/chatbot            FastAPI + RAG service
  app.py            FastAPI entry point
  config.py         Env config
  /rag              KB loader, embeddings, Chroma, retrieval chain
  /services         LLM wrapper, Mongo, Brevo, booking flow
  /kb               Knowledge base (markdown files with YAML frontmatter)
    /services       One file per real Magistrum service
    /areas          One file per service area
    /client-overrides   Client-provided priority-0 overrides (empty by default)
  SYSTEM-PROMPT.md  Assistant system prompt
  UPDATE-PLAYBOOK.md  How to update the KB without redeploying
  evals.yaml + eval.py  15-case eval set
/design-system      UI UX Pro Max output: MASTER.md + page overrides
.gmb-data.json      Scraped + verified business facts
.region.json        Derived UAE region context
BRAND.md            Brand voice, banned phrases, required phrases
STRATEGY.md         Funnel logic, sitemap, blog plan, motion plan
RESEARCH-NICHE.md   Local + global Zoho-partner competitor analysis
RESEARCH-AUDIENCE.md  Three personas (Rashid, Priya, Aisha)
STACK-NOTES.md      Stack + UX domain query findings
PITCH.md            Cold-pitch deliverables
BUILD-STATE.md      Per-phase status log
CITATIONS.md        UAE directories to claim post-conversion
```

---

## What's left for the user before sending the pitch

1. `npm install` in `/web` and resolve any SSL issue (see above).
2. Fill `web/.env.local` and `chatbot/.env` from the `.env.example` templates.
3. Set up the three accounts (MongoDB Atlas, Brevo, Groq) — see Deployment section.
4. Deploy via Vercel + Render.
5. Update `web/lib/business.ts` `compliance.dedLicence` and `compliance.vatTrn` with the real DED + FTA numbers.
6. Confirm full-week hours (only Monday is published on GMB; the build assumes Mon-Sat 9-9).
7. Take pitch screenshots and add real client logos when available (see PITCH.md).
