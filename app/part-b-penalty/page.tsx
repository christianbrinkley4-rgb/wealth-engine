import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { MedicareByline } from "@/app/components/MedicareByline";
import { ResponsiveTable } from "@/app/components/ResponsiveTable";
import { PRIORITY_MEDICARE_FAQS } from "@/lib/priorityMedicareFaqs";
import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { PartBPenaltyCalculator } from "@/app/part-b-penalty/PartBPenaltyCalculator";
import { AGENT } from "@/lib/agent";
import { STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import { formatMoney, partBPenalty } from "@/lib/partBPenalty";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

/**
 * Part B late enrollment penalty: the calculator plus the full answer.
 *
 * The guide below the calculator targets the national question "how is the
 * Part B late enrollment penalty calculated". Every figure comes from the
 * sources listed in SOURCES, checked 2026-11-04. Dollar amounts in the table
 * are computed from lib/partBPenalty.ts and STANDARD_BASE_PREMIUM_2026, so
 * they move with the premium when the 2027 figure is published. The worked
 * example ($40.58, $243.48, $243.50) is quoted from Medicare.gov and must be
 * rechecked when the premium changes.
 */

const UPDATED = "2026-11-04";
const PREMIUM = STANDARD_BASE_PREMIUM_2026;
const ONE_PERIOD = Math.round(PREMIUM * 0.1 * 100) / 100;

const title = "Medicare Part B Late Enrollment Penalty: How It's Calculated (2026)";
const description =
  "The Part B late penalty adds 10% for every full year you could have had Part B and didn't. See the 2026 math, the exceptions, and how to avoid it.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/part-b-penalty" },
  openGraph: pageOpenGraph({
    title: "How the Medicare Part B late penalty is calculated",
    description:
      "Ten percent for every full year you could have had Part B and didn't, for as long as you have it. See the math, the exceptions, and your own number.",
    path: "/part-b-penalty",
  }),
  twitter: pageTwitter({
    title: "Medicare Part B late penalty: the math and the exceptions",
    description:
      "What it adds each month, who doesn't owe it, and what to do if you missed your window.",
  }),
};

const EXTRA_FAQ = [
  {
    q: "Does COBRA protect me from the Part B penalty?",
    a: "No. Your 8-month window to sign up starts when you stop working, even if you choose COBRA. Waiting until COBRA ends can mean a penalty.",
  },
  {
    q: "Do partial years count toward the penalty?",
    a: "No. Only full 12-month periods count. Eleven months without Part B means no penalty. Twenty-three months counts as one period.",
  },
  {
    q: "What if I can't afford the higher premium?",
    a: "Look into a Medicare Savings Program through your state. Medicare.gov says you generally won't pay a Part B late penalty if you enroll in one.",
  },
] as const;

const FAQ = [...PRIORITY_MEDICARE_FAQS.penalty, ...EXTRA_FAQ];

const TABLE_ROWS = [
  { label: "1 to 11", months: 0 },
  { label: "12 to 23", months: 12 },
  { label: "24 to 35", months: 24 },
  { label: "36 to 47", months: 36 },
  { label: "48 to 59", months: 48 },
].map((row) => {
  const result = partBPenalty(row.months, PREMIUM);
  return {
    ...row,
    periods: result.periods,
    percent: result.percent,
    total: Math.round((PREMIUM + result.monthlyPenalty) * 100) / 100,
  };
});

const SOURCES = [
  {
    label: "Medicare.gov: Avoid late enrollment penalties",
    href: "https://www.medicare.gov/basics/costs/medicare-costs/avoid-penalties",
  },
  {
    label: "CMS: 2026 Medicare Parts A & B premiums and deductibles",
    href: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles",
  },
  {
    label: "Medicare.gov: When can I sign up for Medicare?",
    href: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-can-i-sign-up-for-medicare",
  },
  {
    label: "Medicare.gov: COBRA coverage",
    href: "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/working-past-65/cobra-coverage",
  },
  {
    label: "Medicare.gov: Who pays first?",
    href: "https://www.medicare.gov/health-drug-plans/coordination/who-pays-first",
  },
  {
    label: "Medicare.gov: Enrolling in Medicare Part A & Part B",
    href: "https://www.medicare.gov/publications/11036-enrolling-medicare-part-a-part-b.pdf",
  },
];

const P = "text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]";
const H2 = "text-28 mt-12 font-semibold";
// The .home wrapper zeroes paragraph and heading margins, so spacing is inline.
const PS = { marginTop: "1rem" } as const;
const H2S = { marginTop: "3rem" } as const;

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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "How is the Medicare Part B late enrollment penalty calculated?",
              description,
              path: "/part-b-penalty",
              datePublished: "2026-09-18",
              dateModified: UPDATED,
            }),
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
                How is the Medicare Part B late enrollment penalty calculated?
              </h1>
            </div>
            <p className="home-heading-note">
              Medicare adds 10% of the standard Part B premium for every full 12-month period you
              could have had Part B and didn’t. In 2026 that premium is {formatMoney(PREMIUM)} a
              month, so each full year late adds about {formatMoney(ONE_PERIOD)}. It’s not a
              one-time fee. For most people it lasts as long as they have Part B. Put in two dates
              below to see yours.
            </p>
          </div>
          <PartBPenaltyCalculator />
        </div>
      </section>

      <section className="home-section home-rule-top">
        <div className="measure-prose personal-shell max-w-4xl">
          <p className="home-eyebrow">The full answer · Updated November 4, 2026</p>
          <h2 className={H2} style={{ marginTop: "0.5rem" }}>
            The math, step by step
          </h2>
          <p className={P} style={PS}>
            Medicare’s formula has three parts.
          </p>
          <ol className="text-17 mt-4 list-decimal space-y-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong>Count the months.</strong> These are the months you could have had Part B but
              didn’t, with no Special Enrollment Period covering you.
            </li>
            <li>
              <strong>Keep only full 12-month periods.</strong> Leftover months don’t count. Eleven
              months late is no penalty. Twenty-three months late is one period, not two.
            </li>
            <li>
              <strong>Apply 10% per period.</strong> Multiply it against the standard premium for
              that year. Medicare rounds to the nearest 10 cents.
            </li>
          </ol>
          <p className={P} style={PS}>
            Here’s Medicare’s own example. Someone goes 24 months without Part B and has no Special
            Enrollment Period. That’s two full periods, so a 20% penalty. On the 2026 premium of{" "}
            {formatMoney(PREMIUM)}, that’s $40.58 extra. The monthly premium becomes $243.48,
            rounded to $243.50.
          </p>
          <p className={P} style={PS}>
            Here’s how it plays out at different lengths, using 2026 figures.
          </p>
          <div className="mt-6 overflow-x-auto">
            <ResponsiveTable className="w-full min-w-[520px] border-collapse text-left">
              <caption className="sr-only">
                2026 Part B monthly premium by number of months without Part B
              </caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Months without Part B
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Full periods
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Penalty
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    2026 monthly premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-gray-300 align-top">
                    <th scope="row" className="text-16 py-4 pr-4 font-semibold whitespace-nowrap">
                      {row.label}
                    </th>
                    <td className="text-16 py-4 pr-4">{row.periods}</td>
                    <td className="text-16 py-4 pr-4">{row.percent}%</td>
                    <td className="text-16 py-4 font-semibold whitespace-nowrap">
                      {formatMoney(row.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </ResponsiveTable>
          </div>
          <p className={P} style={PS}>
            One more thing people miss. The penalty is a percentage, not a fixed dollar amount. When
            the standard premium changes, your penalty changes with it. The 2027 premium hadn’t been
            published when this page was updated.
          </p>

          <h2 className={H2} style={H2S}>
            When you won’t owe it
          </h2>
          <p className={P} style={PS}>
            <strong>You had job-based coverage from current work.</strong> If you or your spouse are
            still working and covered by that employer’s plan, you can usually wait. Once the job or
            the coverage ends, whichever comes first, you get an 8-month Special Enrollment Period.
            Sign up inside those 8 months and there’s usually no penalty.
          </p>
          <p className={P} style={PS}>
            <strong>You qualify for a Medicare Savings Program.</strong> These state programs help
            people with limited income pay Medicare costs. Medicare.gov says you generally won’t pay
            a Part B penalty if you enroll in one.
          </p>

          <h2 className={H2} style={H2S}>
            Where people get caught
          </h2>
          <p className={P} style={PS}>
            <strong>COBRA.</strong> The 8-month clock starts when you stop working. Choosing COBRA
            doesn’t pause it. If you wait for COBRA to run out, your window may already be closed.
          </p>
          <p className={P} style={PS}>
            <strong>Retiree coverage.</strong> A retiree plan isn’t coverage from current work. It
            doesn’t give you a Special Enrollment Period when it ends.
          </p>
          <p className={P} style={PS}>
            <strong>Small employers.</strong> If your employer has fewer than 20 employees, Medicare
            generally pays first and the job’s plan pays second. Skipping Part B could leave bills
            the employer plan won’t cover. Ask the benefits office before you delay.
          </p>
          <p className={P} style={PS}>
            <strong>Missing the first window.</strong> Your first chance to sign up runs seven
            months. It starts 3 months before the month you turn 65 and ends 3 months after it. The{" "}
            <Link href="/turning-65" className="home-link">
              turning 65 guide
            </Link>{" "}
            walks through it month by month.
          </p>

          <h2 className={H2} style={H2S}>
            If you already missed your window
          </h2>
          <p className={P} style={PS}>
            You can still sign up during the General Enrollment Period, January 1 through March 31
            each year. Coverage starts the month after you sign up. That can leave a gap in
            coverage, and the penalty may apply.
          </p>
          <p className={P} style={PS}>
            Think the penalty is wrong? A common reason is employer coverage that wasn’t counted.
            Contact Social Security and ask how to request a reconsideration. Have proof of your
            coverage dates ready.
          </p>

          <h2 className={H2} style={H2S}>
            A quick word on Part A
          </h2>
          <p className={P} style={PS}>
            If you have to buy Part A and sign up late, your Part A premium may go up 10%. That
            penalty lasts twice the number of years you didn’t sign up.
          </p>

          <h3 className="text-19 mt-10 font-semibold" style={{ marginTop: "2.5rem" }}>
            Sources
          </h3>
          <ul
            style={{ marginTop: "0.75rem" }}
            className="text-16 mt-3 list-disc space-y-1 pl-6 text-[var(--color-ink-muted)]"
          >
            {SOURCES.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  className="home-link"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-section home-rule-top">
        <div className="personal-shell home-faq">
          <div className="home-faq-intro">
            <p className="home-eyebrow">Not sure your coverage counted?</p>
            <h2>The exceptions matter more than the arithmetic.</h2>
            <p>
              If you’re not sure your coverage counted, or whether your clock already ran out, I can
              go through your dates with you. I’m a licensed agent in Greensboro.
            </p>
            <Link href="/aep" className="home-link">
              Book a time with me
            </Link>
            <p style={{ marginTop: "0.5rem" }}>
              or call or text <a href={AGENT.phoneHref}>{AGENT.phone}</a>
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
      <MedicareByline reviewed={UPDATED} />
      <RelatedMedicareGuides />
    </main>
  );
}
