import Link from "next/link";
import { ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/ui/Card";
import { FadeUp } from "@/components/motion/FadeUp";

export function DualOffer() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="One team, two halves"
          title="Implementation for your business. Certification for your team."
          description="Most Zoho partners do one or the other. We do both, under one roof, with one team, with knowledge that flows from your live setup straight into the training your people receive."
        />

        <FadeUp selector=".do-card" stagger={0.12}>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <Link href="/services/zoho-books" className="do-card group">
              <div className="card-interactive h-full p-5 sm:p-6 bg-gradient-to-br from-navy-800 to-navy-700 text-surface border-navy-700 hover:border-gold-500">
                <Briefcase size={26} className="text-gold-400 mb-3 sm:mb-4" aria-hidden />
                <div className="text-[11px] sm:text-xs uppercase tracking-widest text-gold-400 font-semibold">For Businesses</div>
                <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-surface leading-tight">Zoho Implementation</h3>
                <p className="mt-3 text-sm sm:text-base text-surface/80 leading-relaxed">
                  Configure, migrate, integrate and train. Books, CRM, Workplace, Finance Suite, Zoho One, built around your real business processes and UAE compliance.
                </p>
                <div className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 text-sm sm:text-base text-gold-400 font-semibold group-hover:gap-2.5 transition-all duration-base">
                  See implementation services <ArrowRight size={16} aria-hidden />
                </div>
              </div>
            </Link>

            <Link href="/services/training-zoho-books-certification" className="do-card group">
              <div className="card-interactive h-full p-5 sm:p-6 bg-surface-elevated border-border hover:border-gold-500">
                <GraduationCap size={26} className="text-navy-700 mb-3 sm:mb-4" aria-hidden />
                <div className="text-[11px] sm:text-xs uppercase tracking-widest text-gold-700 font-semibold">For Individuals & Teams</div>
                <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-navy-800 leading-tight">Authorised Training</h3>
                <p className="mt-3 text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Zoho Books and Tally Prime certification programmes, built for UAE finance teams and individual accountants. UAE VAT and Corporate Tax curriculum included.
                </p>
                <div className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 text-sm sm:text-base text-navy-800 font-semibold group-hover:gap-2.5 transition-all duration-base">
                  See training programmes <ArrowRight size={16} aria-hidden />
                </div>
              </div>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
