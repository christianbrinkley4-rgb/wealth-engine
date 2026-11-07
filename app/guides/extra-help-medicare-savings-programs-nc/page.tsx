import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";

const data: SeoGuideData = {
  slug: "extra-help-medicare-savings-programs-nc",
  title: "Extra Help and Medicare Savings Programs in NC",
  metaTitle: "Extra Help Medicare Savings Programs NC: Apply",
  description:
    "Compare Extra Help and Medicare Savings Programs in NC. See what each program covers, where to apply, and which financial limits need checking.",
  published: "2026-10-08",
  reviewed: "2026-11-07",
  answer:
    "Extra Help assists with Medicare Part D drug costs, while Medicare Savings Programs assist with certain Medicare premiums and, for QMB, covered medical cost sharing. In North Carolina, Social Security handles Extra Help applications, and NC Medicaid or county social services handles Medicare Savings Program applications.",
  sections: [
    {
      title: "Which program helps with which cost",
      paragraphs: [
        "These aren't four interchangeable levels that all pay Part B. QDWI has a different purpose. Source: [NC DOI program explanation](https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip/get-help-paying-your-medicare-costs).",
      ],
      table: {
        caption: "Which program helps with which cost",
        headers: ["Program", "Main assistance"],
        rows: [
          [
            "Extra Help",
            "Part D premiums, deductibles, and prescription cost sharing, under program rules",
          ],
          [
            "QMB",
            "Part A premiums if owed, Part B premiums, and protection from billing for Medicare-covered cost sharing",
          ],
          ["SLMB and QI", "Part B premiums"],
          ["QDWI", "Part A premiums for certain working people with disabilities"],
        ],
      },
    },
    {
      title: "Extra Help financial limits for 2026",
      paragraphs: [
        "Medicare's 2026 brochure lists annual income below $23,940 for an individual or $32,460 for a married couple, and resources below $18,090 or $36,100 respectively. Some income and resources aren't counted. These are Extra Help figures, not the limits for all NC Medicaid programs. Don't rule yourself out without an application or screening. Source: [Medicare's April 2026 Extra Help brochure](https://www.medicare.gov/publications/12200-extra-help.pdf).",
      ],
    },
    {
      title: "Check Medicare Savings Program eligibility separately",
      paragraphs: [
        "Program rules and financial counting differ. [Medicare publishes 2026 federal screening limits](https://www.medicare.gov/basics/costs/help/medicare-savings-programs), but a federal chart isn't an individual NC eligibility decision. Ask NC Medicaid or your county DSS which program applies and which exclusions they use.",
      ],
    },
    {
      title: "Where to apply",
      paragraphs: [
        "Apply for Extra Help through [Social Security's official application page](https://www.ssa.gov/medicare/part-d-extra-help). For a Medicare Savings Program, use [NC ePASS](https://epass.nc.gov/) or contact your county Department of Social Services. NC DOI links to both routes on its [assistance page](https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip/get-help-paying-your-medicare-costs). Prepare income and resource records. NC SHIIP can explain the programs and application steps.",
      ],
    },
    {
      title: "Prepare records without guessing eligibility",
      bullets: [
        "Gather current income records and account balances requested by the agency. Ask which income or resources are excluded.",
        "Keep Medicare and other coverage information available when completing an official application.",
        "If you already receive Medicaid, SSI, or help with premiums, ask whether Extra Help has been applied to your drug coverage.",
        "If you have QMB, tell your Medicare providers. QMB protects you from being billed Medicare-covered deductibles, coinsurance, and copays, even if a provider does not participate in Medicaid.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can I have both?",
      a: "Yes. People receiving full Medicaid, SSI, or help through QMB, SLMB, or QI generally receive Extra Help automatically.",
    },
    {
      q: "Does Extra Help mean every drug is free?",
      a: "No. The plan's covered drugs, program cost sharing, and the premium rules still matter.",
    },
    {
      q: "Can I apply outside fall enrollment?",
      a: "You can apply for Extra Help throughout the year. Ask about any separate plan-enrollment period that applies after eligibility is determined.",
    },
  ],
  sources: [
    {
      label: "NC DOI program explanation",
      href: "https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip/get-help-paying-your-medicare-costs",
    },
    {
      label: "Medicare's April 2026 Extra Help brochure",
      href: "https://www.medicare.gov/publications/12200-extra-help.pdf",
    },
    {
      label: "Medicare publishes 2026 federal screening limits",
      href: "https://www.medicare.gov/basics/costs/help/medicare-savings-programs",
    },
    {
      label: "Social Security's official application page",
      href: "https://www.ssa.gov/medicare/part-d-extra-help",
    },
  ],
  related: [
    {
      href: "/answers/what-does-it-mean-to-be-dual-eligible-for-medicare-and-medicaid",
      label: "What dual eligible means",
    },
    {
      href: "/medicare-help-directory",
      label: "Find NC SHIIP counseling",
    },
    {
      href: "/answers/how-does-medicare-part-d-drug-coverage-work",
      label: "How Part D drug coverage works",
    },
  ],
  closing:
    "I'm Christian Brinkley, a licensed NC insurance agent in Greensboro, NC. We can talk through help with premiums and drug costs. Social Security and NC Medicaid make eligibility decisions. (919) 408-6671",
};

export const metadata = seoGuideMetadata(data);
export default function Page() {
  return <SeoGuidePage data={data} />;
}
