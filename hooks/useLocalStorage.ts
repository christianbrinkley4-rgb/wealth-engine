"use client";

import { useCallback, useState } from "react";

type SetValue<T> = T | ((value: T) => T);

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }
      return JSON.parse(item) as T;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        setStoredValue((currentValue) => {
          const valueToStore =
            value instanceof Function ? (value as (val: T) => T)(currentValue) : value;
          try {
            if (typeof window !== "undefined") {
              window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
          } catch {
            // Gracefully fallback to state-only when localStorage is unavailable.
          }
          return valueToStore;
        });
      } catch {
        // Swallow storage errors and keep React state as source of truth.
      }
    },
    [key],
  );

  const clearValue = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Ignore localStorage unavailability.
    }
    setStoredValue(initialValue);
  }, [initialValue, key]);

  return [storedValue, setValue, clearValue] as const;
}
