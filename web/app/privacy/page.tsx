import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Magistrum Corpserve Solutions LLC collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="container py-12 lg:py-16 max-w-prose">
      <h1 className="text-4xl font-serif font-semibold text-navy-800">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-muted">Last updated: {new Date().toLocaleDateString("en-AE", { day: "numeric", month: "long", year: "numeric" })}</p>
      <div className="prose prose-slate mt-6 max-w-none">
        <p>Magistrum Corpserve Solutions LLC ("Magistrum", "we") is a UAE-licensed Zoho Authorised Partner. This policy explains what personal information we collect when you use this website, why we collect it, and what your rights are. We process personal data in line with the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data ("PDPL").</p>

        <h2>Information we collect</h2>
        <ul>
          <li><strong>Enquiry information</strong> you submit through our forms, name, company, email, phone, and the content of your message.</li>
          <li><strong>Chatbot transcripts</strong> when you use our on-site assistant. Stored in our database for service quality and to respond to follow-up enquiries.</li>
          <li><strong>Site analytics</strong> via Google Analytics 4 (anonymised IP) and, where enabled, Meta Pixel for advertising measurement.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To reply to your enquiry and progress a consulting engagement if you wish.</li>
          <li>To improve our website and the relevance of our content.</li>
          <li>For internal record-keeping and compliance with UAE laws.</li>
        </ul>

        <h2>Who we share it with</h2>
        <p>We never sell your information. We use a small number of trusted processors strictly to operate this site:</p>
        <ul>
          <li>MongoDB Atlas (lead and transcript storage)</li>
          <li>Brevo (transactional email notifications)</li>
          <li>Groq (LLM inference for the on-site assistant, anonymous, not used for training)</li>
          <li>Vercel (web hosting)</li>
        </ul>

        <h2>Your rights under the PDPL</h2>
        <p>You have the right to access, correct, delete or transfer your personal data, and to withdraw consent at any time. To exercise these rights, contact us at <a href="mailto:info@magistrum.net">info@magistrum.net</a>.</p>

        <h2>Cookies</h2>
        <p>We use a minimal set of essential cookies (session, CSRF protection) and, where you consent, analytics cookies. You can disable cookies in your browser at any time.</p>

        <h2>Contact</h2>
        <p>Magistrum Corpserve Solutions LLC, Unit R05, Bin Sougat Building, DIP-1, Dubai, UAE. Email: <a href="mailto:info@magistrum.net">info@magistrum.net</a>.</p>
      </div>
    </div>
  );
}
