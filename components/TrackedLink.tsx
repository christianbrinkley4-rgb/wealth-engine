"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { trackEvent } from "@/app/components/Analytics";
import type { MeasuredEvent } from "@/lib/analytics";

/** A link that reports one declared event when tapped. Carries no other data. */
export function TrackedLink({
  event,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { event: MeasuredEvent }) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event);
        onClick?.(e);
      }}
    />
  );
}
