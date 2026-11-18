import "../tools/tools.css";

import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import {
  FaqList,
  PlainClose,
  PlainHeader,
  SourceList,
  TextByline,
} from "@/app/components/PlainPageParts";
import { ResponsiveTable } from "@/app/components/ResponsiveTable";
import {
  MA_PART_D_DEDUCTIBLE,
  PART_B_DEDUCTIBLE,
  PART_B_MONTHLY,
} from "@/app/greensboro-medicare-cost-calculator/data";
import { STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import {
  CMS_PART_D_SOURCE,
  CMS_PARTS_AB_2027_SOURCE,
  CMS_PARTS_AB_SOURCE,
  PART_B_2026,
  PART_D_2026,
} from "@/lib/medicareCosts2026";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

/**
 * How much does Medicare cost in Greensboro, NC?
 *
 * A plain answer page for the local question. It states only figures that
 * Medicare sets for the whole country, each with its year and status:
 *
 * 2026, final (CMS fact sheet, November 14, 2025, and CMS Final CY 2026
 * Part D Redesign Program Instructions; constants in lib/irmaa.ts and
 * lib/medicareCosts2026.ts):
 *   Part B premium $202.90, Part B deductible $283, Part D maximum deductible
 *   $615, Part D out-of-pocket cap $2,100.
 * 2027, final (CMS 2027 Rate Announcement, April 6, 2026, Table V-2):
 *   Part D maximum deductible $700, Part D out-of-pocket cap $2,400.
 * 2027, final (CMS final contract year 2027 Part C standards, April 2026;
 * figures supplied in the build brief, not re-opened for this page):
 *   Medicare Advantage maximum out-of-pocket limit $9,850 in network,
 *   $14,800 combined.
 * 2027, FINAL (CMS, 2027 Medicare Parts A & B Premiums and Deductibles,
 * announced November 17, 2026):
 *   Part B premium $209.40, Part B deductible $292.
 *
 * It names no plan and no insurance company, and gives no plan price.
 */

const PATH = "/medicare-cost-greensboro-nc";
const REVIEWED = "2026-11-19";
const REVIEWED_LABEL = "November 19, 2026";

/** Final. CMS 2027 Rate Announcement, Table V-2. */
const PART_D_CAP_2027 = 2400;
/** Final for 2027. The highest yearly maximum a Medicare Advantage plan may set. */
const MA_MAX_IN_NETWORK_2027 = 9850;
const MA_MAX_COMBINED_2027 = 14800;

function money(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
const whole = (value: number) => `$${value.toLocaleString("en-US")}`;

const PART_B_2026_PREMIUM = money(STANDARD_BASE_PREMIUM_2026);
const PART_B_2027_PREMIUM = money(PART_B_MONTHLY);

const title = "How Much Does Medicare Cost in Greensboro, NC? (2026 and 2027)";
const description = "The costs Medicare sets are the same in Greensboro as everywhere: $209.40 a month for Part B in 2027. See what is set and what depends on your county.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "How much does Medicare cost in Greensboro, NC?",
    description,
    path: PATH,
  }),
  twitter: pageTwitter({ title: "How much does Medicare cost in Greensboro, NC?", description }),
};

const SET_COSTS: ReadonlyArray<{
  figure: string;
  y2026: string;
  y2027: string;
  status: string;
}> = [
  {
    figure: "Part B premium, each month",
    y2026: PART_B_2026_PREMIUM,
    y2027: PART_B_2027_PREMIUM,
    status: "2027 is final. CMS announced it November 17, 2026.",
  },
  {
    figure: "Part B deductible, each year",
    y2026: whole(PART_B_2026.annualDeductible),
    y2027: whole(PART_B_DEDUCTIBLE),
    status: "2027 is final. CMS announced it November 17, 2026.",
  },
  {
    figure: "Part D deductible, the most a drug plan may charge",
    y2026: whole(PART_D_2026.maximumDeductible),
    y2027: whole(MA_PART_D_DEDUCTIBLE),
    status: "Both years are final.",
  },
  {
    figure: "Part D yearly limit on what you pay for covered drugs",
    y2026: whole(PART_D_2026.outOfPocketCap),
    y2027: whole(PART_D_CAP_2027),
    status: "Both years are final.",
  },
  {
    figure: "Medicare Advantage: the highest yearly maximum a plan may set, in-network care",
    y2026: "Not listed here",
    y2027: whole(MA_MAX_IN_NETWORK_2027),
    status: "2027 is final. A plan may set a lower maximum.",
  },
  {
    figure: "Medicare Advantage: the same maximum for in-network and out-of-network care together",
    y2026: "Not listed here",
    y2027: whole(MA_MAX_COMBINED_2027),
    status: "2027 is final. A plan may set a lower maximum.",
  },
];

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Is Medicare more expensive in Greensboro than in other cities?",
    a: "The costs that Medicare sets are the same everywhere in the country. What changes with your address is the list of plans you can buy and what those plans charge. Plans are approved county by county, so Guilford County has its own list.",
  },
  {
    q: "How much is Medicare Part B in Greensboro in 2026?",
    a: `The standard Part B premium in 2026 is ${PART_B_2026_PREMIUM} a month, and the Part B deductible is ${whole(PART_B_2026.annualDeductible)} for the year. People with higher income pay more for Part B.`,
  },
  {
    q: "What will Part B cost in 2027?",
    a: `CMS announced the final 2027 amounts on November 17, 2026. The standard premium is ${PART_B_2027_PREMIUM} a month and the deductible is ${whole(PART_B_DEDUCTIBLE)} for the year.`,
  },
  {
    q: "Is there a limit on what I pay for prescriptions?",
    a: `Yes. With Medicare drug coverage, there is a yearly limit on what you pay for covered drugs. It is ${whole(PART_D_2026.outOfPocketCap)} in 2026 and ${whole(PART_D_CAP_2027)} in 2027. Plan premiums do not count toward the limit.`,
  },
  {
    q: "Do I pay for Part A?",
    a: "Most people do not pay a monthly premium for Part A, because they or a spouse paid Medicare taxes while they worked. Part A still has a deductible when you are admitted to a hospital.",
  },
  {
    q: "Does it cost anything to talk with you about my costs?",
    a: "No. There is no cost and no obligation. You can ask your questions and take your time to decide.",
  },
];

const SOURCES = [
  { title: CMS_PARTS_AB_SOURCE.title, url: CMS_PARTS_AB_SOURCE.url, note: "(2026 Part B)" },
  { title: CMS_PART_D_SOURCE.title, url: CMS_PART_D_SOURCE.url, note: "(2026 Part D)" },
  {
    title:
      "CMS: Announcement of Calendar Year 2027 Medicare Advantage Capitation Rates and Part C and Part D Payment Policies, April 6, 2026",
    url: "https://www.cms.gov/files/document/2027-announcement.pdf",
    note: "(2027 Part D, Table V-2)",
  },
  {
    title: CMS_PARTS_AB_2027_SOURCE.title,
    url: CMS_PARTS_AB_2027_SOURCE.url,
    note: "(2027 Part A and Part B)",
  },
  {
    title:
      "CMS: final contract year 2027 standards for Medicare Advantage maximum out-of-pocket limits, April 2026",
  },
];

const P = "text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]";
const H2 = "text-28 font-semibold";

export default function MedicareCostGreensboroPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare costs", path: "/medicare-costs" },
              { name: "Medicare cost in Greensboro", path: PATH },
            ]),
            articleJsonLd({
              headline: title,
              description,
              path: PATH,
              datePublished: REVIEWED,
              dateModified: REVIEWED,
            }),
            faqJsonLd(FAQS),
          ]),
        }}
      />

      <PlainHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Medicare costs", href: "/medicare-costs" },
          { name: "Medicare cost in Greensboro" },
        ]}
        title="How much does Medicare cost in Greensboro, NC?"
        lede="Your Medicare costs come in two groups. Medicare sets the first group, and those costs are the same in Greensboro as in every other city. The second group depends on the plan you choose, and plans are different in each county."
        short={`In 2026 the standard Part B premium is ${PART_B_2026_PREMIUM} a month and the Part B deductible is ${whole(PART_B_2026.annualDeductible)} for the year. Your address does not change those amounts. Your address changes which plans you can buy in Guilford County and what those plans charge.`}
      />

      <section className="bg-white py-10">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className={H2}>The costs that are the same everywhere</h2>
          <p className={P}>
            Medicare sets these amounts for the whole country. Each amount shows its year. The last
            column tells you if the amount is final. Last checked{" "}
            {REVIEWED_LABEL}.
          </p>
        </div>
        <div className="app-shell max-w-5xl">
          <div className="t-table-wrap">
            <ResponsiveTable className="t-table">
              <thead>
                <tr>
                  <th>Cost</th>
                  <th>2026</th>
                  <th>2027</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {SET_COSTS.map((row) => (
                  <tr key={row.figure}>
                    <td>
                      <strong>{row.figure}</strong>
                    </td>
                    <td>{row.y2026}</td>
                    <td>{row.y2027}</td>
                    <td className="t-hint">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </ResponsiveTable>
          </div>
        </div>
        <div className="measure-prose app-shell max-w-3xl">
          <p className={P}>
            Most people do not pay a monthly premium for Part A, which is hospital coverage. Almost
            everyone pays the Part B premium, with any type of plan.
          </p>
          <p className={P}>
            If your income is higher, Medicare adds an extra amount to Part B and to drug coverage.{" "}
            <Link href="/irmaa-checker" className="underline underline-offset-2">
              Check your income with the IRMAA checker
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className={H2}>The costs that depend on your county</h2>
          <p className={P}>
            Private plans add to Medicare or replace how you get it. Medicare approves these plans
            county by county. A person in Greensboro chooses from the Guilford County list. A
            person in a nearby county has a different list.
          </p>
          <p className={P}>These things change from one plan to the next:</p>
          <ul className={`${P} list-disc space-y-2 pl-5`}>
            <li>The monthly premium the plan charges.</li>
            <li>The copays you pay when you see a doctor or go to a hospital.</li>
            <li>Which doctors and hospitals the plan works with.</li>
            <li>Which drugs the plan covers, and what you pay for each one.</li>
            <li>The most you can pay in a year for covered care.</li>
          </ul>
          <p className={P}>
            This is why two neighbors in Greensboro can pay very different amounts. The plan
            matters, and so do the doctors and the drugs each person needs.
          </p>

          <h2 className={`${H2} mt-12`}>How your monthly bill is put together</h2>
          <p className={P}>There are two common ways to set up your coverage.</p>
          <p className={P}>
            <strong>Original Medicare with added coverage.</strong> You pay the Part B premium. You
            can add a Medicare Supplement policy and a separate drug plan. That means two more
            premiums each month. In return, you pay less when you get care.
          </p>
          <p className={P}>
            <strong>A Medicare Advantage plan.</strong> You pay the Part B premium and the premium
            for the plan, if it has one. You pay copays when you get care, up to the plan&apos;s
            yearly maximum. Most of these plans include drug coverage.
          </p>
          <p className={P}>
            Neither way is right for everyone. The better fit depends on your health, your doctors,
            your drugs, and your budget.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className={H2}>Estimate your own year</h2>
          <p className={P}>
            Two tools on this site can help you before you talk with anyone. Both give estimates
            for education. Neither one recommends a plan.
          </p>
          <ul className={`${P} list-disc space-y-2 pl-5`}>
            <li>
              <Link
                href="/greensboro-medicare-cost-calculator"
                className="underline underline-offset-2"
              >
                The Greensboro Medicare cost calculator
              </Link>{" "}
              estimates one year of costs for the two ways to set up coverage.
            </li>
            <li>
              <Link href="/plan-checklist-tool" className="underline underline-offset-2">
                The plan research checklist
              </Link>{" "}
              helps you list your doctors, your drugs, and your pharmacy on one sheet.
            </li>
          </ul>

          <h2 className={`${H2} mt-12`}>What is final for 2027</h2>
          <p className={P}>
            The 2027 amounts on this page are final. CMS announced the Part B premium and
            deductible on November 17, 2026. The 2027 drug coverage amounts are final too. For
            more detail, read{" "}
            <Link href="/medicare-costs-2027" className="underline underline-offset-2">
              Medicare costs for 2027
            </Link>
            .
          </p>
        </div>
      </section>

      <FaqList heading="Questions about Medicare costs in Greensboro" items={FAQS} />

      <SourceList sources={SOURCES} />

      <PlainClose
        heading="Would you like to go through your own costs?"
        body="Bring your list of doctors, your drugs, and your pharmacy. We can meet at your home, at a public place in Greensboro, or by phone. A spouse or family member is welcome."
      />

      <div className="app-shell max-w-3xl" style={{ marginTop: "2rem" }}>
        <ComplianceDisclosure variant="medicare" showEstimateNote />
      </div>
      <TextByline reviewed={REVIEWED} />
    </main>
  );
}
