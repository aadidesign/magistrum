"use client";
import { ReactNode } from "react";

export function Marquee({
  children,
  speed = 35,
  pauseOnHover = true,
  direction = "left",
}: {
  children: ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
}) {
  const animClass = direction === "left" ? "marquee-left" : "marquee-right";
  return (
    <div className={`marquee group relative overflow-hidden ${pauseOnHover ? "marquee-pause" : ""}`} aria-hidden={false}>
      <div className={`marquee-track ${animClass}`} style={{ animationDuration: `${speed}s` }}>
        <div className="marquee-row">{children}</div>
        <div className="marquee-row" aria-hidden>{children}</div>
      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .marquee-row {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          padding-right: 2.5rem;
          flex-shrink: 0;
        }
        @keyframes marquee-l {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-r {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-left {
          animation: marquee-l linear infinite;
        }
        .marquee-right {
          animation: marquee-r linear infinite;
        }
        .marquee-pause:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
