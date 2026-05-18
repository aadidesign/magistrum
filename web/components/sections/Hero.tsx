"use client";
import Link from "next/link";
import { CheckCircle2, Star, Phone, MessageCircle, ShieldCheck, MapPin } from "lucide-react";
import { business } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/motion/FadeUp";
import { CornerOrnament, DotGrid } from "@/components/ui/Decor";

export function Hero() {
  return (
    <section className="relative gradient-hero overflow-hidden">
      <div className="absolute inset-0 text-navy-900 pointer-events-none" aria-hidden>
        <DotGrid className="absolute inset-0 opacity-50" />
      </div>
      <CornerOrnament className="absolute -top-10 -left-10 w-32 sm:w-64 h-32 sm:h-64 opacity-50 pointer-events-none" aria-hidden />

      <div className="container relative py-8 sm:py-14 md:py-20 lg:py-24 grid lg:grid-cols-[1.15fr_1fr] gap-8 sm:gap-12 lg:gap-14 items-center">
        <FadeUp selector=".hero-stagger" stagger={0.1}>
          <div className="hero-stagger">
            {/* Mobile-tuned badge: shorter copy, wraps cleanly, no truncation */}
            <span className="badge-gold inline-flex items-center gap-1.5 sm:gap-2 max-w-full leading-snug whitespace-normal">
              <CheckCircle2 size={14} aria-hidden className="flex-shrink-0" />
              <span className="sm:hidden">Zoho Authorised Partner · UAE</span>
              <span className="hidden sm:inline">Zoho Authorised Training &amp; Implementation Partner</span>
            </span>
          </div>

          <h1 className="hero-stagger mt-4 sm:mt-5 text-[2.125rem] leading-[1.06] sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-navy-900 tracking-tight sm:leading-[1.05] text-balance">
            Live on Zoho in <span className="text-gold-600">days, not months</span>.
          </h1>

          <p className="hero-stagger mt-3 sm:mt-5 text-[15px] leading-[1.55] sm:text-lg md:text-xl text-ink-secondary max-w-xl sm:leading-relaxed">
            For UAE SMEs navigating VAT, Corporate Tax and growth: your finance and sales stack configured, migrated and trained on by an Authorised Zoho partner based in Dubai.
          </p>

          <div className="hero-stagger mt-5 sm:mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <Link href="/contact" className="w-full sm:w-auto"><Button variant="primary" size="lg" className="w-full sm:w-auto">Book Free Discovery Call</Button></Link>
            <a href={business.whatsapp.link()} target="_blank" rel="noopener" className="w-full sm:w-auto">
              <Button variant="whatsapp" size="lg" type="button" className="w-full sm:w-auto">
                <MessageCircle size={18} aria-hidden /> WhatsApp Us
              </Button>
            </a>
          </div>

          {/* Trust strip — chip pills on mobile, inline on desktop */}
          <div className="hero-stagger mt-4 sm:mt-6">
            {/* Mobile: chip pills */}
            <div className="sm:hidden flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-elevated border border-border text-xs text-ink-secondary">
                <Star size={12} className="fill-gold-500 text-gold-500" aria-hidden />
                <span className="font-semibold text-navy-800">5.0</span>
                <span className="text-ink-muted">Google</span>
              </span>
              <a href={business.phone.primary.tel} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-elevated border border-border text-xs text-navy-800 font-semibold hover:border-gold-400 transition-colors">
                <Phone size={12} aria-hidden />
                <span className="whitespace-nowrap">{business.phone.primary.display}</span>
              </a>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-elevated border border-border text-xs text-ink-secondary">
                <ShieldCheck size={12} className="text-gold-600" aria-hidden />
                VAT &amp; CT ready
              </span>
            </div>
            {/* Desktop / tablet: original inline strip */}
            <div className="hidden sm:flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
              <span className="flex items-center gap-1.5">
                <Star size={14} className="fill-gold-500 text-gold-500" aria-hidden />
                <span className="font-semibold text-navy-800">5.0</span> on Google
              </span>
              <span className="w-px h-3 bg-border" aria-hidden />
              <span className="flex items-center gap-1.5">
                <Phone size={14} aria-hidden />
                <a href={business.phone.primary.tel} className="font-semibold text-navy-800 hover:text-navy-600 whitespace-nowrap">{business.phone.primary.display}</a>
              </span>
              <span className="w-px h-3 bg-border" aria-hidden />
              <span>UAE VAT &amp; Corporate Tax ready</span>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.2} className="relative">
          <div className="relative rounded-2xl bg-surface-elevated border border-border shadow-xl p-5 sm:p-6 lg:p-7">
            <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
              <span className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-gold-700 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600 chatbot-blink" aria-hidden />
                A typical engagement
              </span>
              <span className="text-[10px] sm:text-xs text-ink-muted font-medium whitespace-nowrap">7&ndash;14 days</span>
            </div>
            <ol className="relative space-y-2.5 sm:space-y-3 text-sm">
              {/* Vertical connector line behind the numbered chips */}
              <span className="absolute left-[13px] sm:left-[14px] top-2 bottom-2 w-px bg-gradient-to-b from-gold-200 via-border to-gold-200" aria-hidden />
              {[
                { day: "Day 1", txt: "Discovery call: your business, your stack, your gaps." },
                { day: "Day 2 to 4", txt: "Configure Zoho Books with UAE VAT and Corporate Tax codes." },
                { day: "Day 5 to 7", txt: "Migrate customers, suppliers and opening balances." },
                { day: "Day 8 to 10", txt: "Team training (3 hours, recorded for replay)." },
                { day: "Day 11 to 14", txt: "Go-live plus 30 days of adoption support." },
              ].map((s, i) => (
                <li key={s.day} className="relative flex gap-3 group">
                  <span className="relative z-10 flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-navy-800 text-gold-400 font-serif font-semibold text-[11px] shadow-sm ring-2 ring-surface-elevated" aria-hidden>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <span className="font-semibold text-navy-800 text-[13px] sm:text-sm">{s.day}</span>
                    <span className="block text-ink-secondary leading-snug text-[13px] sm:text-sm">{s.txt}</span>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-border grid grid-cols-3 gap-2 sm:gap-3 text-center">
              <Pill icon={ShieldCheck} value="Authorised" label="by Zoho" />
              <Pill icon={MapPin} value="UAE &amp; India" label="Two offices" />
              <Pill icon={Star} value="5.0" label="on Google" />
            </div>
          </div>
          <div className="absolute -z-10 -top-10 -right-10 w-48 sm:w-72 h-48 sm:h-72 bg-gold-200 rounded-full blur-3xl opacity-40" aria-hidden />
          <div className="absolute -z-10 -bottom-12 -left-8 w-44 sm:w-64 h-44 sm:h-64 bg-navy-200 rounded-full blur-3xl opacity-40" aria-hidden />
        </FadeUp>
      </div>
    </section>
  );
}

function Pill({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 min-w-0">
      <Icon size={16} className="text-gold-600 mb-1 flex-shrink-0" aria-hidden />
      <div className="text-xs sm:text-sm font-serif font-semibold text-navy-800 leading-tight text-center" dangerouslySetInnerHTML={{ __html: value }} />
      <div className="text-[10px] text-ink-muted uppercase tracking-wider text-center leading-tight" dangerouslySetInnerHTML={{ __html: label }} />
    </div>
  );
}
