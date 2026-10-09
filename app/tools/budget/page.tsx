import { ToolTracking } from "../_components/tool-tracking";
import type { Metadata } from "next";

import { ToolHeader } from "../_components/tool-header";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { MathSection, ToolClose } from "../_components/tool-footer";
import { Budget } from "./Budget";

const path = "/tools/budget";
const description =
  "Free monthly budget calculator. Type your take-home pay and spending by category, then see your surplus or deficit with a full breakdown of where it goes.";

export const metadata: Metadata = {
  title: { absolute: "Budget Calculator | Christian Brinkley" },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "Budget calculator", description, path }),
  twitter: { ...pageTwitter({ title: "Budget calculator", description }), images: [`${path}/twitter-image`] },
};


export default function BudgetPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path: "/tools" },
              { name: "Budget", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Budget calculator",
              description,
              path,
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ToolHeader crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "Budget" }]} title="Budget, in one screen" lede="Money comes in, money goes out, and somehow there is never quite enough left. Type in what you bring home and what you spend, and see what is left." />

      <section className="bg-white py-6">
        <div className="app-shell max-w-5xl">
          <ToolTracking toolId="budget"><Budget /></ToolTracking>
        </div>
      </section>

      <MathSection
        title="The math, in plain English"
        howTo={[
          "Start with your monthly take-home pay, the amount that lands in your account.",
          "Fill in each spending category with your best honest guess.",
          "Read the leftover line. That is your verdict.",
          "Nudge one category at a time and watch the verdict change.",
        ]}
        formula={{
          label: "The formula",
          expression: "Leftover = take-home pay - (housing + transport + food\n  + utilities + insurance + debt + fun + savings + other)\n\nCategory share = category / take-home pay",
        }}
      >
        <p>
          The verdict is subtraction. Leftover is your monthly take-home pay minus every expense
          category added together. If the number is negative, you are spending more than you bring
          in, and the gap is the exact size of the shortfall.
        </p>
        <p>
          Each share is one category divided by your take-home pay. It answers &quot;where does my
          money actually go?&quot; in percentages, which makes it easier to spot a category that is
          quietly eating the budget.
        </p>
        <p>
          Savings shows up as spending on purpose. Money that moves to savings on payday is spoken
          for, like a bill. That is the whole pay-yourself-first idea: the budget treats it as gone
          before anything else can claim it.
        </p>
        <p>
          Start from take-home pay, never salary. Taxes and paycheck deductions are already gone by
          the time you see the money, so they do not belong in the budget. These are estimates for
          education, not advice for your situation.
        </p>
      </MathSection>


      <ToolClose
        wealthHref="/wealth/budgeting-that-actually-works"
        wealthEyebrow="Go deeper"
        wealthTitle="Budgeting that actually works"
        wealthBody="How to turn these numbers into a system you keep: take-home pay, a starting split, one payday move, and a weekly check."
        ctaHeading="See a number you want to change? Let's talk it through"
        ctaBody="The calculator shows where the money goes. A free 20-minute call puts your real budget next to real accounts and a plan you can keep."
        related={[
          { href: "/tools/take-home-pay", label: "Take-home pay calculator" },
          { href: "/wealth/learn/the-50-30-20-rule", label: "The 50/30/20 rule" },
          { href: "/tools/debt-payoff", label: "Debt payoff calculator" },
        ]}
      />
    </main>
  );
}
