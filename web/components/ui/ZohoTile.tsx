// Visual tile for a Zoho product. Each tile uses brand-inspired colour cues
// plus a Lucide glyph for product recognition. Magistrum is a Zoho Authorised
// Partner; product names are used with that permission. Artwork shown is our
// own designed iconography, not Zoho's official product marks.

import {
  BookOpen, Users, Mail, FileText, PenTool, Boxes, Wallet, Receipt,
  Briefcase, ClipboardList, Headphones, Calendar, BarChart3, Cog, type LucideIcon,
} from "lucide-react";

export type ZohoApp = {
  slug: string;
  name: string;
  short: string;
  color: string;
  fg: string;
  Icon: LucideIcon;
};

export const zohoApps: ZohoApp[] = [
  { slug: "books",     name: "Zoho Books",     short: "Accounting",       color: "#0B8043", fg: "#FFFFFF", Icon: BookOpen },
  { slug: "crm",       name: "Zoho CRM",       short: "Sales pipeline",   color: "#E0492F", fg: "#FFFFFF", Icon: Users },
  { slug: "invoice",   name: "Zoho Invoice",   short: "Invoicing",        color: "#F3A93C", fg: "#1A1A1A", Icon: Receipt },
  { slug: "expense",   name: "Zoho Expense",   short: "Expense claims",   color: "#3A8DDE", fg: "#FFFFFF", Icon: Wallet },
  { slug: "inventory", name: "Zoho Inventory", short: "Stock and orders", color: "#C2453F", fg: "#FFFFFF", Icon: Boxes },
  { slug: "payroll",   name: "Zoho Payroll",   short: "Salary and WPS",   color: "#2A4D8F", fg: "#FFFFFF", Icon: ClipboardList },
  { slug: "sign",      name: "Zoho Sign",      short: "e-Signature",      color: "#5B57D9", fg: "#FFFFFF", Icon: PenTool },
  { slug: "contracts", name: "Zoho Contracts", short: "Contract ops",     color: "#1F8A8A", fg: "#FFFFFF", Icon: FileText },
  { slug: "mail",      name: "Zoho Mail",      short: "Workplace email",  color: "#E0392F", fg: "#FFFFFF", Icon: Mail },
  { slug: "workplace", name: "Zoho Workplace", short: "Collaboration",    color: "#5C2D91", fg: "#FFFFFF", Icon: Briefcase },
  { slug: "desk",      name: "Zoho Desk",      short: "Helpdesk",         color: "#E04545", fg: "#FFFFFF", Icon: Headphones },
  { slug: "projects",  name: "Zoho Projects",  short: "Project mgmt",     color: "#2A8FBD", fg: "#FFFFFF", Icon: Calendar },
  { slug: "analytics", name: "Zoho Analytics", short: "BI dashboards",    color: "#1A5FB4", fg: "#FFFFFF", Icon: BarChart3 },
  { slug: "creator",   name: "Zoho Creator",   short: "Low-code apps",    color: "#0E6E5E", fg: "#FFFFFF", Icon: Cog },
];

export function ZohoTile({ app, size = "md" }: { app: ZohoApp; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { box: "w-9 h-9 rounded-md", icon: 16, label: "text-xs", short: "text-[10px]" },
    md: { box: "w-10 h-10 sm:w-11 sm:h-11 rounded-lg", icon: 18, label: "text-[13px] sm:text-sm", short: "text-[10px] sm:text-[11px]" },
    lg: { box: "w-14 h-14 rounded-xl", icon: 26, label: "text-base", short: "text-xs" },
  } as const;
  const s = sizes[size];
  const { Icon } = app;
  return (
    <div className="group h-full flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl border border-border bg-surface-elevated hover:border-navy-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-base ease-out-quart cursor-default">
      <div
        className={`flex-shrink-0 ${s.box} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-base ease-out-quart`}
        style={{ background: app.color, color: app.fg }}
        aria-hidden
      >
        <Icon size={s.icon} />
      </div>
      <div className="leading-tight min-w-0">
        <div className={`font-semibold text-navy-800 ${s.label} truncate`}>{app.name}</div>
        <div className={`text-ink-muted ${s.short} truncate`}>{app.short}</div>
      </div>
    </div>
  );
}
