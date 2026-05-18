import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, interactive, ...rest }: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "bg-surface-elevated border border-border rounded-xl p-6 transition-all duration-base ease-out-quart",
        interactive ? "hover:shadow-md hover:-translate-y-0.5 hover:border-border-strong cursor-pointer" : "",
        className,
      )}
      {...rest}
    />
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-8 sm:mb-10 md:mb-12 max-w-3xl", align === "center" ? "mx-auto text-center" : "")}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-[1.625rem] leading-[1.15] sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-navy-800 tracking-tight text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-ink-secondary text-balance leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
