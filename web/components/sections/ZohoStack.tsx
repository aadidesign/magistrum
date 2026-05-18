import Image from "next/image";
import { ZohoTile, zohoApps } from "@/components/ui/ZohoTile";
import { FadeUp } from "@/components/motion/FadeUp";

export function ZohoStack() {
  return (
    <section className="section bg-surface-warm/30 border-y border-border">
      <div className="container">
        <FadeUp>
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            {/* Prominent Authorised Partner of Zoho lockup */}
            <div className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-surface-elevated border border-border shadow-sm mb-5 sm:mb-6">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ink-muted font-semibold leading-none whitespace-nowrap">
                Authorised<br />Partner of
              </span>
              <span className="w-px h-8 sm:h-10 bg-border" aria-hidden />
              <Image
                src="https://cdn.simpleicons.org/zoho/E42527"
                alt="Zoho"
                width={48}
                height={48}
                unoptimized
                className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
              />
              <span
                className="font-sans font-extrabold tracking-tight text-2xl sm:text-3xl leading-none"
                style={{ color: "#E42527", letterSpacing: "-0.02em" }}
                aria-hidden
              >
                ZOHO
              </span>
            </div>

            <h2 className="text-[1.625rem] leading-[1.15] sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-navy-800 tracking-tight text-balance">
              The Zoho stack we implement.
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-ink-secondary leading-relaxed">
              Fourteen applications across finance, sales, support and operations. Pick one, several, or the full Zoho One bundle.
            </p>
          </div>
        </FadeUp>

        <FadeUp selector=".zt" stagger={0.04}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3">
            {zohoApps.map((a) => (
              <div key={a.slug} className="zt">
                <ZohoTile app={a} size="md" />
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp>
          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-2 text-xs text-ink-muted">
              <span className="w-8 h-px bg-border" aria-hidden />
              Brand artwork shown is illustrative. Zoho is a registered trademark of Zoho Corporation.
              <span className="w-8 h-px bg-border" aria-hidden />
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
