"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * A tiny localStorage store. Nothing in the hub has accounts, so anything a
 * visitor saves lives in their own browser and goes nowhere else.
 *
 * Built on useSyncExternalStore so the server render and the first client
 * render both use the fallback, then the saved value swaps in without a
 * hydration warning.
 */
const cache = new Map<string, unknown>();
const listeners = new Map<string, Set<() => void>>();

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readStore<T>(key: string, fallback: T): T {
  if (cache.has(key)) return cache.get(key) as T;
  let value = fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw !== null) {
      const parsed = JSON.parse(raw) as unknown;
      if (isPlainObject(fallback) && isPlainObject(parsed)) {
        value = { ...fallback, ...parsed } as T;
      } else if (Array.isArray(fallback) === Array.isArray(parsed) && typeof parsed === typeof fallback) {
        value = parsed as T;
      }
    }
  } catch {
    // Private mode or a blocked store: the page still works, it just forgets.
  }
  cache.set(key, value);
  return value;
}

export function writeStore<T>(key: string, value: T) {
  cache.set(key, value);
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Same as above.
  }
  listeners.get(key)?.forEach((listener) => listener());
}

/** `fallback` must be a stable reference: a module-level constant. */
export function usePersistentState<T>(
  key: string,
  fallback: T,
): [T, (next: T | ((previous: T) => T)) => void] {
  const subscribe = useCallback(
    (listener: () => void) => {
      const set = listeners.get(key) ?? new Set();
      listeners.set(key, set);
      set.add(listener);
      return () => {
        set.delete(listener);
      };
    },
    [key],
  );
  const value = useSyncExternalStore(
    subscribe,
    () => readStore(key, fallback),
    () => fallback,
  );
  const set = useCallback(
    (next: T | ((previous: T) => T)) => {
      const previous = readStore(key, fallback);
      writeStore(key, typeof next === "function" ? (next as (p: T) => T)(previous) : next);
    },
    [key, fallback],
  );
  return [value, set];
}

export const EXPLORED_KEY = "cbw:explored";
export const NO_SLUGS: string[] = [];

/** Remembers that this visitor opened a tool, for the progress strip on /wealth. */
export function useMarkExplored(slug: string) {
  useEffect(() => {
    const seen = readStore(EXPLORED_KEY, NO_SLUGS);
    if (!seen.includes(slug)) writeStore(EXPLORED_KEY, [...seen, slug]);
  }, [slug]);
}

/** Eases a displayed number toward its target so results glide instead of snapping. */
export function useTween(target: number, duration = 420): number {
  const [shown, setShown] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    const from = current.current;
    if (from === target) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = reduced ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = from + (target - from) * eased;
      current.current = value;
      setShown(value);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return shown;
}
