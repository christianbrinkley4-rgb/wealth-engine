import type { Metadata } from "next";

import { DebtPayoff } from "@/app/wealth/calculators/debt-payoff/DebtPayoff";
import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthMetadata, webAppJsonLd } from "@/lib/wealth/seo";

const path = "/wealth/calculators/debt-payoff";
const description =
  "Debt payoff calculator: avalanche vs snowball, side by side. Enter your debts and see months to payoff and total interest for each method.";

export const metadata: Metadata = wealthMetadata({
  title: "Debt Payoff Calculator: Avalanche vs Snowball",
  description,
  path,
});

const FAQ = [
  {
    q: "What is the debt avalanche method?",
    a: "You pay the minimum on every debt, then put all extra money toward the debt with the highest interest rate. When it's gone, you move to the next highest. It costs the least interest overall.",
  },
  {
    q: "What is the debt snowball method?",
    a: "You pay the minimum on every debt, then put all extra money toward the smallest balance. When it's gone, you roll that payment into the next smallest. You get a paid-off debt sooner, and that win keeps you going.",
  },
  {
    q: "Which one is better, avalanche or snowball?",
    a: "Avalanche never costs more interest than snowball. When your smallest debt isn't your highest rate, it costs less. Snowball gives quicker wins. The difference in dollars depends on your debts, which is why this calculator shows both. The plan you'll actually stick with matters more than the method.",
  },
  {
    q: "Where do I find my APR and minimum payment?",
    a: "On your statement or in your lender's app. APR is the yearly interest rate. The minimum payment is the smallest amount you can pay that month without a late fee.",
  },
  {
    q: "Are my debts saved anywhere?",
    a: "Only in your own browser so they're here when you come back. Nothing you enter is sent to me or to a server.",
  },
] as const;

export default function DebtPayoffPage() {
  return (
    <main>
      <JsonLd data={webAppJsonLd({ name: "Debt payoff calculator: avalanche vs snowball", description, path })} />
      <PageHead
        eyebrow="Calculator"
        title={
          <>
            Avalanche vs <span className="w-mark">snowball.</span>
          </>
        }
        lede="The sample debts are made up. Swap in yours, then slide the extra payment and watch both finish lines move."
        crumbs={[
          { name: "Calculators", path: "/wealth/calculators" },
          { name: "Debt payoff", path },
        ]}
      />
      <section className="w-section-tight">
        <div className="w-shell">
          <DebtPayoff />
        </div>
      </section>

      <section className="w-section">
        <div className="w-shell w-narrow w-prose">
          <h2>Same payment, different target</h2>
          <p>
            Both methods pay the same total each month. The only difference is which debt gets the extra.
            Avalanche follows the math. Snowball follows motivation.
          </p>
          <h2>The trick both share</h2>
          <p>
            When a debt hits zero, don&apos;t pocket its payment. Roll it into the next debt. Your monthly
            total stays the same, but more of it lands on one balance. That&apos;s why the line on the chart
            gets steeper near the end.
          </p>
          <h2>Before you start</h2>
          <ul>
            <li>Keep every minimum paid on time. A late fee wipes out a month of progress.</li>
            <li>A small emergency buffer keeps a surprise bill from going back on the card.</li>
            <li>If the payments here never catch the interest, a nonprofit credit counselor is worth a call.</li>
          </ul>
          <EducationNote />
        </div>
      </section>

      <Faq items={FAQ} title="Debt payoff, quick answers" />
      <NextUp
        links={[
          { href: "/wealth/learn/credit-scores-explained", label: "Credit scores, explained", kind: "Article" },
          { href: "/wealth/calculators/budget", label: "Find the extra with a budget", kind: "Calculator" },
          { href: "/wealth/quiz/first-1000", label: "What do I do with my first $1,000?", kind: "Quiz" },
        ]}
      />
    </main>
  );
}
