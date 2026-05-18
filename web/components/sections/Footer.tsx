import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { business, services, areas } from "@/lib/business";

export function Footer() {
  return (
    <footer className="bg-navy-800 text-surface mt-12 sm:mt-20 lg:mt-24">
      <div className="container py-10 sm:py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
        <div>
          <div className="mb-3">
            <Image
              src="/brand/logo.png"
              alt="Magistrum"
              width={200}
              height={56}
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-sm text-surface/80 leading-relaxed max-w-xs">
            Zoho Authorised Training and Implementation Partner. Headquartered in Dubai, UAE, with a sister practice in Mumbai, India.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href={business.social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="text-surface/80 hover:text-gold-400 transition-colors w-9 h-9 rounded-lg border border-surface/10 hover:border-gold-400 flex items-center justify-center cursor-pointer"><Linkedin size={16} aria-hidden /></a>
            <a href={business.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="text-surface/80 hover:text-gold-400 transition-colors w-9 h-9 rounded-lg border border-surface/10 hover:border-gold-400 flex items-center justify-center cursor-pointer"><Facebook size={16} aria-hidden /></a>
            <a href={business.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="text-surface/80 hover:text-gold-400 transition-colors w-9 h-9 rounded-lg border border-surface/10 hover:border-gold-400 flex items-center justify-center cursor-pointer"><Instagram size={16} aria-hidden /></a>
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-surface/80 hover:text-gold-400 transition-colors">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-4">Areas</h3>
          <ul className="space-y-2 text-sm">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="text-surface/80 hover:text-gold-400 transition-colors">{a.name}</Link>
              </li>
            ))}
          </ul>
          <h3 className="text-xs uppercase tracking-widest text-gold-400 font-semibold mt-6 mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="text-surface/80 hover:text-gold-400 transition-colors">About</Link></li>
            <li><Link href="/blog" className="text-surface/80 hover:text-gold-400 transition-colors">Insights</Link></li>
            <li><Link href="/contact" className="text-surface/80 hover:text-gold-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-4">Get in touch</h3>
          <div className="space-y-4 text-sm text-surface/80">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold mb-1.5">Dubai head office</div>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <MapPin size={14} aria-hidden className="mt-0.5 flex-shrink-0 text-gold-400/80" />
                  <span>{business.address.formatted}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} aria-hidden className="flex-shrink-0 text-gold-400/80" />
                  <a href={business.phone.primary.tel} className="hover:text-gold-400 transition-colors">{business.phone.primary.display}</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} aria-hidden className="flex-shrink-0 text-gold-400/80" />
                  <a href={`mailto:${business.email.general}`} className="hover:text-gold-400 transition-colors">{business.email.general}</a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold mb-1.5">Mumbai practice</div>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <MapPin size={14} aria-hidden className="mt-0.5 flex-shrink-0 text-gold-400/80" />
                  <span>Magistrum Corpserve Private Limited, Mumbai, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} aria-hidden className="flex-shrink-0 text-gold-400/80" />
                  <a href={business.phoneIndia[0].tel} className="hover:text-gold-400 transition-colors">{business.phoneIndia[0].display}</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} aria-hidden className="flex-shrink-0 text-gold-400/80" />
                  <a href={`mailto:${business.email.india}`} className="hover:text-gold-400 transition-colors">{business.email.india}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-surface/10">
        <div className="container py-5 sm:py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-surface/60">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {new Date().getFullYear()} Magistrum Corpserve Solutions LLC.</span>
            {business.compliance.dedLicence ? <span>DED Licence: {business.compliance.dedLicence}</span> : null}
            {business.compliance.vatTrn ? <span>VAT TRN: {business.compliance.vatTrn}</span> : null}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
