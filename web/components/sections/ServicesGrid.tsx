import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/business";
import { SectionHeader } from "@/components/ui/Card";
import { FadeUp } from "@/components/motion/FadeUp";
import { IMAGES, img } from "@/lib/imagery";

// Each service grid card uses a photo themed to its heading.
// Verified per-service mapping (no generic office fillers).
const photoForService: Record<string, keyof typeof IMAGES> = {
  "zoho-books": "zohoBooks",                       // laptop with finance dashboard
  "zoho-crm": "zohoCrm",                           // sales pro reviewing CRM pipeline
  "zoho-workplace": "cloudMigration",              // two colleagues collaborating (workspace move)
  "zoho-finance-suite": "zohoFinance",             // analytics charts on screen + notes
  "zoho-one": "dataDashboards",                    // multi-module analytics dashboard
  "training-zoho-books-certification": "zohoTraining", // learner taking notes in a training session
};

export function ServicesGrid() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title="Six core engagements. Everything else builds on these."
          description="Each engagement is scoped, priced and delivered against a clear milestone plan. No open-ended retainers, no surprise upsells."
        />
        <FadeUp selector=".svc-card" stagger={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {services.map((s) => {
              const Icon = (Icons as Record<string, any>)[s.icon] || Icons.Layers;
              const photo = IMAGES[photoForService[s.slug] || "modernOffice"];
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="svc-card group">
                  <article className="h-full flex flex-col bg-surface-elevated border border-border rounded-2xl overflow-hidden hover:border-border-strong hover:shadow-lg hover:-translate-y-0.5 transition-all duration-base ease-out-quart">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={img(photo, 720, 450)}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-slow ease-out-quart"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-navy-900/10 to-transparent" aria-hidden />
                      <div className="absolute top-3 left-3 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface-elevated shadow-md border border-border">
                        <Icon size={20} className="text-gold-700" aria-hidden />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block text-[10px] uppercase tracking-widest text-gold-300 font-semibold bg-navy-900/60 backdrop-blur-sm px-2 py-1 rounded">
                          {s.tier === "core" ? "Core engagement" : "Service"}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <h3 className="text-lg sm:text-xl font-serif font-semibold text-navy-800 leading-tight">{s.name}</h3>
                      <p className="mt-2 text-ink-secondary text-sm leading-relaxed flex-1">{s.short}</p>
                      <div className="mt-3 sm:mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 group-hover:gap-2 group-hover:text-gold-700 transition-all duration-base">
                        Read more <ArrowRight size={14} aria-hidden />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
