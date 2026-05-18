import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { business } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Thank you, we'll be in touch",
  description: "Your enquiry has been received. Expect a reply within one working day.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <section className="gradient-hero">
        <div className="container py-16 lg:py-20 max-w-3xl text-center mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-6">
            <CheckCircle2 size={36} className="text-success" aria-hidden />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-navy-900 tracking-tight text-balance">
            Got it. We'll be in touch.
          </h1>
          <p className="mt-4 text-lg text-ink-secondary leading-relaxed">
            Expect a reply within one working day, usually faster. If your timing is urgent, the fastest route is WhatsApp.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={business.whatsapp.link()} target="_blank" rel="noopener">
              <Button variant="whatsapp" size="lg" type="button"><MessageCircle size={18} aria-hidden /> WhatsApp Now</Button>
            </a>
            <Link href="/services"><Button variant="secondary" size="lg">Browse our services <ArrowRight size={18} aria-hidden /></Button></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <Card>
            <h3 className="font-semibold text-navy-800">What happens next</h3>
            <p className="mt-2 text-sm text-ink-secondary">A consultant reviews your brief and replies with a discovery slot, usually within hours during working time.</p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy-800">In the call</h3>
            <p className="mt-2 text-sm text-ink-secondary">We listen, ask the questions that matter, and tell you what we'd do, and what we wouldn't. 45 minutes max.</p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy-800">After the call</h3>
            <p className="mt-2 text-sm text-ink-secondary">A written scope, timeline and quote, usually within 48 hours. Fixed price. No surprises.</p>
          </Card>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
