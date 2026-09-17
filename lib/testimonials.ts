/**
 * Real things real clients said. Nothing else goes in this file.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ACTION REQUIRED — this array is empty, and while it is empty the site shows
 * no social proof at all.
 *
 * That is currently the largest single reason a visitor leaves without
 * calling. Everything else on the site is Christian describing Christian:
 * six promises about what he will not do, a compensation disclosure, a
 * photograph. A sixty-five-year-old deciding who to trust with their health
 * coverage discounts all of that automatically and looks for other people like
 * them. Right now there is nothing to find.
 *
 * Three or four of these outrank every other improvement on this site.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * How to collect them, in rough order of value:
 *
 *   1. Google Business Profile reviews. These do double duty — they are the
 *      strongest local ranking signal you have, and they are verifiable in a
 *      way an on-page quote never is. Ask every client you have already helped.
 *   2. A sentence in an email after you have solved something. "Would you mind
 *      if I put that on my website?" is the whole ask.
 *   3. The specific beats the glowing. "He found out my cardiologist wasn't in
 *      the plan I was about to pick" persuades; "great service" does not.
 *
 * Rules, because insurance advertising is regulated and this is a licensed
 * agent's site:
 *
 *   - Only publish what the person actually said, with their permission.
 *   - No claims about savings, outcomes, or benefits a plan will provide.
 *   - First name and last initial plus a town is enough attribution; do not
 *     publish full names or anything identifying their health.
 *   - Do not offer anything in exchange for a review. Beyond the ethics, it
 *     violates Google's policy and CMS marketing rules.
 */

export interface Testimonial {
  /** Their words, unedited apart from trimming. */
  quote: string;
  /** "Linda M." — first name, last initial. */
  name: string;
  /** "Greensboro" — the town, never a street. */
  location: string;
  /** What they came to you about. Keeps it concrete. */
  context?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  // Example of the shape — delete this comment and add real entries:
  // {
  //   quote:
  //     "He checked my cardiologist against the plan I was about to sign up for. He wasn't in it.",
  //   name: "Linda M.",
  //   location: "Summerfield",
  //   context: "Turning 65",
  // },
];

/**
 * The Google Business Profile summary shown beside the reviews. Leave null
 * until the profile exists; copy the rating and count exactly as Google shows
 * them and update them when they change.
 */
export const GOOGLE_REVIEWS: { rating: number; count: number; url: string } | null = null;

export function hasTestimonials(): boolean {
  return TESTIMONIALS.length > 0;
}
