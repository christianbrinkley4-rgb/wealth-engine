/**
 * Real things real clients said. Nothing else goes in this file.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ACTION REQUIRED, this array is empty, and while it is empty the site shows
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
 *   1. Google Business Profile reviews. These do double duty, they are the
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
  /** "Linda M.", first name, last initial. */
  name: string;
  /** "Greensboro", the town, never a street. */
  location: string;
  /** What they came to you about. Keeps it concrete. */
  context?: string;
  /** The specific thing that mattered, in their words. Optional. */
  benefit?: string;
  /** Whole stars, only when the person actually gave a rating. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** A photo they agreed to publish. Leave unset and the card shows an initial. */
  photoSrc?: string;
  /** Verified public review permalink. Required before emitting review markup. */
  sourceUrl?: string;
  datePublished?: string;
}

import { GOOGLE_MAPS_PROFILE_URL } from "@/lib/agent";

export const TESTIMONIALS: Testimonial[] = [
  // Example of the shape, delete this comment and add real entries:
  // {
  //   quote:
  //     "He checked my cardiologist against the plan I was about to sign up for. He wasn't in it.",
  //   name: "Linda M.",
  //   location: "Summerfield",
  //   context: "Turning 65",
  // },
];

/**
 * The Google Business Profile summary shown beside the reviews. Rating and
 * count copied exactly as Google shows them; update when they change.
 * Count corrected 2026-10-24: the Oct 23 GBP pull showed 3 reviews at 5.0
 * stars (Stephen Stein, Nicole Flury, Bernice Brinkley). An Oct 24 sweep
 * reporting 2 was reading the site's own stale copy, not the profile.
 */
export const GOOGLE_REVIEWS: { rating: number; count: number; url: string } | null = {
  rating: 5.0,
  count: 3,
  url: GOOGLE_MAPS_PROFILE_URL,
};

export function hasTestimonials(): boolean {
  return TESTIMONIALS.length > 0;
}

/** Same permissioned reviews the homepage renders, never a guessed Google total. */
export function visibleRatedReviews() {
  return TESTIMONIALS.flatMap((item) =>
    item.rating && item.sourceUrl && item.quote.trim() && item.name.trim()
      ? [
          {
            author: item.name,
            text: item.quote,
            rating: item.rating,
            sourceUrl: item.sourceUrl,
            datePublished: item.datePublished,
          },
        ]
      : [],
  );
}
