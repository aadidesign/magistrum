import { ShieldCheck, Award, Globe2, Building2 } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";

const items = [
  { icon: ShieldCheck, label: "Zoho Authorised Training Partner" },
  { icon: Award, label: "Authorised Tally Prime Centre" },
  { icon: Globe2, label: "UAE + India practice" },
  { icon: Building2, label: "DED-licensed, FTA-registered" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-surface-elevated">
      <FadeUp selector=".tb-item" stagger={0.06}>
        <div className="container py-5 sm:py-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div key={it.label} className="tb-item flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-ink-secondary">
                <Icon size={18} className="text-gold-600 flex-shrink-0 sm:w-5 sm:h-5" aria-hidden />
                <span className="font-medium leading-snug">{it.label}</span>
              </div>
            );
          })}
        </div>
      </FadeUp>
    </section>
  );
}
