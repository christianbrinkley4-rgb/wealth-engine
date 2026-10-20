import { STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import {
  CMS_PART_D_SOURCE,
  CMS_PARTS_AB_SOURCE,
  COSTS_YEAR,
  PART_B_2026,
  PART_D_2026,
} from "@/lib/medicareCosts2026";

const MEDICARE_OPEN_ENROLLMENT = "https://www.medicare.gov/health-drug-plans/open-enrollment";
const MEDICARE_PENALTIES = "https://www.medicare.gov/basics/costs/medicare-costs/avoid-penalties";

const usd = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;

/**
 * Short, self-contained statements a reader, or an AI assistant, can lift
 * word for word. Each line states the number first and names its official
 * source right beside it. Every figure is read from lib/medicareCosts2026.ts
 * or lib/irmaa.ts so this block changes when those files do.
 */
export const MEDICARE_FACTS = [
  {
    text: `The standard Medicare Part B premium in ${COSTS_YEAR} is ${usd(STANDARD_BASE_PREMIUM_2026)} a month.`,
    source: CMS_PARTS_AB_SOURCE,
  },
  {
    text: `The Part B deductible in ${COSTS_YEAR} is ${usd(PART_B_2026.annualDeductible)} a year.`,
    source: CMS_PARTS_AB_SOURCE,
  },
  {
    text: "Medicare's Annual Enrollment Period runs October 15 to December 7. Changes start January 1.",
    source: { title: "Medicare.gov: Open Enrollment", url: MEDICARE_OPEN_ENROLLMENT },
  },
  {
    text: `The Part B late enrollment penalty is ${PART_B_2026.latePenaltyPercentPerYear}% of the standard premium for each full 12 months you could have had Part B and didn't. It usually lasts as long as you have Part B.`,
    source: { title: "Medicare.gov: Avoid late enrollment penalties", url: MEDICARE_PENALTIES },
  },
  {
    text: `The Part D late enrollment penalty is ${PART_D_2026.latePenaltyPercentPerMonth}% of the national base premium (${usd(PART_D_2026.baseBeneficiaryPremium)} in ${COSTS_YEAR}) for each full month without creditable drug coverage, once a gap reaches ${PART_D_2026.creditableCoverageGapDays} days.`,
    source: { title: "Medicare.gov: Avoid late enrollment penalties", url: MEDICARE_PENALTIES },
  },
  {
    text: `Part D out-of-pocket drug costs are capped at ${usd(PART_D_2026.outOfPocketCap)} in ${COSTS_YEAR}.`,
    source: CMS_PART_D_SOURCE,
  },
] as const;

export function MedicareFactBlock({ heading = `Medicare facts for ${COSTS_YEAR}` }: { heading?: string }) {
  return (
    <section className="app-shell max-w-3xl py-8" aria-labelledby="medicare-facts">
      <h2 id="medicare-facts" className="text-28 font-semibold">
        {heading}
      </h2>
      <ul className="mt-4 space-y-3">
        {MEDICARE_FACTS.map((fact) => (
          <li key={fact.text} className="text-17 leading-relaxed">
            {fact.text}{" "}
            <span className="text-16">
              Source:{" "}
              <a className="underline" href={fact.source.url} rel="noopener">
                {fact.source.title}
              </a>
              .
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
