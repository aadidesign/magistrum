// Reusable decorative SVG components, adds visual texture without bloat.

export function DotGrid({ className = "", color = "currentColor", opacity = 0.08 }: { className?: string; color?: string; opacity?: number }) {
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill={color} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid)" />
    </svg>
  );
}

export function GridLines({ className = "", color = "currentColor", opacity = 0.06 }: { className?: string; color?: string; opacity?: number }) {
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id="grid-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={color} strokeWidth="1" opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-lines)" />
    </svg>
  );
}

export function CornerOrnament({ className = "", color = "#C9A227" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden focusable="false">
      <circle cx="40" cy="40" r="36" fill="none" stroke={color} strokeWidth="0.6" opacity="0.3" />
      <circle cx="40" cy="40" r="22" fill="none" stroke={color} strokeWidth="0.6" opacity="0.5" />
      <circle cx="40" cy="40" r="8" fill={color} opacity="0.15" />
    </svg>
  );
}

export function WaveDivider({ className = "", color = "#FBFAF7" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 1200 60" className={className} preserveAspectRatio="none" aria-hidden focusable="false">
      <path d="M0,30 Q300,0 600,30 T1200,30 L1200,60 L0,60 Z" fill={color} />
    </svg>
  );
}

// Per-service abstract decoration, keeps each service card visually distinct.
export function ServiceArt({ kind, className = "" }: { kind: "books" | "crm" | "workplace" | "finance" | "one" | "training"; className?: string }) {
  const stroke = "#0B2447";
  const gold = "#C9A227";
  const opacity = 0.7;

  const arts: Record<string, JSX.Element> = {
    books: (
      <svg viewBox="0 0 100 60" className={className} aria-hidden>
        <rect x="6" y="10" width="22" height="40" rx="2" fill="none" stroke={stroke} strokeWidth="1.2" opacity={opacity} />
        <rect x="32" y="14" width="22" height="36" rx="2" fill={gold} fillOpacity="0.15" stroke={gold} strokeWidth="1.2" />
        <rect x="58" y="6" width="22" height="44" rx="2" fill="none" stroke={stroke} strokeWidth="1.2" opacity={opacity} />
        <line x1="36" y1="22" x2="50" y2="22" stroke={gold} strokeWidth="1.2" />
        <line x1="36" y1="28" x2="48" y2="28" stroke={gold} strokeWidth="1.2" opacity="0.6" />
        <line x1="36" y1="34" x2="50" y2="34" stroke={gold} strokeWidth="1.2" opacity="0.4" />
      </svg>
    ),
    crm: (
      <svg viewBox="0 0 100 60" className={className} aria-hidden>
        <circle cx="20" cy="30" r="8" fill="none" stroke={stroke} strokeWidth="1.2" opacity={opacity} />
        <circle cx="50" cy="20" r="10" fill={gold} fillOpacity="0.15" stroke={gold} strokeWidth="1.2" />
        <circle cx="80" cy="40" r="9" fill="none" stroke={stroke} strokeWidth="1.2" opacity={opacity} />
        <line x1="28" y1="30" x2="40" y2="22" stroke={stroke} strokeWidth="1" opacity="0.4" />
        <line x1="60" y1="22" x2="71" y2="36" stroke={stroke} strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="30" x2="50" y2="42" stroke={gold} strokeWidth="1" />
      </svg>
    ),
    workplace: (
      <svg viewBox="0 0 100 60" className={className} aria-hidden>
        <rect x="10" y="14" width="36" height="22" rx="2" fill="none" stroke={stroke} strokeWidth="1.2" opacity={opacity} />
        <rect x="14" y="18" width="28" height="3" fill={stroke} opacity="0.3" />
        <rect x="14" y="24" width="20" height="3" fill={stroke} opacity="0.3" />
        <path d="M50,28 L60,28 M58,24 L60,28 L58,32" fill="none" stroke={gold} strokeWidth="1.5" />
        <rect x="64" y="14" width="26" height="32" rx="2" fill={gold} fillOpacity="0.15" stroke={gold} strokeWidth="1.2" />
        <circle cx="77" cy="24" r="3" fill={gold} />
        <rect x="68" y="32" width="18" height="2" fill={gold} opacity="0.4" />
        <rect x="68" y="36" width="14" height="2" fill={gold} opacity="0.4" />
      </svg>
    ),
    finance: (
      <svg viewBox="0 0 100 60" className={className} aria-hidden>
        <rect x="8" y="38" width="12" height="14" fill={gold} fillOpacity="0.2" stroke={gold} strokeWidth="1" />
        <rect x="24" y="28" width="12" height="24" fill={gold} fillOpacity="0.4" stroke={gold} strokeWidth="1" />
        <rect x="40" y="18" width="12" height="34" fill={gold} fillOpacity="0.6" stroke={gold} strokeWidth="1" />
        <rect x="56" y="10" width="12" height="42" fill={gold} fillOpacity="0.85" stroke={gold} strokeWidth="1" />
        <rect x="72" y="22" width="12" height="30" fill="none" stroke={stroke} strokeWidth="1.2" opacity={opacity} />
      </svg>
    ),
    one: (
      <svg viewBox="0 0 100 60" className={className} aria-hidden>
        {[0,1,2,3].map((row) =>
          [0,1,2,3,4,5].map((col) => {
            const isHi = (row + col) % 3 === 0;
            return (
              <rect key={`${row}-${col}`}
                x={6 + col * 15}
                y={6 + row * 13}
                width={11}
                height={9}
                fill={isHi ? gold : stroke}
                fillOpacity={isHi ? 0.85 : 0.12}
                stroke={isHi ? gold : stroke}
                strokeOpacity={isHi ? 1 : 0.4}
                strokeWidth={0.6}
                rx={1.5}
              />
            );
          })
        )}
      </svg>
    ),
    training: (
      <svg viewBox="0 0 100 60" className={className} aria-hidden>
        <path d="M10,40 L50,18 L90,40 L50,52 Z" fill={gold} fillOpacity="0.15" stroke={gold} strokeWidth="1.2" />
        <path d="M30,36 L30,46 L50,52 L70,46 L70,36" fill="none" stroke={stroke} strokeWidth="1.2" opacity={opacity} />
        <line x1="86" y1="40" x2="86" y2="50" stroke={gold} strokeWidth="1.4" />
        <circle cx="86" cy="51" r="2" fill={gold} />
      </svg>
    ),
  };

  return arts[kind] || null;
}
