"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, MessageCircle, ChevronDown, ShieldCheck } from "lucide-react";
import { business, services, areas } from "@/lib/business";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type NavItem =
  | { href: string; label: string; kind: "link" }
  | { label: string; kind: "menu"; items: { href: string; label: string; sub?: string }[] };

const nav: NavItem[] = [
  {
    label: "Services",
    kind: "menu",
    items: services.map((s) => ({ href: `/services/${s.slug}`, label: s.name, sub: s.short })),
  },
  {
    label: "Areas",
    kind: "menu",
    items: areas.map((a) => ({ href: `/areas/${a.slug}`, label: a.name, sub: a.short })),
  },
  { href: "/about", label: "About", kind: "link" },
  { href: "/blog", label: "Insights", kind: "link" },
  { href: "/contact", label: "Contact", kind: "link" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ticking = useRef(false);

  // close mobile menu on route change (best-effort: on resize past lg)
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Track scroll position only to toggle the "scrolled" elevated look.
  // The navbar is always visible — no hide-on-scroll-down behaviour.
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 4);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoverMenu(label);
  }
  function closeMenuSoon() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHoverMenu(null), 120);
  }

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 ease-out-quart",
        scrolled
          ? "bg-surface/95 supports-[backdrop-filter]:bg-surface/85 backdrop-blur-md border-border shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
          : "bg-surface/90 supports-[backdrop-filter]:bg-surface/75 backdrop-blur border-border/60",
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-4 h-[60px] sm:h-16 md:h-18 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0 flex-1 lg:flex-initial" aria-label="Magistrum home">
          <Image
            src="/brand/logo.png"
            alt="Magistrum"
            width={260}
            height={80}
            priority
            className="h-9 sm:h-10 lg:h-12 w-auto object-contain flex-shrink-0"
          />
          <div className="md:hidden flex items-center gap-2 min-w-0">
            <span className="font-serif font-semibold text-navy-900 text-[19px] sm:text-xl tracking-tight leading-none">
              Magistrum
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-1 rounded-md bg-gold-50 border border-gold-200/70 text-[9px] uppercase tracking-[0.08em] text-gold-800 font-semibold whitespace-nowrap leading-none">
              <ShieldCheck size={9} className="text-gold-600" aria-hidden /> Zoho Authorised
            </span>
          </div>
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-gold-700 font-semibold border-l border-border pl-3 whitespace-nowrap">
            <ShieldCheck size={10} aria-hidden /> Zoho Authorised
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {nav.map((n) => {
            if (n.kind === "link") {
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className="px-3 py-2 text-sm font-medium text-ink-secondary hover:text-navy-800 hover:bg-navy-50 rounded-lg transition-colors duration-fast"
                >
                  {n.label}
                </Link>
              );
            }
            const isOpen = hoverMenu === n.label;
            return (
              <div
                key={n.label}
                className="relative"
                onMouseEnter={() => openMenu(n.label)}
                onMouseLeave={closeMenuSoon}
                onFocus={() => openMenu(n.label)}
                onBlur={closeMenuSoon}
              >
                <button
                  type="button"
                  className="px-3 py-2 text-sm font-medium text-ink-secondary hover:text-navy-800 hover:bg-navy-50 rounded-lg transition-colors duration-fast flex items-center gap-1 cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  {n.label}
                  <ChevronDown size={14} className={cn("transition-transform duration-base", isOpen ? "rotate-180" : "")} aria-hidden />
                </button>
                {isOpen ? (
                  <div className="absolute left-0 top-full pt-2 w-[360px]" role="menu">
                    <div className="bg-surface-elevated border border-border rounded-xl shadow-lg p-2">
                      {n.items.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          role="menuitem"
                          className="block px-3 py-2.5 rounded-lg hover:bg-navy-50 transition-colors duration-fast cursor-pointer"
                          onClick={closeMenuSoon}
                        >
                          <div className="text-sm font-semibold text-navy-800">{it.label}</div>
                          {it.sub ? <div className="text-xs text-ink-muted mt-0.5 line-clamp-1">{it.sub}</div> : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
          <a href={business.phone.primary.tel} className="hidden xl:inline-flex text-sm font-semibold text-navy-800 hover:text-navy-600 transition-colors items-center gap-1.5">
            <Phone size={16} aria-hidden /> {business.phone.primary.display}
          </a>
          <Link href="/contact"><Button variant="primary" size="sm">Book Discovery Call</Button></Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 -mr-1 rounded-lg hover:bg-navy-50 active:bg-navy-100 transition-colors duration-fast cursor-pointer flex-shrink-0"
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="lg:hidden border-t border-border bg-surface max-h-[calc(100vh-3.5rem)] overflow-y-auto scrollbar-thin">
          <div className="container py-4">
            <details className="group border-b border-border pb-2 mb-2">
              <summary className="flex items-center justify-between py-2 cursor-pointer font-semibold text-navy-800 list-none">
                Services <ChevronDown size={16} className="group-open:rotate-180 transition-transform duration-base" aria-hidden />
              </summary>
              <ul className="mt-2 space-y-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-ink-secondary hover:bg-navy-50 hover:text-navy-800">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            <details className="group border-b border-border pb-2 mb-2">
              <summary className="flex items-center justify-between py-2 cursor-pointer font-semibold text-navy-800 list-none">
                Areas <ChevronDown size={16} className="group-open:rotate-180 transition-transform duration-base" aria-hidden />
              </summary>
              <ul className="mt-2 space-y-1">
                {areas.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/areas/${a.slug}`} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-ink-secondary hover:bg-navy-50 hover:text-navy-800">
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            <div className="flex flex-col gap-1 py-2">
              {nav.filter((n): n is { href: string; label: string; kind: "link" } => n.kind === "link").map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-3 rounded-lg font-medium text-ink hover:bg-navy-50 hover:text-navy-800"
                >
                  {n.label}
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-border">
              <a href={business.phone.primary.tel} className="btn-secondary text-sm py-2.5 px-3 flex items-center justify-center gap-2 cursor-pointer">
                <Phone size={16} aria-hidden /> Call
              </a>
              <a href={business.whatsapp.link()} target="_blank" rel="noopener" className="btn-whatsapp text-sm py-2.5 px-3 flex items-center justify-center gap-2 cursor-pointer">
                <MessageCircle size={16} aria-hidden /> WhatsApp
              </a>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary col-span-2 text-sm py-2.5 px-3 flex items-center justify-center gap-2 cursor-pointer">
                Book Discovery Call
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
