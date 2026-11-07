import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";

const data: SeoGuideData = {
  slug: "medicare-part-b-employer-coverage",
  title: "When should I apply for Medicare Part B if I am still working?",
  metaTitle: "When to Apply for Medicare Part B If You Are Still Working",
  description:
    "Still working at 65? Learn when to apply for Part B, the 8-month window after work coverage ends, and who pays first.",
  published: "2026-10-08",
  reviewed: "2026-11-07",
  answer:
    "If you have group coverage through your own or your spouse's current job, you can usually wait to apply for Part B until that work or coverage ends. After it ends you generally have 8 months to apply under a Special Enrollment Period, and coverage usually starts the month after you apply. Do not wait the full 8 months if coverage is ending now.",
  sections: [
    {
      title: "When to apply for Part B while you are still working",
      paragraphs: [
        "There are three timing cases, and which one applies depends on your coverage. First, your Initial Enrollment Period, the 7 months around your 65th birthday, if you do not have qualifying coverage through current work. Second, the 8-month Special Enrollment Period after current employment or qualifying group coverage ends, whichever happens first. Third, General Enrollment, January 1 through March 31, with coverage generally starting the month after you sign up, if no Special Enrollment Period applies.",
        "Check who pays first before you decide to wait. If the employer plan pays first, waiting is usually safe. If Medicare pays first, delaying Part B can leave a gap. Ask your benefits office for the answers in writing.",
      ],
    },
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
        "They generally aren't current-employment coverage for delaying Part B. Don't wait the full 8 months if coverage is ending now. Coordinate the Medicare start date before losing the coverage paying your bills. Sources: [SSA's work-coverage explanation](https://www.ssa.gov/faqs/en/questions/KA-02983.html), [Medicare working past 65](https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/working-past-65).",
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
        "If none of the three timing cases above fits your situation, ask Social Security whether a Special Enrollment Period applies to you. The fallback is General Enrollment, January 1 through March 31, with coverage generally starting the month after you sign up. Source: [CMS's enrollment guidance](https://www.cms.gov/training-education/find-provider-type/employers-unions/top-five-medicare-enrollment).",
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
      q: "Do I need Part B if I am still working?",
      a: "Not always right at 65. If you have group coverage through current employment, yours or your spouse's, you can usually delay Part B without a penalty, but check who pays first and confirm the coverage counts before you wait.",
    },
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
