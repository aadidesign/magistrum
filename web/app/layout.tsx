import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { Analytics } from "@/components/Analytics";

// Fonts are loaded via CSS @import in globals.css (browser-side) rather than
// next/font (build-time fetch), keeps `npm run build` working without
// outbound TLS to fonts.googleapis.com.

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://magistrum-pitch.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Magistrum, Zoho Authorised Partner in Dubai, UAE",
    template: "%s | Magistrum",
  },
  description:
    "Zoho Authorised Implementation & Training Partner in Dubai. Get live on Zoho Books, CRM and the full Finance Suite, VAT and UAE Corporate Tax configured the first time.",
  keywords: [
    "Zoho partner Dubai",
    "Zoho implementation UAE",
    "Zoho Books Dubai",
    "Zoho CRM Dubai",
    "UAE Corporate Tax Zoho",
    "Zoho training Dubai",
  ],
  authors: [{ name: "Magistrum Corpserve Solutions LLC" }],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: siteUrl,
    siteName: "Magistrum",
    title: "Magistrum, Zoho Authorised Partner in Dubai, UAE",
    description:
      "Live on Zoho in days, not months. Trained team. Clean UAE VAT and Corporate Tax filing.",
    images: [
      { url: "/og/default.png", width: 1200, height: 630, alt: "Magistrum, Zoho Authorised Partner in Dubai" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Magistrum, Zoho Authorised Partner in Dubai, UAE",
    description:
      "Live on Zoho in days, not months. Trained team. Clean UAE VAT and Corporate Tax filing.",
  },
  icons: {
    icon: "/brand/favicon.svg",
    shortcut: "/brand/favicon.svg",
    apple: "/brand/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0B2447",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AE">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main" className="pt-14 sm:pt-16 md:pt-18 lg:pt-20">{children}</main>
        <Footer />
        <ChatbotWidget />
        <Analytics />
      </body>
    </html>
  );
}
