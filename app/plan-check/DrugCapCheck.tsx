"use client";

import Link from "next/link";
import { useId, useState } from "react";

import {
  PART_D_CAP_2027,
  PART_D_MAX_DEDUCTIBLE_2027,
  checkDrugCap,
  dollars,
  monthName,
} from "@/lib/drugCap";

/**
 * "Will your drugs hit the 2027 cap?" Shown on the plan-check results when
 * someone said their prescriptions changed or cost more. Answer first, no
 * contact details asked, nothing leaves the page.
 */
export function DrugCapCheck() {
  const id = useId();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const result = submitted ? checkDrugCap(value) : null;

  return (
    <div className="pcq-card mt-6" data-drug-cap>
      <p className="text-15 font-semibold tracking-wide text-[var(--honey-700)] uppercase">
        Your prescriptions in 2027
      </p>
      <h3 className="text-24 mt-2 font-semibold">
        Will your drugs hit the {dollars(PART_D_CAP_2027)} cap?
      </h3>
      <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
        In 2027, the most anyone pays out of pocket for covered prescriptions is{" "}
        {dollars(PART_D_CAP_2027)}{" "}for the year (it&apos;s $2,100 in 2026). After that, covered
        drugs cost $0 for the rest of the year.
      </p>
      <form
        className="mt-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <label htmlFor={id} className="text-17 font-semibold">
          About how much do you pay at the pharmacy in a typical month now?
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <span aria-hidden className="text-19 absolute top-1/2 left-4 -translate-y-1/2">
              $
            </span>
            <input
              id={id}
              inputMode="decimal"
              autoComplete="off"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                setSubmitted(false);
              }}
              placeholder="150"
              className="text-19 min-h-14 w-full rounded-xl border-2 border-[var(--color-navy)] bg-white pr-4 pl-9 text-[var(--color-navy)]"
            />
          </div>
          <button
            type="submit"
            className="text-17 inline-flex min-h-14 items-center justify-center rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)]"
          >
            Check
          </button>
        </div>
        <p className="text-15 mt-2 text-[var(--color-ink-muted)]">
          Add up your copays for all your prescriptions. Leave out your monthly plan premium. This
          stays on your screen.
        </p>
      </form>

      {result ? (
        <div
          className="mt-5 rounded-xl border-2 border-[var(--color-navy)] bg-white p-4"
          role="status"
        >
          {result.kind === "invalid" ? (
            <p className="text-17">Type a dollar amount, like 150.</p>
          ) : result.kind === "reaches" ? (
            <p className="text-17 leading-relaxed">
              At that rate you&apos;d pay about <strong>{dollars(result.yearly)}</strong>{" "}a year, so
              the cap would likely kick in. Paying about the same each month, you&apos;d reach{" "}
              {dollars(PART_D_CAP_2027)} around <strong>{monthName(result.month)}</strong>, and
              covered drugs would cost $0 after that. If big pharmacy bills early in the year are
              hard, the{" "}
              <Link
                href="/guides/medicare-prescription-payment-plan"
                className="underline underline-offset-2"
              >
                Medicare Prescription Payment Plan
              </Link>{" "}
              can spread them into monthly bills.
            </p>
          ) : (
            <p className="text-17 leading-relaxed">
              At that rate you&apos;d pay about <strong>{dollars(result.yearly)}</strong> a year,
              under the {dollars(PART_D_CAP_2027)}{" "}cap, so the cap probably won&apos;t come into
              play. For you, what matters more is each plan&apos;s copay for your drugs and its
              deductible, which can be up to {dollars(PART_D_MAX_DEDUCTIBLE_2027)} in 2027.
            </p>
          )}
          {result.kind !== "invalid" ? (
            <p className="text-15 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
              This is a rough check, not a quote. The cap only counts covered drugs (generally the
              ones on your plan&apos;s drug list), and every plan sets its own 2027 copays, so the
              same drugs can cost very different amounts on different plans. A review compares your
              actual prescriptions plan by plan.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
