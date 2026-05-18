import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { otherServices } from "@/lib/business";
import { SectionHeader, Card } from "@/components/ui/Card";
import { FadeUp } from "@/components/motion/FadeUp";

export function OtherServices() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="The wider practice"
          title="Zoho is the lead. The rest of Magistrum sits behind it."
          description="Alongside the Zoho practice, we run digital marketing, IT consultancy, software development and an accounting-training programme through our India entity. Useful to know if you have adjacent needs."
        />
        <FadeUp selector=".os" stagger={0.07}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {otherServices.map((s) => {
              const Icon = (Icons as Record<string, any>)[s.icon] || Icons.Layers;
              return (
                <Card key={s.slug} className="os h-full flex flex-col p-5 sm:p-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-navy-50 text-navy-700 mb-3 sm:mb-4">
                    <Icon size={20} aria-hidden />
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-navy-800 leading-tight">{s.name}</h3>
                  <p className="mt-2 text-sm text-ink-secondary leading-relaxed flex-1">{s.short}</p>
                  <Link href="/contact" className="mt-3 sm:mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 hover:gap-2 transition-all duration-base">
                    Discuss <ArrowRight size={14} aria-hidden />
                  </Link>
                </Card>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
