import { Search, Settings2, ArrowRightLeft, GraduationCap, Rocket, LifeBuoy } from "lucide-react";
import { SectionHeader } from "@/components/ui/Card";
import { FadeUp } from "@/components/motion/FadeUp";

const steps = [
  { icon: Search, n: "01", t: "Discovery", d: "Free 45-minute call. We learn your business, current stack and pain points. You leave with a written scope and timeline." },
  { icon: Settings2, n: "02", t: "Configure", d: "Zoho set up to your real processes: chart of accounts, UAE VAT codes, Corporate Tax, workflows and permissions." },
  { icon: ArrowRightLeft, n: "03", t: "Migrate", d: "Customers, suppliers, openings, history. We test against your closing balances and fix what does not match." },
  { icon: GraduationCap, n: "04", t: "Train", d: "Role-based training for finance, sales and operations teams. Recorded so new joiners can come up to speed without you re-teaching." },
  { icon: Rocket, n: "05", t: "Go-Live", d: "Cutover on a Saturday. Monday morning your team works on Zoho. We sit alongside for the first close." },
  { icon: LifeBuoy, n: "06", t: "Support", d: "30 days included. Optional retainer for month-end, VAT returns, Corporate Tax filing, and new module rollouts." },
];

export function Process() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="How we work"
          title="A six-phase methodology. No fog, no scope creep."
          description="From discovery to go-live, you will always know which phase we are in, which milestone is next, and who is accountable for what."
        />
        <FadeUp selector=".step" stagger={0.08}>
          <ol className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <div className="hidden lg:block absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" aria-hidden />
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.n} className="step relative">
                  <div className="card-interactive h-full p-5 sm:p-6 pl-[4.25rem] sm:pl-20 relative bg-surface-elevated">
                    <div className="absolute left-4 sm:left-5 top-4 sm:top-5 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-navy-800 text-gold-400 flex items-center justify-center font-serif text-base sm:text-lg font-semibold shadow-md">
                      {s.n}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={16} className="text-gold-700 flex-shrink-0" aria-hidden />
                      <span className="text-base sm:text-lg font-semibold text-navy-800">{s.t}</span>
                    </div>
                    <p className="text-sm text-ink-secondary leading-relaxed">{s.d}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </FadeUp>
      </div>
    </section>
  );
}
