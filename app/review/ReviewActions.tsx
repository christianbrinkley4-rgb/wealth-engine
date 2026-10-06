"use client";

import { ExternalLink } from "lucide-react";
import { useEffect } from "react";

import { trackEvent } from "@/app/components/Analytics";
import type { ReviewSource } from "@/lib/analytics";

/** Counts one visit to the review page. Says which kind of link, never who. */
export function ReviewViewTracker({ source }: { source: ReviewSource | null }) {
  useEffect(() => {
    trackEvent("review_page_view", source ? { review_source: source } : undefined);
  }, [source]);
  return null;
}

/** The one big button. Same link for everyone, reported once when tapped. */
export function ReviewButton({ href, source }: { href: string; source: ReviewSource | null }) {
  return (
    <a
      href={href}
      className="btn rvp-button"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("review_click", source ? { review_source: source } : undefined)}
    >
      Write a Google review
      <ExternalLink size={19} aria-hidden />
    </a>
  );
}
