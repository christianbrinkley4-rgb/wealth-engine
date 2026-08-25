"use client";

import { Minus, Plus } from "lucide-react";

/**
 * A number you can nudge, type, or drag — in that order of reliability.
 *
 * The calculators asked for age and income with a slider and nothing else. A
 * slider is the least forgiving control there is: it needs a press, a
 * sustained drag and a release inside a few pixels, which is precisely the
 * combination that arthritis, a tremor, or a laptop trackpad makes difficult.
 * The people this site is written for are the people most likely to have at
 * least one of those, and a visitor who cannot land on their real income
 * silently gets a wrong answer rather than an error.
 *
 * So the slider stays for those who like it, and it gets two 48px buttons and
 * a typed entry beside it. Every route sets the same state.
 */

export function StepperField({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  inputWidthClass = "w-40",
}: {
  id: string;
  /** Visible above the control; also names the group for assistive tech. */
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
  /** How the number reads in the field — currency, a plain age, and so on. */
  format: (value: number) => string;
  inputWidthClass?: string;
}) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));

  function commitTyped(raw: string) {
    const digits = raw.replace(/[^0-9]/g, "");
    if (!digits) return;
    onChange(clamp(Number(digits)));
  }

  const buttonClass =
    "inline-flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[var(--color-navy)] text-[var(--color-navy)] transition-colors hover:bg-[rgba(15,34,65,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onChange(clamp(value - step))}
        disabled={value <= min}
        aria-label={`Lower ${label.toLowerCase()}`}
        className={buttonClass}
      >
        <Minus className="size-6" aria-hidden />
      </button>

      <input
        id={id}
        type="text"
        inputMode="numeric"
        aria-label={label}
        value={format(value)}
        onChange={(event) => commitTyped(event.target.value)}
        onBlur={(event) => commitTyped(event.target.value)}
        className={`text-28 h-14 ${inputWidthClass} rounded-xl border border-gray-300 bg-white text-center font-semibold text-[var(--color-navy)] tabular-nums outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-navy)]`}
      />

      <button
        type="button"
        onClick={() => onChange(clamp(value + step))}
        disabled={value >= max}
        aria-label={`Raise ${label.toLowerCase()}`}
        className={buttonClass}
      >
        <Plus className="size-6" aria-hidden />
      </button>
    </div>
  );
}
