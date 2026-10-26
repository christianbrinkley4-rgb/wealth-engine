"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/** No bot-check download until a visitor reaches or focuses the form. */
export function useDeferredFormCheck() {
  const formRef = useRef<HTMLFormElement>(null);
  const [active, setActive] = useState(false);
  const activate = useCallback(() => setActive(true), []);
  useEffect(() => {
    const form = formRef.current;
    if (!form || active) return;
    const onFocus = () => activate();
    form.addEventListener("focusin", onFocus);
    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          activate();
          observer?.disconnect();
        }
      });
      observer.observe(form);
    }
    return () => {
      form.removeEventListener("focusin", onFocus);
      observer?.disconnect();
    };
  }, [active, activate]);
  return { formRef, active, activate };
}
