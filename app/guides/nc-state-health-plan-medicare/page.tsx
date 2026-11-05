import { SHP_METADATA_REVERT_AT } from "@/lib/shpMetadata";
import type { Metadata } from "next";
import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";

const data: SeoGuideData = {
  slug: "nc-state-health-plan-medicare",
  title: "NC State Health Plan Medicare options for 2027",
  metaTitle: "NC State Health Plan Medicare: 2027 Retiree Guide",
  description:
    "Review NC State Health Plan Medicare options for 2027, the November 6 enrollment deadline, and what to check before changing retiree coverage.",
  published: "2026-10-08",
  reviewed: "2026-11-05",
  answer:
    "Eligible NC State Health Plan retirees have three Medicare plan options for 2027: the Humana Base plans, Humana Enhanced plans, and the Aetna-administered 70/30 Plan. Open Enrollment runs October 12 through November 6, 2026, and what happens if you do nothing depends on your current plan.",
  sections: [
    {
      title: "What happens if you do nothing",
      paragraphs: [
        "This is a separate deadline from Medicare's December 7 enrollment deadline. Follow the [State Health Plan's official instructions](https://www.shpnc.gov/2027-open-enrollment-information-medicare-members) and keep your enrollment confirmation.",
      ],
      table: {
        caption: "What happens if you do nothing",
        headers: ["Current coverage", "Default described by the State Health Plan for 2027"],
        rows: [
          ["Humana Medicare Advantage", "Remain in the current plan unless you request a change"],
          ["70/30 Plan", "Move to the Humana Medicare Advantage Base plans unless you take action"],
        ],
      },
    },
    {
      title: "Compare the three options",
      paragraphs: [
        "Use the [official 2027 comparison](https://www.shpnc.gov/documents/open-enrollment-documents/2027-medicare-plan-comparison/open), the rate sheet for your contribution category, provider tools, and drug documents. Don't read 70/30 as a promise that you owe 30% of every bill after Medicare pays. That plan coordinates with Medicare and has its own benefit rules. Its 2027 provider tier can affect your costs.",
      ],
      table: {
        caption: "Three 2027 retiree coverage choices",
        headers: ["Option", "Medical coverage comparison", "What to confirm"],
        rows: [
          [
            "Humana Base plans",
            "Group Medicare Advantage medical coverage and Part D drug coverage",
            "Your contribution-category premium, providers, prescriptions, and medical cost sharing",
          ],
          [
            "Humana Enhanced plans",
            "A different benefit design from Base, with a different premium",
            "Whether the differences fit your care and budget; do not compare premium alone",
          ],
          [
            "Aetna-administered 70/30 Plan",
            "Medicare remains primary; this plan may help pay remaining covered costs",
            "Provider tier, coordination after Medicare, and combined medical/pharmacy rules",
          ],
        ],
      },
    },
    {
      title: "Line up Medicare and retiree enrollment",
      paragraphs: [
        "If you're Medicare-eligible, confirm your required Parts A and B effective dates with the State Health Plan. Retirement, active employment, disability, and dependent status can change the steps. Being hired before 2021 doesn't by itself prove retiree coverage eligibility or a particular subsidy. Ask the Plan to confirm your eligibility and contribution category. Start with its [retirement planning resources](https://www.shpnc.gov/retiree-benefits/planning-retirement).",
      ],
    },
    {
      title: "Ask before enrolling outside the state plan",
      paragraphs: [
        "An outside Medicare Advantage or Part D enrollment can disrupt state retiree coverage. The State Health Plan's Base plan page says an outside Medicare health-plan enrollment can disenroll a member from the group plans and move them to 70/30. Confirm the effect on your own premiums, drug coverage, and dependents before applying. An independent agent can't change your state retirement eligibility.",
      ],
    },
    {
      title: "Where to make a change",
      paragraphs: [
        "Use the official enrollment instructions and eBenefits link. The Eligibility and Enrollment Support Center handles enrollment questions at 855-859-0966. The separate Medicare Support Center at 833-429-5003 explains options but doesn't enroll you into a different plan. Source: [State Health Plan 2027 resources](https://www.shpnc.gov/2027-open-enrollment-information-medicare-members).",
      ],
    },
    {
      title: "Prepare for the enrollment conversation",
      bullets: [
        "Have your Medicare Parts A and B effective dates and your current retiree plan name.",
        "Ask which contribution category applies to you and each dependent. Use that category's official rate sheet rather than someone else's premium.",
        "Check the exact provider, facility, and service in the appropriate plan tool. A 70/30 provider tier is not a statement about the Humana group plans.",
        "Review each prescription, pharmacy, cost tier, and approval requirement in the plan documents. Keep your enrollment confirmation.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is the deadline December 7?",
      a: "The State Health Plan's 2027 Open Enrollment deadline is November 6, 2026. December 7 is a separate Medicare enrollment deadline.",
    },
    {
      q: "Will I stay on 70/30 if I do nothing?",
      a: "The Plan says members on 70/30 must take action to remain there for 2027.",
    },
    {
      q: "Can an agent enroll me in a state retiree plan?",
      a: "Use the State Health Plan's enrollment process. Ask the Plan directly about eligibility and enrollment.",
    },
  ],
  sources: [
    {
      label: "State Health Plan's current instructions",
      href: "https://www.shpnc.gov/2027-open-enrollment-information-medicare-members",
    },
    {
      label: "retirement planning resources",
      href: "https://www.shpnc.gov/retiree-benefits/planning-retirement",
    },
    {
      label: "Official 2027 Medicare plan comparison",
      href: "https://www.shpnc.gov/documents/open-enrollment-documents/2027-medicare-plan-comparison/open",
    },
    {
      label: "Official 2027 retiree enrollment instructions",
      href: "https://www.shpnc.gov/documents/open-enrollment-documents/2027-open-enrollment-instructions-medicare-members/open",
    },
    {
      label: "How outside enrollment affects the group plans",
      href: "https://www.shpnc.gov/retiree-benefits/humana-group-medicare-advantage-ppo-base-plans",
    },
  ],
  related: [
    {
      href: "/guides/medicare-part-b-employer-coverage",
      label: "Active work coverage and Part B timing",
    },
    {
      href: "/answers/how-to-apply-for-medicare",
      label: "Apply for Medicare through Social Security",
    },
    {
      href: "/medicare",
      label: "Medicare coverage choices explained",
    },
  ],
  closing:
    "I'm Christian Brinkley, a licensed NC insurance agent in Greensboro, NC. We can talk through Medicare and retiree coverage questions. Confirm state-plan decisions directly with the State Health Plan. (919) 408-6671",
};

export const revalidate = 3600;
function currentData(): SeoGuideData {
  if (Date.now() < SHP_METADATA_REVERT_AT) return data;
  return {
    ...data,
    description:
      "Review NC State Health Plan Medicare options for 2027, what changed after open enrollment, and where to ask about retiree coverage.",
    answer:
      "Eligible NC State Health Plan retirees have three Medicare plan options for 2027: the Humana Base plans, Humana Enhanced plans, and the Aetna-administered 70/30 Plan. The October 12 through November 6, 2026 Open Enrollment period has ended. Contact the State Health Plan about your current enrollment and any remaining options.",
    sections: data.sections.map((section, index) =>
      index === 0
        ? {
            ...section,
            title: "What the 2027 default enrollment meant",
            paragraphs: [
              "Open Enrollment ended November 6, 2026. These were the State Health Plan's default enrollment instructions. Confirm your enrollment directly with the Plan and ask about any qualifying event or other option that applies now.",
            ],
            table: section.table
              ? {
                  ...section.table,
                  headers: ["Prior coverage", "2027 default described during Open Enrollment"],
                  rows: [
                    [
                      "Humana Medicare Advantage",
                      "Remain in the current plan unless a change was requested",
                    ],
                    ["70/30 Plan", "Move to the Humana Base plans unless action was taken"],
                  ],
                }
              : undefined,
          }
        : section,
    ),
    faqs: data.faqs.map((faq, index) =>
      index === 0
        ? {
            ...faq,
            a: "The State Health Plan's 2027 Open Enrollment deadline was November 6, 2026. Medicare's December 7 deadline is separate. Contact the Plan about your current enrollment and any remaining options.",
          }
        : index === 1
          ? {
              ...faq,
              a: "During 2027 Open Enrollment, the Plan said 70/30 members needed to take action to remain there. Confirm the coverage you have now directly with the State Health Plan.",
            }
          : faq,
    ),
  };
}
export function generateMetadata(): Metadata {
  return seoGuideMetadata(currentData());
}
export default function Page() {
  return <SeoGuidePage data={currentData()} />;
}
