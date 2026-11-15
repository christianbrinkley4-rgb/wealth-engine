import type { Metadata } from "next";

/**
 * The AI guides are off-topic for search (lib/indexFocus.ts). Match the
 * X-Robots-Tag header in the HTML meta tag. Passthrough layout, no UI.
 */
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
