import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";
import { getBrackets, STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import {
  CMS_PART_D_SOURCE,
  CMS_PARTS_AB_SOURCE,
  COSTS_YEAR,
  IRMAA_LOOKBACK_YEAR,
  PART_A_2026,
  PART_B_2026,
  PART_D_2026,
  PART_D_IRMAA_2026,
} from "@/lib/medicareCosts2026";
import { formatMoney } from "@/lib/partBPenalty";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

const title = "2026 Medicare Costs: Premiums, Deductibles and IRMAA Brackets";
const description =
  "Every 2026 Medicare figure in one place, taken from the CMS fact sheets: the $202.90 Part B premium, the $283 deductible, Part A hospital costs, the $2,100 Part D cap, and both IRMAA tables.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/medicare-costs-2026" },
  openGraph: pageOpenGraph({
    title: "Every 2026 Medicare cost, in one place",
    description:
      "Part A, Part B, Part D and both IRMAA tables — the published figures, with the CMS source next to each one.",
    path: "/medicare-costs-2026",
  }),
  twitter: pageTwitter({
    title: "2026 Medicare costs",
    description: "Premiums, deductibles and IRMAA brackets, straight from the CMS fact sheets.",
  }),
};

/** The day the figures on this page were checked against both CMS sources. */
const PUBLISHED = "2026-09-18";

const whole = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const FAQ = [
  {
    q: `How much is Medicare Part B in ${COSTS_YEAR}?`,
    a: `The standard Part B premium for ${COSTS_YEAR} is ${formatMoney(STANDARD_BASE_PREMIUM_2026)} a month, with an annual deductible of ${whole(PART_B_2026.annualDeductible)}. Most people pay the standard amount. If your ${IRMAA_LOOKBACK_YEAR} income was above ${whole(109000)} filing single or ${whole(218000)} filing jointly, an income-related amount is added on top, up to ${formatMoney(689.9)} a month.`,
  },
  {
    q: `What is the ${COSTS_YEAR} Medicare Part A deductible?`,
    a: `${whole(PART_A_2026.inpatientDeductible)} per benefit period — not per year. A benefit period starts the day you go into a hospital and ends once you have been out for 60 days in a row, so it is possible to pay it more than once in a calendar year. Days 61 to 90 cost ${whole(PART_A_2026.coinsuranceDays61To90)} a day, and lifetime reserve days cost ${whole(PART_A_2026.lifetimeReserveCoinsurance)} a day.`,
  },
  {
    q: `Is there a cap on what I pay for prescriptions in ${COSTS_YEAR}?`,
    a: `Yes. Part D out-of-pocket spending is capped at ${whole(PART_D_2026.outOfPocketCap)} for ${COSTS_YEAR}. Once you reach it you pay nothing more for covered drugs for the rest of the year. No Part D plan may charge a deductible above ${whole(PART_D_2026.maximumDeductible)}, and many charge less.`,
  },
  {
    q: `Which year's income decides my ${COSTS_YEAR} Medicare premium?`,
    a: `Your ${IRMAA_LOOKBACK_YEAR} tax return. Social Security looks back two years, which is why a one-time event in ${IRMAA_LOOKBACK_YEAR} — selling a house, a Roth conversion, a large distribution — can raise a premium two years later. If your income has since dropped because of a life change such as retirement or the death of a spouse, you can ask for it to be reconsidered using form SSA-44.`,
  },
  {
    q: "Do these figures apply in North Carolina?",
    a: "Part A, Part B and the IRMAA amounts are federal and identical in every state. What varies locally is which Medicare Advantage and Part D plans are sold, what they charge, and which doctors and hospitals are in them — so in Guilford or Forsyth County the plan costs are a local question even though the figures on this page are not.",
  },
  {
    q: "What happens if I sign up for Part B late?",
    a: `${PART_B_2026.latePenaltyPercentPerYear}% is added to the standard premium for every full 12 months you could have had Part B and did not, and it stays for as long as you have Part B. Coverage from a job you or your spouse currently work at usually protects you from it. Part D has its own penalty: ${PART_D_2026.latePenaltyPercentPerMonth}% of the ${formatMoney(PART_D_2026.baseBeneficiaryPremium)} base premium for each month you went without creditable drug coverage.`,
  },
] as const;

export default function MedicareCosts2026Page() {
  const individual = getBrackets("individual");
  const joint = getBrackets("married_jointly");

  return (
    <main className="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: `${COSTS_YEAR} Medicare costs`, path: "/medicare-costs-2026" },
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
              path: "/medicare-costs-2026",
              datePublished: PUBLISHED,
              dateModified: PUBLISHED,
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
              <p className="home-eyebrow home-eyebrow-rust">Published figures, with sources</p>
              <h1 className="ref-title">What Medicare costs in {COSTS_YEAR}</h1>
            </div>
            <p className="home-heading-note">
              These are the national figures from the CMS fact sheets, not estimates. They are the
              same in North Carolina as anywhere else. What each one means for you is the part worth
              a conversation.
            </p>
          </div>

          <div className="ref-summary">
            <div>
              <dt>{formatMoney(STANDARD_BASE_PREMIUM_2026)}</dt>
              <dd>Standard Part B premium, per month</dd>
            </div>
            <div>
              <dt>{whole(PART_B_2026.annualDeductible)}</dt>
              <dd>Part B deductible, per year</dd>
            </div>
            <div>
              <dt>{whole(PART_A_2026.inpatientDeductible)}</dt>
              <dd>Part A hospital deductible, per benefit period</dd>
            </div>
            <div>
              <dt>{whole(PART_D_2026.outOfPocketCap)}</dt>
              <dd>Most you can pay for covered drugs, per year</dd>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-rule-top" id="part-b">
        <div className="personal-shell ref-block">
          <h2>Part B: the premium most people notice</h2>
          <p>
            Part B covers doctors, outpatient care and equipment. The premium usually comes straight
            out of a Social Security payment, so it is the number people see first.
          </p>
          <div className="ref-table-wrap">
            <table className="ref-table">
              <caption>Part B, {COSTS_YEAR}</caption>
              <tbody>
                <tr>
                  <th scope="row">Standard monthly premium</th>
                  <td>{formatMoney(STANDARD_BASE_PREMIUM_2026)}</td>
                </tr>
                <tr>
                  <th scope="row">Annual deductible</th>
                  <td>{whole(PART_B_2026.annualDeductible)}</td>
                </tr>
                <tr>
                  <th scope="row">Coinsurance after the deductible</th>
                  <td>20% of the approved amount</td>
                </tr>
                <tr>
                  <th scope="row">Late enrollment penalty</th>
                  <td>
                    +{PART_B_2026.latePenaltyPercentPerYear}% per full year late, for as long as you
                    have Part B
                  </td>
                </tr>
                <tr>
                  <th scope="row">Immunosuppressive drug benefit premium</th>
                  <td>{formatMoney(PART_B_2026.immunosuppressiveDrugPremium)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="ref-note">
            That 20% has no ceiling of its own, which is the whole reason supplemental coverage
            exists. <Link href="/advantage-vs-medigap">How Advantage and Medigap handle it</Link>{" "}
            differs more than the premiums suggest.
          </p>
          <p className="ref-note">
            Worried a late start has cost you?{" "}
            <Link href="/part-b-penalty">Work out the penalty from two dates</Link>.
          </p>
        </div>
      </section>

      <section className="home-section home-rule-top" id="part-a">
        <div className="personal-shell ref-block">
          <h2>Part A: free for almost everyone, until you are admitted</h2>
          <p>
            About 99 in 100 people pay no Part A premium, because they or a spouse worked enough
            quarters. The costs below start when you are admitted to a hospital.
          </p>
          <div className="ref-table-wrap">
            <table className="ref-table">
              <caption>Part A, {COSTS_YEAR}</caption>
              <tbody>
                <tr>
                  <th scope="row">Hospital deductible, per benefit period</th>
                  <td>{whole(PART_A_2026.inpatientDeductible)}</td>
                </tr>
                <tr>
                  <th scope="row">Days 1–60 in hospital</th>
                  <td>No further cost</td>
                </tr>
                <tr>
                  <th scope="row">Days 61–90</th>
                  <td>{whole(PART_A_2026.coinsuranceDays61To90)} a day</td>
                </tr>
                <tr>
                  <th scope="row">Lifetime reserve days (60 in total)</th>
                  <td>{whole(PART_A_2026.lifetimeReserveCoinsurance)} a day</td>
                </tr>
                <tr>
                  <th scope="row">Skilled nursing, days 21–100</th>
                  <td>{whole(PART_A_2026.skilledNursingCoinsuranceDays21To100)} a day</td>
                </tr>
                <tr>
                  <th scope="row">Premium, 30–39 quarters worked</th>
                  <td>{whole(PART_A_2026.premiumReduced)} a month</td>
                </tr>
                <tr>
                  <th scope="row">Premium, under 30 quarters</th>
                  <td>{whole(PART_A_2026.premiumFull)} a month</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="ref-note">
            <strong>Per benefit period, not per year.</strong> A benefit period ends after you have
            been out of the hospital or a skilled nursing facility for 60 days in a row. Go back in
            after that and the deductible starts again — twice in one year is possible.
          </p>
        </div>
      </section>

      <section className="home-section home-rule-top" id="part-d">
        <div className="personal-shell ref-block">
          <h2>Part D: the cap is the news</h2>
          <p>
            Drug plan premiums are set by each plan, so no single figure covers them. What is set
            nationally is how far your own spending can go.
          </p>
          <div className="ref-table-wrap">
            <table className="ref-table">
              <caption>Part D, {COSTS_YEAR}</caption>
              <tbody>
                <tr>
                  <th scope="row">Your out-of-pocket cap</th>
                  <td>{whole(PART_D_2026.outOfPocketCap)} a year</td>
                </tr>
                <tr>
                  <th scope="row">Highest deductible a plan may charge</th>
                  <td>{whole(PART_D_2026.maximumDeductible)}</td>
                </tr>
                <tr>
                  <th scope="row">Base premium the penalty is figured from</th>
                  <td>{formatMoney(PART_D_2026.baseBeneficiaryPremium)}</td>
                </tr>
                <tr>
                  <th scope="row">Late enrollment penalty</th>
                  <td>
                    +{PART_D_2026.latePenaltyPercentPerMonth}% of that base for each month without
                    creditable coverage
                  </td>
                </tr>
                <tr>
                  <th scope="row">Gap that triggers the penalty</th>
                  <td>{PART_D_2026.creditableCoverageGapDays} days or more in a row</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="ref-note">
            Reaching the cap means you pay nothing further for covered drugs that year. It does not
            mean every drug you take is covered — each plan has its own list, and checking yours
            against it is the single most useful hour of the whole process.
          </p>
        </div>
      </section>

      <section className="home-section home-rule-top" id="irmaa">
        <div className="personal-shell ref-block">
          <h2>IRMAA: what higher income adds</h2>
          <p>
            About 8% of people pay an income-related amount on top of the standard premiums. It is
            based on the modified adjusted gross income from your{" "}
            <strong>{IRMAA_LOOKBACK_YEAR}</strong> tax return, because Social Security looks back
            two years.
          </p>

          <div className="ref-table-wrap">
            <table className="ref-table ref-table-wide">
              <caption>
                {COSTS_YEAR} monthly cost by {IRMAA_LOOKBACK_YEAR} income
              </caption>
              <thead>
                <tr>
                  <th scope="col">Filing single</th>
                  <th scope="col">Filing jointly</th>
                  <th scope="col">Part B</th>
                  <th scope="col">Part D adds</th>
                </tr>
              </thead>
              <tbody>
                {individual.map((bracket, index) => {
                  const band = PART_D_IRMAA_2026[index];
                  const jointBracket = joint[index];
                  const range = (min: number, max: number | null) =>
                    max === null
                      ? `${whole(min)} and up`
                      : min === 0
                        ? `Up to ${whole(max)}`
                        : `${whole(Math.ceil(min))} – ${whole(Math.floor(max))}`;
                  return (
                    <tr key={bracket.bracketName}>
                      <th scope="row">{range(bracket.minIncome, bracket.maxIncome)}</th>
                      <td>{range(jointBracket.minIncome, jointBracket.maxIncome)}</td>
                      <td>{formatMoney(bracket.partBPremium)}</td>
                      <td>{band.surcharge === 0 ? "—" : `+${formatMoney(band.surcharge)}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="ref-note">
            The bands are cliffs, not slopes. One dollar over a threshold moves you into the next
            band for the whole year, which is why the timing of a Roth conversion or a home sale
            matters as much as the amount.{" "}
            <Link href="/roth-window">See what a conversion would do to your bracket</Link>.
          </p>
          <p className="ref-note">
            If your income has dropped since {IRMAA_LOOKBACK_YEAR} because you retired, lost a
            spouse, or had work stop or reduce, you can ask Social Security to use current income
            instead. <Link href="/irmaa-appeal">How that request works</Link>.
          </p>
        </div>
      </section>

      <section className="home-section home-rule-top">
        <div className="personal-shell home-faq">
          <div className="home-faq-intro">
            <p className="home-eyebrow">The questions behind the numbers</p>
            <h2>Knowing the figure is not the same as knowing what to do.</h2>
            <p>
              I sit down with people in Greensboro, High Point and Winston-Salem, go through where
              these numbers land for them, and point them to whoever can help with the parts I
              don&rsquo;t handle myself. No cost, and no obligation.
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

      <section className="home-section home-rule-top">
        <div className="personal-shell ref-block">
          <h2>Where these figures come from</h2>
          <p>
            Every number on this page is published by the Centers for Medicare &amp; Medicaid
            Services. Nothing here is estimated, averaged or rounded for effect.
          </p>
          <ul className="ref-sources">
            <li>
              <a href={CMS_PARTS_AB_SOURCE.url} target="_blank" rel="noopener noreferrer">
                {CMS_PARTS_AB_SOURCE.title}
              </a>{" "}
              — Part A, Part B, and both IRMAA tables.
            </li>
            <li>
              <a href={CMS_PART_D_SOURCE.url} target="_blank" rel="noopener noreferrer">
                {CMS_PART_D_SOURCE.title}
              </a>{" "}
              — the Part D deductible ceiling, out-of-pocket cap and base premium.
            </li>
          </ul>
          <p className="ref-note">
            Figures change once a year, usually in November. This page was checked against both
            sources on 18 September 2026.
          </p>
        </div>
      </section>

      <ComplianceDisclosure variant="medicare" />
    </main>
  );
}
