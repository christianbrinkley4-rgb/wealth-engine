"use client";

import Link from "next/link";
import { useState } from "react";

import { AGENT } from "@/lib/agent";
import {
  checkRetirement,
  type CheckerInputs,
  type Coverage,
  type Finding,
  type MedicareStatus,
} from "@/lib/retirementChecker";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const THIS_YEAR = new Date().getFullYear();
const BIRTH_YEARS = Array.from({ length: 31 }, (_, i) => THIS_YEAR - 55 - i);
const START_YEARS = Array.from({ length: 4 }, (_, i) => THIS_YEAR - i);

const LABEL = "text-17 block font-semibold";
const SELECT = "text-17 mt-2 w-full rounded-lg border-2 border-[var(--color-navy)] bg-white p-3";
const INPUT = SELECT;

function Choice<T extends string>({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: T;
  onChange: (v: T) => void;
  options: Array<{ value: T; label: string }>;
}) {
  return (
    <div className="mt-2 grid gap-2">
      {options.map((o) => (
        <label
          key={o.value}
          className={`text-17 flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 ${
            value === o.value
              ? "border-[var(--color-navy)] bg-[var(--color-paper)] font-semibold"
              : "border-gray-300 bg-white"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="h-5 w-5 shrink-0"
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}

const YES_NO = [
  { value: "no" as const, label: "No" },
  { value: "yes" as const, label: "Yes" },
];

export function CheckerForm() {
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthYear, setBirthYear] = useState(THIS_YEAR - 65);
  const [medicare, setMedicare] = useState<MedicareStatus>("none");
  const [bMonth, setBMonth] = useState(1);
  const [bYear, setBYear] = useState(THIS_YEAR);
  const [coverage, setCoverage] = useState<Coverage>("employer_active");
  const [employerSize, setEmployerSize] = useState<"under_20" | "20_plus" | "unknown">("20_plus");
  const [hsa, setHsa] = useState<"yes" | "no">("no");
  const [ss, setSs] = useState<"yes" | "no">("no");
  const [filing, setFiling] = useState<"individual" | "married_jointly">("individual");
  const [income, setIncome] = useState("");
  const [roth, setRoth] = useState("");
  const [wages, setWages] = useState("");
  const [irmaa, setIrmaa] = useState<"yes" | "no">("no");
  const [lifeChange, setLifeChange] = useState<"yes" | "no">("no");
  const [results, setResults] = useState<Finding[] | null>(null);

  function run(event: React.FormEvent) {
    event.preventDefault();
    const num = (s: string) => {
      const n = Number(s.replace(/[$,\s]/g, ""));
      return Number.isFinite(n) && n > 0 ? n : null;
    };
    const inputs: CheckerInputs = {
      birthMonth,
      birthYear,
      medicare,
      partBStart: medicare === "part_a_and_b" ? { month: bMonth, year: bYear } : null,
      coverage,
      employerSize: coverage === "employer_active" ? employerSize : "unknown",
      contributesToHsa: hsa === "yes",
      collectsSocialSecurity: ss === "yes",
      filingStatus: filing,
      incomeThisYear: num(income),
      rothConversion: num(roth),
      recentLifeChange: lifeChange === "yes",
      payingIrmaa: irmaa === "yes",
      wagesThisYear: ss === "yes" ? num(wages) : null,
    };
    setResults(checkRetirement(inputs));
    window.setTimeout(() => document.getElementById("checker-results")?.focus(), 0);
  }

  return (
    <form onSubmit={run} className="mt-6 space-y-8" aria-describedby="checker-privacy">
      <p id="checker-privacy" className="text-16 text-[var(--color-ink-muted)]">
        Your answers stay on this page. Nothing is saved or sent anywhere.
      </p>

      <fieldset>
        <legend className={LABEL}>When were you born?</legend>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <select
            aria-label="Birth month"
            className={SELECT}
            value={birthMonth}
            onChange={(e) => setBirthMonth(Number(e.target.value))}
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
          <select
            aria-label="Birth year"
            className={SELECT}
            value={birthYear}
            onChange={(e) => setBirthYear(Number(e.target.value))}
          >
            {BIRTH_YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset>
        <legend className={LABEL}>Do you have Medicare yet?</legend>
        <Choice
          name="medicare"
          value={medicare}
          onChange={setMedicare}
          options={[
            { value: "none", label: "Not yet" },
            { value: "part_a_only", label: "Part A only" },
            { value: "part_a_and_b", label: "Part A and Part B" },
          ]}
        />
      </fieldset>

      {medicare === "part_a_and_b" && (
        <fieldset>
          <legend className={LABEL}>When did Part B start?</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <select
              aria-label="Part B start month"
              className={SELECT}
              value={bMonth}
              onChange={(e) => setBMonth(Number(e.target.value))}
            >
              {MONTHS.map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
            <select
              aria-label="Part B start year"
              className={SELECT}
              value={bYear}
              onChange={(e) => setBYear(Number(e.target.value))}
            >
              {START_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className={LABEL}>What other health coverage do you have?</legend>
        <Choice
          name="coverage"
          value={coverage}
          onChange={setCoverage}
          options={[
            { value: "employer_active", label: "Through my or my spouse's current job" },
            { value: "cobra", label: "COBRA from a past job" },
            { value: "retiree", label: "Retiree coverage from a past employer" },
            { value: "marketplace", label: "A Marketplace (ACA) plan" },
            { value: "medicare_only", label: "Just Medicare" },
            { value: "none", label: "None" },
          ]}
        />
      </fieldset>

      {coverage === "employer_active" && (
        <fieldset>
          <legend className={LABEL}>How many employees does that employer have?</legend>
          <Choice
            name="employerSize"
            value={employerSize}
            onChange={setEmployerSize}
            options={[
              { value: "20_plus", label: "20 or more" },
              { value: "under_20", label: "Fewer than 20" },
              { value: "unknown", label: "Not sure" },
            ]}
          />
        </fieldset>
      )}

      <fieldset>
        <legend className={LABEL}>Are you (or your employer) putting money into an HSA?</legend>
        <Choice name="hsa" value={hsa} onChange={setHsa} options={YES_NO} />
      </fieldset>

      <fieldset>
        <legend className={LABEL}>Are you collecting Social Security?</legend>
        <Choice name="ss" value={ss} onChange={setSs} options={YES_NO} />
      </fieldset>

      {ss === "yes" && (
        <fieldset>
          <legend className={LABEL}>
            Are you still working? Expected earnings this year (optional)
          </legend>
          <input
            id="checker-wages"
            aria-label="Expected earnings from work this year"
            inputMode="numeric"
            placeholder="$30,000"
            className={INPUT}
            value={wages}
            onChange={(e) => setWages(e.target.value)}
          />
        </fieldset>
      )}

      <fieldset>
        <legend className={LABEL}>How do you file taxes?</legend>
        <Choice
          name="filing"
          value={filing}
          onChange={setFiling}
          options={[
            { value: "individual", label: "Single" },
            { value: "married_jointly", label: "Married, filing jointly" },
          ]}
        />
      </fieldset>

      <fieldset>
        <legend className={LABEL}>Thinking about a Roth conversion this year? (optional)</legend>
        <label
          className="text-16 mt-2 block text-[var(--color-ink-muted)]"
          htmlFor="checker-income"
        >
          Your estimated income this year, before any conversion
        </label>
        <input
          id="checker-income"
          inputMode="numeric"
          placeholder="$85,000"
          className={INPUT}
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <label className="text-16 mt-3 block text-[var(--color-ink-muted)]" htmlFor="checker-roth">
          Amount you might convert
        </label>
        <input
          id="checker-roth"
          inputMode="numeric"
          placeholder="$40,000"
          className={INPUT}
          value={roth}
          onChange={(e) => setRoth(e.target.value)}
        />
      </fieldset>

      <fieldset>
        <legend className={LABEL}>
          Are you paying an extra income-based Medicare charge (IRMAA)?
        </legend>
        <Choice name="irmaa" value={irmaa} onChange={setIrmaa} options={YES_NO} />
      </fieldset>

      {irmaa === "yes" && (
        <fieldset>
          <legend className={LABEL}>
            In the last two years, did you retire, lose a spouse, divorce, or have your income drop
            for a similar reason?
          </legend>
          <Choice name="lifeChange" value={lifeChange} onChange={setLifeChange} options={YES_NO} />
        </fieldset>
      )}

      <button
        type="submit"
        className="text-19 w-full rounded-lg bg-[var(--color-navy)] px-5 py-4 font-semibold text-white"
      >
        Check my situation
      </button>

      {results && (
        <div id="checker-results" tabIndex={-1} aria-live="polite" className="outline-none">
          <h2 className="text-28 font-semibold">
            {results.length === 0
              ? "Nothing jumped out"
              : `${results.length} thing${results.length === 1 ? "" : "s"} to look at`}
          </h2>
          {results.length === 0 && (
            <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
              Based on your answers, none of the common traps apply right now. That&apos;s not a
              full review, so it&apos;s still worth checking your plan each fall.
            </p>
          )}
          <div className="mt-4 space-y-4">
            {results.map((f) => (
              <div
                key={f.id}
                className={`rounded-xl border-2 p-5 ${f.severity === "act_now" ? "border-[#9a3412] bg-[#fff7ed]" : "border-[var(--color-navy)] bg-white"}`}
              >
                <p className="text-15 font-semibold tracking-wide uppercase">
                  {f.severity === "act_now" ? "Act soon" : "Worth checking"}
                </p>
                <h3 className="text-19 mt-1 font-semibold">{f.title}</h3>
                <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {f.detail}
                </p>
                <p className="text-17 mt-2 leading-relaxed">
                  <strong>What to do:</strong> {f.action}
                </p>
                <p className="text-16 mt-3">
                  <Link href={f.learnMore.href} className="underline underline-offset-2">
                    {f.learnMore.label}
                  </Link>
                  {" · "}
                  <a
                    href={f.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    Source: {f.source.label}
                  </a>
                </p>
              </div>
            ))}
          </div>
          <p className="text-17 mt-6 leading-relaxed">
            Want a second set of eyes? I&apos;m a licensed agent in Greensboro and I help North
            Carolina households with exactly these questions. Call or text{" "}
            <a href={AGENT.phoneHref} className="font-semibold underline">
              {AGENT.phone}
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}
