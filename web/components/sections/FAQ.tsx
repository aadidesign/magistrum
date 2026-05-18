import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeader } from "@/components/ui/Card";
import { FadeUp } from "@/components/motion/FadeUp";

export const homepageFaqs = [
  {
    q: "How long does Zoho Books implementation actually take?",
    a: "For most UAE SMEs, 7–14 working days end-to-end. That includes scoping, configuration, data migration, training and go-live. We've done it in 5 days for very simple setups and 4 weeks for complex multi-branch migrations.",
  },
  {
    q: "How much will the implementation cost, including everything?",
    a: "Implementation engagements typically range AED 5,500–18,000 depending on scope (single module vs. Zoho One, simple migration vs. complex). The Zoho licence itself is paid directly to Zoho (from around AED 60/user/month). We share a fixed-scope quote after the free discovery call, no scope creep, no surprise upsells.",
  },
  {
    q: "Is Zoho Books compliant with UAE VAT and Corporate Tax?",
    a: "Yes. Zoho Books is fully VAT-compliant (5%) and Corporate Tax-ready (9%). We configure your tax codes from day one, including Small Business Relief if your turnover is under AED 3M, and Designated Zone treatment where applicable.",
  },
  {
    q: "Will my data leave the UAE?",
    a: "Zoho operates data centres globally including in the Middle East. For UAE clients, your data is stored in the region by default, we'll confirm the data residency setup as part of discovery.",
  },
  {
    q: "Can you migrate us from Tally / QuickBooks / Sage / Excel?",
    a: "Yes, these are our four most-common starting points. We migrate master data (customers, suppliers, items, COA) plus opening balances, and where you want it, transactional history. Every migration ends with a tie-out against your closing balances.",
  },
  {
    q: "What happens after go-live?",
    a: "30 days of post-go-live support are included in every engagement. After that, optional retainers cover month-end close, VAT and Corporate Tax filing, new module rollouts, and team training for new joiners.",
  },
  {
    q: "Do you train my team or only configure the system?",
    a: "Training is included. Typically 3 hours for finance, 1–2 hours each for sales, ops or other functions touching Zoho. All sessions are recorded so new team members can self-onboard later.",
  },
  {
    q: "Do you work with businesses in Sharjah, Abu Dhabi or Northern Emirates?",
    a: "Yes, we deliver across the UAE. Discovery is always free regardless of where you're based. Onsite presence is included for Dubai engagements; for other emirates we work remote with periodic site visits as needed.",
  },
];

export function FAQ({ items = homepageFaqs }: { items?: typeof homepageFaqs }) {
  return (
    <section className="section">
      <div className="container max-w-4xl">
        <SectionHeader eyebrow="FAQ" title="The questions UAE finance teams actually ask." />
        <FadeUp>
          <Accordion items={items} />
          <p className="mt-8 text-sm text-ink-muted text-center">
            More questions? <Link href="/contact" className="text-navy-800 font-semibold hover:text-gold-700">Ask us directly</Link>.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
