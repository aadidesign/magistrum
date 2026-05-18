import type { Metadata } from "next";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/sections/JsonLd";

export const metadata: Metadata = {
  title: "Zoho Services in Dubai, Implementation, Migration, Training",
  description: "Six core Zoho engagements: Books, CRM, Workplace, Finance Suite, Zoho One and authorised certification training. Built for UAE SMEs.",
};

export default function ServicesIndex() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/` },
          { name: "Services", url: `${siteUrl}/services` },
        ])}
      />
      <div className="container py-10 sm:py-12 lg:py-16">
        <span className="eyebrow">Services</span>
        <h1 className="text-[2rem] leading-[1.1] sm:text-4xl lg:text-5xl font-serif font-semibold text-navy-800 tracking-tight max-w-3xl text-balance">
          Six engagements. Built for UAE SMEs and the Zoho stack.
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-ink-secondary max-w-2xl leading-relaxed">
          Each engagement is fixed-scope, fixed-timeline and fixed-price. Pick the one that fits today; we'll point you to the next when you're ready.
        </p>
      </div>
      <ServicesGrid />
      <FinalCTA />
    </>
  );
}
