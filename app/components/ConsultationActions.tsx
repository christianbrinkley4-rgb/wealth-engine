import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import { ArrowRight, Phone } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { AGENT } from "@/lib/agent";
import type { CtaLocation } from "@/lib/analytics";

/** One phone action and one clearly secondary request, for custom page layouts. */
export function ConsultationActions({
  href = ENGINE_BOOKING_URL,
  label = "Book a 45-minute phone review",
  location = "hero",
  onDark = false,
}: {
  href?: string;
  label?: string;
  location?: CtaLocation;
  onDark?: boolean;
}) {
  return (
    <div
      id={location === "hero" ? "page-hero-actions" : undefined}
      className="consultation-actions mt-6 flex flex-wrap gap-3"
    >
      <a
        data-cta-location={location}
        href={AGENT.phoneHref}
        className={`btn${onDark ? " btn-light" : ""}`}
      >
        <Phone size={18} aria-hidden /> Call Christian&apos;s direct line: {AGENT.phone}
      </a>
      <TrackedLink
        href={href.split("?")[0] === "/start" ? ENGINE_BOOKING_URL : href}
        target={
          href === ENGINE_BOOKING_URL || href.split("?")[0] === "/start" ? "_blank" : undefined
        }
        rel={
          href === ENGINE_BOOKING_URL || href.split("?")[0] === "/start" ? "noopener" : undefined
        }
        ctaLocation={location}
        className={`btn ${onDark ? "btn-ghost-light" : "btn-outline"}`}
      >
        {label} <ArrowRight size={18} aria-hidden />
      </TrackedLink>
      {(href === ENGINE_BOOKING_URL || href.split("?")[0] === "/start") && (
        <TrackedLink href="/start" className="underline">
          Or send a question
        </TrackedLink>
      )}
    </div>
  );
}
