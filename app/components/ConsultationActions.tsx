import { ENGINE_BOOKING_URL, isMedicareStartHref } from "@/lib/leadEnginePublic";
import { ArrowRight, Phone } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { AGENT } from "@/lib/agent";
import type { CtaLocation } from "@/lib/analytics";

/** Booking leads when offered; other requests keep their topic and label. */
export function ConsultationActions({
  href = ENGINE_BOOKING_URL,
  label = "Request a free consultation",
  location = "hero",
  onDark = false,
}: {
  href?: string;
  label?: string;
  location?: CtaLocation;
  onDark?: boolean;
}) {
  const isBookingAction = href === ENGINE_BOOKING_URL || isMedicareStartHref(href);
  return (
    <div
      id={location === "hero" ? "page-hero-actions" : undefined}
      className="consultation-actions mt-6 flex flex-wrap gap-3"
    >
      <a
        data-cta-location={location}
        href={AGENT.phoneHref}
        className={`btn${isBookingAction ? (onDark ? " btn-ghost-light" : " btn-outline") : onDark ? " btn-light" : ""}`}
      >
        <Phone size={18} aria-hidden /> <span>Call Christian&apos;s direct line:{" "}<span className="whitespace-nowrap">{AGENT.phone}</span></span>
      </a>
      <TrackedLink
        href={isBookingAction ? ENGINE_BOOKING_URL : href}
        target={isBookingAction ? "_blank" : undefined}
        rel={isBookingAction ? "noopener" : undefined}
        ctaLocation={location}
        className={`btn${isBookingAction ? (onDark ? " btn-light" : "") : onDark ? " btn-ghost-light" : " btn-outline"}`}
      >
        {isBookingAction ? "Book a 45-minute phone review" : label} <ArrowRight size={18} aria-hidden />
      </TrackedLink>
      {isBookingAction && (
        <TrackedLink href={href === ENGINE_BOOKING_URL ? "/start?topic=medicare&quick=1" : href} className="underline">
          Or send a question
        </TrackedLink>
      )}
    </div>
  );
}
