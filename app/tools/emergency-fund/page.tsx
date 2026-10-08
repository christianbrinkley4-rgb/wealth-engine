import type { Metadata } from "next";

import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { MathSection, ToolClose, ToolsDisclaimer } from "../_components/tool-footer";
import { EmergencyFund } from "./EmergencyFund";

const path = "/tools/emergency-fund";
const description =
  "Free emergency fund calculator. Turn your monthly spending into a savings target and a month-by-month plan to reach it.";

export const metadata: Metadata = {
  title: { absolute: "Emergency Fund Calculator | Christian Brinkley" },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "Emergency fund calculator", description, path }),
  twitter: { ...pageTwitter({ title: "Emergency fund calculator", description }), images: [`${path}/twitter-image`] },
};

const PROOF = [
  "Target based on your spending",
  "Month-by-month savings plan",
  "Everything runs on your device",
  "Results are estimates for education",
] as const;

export default function EmergencyFundPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path: "/tools" },
              { name: "Emergency fund", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Emergency fund calculator",
              description,
              path,
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Free tools", href: "/tools" }, { name: "Emergency fund" }]}
        eyebrow="Free tool · your numbers stay on your device"
        title="Your emergency fund, sized to your life"
        lede="An emergency fund is months of spending, not a round number someone else picked. Type in what you must spend each month and how many months you want covered. The tool sets the target and builds the plan to reach it."
        secondaryHref="/start"
        secondaryLabel="Talk it through with me →"
        proof={PROOF}
      />

      <section className="bg-white py-14">
        <div className="app-shell max-w-5xl">
          <EmergencyFund />
        </div>
      </section>

      <MathSection title="The math, in plain English">
        <p>
          <strong>The target:</strong> monthly essential spending times the months of coverage you
          choose. Three months is the common starting line. Six months covers a longer stretch without
          income.
        </p>
        <p>
          <strong>The plan:</strong> the target divided by what you can save each month, rounded up to
          whole months. The table shows the balance climbing month by month until it hits the target.
        </p>
        <p>
          <strong>Essential spending</strong> means the bills that do not stop: housing, food, transport,
          insurance, and minimum debt payments. Subscriptions and dining out are not essentials here.
        </p>
      </MathSection>

      <div className="bg-white px-4">
        <div className="app-shell max-w-3xl py-10">
          <ToolsDisclaimer />
        </div>
      </div>

      <ToolClose
        wealthHref="/wealth/emergency-fund-guide"
        wealthEyebrow="Go deeper"
        wealthTitle="The emergency fund guide"
        wealthBody="Where to keep the fund, how big is big enough, and what counts as a real emergency. Plain English, no jargon."
        ctaHeading="Want a second pair of eyes on your number?"
        ctaBody="The tool sizes the target. A free 20-minute call checks it against your real budget and your real risks."
      />
    </main>
  );
}
