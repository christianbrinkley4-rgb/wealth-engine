import { Star } from "lucide-react";
import Link from "@/components/Link";

import { TestimonialCarousel } from "@/components/story/TestimonialCarousel";
import { GOOGLE_REVIEWS, TESTIMONIALS } from "@/lib/testimonials";

/**
 * Renders nothing until there is something true to render.
 *
 * Invented praise on a licensed agent's site is both a regulatory problem and
 * the exact thing this site promises not to do. So the section stays hidden
 * while lib/testimonials.ts is empty, and appears the moment a real quote is
 * added. The Google summary shows only once its real numbers are filled in.
 *
 * Reviewer names below are the verified 5-star reviewers from the Google
 * Business Profile. No quotes are shown because the review text was not
 * provided; the names link to the live profile where the full reviews live.
 */
const GOOGLE_REVIEWERS = [{ name: "Nicole Flury" }, { name: "Bernice Brinkley" }] as const;

function GoogleReviewerList({ url }: { url: string }) {
  return (
    <ul className="home-reviews-names">
      {GOOGLE_REVIEWERS.map((reviewer) => (
        <li key={reviewer.name}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <span className="home-google-stars" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={15} fill="currentColor" strokeWidth={0} aria-hidden />
              ))}
            </span>
            <span className="home-reviews-name">{reviewer.name}</span>
            <span className="home-reviews-source">Google review</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Testimonials() {
  if (TESTIMONIALS.length === 0 && !GOOGLE_REVIEWS) return null;

  return (
    <section className="home-section home-reviews" aria-labelledby="reviews-heading">
      <div className="personal-shell">
        <div className="home-heading-row">
          <div>
            <p className="home-eyebrow">From neighbors I’ve helped</p>
            <h2 id="reviews-heading">What people around the Triad say.</h2>
          </div>
          {GOOGLE_REVIEWS ? (
            <a
              className="home-google"
              href={GOOGLE_REVIEWS.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="home-google-rating">{GOOGLE_REVIEWS.rating.toFixed(1)}</span>
              <span className="home-google-meta">
                <span className="home-google-stars" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={17} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <span>
                  {GOOGLE_REVIEWS.count} {GOOGLE_REVIEWS.count === 1 ? "review" : "reviews"} on
                  Google
                </span>
              </span>
            </a>
          ) : null}
        </div>

        {TESTIMONIALS.length > 0 ? (
          <TestimonialCarousel items={TESTIMONIALS} />
        ) : GOOGLE_REVIEWS ? (
          <GoogleReviewerList url={GOOGLE_REVIEWS.url} />
        ) : null}
        <p className="home-reviews-ask">
          Worked with me?{" "}
          <Link href="/review">Leave a review</Link>
        </p>
      </div>
    </section>
  );
}
