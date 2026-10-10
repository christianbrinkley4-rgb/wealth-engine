"use client";

import { useEffect } from "react";

import { LineChart } from "@/app/wealth/ui/charts";
import { LiveBar, LiveMoney, MoneyField, ShareButton, SliderField } from "@/app/wealth/ui/controls";
import { useMarkExplored, usePersistentState, writeStore } from "@/app/wealth/ui/hooks";
import { catchUpMonthly, finalPoint, growthSeries, money, startLaterCost } from "@/lib/wealth/math";
import { COMPOUND_DEFAULTS, END_AGE, normalizeCompoundState, readCompoundQuery } from "./settings";

const KEY = "cbw:compound";

export function CompoundCalculator() {
  useMarkExplored("compound-interest");
  const [saved, setState] = usePersistentState(KEY, COMPOUND_DEFAULTS);
  const state = normalizeCompoundState(saved);
  const set = (patch: Partial<typeof COMPOUND_DEFAULTS>) =>
    setState((previous) => normalizeCompoundState({ ...normalizeCompoundState(previous), ...patch }));

  // New links keep numbers in the browser-only fragment; older queries still open.
  useEffect(() => {
    const shared = readCompoundQuery(new URLSearchParams(window.location.hash.slice(1) || window.location.search));
    if (shared) writeStore(KEY, shared);
  }, []);

  const series = growthSeries({
    start: state.start,
    monthly: state.monthly,
    years: state.years,
    annualReturn: state.rate,
  });
  const end = finalPoint(series);
  const growth = end.balance - end.contributed;
  const growthShare = end.balance > 0 ? Math.round((growth / end.balance) * 100) : 0;

  const lateAge = state.age + state.wait;
  const wait = startLaterCost({
    monthly: state.monthly,
    annualReturn: state.rate,
    earlyAge: state.age,
    lateAge,
    endAge: END_AGE,
  });
  const catchUp = catchUpMonthly(wait.earlyBalance, END_AGE - lateAge, state.rate);
  const span = END_AGE - state.age;
  const lateValues = Array.from({ length: span + 1 }, (_, index) => {
    const offset = index - (lateAge - state.age);
    return offset < 0 ? 0 : wait.late[offset].balance;
  });

  return (
    <>
      <div className="w-calc">
        <div className="w-controls">
          <SliderField
            label="Monthly contribution"
            value={state.monthly}
            min={0}
            max={2000}
            step={25}
            onChange={(monthly) => set({ monthly })}
            display={money(state.monthly)}
          />
          <SliderField
            label="Years"
            value={state.years}
            min={1}
            max={50}
            onChange={(years) => set({ years })}
            display={`${state.years}`}
          />
          <SliderField
            label="Yearly return"
            value={state.rate}
            min={0}
            max={12}
            step={0.5}
            onChange={(rate) => set({ rate })}
            display={`${state.rate}%`}
            hint="You pick the rate. Nobody knows the real one ahead of time."
          />
          <MoneyField label="Starting amount" value={state.start} onChange={(start) => set({ start })} />
        </div>

        <div className="w-panel w-calc-sticky" id="result" style={{ scrollMarginTop: 110 }}>
          <dl className="w-stat-row">
            <div className="w-stat w-stat-hero">
              <dt>After {state.years} years</dt>
              <dd>
                <LiveMoney value={end.balance} />
              </dd>
            </div>
            <div className="w-stat">
              <dt>You put in</dt>
              <dd>
                <LiveMoney value={end.contributed} />
              </dd>
            </div>
            <div className="w-stat">
              <dt>Growth</dt>
              <dd>
                <LiveMoney value={growth} />
              </dd>
            </div>
          </dl>
          <LineChart
            series={[
              { name: "Balance", color: "var(--w-lime)", values: series.map((p) => p.balance), area: true },
              { name: "You put in", color: "#8fa3ff", values: series.map((p) => p.contributed), dashed: true },
            ]}
            xLabel={(index) => `Year ${index}`}
            xTitle="Balance by year."
            describe={`Balance grows to ${money(end.balance)} after ${state.years} years, from ${money(end.contributed)} contributed.`}
          />
          <p className="w-callout">
            {state.rate === 0
              ? "At 0% there's no growth. This is just your deposits stacked up."
              : end.balance === 0
                ? "With $0 deposited, there's no money here to grow."
                : growthShare === 0
                  ? "Growth makes up less than 1% of this balance. Most of it came from your deposits."
                  : `${growthShare}% of that final number is growth. You never deposited it.`}
          </p>
          <p className="w-assume">
            Assumes a steady {state.rate}% a year, compounded monthly, deposits at the end of each month. No
            taxes, fees or inflation. Real returns are uneven and can be negative.
          </p>
          <div className="w-btn-row">
            <ShareButton
              title="Compound interest calculator"
              text={`${money(state.monthly)} a month for ${state.years} years at ${state.rate}% comes to ${money(end.balance)}. Try your own numbers:`}
              path={`/tools/compound-interest#m=${state.monthly}&y=${state.years}&r=${state.rate}&s=${state.start}`}
              label="Share these numbers"
            />
          </div>
        </div>
      </div>

      <LiveBar targetId="result" label={`After ${state.years} years`}>
        <LiveMoney value={end.balance} />
      </LiveBar>

      <section className="w-section" aria-labelledby="wait-title" style={{ paddingBottom: 0 }}>
        <p className="w-eyebrow">The expensive part</p>
        <h2 className="w-h2" id="wait-title">
          Starting at {state.age} vs {lateAge}
        </h2>
        <p className="w-lede" style={{ marginBottom: 26 }}>
          Same {money(state.monthly)} a month. Same {state.rate}%. Both stop at {END_AGE}. The only thing
          that changes is when you start.
        </p>
        <div className="w-calc">
          <div className="w-controls">
            <SliderField
              label="Your age now"
              value={state.age}
              min={16}
              max={50}
              onChange={(age) => set({ age })}
              display={`${state.age}`}
            />
            <SliderField
              label="Years you wait"
              value={state.wait}
              min={1}
              max={Math.min(20, END_AGE - state.age - 1)}
              onChange={(waitYears) => set({ wait: waitYears })}
              display={`${state.wait}`}
            />
            <div className="w-card">
              <h3 className="w-h3">What the wait costs</h3>
              <p style={{ margin: "10px 0 0" }}>
                Waiting means {money(wait.extraDeposited)} less deposited. But the balance ends{" "}
                <strong>{money(wait.gap)}</strong> lower. The other {money(wait.growthLost)} is growth that
                never had time to happen.
              </p>
              <p style={{ margin: "10px 0 0", color: "var(--w-muted)" }}>
                To catch up starting at {lateAge}, it would take about {money(catchUp)} a month instead of{" "}
                {money(state.monthly)}.
              </p>
            </div>
          </div>
          <div className="w-panel">
            <div className="w-versus">
              <div data-win="true">
                <h3>Start at {state.age}</h3>
                <strong>
                  <LiveMoney value={wait.earlyBalance} />
                </strong>
                <p>at {END_AGE}</p>
              </div>
              <div>
                <h3>Start at {lateAge}</h3>
                <strong>
                  <LiveMoney value={wait.lateBalance} />
                </strong>
                <p>at {END_AGE}</p>
              </div>
            </div>
            <LineChart
              series={[
                {
                  name: `Start at ${state.age}`,
                  color: "var(--w-lime)",
                  values: wait.early.map((p) => p.balance),
                  area: true,
                },
                { name: `Start at ${lateAge}`, color: "var(--w-coral)", values: lateValues },
              ]}
              xLabel={(index) => `Age ${state.age + index}`}
              xTitle="Balance by age."
              describe={`Starting at ${state.age} ends at ${money(wait.earlyBalance)}. Starting at ${lateAge} ends at ${money(wait.lateBalance)}.`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
