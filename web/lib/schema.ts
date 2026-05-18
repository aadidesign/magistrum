import { business } from "./business";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://magistrum-pitch.vercel.app"}/#business`,
    name: business.name,
    alternateName: business.legalNameFull,
    description:
      "Zoho Authorised Training and Implementation Partner serving UAE SMEs. Zoho Books, CRM, Workplace, Finance Suite and One, configured for UAE VAT and Corporate Tax compliance.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    telephone: business.phone.primary.e164,
    email: business.email.general,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/og/default.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.unit}, ${business.address.building}`,
      addressLocality: business.address.area,
      addressRegion: business.address.emirate,
      addressCountry: business.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.address.coordinates.lat,
      longitude: business.address.coordinates.lng,
    },
    areaServed: business.serviceAreas.map((a) => ({ "@type": "City", name: a })),
    sameAs: [business.social.linkedin, business.social.facebook, business.social.instagram],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating.value,
      bestRating: 5,
      worstRating: 1,
      reviewCount: 1, // GMB shows rating but no public count; placeholder
    },
    openingHoursSpecification: Object.entries(business.hours)
      .filter(([, v]) => v !== "Closed")
      .map(([day, range]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day,
        opens: range.split(" - ")[0],
        closes: range.split(" - ")[1],
      })),
  };
}

export function serviceSchema(svc: { name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.name,
    provider: { "@type": "ProfessionalService", name: business.name, url: process.env.NEXT_PUBLIC_SITE_URL },
    description: svc.description,
    areaServed: business.serviceAreas.map((a) => ({ "@type": "City", name: a })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  datePublished: string;
  author?: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.datePublished,
    author: { "@type": "Organization", name: a.author || business.name },
    publisher: { "@type": "Organization", name: business.name, logo: { "@type": "ImageObject", url: `${process.env.NEXT_PUBLIC_SITE_URL}/brand/logo.svg` } },
    mainEntityOfPage: a.url,
    image: a.image,
  };
}
