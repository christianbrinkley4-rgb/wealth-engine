import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import { TrackedLink as Link } from "@/components/TrackedLink";

import { aepWindow, aepWindowMessage } from "@/lib/aepWindow";

/**
 * Deadline for the fall window. The date is computed on the server from
 * Eastern time so the sentence matches the calendar, not the visitor's clock.
 */
export function AepCountdown({
  now = new Date(),
  audience = "aep",
}: {
  now?: Date;
  audience?: "aep" | "turning65";
}) {
  const state = aepWindow(now);
  const message = aepWindowMessage(state);
  return (
    <section className="aep-countdown" aria-label="Annual Enrollment deadline">
      <div className="measure-prose app-shell max-w-3xl">
        <p className="aep-countdown-kicker">October 15 to December 7</p>
        <p className="aep-countdown-message">{message}</p>
        {audience === "turning65" ? (
          <p className="aep-countdown-note">
            That deadline is for people already on Medicare. Turning 65 uses a separate
            seven-month window around your birthday.
          </p>
        ) : null}
        <p className="aep-countdown-action">
          <Link ctaLocation="inline" href="/aep-quiz">
            Take the 2-minute quiz
          </Link>
          <span aria-hidden> · </span>
          <Link ctaLocation="inline" href={ENGINE_BOOKING_URL} target="_blank" rel="noopener">
            Book a 45-minute phone review
          </Link>
        </p>
      </div>
    </section>
  );
}
