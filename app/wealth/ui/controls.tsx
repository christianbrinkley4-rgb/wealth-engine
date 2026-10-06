"use client";

import { Check, Minus, Plus, Share2 } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { money } from "@/lib/wealth/math";

import { useTween } from "./hooks";

/** A slider with a big live readout and nudge buttons for precise taps on a phone. */
export function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  /** The formatted value, e.g. "$250" or "7%". */
  display: string;
  hint?: string;
}) {
  const id = useId();
  const clamp = (next: number) => Math.min(max, Math.max(min, Math.round(next / step) * step));
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;

  return (
    <div className="w-slider">
      <div className="w-slider-top">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id} className="w-slider-value">
          {display}
        </output>
      </div>
      <div className="w-slider-row">
        <button
          type="button"
          className="w-nudge"
          aria-label={`Lower ${label}`}
          onClick={() => onChange(clamp(value - step))}
          disabled={value <= min}
        >
          <Minus size={16} aria-hidden />
        </button>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-valuetext={display}
          style={{ "--pct": `${pct}%` } as React.CSSProperties}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <button
          type="button"
          className="w-nudge"
          aria-label={`Raise ${label}`}
          onClick={() => onChange(clamp(value + step))}
          disabled={value >= max}
        >
          <Plus size={16} aria-hidden />
        </button>
      </div>
      {hint ? <p className="w-slider-hint">{hint}</p> : null}
    </div>
  );
}

/** Dollar input. 16px text so iOS does not zoom the page on focus. */
export function MoneyField({
  label,
  value,
  onChange,
  suffix,
  prefix = "$",
  max = 10_000_000,
  compact = false,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  max?: number;
  compact?: boolean;
}) {
  const id = useId();
  return (
    <div className={compact ? "w-field w-field-compact" : "w-field"}>
      <label htmlFor={id}>{label}</label>
      <div className="w-field-box">
        {prefix ? <span aria-hidden>{prefix}</span> : null}
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          value={value === 0 ? "" : String(value)}
          placeholder="0"
          onChange={(event) => {
            const cleaned = event.target.value.replace(/[^0-9.]/g, "");
            const next = Number.parseFloat(cleaned);
            onChange(Number.isFinite(next) ? Math.min(max, next) : 0);
          }}
        />
        {suffix ? <span aria-hidden>{suffix}</span> : null}
      </div>
    </div>
  );
}

/** A dollar figure that glides to its new value. Screen readers get the final number. */
export function LiveMoney({ value, className }: { value: number; className?: string }) {
  const shown = useTween(value);
  return (
    <span className={className}>
      <span aria-hidden>{money(shown)}</span>
      <span className="sr-only">{money(value)}</span>
    </span>
  );
}

/** Native share sheet on a phone, copy-to-clipboard everywhere else. */
export function ShareButton({
  title,
  text,
  path,
  label = "Share",
  className = "w-btn w-btn-ghost",
}: {
  title: string;
  text: string;
  /** Path and query on this site. The origin is added at click time. */
  path: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `${window.location.origin}${path}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Closing the share sheet throws. Nothing to do.
    }
  }

  return (
    <button type="button" className={className} onClick={share}>
      {copied ? <Check size={18} aria-hidden /> : <Share2 size={18} aria-hidden />}
      <span aria-live="polite">{copied ? "Link copied" : label}</span>
    </button>
  );
}

/**
 * Phone only: pins the headline result to the bottom of the screen while the
 * results panel is above or below the fold. Tapping it jumps to the panel.
 */
export function LiveBar({ targetId, label, children }: { targetId: string; label: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), {
      rootMargin: "-120px 0px -80px 0px",
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <a href={`#${targetId}`} className="w-livebar" data-show={show ? "true" : undefined} aria-hidden={!show} tabIndex={show ? 0 : -1}>
      <span>{label}</span>
      <strong>{children}</strong>
    </a>
  );
}

/** Two or three choices as a pill switch. */
export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: ReadonlyArray<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="w-seg" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
