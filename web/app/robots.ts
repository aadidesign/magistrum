import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://magistrum-pitch.vercel.app";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/design-system", "/thank-you", "/api"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
