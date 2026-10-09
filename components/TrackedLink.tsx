"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "@/app/components/Analytics";
import { ctaDetail, type CtaLocation, type EventDetail, type MeasuredEvent } from "@/lib/analytics";

/** Fixed CTA labels only. Other links can preserve their existing event. */
export function TrackedLink({
  event,
  detail,
  ctaLocation = "inline",
  onClick,
  ...props
}: ComponentProps<typeof Link> & {
  event?: MeasuredEvent;
  detail?: EventDetail;
  ctaLocation?: CtaLocation;
}) {
  const cta =
    typeof props.href === "string"
      ? ctaDetail(props.href, detail?.cta_location ?? ctaLocation)
      : undefined;
  return (
    <Link
      {...props}
      data-cta-location={cta?.cta_location ?? detail?.cta_location}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (event) trackEvent(event, detail);
        if (cta && event !== "cta_click") trackEvent("cta_click", cta);
      }}
    />
  );
}
