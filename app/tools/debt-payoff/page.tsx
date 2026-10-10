import { ToolTracking } from "../_components/tool-tracking";
import type { Metadata } from "next";

import { ToolHeader } from "../_components/tool-header";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { MathSection, ToolClose } from "../_components/tool-footer";
import { DebtPayoff } from "./DebtPayoff";

const path = "/tools/debt-payoff";
const description =
  "Free debt payoff calculator. List your real debts and compare avalanche vs snowball: months to zero and total interest, side by side.";

export const metadata: Metadata = {
  title: { absolute: "Debt Payoff Calculator | Christian Brinkley" },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "Debt payoff calculator", description, path }),
  twitter: { ...pageTwitter({ title: "Debt payoff calculator", description }), images: [`${path}/twitter-image`] },
};


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
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ToolHeader crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "Debt payoff" }]} title="Avalanche vs snowball, on your debts" lede="Staring at three balances and not knowing which to attack first is the worst part. Type in your debts and see both ways out." />

      <section className="bg-white py-6">
        <div className="app-shell max-w-5xl">
          <ToolTracking toolId="debt_payoff"><DebtPayoff /></ToolTracking>
        </div>
      </section>

      <MathSection
        title="The math, in plain English"
        howTo={[
          "List each debt with its balance, APR, and minimum payment.",
          "Set an extra payment, the amount above all minimums you can commit to.",
          "Compare avalanche (highest APR first) with snowball (smallest balance first).",
          "Pick the method you will actually stick with. That is the one that wins.",
        ]}
        formula={{
          label: "The formula",
          expression: "Each month: interest = balance x (APR / 100) / 12\nThen minimums are paid, then the extra payment hits the target debt.\n\nAvalanche target = highest APR first\nSnowball target = smallest balance first\n\nWhen a debt hits zero, its minimum rolls into the next target.",
        }}
      >
        <p>
          <strong>Avalanche</strong> targets the debt with the highest APR. <strong>Snowball</strong>{" "}
          targets the smallest balance. Both pay every minimum first, then throw the extra payment at
          the one target debt.
        </p>
        <p>
          When a debt reaches zero, its minimum payment rolls into the next target. Your total monthly
          payment stays the same, so each payoff makes the next one faster. That rollover is the whole
          engine of both methods.
        </p>
        <p>
          Avalanche almost always costs less in interest. Snowball almost always scores the first win
          sooner. The cheaper method only wins if you stick with it, so the right pick is the one you
          will keep doing.
        </p>
      </MathSection>


      <ToolClose
        wealthHref="/wealth/student-loans-payoff-plan"
        wealthEyebrow="Go deeper"
        wealthTitle="A payoff plan for student loans"
        wealthBody="How to line up federal and private loans, when extra payments matter most, and the order that costs the least. Plain English throughout."
        ctaHeading="Debt keeps you up at night? Let us look together"
        ctaBody="The tool shows the fastest math. A free 20-minute call checks the plan against your real budget, so it survives contact with real life."
        related={[
          { href: "/tools/budget", label: "Budget calculator" },
          { href: "/wealth/credit-cards-beginners", label: "Credit cards for beginners" },
          { href: "/tools/take-home-pay", label: "Take-home pay calculator" },
        ]}
      />
    </main>
  );
}
