import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import Link from "next/link";
import { business, services } from "@/lib/business";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/sections/JsonLd";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Magistrum, Book a Free Zoho Discovery Call",
  description: "Talk to a UAE-based Zoho Authorised Partner. Free 45-minute discovery call. WhatsApp, phone or form.",
};

export default function ContactPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/` },
          { name: "Contact", url: `${siteUrl}/contact` },
        ])}
      />
      <section className="gradient-hero">
        <div className="container py-10 sm:py-12 lg:py-16">
          <span className="eyebrow">Get in touch</span>
          <h1 className="text-[2rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-navy-900 tracking-tight max-w-3xl text-balance">
            Free 45-minute discovery call. No deck. No pitch.
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-ink-secondary max-w-2xl leading-relaxed">
            Tell us what you're working with, current stack, team size, the deadline that's making you look at this, and we'll tell you what we'd do.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid lg:grid-cols-[1.2fr_1fr] gap-8 sm:gap-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-navy-800 leading-tight">Send us a quick brief</h2>
            <p className="mt-2 text-sm sm:text-base text-ink-secondary">We reply within one working day, usually faster.</p>
            <div className="mt-5 sm:mt-6">
              <ContactForm services={services} />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-navy-800 text-surface rounded-xl p-5 sm:p-6">
              <h3 className="font-serif text-xl sm:text-2xl text-surface leading-tight">Talk to a human</h3>
              <p className="mt-2 text-surface/80 text-sm">WhatsApp tends to be the fastest route. Replies typically within an hour during working hours.</p>
              <div className="mt-4 space-y-3">
                <a href={business.whatsapp.link()} target="_blank" rel="noopener" className="btn-whatsapp w-full justify-center"><MessageCircle size={18} aria-hidden /> WhatsApp Us</a>
                <a href={business.phone.primary.tel} className="btn-primary w-full justify-center text-sm sm:text-base"><Phone size={18} aria-hidden /> {business.phone.primary.display}</a>
              </div>
            </div>
            <div className="card">
              <h3 className="font-serif text-xl font-semibold text-navy-800">Our office</h3>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li className="flex items-start gap-2 text-ink-secondary">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gold-600" aria-hidden /> {business.address.formatted}
                </li>
                <li className="flex items-center gap-2 text-ink-secondary">
                  <Mail size={16} className="flex-shrink-0 text-gold-600" aria-hidden /> <a className="hover:text-navy-700" href={`mailto:${business.email.general}`}>{business.email.general}</a>
                </li>
                <li className="flex items-start gap-2 text-ink-secondary">
                  <Clock size={16} className="mt-0.5 flex-shrink-0 text-gold-600" aria-hidden />
                  <span>Mon – Sat · 9:00 AM – 9:00 PM (GST). Sunday closed.</span>
                </li>
              </ul>
            </div>
            <div className="card">
              <h3 className="font-serif text-xl font-semibold text-navy-800">Privacy</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                We never sell or share your details. By submitting, you agree to our <Link href="/privacy" className="text-navy-700 font-semibold hover:text-gold-700">Privacy Policy</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
