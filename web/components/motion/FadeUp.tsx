"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
  selector?: string;
};

export function FadeUp({ children, className, delay = 0, y = 24, stagger = 0.08, selector }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets = selector ? gsap.utils.toArray<HTMLElement>(selector, ref.current!) : [ref.current!];
      if (reduce) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay,
        stagger,
        scrollTrigger: { trigger: ref.current!, start: "top 85%", once: true },
      });
    },
    { scope: ref, dependencies: [] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
