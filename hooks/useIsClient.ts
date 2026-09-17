"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * True only after hydration.
 *
 * Anything that reads localStorage or the URL during render produces different
 * markup on the server than in the browser, which is a hydration mismatch —
 * /start restores an in-progress quiz from localStorage, so it renders a
 * different screen than the prerendered HTML. Gating on this makes the first
 * client render match the server, then swaps in the real state.
 *
 * useSyncExternalStore rather than a mounted flag in useEffect: same result,
 * without a setState call inside an effect.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
