"use client";

import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import { usePathname } from "next/navigation";
import { Phone, X } from "lucide-react";

import { TrackedLink as Link } from "@/components/TrackedLink";

/**
 * Mobile bar: booking is primary and the phone number is secondary.
 * The parent decides when it is hidden, tucked, or dismissed.
 */
export function StickyCTA({
  hidden,
  tucked,
  callHref,
  callLabel,
  onDismiss,
}: {
  hidden: boolean;
  tucked: boolean;
  callHref: string;
  callLabel: string;
  onDismiss: () => void;
}) {
  const pathname = usePathname();
  if (hidden) return null;

  return (
    <div
      className="scta"
      data-tucked={tucked ? "true" : undefined}
      role="region"
      aria-label="Call or book a phone review"
      inert={tucked}
    >
      <Link
        ctaLocation="sticky_bar"
        href={pathname === "/aep" ? ENGINE_BOOKING_URL : "/aep"}
        target={pathname === "/aep" ? "_blank" : undefined}
        rel="noopener"
        className="scta-call"
      >
        {/* Short on purpose: at 375px "Book a phone review" broke into three
            lines beside the full phone number. It books the 45-minute call. */}
        Book a call
      </Link>
      <a
        data-cta-location="sticky_bar"
        href={callHref}
        className="scta-second"
        aria-label={`Call Christian's direct line: ${callLabel}`}
      >
        <Phone size={20} aria-hidden />
        {callLabel}
      </a>
      <button type="button" className="scta-dismiss" onClick={onDismiss} aria-label="Dismiss">
        <X size={16} aria-hidden />
      </button>
    </div>
  );
}
