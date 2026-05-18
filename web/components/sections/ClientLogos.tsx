import { Marquee } from "@/components/ui/Marquee";
import { FadeUp } from "@/components/motion/FadeUp";

// Verified-only credibility row. No fake client names: instead, surface the
// real markers Magistrum can stand behind today (badges + locations + the
// real Google rating). Replace with named-client logos post-conversion.
const credibility = [
  { label: "Zoho Authorised Training Partner", kind: "badge" },
  { label: "Authorised Tally Prime Centre", kind: "badge" },
  { label: "5.0 on Google", kind: "metric" },
  { label: "Dubai · Mumbai · Palakkad", kind: "location" },
  { label: "UAE VAT & Corporate Tax ready", kind: "capability" },
  { label: "DED licensed LLC", kind: "badge" },
  { label: "FTA-aligned invoicing", kind: "capability" },
  { label: "30 days post-go-live support", kind: "capability" },
];

const styles: Record<string, string> = {
  badge: "border-gold-500/40 bg-gold-50 text-gold-800",
  metric: "border-navy-200 bg-navy-50 text-navy-800",
  location: "border-border bg-surface-elevated text-navy-800 font-serif italic",
  capability: "border-border bg-surface-elevated text-ink-secondary",
};

export function ClientLogos() {
  return (
    <section className="bg-surface-elevated border-y border-border overflow-hidden">
      <div className="container py-8">
        <FadeUp>
          <p className="text-center text-xs uppercase tracking-widest text-ink-muted font-semibold mb-6">
            What we can stand behind today
          </p>
        </FadeUp>
      </div>
      <FadeUp>
        <Marquee speed={50}>
          {credibility.map((c, i) => (
            <div
              key={i}
              className={`px-5 py-2.5 rounded-full border text-sm font-medium tracking-tight whitespace-nowrap ${styles[c.kind]}`}
            >
              {c.label}
            </div>
          ))}
        </Marquee>
      </FadeUp>
      <p className="text-center text-[11px] text-ink-muted/70 mt-5 px-4">
        Named client logos will be added once Magistrum confirms permissions. We do not display logos we cannot evidence.
      </p>
    </section>
  );
}
