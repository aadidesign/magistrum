import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, Users, Info } from "lucide-react";
import { SectionHeader, Card } from "@/components/ui/Card";
import { FadeUp } from "@/components/motion/FadeUp";

// Illustrative scenario, not a specific client. Numbers are typical ranges for
// this kind of engagement based on industry research, not specific Magistrum
// outcomes. Real case studies will replace this block post-conversion.

export function CaseStudy() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="What an engagement looks like"
          title="From Excel and email to a clean Zoho stack."
          description="An illustrative scenario for a typical UAE trading SME. Real engagement details vary; we share named client references on request."
        />

        <FadeUp selector=".cs" stagger={0.1}>
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 sm:gap-8 items-stretch">
            <Card className="cs h-full p-5 sm:p-6">
              <div className="badge-navy mb-3 sm:mb-4">Illustrative scenario: UAE SME, Trading</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-navy-800 leading-tight">The brief</h3>
              <p className="mt-3 text-sm sm:text-base text-ink-secondary leading-relaxed">
                A Dubai-based trading SME running on Excel for accounting, Gmail for sales, and separate spreadsheets for inventory. With a Corporate Tax filing deadline approaching, they needed accounting that the FTA would accept, a real CRM the sales team would actually use, and inventory that updated revenue automatically.
              </p>
              <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-serif font-semibold text-navy-800 leading-tight">What an engagement typically covers</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-secondary leading-relaxed list-disc pl-5">
                <li>Configure Zoho Books with FTA-compliant tax codes (VAT 5%, Corporate Tax 9%, Designated Zone where applicable)</li>
                <li>Migrate historical transactions and tie out to the auditor's balances</li>
                <li>Set up Zoho Inventory linked to Books for real-time COGS</li>
                <li>Configure Zoho CRM around the actual sales pipeline</li>
                <li>Role-based training for finance, sales and operations, recorded for replay</li>
                <li>First VAT 201 filed from Zoho within the first quarter after go-live</li>
              </ul>
              <div className="mt-4 flex items-start gap-2 text-xs text-ink-muted bg-surface-warm/40 border border-border rounded-lg p-3">
                <Info size={14} className="text-gold-700 flex-shrink-0 mt-0.5" aria-hidden />
                <span>Names and specific numbers are not used here. Named references available on request once you're shortlisted as a fit.</span>
              </div>
              <Link href="/contact" className="mt-5 sm:mt-6 inline-flex items-center gap-1 text-sm sm:text-base text-navy-800 font-semibold hover:gap-2 transition-all duration-base">
                Discuss a similar engagement <ArrowRight size={16} aria-hidden />
              </Link>
            </Card>

            <div className="cs grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
              <div className="rounded-xl p-5 sm:p-6 transition-all duration-base ease-out-quart border bg-gradient-to-br from-gold-50 to-gold-100 border-gold-200">
                <Clock size={24} className="text-gold-700 mb-2 sm:mb-3" aria-hidden />
                <div className="text-2xl sm:text-3xl font-serif font-semibold text-navy-900 leading-tight">7 to 14 days</div>
                <div className="text-xs sm:text-sm text-ink-secondary mt-1 leading-snug">Typical timeline from kickoff to first transaction posted in Zoho Books for a UAE SME.</div>
              </div>
              <div className="rounded-xl p-5 sm:p-6 transition-all duration-base ease-out-quart border bg-navy-800 border-navy-700 text-surface">
                <TrendingUp size={24} className="text-gold-400 mb-2 sm:mb-3" aria-hidden />
                <div className="text-2xl sm:text-3xl font-serif font-semibold text-surface leading-tight">FTA-clean</div>
                <div className="text-xs sm:text-sm text-surface/85 mt-1 leading-snug">First VAT 201 and Corporate Tax preview generated directly from Zoho Books, ready for your auditor.</div>
              </div>
              <div className="rounded-xl p-5 sm:p-6 transition-all duration-base ease-out-quart border bg-surface-elevated border-border">
                <Users size={24} className="text-navy-700 mb-2 sm:mb-3" aria-hidden />
                <div className="text-2xl sm:text-3xl font-serif font-semibold text-navy-900 leading-tight">Role-based</div>
                <div className="text-xs sm:text-sm text-ink-secondary mt-1 leading-snug">Finance, sales and operations trained on what they actually use, with recordings for new joiners.</div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
