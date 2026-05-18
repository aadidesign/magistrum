// Single source of truth for business facts on the public site.
// Mirrors .gmb-data.json plus information from magistrum.net.
// Update both when business details change.

export const business = {
  name: "Magistrum Corpserve Solutions LLC",
  legalNameFull: "Magistrum Corpserve Solution LLC, Zoho Authorised Training and Implementation Partner",
  tradeName: "Magistrum",
  positioning: "Zoho Authorised Partner in Dubai",
  tagline: "Live on Zoho in days, not months.",

  phone: {
    primary: { display: "+971 58 899 1583", e164: "+971588991583", tel: "tel:+971588991583", label: "Dubai (GMB)" },
    secondary: { display: "+971 52 523 6698", e164: "+971525236698", tel: "tel:+971525236698", label: "Dubai" },
    tertiary: { display: "+971 52 925 2076", e164: "+971529252076", tel: "tel:+971529252076", label: "Dubai" },
  },

  phoneIndia: [
    { display: "+91 90720 99995", e164: "+919072099995", tel: "tel:+919072099995" },
    { display: "+91 92071 99995", e164: "+919207199995", tel: "tel:+919207199995" },
    { display: "+91 86065 90474", e164: "+918606590474", tel: "tel:+918606590474" },
  ],

  email: {
    general: "info@magistrum.net",
    direct: "seema.krishna@magistrum.net",
    india: "haridas.krishna@magistrum.net",
  },

  whatsapp: {
    number: "971588991583",
    prefillDefault: "Hi Magistrum, I'd like to discuss Zoho for my business.",
    prefillService: (service: string) =>
      `Hi Magistrum, I'd like to discuss ${service} for my business.`,
    link: (prefill?: string) =>
      `https://wa.me/971588991583?text=${encodeURIComponent(prefill || "Hi Magistrum, I'd like to discuss Zoho for my business.")}`,
  },

  address: {
    unit: "Unit R05",
    building: "Bin Sougat Building",
    area: "Dubai Investment Park 1 (DIP-1)",
    city: "Dubai",
    emirate: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    formatted: "Unit R05, Bin Sougat Building, DIP-1, Dubai, UAE",
    plusCode: "78CG+26 Dubai",
    coordinates: { lat: 25.0, lng: 55.18 },
  },

  addressIndia: {
    entity: "Magistrum Corpserve Private Limited",
    city: "Mumbai",
    country: "India",
  },

  hours: {
    Monday: "9:00 AM - 9:00 PM",
    Tuesday: "9:00 AM - 9:00 PM",
    Wednesday: "9:00 AM - 9:00 PM",
    Thursday: "9:00 AM - 9:00 PM",
    Friday: "9:00 AM - 9:00 PM",
    Saturday: "9:00 AM - 9:00 PM",
    Sunday: "Closed",
  } as Record<string, string>,

  hoursNote: "Sunday closed (UAE B2B norm). Confirm exact hours before launch.",

  social: {
    facebook: "https://www.facebook.com/profile.php?id=100084690573089",
    instagram: "https://www.instagram.com/magistrumservices",
    linkedin:
      "https://www.linkedin.com/company/magistrum-corpserve-solutions-llc-uae-pvt-ltd-india",
  },

  serviceAreas: ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Northern Emirates"],

  credentials: [
    "Zoho Authorised Training Partner",
    "Authorised Tally Prime Training Centre",
    "Practice across Dubai and Mumbai",
  ],

  rating: { value: 5.0, scale: 5, source: "Google" as const, countNote: "private" },

  compliance: {
    // Leave empty until the user provides real values. The Footer hides the
    // line entirely when these are empty, so placeholder text never leaks.
    dedLicence: "",
    vatTrn: "",
  },

  parentEntity: "Magistrum Corpserve Private Limited (India)",

  founders: [
    {
      name: "Haridas Krishna",
      role: "Co-founder, Finance Lead",
      bio: "Finance professional with over 25 years of experience across the Middle East and India.",
      email: "haridas.krishna@magistrum.net",
      photo: "/team/haridas-krishna.jpg",
    },
    {
      name: "Seema Krishna",
      role: "Co-founder, IT Lead",
      bio: "Oracle Certified IT professional with senior experience at leading IT firms in the Middle East.",
      email: "seema.krishna@magistrum.net",
      photo: "/team/seema-krishna.jpg",
    },
  ],

  values: ["Integrity", "Innovation", "Accountability", "Trust", "Quality"],

  alsoOf: {
    note: "Magistrum's India entity also operates Bilzen Chocolates and Confectioneries. Cross-sector depth, single ownership.",
  },
} as const;

export const services = [
  {
    slug: "zoho-books",
    name: "Zoho Books Implementation",
    short: "VAT-ready accounting in 7 working days.",
    icon: "BookOpen",
    tier: "core",
    description:
      "End-to-end Zoho Books setup configured for UAE VAT and Corporate Tax. We migrate your historical data, configure FTA-compliant tax codes, train your finance team, and stay on for month-end and year-end.",
    timeline: "7 to 14 working days for most SMEs",
    includesShort: [
      "Discovery plus chart-of-accounts design",
      "UAE VAT (5%) and Corporate Tax (9%) tax codes",
      "Bank feeds and automated reconciliation",
      "Customer and supplier data migration",
      "FTA-compliant invoice templates (bilingual)",
      "Team training (3 hours, recorded)",
      "30-day post-go-live support included",
    ],
  },
  {
    slug: "zoho-crm",
    name: "Zoho CRM Implementation",
    short: "A pipeline that reflects your sales reality.",
    icon: "Workflow",
    tier: "core",
    description:
      "Zoho CRM configured to your real sales process, not a generic template. Pipeline stages, lead-scoring, automation, email integration, and reporting that the team will actually use.",
    timeline: "10 to 21 working days",
    includesShort: [
      "Sales-process mapping workshop",
      "Custom stages, fields and automation",
      "Lead source tracking and scoring",
      "Email and WhatsApp Business integration",
      "Dashboards for reps and managers",
      "Team training across roles",
      "30-day adoption support",
    ],
  },
  {
    slug: "zoho-workplace",
    name: "Zoho Workplace and Google Workspace Migration",
    short: "Move off Google Workspace without losing a day.",
    icon: "ArrowRightLeft",
    tier: "core",
    description:
      "Full migration from Google Workspace or Microsoft 365 to Zoho Workplace: mail, calendars, contacts, files, with zero downtime and your DNS handled. The cost-effective collaboration stack for UAE SMEs.",
    timeline: "5 to 10 working days",
    includesShort: [
      "Mail, calendar and contact migration",
      "Drive and file migration with structure preserved",
      "MX and DNS cutover with zero downtime",
      "User onboarding sessions",
      "Mobile-device configuration assistance",
      "Post-cutover monitoring",
    ],
  },
  {
    slug: "zoho-finance-suite",
    name: "Zoho Finance Suite",
    short: "Books, Invoice, Expense, Inventory and Payroll as one stack.",
    icon: "Layers",
    tier: "core",
    description:
      "The full Zoho Finance bundle implemented as one connected system. Invoicing flows to Books, expense claims hit the right GLs, inventory updates revenue, and payroll posts to your books automatically.",
    timeline: "3 to 5 weeks",
    includesShort: [
      "Books, Invoice, Expense, Inventory and Payroll",
      "Cross-module workflow design",
      "Approval matrices configured to your hierarchy",
      "FTA-compliant tax reporting across the stack",
      "Multi-currency and multi-branch where needed",
      "Manager and team training",
    ],
  },
  {
    slug: "zoho-one",
    name: "Zoho One Implementation",
    short: "45 plus applications, configured to one business.",
    icon: "Boxes",
    tier: "core",
    description:
      "If you are going all-in on Zoho One, we deliver the implementation as a coherent system: CRM, Books, Desk, Projects, People, Workplace, with single sign-on, unified data, and one workflow logic across the stack.",
    timeline: "6 to 12 weeks",
    includesShort: [
      "Roadmap workshop: what to deploy first",
      "Apps configured to your business processes",
      "Single sign-on across the stack",
      "Reporting layer with cross-app insights",
      "Phased team training",
      "Ongoing optimisation retainer available",
    ],
  },
  {
    slug: "training-zoho-books-certification",
    name: "Zoho Books Certification Training",
    short: "Get your finance team Zoho-certified.",
    icon: "GraduationCap",
    tier: "core",
    description:
      "Authorised Zoho Books certification training for finance teams and individual accountants. UAE VAT and Corporate Tax curriculum built in. Includes case-based assessments and certificate.",
    timeline: "20 to 40 hours over 2 to 4 weeks",
    includesShort: [
      "Zoho Books fundamentals to advanced",
      "UAE VAT 201 walkthroughs",
      "Corporate Tax filing in Zoho Books",
      "Case-based assessments",
      "Authorised certificate on completion",
      "Lifetime access to course material",
    ],
  },
] as const;

// Magistrum's broader practice beyond the Zoho stack. Sourced from magistrum.net.
// These have lighter site presence than core Zoho engagements: surfaced via the
// "We also offer" section on the homepage and the /services index.
export const otherServices = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    short: "Websites, landing pages, SEO, paid media and funnel design.",
    icon: "Megaphone",
    description: "Custom websites, optimised landing pages, SEO, Google Ads, Facebook Ads, funnel design and online course launch support for coaches and consultants.",
  },
  {
    slug: "it-consultancy",
    name: "IT Consultancy",
    short: "Pick the right technology before you build.",
    icon: "Lightbulb",
    description: "Advisory for SMEs and growing businesses on digitising operations: choosing the right stack, sequencing the work, and avoiding the common pitfalls.",
  },
  {
    slug: "software-development",
    name: "Software Development",
    short: "Scalable solutions, minimal infrastructure.",
    icon: "Code2",
    description: "Custom software development for short-term and long-term needs. We focus on highly scalable solutions with low infrastructure complexity and operational cost.",
  },
  {
    slug: "accounting-classes",
    name: "Online Accounting Classes",
    short: "Practical training for accounting careers.",
    icon: "BookMarked",
    description: "Online and offline accounting training delivered through Magistrum's India practice. Practical, career-focused programmes covering Zoho Books and Tally Prime, with certification on completion.",
  },
] as const;

export const areas = [
  {
    slug: "dubai",
    name: "Dubai",
    short: "Onsite Zoho support across Dubai, from Business Bay to JLT to DIP.",
    neighbourhoods: ["Business Bay", "DIFC", "Dubai Silicon Oasis", "JLT", "Deira", "Bur Dubai", "Dubai Investment Park"],
  },
  {
    slug: "sharjah",
    name: "Sharjah",
    short: "Zoho implementation and training for Sharjah-based SMEs.",
    neighbourhoods: ["Al Khan", "Industrial Area", "Al Nahda", "Al Majaz", "Hamriyah Free Zone"],
  },
  {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    short: "Zoho partner serving Abu Dhabi mainland and free zone businesses.",
    neighbourhoods: ["Khalifa City", "Mussafah", "Yas Island", "Al Reem Island", "Masdar City"],
  },
  {
    slug: "ajman",
    name: "Ajman and Northern Emirates",
    short: "Zoho consulting for Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain.",
    neighbourhoods: ["Ajman Free Zone", "Al Nuaimiya", "RAK Free Trade Zone", "Fujairah Free Zone"],
  },
] as const;

export type Service = (typeof services)[number];
export type Area = (typeof areas)[number];

export function serviceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function areaBySlug(slug: string) {
  return areas.find((a) => a.slug === slug);
}
