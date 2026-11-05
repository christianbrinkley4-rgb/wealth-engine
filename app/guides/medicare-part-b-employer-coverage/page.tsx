import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";

const data: SeoGuideData = {
  slug: "medicare-part-b-employer-coverage",
  title: "Do I need Medicare Part B if I am still working?",
  metaTitle: "Do I Need Medicare Part B If I Am Still Working?",
  description:
    "Still working at 65? Check current job coverage, employer size, who pays first, and Part B enrollment timing before deciding whether to delay.",
  published: "2026-10-08",
  reviewed: "2026-11-05",
  answer:
    "You may be able to delay Medicare Part B if you have group health coverage through your or your spouse's current employment. Check who pays first and whether you qualify for a Special Enrollment Period before delaying, because working by itself isn't enough.",
  sections: [
    {
      title: "Two questions to ask your benefits office",
      paragraphs: [
        "First, is this group health coverage based on current employment? Second, does the employer plan pay before or after Medicare once you're eligible? Ask for the answers in writing. Don't treat a drug plan's “creditable coverage” letter as proof that Part B can safely be delayed. Part B and Part D have different rules.",
      ],
    },
    {
      title: "How employer size affects payment at age 65",
      paragraphs: [
        "Employer size affects payment coordination. It isn't the only test for a Part B Special Enrollment Period. Multi-employer arrangements and unusual coverage need confirmation. Source: [Medicare's enrollment decision guide](https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-can-i-sign-up-for-medicare).",
      ],
      table: {
        caption: "How employer size affects payment at age 65",
        headers: ["Typical age-based situation", "Payment issue to confirm"],
        rows: [
          [
            "Employer has 20 or more employees",
            "The current-employment group plan generally pays first",
          ],
          [
            "Employer has fewer than 20 employees",
            "Medicare generally pays first, so delaying can leave a gap",
          ],
          [
            "Medicare eligibility is due to disability or ESRD",
            "Different coordination rules can apply",
          ],
        ],
      },
    },
    {
      title: "COBRA and retiree coverage need a separate check",
      paragraphs: [
        "They generally aren't current-employment coverage for delaying Part B. An eight-month Special Enrollment Period generally runs after employment or qualifying group coverage ends, whichever happens first. Don't wait eight months if coverage is ending now. Coordinate the Medicare start date before losing the coverage paying your bills. Sources: [SSA's work-coverage explanation](https://www.ssa.gov/faqs/en/questions/KA-02983.html), [Medicare working past 65](https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/working-past-65).",
      ],
    },
    {
      title: "Check HSA contributions before enrolling",
      paragraphs: [
        "Medicare enrollment affects eligibility to contribute to an HSA, including employer contributions. Part A can be retroactive when you apply after 65, so the contribution issue can start before your application date. Ask your benefits office and tax professional about the dates before enrolling. Don't assume premium-free Part A has no tax consequences.",
      ],
    },
    {
      title: "If you missed your enrollment period",
      paragraphs: [
        "Ask whether a Special Enrollment Period applies. General Enrollment runs January 1 through March 31, and coverage generally begins the month after you sign up. Source: [CMS's enrollment guidance](https://www.cms.gov/training-education/find-provider-type/employers-unions/top-five-medicare-enrollment).",
      ],
    },
    {
      title: "Keep the records you may need for Part B",
      paragraphs: [
        "When applying for Part B after current-employment coverage, Social Security may ask for proof of that coverage and employment. Its Part B enrollment instructions include the employment-information form, CMS-L564. Keep the coverage dates and ask your employer who completes its portion.",
        "Plan the medical coverage and prescription coverage transitions separately. A Part D creditable-coverage letter addresses drug coverage. It does not answer who pays first for doctor visits or replace the Part B employment records.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does a small employer mean a Part B penalty is automatic?",
      a: "No. Who pays first and whether an enrollment exception applies are different questions. Confirm both before delaying.",
    },
    {
      q: "Can I rely on COBRA to extend my Part B deadline?",
      a: "Don't assume that. COBRA generally doesn't extend the current-employment enrollment protection.",
    },
    {
      q: "Can my spouse's work coverage count?",
      a: "It can if the coverage and employment meet the rules. Ask the benefits administrator and SSA about your situation.",
    },
  ],
  sources: [
    {
      label: "Medicare's enrollment decision guide",
      href: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-can-i-sign-up-for-medicare",
    },
    {
      label: "SSA's work-coverage explanation",
      href: "https://www.ssa.gov/faqs/en/questions/KA-02983.html",
    },
    {
      label: "Medicare working past 65",
      href: "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/working-past-65",
    },
    {
      label: "CMS's enrollment guidance",
      href: "https://www.cms.gov/training-education/find-provider-type/employers-unions/top-five-medicare-enrollment",
    },
    {
      label: "Social Security Part B application and employment-information forms",
      href: "https://www.ssa.gov/medicare/sign-up/part-b-only",
    },
  ],
  related: [
    {
      href: "/guides/medicare-hsa-contributions",
      label: "Medicare and HSA contribution timing",
    },
    {
      href: "/answers/how-to-apply-for-medicare",
      label: "Apply for Part B through Social Security",
    },
    {
      href: "/guides/cobra-vs-medicare-at-65",
      label: "COBRA and Medicare at 65",
    },
  ],
  closing:
    "I'm Christian Brinkley, a licensed NC insurance agent in Greensboro, NC. Bring your employer coverage details to a phone review. Confirm enrollment dates with Social Security. (919) 408-6671",
};

export const metadata = seoGuideMetadata(data);
export default function Page() {
  return <SeoGuidePage data={data} />;
}
