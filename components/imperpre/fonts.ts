import { Syne, Work_Sans } from "next/font/google";

// Tipografías propias de Imperpre. Se cargan solo en los componentes de Imperpre; el sitio de FITA no las usa.
export const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--imp-display",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--imp-text",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const imperpreFontClass = `${syne.variable} ${workSans.variable}`;
