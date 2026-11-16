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
import { getBrackets } from "@/lib/irmaa";
import {
  IRMAA_CHECKER_CHECKED,
  IRMAA_CHECKER_CHECKED_LABEL,
  IRMAA_CHECKER_TAX_YEAR,
  IRMAA_CHECKER_YEAR,
  irmaaTableRows,
} from "@/lib/irmaaChecker";
import { CMS_PART_D_SOURCE, CMS_PARTS_AB_SOURCE, PART_D_2026 } from "@/lib/medicareCosts2026";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

/**
 * Part D IRMAA: the income surcharge on drug coverage.
 *
 * Answers the searches "Part D IRMAA 2026" and "why is Medicare billing me
 * for Part D". Amounts come from lib/medicareCosts2026.ts through
 * irmaaTableRows(), which cites the CMS fact sheet "2026 Medicare Parts A & B
 * Premiums and Deductibles" (November 14, 2025).
 *
 * How it is billed comes from the Medicare.gov fact sheet "How income affects
 * your Medicare drug coverage premiums" (publication 11469), read
 * November 15, 2026.
 *
 * The 2027 out-of-pocket cap ($2,400) is final: CMS 2027 Rate Announcement,
 * April 6, 2026, Table V-2.
 */

const PATH = "/part-d-irmaa";
const YEAR = IRMAA_CHECKER_YEAR;
const TAX_YEAR = IRMAA_CHECKER_TAX_YEAR;

/** Final. CMS 2027 Rate Announcement, Table V-2. */
const PART_D_CAP_2027 = 2400;

const rows = irmaaTableRows();
const surcharges = rows.filter((row) => row.partDSurcharge > 0).map((row) => row.partDSurcharge);
const LOWEST = Math.min(...surcharges);
const HIGHEST = Math.max(...surcharges);

function money(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
const whole = (value: number) => `$${value.toLocaleString("en-US")}`;
// The top of the standard bracket is the line where the first tier starts.
const SINGLE_FIRST_LINE = whole(getBrackets("individual")[0].maxIncome ?? 0);
const JOINT_FIRST_LINE = whole(getBrackets("married_jointly")[0].maxIncome ?? 0);

const title = `Part D IRMAA ${YEAR}: The Income Surcharge on Drug Coverage`;
const description = `Part D IRMAA adds ${money(LOWEST)} to ${money(HIGHEST)} a month to drug coverage when income is above a set limit. See the ${YEAR} table, who pays it, and how Medicare bills it.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({ title: `Part D IRMAA in ${YEAR}`, description, path: PATH }),
  twitter: pageTwitter({ title: `Part D IRMAA in ${YEAR}`, description }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "What is Part D IRMAA?",
    a: `It is an extra monthly amount for Medicare drug coverage that people with higher income pay. In ${YEAR} it is ${money(LOWEST)} to ${money(HIGHEST)} a month for one person. It is added to the premium your drug plan charges.`,
  },
  {
    q: "Do I pay Part D IRMAA if my drug plan has a $0 premium?",
    a: "Yes. The surcharge does not depend on what your plan charges. If your income is above the limit, you pay the surcharge even when the plan premium is $0.",
  },
  {
    q: "Do I pay it if my drug coverage is part of a Medicare Advantage plan?",
    a: "Yes. The surcharge applies to any Medicare drug coverage. That includes drug coverage that is part of a Medicare Advantage plan.",
  },
  {
    q: "Why did I get a bill from Medicare and not from my plan?",
    a: "You pay your plan premium to the plan. You pay Part D IRMAA to Medicare. Medicare normally takes it out of your Social Security payment. If that payment is not large enough, or if you do not get one, Medicare sends you a bill.",
  },
  {
    q: "Does Part D IRMAA count toward the yearly limit on drug costs?",
    a: `No. The yearly limit is on what you pay for covered drugs: ${whole(PART_D_2026.outOfPocketCap)} in ${YEAR} and ${whole(PART_D_CAP_2027)} in 2027. Premiums and the surcharge do not count toward that limit.`,
  },
  {
    q: "Can the surcharge be removed?",
    a: "It is decided again each year from your tax return. If your income went down because of a life-changing event, such as retirement or the death of a spouse, you can ask Social Security to use a more recent year with Form SSA-44.",
  },
];

const SOURCES = [
  { title: CMS_PARTS_AB_SOURCE.title, url: CMS_PARTS_AB_SOURCE.url },
  {
    title: "Medicare.gov: How income affects your Medicare drug coverage premiums (fact sheet 11469)",
    url: "https://www.medicare.gov/publications/11469-income-and-drug-premiums.pdf",
  },
  { title: CMS_PART_D_SOURCE.title, url: CMS_PART_D_SOURCE.url, note: `(${YEAR} yearly limit on drug costs)` },
  {
    title:
      "CMS: Announcement of Calendar Year 2027 Medicare Advantage Capitation Rates and Part C and Part D Payment Policies, April 6, 2026",
    url: "https://www.cms.gov/files/document/2027-announcement.pdf",
    note: "(2027 yearly limit on drug costs, Table V-2)",
  },
];

const P = "text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]";
const H2 = "text-28 font-semibold";

export default function PartDIrmaaPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare costs", path: "/medicare-costs" },
              { name: "Part D IRMAA", path: PATH },
            ]),
            articleJsonLd({
              headline: title,
              description,
              path: PATH,
              datePublished: IRMAA_CHECKER_CHECKED,
              dateModified: IRMAA_CHECKER_CHECKED,
            }),
            faqJsonLd(FAQS),
          ]),
        }}
      />

      <PlainHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Medicare costs", href: "/medicare-costs" },
          { name: "Part D IRMAA" },
        ]}
        title={`Part D IRMAA in ${YEAR}: the extra amount for drug coverage`}
        lede="Part D is Medicare drug coverage. If your income is above a set limit, Medicare adds an extra monthly amount to it. The name for that amount is Part D IRMAA."
        short={`In ${YEAR} the Part D surcharge is ${money(LOWEST)} to ${money(HIGHEST)} a month for one person. It starts when your ${TAX_YEAR} income is more than ${SINGLE_FIRST_LINE} on a single return or ${JOINT_FIRST_LINE} on a joint return. You pay it to Medicare, not to your drug plan.`}
      />

      <section className="bg-white py-10">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className={H2}>The {YEAR} Part D IRMAA table</h2>
          <p className={P}>
            These are the official {YEAR} amounts from CMS. They use the income on your {TAX_YEAR}{" "}
            tax return. Each amount is for one person.
          </p>
        </div>
        <div className="app-shell max-w-5xl">
          <div className="t-table-wrap">
            <ResponsiveTable className="t-table">
              <thead>
                <tr>
                  <th>Single filer income</th>
                  <th>Joint return income</th>
                  <th>Added each month</th>
                  <th>Added for the year</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.tier}>
                    <td>
                      <strong>{row.individual}</strong>
                    </td>
                    <td>{row.joint}</td>
                    <td>{row.partDSurcharge > 0 ? `+${money(row.partDSurcharge)}` : "$0.00"}</td>
                    <td>{row.partDSurcharge > 0 ? money(row.partDSurcharge * 12) : "$0.00"}</td>
                  </tr>
                ))}
              </tbody>
            </ResponsiveTable>
          </div>
        </div>
        <div className="measure-prose app-shell max-w-3xl">
          <p className={P}>
            The same income limits also decide the surcharge on Part B. A person in a tier pays
            both.{" "}
            <Link href="/irmaa-checker" className="underline underline-offset-2">
              The IRMAA checker shows both amounts for your income
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className={H2}>Who pays it</h2>
          <p className={P}>
            You pay it if you have Medicare drug coverage and your income is above the limit. It
            does not matter which drug plan you have or what the plan charges.
          </p>
          <ul className={`${P} list-disc space-y-2 pl-5`}>
            <li>You pay it when your drug plan has a $0 premium.</li>
            <li>
              You pay it when your drug coverage is part of a Medicare Advantage plan.
            </li>
            <li>
              You pay it when your Medicare drug coverage comes through an employer or a former
              employer.
            </li>
            <li>Each spouse who has Medicare drug coverage pays a separate surcharge.</li>
          </ul>

          <h2 className={`${H2} mt-12`}>How Medicare bills it</h2>
          <p className={P}>
            Your drug plan does not collect the surcharge. You pay your plan premium to the plan,
            and you pay the surcharge to Medicare.
          </p>
          <p className={P}>
            Medicare normally takes the surcharge out of your Social Security payment. If that
            payment is not large enough, or if you do not get one, Medicare sends you a bill. You
            must pay the surcharge to keep your drug coverage.
          </p>

          <h2 className={`${H2} mt-12`}>What the surcharge does not change</h2>
          <p className={P}>
            The surcharge is a premium cost. It does not change what your plan covers or what you
            pay at the pharmacy. It also does not count toward the yearly limit on what you pay for
            covered drugs. That limit is {whole(PART_D_2026.outOfPocketCap)} in {YEAR} and{" "}
            {whole(PART_D_CAP_2027)} in 2027.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className={H2}>If your income has gone down</h2>
          <p className={P}>
            Social Security uses the tax return from two years before, so the surcharge can be
            based on income you no longer have. If your income went down because of a life-changing
            event, you can ask Social Security to use a more recent year. One request covers both
            the Part B surcharge and the Part D surcharge.
          </p>
          <p className={P}>
            <Link href="/irmaa-appeal" className="underline underline-offset-2">
              Read how to ask Social Security for a new decision
            </Link>
            . For couples, read{" "}
            <Link href="/irmaa-married-filing-jointly" className="underline underline-offset-2">
              IRMAA for married couples
            </Link>
            .
          </p>
          <p className={P}>
            As of {IRMAA_CHECKER_CHECKED_LABEL}, CMS has not announced the 2027 Part D IRMAA
            amounts. This page shows {YEAR} amounts.
          </p>
        </div>
      </section>

      <FaqList heading="Questions about Part D IRMAA" items={FAQS} />

      <SourceList sources={SOURCES} />

      <PlainClose
        heading="Did you get a bill you do not understand?"
        body="Bring the notice from Social Security or the bill from Medicare. I will explain what it is for and what you can do next."
      />

      <div className="app-shell max-w-3xl" style={{ marginTop: "2rem" }}>
        <ComplianceDisclosure variant="medicare" showEstimateNote />
      </div>
      <TextByline reviewed={IRMAA_CHECKER_CHECKED} />
    </main>
  );
}
