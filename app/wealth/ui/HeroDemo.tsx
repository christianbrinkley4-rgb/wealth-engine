"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { money, startLaterCost } from "@/lib/wealth/math";

import { LiveMoney, SliderField } from "./controls";

const RATE = 7;
const END_AGE = 65;

/** A working slice of the compound interest calculator, right in the hero. */
export function HeroDemo() {
  const [monthly, setMonthly] = useState(200);
  const [age, setAge] = useState(22);
  const touched = useRef(false);

  // The demo plays itself once: the slider sweeps up and back so the number
  // moves before anyone touches it. The first real touch takes over.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now() + 900;
    let frame = 0;
    const tick = (now: number) => {
      if (touched.current) return;
      const t = Math.min(1, Math.max(0, (now - start) / 2200));
      setMonthly(Math.round((200 + Math.sin(t * Math.PI) * 300) / 25) * 25);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const byHand = (setter: (value: number) => void) => (value: number) => {
    touched.current = true;
    setter(value);
  };

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
          onChange={byHand(setMonthly)}
          display={money(monthly)}
        />
        <SliderField
          label="Starting age"
          value={age}
          min={18}
          max={45}
          onChange={byHand(setAge)}
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
        <Link href="/wealth/calculators/compound-interest" className="w-btn">
          Open the full calculator <ArrowRight size={18} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
