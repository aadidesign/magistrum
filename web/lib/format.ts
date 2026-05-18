export function formatAED(amount: number): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPhoneUAE(e164: string): string {
  // +971588991583 → +971 58 899 1583
  const m = e164.match(/^\+971(\d{2})(\d{3})(\d{4})$/);
  if (!m) return e164;
  return `+971 ${m[1]} ${m[2]} ${m[3]}`;
}

export function formatDateUAE(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("en-AE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function readingTime(text: string): number {
  const wpm = 220;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}
