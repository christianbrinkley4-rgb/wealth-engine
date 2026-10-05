"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A number that counts up when it first comes into view.
 *
 * The server renders the final value, so crawlers, screen readers, and anyone
 * without JavaScript read the real figure. The visible count is decoration:
 * the accessible text is always the finished number.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1400,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  const finished = `${prefix}${value.toFixed(decimals)}${suffix}`;
  const shown = display === null ? finished : `${prefix}${display.toFixed(decimals)}${suffix}`;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{finished}</span>
    </span>
  );
}
