import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, CheckCircle2, MessageCircle } from "lucide-react";
import { areas, areaBySlug, services, business } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Card, SectionHeader } from "@/components/ui/Card";
import { FadeUp } from "@/components/motion/FadeUp";
import { FAQ, homepageFaqs } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/sections/JsonLd";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { IMAGES, img } from "@/lib/imagery";

// Each emirate gets a verified landmark photo, matched to the heading
// "Zoho Implementation in {Emirate}". No stock fillers, no mismatches.
const areaImage: Record<string, keyof typeof IMAGES> = {
  "dubai": "dubaiSkylineGold",            // Burj Khalifa skyline at golden hour
  "sharjah": "sharjahLagoon",             // Sharjah lagoon + skyline from the Central Souq / Al Noor area
  "abu-dhabi": "abuDhabiMosque",          // Sheikh Zayed Grand Mosque
  "ajman": "northernEmiratesMountain",    // Jebel Jais mountain road, RAK (represents Ajman + Northern Emirates)
};

export async function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = areaBySlug(params.slug);
  if (!a) return {};
  return {
    title: `Zoho Implementation in ${a.name} | Magistrum`,
    description: a.short,
  };
}

export default function AreaPage({ params }: { params: { slug: string } }) {
  const a = areaBySlug(params.slug);
  if (!a) notFound();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const top = services.slice(0, 3);
  const heroImg = IMAGES[areaImage[a.slug] || "dubaiSkyline"];

  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/` },
          { name: "Areas", url: `${siteUrl}/areas` },
          { name: a.name, url: `${siteUrl}/areas/${a.slug}` },
        ])}
      />

      <section className="relative gradient-hero overflow-hidden">
        <div className="container py-12 lg:py-16 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
          <FadeUp>
            <nav aria-label="Breadcrumb" className="text-sm text-ink-muted mb-4">
              <Link href="/" className="hover:text-navy-700">Home</Link>
              <span aria-hidden> / </span>
              <Link href="/areas" className="hover:text-navy-700">Areas</Link>
              <span aria-hidden> / </span>
              <span className="text-ink">{a.name}</span>
            </nav>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-800 text-gold-400">
                <MapPin size={20} aria-hidden />
              </span>
              <span className="badge-gold">{a.name}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-navy-900 tracking-tight max-w-3xl text-balance">
              Zoho Implementation in {a.name}.
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-ink-secondary max-w-2xl leading-relaxed">{a.short}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="w-full sm:w-auto"><Button variant="primary" size="lg" className="w-full sm:w-auto">Book Free Discovery Call</Button></Link>
              <a href={business.whatsapp.link()} target="_blank" rel="noopener" className="w-full sm:w-auto">
                <Button variant="whatsapp" size="lg" type="button" className="w-full sm:w-auto"><MessageCircle size={18} aria-hidden /> WhatsApp Us</Button>
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-xl">
              <Image
                src={img(heroImg, 800, 600)}
                alt={heroImg.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" aria-hidden />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-surface text-xs uppercase tracking-widest font-semibold opacity-90">Coverage</div>
                <div className="text-surface text-lg font-serif font-semibold">{a.neighbourhoods.length}+ neighbourhoods</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Local coverage" title={`Where in ${a.name} we work`} />
          <FadeUp selector=".n" stagger={0.04}>
            <ul className="flex flex-wrap gap-2">
              {a.neighbourhoods.map((n) => (
                <li key={n} className="n inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-surface-elevated border border-border text-sm text-ink-secondary">
                  <CheckCircle2 size={14} className="text-gold-600" aria-hidden /> {n}
                </li>
              ))}
            </ul>
          </FadeUp>

          <div className="mt-12">
            <SectionHeader title="Most-requested services in this area" />
            <div className="grid sm:grid-cols-3 gap-5">
              {top.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="card-interactive group">
                  <div className="font-semibold text-navy-800">{s.name}</div>
                  <div className="mt-2 text-sm text-ink-secondary">{s.short}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ items={homepageFaqs.slice(0, 5)} />
      <FinalCTA />
    </>
  );
}
