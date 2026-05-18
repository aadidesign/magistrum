# STACK-NOTES.md — Stack-Specific + UX Domain Findings

These are notes consulted DURING Phase 6 build. Each section lists the relevant findings from UI UX Pro Max skill queries + general best practices for the Magistrum stack (Next.js 14 App Router + TypeScript + Tailwind + GSAP).

---

## §next-form-validation

**Source:** Standard Next.js App Router + react-hook-form + zod.

**Apply on:** Contact form, lead form on homepage hero, chatbot booking widget.

**Rules:**
- Use **react-hook-form** with **zod** schema as single source of truth.
- Validation triggers: `mode: "onBlur"` (not onChange — too aggressive for B2B who type slowly).
- Error messages: announce via `aria-live="polite"` region; associate with input via `aria-describedby`.
- Submit button: disabled while `isSubmitting`; replace button text with "Sending…" + spinner.
- Server-side: re-validate the same zod schema in the route handler — never trust client.
- Honeypot field (`bot_field`) hidden via `position: absolute; left: -9999px; top: auto;` — submission fails silently if filled.
- On submit success: server returns `{ ok: true, leadId }`; client redirects to `/thank-you?lead=<id>`.
- On submit error: keep the form filled, surface an error banner above the form, focus the banner.

---

## §next-component-patterns

**Apply on:** All `/web/components/`.

**Rules:**
- **Server Components by default.** Add `"use client"` only when the component needs state, refs, or browser APIs (forms, chatbot widget, GSAP, accordion).
- **Avoid wrapper hell.** Don't wrap `<Image>` in a div just to apply padding — apply padding via className.
- **Compose primitives.** Build `Button`, `Input`, `Card`, `Badge` once. Pages assemble them.
- **One `"use client"` boundary per interactive section.** Don't make the entire homepage a client component.
- **next/image** for every raster image with `width`, `height`, `alt`. `priority` only on hero image. `loading="lazy"` (default) on the rest.
- **next/link** for internal navigation — never `<a href>` for internal routes.
- **next/font** for typography — already configured in `app/layout.tsx`. Never CSS-import fonts.

---

## §responsive-layout

**Apply on:** Every section.

**Breakpoints (Tailwind defaults — match MASTER.md):**

| Token | Min-width | Test in |
|---|---|---|
| (none) | 0px | 375 (iPhone) |
| sm | 640 | small tablet portrait |
| md | 768 | iPad portrait |
| lg | 1024 | iPad landscape, small laptop |
| xl | 1280 | desktop |
| 2xl | 1536 | wide desktop |

**Patterns:**
- Mobile-first. Start with the smallest viewport, layer up with `md:` and `lg:`.
- Hero: mobile = stacked (heading → sub → CTA stack → visual below); desktop = 2-col (text left, visual right).
- Service grid: 1-col mobile → 2-col `md:` → 3-col `lg:`.
- Header: hamburger mobile + dropdown sheet; horizontal nav `lg:`+.
- Sticky mobile action bar: only on mobile (`lg:hidden`), 3 buttons (Call / WhatsApp / Book).
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

---

## §animation-reduced-motion

**Apply on:** Phase 6 step 15 (GSAP motion pass) + every interactive component.

**Rules:**
- Wrap GSAP timelines in a reduced-motion check:
```tsx
useGSAP(() => {
  if (typeof window === "undefined") return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    // set final state immediately, skip animation
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }
  // run timeline
  gsap.from(elements, { opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: "power3.out" });
}, { scope: containerRef });
```
- ScrollTrigger: always `once: true` so animations don't replay.
- CSS transitions on hover: respect via `@media (prefers-reduced-motion: reduce) { .card { transition: none; } }`.
- Never use looping background animations on body content.
- Hero ambient gradient: use CSS `transform` with very slow linear interpolation OR static. Disable on reduce-motion.

---

## §loading-states-skeleton

**Apply on:** Chatbot widget, form submit, page transitions.

**Rules:**
- **Form submit:** swap button label to "Sending…" + inline spinner SVG. Disable submit. Don't show a full-screen loader.
- **Chatbot streaming:** show a 3-dot animated indicator until first token arrives, then fade out as the token stream begins.
- **Page transitions in App Router:** rely on Next.js loading.tsx route convention; show a 4-row skeleton matching the page below-the-fold structure.
- **Skeletons should match the real layout's grid + spacing**, not be generic gray bars.

---

## §long-form-readability

**Apply on:** Blog posts.

**Rules:**
- Max line length: **65 characters** (`max-w-prose` in Tailwind ≈ 65ch).
- Paragraphs: 2–4 sentences. Single-sentence paragraphs allowed for emphasis.
- H2 every 200–300 words.
- Bullet lists for parallel items; numbered lists for sequential steps.
- Pull-quote every 600–800 words for breathing.
- Image every 800–1000 words minimum (visual-first rule).
- Code blocks: Fraunces is decorative; use `font-mono` (Inter Mono fallback or JetBrains Mono).
- Body type for blog: bump to 18px (text-lg) line-height 1.7 for comfortable reading.
- Show estimated reading time at top.
- Sticky TOC on `lg:`+ if article > 1500 words.

---

## §focus-states-keyboard-navigation

**Apply on:** Every interactive element.

**Rules:**
- Use Tailwind's `focus-visible:` not `focus:` — only show ring on keyboard nav, not on mouse click.
- Ring style: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg`.
- Skip-to-content link as first focusable in body: visually hidden until focused.
- Tab order: header → main content → footer. Never set `tabindex` > 0.
- Modal/dialog: trap focus inside while open; return focus to trigger on close.
- Mobile nav sheet: trap focus while open.

---

## §form-error-states-accessibility

**Apply on:** All forms (contact, hero lead, chatbot booking).

**Rules:**
- Errors are announced via `<div role="alert" aria-live="polite">` placed below each field.
- `aria-invalid="true"` on the input when in error state.
- `aria-describedby` links input to error message.
- Error message format: "[Field name] [problem]" — e.g. "Email must be a valid address" not "Invalid".
- Required-field indicators: visible asterisk in copy, not just `required` attribute, and an "* required" legend at the top of the form.
- Submit-blocked feedback: focus the first invalid field on submit attempt.

---

## §motion-tokens

From MASTER.md spacing/motion section:

| Token | Value | Use |
|---|---|---|
| `--motion-fast` | 150ms | Micro: button hover, focus ring fade |
| `--motion-base` | 250ms | Standard: card hover lift, link underline |
| `--motion-slow` | 400ms | Modal open, accordion expand |
| Easing default | `cubic-bezier(0.16, 1, 0.3, 1)` (power3.out) | Entrances |
| Easing emphasis | `cubic-bezier(0.65, 0, 0.35, 1)` (inOutCubic) | Modals, page transitions |

---

## §json-ld-localBusiness

**Apply on:** Homepage, every service page, every area page, contact page.

**Pattern:**
- Homepage: `LocalBusiness` schema with `@type: "ProfessionalService"`, full NAP, `aggregateRating` (5.0 from 0 publicly visible reviews — use cautiously; placeholder until reviews populate), `areaServed` listing all emirates.
- Service pages: `Service` schema + `BreadcrumbList`.
- Area pages: `LocalBusiness` schema (one per area) + `BreadcrumbList`.
- Blog: `Article` schema with author, datePublished, articleBody.
- Validate every block against schema.org via a build-time check.
