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
  IRMAA_CHECKER_TAX_YEAR,
  IRMAA_CHECKER_YEAR,
  irmaaTableRows,
} from "@/lib/irmaaChecker";
import { SEPARATE_RETURN_IRMAA_2027 } from "@/lib/irmaaMarried2027";
import { CMS_PARTS_AB_SOURCE_2027 } from "@/lib/medicareCosts2027";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

/**
 * IRMAA for married couples.
 *
 * Answers the searches "IRMAA married filing jointly 2026" and "IRMAA married
 * filing separately". The joint amounts come from lib/irmaa.ts and
 * lib/medicareCosts2027.ts through irmaaTableRows(). The separate-return
 * amounts come from lib/irmaaMarried2027.ts. Both cite the CMS fact sheet
 * "2027 Medicare Parts A & B Premiums and Deductibles" (November 17, 2026):
 * https://www.cms.gov/newsroom/fact-sheets/2027-medicare-parts-b-premiums-deductibles
 *
 * 2027 amounts are shown. CMS released them on November 17, 2026.
 */

const PATH = "/irmaa-married-filing-jointly";
const YEAR = IRMAA_CHECKER_YEAR;
const TAX_YEAR = IRMAA_CHECKER_TAX_YEAR;

const rows = irmaaTableRows();
const wholeDollars = (value: number) => `$${value.toLocaleString("en-US")}`;
// The top of the standard bracket is the line where the first tier starts.
const JOINT_FIRST_LINE = wholeDollars(getBrackets("married_jointly")[0].maxIncome ?? 0);
const SINGLE_FIRST_LINE = wholeDollars(getBrackets("individual")[0].maxIncome ?? 0);

const title = `IRMAA for Married Couples ${YEAR}: Joint and Separate Return Limits`;
const description = `The ${YEAR} IRMAA income limits for a joint return and for a separate return. See what each spouse pays for Part B and Part D.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: `IRMAA for married couples in ${YEAR}`,
    description,
    path: PATH,
  }),
  twitter: pageTwitter({ title: `IRMAA for married couples in ${YEAR}`, description }),
};

function money(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

const tierOne = rows[1];
const tierOneEach = tierOne.partBSurcharge + tierOne.partDSurcharge;

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: `What is the IRMAA income limit for a married couple in ${YEAR}?`,
    a: `On a joint return, IRMAA starts when your ${TAX_YEAR} income is more than ${JOINT_FIRST_LINE}. At ${JOINT_FIRST_LINE} or less, each spouse pays the standard Part B premium of ${money(rows[0].partBPremium)} a month and no surcharge.`,
  },
  {
    q: "Do both spouses pay IRMAA?",
    a: "Yes, if both have Medicare. IRMAA is charged for each person. Each spouse pays the Part B amount and the Part D amount for the couple's tier.",
  },
  {
    q: "What if only one of us has Medicare?",
    a: "Then only that spouse pays. Social Security still uses the income on the joint return to choose the tier, so the income of the spouse who does not have Medicare counts.",
  },
  {
    q: "What are the limits if we file separate returns?",
    a: `If you lived with your spouse at any time during the year and file separately, the surcharge starts when income is more than ${SINGLE_FIRST_LINE}. Above that line the Part B premium is ${money(SEPARATE_RETURN_IRMAA_2027[1].partBPremium)} a month, and the Part D surcharge is ${money(SEPARATE_RETURN_IRMAA_2027[1].partDSurcharge)} a month.`,
  },
  {
    q: "What happens to IRMAA after my spouse dies?",
    a: `The income limit goes down from the joint amount to the single amount. For ${YEAR} that is a change from ${JOINT_FIRST_LINE} to ${SINGLE_FIRST_LINE}. If your income went down because of the death, you can ask Social Security to use a more recent year. The death of a spouse is one of the life-changing events on Form SSA-44.`,
  },
  {
    q: "Are the 2027 limits for married couples available?",
    a: "Yes. CMS released them on November 17, 2026. On a joint return, the 2027 surcharge starts when 2025 income is more than $224,000.",
  },
];

const SOURCES = [
  { title: CMS_PARTS_AB_SOURCE_2027.title, url: CMS_PARTS_AB_SOURCE_2027.url },
  {
    title:
      "Social Security: Form SSA-44, Medicare Income-Related Monthly Adjustment Amount, Life-Changing Event",
    url: "https://www.ssa.gov/forms/ssa-44.pdf",
  },
];

const P = "text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]";
const H2 = "text-28 font-semibold";

export default function IrmaaMarriedPage() {
  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare costs", path: "/medicare-costs" },
              { name: "IRMAA for married couples", path: PATH },
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
          { name: "IRMAA for married couples" },
        ]}
        title={`IRMAA for married couples in ${YEAR}`}
        lede="IRMAA is an extra amount that Medicare adds to your Part B and Part D premiums when your income is above a set limit. For a married couple, the limit depends on how you file your tax return."
        short={`On a joint return, IRMAA starts when your ${TAX_YEAR} income is more than ${JOINT_FIRST_LINE}. Each spouse who has Medicare pays the surcharge. If you file separate returns and lived together during the year, it starts at ${SINGLE_FIRST_LINE}.`}
      />

      <section className="bg-white py-10">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className={H2}>The {YEAR} limits for a joint return</h2>
          <p className={P}>
            These are the official {YEAR} amounts from CMS. They use the income on your {TAX_YEAR}{" "}
            tax return. The premium and the surcharge are for one person, for one month. The last
            column shows the extra amount when both spouses have Medicare.
          </p>
        </div>
        <div className="app-shell max-w-5xl">
          <div className="t-table-wrap">
            <ResponsiveTable className="t-table">
              <thead>
                <tr>
                  <th>Joint return income</th>
                  <th>Part B premium, each</th>
                  <th>Part D surcharge, each</th>
                  <th>Extra for two people, a month</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.tier}>
                    <td>
                      <strong>{row.joint}</strong>
                    </td>
                    <td>{money(row.partBPremium)}</td>
                    <td>{row.partDSurcharge > 0 ? `+${money(row.partDSurcharge)}` : "$0.00"}</td>
                    <td>
                      {row.tier === 0
                        ? "$0.00"
                        : money(2 * (row.partBSurcharge + row.partDSurcharge))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </ResponsiveTable>
          </div>
        </div>
        <div className="measure-prose app-shell max-w-3xl">
          <p className={P}>
            An example. A couple has {TAX_YEAR} income of $230,000 on a joint return. That is in
            the first tier. Each spouse pays {money(tierOne.partBPremium)} a month for Part B, and{" "}
            {money(tierOne.partDSurcharge)} a month is added to each drug plan premium. The extra
            amount is {money(tierOneEach)} a month for each spouse, or {money(2 * tierOneEach)} a
            month for the two of them.
          </p>
          <p className={P}>
            <Link href="/irmaa-checker" className="underline underline-offset-2">
              Check your own tier with the IRMAA checker
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className={H2}>Each spouse pays a separate surcharge</h2>
          <p className={P}>
            IRMAA is charged for each person, not for each household. If both of you have Medicare,
            both of you pay it. If only one of you has Medicare, only that spouse pays it.
          </p>
          <p className={P}>
            The tier comes from the income on the joint return. So the income of a spouse who is
            still at work, and who does not have Medicare yet, can put the other spouse in a higher
            tier.
          </p>

          <h2 className={`${H2} mt-12`}>If you file separate returns</h2>
          <p className={P}>
            Different limits apply to people who are married, lived with their spouse at any time
            during the year, and file separate returns. There are only three steps, and the
            surcharge is large as soon as income is more than {SINGLE_FIRST_LINE}.
          </p>
        </div>
        <div className="app-shell max-w-3xl">
          <div className="t-table-wrap">
            <ResponsiveTable className="t-table">
              <thead>
                <tr>
                  <th>Separate return income</th>
                  <th>Part B premium</th>
                  <th>Part D surcharge</th>
                </tr>
              </thead>
              <tbody>
                {SEPARATE_RETURN_IRMAA_2027.map((row) => (
                  <tr key={row.income}>
                    <td>
                      <strong>{row.income}</strong>
                    </td>
                    <td>{money(row.partBPremium)}</td>
                    <td>{row.partDSurcharge > 0 ? `+${money(row.partDSurcharge)}` : "$0.00"}</td>
                  </tr>
                ))}
              </tbody>
            </ResponsiveTable>
          </div>
        </div>
        <div className="measure-prose app-shell max-w-3xl">
          <p className={P}>
            This table is for people who lived with their spouse at some time during the tax year.
            If you lived apart for the whole year, tell Social Security. Different limits can
            apply to you.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className={H2}>After a spouse dies</h2>
          <p className={P}>
            When a spouse dies, the surviving spouse later files as a single person. The income
            limit then goes down from the joint amount to the single amount. For {YEAR} that is a
            change from {JOINT_FIRST_LINE} to {SINGLE_FIRST_LINE}.
          </p>
          <p className={P}>
            Household income does not always go down by half. Pensions, savings, and required
            withdrawals from retirement accounts can stay about the same. So a surviving spouse can
            start to pay IRMAA with the same income, or with less income, than the couple had.
          </p>
          <p className={P}>
            The timing follows the tax returns. A joint return is usually filed for the year of the
            death. Social Security uses that return two years later. The year after that, it uses
            the first single return.
          </p>
          <p className={P}>
            If your income went down because your spouse died, you can ask Social Security to use a
            more recent year. The death of a spouse is one of the life-changing events on Form
            SSA-44.{" "}
            <Link href="/irmaa-appeal" className="underline underline-offset-2">
              Read how to ask Social Security for a new decision
            </Link>
            .
          </p>

          <h2 className={`${H2} mt-12`}>Which tax year counts</h2>
          <p className={P}>
            Social Security uses the tax return from two years before. For {YEAR} premiums, that is
            your {TAX_YEAR} return. The number it uses is your adjusted gross income plus any
            tax-exempt interest. The decision is made again each year.
          </p>
          <p className={P}>
            For the full table for single filers, read{" "}
            <Link href="/guides/irmaa-brackets-2026" className="underline underline-offset-2">
              the {YEAR} IRMAA brackets
            </Link>
            . For the surcharge on drug coverage, read{" "}
            <Link href="/part-d-irmaa" className="underline underline-offset-2">
              Part D IRMAA
            </Link>
            .
          </p>
        </div>
      </section>

      <FaqList heading="Questions married couples ask about IRMAA" items={FAQS} />

      <SourceList sources={SOURCES} />

      <PlainClose
        heading="Do you have a question about your own tax return?"
        body="Bring your Social Security notice and your most recent tax return. I will explain which tier applies to each of you and what you can do next. I am an insurance agent, not a tax adviser, so ask your tax preparer before you change how you file."
      />

      <div className="app-shell max-w-3xl" style={{ marginTop: "2rem" }}>
        <ComplianceDisclosure variant="medicare" showEstimateNote />
      </div>
      <TextByline reviewed={IRMAA_CHECKER_CHECKED} />
    </main>
  );
}
