import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Reconciled palette from design-system/magistrum/MASTER.md
        navy: {
          50: "#F0F3F8",
          100: "#E5EAF2",
          200: "#C7D1E2",
          300: "#9AAAC6",
          400: "#6981AB",
          500: "#2A4D8F",
          600: "#19376D",
          700: "#0F2856",
          800: "#0B2447",
          900: "#0A1E3C",
          950: "#06122A",
        },
        gold: {
          50: "#FBF7E8",
          100: "#F5EBC2",
          200: "#EBD787",
          300: "#E0C04F",
          400: "#D7B032",
          500: "#C9A227",
          600: "#B68F1A",
          700: "#937116",
          800: "#785C18",
          900: "#624C19",
        },
        surface: {
          DEFAULT: "#FBFAF7",
          elevated: "#FFFFFF",
          warm: "#F5F2E8",
        },
        ink: {
          DEFAULT: "#0F172A",
          secondary: "#475569",
          muted: "#64748B",
          inverse: "#FBFAF7",
        },
        border: {
          DEFAULT: "#E8E4DA",
          strong: "#C8C2B3",
        },
        success: "#0E8C5C",
        warning: "#B45309",
        danger: "#B91C1C",
        info: "#1E40AF",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1.5", letterSpacing: "0.01em" }],
        sm: ["14px", { lineHeight: "1.55" }],
        base: ["16px", { lineHeight: "1.6" }],
        lg: ["18px", { lineHeight: "1.55" }],
        xl: ["20px", { lineHeight: "1.5", letterSpacing: "-0.005em" }],
        "2xl": ["24px", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        "3xl": ["30px", { lineHeight: "1.3", letterSpacing: "-0.015em" }],
        "4xl": ["36px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "5xl": ["48px", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "6xl": ["60px", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "7xl": ["72px", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "8px",
        md: "10px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(15, 23, 42, 0.04)",
        DEFAULT: "0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)",
        md: "0 4px 6px rgba(15, 23, 42, 0.06), 0 2px 4px rgba(15, 23, 42, 0.04)",
        lg: "0 10px 15px rgba(15, 23, 42, 0.06), 0 4px 6px rgba(15, 23, 42, 0.04)",
        xl: "0 20px 25px rgba(15, 23, 42, 0.08), 0 10px 10px rgba(15, 23, 42, 0.04)",
        glow: "0 0 0 4px rgba(201, 162, 39, 0.18)",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
