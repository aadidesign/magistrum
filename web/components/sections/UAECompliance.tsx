import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/motion/FadeUp";
import { DotGrid, CornerOrnament } from "@/components/ui/Decor";

const items = [
  "FTA-compliant tax invoice templates (bilingual EN and AR)",
  "VAT 201 quarterly return preview and submission from Zoho Books",
  "Corporate Tax (9%) tax-code configuration",
  "Small Business Relief setup if your revenue is under AED 3M",
  "Designated Zone vs Mainland treatment configured correctly",
  "e-invoicing readiness for the 2026 FTA rollout",
  "Multi-currency, multi-branch and consolidated reporting",
  "Audit-ready exports, straight to your auditor",
];

export function UAECompliance() {
  return (
    <section className="section relative bg-navy-800 text-surface overflow-hidden">
      <div className="absolute inset-0 text-surface pointer-events-none" aria-hidden>
        <DotGrid className="absolute inset-0 opacity-60" />
      </div>
      <CornerOrnament className="absolute top-8 right-8 w-40 h-40 opacity-40 pointer-events-none hidden lg:block" aria-hidden />
      <CornerOrnament className="absolute bottom-0 left-0 w-32 h-32 opacity-30 pointer-events-none hidden lg:block" aria-hidden />

      <div className="container relative grid lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-10 lg:gap-12 items-center">
        <FadeUp>
          <span className="badge-gold">UAE-specific</span>
          <h2 className="mt-3 sm:mt-4 text-[1.625rem] leading-[1.15] sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-surface text-balance">
            Built for UAE VAT, Corporate Tax and the 2026 e-invoicing rollout.
          </h2>
          <p className="mt-3 sm:mt-4 text-surface/80 leading-relaxed text-sm sm:text-base lg:text-lg max-w-md">
            Compliance is not an add-on. It is how we configure Zoho from day one. If you are moving off Excel or Tally, you will come out the other side with a clean FTA-aligned setup.
          </p>
          <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
            <Link href="/blog/uae-corporate-tax-zoho-books-2026" className="w-full sm:w-auto"><Button variant="primary" className="w-full sm:w-auto">Read the CT setup guide</Button></Link>
            <Link href="/contact" className="w-full sm:w-auto"><Button variant="secondary" className="w-full sm:w-auto border-gold-400 text-gold-400 hover:bg-gold-500 hover:text-navy-900">Book a free review</Button></Link>
          </div>
        </FadeUp>

        <FadeUp selector=".compl-item" stagger={0.05}>
          <ul className="space-y-2.5 sm:space-y-3 bg-navy-900/40 backdrop-blur border border-surface/10 rounded-2xl p-4 sm:p-6 lg:p-7">
            {items.map((it) => (
              <li key={it} className="compl-item flex items-start gap-2.5 sm:gap-3 text-sm sm:text-base text-surface/90 leading-snug">
                <CheckCircle2 size={18} className="text-gold-400 flex-shrink-0 mt-0.5 sm:w-5 sm:h-5" aria-hidden />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
