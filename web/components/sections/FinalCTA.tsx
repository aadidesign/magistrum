import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { business } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/motion/FadeUp";

export function FinalCTA() {
  return (
    <section className="section">
      <div className="container">
        <FadeUp>
          <div className="rounded-2xl sm:rounded-3xl gradient-cta text-surface p-6 sm:p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-72 sm:w-96 h-72 sm:h-96 bg-gold-400 rounded-full blur-3xl opacity-20" aria-hidden />
            <div className="absolute -bottom-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-gold-400 rounded-full blur-3xl opacity-10" aria-hidden />
            <span className="badge-gold relative">Free 45-minute call</span>
            <h2 className="relative mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-semibold text-surface text-balance leading-tight">
              Let's see if Zoho is right for your business.
            </h2>
            <p className="relative mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-surface/85 max-w-2xl mx-auto leading-relaxed">
              No deck. No pitch. You tell us what you've got, we tell you what we'd do, and what we wouldn't. You'll know within 45 minutes whether to move ahead.
            </p>
            <div className="relative mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="w-full sm:w-auto"><Button variant="primary" size="lg" className="w-full sm:w-auto">Book Free Discovery Call <ArrowRight size={18} aria-hidden /></Button></Link>
              <a href={business.whatsapp.link()} target="_blank" rel="noopener" className="w-full sm:w-auto">
                <Button variant="whatsapp" size="lg" type="button" className="w-full sm:w-auto"><MessageCircle size={18} aria-hidden /> WhatsApp Us</Button>
              </a>
            </div>
            <div className="relative mt-4 sm:mt-6 text-xs sm:text-sm text-surface/70">
              Or call us directly: <a href={business.phone.primary.tel} className="font-semibold text-gold-400 hover:text-gold-300 transition-colors">{business.phone.primary.display}</a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
