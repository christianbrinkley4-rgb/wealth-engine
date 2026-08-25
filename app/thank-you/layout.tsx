import type { Metadata } from "next";

/**
 * The confirmation page is a private step in a funnel, not a landing page.
 *
 * It previously inherited the root layout's canonical, so it told search
 * engines its canonical URL was the home page, while advertising
 * "index, follow" and being blocked in robots.txt at the same time. A blocked
 * page cannot be crawled to discover a noindex, so the block is lifted in
 * robots.ts and the instruction is given here instead.
 */
export const metadata: Metadata = {
  title: "Thanks — check your email",
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: true },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
