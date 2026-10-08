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

/** Restore known fields only; damaged browser data must not become component state. */
function restoreShape(saved: unknown, fallback: unknown): unknown {
  if (Array.isArray(fallback)) {
    if (!Array.isArray(saved)) return fallback;
    // The empty array in this store is the list of explored tool slugs.
    if (!fallback.length) return saved.filter((item) => typeof item === "string");
    return saved.filter((item) => isPlainObject(item) === isPlainObject(fallback[0]))
      .map((item) => restoreShape(item, fallback[0]));
  }
  if (isPlainObject(fallback)) {
    if (!isPlainObject(saved)) return fallback;
    return Object.fromEntries(Object.entries(fallback).map(([field, defaultValue]) => [
      field, restoreShape(saved[field], defaultValue),
    ]));
  }
  if (typeof saved !== typeof fallback || saved === null) return fallback;
  if (typeof saved === "number" && !Number.isFinite(saved)) return fallback;
  return saved;
}

export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  if (cache.has(key)) return cache.get(key) as T;
  let value = fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw !== null) {
      const parsed = JSON.parse(raw) as unknown;
      value = restoreShape(parsed, fallback) as T;
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
      const onStorage = (event: StorageEvent) => {
        if (event.storageArea !== window.localStorage || (event.key !== key && event.key !== null)) return;
        cache.delete(key);
        listener();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        set.delete(listener);
        window.removeEventListener("storage", onStorage);
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
      const t = reduced || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        ? 1 : Math.min(1, (now - start) / duration);
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
