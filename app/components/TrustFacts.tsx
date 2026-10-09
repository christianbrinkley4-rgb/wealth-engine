import Link from "next/link";

import { AGENT, GOOGLE_MAPS_PROFILE_URL, hasPublishableNpn } from "@/lib/agent";
import { GOOGLE_REVIEWS } from "@/lib/testimonials";

/**
 * The few facts a careful visitor can check for themselves.
 *
 * Every line renders from a real value or not at all. With no published NPN
 * there is no license lookup link. With no real review count there is no
 * rating, no stars and no number, only a plain link to the Google profile.
 * `compact` drops the sentence the page close already says beside it.
 */
export function TrustFacts({ compact = false }: { compact?: boolean }) {
  const reviews = GOOGLE_REVIEWS;
  const hasReviews = Boolean(reviews && reviews.count > 0 && reviews.rating > 0);

  return (
    <aside className="trust-facts" aria-label="Check for yourself">
      <p>
        <strong>{AGENT.licenseLine}</strong> · licensed in {AGENT.licensedStates.join(", ")}
        {hasPublishableNpn() ? <> · NPN {AGENT.npn}</> : null}
      </p>
      {compact ? null : (
        <p>Questions go to me, not a call center. No cost, and no obligation to enroll or buy.</p>
      )}
      <ul>
        {hasPublishableNpn() ? (
          <li>
            <a
              href="https://www.ncdoi.gov/licensees/insurance-producer-and-adjuster-licensing"
              rel="noopener noreferrer"
            >
              Check my license with the state
            </a>
          </li>
        ) : null}
        <li>
          {hasReviews && reviews ? (
            <a href={reviews.url} rel="noopener noreferrer">
              {reviews.count} Google reviews · {reviews.rating} out of 5
            </a>
          ) : (
            <a href={GOOGLE_MAPS_PROFILE_URL} rel="noopener noreferrer">
              See my Google profile
            </a>
          )}
        </li>
        <li>
          <Link href="/medicare-words">Where my numbers come from</Link>
        </li>
      </ul>
    </aside>
  );
}
