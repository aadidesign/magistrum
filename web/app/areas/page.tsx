import type { Metadata } from "next";
import Link from "next/link";
import { areas } from "@/lib/business";
import { Card, SectionHeader } from "@/components/ui/Card";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FadeUp } from "@/components/motion/FadeUp";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Areas We Cover, Zoho Implementation Across the UAE",
  description: "Dubai, Sharjah, Abu Dhabi, Ajman and Northern Emirates. Onsite where it matters, remote where it's efficient.",
};

export default function AreasIndex() {
  return (
    <>
      <div className="container py-10 sm:py-12 lg:py-16">
        <span className="eyebrow">Areas</span>
        <h1 className="text-[2rem] leading-[1.1] sm:text-4xl lg:text-5xl font-serif font-semibold text-navy-800 tracking-tight max-w-3xl text-balance">
          We work with SMEs across the UAE.
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-ink-secondary max-w-2xl leading-relaxed">
          Dubai is home, but the team works wherever you are. Onsite for Dubai engagements as standard, remote-first elsewhere with periodic site visits.
        </p>
      </div>
      <section className="section">
        <div className="container">
          <FadeUp selector=".a-card" stagger={0.08}>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
              {areas.map((a) => (
                <Link key={a.slug} href={`/areas/${a.slug}`} className="a-card">
                  <Card interactive className="p-5 sm:p-6">
                    <MapPin size={22} className="text-gold-600 mb-3" aria-hidden />
                    <h2 className="text-xl sm:text-2xl font-serif font-semibold text-navy-800 leading-tight">{a.name}</h2>
                    <p className="mt-2 text-sm sm:text-base text-ink-secondary">{a.short}</p>
                    <div className="mt-3 sm:mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-700">Explore <ArrowRight size={14} aria-hidden /></div>
                  </Card>
                </Link>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
