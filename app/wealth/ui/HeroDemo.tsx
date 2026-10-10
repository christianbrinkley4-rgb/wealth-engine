"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { money, startLaterCost } from "@/lib/wealth/math";

import { LiveMoney, SliderField } from "./controls";

const RATE = 7;
const END_AGE = 65;

/** A working slice of the compound interest calculator, right in the hero. */
export function HeroDemo() {
  const [monthly, setMonthly] = useState(200);
  const [age, setAge] = useState(22);

  const result = startLaterCost({
    monthly,
    annualReturn: RATE,
    earlyAge: age,
    lateAge: Math.min(age + 10, END_AGE),
    endAge: END_AGE,
  });

  return (
    <div className="w-panel" data-spot>
      <p className="w-demo-label">
        <span>Try it. Drag a slider.</span>
        <span>Live</span>
      </p>
      <LiveMoney value={result.earlyBalance} className="w-demo-big" />
      <p className="w-stat-sub">
        at {END_AGE}, from {money(monthly)} a month starting at {age}
      </p>
      <div className="w-controls" style={{ marginTop: 18 }}>
        <SliderField
          label="Monthly amount"
          value={monthly}
          min={25}
          max={1000}
          step={25}
          onChange={setMonthly}
          display={money(monthly)}
        />
        <SliderField
          label="Starting age"
          value={age}
          min={18}
          max={45}
          onChange={setAge}
          display={String(age)}
        />
      </div>
      <p className="w-callout">
        Wait 10 years and the same {money(monthly)} a month ends at {money(result.lateBalance)}. That&apos;s{" "}
        {money(result.gap)} less.
      </p>
      <p className="w-assume">
        Illustration at a {RATE}% yearly return, compounded monthly. Not a prediction. Real returns move
        around and can be negative.
      </p>
      <div className="w-btn-row">
        <Link href="/tools/compound-interest" className="w-btn">
          Open the full calculator <ArrowRight size={18} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
