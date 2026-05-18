"use client";
import { useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { SectionHeader, Card } from "@/components/ui/Card";
import { FadeUp } from "@/components/motion/FadeUp";

// Real testimonials published on magistrum.net, paraphrased for length.
// `photo` points to a file under /public. If the file is missing
// the component falls back to initials avatar automatically.

const testimonials = [
  {
    name: "Mony Zreik",
    role: "Fitness Coach, UAE",
    body: "What stood out was the time taken to understand the business, and even my personality, before producing design work. The result was something that genuinely suited the brand. Sincere and authentic to deal with.",
    initials: "MZ",
    photo: "/brand/mony_zreik.png",
  },
  {
    name: "Mukesh Swamy",
    role: "Director, MS Fit Out & Event Production, Muscat",
    body: "I had vague ideas. The team translated them into a clear and cohesive vision, surfacing aspects of the brand I had not considered. Attention to detail and a strong sense of current trends. Professional and approachable from start to finish.",
    initials: "MS",
    photo: "/brand/mukesh_swamy.png",
  },
];

function Avatar({ photo, initials, name }: { photo?: string; initials: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (photo && !failed) {
    return (
      <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-navy-100 ring-2 ring-gold-200">
        <Image
          src={photo}
          alt={name}
          width={48}
          height={48}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }
  return (
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-navy-800 text-gold-400 flex items-center justify-center font-serif font-semibold text-base ring-2 ring-gold-200">
      {initials}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="section bg-surface-warm/40">
      <div className="container">
        <SectionHeader
          eyebrow="What clients say"
          title="Real comments from real clients."
          align="center"
          description="Testimonials published on magistrum.net, paraphrased for length. Attribution and roles kept exactly as published."
        />
        <FadeUp selector=".tm" stagger={0.1}>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <Card key={i} className="tm h-full relative p-5 sm:p-6">
                <Quote size={28} className="text-gold-500 mb-3 sm:w-8 sm:h-8" aria-hidden />
                <p className="text-sm sm:text-base text-ink leading-relaxed">{t.body}</p>
                <div className="mt-4 sm:mt-5 pt-4 border-t border-border flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar photo={t.photo} initials={t.initials} name={t.name} />
                    <div className="min-w-0">
                      <div className="font-semibold text-navy-800 text-sm truncate">{t.name}</div>
                      <div className="text-xs text-ink-muted truncate">{t.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0" aria-label="5 stars">
                    {[...Array(5)].map((_, k) => (
                      <Star key={k} size={12} className="fill-gold-500 text-gold-500" aria-hidden />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
