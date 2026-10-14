"use client";

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
  reviewHref,
  reviewLabel,
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
      aria-label="Call or get a free review"
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
      <Link ctaLocation="sticky_bar" href={reviewHref} className="scta-second">
        {reviewLabel}
      </Link>
      <button type="button" className="scta-dismiss" onClick={onDismiss} aria-label="Dismiss">
        <X size={16} aria-hidden />
      </button>
    </div>
  );
}
