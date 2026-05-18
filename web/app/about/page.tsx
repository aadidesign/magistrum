import type { Metadata } from "next";
import Image from "next/image";
import { Globe2, ShieldCheck, Award, MapPin, Star, Briefcase, Heart, Users2 } from "lucide-react";
import { SectionHeader, Card } from "@/components/ui/Card";
import { FadeUp } from "@/components/motion/FadeUp";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { business } from "@/lib/business";
import { IMAGES, img } from "@/lib/imagery";

export const metadata: Metadata = {
  title: "About Magistrum Corpserve Solutions LLC",
  description: "Co-founded by Haridas Krishna (25 plus years in finance) and Seema Krishna (Oracle Certified IT). Dubai head office plus Mumbai practice.",
};

export default function AboutPage() {
  return (
    <>
      <section className="gradient-hero">
        <div className="container py-10 sm:py-14 lg:py-20 grid lg:grid-cols-[1.2fr_1fr] gap-8 sm:gap-10 items-center">
          <FadeUp>
            <span className="eyebrow">About us</span>
            <h1 className="text-[2rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-navy-900 tracking-tight max-w-3xl text-balance">
              Co-founded by a finance professional and an IT professional. Built across two countries.
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-ink-secondary max-w-2xl leading-relaxed">
              Magistrum Corpserve Solutions LLC (MCS) was co-founded by Haridas Krishna, a finance professional with over 25 years of experience across the Middle East and India, and Seema Krishna, an Oracle Certified IT professional who has worked with leading IT firms in the Middle East. The company is headquartered in Dubai, UAE, with a sister practice in Mumbai, India operating as Magistrum Corpserve Private Limited.
            </p>
          </FadeUp>
          <FadeUp delay={0.15} className="hidden lg:block">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-xl">
              <Image src={img(IMAGES.modernOffice, 800, 600)} alt={IMAGES.modernOffice.alt} fill sizes="40vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 to-transparent" aria-hidden />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Founders" title="The people behind Magistrum." />
          <FadeUp selector=".f" stagger={0.1}>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
              {business.founders.map((f) => (
                <Card key={f.name} className="f p-5 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-navy-800 text-gold-400 flex items-center justify-center font-serif text-xl sm:text-2xl font-semibold">
                      {f.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-lg sm:text-xl font-semibold text-navy-800 leading-tight">{f.name}</div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gold-700 font-semibold mt-0.5">{f.role}</div>
                      <p className="mt-2 sm:mt-3 text-ink-secondary text-sm leading-relaxed">{f.bio}</p>
                      <a href={`mailto:${f.email}`} className="mt-2 sm:mt-3 inline-block text-xs text-navy-700 font-semibold hover:text-gold-700 transition-colors break-all">{f.email}</a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section bg-surface-warm/40">
        <div className="container">
          <SectionHeader eyebrow="What we believe" title="A few principles that shape how we work." />
          <FadeUp selector=".b" stagger={0.08}>
            <div className="grid md:grid-cols-2 gap-5">
              <Card className="b">
                <Briefcase size={22} className="text-gold-600 mb-3" aria-hidden />
                <h3 className="text-xl font-serif font-semibold text-navy-800">Implementation is the easy part.</h3>
                <p className="mt-2 text-ink-secondary leading-relaxed">The reason clients stay is what happens after the go-live. We design every engagement to set you up for the first month-end, not just the first invoice.</p>
              </Card>
              <Card className="b">
                <Heart size={22} className="text-gold-600 mb-3" aria-hidden />
                <h3 className="text-xl font-serif font-semibold text-navy-800">Human connection at the centre.</h3>
                <p className="mt-2 text-ink-secondary leading-relaxed">In a digital era, our mission is to keep human connection at the heart of how we work with clients. Integrity, innovation, accountability, trust and quality.</p>
              </Card>
              <Card className="b">
                <ShieldCheck size={22} className="text-gold-600 mb-3" aria-hidden />
                <h3 className="text-xl font-serif font-semibold text-navy-800">Fixed scope. Fixed price.</h3>
                <p className="mt-2 text-ink-secondary leading-relaxed">You know what you are paying before we start. If scope changes, we tell you in writing before any new work begins. No surprise invoices.</p>
              </Card>
              <Card className="b">
                <Users2 size={22} className="text-gold-600 mb-3" aria-hidden />
                <h3 className="text-xl font-serif font-semibold text-navy-800">Collaborative, agile, transparent.</h3>
                <p className="mt-2 text-ink-secondary leading-relaxed">We work with you, not just for you. Open communication on progress, on challenges and on outcomes, throughout every engagement.</p>
              </Card>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="What we can verify today" title="Credentials and footprint, not vanity numbers." align="center" description="We do not display claims we cannot back up. The list below is what is publicly verifiable right now." />
          <FadeUp selector=".n" stagger={0.08}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
              {[
                { icon: ShieldCheck, n: "Authorised", l: "Zoho Training and Implementation Partner" },
                { icon: Award, n: "Authorised", l: "Tally Prime training centre" },
                { icon: Globe2, n: "Two countries", l: "UAE and India under one practice" },
                { icon: Star, n: "5.0", l: "Google rating" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.l} className="n">
                    <Icon size={28} className="text-gold-600 mx-auto mb-2" aria-hidden />
                    <div className="text-xl md:text-2xl font-serif font-semibold text-navy-800">{s.n}</div>
                    <div className="text-xs sm:text-sm text-ink-muted mt-1 max-w-[180px] mx-auto">{s.l}</div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section bg-surface-warm/40">
        <div className="container">
          <SectionHeader eyebrow="Offices" title="Where we work from." />
          <FadeUp selector=".o" stagger={0.08}>
            <div className="grid md:grid-cols-2 gap-5">
              <Card className="o">
                <MapPin size={22} className="text-gold-600 mb-3" aria-hidden />
                <div className="font-serif text-xl font-semibold text-navy-800">Dubai, UAE</div>
                <div className="text-sm text-ink-secondary mt-1">Magistrum Corpserve Solutions LLC (head office)</div>
                <div className="text-xs text-ink-muted mt-2">{business.address.formatted}</div>
                <div className="text-xs text-ink-muted mt-1"><a className="hover:text-navy-700" href={business.phone.primary.tel}>{business.phone.primary.display}</a></div>
              </Card>
              <Card className="o">
                <MapPin size={22} className="text-gold-600 mb-3" aria-hidden />
                <div className="font-serif text-xl font-semibold text-navy-800">Mumbai, India</div>
                <div className="text-sm text-ink-secondary mt-1">Magistrum Corpserve Private Limited (sister practice)</div>
                <div className="text-xs text-ink-muted mt-2">Information technology and training operations.</div>
                <div className="text-xs text-ink-muted mt-1"><a className="hover:text-navy-700" href={business.phoneIndia[0].tel}>{business.phoneIndia[0].display}</a></div>
              </Card>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="mt-5 rounded-xl p-6 border bg-navy-800 border-navy-700 text-surface">
              <div className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-2">Did you know</div>
              <p className="text-surface/90 leading-relaxed">The Magistrum group is intentionally diversified. Alongside the technology practice, the India entity also operates Bilzen Chocolates and Confectioneries, and runs offline plus online accounting training programmes. Cross-sector depth, single ownership.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
