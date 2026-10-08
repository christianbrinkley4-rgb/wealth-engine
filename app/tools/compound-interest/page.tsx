import type { Metadata } from "next";

import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

import { MathSection, ToolClose } from "../_components/tool-footer";
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
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        variant="compact"
        crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "Compound interest" }]}
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

      <MathSection
        title="The math, in plain English"
        howTo={[
          "Set a starting amount. Zero works if you are just getting going.",
          "Pick a monthly contribution you could actually keep up with.",
          "Choose how many years the money stays put and compounding.",
          "Try a low, middle, and high yearly rate to see a range instead of one guess.",
        ]}
        formula={{
          label: "The formula",
          expression:
            "Balance = P x (1 + r/12)^n + PMT x (((1 + r/12)^n - 1) / (r/12))\n\nP = starting amount, PMT = monthly contribution,\nr = assumed yearly rate, n = number of months",
          note: "The tool walks through every month one at a time instead of using the closed formula. Same answer either way.",
        }}
      >
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
      </MathSection>


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
