import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * Site-wide link. Same as next/link, but it does not prefetch routes that
 * scroll into view.
 *
 * Why (Oct 26, 2026): on a throttled phone, every on-screen link's prefetch
 * response was processed on the main thread a few seconds after load. On
 * /aep that was 6 to 7 prefetches (the logo, home, and /aep linking to its
 * own anchors) and 300 to 600 ms of blocking time, right when a visitor
 * starts the quiz. Most visitors land on one page and act there, so speed
 * on the landing page matters more than a head start on the next page.
 *
 * A link that should still prefetch can pass prefetch={true} or "auto".
 * Import this instead of next/link (a test enforces it).
 */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}
