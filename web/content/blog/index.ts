// Blog index data. Posts marked with `content` field are fully written.
// Others are frontmatter stubs awaiting content.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
  status: "published" | "stub";
  keyword: string;
};

export const posts: BlogPost[] = [
  {
    slug: "uae-corporate-tax-zoho-books-2026",
    title: "UAE Corporate Tax on Zoho Books: a 2026 Setup Guide",
    excerpt:
      "If you've registered for Corporate Tax and you're running on Zoho Books, or thinking about moving to it, this is the step-by-step setup that gets you filing-ready.",
    category: "Compliance",
    publishedAt: "2026-05-12",
    readingMinutes: 8,
    status: "published",
    keyword: "UAE Corporate Tax Zoho Books",
  },
  {
    slug: "zoho-workplace-vs-google-workspace-uae",
    title: "Zoho Workplace vs Google Workspace for UAE SMEs",
    excerpt:
      "Side-by-side comparison of the two productivity stacks for UAE businesses: total cost, collaboration features, integrations and migration paths.",
    category: "Comparison",
    publishedAt: "2026-05-05",
    readingMinutes: 7,
    status: "stub",
    keyword: "Zoho Workplace UAE",
  },
  {
    slug: "zoho-books-implementation-timeline-uae",
    title: "How long does Zoho Books implementation actually take in the UAE?",
    excerpt:
      "We break down a realistic timeline, discovery, configuration, migration, training and go-live, for typical UAE SME profiles.",
    category: "Implementation",
    publishedAt: "2026-04-22",
    readingMinutes: 6,
    status: "stub",
    keyword: "Zoho Books implementation timeline",
  },
  {
    slug: "vat-201-zoho-books-dubai",
    title: "VAT 201 in Zoho Books: a step-by-step for Dubai SMEs",
    excerpt: "Configure your tax codes, run the VAT 201 preview, and submit a clean return, all without leaving Zoho Books.",
    category: "Compliance",
    publishedAt: "2026-04-15",
    readingMinutes: 8,
    status: "stub",
    keyword: "VAT 201 Zoho Books Dubai",
  },
  {
    slug: "migrating-tally-to-zoho-books",
    title: "Migrating from Tally to Zoho Books, what changes",
    excerpt: "If you've outgrown Tally, here's what shifts in your day-to-day, your reporting and your team's habits when you move to Zoho.",
    category: "Migration",
    publishedAt: "2026-04-08",
    readingMinutes: 7,
    status: "stub",
    keyword: "Tally to Zoho Books migration",
  },
  {
    slug: "zoho-crm-uae-real-estate",
    title: "Zoho CRM for UAE real estate brokerages, a setup template",
    excerpt: "Lead capture from portals, pipeline by listing type, broker commissions and RERA compliance, configured on Zoho CRM.",
    category: "Industry",
    publishedAt: "2026-03-30",
    readingMinutes: 8,
    status: "stub",
    keyword: "Zoho CRM real estate UAE",
  },
  {
    slug: "zoho-books-certification-uae-finance",
    title: "Why your finance team should run Zoho Books certification",
    excerpt: "The case for certifying your in-house team, speed of close, reduced consultant dependence, and a clearer career path for accountants.",
    category: "Training",
    publishedAt: "2026-03-22",
    readingMinutes: 5,
    status: "stub",
    keyword: "Zoho Books certification UAE",
  },
  {
    slug: "uae-e-invoicing-zoho-books",
    title: "UAE e-invoicing rollout: getting ready with Zoho Books",
    excerpt: "What the 2026 FTA e-invoicing phases mean for your business and what you can do in Zoho Books today.",
    category: "Compliance",
    publishedAt: "2026-03-15",
    readingMinutes: 8,
    status: "stub",
    keyword: "UAE e-invoicing Zoho",
  },
  {
    slug: "designated-zones-vat-zoho-books",
    title: "Designated Zones and VAT in Zoho Books",
    excerpt: "Designated Zone treatment is one of the most-misconfigured VAT areas. Here's how to get it right in Zoho.",
    category: "Compliance",
    publishedAt: "2026-03-08",
    readingMinutes: 6,
    status: "stub",
    keyword: "Designated Zone VAT Zoho",
  },
  {
    slug: "free-zone-mainland-zoho-setup",
    title: "Free Zone vs Mainland, what changes in your Zoho setup",
    excerpt: "Mainland and Free Zone businesses face different VAT, Corporate Tax and reporting rules. Here's how that maps to your Zoho configuration.",
    category: "Compliance",
    publishedAt: "2026-02-28",
    readingMinutes: 6,
    status: "stub",
    keyword: "Free Zone Mainland Zoho",
  },
  {
    slug: "multi-branch-zoho-books-uae",
    title: "Multi-branch Zoho Books for UAE retail and F&B",
    excerpt: "Inter-branch transfers, location-level reporting and consolidated month-end, configured for UAE retail and hospitality groups.",
    category: "Industry",
    publishedAt: "2026-02-20",
    readingMinutes: 7,
    status: "stub",
    keyword: "multi-branch Zoho Books UAE",
  },
  {
    slug: "zoho-partner-cost-dubai-transparent-breakdown",
    title: "The actual cost of a Zoho partner in Dubai (transparent breakdown)",
    excerpt: "Implementation fees, Zoho licence fees, ongoing retainer, what UAE SMEs actually pay across a 12-month engagement, with real ranges.",
    category: "Pricing",
    publishedAt: "2026-02-12",
    readingMinutes: 8,
    status: "stub",
    keyword: "Zoho partner cost Dubai",
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
