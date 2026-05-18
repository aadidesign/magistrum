import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, ArrowRight, MessageCircle } from "lucide-react";
import * as Icons from "lucide-react";
import { services, serviceBySlug, business } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Card, SectionHeader } from "@/components/ui/Card";
import { FadeUp } from "@/components/motion/FadeUp";
import { Process } from "@/components/sections/Process";
import { FAQ, homepageFaqs } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/sections/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { IMAGES, img } from "@/lib/imagery";

// Service detail hero image — themed per service heading.
const serviceImage: Record<string, keyof typeof IMAGES> = {
  "zoho-books": "bookkeeping",                     // calculator + ledger on warm wood desk
  "zoho-crm": "salesMeeting",                      // sales conversation across a table
  "zoho-workplace": "zohoWorkplace",               // laptop + notebook ready for collaboration
  "zoho-finance-suite": "zohoFinance",             // analytics charts on screen
  "zoho-one": "executiveOffice",                   // clean executive office
  "training-zoho-books-certification": "zohoTraining", // training session
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const svc = serviceBySlug(params.slug);
  if (!svc) return {};
  return {
    title: `${svc.name} in Dubai | Magistrum`,
    description: svc.short + " " + svc.description.slice(0, 130),
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const svc = serviceBySlug(params.slug);
  if (!svc) notFound();
  const Icon = (Icons as Record<string, any>)[svc.icon] || Icons.Layers;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const related = services.filter((s) => s.slug !== svc.slug).slice(0, 3);
  const heroImg = IMAGES[serviceImage[svc.slug] || "modernOffice"];

  return (
    <>
      <JsonLd data={serviceSchema({ name: svc.name, description: svc.description })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/` },
          { name: "Services", url: `${siteUrl}/services` },
          { name: svc.name, url: `${siteUrl}/services/${svc.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="gradient-hero">
        <div className="container py-8 sm:py-12 lg:py-16">
          <FadeUp>
            <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-ink-muted mb-4 sm:mb-6 flex flex-wrap gap-1">
              <Link href="/" className="hover:text-navy-700">Home</Link>
              <span aria-hidden> / </span>
              <Link href="/services" className="hover:text-navy-700">Services</Link>
              <span aria-hidden> / </span>
              <span className="text-ink">{svc.name}</span>
            </nav>
          </FadeUp>

          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-6 sm:gap-8 lg:gap-12 items-center">
            <FadeUp className="flex flex-col">
              <div className="inline-flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-5">
                <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-navy-800 text-gold-400 shadow-md flex-shrink-0">
                  <Icon size={20} aria-hidden />
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gold-50 border border-gold-200 text-[10px] uppercase tracking-widest text-gold-800 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" aria-hidden /> Core engagement
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-navy-900 tracking-tight text-balance leading-[1.05]">
                {svc.name}
              </h1>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-gold-700 font-medium max-w-xl">{svc.short}</p>
              <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-ink-secondary max-w-2xl leading-relaxed">{svc.description}</p>

              <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-3">
                <Link href={`/contact?service=${svc.slug}`} className="w-full sm:w-auto"><Button variant="primary" size="lg" className="w-full sm:w-auto">Discuss this for our business</Button></Link>
                <a href={business.whatsapp.link(business.whatsapp.prefillService(svc.name))} target="_blank" rel="noopener" className="w-full sm:w-auto">
                  <Button variant="whatsapp" size="lg" type="button" className="w-full sm:w-auto"><MessageCircle size={18} aria-hidden /> WhatsApp Us</Button>
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.15} className="order-first lg:order-last">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-2xl">
                <Image
                  src={img(heroImg, 1000, 700)}
                  alt={heroImg.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-navy-900/10 to-transparent" aria-hidden />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-surface-elevated/95 backdrop-blur text-[10px] uppercase tracking-widest text-navy-800 font-semibold shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500" aria-hidden /> Zoho Authorised
                  </span>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <div className="bg-navy-900/75 backdrop-blur-md text-surface rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                    <div className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">Delivery</div>
                    <div className="text-xs sm:text-sm text-surface mt-0.5">Dubai onsite + remote across the UAE</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* At a glance — full-width strip below the hero columns */}
          <FadeUp delay={0.25}>
            <div className="mt-10 sm:mt-12 lg:mt-14">
              <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-3 sm:mb-4">At a glance</div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 bg-surface-elevated border border-border rounded-2xl p-4 sm:p-5 lg:p-6">
                <div>
                  <dt className="text-xs font-semibold text-navy-800 flex items-center gap-1.5 mb-1">
                    <Clock size={13} aria-hidden /> Timeline
                  </dt>
                  <dd className="text-sm text-ink-secondary">{svc.timeline}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-navy-800 mb-1">Engagement model</dt>
                  <dd className="text-sm text-ink-secondary">Fixed scope, fixed timeline, fixed price.</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-navy-800 mb-1">Post-go-live</dt>
                  <dd className="text-sm text-ink-secondary">30 days support included. Optional retainer after.</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-navy-800 mb-1">Where</dt>
                  <dd className="text-sm text-ink-secondary">Dubai onsite plus remote across the UAE.</dd>
                </div>
              </dl>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* What's included */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Scope" title={`What is included in ${svc.name}`} />
          <FadeUp selector=".inc" stagger={0.05}>
            <ul className="grid sm:grid-cols-2 gap-3">
              {svc.includesShort.map((item) => (
                <li key={item} className="inc flex items-start gap-3 bg-surface-elevated border border-border rounded-lg p-4">
                  <CheckCircle2 size={20} className="text-success flex-shrink-0 mt-0.5" aria-hidden />
                  <span className="text-ink-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      <Process />

      <FAQ items={homepageFaqs.slice(0, 5)} />

      {/* Related */}
      <section className="section-tight bg-surface-warm/40">
        <div className="container">
          <SectionHeader title="You might also need" />
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="card-interactive group">
                <div className="font-semibold text-navy-800">{r.name}</div>
                <div className="mt-2 text-sm text-ink-secondary">{r.short}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 group-hover:gap-2 transition-all duration-base">
                  Read more <ArrowRight size={14} aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
