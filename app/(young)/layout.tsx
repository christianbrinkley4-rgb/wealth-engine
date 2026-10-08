import { Syne } from "next/font/google";

import { WealthChrome } from "./WealthChrome";
import "./wealth.css";

const display = Syne({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-wealth-display",
  display: "swap",
  fallback: ["Avenir Next", "Segoe UI", "sans-serif"],
});

export default function YoungLaneLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`wealth-lane ${display.variable}`}>
      <WealthChrome>{children}</WealthChrome>
    </div>
  );
}
