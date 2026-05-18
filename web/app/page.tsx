import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ZohoStack } from "@/components/sections/ZohoStack";
import { DualOffer } from "@/components/sections/DualOffer";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Process } from "@/components/sections/Process";
import { UAECompliance } from "@/components/sections/UAECompliance";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { OtherServices } from "@/components/sections/OtherServices";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ, homepageFaqs } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/sections/JsonLd";
import { localBusinessSchema, faqSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={faqSchema(homepageFaqs)} />
      <Hero />
      <TrustBar />
      <DualOffer />
      <ZohoStack />
      <ServicesGrid />
      <Process />
      <UAECompliance />
      <CaseStudy />
      <OtherServices />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
