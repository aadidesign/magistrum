# PITCH — Magistrum Corpserve Solutions LLC

A pitch-ready Lead Capture System purpose-built for **Magistrum Corpserve Solutions LLC**, the Zoho Authorised Training & Implementation Partner at Unit R05, Bin Sougat Building, DIP-1, Dubai.

---

## Why this site will outperform the current one

The current `magistrum.in` site is structured as an Indian training/practice portal — Magistrum's UAE positioning, DIP-1 office and Zoho Authorised Partner badge live below the fold (or not at all on key pages). It speaks to job-seekers and individual learners more clearly than to UAE SME founders and CFOs, who are the buyers driving the implementation revenue.

This site flips the model. UAE B2B buyers see "Zoho Authorised Partner in Dubai" + "Live on Zoho in days, not months" + a 5.0 Google rating in the first 600 pixels. Persona Rashid (founder) and Persona Priya (finance manager) — both surfaced in `RESEARCH-AUDIENCE.md` — get answers to their two biggest anxieties (UAE Corporate Tax + how much it costs) without scrolling. The site is also the only Zoho-partner site in the local cohort (per `RESEARCH-NICHE.md §A`) that frames the **dual offer (Implementation + Training)** as visually inseparable on the homepage rather than as separate pages.

---

## What's specifically tailored to Magistrum

- **Hero structure built around the top buyer anxiety, not generic SaaS copy.** Headline "Live on Zoho in **days, not months**" answers Persona Rashid's #1 question (RESEARCH-AUDIENCE.md §Rashid §Anxiety #1: "how long will this drag on?"). Sub-hero specifies UAE VAT + Corporate Tax — the two compliance hooks `RESEARCH-NICHE.md §C` identifies as the niche's biggest opportunity. Hero pattern from `design-system/magistrum/pages/homepage.md §HeroCentric` reconciled with `STRATEGY.md §8`.

- **Dual-offer block is the second section.** A side-by-side comparison of Implementation (dark navy card with gold accent) vs. Authorised Training (light card with navy accent) — visually paired, never split. This is the gap identified in `RESEARCH-NICHE.md §Gaps #1`: every local competitor treats one or the other as the secondary; Magistrum is the only practice doing both at scale.

- **UAE Corporate Tax dedicated section + anchor blog post.** A full section ("Built for UAE VAT, Corporate Tax and the 2026 e-invoicing rollout") plus a 1,500-word fully-written blog post ("UAE Corporate Tax on Zoho Books: a 2026 Setup Guide") at `/blog/uae-corporate-tax-zoho-books-2026`. This is the lead-magnet anchor per `STRATEGY.md §3` — addresses the most-Googled concern for UAE finance teams right now.

- **Cross-border story made visible.** "Three offices. Two countries. One team you can actually call." appears on the About page hero — the Dubai + Mumbai + Palakkad practice is treated as a real asset, not buried in a corporate footer. Gap addressed: `RESEARCH-NICHE.md §Gaps #5`.

- **WhatsApp as a first-class CTA.** Every section that has a "Book Discovery Call" button has an equal-weight "WhatsApp Us" button with a pre-filled message. Mobile sticky bottom bar = Phone | WhatsApp | Book. Reason: `.region.json §communication_channel_preferences` confirms WhatsApp is the de-facto UAE B2B contact channel — no local competitor surveyed treats it as first-class.

- **Compliance footer with DED licence + VAT TRN slots.** Required by UAE B2B reader expectations per `.region.json §legal_compliance` — Persona Rashid's Trust Trigger #2 from `RESEARCH-AUDIENCE.md`.

- **Premium typography pairing.** Fraunces serif headlines + Inter body — the pairing best-in-class B2B consultancies use (A2Z Cloud / Customerization global peers per `RESEARCH-NICHE.md §B`). Local competitor cohort all default to Open Sans / Roboto. Decision rationale documented in `BRAND.md §Reconciliation`.

- **A real RAG chatbot grounded in actual Magistrum facts.** The chatbot reads from `/chatbot/kb/` — actual NAP, actual services from GMB, actual hours, real FAQs, and a niche-knowledge file built from the May 2026 Google Workspace vs Zoho Workplace blog post Magistrum themselves published two days before scrape. Booking flow captures discovery-call requests to MongoDB + emails the team via Brevo.

---

## Suggested cold-email subject + opening line

**Subject:** Built a site for Magistrum's Dubai pitch — Zoho-partner positioning, UAE CT angle

**Opening line:**

> Seema — built a sample lead-capture site for Magistrum's UAE practice. It leans into the Zoho Authorised Partner + UAE Corporate Tax angle (which your magistrum.in site doesn't surface), pairs the implementation + Authorised Training offers as one story (which nobody else in the Dubai cohort does), and ships with a working RAG chatbot that already answers real Zoho/CT/VAT questions and books discovery calls. Live preview here: [URL]. Happy to walk through it on a 20-minute call if useful.

---

## Demo URLs

- **Local dev:** `http://localhost:3000` (after `cd web && npm install && npm run dev`)
- **Deployed (Vercel):** [paste after first deploy — e.g. https://magistrum-pitch.vercel.app]
- **Chatbot service (Render):** [paste after first deploy — e.g. https://magistrum-chatbot.onrender.com]

---

## How to take pitch screenshots

### Desktop (1440 × 900)

1. Open Chrome on a Mac/Windows with a 1440-wide window.
2. Visit the deployed site.
3. Use **Awesome Screenshot** or DevTools (Cmd-Shift-P → "Capture full size screenshot").
4. Capture:
   - Homepage full page
   - `/services/zoho-books` full page
   - `/blog/uae-corporate-tax-zoho-books-2026` full page
   - Chatbot widget open with one Q&A visible
5. Save to `/pitch-assets/desktop/`.

### Mobile (390 × 844 — iPhone 14 Pro)

1. DevTools → toggle device toolbar → iPhone 14 Pro.
2. Capture full page for the same four pages.
3. Save to `/pitch-assets/mobile/`.

(Note: `/pitch-assets/` is not yet created. Run the screenshots after deploy.)

---

## Production migration note

Sample mode runs on:
- **Vercel** (web) — free tier, ~99.9% SLA
- **Render** free tier (chatbot) — sleeps after 15 mins inactivity
- **Groq** (LLM) — free tier, fast inference
- **MongoDB Atlas M0** (free, 0.0.0.0/0 IP allowlist for sample simplicity)
- **Brevo** (free 300 emails/day)

When Magistrum signs on, the path to production is:

1. **Web → stays on Vercel or moves to client's Hostinger VPS** (no code change either way).
2. **Chatbot → moves to client's VPS.** Switch `LLM_PROVIDER=ollama` in `.env`, run `ollama pull llama3.2:3b` on the VPS, point the widget at the new URL via `NEXT_PUBLIC_CHATBOT_API_URL`. **No code changes required.**
3. **MongoDB → dedicated cluster.** Tighten IP allowlist to the VPS only, dedicated user with least-privilege roles (read+write on `leads`/`appointments`/`transcripts` only).
4. **Brevo → custom sender domain.** Switch from single-sender to a verified domain (e.g. `notifications@magistrum.net`).
5. **Razorpay / Twilio / Calendar API** — currently stubbed with TODO comments. Wire in only if the client wants live payment, SMS or calendar integration.

The whole conversion is roughly a one-afternoon job for whoever inherits it. The `chatbot/UPDATE-PLAYBOOK.md` walks the client through how to update the KB themselves afterwards — no developer needed for content changes.
