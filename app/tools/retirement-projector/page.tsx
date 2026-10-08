import type { Metadata } from "next";

import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { MathSection, ToolClose } from "../_components/tool-footer";
import { RetirementProjector } from "./RetirementProjector";

const path = "/tools/retirement-projector";
const description =
  "Free retirement projector. See what your savings could reach by the age you choose, at an assumed rate you set. Labeled as assumed, never a prediction.";

export const metadata: Metadata = {
  title: { absolute: "Retirement Projector | Christian Brinkley" },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "Retirement projector", description, path }),
  twitter: { ...pageTwitter({ title: "Retirement projector", description }), images: [`${path}/twitter-image`] },
};

const PROOF = [
  "Your age, your timeline",
  "Assumed rate, clearly labeled",
  "Everything runs on your device",
  "Results are estimates for education",
] as const;

export default function RetirementProjectorPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path: "/tools" },
              { name: "Retirement projector", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Retirement projector",
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
        crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "Retirement projector" }]}
        eyebrow="Free tool · your numbers stay on your device"
        title="What could your savings reach?"
        lede="Retirement feels abstract until you see a number with your name on it. Pick your retirement age and your monthly contribution. Pick an assumed growth rate. The tool projects the balance year by year, split into what you put in and what growth added. The rate is labeled as assumed on purpose: it is a dial to explore, not a prediction."
        secondaryHref="/start"
        secondaryLabel="Talk it through with me →"
        proof={PROOF}
      />

      <section className="bg-white py-14">
        <div className="app-shell max-w-5xl">
          <RetirementProjector />
        </div>
      </section>

      <MathSection
        title="The math, in plain English"
        howTo={[
          "Enter your age now and the age you want to retire. That is the timeline.",
          "Add what you have saved so far.",
          "Set a monthly contribution you could keep up.",
          "Try a low, middle, and high growth rate to see a range, not one guess.",
        ]}
        formula={{
          label: "The formula",
          expression: "Balance = P x (1 + r/12)^n + PMT x (((1 + r/12)^n - 1) / (r/12))\n\nP = saved so far, PMT = monthly contribution,\nr = assumed yearly growth, n = months until your retirement age",
          note: "The tool walks through every month one at a time. The rate is steady here; real returns bounce around.",
        }}
      >
        <p>
          Each month, the balance grows by one twelfth of your yearly rate. Then your monthly
          contribution is added. That repeats every month until your retirement age.
        </p>
        <p>
          The solid line is the projected balance. The dashed line is everything you deposited. The
          gap between them is growth. Early on the lines stay close. Given enough years, they split
          wide apart.
        </p>
        <p>
          This is a steady-rate model. Real life is not steady: some years are up, some are down, and
          the order of those years matters. Use the tool to understand the shape, not to predict a
          balance.
        </p>
        <p>
          No taxes, fees, or inflation are included. Taxes depend on the account type. Inflation means
          future dollars buy less than today&apos;s dollars.
        </p>
      </MathSection>


      <ToolClose
        wealthHref="/wealth/money-moves-in-your-20s"
        wealthEyebrow="Go deeper"
        wealthTitle="Money moves in your 20s"
        wealthBody="The handful of moves that matter most when time is on your side. Short, practical, no jargon."
        ctaHeading="See a number you like? Let us check it together"
        ctaBody="The projector explores the range. A free 20-minute call puts your number next to your real timeline, your real accounts, and what comes next."
      />
    </main>
  );
}
