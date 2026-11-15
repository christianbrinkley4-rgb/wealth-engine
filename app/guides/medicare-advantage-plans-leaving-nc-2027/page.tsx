import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";

const data: SeoGuideData = {
  slug: "medicare-advantage-plans-leaving-nc-2027",
  title: "Medicare Advantage plans leaving NC in 2027",
  metaTitle: "Medicare Advantage Plans Leaving NC 2027: Next Steps",
  description:
    "Check whether your NC Medicare Advantage plan is ending or being replaced for 2027. Learn which notices, deadlines, and coverage choices matter.",
  published: "2026-10-08",
  reviewed: "2026-11-15",
  answer:
    "Some Medicare Advantage plans in North Carolina won't continue in 2027, but a carrier name alone can't tell you whether your coverage is ending. Check your exact plan ID, county, and notice to find out whether your plan is terminating, leaving your area, or moving members into another plan.",
  sections: [
    {
      title: "Verified 2027 plan changes in North Carolina",
      paragraphs: [
        "The examples below were checked against CMS's October 1, 2026 Plan Crosswalk for 2027. The 2026 county examples come from CMS's September 2026 landscape. This is a selected list, not every plan change in North Carolina. A change to one plan doesn't mean the insurance company is leaving the state.",
        "CMS lists the two HumanaChoice plans below as terminated with no receiving plan in that crosswalk. It lists the UHC example as a consolidated renewal with a receiving plan. Read your own notice to confirm what happens to your enrollment. Don't treat a consolidation as a termination or assume another plan has the same doctors, drugs, or costs.",
        "Most plans [renew automatically](/guides/medicare-automatic-renewal). A nonrenewal letter is the exception, not the rule.",
      ],
      table: {
        caption: "Selected CMS-verified 2026 to 2027 changes, checked November 5, 2026",
        headers: ["2026 plan and ID", "2026 NC county examples", "2027 crosswalk result"],
        rows: [
          [
            "HumanaChoice H5525-050 (PPO)",
            "Guilford, Forsyth, Alamance, Mecklenburg",
            "Terminated/Non-renewed Contract. No receiving plan listed.",
          ],
          [
            "HumanaChoice H5525-083 (PPO)",
            "Guilford, Forsyth, Alamance, Mecklenburg",
            "Terminated/Non-renewed Contract. No receiving plan listed.",
          ],
          [
            "AARP Medicare Advantage from UHC NC-0008 (HMO-POS), H5253-079",
            "Buncombe, Haywood, Rutherford",
            "Consolidated Renewal Plan into H5253-185, AARP Medicare Advantage from UHC NC-24 (HMO-POS).",
          ],
        ],
      },
    },
    {
      title: "What Humana is changing for 2027",
      paragraphs: [
        "Humana is cutting 37 Medicare Advantage PPO plans for 2027, trimming its lineup from 887 plans to 861. It is leaving Minnesota entirely and exiting 57 counties. The company says about 600,000 members are in plans that are ending. KFF, counting the same CMS data a different way, puts the Humana figure at about 530,000 people in drug plans that end December 31, 2026. The two counts differ because they count different plan types. Either way, this is the largest single-carrier pullback for 2027. Source: Becker's reporting on CMS 2027 landscape data, October 1, 2026; KFF analysis of CMS 2027 landscape and crosswalk files, October 2026.",
        "In North Carolina, the two HumanaChoice PPO plans in the table above are listed as terminated in the CMS crosswalk, with no receiving plan. If you have a Humana PPO, check your exact plan ID. A Humana member in a continuing plan is not affected by the 37 PPO cuts.",
      ],
    },
    {
      title: "What Aetna is changing for 2027",
      paragraphs: [
        "Aetna is growing its total plan count for 2027, from 642 plans to 654, but it is still pulling standard plans from 123 counties and leaving Maryland and New Hampshire entirely. It is cutting 20 PPO plans and adding 29 plans for people with chronic conditions. KFF counts about 254,000 people in Aetna drug plans that end December 31, 2026. Source: Becker's reporting on CMS 2027 landscape data, October 1, 2026; KFF analysis of CMS 2027 landscape and crosswalk files, October 2026.",
        "Aetna is part of CVS Health. KFF counts the parent company exiting 186 counties and entering 63 for 2027. An Aetna exit only matters if your county is one of the 123. Check your notice, not the headline.",
      ],
    },
    {
      title: "The March 4, 2027 Medigap deadline",
      paragraphs: [
        "If your plan ends December 31, 2026 and you want a Medicare Supplement instead, the clock matters. Federal rules give you a guaranteed right to buy certain Medigap policies without health questions for 63 days after your coverage ends. Coverage ends December 31, 2026, so the window runs through March 4, 2027. Apply before that date. After it, North Carolina companies can ask health questions and turn you down.",
        "You also get a special enrollment period from December 8, 2026 through February 28, 2027 to pick a new Medicare Advantage or drug plan when your plan does not renew. That window is for choosing a replacement plan. The March 4 date is the Medigap deadline. They are two different windows, and both close soon after the new year. Source: Medicare Special Enrollment Periods (Medicare.gov) and Choosing a Medigap Policy (Medicare.gov).",
      ],
    },
    {
      title: "Check your exact plan first",
      paragraphs: [
        "Find the contract and plan numbers in your plan documents. Ask member services what happens to that exact coverage on January 1, 2027. Then compare the 2027 choices for your address in [Medicare Plan Compare](https://www.medicare.gov/plan-compare/). The [NC Department of Insurance Medicare Advantage page](https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip/medicare-advantage-medicare-health-plans-part-c) also links to current landscape information. Public plan listings help you check availability, but the notice explains what happens to your enrollment.",
      ],
    },
    {
      title: "Three changes that mean different things",
      paragraphs: [
        "A hospital leaving a network isn't the same as your insurance plan ending. Don't assume every change gives you the same enrollment or Medigap rights.",
      ],
      table: {
        caption: "Three changes that mean different things",
        headers: ["What the notice describes", "What to check next"],
        rows: [
          [
            "Plan won't renew or serve your area",
            "Replacement coverage and the enrollment period in the notice",
          ],
          [
            "Plan is consolidated or replaced",
            "Whether you're transferred automatically, and the receiving plan's terms",
          ],
          [
            "Plan continues with benefit or network changes",
            "Doctors, drugs, costs, and whether you want to change coverage",
          ],
        ],
      },
    },
    {
      title: "Enrollment dates for the 2027 transition",
      paragraphs: [
        "Medicare Open Enrollment runs October 15 through December 7, 2026 for changes effective January 1, 2027. Medicare also lists a December 8 through February 28 Special Enrollment Period for certain nonrenewals. Other termination situations have different windows. Check the category in your notice and confirm the new plan's start date. Waiting can leave you without the coverage you expected. Source: [Medicare enrollment periods](https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods).",
        "If your plan is ending and you want help reading the notice, [book a 45-minute phone review](/aep) at no cost and with no obligation, or call (919) 408-6671. Bring the letter and we will work through what it says, with no obligation to enroll.",
      ],
    },
    {
      title: "If you're considering Original Medicare",
      paragraphs: [
        "If your plan ends without a replacement or another Medicare Advantage enrollment, you generally return to Original Medicare. Arrange drug coverage separately if needed. You may have a right to buy certain Medigap policies without medical underwriting. The applicable window is generally 60 days before through 63 days after your Medicare Advantage coverage ends. Keep the notice and check the rules for your situation in [Choosing a Medigap Policy](https://www.medicare.gov/publications/02110-choosing-a-medigap-policy.pdf).",
      ],
    },
    {
      title: "What to bring when checking a plan notice",
      bullets: [
        "Your current plan name, contract and plan ID, county, and the full letter, including its effective date.",
        "Your doctors, hospitals, medications with doses, and preferred pharmacy. A replacement plan needs its own checks.",
        "Any employer, union, or retiree coverage documents. Check coordination before enrolling in an individual plan.",
        "Ask whether the notice describes a termination, a service-area reduction, or a transfer. Keep written confirmation of any new coverage and its start date.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is my insurance company leaving all of North Carolina?",
      a: "Not necessarily. One plan can end while other plans from that company continue. Check the ID and county.",
    },
    {
      q: "Will I automatically get a replacement plan?",
      a: "Some consolidations transfer members. A true nonrenewal can return you to Original Medicare. Read your notice.",
    },
    {
      q: "Does my hospital leaving the network guarantee Medigap approval?",
      a: "Don't assume that. A network change and a plan nonrenewal have different rules. Confirm any specific protection first.",
    },
  ],
  sources: [
    {
      label: "KFF: Medicare Advantage plan availability varies widely by county for 2027, October 9, 2026",
      href: "https://www.kff.org/medicare/medicare-advantage-plan-availability-varies-widely-by-county-for-2027/",
    },
    {
      label: "CMS: 2027 Part C and D Plan Crosswalk, October 1, 2026 file",
      href: "https://www.cms.gov/data-research/statistics-trends-and-reports/medicare-advantagepart-d-contract-and-enrollment-data/plan-crosswalks/2027-part-cd-plan-crosswalk",
    },
    {
      label: "CMS: CY2026 Landscape, September 2026 download",
      href: "https://www.cms.gov/medicare/coverage/prescription-drug-coverage",
    },
    {
      label: "NC DOI: Medicare Advantage plans available by county for 2027",
      href: "https://www.ncdoi.gov/medicare-advantage-landscapes-2027",
    },
    {
      label: "Medicare Plan Compare",
      href: "https://www.medicare.gov/plan-compare/",
    },
    {
      label: "NC Department of Insurance Medicare Advantage page",
      href: "https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip/medicare-advantage-medicare-health-plans-part-c",
    },
    {
      label: "Medicare enrollment periods",
      href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods",
    },
    {
      label: "Choosing a Medigap Policy",
      href: "https://www.medicare.gov/publications/02110-choosing-a-medigap-policy.pdf",
    },
  ],
  related: [
    {
      href: "/anoc",
      label: "Identify your plan's notice",
    },
    {
      href: "/guides/switching-medicare-advantage-to-medigap-nc",
      label: "Returning to Original Medicare and applying for Medigap",
    },
    {
      href: "/medicare-plans-ending-2027",
      label: "Plan-ending review help in the Triad",
    },
  ],
  closing:
    "I'm Christian Brinkley, a licensed NC insurance agent in Greensboro, NC. Bring your plan notice to a phone review. We'll work through what it says. There's no obligation to enroll. (919) 408-6671",
};

export const metadata = seoGuideMetadata(data);
export default function Page() {
  return <SeoGuidePage data={data} />;
}
