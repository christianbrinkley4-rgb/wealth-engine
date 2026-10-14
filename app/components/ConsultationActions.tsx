import { ArrowRight, Phone } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { AGENT } from "@/lib/agent";
import type { CtaLocation } from "@/lib/analytics";

/** One phone action and one clearly secondary request, for custom page layouts. */
export function ConsultationActions({
  href = "/start?topic=medicare&quick=1",
  label = "Request a free consultation",
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
        href={href}
        ctaLocation={location}
        className={`btn ${onDark ? "btn-ghost-light" : "btn-outline"}`}
      >
        {label} <ArrowRight size={18} aria-hidden />
      </TrackedLink>
    </div>
  );
}
