import "../tools/tools.css";

import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { PlainClose, SourceList, TextByline } from "@/app/components/PlainPageParts";
import { ResponsiveTable } from "@/app/components/ResponsiveTable";
import { ToolTracking } from "@/app/tools/_components/tool-tracking";
import {
  IRMAA_CHECKER_CHECKED,
  IRMAA_CHECKER_TAX_YEAR,
  IRMAA_CHECKER_YEAR,
  irmaaTableRows,
} from "@/lib/irmaaChecker";
import { CMS_PARTS_AB_SOURCE_2027 } from "@/lib/medicareCosts2027";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  howToJsonLd,
  pageOpenGraph,
  pageTwitter,
} from "@/lib/seo";

import { IrmaaChecker } from "./IrmaaChecker";

/**
 * Standalone IRMAA checker.
 *
 * Every amount on this page comes from lib/irmaa.ts and
 * lib/medicareCosts2026.ts through lib/irmaaChecker.ts. Both files cite the
 * CMS fact sheet "2026 Medicare Parts A & B Premiums and Deductibles":
 * https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles
 *
 * The page shows 2026 amounts because CMS had not published 2027 amounts
 * when this was checked (see IRMAA_CHECKER_CHECKED).
 */

const PATH = "/irmaa-checker";
const YEAR = IRMAA_CHECKER_YEAR;
const TAX_YEAR = IRMAA_CHECKER_TAX_YEAR;

const title = `IRMAA Checker ${YEAR}: Find Your Medicare Income Surcharge`;
const description = `Choose your filing status and enter your income. See your ${YEAR} IRMAA tier and the Part B and Part D surcharge amounts from the official CMS table.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({ title: `${YEAR} IRMAA checker`, description, path: PATH }),
  twitter: pageTwitter({ title: `${YEAR} IRMAA checker`, description }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "What is IRMAA?",
    a: "IRMAA means Income-Related Monthly Adjustment Amount. It is an extra amount Medicare adds to your Part B premium and your Part D premium. It applies when your income is above a set limit. Most people do not pay it.",
  },
  {
    q: `Which income decides my ${YEAR} IRMAA?`,
    a: `Social Security uses the income on your ${TAX_YEAR} tax return. The number it uses is your adjusted gross income plus any tax-exempt interest.`,
  },
  {
    q: "Does each spouse pay the surcharge?",
    a: "Yes. IRMAA is charged for each person. If a married couple files a joint return and both have Medicare, each spouse pays the Part B amount and the Part D amount for their tier.",
  },
  {
    q: "What can I do if my income has gone down?",
    a: "If your income fell because of a life-changing event, you can ask Social Security to use a more recent year. Retirement, a cut in work hours, marriage, divorce, and the death of a spouse are examples. You make the request with Form SSA-44.",
  },
  {
    q: "Which year does this checker show?",
    a: "It shows 2027 amounts. CMS released them on November 17, 2026. They use the income on your 2025 tax return.",
  },
  {
    q: "What if my 2025 tax return is not ready yet?",
    a: "If your 2025 return is not available yet, Social Security may use your 2024 return.",
  },
  {
    q: "Is this result a decision about my premium?",
    a: "No. Social Security decides your premium and mails you a notice. This tool gives an estimate for education, so you can understand that notice or plan ahead.",
  },
  {
    q: "What if I am married and file a separate return?",
    a: "Married, lived with your spouse, and filed separately? In 2027 the surcharge starts above $112,000. The top amount starts at $388,000. This tool does not cover that case. Social Security can tell you your amount.",
  },
];

const HOW_TO = [
  {
    name: "Choose how you filed",
    text: `Choose single or married filing jointly, the way you filed your ${TAX_YEAR} tax return.`,
  },
  {
    name: "Enter your income",
    text: `Enter your adjusted gross income plus any tax-exempt interest from your ${TAX_YEAR} return.`,
  },
  {
    name: "Read your tier",
    text: `The tool shows your ${YEAR} IRMAA tier, your monthly Part B premium, and the monthly amount added to your Part D premium.`,
  },
  {
    name: "Decide your next step",
    text: "If your income has gone down since that tax year, read how to ask Social Security for a new decision. If you have a question, you can send your result to Christian.",
  },
] as const;

const SOURCES = [
  { title: CMS_PARTS_AB_SOURCE_2027.title, url: CMS_PARTS_AB_SOURCE_2027.url },
  {
    title: "Social Security: Form SSA-44, Medicare Income-Related Monthly Adjustment Amount, Life-Changing Event",
    url: "https://www.ssa.gov/forms/ssa-44.pdf",
  },
];

const P = "text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]";
const H2 = "text-28 font-semibold";

function money(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function IrmaaCheckerPage() {
  const rows = irmaaTableRows();

  return (
    <main className="pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare costs", path: "/medicare-costs" },
              { name: `${YEAR} IRMAA checker`, path: PATH },
            ]),
            articleJsonLd({
              headline: title,
              description,
              path: PATH,
              datePublished: IRMAA_CHECKER_CHECKED,
              dateModified: IRMAA_CHECKER_CHECKED,
            }),
            faqJsonLd(FAQS),
            howToJsonLd({
              name: `How to check your ${YEAR} IRMAA tier`,
              description,
              path: PATH,
              steps: HOW_TO,
            }),
          ]),
        }}
      />

      <header className="tool-header app-shell max-w-5xl">
        <nav aria-label="Breadcrumb">
          <ol className="text-15 flex flex-wrap gap-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <span aria-hidden>/ </span>
              <Link href="/medicare-costs">Medicare costs</Link>
            </li>
            <li>
              <span aria-hidden>/ </span>
              <span aria-current="page">{YEAR} IRMAA checker</span>
            </li>
          </ol>
        </nav>
        <h1 className="text-32 mt-3 font-semibold">Check your {YEAR} IRMAA tier</h1>
        <p className="text-17 mt-3">
          IRMAA is an extra amount that Medicare adds to your premiums when your income is above a
          set limit. Choose how you filed, enter your income, and see your tier and both surcharge
          amounts for {YEAR}.
        </p>
        <p className="text-15 mt-2">
          Your numbers stay on your device unless you choose to email them to me.
        </p>
      </header>

      <section className="bg-white py-6">
        <div className="app-shell max-w-5xl">
          <div className="t-disclaimer" role="note">
            <strong>This result is an estimate for education.</strong> Social Security decides your
            premium. All amounts are the official {YEAR} amounts from CMS.
          </div>
          <div className="t-panel" style={{ marginTop: "1rem" }}>
            <ToolTracking toolId="irmaa_checker">
              <IrmaaChecker />
            </ToolTracking>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className={H2}>The {YEAR} IRMAA table</h2>
          <p className={P}>
            These are the official {YEAR} amounts. They use the income on your {TAX_YEAR} tax
            return. Each amount is for one person, for one month.
          </p>
        </div>
        <div className="app-shell max-w-5xl">
          <div className="t-table-wrap">
            <ResponsiveTable className="t-table">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Single filer income</th>
                  <th>Joint return income</th>
                  <th>Part B premium</th>
                  <th>Part D surcharge</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.tier}>
                    <td>
                      <strong>{row.tier === 0 ? "Standard" : `Tier ${row.tier}`}</strong>
                    </td>
                    <td>{row.individual}</td>
                    <td>{row.joint}</td>
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
            The Part D amount is added to the premium your drug plan charges. You pay it to
            Medicare, not to the plan. It also applies when your drug coverage is part of a
            Medicare Advantage plan.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className={H2}>How to read your result</h2>
          <p className={P}>
            The tiers work like steps. If your income is one dollar above a line, you pay the full
            amount for the next tier for the whole year. The amount does not rise a little at a
            time.
          </p>
          <p className={P}>
            The decision is made again each year. A year with high income raises your premiums two
            years later. Selling a property or taking a large amount out of a retirement account are
            two examples. When your income goes back down, the surcharge goes away two years after
            that.
          </p>

          <h2 className={`${H2} mt-12`}>If your income has gone down</h2>
          <p className={P}>
            Social Security uses an old tax return because it is the newest one it has. If your
            income is lower now because of a life-changing event, you can ask Social Security to
            use a more recent year. Retirement and the death of a spouse are two common reasons.
          </p>
          <p className={P}>
            <Link href="/irmaa-appeal" className="underline underline-offset-2">
              Read how to ask Social Security for a new decision
            </Link>
            . To see the other Medicare costs for the year, read{" "}
            <Link href="/medicare-costs-2026" className="underline underline-offset-2">
              the {YEAR} Medicare costs
            </Link>
            .
          </p>
          <p className={P}>
            Are you married? Read{" "}
            <Link href="/irmaa-married-filing-jointly" className="underline underline-offset-2">
              IRMAA for married couples
            </Link>
            . For the surcharge on drug coverage, read{" "}
            <Link href="/part-d-irmaa" className="underline underline-offset-2">
              Part D IRMAA
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className={H2}>Questions about IRMAA</h2>
          <dl className="mt-8 flex flex-col gap-6">
            {FAQS.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-5">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className={`${P} mt-1`}>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SourceList sources={SOURCES} />

      <PlainClose
        heading="Do you have a question about your result?"
        body="Bring your Social Security notice or your tax return. I will explain what the notice means and what you can do next."
        phoneOnly
      />

      <div className="app-shell max-w-3xl" style={{ marginTop: "2rem" }}>
        <ComplianceDisclosure variant="medicare" showEstimateNote />
      </div>
      <TextByline reviewed={IRMAA_CHECKER_CHECKED} />
    </main>
  );
}
