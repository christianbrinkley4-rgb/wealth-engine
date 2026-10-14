import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { getBrackets, STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import {
  CMS_PARTS_AB_SOURCE,
  IRMAA_LOOKBACK_YEAR,
  PART_A_2026,
  PART_B_2026,
  PART_D_2026,
  PART_D_IRMAA_2026,
} from "@/lib/medicareCosts2026";
import { formatMoney } from "@/lib/partBPenalty";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Medicare Costs 2027: the reference page.
 *
 * Official CMS figures only. As of the review date below, CMS has published
 * the 2027 Part D deductible and out-of-pocket cap (CY 2027 Rate Announcement,
 * April 6, 2026) but NOT the 2027 Part A, Part B, or IRMAA figures. Those rows
 * show the 2026 amounts, labeled 2026, read from the same constants the 2026
 * cost page uses. No projections appear on this page.
 *
 * When CMS publishes the 2027 Parts A & B fact sheet, replace the "Not
 * announced yet" cells, the IRMAA table, and REVIEWED in one commit.
 */

const PATH = "/medicare-costs-2027";

/** The day every figure here was checked against its CMS source. */
const REVIEWED = "2026-10-13";

const CMS_2027_RATE_ANNOUNCEMENT = {
  title: "CMS: Announcement of Calendar Year 2027 Medicare Advantage Capitation Rates and Part C and Part D Payment Policies (April 6, 2026)",
  url: "https://www.cms.gov/files/document/2027-announcement.pdf",
} as const;

/** Final 2027 Part D figures, from the CMS announcement above. */
const PART_D_2027 = {
  maximumDeductible: 700,
  outOfPocketCap: 2400,
} as const;

const NOT_YET = "Not announced yet";

const whole = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const title = "Medicare Costs 2027: Official Figures and What's Still Pending";
const description =
  "Medicare costs for 2027 from official CMS announcements only. Part D figures are final. Part B, Part A and IRMAA are not out yet, so the 2026 amounts are shown and labeled.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Medicare costs 2027: what's official so far",
    description:
      "The 2027 Part D figures are final. Part A, Part B and IRMAA aren't published yet, so this page shows the 2026 amounts with the year on every one.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Medicare costs 2027: what's official so far",
    description:
      "The 2027 Part D figures are final. Part A, Part B and IRMAA aren't published yet, so this page shows the 2026 amounts with the year on every one.",
    path: PATH,
  }),
};

const COST_ROWS = [
  {
    figure: "Part B standard premium, per month",
    y2026: formatMoney(STANDARD_BASE_PREMIUM_2026),
    y2027: NOT_YET,
  },
  {
    figure: "Part B deductible, per year",
    y2026: whole(PART_B_2026.annualDeductible),
    y2027: NOT_YET,
  },
  {
    figure: "Part A hospital deductible, per benefit period",
    y2026: whole(PART_A_2026.inpatientDeductible),
    y2027: NOT_YET,
  },
  {
    figure: "Part A hospital stay, days 61 to 90, per day",
    y2026: whole(PART_A_2026.coinsuranceDays61To90),
    y2027: NOT_YET,
  },
  {
    figure: "Skilled nursing facility, days 21 to 100, per day",
    y2026: whole(PART_A_2026.skilledNursingCoinsuranceDays21To100),
    y2027: NOT_YET,
  },
  {
    figure: "Part D deductible, the most a plan can charge",
    y2026: whole(PART_D_2026.maximumDeductible),
    y2027: `${whole(PART_D_2027.maximumDeductible)} (final)`,
  },
  {
    figure: "Part D out-of-pocket cap, per year",
    y2026: whole(PART_D_2026.outOfPocketCap),
    y2027: `${whole(PART_D_2027.outOfPocketCap)} (final)`,
  },
] as const;

const FAQ = [
  {
    q: "Has the 2027 Medicare Part B premium been announced?",
    a: `Not yet. As of October 13, 2026, CMS has not published the 2027 Part B premium or deductible. CMS released the 2026 figures on November 14, 2025, so the 2027 numbers usually come out in the fall. Until then, the only official amounts are the 2026 ones: ${formatMoney(STANDARD_BASE_PREMIUM_2026)} a month for the standard premium and ${whole(PART_B_2026.annualDeductible)} for the yearly deductible.`,
  },
  {
    q: "Which Medicare costs are final for 2027?",
    a: `Two Part D figures. For 2027, no Part D plan can charge a deductible higher than ${whole(PART_D_2027.maximumDeductible)}, and your out-of-pocket spending on covered drugs is capped at ${whole(PART_D_2027.outOfPocketCap)} for the year. CMS set both in its 2027 Rate Announcement on April 6, 2026.`,
  },
  {
    q: "What is the Part D out-of-pocket cap in 2027?",
    a: `${whole(PART_D_2027.outOfPocketCap)}, up from ${whole(PART_D_2026.outOfPocketCap)} in 2026. Once you've paid that much out of pocket for covered drugs in 2027, you pay nothing more for covered drugs for the rest of the year. The cap only counts drugs your plan covers, so it's still worth checking your prescriptions against your plan's drug list.`,
  },
  {
    q: "What are the IRMAA brackets for 2027?",
    a: `CMS has not published them yet. The 2026 brackets start above ${whole(109000)} for a single filer and ${whole(218000)} for a joint return, based on your ${IRMAA_LOOKBACK_YEAR} tax return. Social Security looks back two years, so your 2027 amount will be based on your 2025 tax return.`,
  },
  {
    q: "Are Medicare costs different in North Carolina?",
    a: "The Part A, Part B, and IRMAA amounts are set nationally and are the same in every state. What changes by county is which Medicare Advantage and Part D plans are sold, what they charge, and which doctors are in their networks. So the figures on this page apply in Greensboro the same as anywhere, but your plan's costs are a local question.",
  },
] as const;

export default function MedicareCosts2027Page() {
  const individual = getBrackets("individual");
  const joint = getBrackets("married_jointly");
  const range = (min: number, max: number | null) =>
    max === null
      ? `${whole(min)} and up`
      : min === 0
        ? `Up to ${whole(max)}`
        : `${whole(Math.ceil(min))} to ${whole(Math.floor(max))}`;

  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare costs 2027", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: title,
              description,
              path: PATH,
              datePublished: REVIEWED,
              dateModified: REVIEWED,
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare costs 2027" }]}
        eyebrow="Checked October 13, 2026 · Official CMS figures only"
        title="Medicare costs 2027"
        lede="Here's what CMS has officially published for 2027, and what it hasn't. The Part D numbers are final. The Part A, Part B, and IRMAA numbers aren't out yet, so I show the 2026 amounts with the year on every one. No estimates."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free consultation →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <h2 className="text-28 font-semibold">The numbers, side by side</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The 2026 column is final. In the 2027 column, a dollar amount means CMS has published
            it. &ldquo;{NOT_YET}&rdquo; means exactly that. I&apos;ll fill those in when CMS
            releases them.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Medicare costs: final 2026 amounts next to the 2027 amounts CMS has published so far
              </caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    What you pay
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    2026 (final)
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    2027
                  </th>
                </tr>
              </thead>
              <tbody>
                {COST_ROWS.map((row) => (
                  <tr key={row.figure} className="border-b border-gray-300 align-top">
                    <th scope="row" className="text-16 py-4 pr-3 font-semibold">
                      {row.figure}
                    </th>
                    <td className="text-16 py-4 pr-3 whitespace-nowrap">{row.y2026}</td>
                    <td
                      className={
                        row.y2027 === NOT_YET
                          ? "text-16 py-4 text-[var(--color-ink-muted)]"
                          : "text-16 py-4 font-semibold"
                      }
                    >
                      {row.y2027}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-16 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Sources:{" "}
            <a href={CMS_PARTS_AB_SOURCE.url} rel="noopener" className="underline underline-offset-2">
              {CMS_PARTS_AB_SOURCE.title}
            </a>{" "}
            (released November 14, 2025) for the 2026 Part A and Part B amounts.{" "}
            <a
              href={CMS_2027_RATE_ANNOUNCEMENT.url}
              rel="noopener"
              className="underline underline-offset-2"
            >
              {CMS_2027_RATE_ANNOUNCEMENT.title}
            </a>{" "}
            for the Part D deductible and out-of-pocket cap in both years.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What each number means</h2>
          <dl className="mt-8 flex flex-col gap-6">
            <div className="border-t border-gray-300 pt-5">
              <dt className="text-19 font-semibold">Part B premium</dt>
              <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                What you pay each month for doctor visits and outpatient care. It usually comes out
                of your Social Security payment. Most people pay the standard amount.
              </dd>
            </div>
            <div className="border-t border-gray-300 pt-5">
              <dt className="text-19 font-semibold">Part B deductible</dt>
              <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                What you pay once a year before Part B starts paying. After that, you usually pay
                20% of the Medicare-approved amount.
              </dd>
            </div>
            <div className="border-t border-gray-300 pt-5">
              <dt className="text-19 font-semibold">Part A hospital deductible</dt>
              <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                What you pay when you&apos;re admitted to a hospital. It&apos;s per benefit period,
                not per year, so you can owe it more than once in a year. Most people pay no
                monthly premium for Part A.
              </dd>
            </div>
            <div className="border-t border-gray-300 pt-5">
              <dt className="text-19 font-semibold">Part D deductible and cap</dt>
              <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                The deductible shown is the most any drug plan can charge. Many charge less. The
                cap is the most you can pay out of pocket for covered drugs in a year. Your
                plan&apos;s own premium and copays are in its Annual Notice of Change.
              </dd>
            </div>
          </dl>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            Not sure about a word?{" "}
            <Link href="/medicare-glossary" className="underline underline-offset-2">
              Medicare terms explained simply
            </Link>
            . For every 2026 figure with more detail, see{" "}
            <Link href="/medicare-costs-2026" className="underline underline-offset-2">
              what Medicare costs in 2026
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <h2 className="text-28 font-semibold">IRMAA brackets (2026)</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            IRMAA is an extra amount added to your Part B and Part D premiums when your income is
            above a set level. CMS has not published the 2027 brackets yet. The table below is the{" "}
            <strong>2026</strong> table, based on your {IRMAA_LOOKBACK_YEAR} tax return. Social
            Security looks back two years, so 2027 will use your 2025 return.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <caption className="text-16 pb-3 text-left font-semibold">
                2026 monthly amounts by {IRMAA_LOOKBACK_YEAR} income. 2027 brackets not announced
                yet.
              </caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Filing single
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Filing jointly
                  </th>
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Part B premium (2026)
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    Added to Part D (2026)
                  </th>
                </tr>
              </thead>
              <tbody>
                {individual.map((bracket, index) => {
                  const jointBracket = joint[index];
                  const band = PART_D_IRMAA_2026[index];
                  return (
                    <tr key={bracket.bracketName} className="border-b border-gray-300 align-top">
                      <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                        {range(bracket.minIncome, bracket.maxIncome)}
                      </th>
                      <td className="text-16 py-4 pr-4">
                        {range(jointBracket.minIncome, jointBracket.maxIncome)}
                      </td>
                      <td className="text-16 py-4 pr-4 whitespace-nowrap">
                        {formatMoney(bracket.partBPremium)}
                      </td>
                      <td className="text-16 py-4 whitespace-nowrap">
                        {band.surcharge === 0 ? "None" : `+${formatMoney(band.surcharge)}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-16 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Source:{" "}
            <a href={CMS_PARTS_AB_SOURCE.url} rel="noopener" className="underline underline-offset-2">
              {CMS_PARTS_AB_SOURCE.title}
            </a>
            . If your income has dropped since that tax return because of a life change like
            retirement, you can ask Social Security to look again.{" "}
            <Link href="/irmaa-appeal" className="underline underline-offset-2">
              Here&apos;s how an IRMAA appeal works
            </Link>
            .
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions about 2027 Medicare costs</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
          />
        </div>
      </section>

      <KitchenTableClose
        heading="Want to see what 2027 costs you?"
        body="These are the national numbers. Your plan's premium, copays, and drug costs are in its Annual Notice of Change. Bring that letter and your prescription list, and we'll go through it together before December 7. Free consultation, no obligation."
        href="/start?topic=medicare&quick=1"
        label="Request a free consultation →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-17 mb-8 leading-relaxed text-[var(--color-ink-muted)]">
          Reviewing your plan this fall? Use the{" "}
          <Link href="/aep-checklist" className="underline underline-offset-2">
            AEP checklist
          </Link>
          . For what else is different next year, read{" "}
          <Link href="/medicare-changes-2027" className="underline underline-offset-2">
            Medicare changes for 2027
          </Link>
          .
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed={REVIEWED} />
      <RelatedMedicareGuides />
    </main>
  );
}
