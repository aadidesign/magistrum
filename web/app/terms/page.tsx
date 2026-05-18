import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing your use of magistrum.net and engagements with Magistrum Corpserve Solutions LLC.",
};

export default function TermsPage() {
  return (
    <div className="container py-12 lg:py-16 max-w-prose">
      <h1 className="text-4xl font-serif font-semibold text-navy-800">Terms of Use</h1>
      <p className="mt-2 text-sm text-ink-muted">Last updated: {new Date().toLocaleDateString("en-AE", { day: "numeric", month: "long", year: "numeric" })}</p>
      <div className="prose prose-slate mt-6 max-w-none">
        <p>These terms govern your use of this website and any enquiry you submit to Magistrum Corpserve Solutions LLC (a UAE-licensed limited liability company; "Magistrum"). Engagements that follow an enquiry are governed by a separate written agreement.</p>

        <h2>Use of this site</h2>
        <p>You agree to use this site lawfully and not to attempt to disrupt, reverse-engineer or scrape it at scale. Content on this site is for general information; nothing here constitutes formal tax, legal or accounting advice.</p>

        <h2>Enquiries</h2>
        <p>Submitting an enquiry does not create an engagement. Engagements begin only after a written, signed scope and pricing document.</p>

        <h2>Intellectual property</h2>
        <p>All content, code and design on this site is © Magistrum Corpserve Solutions LLC unless attributed otherwise. Zoho, the Zoho logo and the Zoho Authorised Partner badge are trademarks of Zoho Corporation, used with permission as a partner.</p>

        <h2>Disclaimers</h2>
        <p>The information on this site is provided "as is" without warranty of any kind. Tax thresholds and FTA rules cited may change after publication, always verify with current Federal Tax Authority guidance or your accountant.</p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the United Arab Emirates. Any dispute will be subject to the jurisdiction of the Dubai courts.</p>

        <h2>Contact</h2>
        <p>Magistrum Corpserve Solutions LLC, Unit R05, Bin Sougat Building, DIP-1, Dubai, UAE. Email: <a href="mailto:info@magistrum.net">info@magistrum.net</a>.</p>
      </div>
    </div>
  );
}
