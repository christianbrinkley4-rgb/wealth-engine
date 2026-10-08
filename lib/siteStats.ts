/**
 * Verified counts for the homepage trust-by-numbers band. Every number here
 * is asserted by lib/__tests__/siteStats.test.ts against the real data, so
 * the band can never drift from the site it describes. No invented figures.
 */
export const SITE_STATS = {
  /** Interactive calculators under /tools, not counting quizzes or the hub. */
  calculators: 9,
  /** Decision-tree quizzes under /tools. */
  quizzes: 3,
  /** Plain-English guides: TRAFFIC_GUIDES plus the standalone /guides pages. */
  guides: 46,
  /** Money articles under /wealth, not counting hub and section pages. */
  articles: 28,
} as const;
