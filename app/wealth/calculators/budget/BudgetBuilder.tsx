"use client";

import { Download, RotateCcw } from "lucide-react";

import { Donut } from "@/app/wealth/ui/charts";
import { LiveBar, LiveMoney, MoneyField, Segmented, ShareButton, SliderField } from "@/app/wealth/ui/controls";
import { useMarkExplored, usePersistentState } from "@/app/wealth/ui/hooks";
import {
  type BudgetKey,
  budgetDollars,
  CLASSIC_SPLIT,
  money,
  rebalance,
} from "@/lib/wealth/math";

const KEY = "cbw:budget";
const DEFAULTS = { income: 3000, period: "month" as "month" | "paycheck", ...CLASSIC_SPLIT };

const BUCKETS: ReadonlyArray<{ key: BudgetKey; label: string; examples: string; color: string }> = [
  {
    key: "needs",
    label: "Needs",
    examples: "Rent, utilities, groceries, gas, insurance, minimum debt payments",
    color: "#5a72ff",
  },
  {
    key: "wants",
    label: "Wants",
    examples: "Eating out, subscriptions, trips, upgrades",
    color: "#ff6a45",
  },
  {
    key: "savings",
    label: "Savings and extra debt",
    examples: "Emergency fund, retirement, paying more than the minimum",
    color: "#c8f73c",
  },
];

function verdict(split: Record<BudgetKey, number>): string {
  if (split.needs === 50 && split.wants === 30 && split.savings === 20) {
    return "That's the classic 50/30/20. Now drag it until it matches your real life.";
  }
  if (split.savings === 0) return "Nothing is going to savings. Even 5% builds the habit.";
  if (split.needs > 65)
    return "Needs are taking most of it. High rent does that. Small wins on the big bills matter most here.";
  if (split.savings >= 30) return "30% or more to savings and debt. That's aggressive. Make sure it's a pace you can keep.";
  if (split.wants > 40) return "Wants are over 40%. Nothing wrong with fun, as long as it's a choice and not a surprise.";
  return "This is your split. The goal isn't perfect. It's knowing your three numbers.";
}

export function BudgetBuilder() {
  useMarkExplored("budget");
  const [state, setState] = usePersistentState(KEY, DEFAULTS);
  const split = { needs: state.needs, wants: state.wants, savings: state.savings };
  const monthlyIncome = state.period === "paycheck" ? (state.income * 26) / 12 : state.income;
  const dollars = budgetDollars(monthlyIncome, split);

  function downloadPlan() {
    const rows = [
      ["Bucket", "Share", "Per month", "Per year"],
      ...BUCKETS.map((bucket) => [
        bucket.label,
        `${split[bucket.key]}%`,
        Math.round(dollars[bucket.key]),
        Math.round(dollars[bucket.key] * 12),
      ]),
      ["Total take-home", "100%", Math.round(monthlyIncome), Math.round(monthlyIncome * 12)],
      [],
      ["Made with the budget builder at christianbrinkleync.com/wealth. Education only, not advice."],
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-budget-plan.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="w-calc">
      <div className="w-controls">
        <div className="w-controls" style={{ gap: 12 }}>
          <MoneyField
            label={state.period === "paycheck" ? "Take-home pay per paycheck" : "Take-home pay per month"}
            value={state.income}
            max={1_000_000}
            onChange={(income) => setState((previous) => ({ ...previous, income }))}
          />
          <Segmented
            label="How you entered your pay"
            value={state.period}
            options={[
              { value: "month", label: "Monthly" },
              { value: "paycheck", label: "Every 2 weeks" },
            ]}
            onChange={(period) => setState((previous) => ({ ...previous, period }))}
          />
        </div>

        {BUCKETS.map((bucket) => (
          <div className="w-bucket" data-key={bucket.key} key={bucket.key}>
            <SliderField
              label={bucket.label}
              value={split[bucket.key]}
              min={0}
              max={100}
              onChange={(value) => setState((previous) => ({ ...previous, ...rebalance(split, bucket.key, value) }))}
              display={`${split[bucket.key]}%`}
            />
            <p className="w-bucket-money">
              <span>{bucket.examples}</span>
              <b>{money(dollars[bucket.key])}</b>
            </p>
          </div>
        ))}

        <button
          type="button"
          className="w-quiz-back"
          style={{ marginTop: 0, justifySelf: "start" }}
          onClick={() => setState((previous) => ({ ...previous, ...CLASSIC_SPLIT }))}
        >
          <RotateCcw size={15} aria-hidden style={{ display: "inline", marginRight: 6 }} />
          Reset to 50/30/20
        </button>
      </div>

      <LiveBar targetId="result" label={`${split.needs} / ${split.wants} / ${split.savings}`}>
        {money(dollars.savings)} saved
      </LiveBar>
      <div className="w-panel w-calc-sticky" id="result" style={{ scrollMarginTop: 110 }}>
        <p className="w-eyebrow">Your month</p>
        <Donut
          slices={BUCKETS.map((bucket) => ({
            label: bucket.label,
            value: split[bucket.key],
            color: bucket.color,
          }))}
          centerTop={money(monthlyIncome)}
          centerBottom="take-home / mo"
        />
        <ul className="w-legend">
          {BUCKETS.map((bucket) => (
            <li key={bucket.key}>
              <i style={{ background: bucket.color }} aria-hidden />
              <span>
                {bucket.label}
                <small>
                  {split[bucket.key]}% · {money(dollars[bucket.key] * 12)} a year
                </small>
              </span>
              <b>
                <LiveMoney value={dollars[bucket.key]} />
              </b>
            </li>
          ))}
        </ul>
        <p className="w-callout">{verdict(split)}</p>
        {state.period === "paycheck" ? (
          <p className="w-assume">
            Every two weeks is 26 paychecks a year, so an average month is 2.17 of them.
          </p>
        ) : null}
        <div className="w-btn-row">
          <button type="button" className="w-btn" onClick={downloadPlan}>
            <Download size={18} aria-hidden /> Download my plan
          </button>
          <ShareButton
            title="50/30/20 budget builder"
            text={`My split is ${split.needs}/${split.wants}/${split.savings}. Build yours:`}
            path="/wealth/calculators/budget"
          />
        </div>
      </div>
    </div>
  );
}
