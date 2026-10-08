"use client";

/**
 * Monthly budget calculator: take-home pay vs spending by category.
 * Leftover (or shortfall) is plain subtraction. Shares are each category
 * divided by take-home pay. Everything runs in the visitor's browser.
 */

import { useState } from "react";

import { money } from "@/lib/wealth/math";

import {
  AssumptionBox,
  CopyNumbersButton,
  MoneyField,
  Stat,
} from "../_components/tool-shared";
import { ShareResultButton } from "../_components/share-card";

const CATEGORIES = [
  { key: "housing", label: "Housing", hint: "Rent or mortgage, plus renter or homeowner insurance." },
  { key: "transport", label: "Transportation", hint: "Car payment, insurance, gas, repairs, bus or train fare." },
  { key: "food", label: "Food", hint: "Groceries, eating out, and coffee runs." },
  { key: "utilities", label: "Utilities", hint: "Electric, water, gas, trash, internet, phone." },
  { key: "insurance", label: "Insurance", hint: "Health, life, anything not already counted above." },
  { key: "debt", label: "Debt payments", hint: "Minimum payments on cards, loans, and student debt." },
  { key: "fun", label: "Subscriptions and fun", hint: "Streaming, apps, hobbies, going out." },
  { key: "savings", label: "Savings", hint: "Emergency fund, investing, anything you pay to future-you first." },
  { key: "other", label: "Everything else", hint: "The odds and ends that never fit anywhere." },
] as const;

const DEFAULTS: Record<string, number> = {
  housing: 1200,
  transport: 350,
  food: 450,
  utilities: 200,
  insurance: 150,
  debt: 200,
  fun: 250,
  savings: 300,
  other: 100,
};

function pct(value: number): string {
  return `${Math.round(value)}%`;
}

export function Budget() {
  const [income, setIncome] = useState(3500);
  const [expenses, setExpenses] = useState<Record<string, number>>(DEFAULTS);

  const setExpense = (key: string, value: number) =>
    setExpenses((prev) => ({ ...prev, [key]: Math.max(0, value) }));

  const totalExpenses = CATEGORIES.reduce((sum, c) => sum + (expenses[c.key] ?? 0), 0);
  const leftover = income - totalExpenses;
  const share = (value: number) => (income > 0 ? (value / income) * 100 : 0);

  const summary = [
    "Budget: my numbers",
    `Monthly take-home pay: ${money(income)}`,
    ...CATEGORIES.map((c) => `${c.label}: ${money(expenses[c.key] ?? 0)}`),
    `Total going out: ${money(totalExpenses)}`,
    `Left over each month: ${money(leftover)}`,
    "Estimate for education, not advice.",
  ].join("\n");

  const verdict = (() => {
    if (income <= 0) {
      return "Enter your monthly take-home pay and the verdict shows up here.";
    }
    if (leftover > 0) {
      return `You are spending ${money(totalExpenses)} of ${money(income)}. That leaves ${money(
        leftover,
      )} unassigned every month. Give each of those dollars a job first: more to savings or extra debt payments, before lifestyle creep spends it for you.`;
    }
    if (leftover === 0) {
      return `You are spending exactly ${money(income)}. Balanced to the dollar. One surprise bill tips it, so a small cushion in savings is worth building next.`;
    }
    return `You are spending ${money(-leftover)} more than you bring in. That gap has to come from somewhere, and borrowing to cover it gets expensive. Look at the biggest category in the table first, then the easiest one to cut.`;
  })();

  return (
    <div className="t-calc">
      <div className="t-controls">
        <MoneyField
          label="Monthly take-home pay"
          value={income}
          onChange={(v) => setIncome(Math.max(0, v))}
          hint="What actually lands in your account after taxes and deductions. Not your salary."
        />
        <div>
          <p className="text-17 font-semibold">Monthly spending by category</p>
          <p className="t-hint" style={{ marginTop: "0.25rem" }}>
            Your best guess is fine. Last month&apos;s bank statement is better.
          </p>
        </div>
        {CATEGORIES.map((c) => (
          <MoneyField
            key={c.key}
            label={c.label}
            value={expenses[c.key] ?? 0}
            onChange={(v) => setExpense(c.key, v)}
            hint={c.hint}
          />
        ))}
      </div>

      <div className="t-panel" aria-live="polite">
        <dl className="t-stat-grid">
          <Stat
            label={leftover >= 0 ? "Left over each month" : "Short each month"}
            value={money(Math.abs(leftover))}
            hero
            sub={income > 0 ? `${money(income)} in, ${money(totalExpenses)} out` : "Enter your numbers"}
          />
          <Stat label="Take-home pay" value={money(income)} />
          <Stat label="Total going out" value={money(totalExpenses)} />
        </dl>

        <div>
          <h3 className="text-19 font-semibold">The verdict</h3>
          <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">{verdict}</p>
        </div>

        <div className="t-table-wrap">
          <table className="t-table">
            <caption className="t-hint" style={{ textAlign: "left", marginBottom: "0.5rem" }}>
              Where your take-home pay goes, by category.
            </caption>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Monthly</th>
                <th scope="col">Share of pay</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((c) => {
                const value = expenses[c.key] ?? 0;
                const width = Math.min(100, share(value));
                return (
                  <tr key={c.key}>
                    <td>{c.label}</td>
                    <td>{money(value)}</td>
                    <td>
                      <span style={{ display: "inline-block", minWidth: "3rem" }}>{pct(share(value))}</span>
                      <span
                        aria-hidden
                        style={{
                          display: "inline-block",
                          height: "0.5rem",
                          width: `${width}%`,
                          maxWidth: "10rem",
                          background: "var(--color-navy)",
                          borderRadius: "999px",
                          marginLeft: "0.5rem",
                          verticalAlign: "middle",
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <AssumptionBox>
          <strong>Simple subtraction, on purpose.</strong> Leftover is take-home pay minus every
          expense category, and each share is that category divided by take-home pay. Savings is
          listed as spending because money moved to savings on payday is spoken for, like a bill.
          No taxes, inflation, or surprise expenses are included.
        </AssumptionBox>

        <CopyNumbersButton summary={summary} />
        <ShareResultButton
          headlineNumber={money(Math.abs(leftover))}
          headlineLabel={leftover >= 0 ? "Left over each month" : "Short each month"}
          toolName="Budget calculator"
          toolPath="/tools/budget"
        />
      </div>
    </div>
  );
}
