"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg" | "xl";

const SIZES: Record<Size, { box: string; px: number; text: string }> = {
  sm: { box: "w-10 h-10", px: 40, text: "text-sm" },
  md: { box: "w-12 h-12", px: 48, text: "text-base" },
  lg: { box: "w-16 h-16", px: 64, text: "text-2xl" },
  xl: { box: "w-20 h-20", px: 80, text: "text-3xl" },
};

export function PersonAvatar({
  name,
  photo,
  size = "md",
  shape = "circle",
  className,
}: {
  name: string;
  photo?: string;
  size?: Size;
  shape?: "circle" | "rounded";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const s = SIZES[size];
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
  const radius = shape === "circle" ? "rounded-full" : "rounded-2xl";

  if (photo && !failed) {
    return (
      <div className={cn(s.box, radius, "overflow-hidden bg-navy-100 ring-2 ring-gold-200 flex-shrink-0", className)}>
        <Image
          src={photo}
          alt={name}
          width={s.px}
          height={s.px}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        s.box,
        radius,
        "flex-shrink-0 bg-navy-800 text-gold-400 flex items-center justify-center font-serif font-semibold ring-2 ring-gold-200",
        s.text,
        className,
      )}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
