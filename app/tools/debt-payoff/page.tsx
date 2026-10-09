import { EditorialNote } from "@/app/components/EditorialNote";
import type { Metadata } from "next";

import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

import { MathSection, ToolClose, ToolsDisclaimer } from "../_components/tool-footer";
import { DebtPayoff } from "./DebtPayoff";

const path = "/tools/debt-payoff";
const description =
  "Free debt payoff calculator. List your real debts and compare avalanche vs snowball: months to zero and total interest, side by side.";

export const metadata: Metadata = {
  title: { absolute: "Debt Payoff Calculator: Avalanche vs Snowball | Christian Brinkley" },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "Debt payoff calculator", description, path }),
};

const PROOF = [
  "Your real debts, editable",
  "Avalanche vs snowball compared",
  "Everything runs on your device",
  "Results are estimates for education",
] as const;

export default function DebtPayoffPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path: "/tools" },
              { name: "Debt payoff", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Debt payoff calculator: avalanche vs snowball",
              description,
              path,
              datePublished: "2026-10-08",
              dateModified: "2026-10-09",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Free tools", href: "/tools" },
          { name: "Debt payoff" },
        ]}
        eyebrow="Free tool · your numbers stay on your device"
        title="Avalanche vs snowball, on your debts"
        lede="Two ways out of debt, tested on your real numbers. Avalanche starts with the highest rate. Snowball starts with the smallest balance. Compare their modeled cost and timing. Type in your debts and see both."
        secondaryHref="/start"
        secondaryLabel="Talk it through with me →"
        proof={PROOF}
      />

      <section className="bg-white py-14">
        <div className="app-shell max-w-5xl">
          <DebtPayoff />
        </div>
      </section>

      <MathSection title="The math, in plain English">
        <p>
          <strong>Avalanche</strong> targets the debt with the highest APR.{" "}
          <strong>Snowball</strong> targets the smallest balance. Both pay every minimum first, then
          throw the extra payment at the one target debt.
        </p>
        <p>
          When a debt reaches zero, its minimum payment rolls into the next target. Your total
          monthly payment stays the same, so each payoff makes the next one faster. That rollover is
          the whole engine of both methods.
        </p>
        <p>
          Avalanche prioritizes interest cost. Snowball prioritizes clearing a smaller balance.
          Compare the results under the same assumptions.
        </p>
        <p>
          Replace the sample debts with balances, rates, and minimum payments from your statements.
          The starting values are hypothetical examples, not typical borrowing costs.
        </p>
        <p>
          The model applies monthly interest using APR divided by the number of months in a year.
          Actual lenders may accrue interest daily.
        </p>
        <p>
          Minimum payments stay fixed in this model. Credit card minimums often change with the
          balance, so your statement schedule can differ.
        </p>
        <p>
          After minimums, extra payments go to the selected target. When a debt is cleared, its
          payment remains available for the next debt.
        </p>
        <p>
          The model assumes no new borrowing, late fees, promotional-rate changes, or prepayment
          charges. Any of those can change the result.
        </p>
        <p>
          If payments cannot cover interest, a debt may keep growing. A missing payoff date is a
          warning about the inputs, not a promised deadline.
        </p>
        <p>
          Use the comparison to explore trade-offs between interest cost and early progress. It
          cannot predict which repayment approach you will maintain.
        </p>
        <p>
          Federal student loan forgiveness and income-driven repayment rules are outside this model.
          Review those terms before making extra payments.
        </p>
        <EditorialNote
          sources={[
            {
              label: "CFPB: debt planning tools",
              href: "https://www.consumerfinance.gov/consumer-tools/educator-tools/your-money-your-goals/toolkit/",
            },
          ]}
        />
      </MathSection>

      <div className="bg-white px-4">
        <div className="app-shell max-w-3xl py-10">
          <ToolsDisclaimer />
        </div>
      </div>

      <ToolClose
        wealthHref="/wealth/student-loans-payoff-plan"
        wealthEyebrow="Go deeper"
        wealthTitle="A payoff plan for student loans"
        wealthBody="How to line up federal and private loans, when extra payments matter most, and the order that costs the least. Plain English throughout."
        ctaHeading="Debt keeps you up at night? Let us look together"
        ctaBody="The tool shows the fastest math. A free 20-minute call checks the plan against your real budget, so it survives contact with real life."
      />
    </main>
  );
}
