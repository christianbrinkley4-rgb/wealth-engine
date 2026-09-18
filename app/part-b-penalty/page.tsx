import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { PartBPenaltyCalculator } from "@/app/part-b-penalty/PartBPenaltyCalculator";
import { AGENT } from "@/lib/agent";
import { STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import { formatMoney } from "@/lib/partBPenalty";
import { breadcrumbJsonLd, faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

const title = "Medicare Part B Late Enrollment Penalty Calculator — Greensboro, NC";
const description =
  "Work out whether a Part B late enrollment penalty applies to you, what it adds each month, and what it costs over a retirement. Uses the 2026 standard premium.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/part-b-penalty" },
  openGraph: pageOpenGraph({
    title: "What a late Part B enrollment actually costs",
    description:
      "Ten percent for every full year you could have had Part B and didn't — for as long as you have it. See your number.",
    path: "/part-b-penalty",
  }),
  twitter: pageTwitter({
    title: "Medicare Part B late penalty calculator",
    description: "What it adds each month, each year, and across a retirement.",
  }),
};

const FAQ = [
  {
    q: "How is the Part B late enrollment penalty calculated?",
    a: `Medicare adds 10% to the standard Part B premium for each full 12-month period you could have had Part B and didn't. Only complete years count: eleven months late is no penalty, and thirteen months is one period rather than one and a bit. The 2026 standard premium is ${formatMoney(STANDARD_BASE_PREMIUM_2026)}, so one full year late works out to about ${formatMoney(Math.round(STANDARD_BASE_PREMIUM_2026 * 0.1 * 10) / 10)} a month.`,
  },
  {
    q: "How long does the penalty last?",
    a: "For as long as you have Part B. It is not a one-time charge and it does not fall off after a few years, which is what makes a short delay expensive over a retirement.",
  },
  {
    q: "I kept working past 65. Do I owe a penalty?",
    a: "Usually not. Health coverage through a job you or your spouse currently work at generally gives you a Special Enrollment Period, and no penalty, as long as you enroll within eight months of that employment or coverage ending. Retiree coverage, COBRA, and marketplace plans do not work the same way, which is where people get caught.",
  },
  {
    q: "Does the penalty go up if I pay IRMAA?",
    a: "No. The percentage is applied to the standard premium, not to an income-adjusted one, so someone paying an income-related surcharge does not also pay a surcharged penalty.",
  },
  {
    q: "Can a penalty be appealed?",
    a: "Yes, in some situations — for example if you were given the wrong information by a federal employee, or if your employer coverage was miscounted. There is a formal process, and it is worth reviewing the specifics with someone before you accept the charge.",
  },
] as const;

export default function PartBPenaltyPage() {
  return (
    <main className="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Part B late penalty", path: "/part-b-penalty" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />

      <section className="home-section">
        <div className="personal-shell">
          <div className="home-heading-row">
            <div>
              <p className="home-eyebrow home-eyebrow-rust">The one that lasts for life</p>
              <h1
                style={{
                  fontFamily: "var(--home-serif)",
                  fontSize: "2.4rem",
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                What does a late Part B enrollment actually cost?
              </h1>
            </div>
            <p className="home-heading-note">
              Ten percent is added to your premium for every full year you could have had Part B and
              didn’t — and it stays for as long as you have it. Two dates will tell you where you
              stand.
            </p>
          </div>

          <PartBPenaltyCalculator />
        </div>
      </section>

      <section className="home-section home-rule-top">
        <div className="personal-shell home-faq">
          <div className="home-faq-intro">
            <p className="home-eyebrow">Before you assume the worst</p>
            <h2>The exceptions matter more than the arithmetic.</h2>
            <p>
              Most people who think they owe a penalty had coverage that protected them, and some
              who assume they are fine are running out a clock they can’t see. If either might be
              you, it is a short conversation.
            </p>
            <Link href="/start?topic=medicare" className="home-link">
              Go through it with me
            </Link>
            <p style={{ marginTop: "0.5rem" }}>
              or call <a href={AGENT.phoneHref}>{AGENT.phone}</a>
            </p>
          </div>
          <div className="home-faq-list">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span aria-hidden>+</span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ComplianceDisclosure variant="medicare" showEstimateNote />
    </main>
  );
}
