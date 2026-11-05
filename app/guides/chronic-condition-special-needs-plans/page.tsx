import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";

const data: SeoGuideData = {
  slug: "chronic-condition-special-needs-plans",
  title: "Chronic condition special needs plans: eligibility and checks",
  metaTitle: "Chronic Condition Special Needs Plans: Who Qualifies",
  description:
    "Learn who can join a chronic condition special needs plan, how a diagnosis is verified, and what to check about doctors, drugs, and costs.",
  published: "2026-10-08",
  reviewed: "2026-11-05",
  answer:
    "Chronic condition special needs plans, or C-SNPs, are Medicare Advantage plans for people with specified severe or disabling chronic conditions. You need Parts A and B, an eligible diagnosis, and a plan serving your address that accepts that condition.",
  sections: [
    {
      title: "A diagnosis doesn't automatically qualify you for every C-SNP",
      paragraphs: [
        "Examples of conditions used by C-SNPs include diabetes, chronic heart failure, certain cardiovascular disorders, and certain chronic lung disorders. A plan can focus on one qualifying condition or a permitted group. Check its actual eligibility rules, not just a general list. The plan verifies eligibility with your healthcare provider. Source: [CMS C-SNP explanation](https://www.cms.gov/medicare/enrollment-renewal/special-needs-plans/chronic-conditions).",
      ],
    },
    {
      title: "C-SNP and D-SNP mean different things",
      paragraphs: [
        "All SNPs include Medicare Part D drug coverage. Their provider and referral rules vary. A C-SNP isn't automatically a Medicaid plan. Source: [Medicare SNP guide](https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/SNP).",
      ],
      table: {
        caption: "C-SNP and D-SNP mean different things",
        headers: ["Plan", "Main eligibility focus"],
        rows: [
          ["C-SNP", "Specified chronic condition or condition group"],
          ["D-SNP", "Medicare plus a qualifying Medicaid eligibility category"],
          ["I-SNP", "Institutional status or an eligible need for an institutional level of care"],
        ],
      },
    },
    {
      title: "Check your whole care needs",
      paragraphs: [
        "Look up your primary doctor, every specialist, hospital, medications, and pharmacy. Include treatment for conditions beyond the diagnosis that makes you eligible. Review premiums, copays, coinsurance, the medical out-of-pocket maximum, and any approval rules. A condition-focused plan doesn't mean every service or drug is covered without a cost.",
      ],
    },
    {
      title: "When enrollment may be available",
      paragraphs: [
        "A qualifying chronic condition can create a Special Enrollment Period to join a C-SNP designed for that condition. Ask the plan to confirm eligibility, documentation, and the effective date. Fall enrollment and other qualifying periods may also apply. If eligibility later changes, read any plan notice before assuming you can stay enrolled. Source: [Medicare Special Enrollment Periods](https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods).",
      ],
    },
    {
      title: "A condition-focused plan still has tradeoffs",
      paragraphs: [
        "A C-SNP can coordinate care around a qualifying condition. Its network and drug list may still work differently from your current coverage. Check care for every condition you have, not just the diagnosis used for enrollment.",
        "Before changing, ask whether ongoing treatment needs a new approval and how the plan handles your specialist, medical equipment, and pharmacy. Extra benefits and their eligibility rules vary by plan and year.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need Medicaid to join a C-SNP?",
      a: "Medicaid isn't the defining eligibility requirement. Parts A and B, the plan's condition criteria, and its service area matter.",
    },
    {
      q: "Does having diabetes guarantee there is a plan for me?",
      a: "No. Availability and plan eligibility depend on your address and the coverage year.",
    },
    {
      q: "Will all my drugs be covered?",
      a: "Don't assume so. Check the formulary, pharmacy network, and approval requirements for each medicine.",
    },
  ],
  sources: [
    {
      label: "CMS C-SNP explanation",
      href: "https://www.cms.gov/medicare/enrollment-renewal/special-needs-plans/chronic-conditions",
    },
    {
      label: "Medicare SNP guide",
      href: "https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/SNP",
    },
    {
      label: "Medicare Special Enrollment Periods",
      href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods",
    },
  ],
  related: [
    {
      href: "/answers/what-does-it-mean-to-be-dual-eligible-for-medicare-and-medicaid",
      label: "How dual eligibility differs",
    },
    {
      href: "/special-enrollment",
      label: "Other Special Enrollment Periods",
    },
    {
      href: "/medicare-advantage-doctor-networks",
      label: "Check a plan's provider network",
    },
  ],
  closing:
    "I'm Christian Brinkley, a licensed NC insurance agent in Greensboro, NC. We can talk through C-SNP eligibility and the plans I represent. There's no obligation to enroll. (919) 408-6671",
};

export const metadata = seoGuideMetadata(data);
export default function Page() {
  return <SeoGuidePage data={data} />;
}
