"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type Item = { q: string; a: string };

export function Accordion({ items, defaultOpen = -1 }: { items: Item[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number>(defaultOpen);
  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border border-border rounded-xl bg-surface-elevated overflow-hidden">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`acc-panel-${i}`}
              id={`acc-trigger-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-3 sm:gap-4 text-left px-4 sm:px-5 py-3.5 sm:py-4 transition-colors duration-fast hover:bg-navy-50 cursor-pointer"
            >
              <span className="font-semibold text-navy-800 text-sm sm:text-base md:text-lg leading-snug">{it.q}</span>
              <ChevronDown
                className={cn("flex-shrink-0 transition-transform duration-base ease-out-quart text-navy-600", isOpen ? "rotate-180" : "")}
                size={18}
                aria-hidden
              />
            </button>
            <div
              id={`acc-panel-${i}`}
              role="region"
              aria-labelledby={`acc-trigger-${i}`}
              className={cn("grid transition-[grid-template-rows] duration-base ease-out-quart", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-ink-secondary leading-relaxed">{it.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
