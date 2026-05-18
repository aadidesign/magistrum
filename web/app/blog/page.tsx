import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/blog";
import { SectionHeader, Card } from "@/components/ui/Card";
import { FadeUp } from "@/components/motion/FadeUp";
import { formatDateUAE } from "@/lib/format";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights, Zoho, UAE Tax and Implementation",
  description: "Plain-English guides on Zoho Books, UAE VAT and Corporate Tax, implementation timelines, and the things finance teams actually want to know.",
};

export default function BlogIndex() {
  const published = posts.filter((p) => p.status === "published");
  const upcoming = posts.filter((p) => p.status !== "published");

  return (
    <>
      <section className="gradient-hero">
        <div className="container py-10 sm:py-14 lg:py-20">
          <span className="eyebrow">Insights</span>
          <h1 className="text-[2rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-navy-900 tracking-tight max-w-3xl text-balance">
            Plain-English writing on Zoho, UAE tax and implementation.
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-ink-secondary max-w-2xl leading-relaxed">
            Written by the team that actually does the configuration. No filler, no fluff, just the stuff finance teams need.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Recent" title="Newest posts" />
          <FadeUp selector=".pcard" stagger={0.08}>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
              {published.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="pcard">
                  <Card interactive className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                      <span className="badge-navy">{p.category}</span>
                      <span className="flex items-center gap-1"><Clock size={12} aria-hidden /> {p.readingMinutes} min read</span>
                      <span>{formatDateUAE(p.publishedAt)}</span>
                    </div>
                    <h2 className="mt-3 text-xl sm:text-2xl font-serif font-semibold text-navy-800 leading-tight">{p.title}</h2>
                    <p className="mt-2 text-ink-secondary text-sm leading-relaxed">{p.excerpt}</p>
                    <div className="mt-3 sm:mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-700">Read post <ArrowRight size={14} aria-hidden /></div>
                  </Card>
                </Link>
              ))}
            </div>
          </FadeUp>

          {upcoming.length ? (
            <div className="mt-16">
              <SectionHeader title="Coming up" />
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {upcoming.map((p) => (
                  <li key={p.slug} className="border border-border rounded-lg p-4 bg-surface-elevated">
                    <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold">{p.category}</div>
                    <div className="mt-1 font-semibold text-navy-800">{p.title}</div>
                    <div className="mt-1 text-xs text-ink-muted">~{p.readingMinutes} min · scheduled {formatDateUAE(p.publishedAt)}</div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
