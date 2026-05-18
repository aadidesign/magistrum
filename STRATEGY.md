# STRATEGY — Conversion + SEO + Funnel Plan

Synthesises Phases 1–3 into the actual build plan.

---

## 1. Primary keyword + secondary set

| Tier | Keyword | Intent | Monthly volume (estimated) |
|---|---|---|---|
| Primary | **Zoho partner Dubai** | Commercial — direct intent | ~700 |
| 2 | Zoho Books implementation UAE | Commercial — high intent | ~400 |
| 3 | Zoho consultant Dubai | Commercial — comparison | ~300 |
| 4 | Zoho CRM implementation Dubai | Commercial — service-specific | ~250 |
| 5 | UAE Corporate Tax Zoho Books | Informational → commercial | ~600 |
| 6 | Zoho Books training Dubai | Educational + commercial (training funnel) | ~350 |

British spelling throughout per region (centre, organisation, optimise, licence).

---

## 2. Single biggest conversion lever for this niche + audience

**Make the dual offer (Implementation + Training) visually inseparable on the homepage, and make WhatsApp a first-class CTA.**

Local competitors split the two: they're either "Zoho consultancy" sites or "Tally training" sites. Magistrum is uniquely both. Make this visual (not a footer link).

Pair it with **WhatsApp click-to-chat with pre-filled message** at equal CTA weight — UAE B2B reality is WhatsApp-first.

---

## 3. Lead magnet recommendation

**Free PDF / downloadable:** *"UAE Corporate Tax + VAT Compliance Checklist on Zoho Books — 2026 edition"* (4–6 page PDF).

Why this:
- Anchors on the #1 audience anxiety (FTA compliance)
- Both Personas Rashid (founder) and Priya (finance manager) will share it internally
- Time-stamped to 2026 — feels fresh
- Drives email capture (the only lead-magnet justifiable form in B2B SaaS in this niche)

Stub the PDF as a placeholder asset in Phase 6; user supplies the real content post-conversion.

---

## 4. Funnel logic

```
HOMEPAGE
  ├─ Hero CTA #1: "Book Free Discovery Call" → /contact?service=discovery
  ├─ Hero CTA #2: "WhatsApp Us" → wa.me link with pre-filled message
  ├─ Service card click → /services/[slug] → CTA at top + bottom
  ├─ Lead magnet ribbon → /resources/uae-ct-checklist → email gate
  └─ Sticky mobile bar (Phone | WhatsApp | Book)

SERVICE PAGE
  ├─ Top CTA: "Discuss this for our business" (form modal)
  ├─ Mid CTA: "Get a Free Discovery Call"
  └─ Bottom CTA: "WhatsApp the Magistrum team"

AREA PAGE
  └─ Same as service page, area-specific copy

CONTACT FORM (/contact)
  Fields: First name, Last name, Company, Email, Phone (UAE format), Service (select), Message (optional, 500 chars max), Consent checkbox.
  Submit → POST /api/lead → MongoDB + Brevo email → 302 /thank-you?lead=<id>

THANK YOU
  ├─ Confirmation message + ETA ("Hi <First>, expect a reply within 1 working day")
  ├─ 3 secondary actions: WhatsApp now / Browse case studies / Read blog
  └─ 2 testimonials

CHATBOT (every page)
  ├─ Opens with niche-aware greeting
  ├─ Detects booking intent → switches to slot collection
  ├─ POST /book → /api/appointments → MongoDB + Brevo email
  └─ On dropoff, captures partial info → /api/lead
```

---

## 5. Funnel — channel preference

| Channel | Where | Use |
|---|---|---|
| **WhatsApp** | Primary | Every page header, hero hero, sticky mobile bar, every CTA section. Pre-filled message: "Hi Magistrum — I run a [type] business in [city]. I'd like to discuss [service]." |
| Phone | Secondary | tel: link in header, hero, footer, contact page. E.164 format. |
| Lead form | Tertiary | Homepage hero + dedicated /contact page. 4 fields max on hero; 6 on /contact. |
| Email | For proposals | After first WhatsApp/call, not for first contact |
| LinkedIn | Trust signal | Footer link only |
| SMS | Not used | UAE B2B doesn't use SMS for sales |

---

## 6. Sitemap

```
/                            Homepage
/services/                   Services index
/services/zoho-books         (priority service — UAE VAT/CT lead)
/services/zoho-crm
/services/zoho-workplace
/services/zoho-finance-suite
/services/zoho-one
/services/training-zoho-books-certification
/areas/                      Areas index
/areas/dubai                 (primary)
/areas/sharjah
/areas/abu-dhabi
/areas/ajman
/about                       Company story + cross-border + team
/contact                     Form + map + WhatsApp
/thank-you                   Post-submit confirmation
/blog                        Blog index
/blog/uae-corporate-tax-zoho-books-2026   (anchor blog post, fully written)
/blog/zoho-workplace-vs-google-workspace-uae   (mirrors their GMB post topic)
/blog/[…11 stubs…]
/resources/uae-ct-checklist  Lead magnet gate
/design-system               Internal style guide (noindex)
/privacy
/terms
/404
sitemap.xml
robots.txt
```

Service pages: **6 built** (covers Magistrum's top-tier offering). Remaining 14 services from `.gmb-data.json` are listed but not given full pages — they fall under the umbrella of the 6 anchor pages.

Area pages: **4 built** (Dubai, Sharjah, Abu Dhabi, Ajman). Northern Emirates rolled into Ajman page.

---

## 7. 12-post blog plan

| # | Title | Primary keyword | Intent | Words | Status in build |
|---|---|---|---|---|---|
| 1 | UAE Corporate Tax on Zoho Books: 2026 Setup Guide | UAE Corporate Tax Zoho Books | Informational → commercial | 1500 | **Fully written** |
| 2 | Zoho Workplace vs Google Workspace for UAE SMEs | Zoho Workplace UAE | Commercial comparison | 1200 | Frontmatter stub + outline (mirrors their recent GMB post) |
| 3 | How long does Zoho Books implementation actually take in the UAE? | Zoho Books implementation timeline | Commercial — overcomes objection | 1000 | Stub |
| 4 | VAT 201 in Zoho Books: a step-by-step for Dubai SMEs | VAT 201 Zoho Books Dubai | Informational | 1400 | Stub |
| 5 | Migrating from Tally to Zoho Books — what changes | Tally to Zoho Books migration | Commercial — comparison | 1100 | Stub |
| 6 | Zoho CRM for UAE real estate brokerages — a setup template | Zoho CRM real estate UAE | Industry-vertical | 1300 | Stub |
| 7 | Why your finance team should run Zoho Books certification | Zoho Books certification UAE | Training-funnel | 900 | Stub |
| 8 | UAE e-invoicing rollout: getting ready with Zoho Books | UAE e-invoicing Zoho | Informational | 1300 | Stub |
| 9 | Designated Zones and VAT in Zoho Books | Designated Zone VAT Zoho | Specialist | 1100 | Stub |
| 10 | Free Zone vs Mainland — what changes in your Zoho setup | Free Zone Mainland Zoho | Specialist | 1000 | Stub |
| 11 | Multi-branch Zoho Books for UAE retail | multi-branch Zoho Books UAE | Industry | 1200 | Stub |
| 12 | The actual cost of a Zoho partner in Dubai (transparent breakdown) | Zoho partner cost Dubai | Commercial — anti-objection | 1500 | Stub |

---

## 8. Synthesised design direction

| Decision | Source citation |
|---|---|
| Deep navy + warm gold palette | MASTER.md §Color Palette (RECONCILED) — finance-audience signaling, distinct from Zoho red |
| Fraunces + Inter type pairing | MASTER.md §Typography (RECONCILED) — premium peer benchmarks (A2Z Cloud, Customerization) per RESEARCH-NICHE.md §B |
| Hero = credibility-led (badge + outcome) not booking-form-led | pages/homepage.md §Hero, BRAND.md §Voice, RESEARCH-AUDIENCE.md Persona Rashid §Anxieties |
| Dual-offer (Implementation + Training) visually inseparable in hero | RESEARCH-NICHE.md §Gaps #1 |
| WhatsApp CTA at equal weight with primary CTA | RESEARCH-AUDIENCE.md Persona Rashid §Funnel preference; .region.json §communication_channel_preferences |
| British spelling throughout | .region.json §regional_idioms_and_spelling |
| Methodology section "Discovery → Configure → Migrate → Train → Go-live → Support" | RESEARCH-AUDIENCE.md Persona Priya §Trust Triggers #1 |
| UAE Corporate Tax featured on homepage AND dedicated landing | RESEARCH-NICHE.md §Gaps #4, STRATEGY.md §3 lead magnet |
| Compliance footer (DED licence + TRN) | .region.json §legal_compliance, RESEARCH-AUDIENCE.md Persona Rashid §Trust Triggers #2 |
| Cross-border (Dubai + Mumbai + Palakkad) as visible asset | RESEARCH-NICHE.md §Gaps #5 |
| Restrained GSAP motion (scroll-reveal + counters, no parallax/intro) | MASTER.md §Style (RECONCILED) §Key Effects |

---

## 9. GSAP motion plan

| Where | What | Why | Time |
|---|---|---|---|
| Hero | Staggered fade-up: badge → H1 → sub → CTAs | Sets premium tone instantly; first impression | 600ms total |
| Client logo strip | Scroll-in fade | Confirms trust as user scrolls past | 400ms |
| Service cards | Hover lift (2px translateY + shadow upgrade) | Tactile feedback; signals "clickable card" | 200ms |
| Process section | Scroll-in stagger across 4 steps | Walks the eye through the methodology | 800ms |
| Trust strip counters | CountUp on viewport enter | Brings static numbers to life | 1.5s once |
| Final CTA | Subtle pulse on the primary button (once, not looped) | Draws attention without nagging | 600ms once |
| Mobile menu | Slide + fade in | Standard UX expectation | 250ms |
| Reduced-motion mode | All animations replaced with `set` to final state | A11y mandate, STACK-NOTES §animation-reduced-motion | n/a |

NO parallax, NO cursor-follow, NO scroll-jacking, NO intros, NO confetti.
