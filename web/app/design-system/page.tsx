import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Design System (internal)",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "navy-800 (primary)", hex: "#0B2447", cls: "bg-navy-800" },
  { name: "navy-700", hex: "#19376D", cls: "bg-navy-700" },
  { name: "gold-500 (accent)", hex: "#C9A227", cls: "bg-gold-500" },
  { name: "gold-100", hex: "#F5EBC2", cls: "bg-gold-100" },
  { name: "surface", hex: "#FBFAF7", cls: "bg-surface border border-border" },
  { name: "surface-elevated", hex: "#FFFFFF", cls: "bg-surface-elevated border border-border" },
  { name: "ink", hex: "#0F172A", cls: "bg-ink" },
  { name: "ink-secondary", hex: "#475569", cls: "bg-ink-secondary" },
  { name: "success", hex: "#0E8C5C", cls: "bg-success" },
  { name: "warning", hex: "#B45309", cls: "bg-warning" },
  { name: "danger", hex: "#B91C1C", cls: "bg-danger" },
];

export default function DesignSystemPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-serif font-semibold text-navy-800">Magistrum, Design System</h1>
      <p className="mt-2 text-ink-secondary">Internal style guide. Not indexed.</p>

      <section className="mt-12">
        <h2 className="text-2xl font-serif font-semibold text-navy-800">Colours</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {colors.map((c) => (
            <div key={c.name} className="rounded-lg overflow-hidden border border-border">
              <div className={`h-16 ${c.cls}`} aria-hidden />
              <div className="p-2 text-xs">
                <div className="font-medium text-navy-800">{c.name}</div>
                <div className="text-ink-muted">{c.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-serif font-semibold text-navy-800">Typography</h2>
        <div className="mt-4 space-y-3">
          <p className="text-6xl font-serif text-navy-800">H1, Fraunces 60px</p>
          <p className="text-5xl font-serif text-navy-800">H1 mobile, Fraunces 48px</p>
          <p className="text-4xl font-serif text-navy-800">H2, Fraunces 36px</p>
          <p className="text-3xl font-serif text-navy-800">H3, Fraunces 30px</p>
          <p className="text-2xl font-serif text-navy-800">H4, Fraunces 24px</p>
          <p className="text-lg text-ink">Lead, Inter 18px / 1.55</p>
          <p className="text-base text-ink">Body, Inter 16px / 1.6</p>
          <p className="text-sm text-ink-secondary">Body small, Inter 14px / 1.55</p>
          <p className="text-xs text-ink-muted uppercase tracking-widest">Caption</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-serif font-semibold text-navy-800">Buttons</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">Primary sm</Button>
          <Button variant="primary">Primary md</Button>
          <Button variant="primary" size="lg">Primary lg</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="whatsapp">WhatsApp</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-serif font-semibold text-navy-800">Inputs</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-4 max-w-2xl">
          <Input label="First name" name="first" required />
          <Input label="Email" type="email" name="email" required hint="We never share." />
          <Input label="Error example" name="err" error="This field is required" />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-serif font-semibold text-navy-800">Cards</h2>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <Card><h3 className="font-semibold text-navy-800">Static card</h3><p className="text-sm text-ink-secondary mt-1">No hover.</p></Card>
          <Card interactive><h3 className="font-semibold text-navy-800">Interactive card</h3><p className="text-sm text-ink-secondary mt-1">Hover for lift + shadow.</p></Card>
          <Card className="bg-navy-800 text-surface border-navy-700"><h3 className="font-semibold text-surface">Dark variant</h3><p className="text-sm text-surface/80 mt-1">Used in dual offer.</p></Card>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-serif font-semibold text-navy-800">Accordion</h2>
        <div className="mt-4 max-w-2xl">
          <Accordion items={[
            { q: "Question one?", a: "Answer one." },
            { q: "Question two?", a: "Answer two." },
          ]} />
        </div>
      </section>
    </div>
  );
}
