"use client";

/**
 * Shared client pieces for the /tools calculators. Everything runs in the
 * visitor's browser. No answers leave the device.
 */

import { useState } from "react";

/** A labeled range slider with a big readable value. */
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  display,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  display: string;
  onChange: (value: number) => void;
  hint?: string;
}) {
  return (
    <div className="t-field">
      <label htmlFor={`slider-${label}`}>{label}</label>
      <div className="t-display" aria-live="polite">
        {display}
      </div>
      <input
        id={`slider-${label}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {hint ? <p className="t-hint">{hint}</p> : null}
    </div>
  );
}

/** A labeled dollar amount input. */
export function MoneyField({
  label,
  value,
  onChange,
  hint,
  min = 0,
  max,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className="t-field">
      <label htmlFor={`money-${label}`}>{label}</label>
      <div className="t-money">
        <span aria-hidden>$</span>
        <input
          id={`money-${label}`}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => {
            const next = Number(event.target.value);
            onChange(Number.isFinite(next) ? next : 0);
          }}
        />
      </div>
      {hint ? <p className="t-hint">{hint}</p> : null}
    </div>
  );
}

/** A labeled percent input. */
export function PercentField({
  label,
  value,
  onChange,
  hint,
  min = 0,
  max = 100,
  step = 0.1,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="t-field">
      <label htmlFor={`pct-${label}`}>{label}</label>
      <div className="t-money">
        <input
          id={`pct-${label}`}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => {
            const next = Number(event.target.value);
            onChange(Number.isFinite(next) ? next : 0);
          }}
        />
        <span aria-hidden>%</span>
      </div>
      {hint ? <p className="t-hint">{hint}</p> : null}
    </div>
  );
}

/** Two-option segmented control (e.g. single vs joint). */
export function ChoiceField<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="t-field">
      <span id={`choice-${label}`} role="presentation" style={{ fontWeight: 600, fontSize: "0.9444rem" }}>
        {label}
      </span>
      <div className="t-radio-row" role="group" aria-labelledby={`choice-${label}`}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className="t-radio"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** A dropdown select. */
export function SelectField<T extends string>({
  label,
  options,
  value,
  onChange,
  hint,
}: {
  label: string;
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
  hint?: string;
}) {
  return (
    <div className="t-field">
      <label htmlFor={`select-${label}`}>{label}</label>
      <select
        id={`select-${label}`}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <p className="t-hint">{hint}</p> : null}
    </div>
  );
}

/** One stat in a results panel. */
export function Stat({
  label,
  value,
  hero = false,
  sub,
}: {
  label: string;
  value: string;
  hero?: boolean;
  sub?: string;
}) {
  return (
    <div className={`t-stat${hero ? " t-stat-hero" : ""}`}>
      <dt>{label}</dt>
      <dd>
        {value}
        {sub ? (
          <span style={{ display: "block", fontSize: "0.8333rem", fontWeight: 400, marginTop: "0.25rem", opacity: 0.85 }}>
            {sub}
          </span>
        ) : null}
      </dd>
    </div>
  );
}

/**
 * Copies a text summary of the visitor's numbers. Falls back to a prompt
 * when the clipboard API is unavailable.
 */
export function CopyNumbersButton({ summary }: { summary: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy your numbers:", summary);
    }
  };

  return (
    <button type="button" className="btn btn-outline t-copy-btn" onClick={copy}>
      {copied ? "Copied" : "Copy my numbers"}
    </button>
  );
}

/** Small assumption callout box. */
export function AssumptionBox({ children }: { children: React.ReactNode }) {
  return <div className="t-assume">{children}</div>;
}

/**
 * Minimal accessible line chart drawn as SVG. Two series max, one solid
 * (balance) and one dashed (what you put in).
 */
export function MiniChart({
  series,
  labels,
  ariaTitle,
}: {
  series: Array<{ name: string; color: string; dashed?: boolean; values: number[] }>;
  labels: { start: string; mid: string; end: string };
  ariaTitle: string;
}) {
  const width = 640;
  const height = 260;
  const padLeft = 8;
  const padRight = 8;
  const padTop = 16;
  const padBottom = 30;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;

  const max = Math.max(1, ...series.flatMap((s) => s.values));
  const point = (seriesIndex: number, valueIndex: number, values: number[]) => {
    const x = padLeft + (valueIndex / Math.max(1, values.length - 1)) * innerW;
    const y = padTop + innerH - (values[valueIndex] / max) * innerH;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };

  return (
    <figure style={{ margin: 0 }}>
      <svg
        className="t-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaTitle}
      >
        <title>{ariaTitle}</title>
        {[0.25, 0.5, 0.75].map((fraction) => (
          <line
            key={fraction}
            x1={padLeft}
            x2={width - padRight}
            y1={padTop + innerH * fraction}
            y2={padTop + innerH * fraction}
            stroke="#e4e8e1"
            strokeWidth={1}
          />
        ))}
        {series.map((s, seriesIndex) => (
          <polyline
            key={s.name}
            points={s.values.map((value, valueIndex) => point(seriesIndex, valueIndex, s.values)).join(" ")}
            fill="none"
            stroke={s.color}
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray={s.dashed ? "8 6" : undefined}
          />
        ))}
        <text x={padLeft} y={height - 10} fontSize={13} fill="#46534f">
          {labels.start}
        </text>
        <text x={width / 2} y={height - 10} fontSize={13} fill="#46534f" textAnchor="middle">
          {labels.mid}
        </text>
        <text x={width - padRight} y={height - 10} fontSize={13} fill="#46534f" textAnchor="end">
          {labels.end}
        </text>
      </svg>
      <figcaption className="t-legend" style={{ marginTop: "0.6rem" }}>
        {series.map((s) => (
          <span key={s.name}>
            <i style={{ background: s.color }} aria-hidden />
            {s.name}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
