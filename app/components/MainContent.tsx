"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { AGENT } from "@/lib/agent";

/** The /ai guides are purely informational; no phone number anywhere on them. */
function isAiRoute(pathname: string) {
  return pathname === "/ai" || pathname.startsWith("/ai/");
}

/**
 * Target for the skip link; the pages render their own <main> inside.
 * The print stylesheet reads data-print-contact for the print footer,
 * so it is omitted on /ai routes the same as the header/footer CTAs.
 */
export function MainContent({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const printContact = isAiRoute(pathname)
    ? undefined
    : `${AGENT.name} · Licensed agent, ${AGENT.licenseLine} · ${AGENT.city}, ${AGENT.state} · ${AGENT.phone}. Estimates for education only, not a quote or a benefit determination.`;

  return (
    <div
      id="main-content"
      tabIndex={-1}
      className="outline-none"
      {...(printContact ? { "data-print-contact": printContact } : {})}
    >
      {children}
    </div>
  );
}
