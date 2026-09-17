import { Star } from "lucide-react";

import { GOOGLE_REVIEWS, TESTIMONIALS } from "@/lib/testimonials";

/**
 * Renders nothing until there is something true to render.
 *
 * Invented praise on a licensed agent's site is both a regulatory problem and
 * the exact thing this site promises not to do. So the section stays hidden
 * while lib/testimonials.ts is empty, and appears the moment a real quote is
 * added. The Google summary shows only once its real numbers are filled in.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

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

        <ul className="home-quotes">
          {TESTIMONIALS.map((item) => (
            <li key={`${item.name}-${item.quote.slice(0, 24)}`}>
              <figure>
                <span className="home-quote-mark" aria-hidden>
                  “
                </span>
                <blockquote>{item.quote}</blockquote>
                <figcaption>
                  <strong>{item.name}</strong> · {item.location}
                  {item.context ? ` · ${item.context}` : ""}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
