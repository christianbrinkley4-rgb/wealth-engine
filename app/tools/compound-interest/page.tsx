import { EditorialNote } from "@/app/components/EditorialNote";
import type { Metadata } from "next";

import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

import { MathSection, ToolClose, ToolsDisclaimer } from "../_components/tool-footer";
import { CompoundInterest } from "./CompoundInterest";

const path = "/tools/compound-interest";
const description =
  "Free compound interest calculator. Watch monthly deposits grow year by year at a rate you pick, with the full table underneath.";

export const metadata: Metadata = {
  title: { absolute: "Compound Interest Calculator | Christian Brinkley" },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "Compound interest calculator", description, path }),
};

const PROOF = [
  "Drag the sliders, watch the curve",
  "Full year-by-year table",
  "Everything runs on your device",
  "Results are estimates for education",
] as const;

export default function CompoundInterestPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path: "/tools" },
              { name: "Compound interest", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Compound interest calculator",
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
          { name: "Compound interest" },
        ]}
        eyebrow="Free tool · your numbers stay on your device"
        title="Compound interest, live"
        lede="Drag the sliders and the curve redraws. The solid line is your balance. The dashed line is what you actually put in. The space between them is growth, and it gets wide fast. Then scroll down to see every year in a table."
        secondaryHref="/start"
        secondaryLabel="Talk it through with me →"
        proof={PROOF}
      />

      <section className="bg-white py-14">
        <div className="app-shell max-w-5xl">
          <CompoundInterest />
        </div>
      </section>

      <MathSection title="The math, in plain English">
        <p>
          Compounding is growth on top of growth. Your money earns a return, then that return earns
          its own return. Over long stretches, most of the final balance can come from growth, not
          from what you deposited.
        </p>
        <p>
          Each month the balance grows by one twelfth of the yearly rate you set, then your monthly
          contribution is added. The table repeats that for every month of the timeline.
        </p>
        <p>
          Three things move the number: time, the amount you put in, and the rate. Time and amount
          are yours to control. The rate is not. Try a low, middle, and high rate to see a range
          instead of a single guess.
        </p>
        <p>
          No taxes, fees, or inflation are included. Investments can lose money, and real returns
          bounce around year to year.
        </p>
        <p>
          The starting balance enters before the first month. Monthly contributions enter after that
          month&apos;s growth, so they begin earning the following month.
        </p>
        <p>
          The annual rate is a nominal assumption divided into monthly rates. It is not a quoted
          annual percentage yield or a prediction.
        </p>
        <p>
          A constant positive return produces a smooth curve. Real investment returns vary, and the
          order of gains and losses can change outcomes.
        </p>
        <p>
          The contribution total tracks deposits separately from growth. This helps you see how much
          of the final balance depends on an uncertain return assumption.
        </p>
        <p>
          Try changing a single input while keeping the others fixed. The comparison shows how that
          assumption changes the calculation, not which investment to buy.
        </p>
        <p>
          Money needed soon may not have time to recover from losses. The tool cannot assess
          liquidity, suitability, or the risk of a specific investment.
        </p>
        <p>
          Fees, taxes, and inflation are excluded. The displayed future balance is nominal dollars,
          so it does not show future purchasing power.
        </p>
        <p>
          Compare scenarios with the same contribution timing. A calculator using beginning-of-month
          deposits can produce a different answer without either formula being wrong.
        </p>
        <EditorialNote
          sources={[
            {
              label: "SEC Investor.gov: compound interest calculator",
              href: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
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
        wealthHref="/wealth/money-moves-in-your-20s"
        wealthEyebrow="Go deeper"
        wealthTitle="Money moves in your 20s"
        wealthBody="Why starting early beats starting big, and the handful of moves that matter most when time is on your side."
        ctaHeading="Like what the curve shows? Make it real"
        ctaBody="The calculator shows the shape. A free 20-minute call puts your number next to real accounts and a real plan to start."
      />
    </main>
  );
}
