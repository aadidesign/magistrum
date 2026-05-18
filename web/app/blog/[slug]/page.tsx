import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft } from "lucide-react";
import { posts, getPost } from "@/content/blog";
import { JsonLd } from "@/components/sections/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { formatDateUAE } from "@/lib/format";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = getPost(params.slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt };
}

const FULL_POST: Record<string, () => JSX.Element> = {
  "uae-corporate-tax-zoho-books-2026": () => (
    <>
      <p className="lead">UAE Corporate Tax came into force from financial years starting on or after 1 June 2023. By 2026, the early grace has lapsed: finance teams are filing in earnest, and the businesses that aren't ready are scrambling. If you're running on Zoho Books, or you're moving to it, this is the setup that gets you filing-ready without rebuilding your chart of accounts.</p>

      <h2>What Corporate Tax actually requires of your accounting system</h2>
      <p>Three things, mainly:</p>
      <ul>
        <li><strong>Taxable income reconciliation.</strong> Your accounting profit needs a clean trail to your taxable income. That means proper tagging of disallowed expenses, exempt income and adjustments, all visible in your trial balance.</li>
        <li><strong>Tax-code separation.</strong> Corporate Tax (9%) sits alongside VAT (5%). The two are not the same return, but the FTA cross-checks them. Your Zoho Books setup needs both, configured cleanly, so neither return contradicts the other.</li>
        <li><strong>Documentation discipline.</strong> Source documents, invoices, receipts, contracts, need to be linkable to ledger entries. Zoho's attachment feature on every transaction is your friend here.</li>
      </ul>

      <h2>Step 1: Confirm your Corporate Tax registration in Zoho</h2>
      <p>Under <em>Settings → Taxes → Corporate Tax</em>, enable Corporate Tax and enter your Tax Registration Number (TRN) as issued by the FTA. If you've elected for Small Business Relief (revenue under AED 3M), enable that flag, Zoho will treat taxable income as zero for the relevant period while still recording the full P&amp;L.</p>

      <h2>Step 2: Mark expense disallowances at the GL level</h2>
      <p>Some expenses look fine in your accounting profit but get added back for Corporate Tax, entertainment beyond the 50% allowance, non-business expenses, certain provisions. Tag these GLs in Zoho with a custom field <code>ct_treatment</code> and three values: <code>allowed</code>, <code>disallowed</code>, <code>partial-50</code>. This sounds tedious; it saves you a week at year-end.</p>

      <h2>Step 3: Configure your tax codes correctly the first time</h2>
      <p>Most UAE Zoho Books setups have tax codes for VAT, Standard Rated 5%, Zero Rated, Exempt, Out of Scope. For Corporate Tax purposes you don't need new "tax codes" in the same way. What you do need is your <strong>chart of accounts mapped against Corporate Tax treatment</strong>. Map every revenue line to either <em>Taxable</em>, <em>Exempt</em> or <em>Out of scope</em>. Map every expense to the disallowance tags above.</p>

      <h2>Step 4: Don't forget Designated Zones</h2>
      <p>If your business is in a Designated Zone (DMCC, JAFZA, DAFZA, etc.), supplies of goods within and between Designated Zones may be Out of Scope for VAT, but Corporate Tax treatment is independent. A Free Zone Person (FZP) with Qualifying Income can elect the 0% Corporate Tax rate; non-Qualifying Income remains at 9%. Zoho doesn't automate this, but it lets you split revenue cleanly so your tax adviser can apply the right treatment without guesswork.</p>

      <h2>Step 5: Generate the Corporate Tax return preview</h2>
      <p>Under <em>Reports → Tax → Corporate Tax</em>, run the period-end CT report. Zoho gives you a P&amp;L with the disallowance adjustments applied. Review the lines. Match them to your trial balance. This is your draft return.</p>
      <p>From here, your accountant or auditor submits via the EmaraTax portal. Zoho doesn't (yet) integrate directly with EmaraTax for submission, but the export gives you the numbers your adviser needs in 10 minutes rather than 10 hours.</p>

      <h2>Common mistakes we see on existing setups</h2>
      <ul>
        <li><strong>Chart of accounts that's too granular or too thin.</strong> Too granular and your CT report is a 200-row sprawl; too thin and you can't trace anything. Aim for roughly 80–150 GL accounts for a typical UAE SME.</li>
        <li><strong>Disallowance happens "at year-end" rather than at booking.</strong> Tag expenses when they're booked, not in March. Otherwise you'll forget.</li>
        <li><strong>VAT and CT mixed up in one report.</strong> Run them separately. They don't ladder; they're two independent returns the FTA reconciles against each other.</li>
        <li><strong>No documentation discipline.</strong> Attach the source document. The day you get audited, this is what saves you.</li>
      </ul>

      <h2>If you're starting fresh</h2>
      <p>If you're configuring Zoho Books today knowing Corporate Tax is in play, the right order is: chart of accounts → tax codes (VAT) → Corporate Tax flags → import opening balances → reconcile against your last audit → run a parallel month with your old system → cutover. Most UAE SMEs go through this in 7–14 working days when it's structured properly.</p>

      <h2>What we'd do for you</h2>
      <p>If you'd like the Corporate Tax + VAT setup done in one engagement, including the GL tagging, the disallowance treatment, the Designated Zone handling and the team training, that's our most-requested service. Book a discovery call and we'll tell you in 45 minutes whether your existing setup needs a tune-up or a rebuild.</p>
    </>
  ),
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) notFound();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const Render = FULL_POST[p.slug];

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: p.title,
          description: p.excerpt,
          datePublished: p.publishedAt,
          url: `${siteUrl}/blog/${p.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${siteUrl}/` },
          { name: "Insights", url: `${siteUrl}/blog` },
          { name: p.title, url: `${siteUrl}/blog/${p.slug}` },
        ])}
      />

      <article className="container py-10 lg:py-16 max-w-prose">
        <Link href="/blog" className="text-sm text-ink-muted hover:text-navy-700 inline-flex items-center gap-1 mb-6"><ArrowLeft size={14} aria-hidden /> All insights</Link>
        <div className="flex items-center gap-3 text-xs text-ink-muted">
          <span className="badge-navy">{p.category}</span>
          <span className="flex items-center gap-1"><Clock size={12} aria-hidden /> {p.readingMinutes} min read</span>
          <span>{formatDateUAE(p.publishedAt)}</span>
        </div>
        <h1 className="mt-3 text-4xl md:text-5xl font-serif font-semibold text-navy-900 text-balance leading-tight">{p.title}</h1>
        <p className="mt-4 text-xl text-ink-secondary leading-relaxed">{p.excerpt}</p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-serif prose-headings:text-navy-800 prose-lead:text-ink-secondary prose-a:text-navy-700 prose-a:font-semibold prose-li:leading-relaxed">
          {Render ? <Render /> : (
            <p className="text-ink-secondary italic">This article is queued for publication. In the meantime, you can <Link href="/contact">request a draft</Link> or browse our <Link href="/blog">other insights</Link>.</p>
          )}
        </div>
      </article>

      <FinalCTA />
    </>
  );
}
