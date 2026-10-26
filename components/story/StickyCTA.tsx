"use client";

import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import { Phone, X } from "lucide-react";

import { TrackedLink as Link } from "@/components/TrackedLink";

/**
 * Mobile bar: the phone number and one free-review link.
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
  reviewHref: string;
  reviewLabel: string;
  onDismiss: () => void;
}) {
  if (hidden) return null;

  return (
    <div
      className="scta"
      data-tucked={tucked ? "true" : undefined}
      role="region"
      aria-label="Call or book a phone review"
      inert={tucked}
    >
      <a
        data-cta-location="sticky_bar"
        href={callHref}
        className="scta-call"
        aria-label={`Call Christian's direct line: ${callLabel}`}
      >
        <Phone size={20} aria-hidden />
        {callLabel}
      </a>
      <Link
        ctaLocation="sticky_bar"
        href={ENGINE_BOOKING_URL}
        target="_blank"
        rel="noopener"
        className="scta-second"
      >
        Book a phone review
      </Link>
      <button type="button" className="scta-dismiss" onClick={onDismiss} aria-label="Dismiss">
        <X size={16} aria-hidden />
      </button>
    </div>
  );
}
