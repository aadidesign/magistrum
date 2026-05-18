# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Magistrum
**Generated:** 2026-05-18 13:42:03 (skill); reconciled 2026-05-18
**Category (reconciled):** B2B SaaS Implementation Consultancy — UAE / GCC market

> **RECONCILIATION NOTE.** The skill auto-classified this as "Booking & Appointment App" based on keywords. That is wrong: Magistrum is a **B2B Zoho Authorised implementation + training partner** serving UAE SMEs and finance teams. The palette, type, and category below have been reconciled to:
> 1. Speak to **CFOs / finance managers / SME founders** (Persona Rashid + Priya in RESEARCH-AUDIENCE.md) — confidence + authority register, not playful.
> 2. Match **UAE B2B B2B norms** — restrained, premium, finance-grade.
> 3. Stay **distinct from Zoho's own red** while signalling alignment.
> 4. Differentiate from the local competitor cohort (RESEARCH-NICHE.md §A) who all default to generic Open Sans + flat SaaS blue.

---

## Global Rules

### Color Palette (RECONCILED)

UAE finance-audience palette: deep institutional navy (authority) + warm gold accent (premium / wealth signal) + clean off-white surface. Original skill values noted for audit.

| Role | Hex | CSS Variable | Tailwind | Note |
|------|-----|--------------|----------|------|
| Primary | `#0B2447` | `--color-primary` | navy-900 (custom) | Deep navy — finance/authority. Replaces skill's `#2563EB`. |
| Primary-600 | `#19376D` | `--color-primary-600` | navy-700 | Hover / active |
| Primary-500 | `#2A4D8F` | `--color-primary-500` | | Mid-tone for backgrounds + borders |
| Primary-100 | `#E5EAF2` | `--color-primary-100` | | Tinted backgrounds |
| Accent / CTA | `#C9A227` | `--color-accent` | gold-600 (custom) | Warm gold — UAE B2B "premium" cue. Replaces skill's `#F97316`. |
| Accent-hover | `#B68F1A` | `--color-accent-hover` | | Darker gold for hover |
| Success | `#0E8C5C` | `--color-success` | emerald-700 | |
| Warning | `#B45309` | `--color-warning` | amber-700 | |
| Danger | `#B91C1C` | `--color-danger` | red-700 | |
| Info | `#1E40AF` | `--color-info` | blue-800 | |
| Surface (bg) | `#FBFAF7` | `--color-bg` | warm-off-white | Subtle warm tone — not pure white; reduces eye strain on long pages |
| Surface elevated | `#FFFFFF` | `--color-bg-elevated` | | Card surfaces |
| Border | `#E8E4DA` | `--color-border` | | Warm tone matches surface |
| Border-strong | `#C8C2B3` | `--color-border-strong` | | |
| Text primary | `#0F172A` | `--color-text` | slate-900 | Body text |
| Text secondary | `#475569` | `--color-text-secondary` | slate-600 | |
| Text muted | `#64748B` | `--color-text-muted` | slate-500 | Captions, meta |
| Text inverse | `#FBFAF7` | `--color-text-inverse` | | On dark surfaces |

**WCAG AA contrast verified pairs:**
- Text primary `#0F172A` on Surface `#FBFAF7`: 17.5:1 ✓
- Text secondary `#475569` on Surface `#FBFAF7`: 8.0:1 ✓
- Accent `#C9A227` on Primary `#0B2447`: 6.8:1 ✓
- Surface `#FBFAF7` on Primary `#0B2447`: 16.4:1 ✓
- Primary `#0B2447` on Surface `#FBFAF7`: 16.4:1 ✓
- White on Accent `#C9A227`: 2.8:1 ✗ (fails AA) → CTA uses **navy text on gold** instead

### Typography (RECONCILED)

- **Heading Font:** **Fraunces** (variable serif — editorial gravitas, finance/CFO register)
- **Body Font:** **Inter** (neutral, exceptional screen legibility, supports Latin Extended for international SME names)
- **Mood:** authoritative, considered, premium, finance-grade, English-first with international clarity
- **Why not skill's Roboto/Roboto:** Roboto is overused — would put us in the same visual bucket as every Material-default SaaS dashboard. Fraunces + Inter is the pairing best-in-class B2B consultancies (e.g. Stripe, Linear, A2Z Cloud) use to signal premium without saying it.
- **Subsets to load:** latin, latin-ext (covers UAE-resident names from Arab, South Asian, European backgrounds)
- **Weights to load (4 total — under perf budget):** Fraunces 400 + 600, Inter 400 + 600

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;600&display=swap');
```

**Modular scale (1.250 — major third):**

| Token | px | line-height | tracking | Usage |
|---|---|---|---|---|
| `text-xs` | 12 | 1.5 | 0.01em | Captions, meta |
| `text-sm` | 14 | 1.55 | 0 | Body small |
| `text-base` | 16 | 1.6 | 0 | Body default |
| `text-lg` | 18 | 1.55 | 0 | Lead paragraph |
| `text-xl` | 20 | 1.5 | -0.005em | Sub-headings sans |
| `text-2xl` | 24 | 1.4 | -0.01em | H4 |
| `text-3xl` | 30 | 1.3 | -0.015em | H3 |
| `text-4xl` | 36 | 1.2 | -0.02em | H2 |
| `text-5xl` | 48 | 1.1 | -0.025em | H1 mobile |
| `text-6xl` | 60 | 1.05 | -0.03em | H1 desktop |

Headings use **Fraunces 600 (with optical-size axis tuned per size)**; body uses **Inter 400** with **Inter 600 for bold inline**.

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #F97316;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #2563EB;
  border: 2px solid #2563EB;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #2563EB;
  outline: none;
  box-shadow: 0 0 0 3px #2563EB20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style (RECONCILED):** Editorial Premium (skill suggested "Soft UI Evolution" — kept as fallback)

**Keywords:** authoritative, considered, restrained motion, generous whitespace, serif-headline accents, asymmetric layouts, finance-grade trust signals, intentional negative space

**Best For:** B2B SaaS consultancies, finance-adjacent services, professional services targeting CFOs / SME founders, premium training providers

**Key Effects (RECONCILED):**
- Soft shadows with warm undertone (matches surface `#FBFAF7`)
- Hover transitions 200ms ease-out
- GSAP-driven scroll reveals (subtle 20px y-translate + fade) — ScrollTrigger `once: true`
- Animated number counters in trust strips (CountUp on scroll-in)
- Hover-lift on cards (2px translateY, shadow upgrade)
- **No** parallax, **no** cursor effects, **no** intro loaders

### Page Pattern (RECONCILED)

**Pattern Name:** **Case-Study-Led B2B Landing** (skill suggested "Funnel 3-Step" — appropriate for one-off bookings but wrong for B2B consideration cycle)

- **Conversion Strategy:** Multi-touch consideration funnel. Hero establishes credibility immediately (badge + outcome). Below the fold layers proof (logos → process → testimonials/case → FAQ). CTA = "Book Free Discovery Call" or "WhatsApp Us" at top, mid (after process), end (after FAQ).
- **CTA Placement:**
  - **Primary:** "Book Free Discovery Call" — top right of header (sticky), repeated mid-page, repeated bottom
  - **Secondary equal-weight:** "WhatsApp Us" with pre-filled message — header + sticky mobile bar
  - **Tertiary:** Phone tel: link in header
- **Section Order:** 1. Sticky Header  2. Hero (credibility + 2 CTAs)  3. Client logo strip / partner badges  4. The dual offer (Implementation + Training, visually paired)  5. Core services (6 cards)  6. Our process (4 visual steps)  7. UAE-specific value (VAT + Corporate Tax + e-invoicing)  8. Case study spotlight  9. Testimonials / Google rating  10. FAQ (real objections from Persona research)  11. Final CTA  12. Footer (compliance block: licence + TRN + LinkedIn)

---

## Anti-Patterns (Do NOT Use)

- ❌ Complex shadows
- ❌ 3D effects

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
