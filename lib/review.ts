import { isReviewSource, type ReviewSource } from "@/lib/analytics";

/**
 * The review page, for people Christian has already worked with.
 *
 * The rules this file exists to keep:
 *   - Everyone gets the same link. There is no "how was it?" step first.
 *   - Nothing here offers anything in return for a review.
 *   - Nothing here writes, pre-fills, or suggests what a review should say.
 *     The prompts are questions about the visit, never about results.
 */

export const REVIEW_PATH = "/review";

/**
 * Printed cards and texts need the real address, not whatever host a preview
 * build happens to run on, so this is fixed rather than read from SITE_URL.
 */
export const REVIEW_ORIGIN = "https://christianbrinkleync.com";

/**
 * Which kind of link brought someone to the page. Anything else, including a
 * name or an email someone pasted into the address by mistake, reads as none.
 */
export function parseReviewSource(raw: string | null | undefined): ReviewSource | null {
  return isReviewSource(raw) ? raw : null;
}

/** The full link for one way of handing the page to someone. */
export function reviewLink(source?: ReviewSource): string {
  return `${REVIEW_ORIGIN}${REVIEW_PATH}${source ? `?from=${source}` : ""}`;
}

/**
 * Plain prompts to make a blank box less blank. Questions about the visit
 * only: nothing about prices, savings, plans, health, or how it turned out.
 */
export const REVIEW_PROMPTS = [
  "What were you trying to figure out?",
  "What was it like working with me?",
] as const;
