import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";

const data: SeoGuideData = {
  slug: "moving-to-north-carolina-medicare",
  title: "Moving to North Carolina with Medicare",
  metaTitle: "Moving to North Carolina Medicare Checklist",
  description:
    "Moving to North Carolina with Medicare? Check your plan's service area, enrollment window, Medigap policy, prescriptions, and state assistance.",
  published: "2026-10-08",
  reviewed: "2026-11-05",
  answer:
    "Moving to North Carolina doesn't end Original Medicare, but it can change which Medicare Advantage and Part D plans you can use. Tell your current plan before the move so you can confirm your enrollment window and arrange coverage for your new address.",
  sections: [
    {
      title: "What follows you and what needs checking",
      paragraphs: [
        "Medigap source: [Medicare's Medigap buying and switching resources](https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy). NC help: [NC DOI](https://www.ncdoi.gov/consumers/new-medicare).",
      ],
      table: {
        caption: "What follows you and what needs checking",
        headers: ["Coverage", "Moving check"],
        rows: [
          ["Original Medicare", "Update your address; use providers that accept Medicare"],
          [
            "Standard Medigap",
            "You can generally keep it with Original Medicare; ask about premium changes",
          ],
          ["Medicare SELECT", "Check network and service-area rules, plus any right to switch"],
          [
            "Medicare Advantage or Part D",
            "Confirm the new address is in the service area and check replacement coverage if needed",
          ],
          [
            "Medicaid or an MSP from another state",
            "Contact NC Medicaid; don't assume it transfers",
          ],
        ],
      },
    },
    {
      title: "Tell your plan when you're moving",
      paragraphs: [
        "If you move outside your plan's service area, Medicare says your chance to switch starts when you move and continues for two full months after the move. If you tell the plan before moving, it begins the month before the month you move. A move within the service area can also create options if new plans become available. Contact your plan promptly and confirm your exact dates. Source: [Medicare move-related enrollment rules](https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods).",
      ],
    },
    {
      title: "Before moving day",
      paragraphs: [
        "Give your plan the move date and new address. List your new doctors, hospital, medications, and pharmacy. Compare plans for the correct NC county, not only the ZIP code. Ask your Medigap insurer about keeping the policy and any rate change. If you want a different policy, confirm underwriting or any guaranteed issue right before canceling anything.",
      ],
    },
    {
      title: "After you arrive",
      paragraphs: [
        "Update Social Security and your insurers with the new address. Confirm new enrollment and start dates in writing. Transfer records and prescriptions. If you received Medicaid or a Medicare Savings Program elsewhere, contact NC Medicaid or county DSS about an application and timing. A temporary visit is a different situation from changing your permanent residence.",
      ],
    },
    {
      title: "Temporary visits and permanent moves differ",
      paragraphs: [
        "If you move outside your plan's service area, Medicare says your chance to switch starts when you move and continues for two full months after the move. If you tell the plan before moving, it begins the month before the month you move. A move within the service area can also create options if new plans become available. Contact your plan promptly and confirm your exact dates. Source: [Medicare move-related enrollment rules](https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods).",
      ],
    },
  ],
  faqs: [
    {
      q: "Does every move mean I must replace Medigap?",
      a: "No. Standard Medigap can generally continue with Original Medicare. Medicare SELECT needs a separate network check.",
    },
    {
      q: "Does my Medicaid transfer to NC?",
      a: "Don't assume so. Contact NC Medicaid to arrange an application and avoid making coverage assumptions.",
    },
    {
      q: "What if I tell my plan after I move?",
      a: "The notification date can affect your enrollment window. Contact the plan promptly and ask for your exact dates.",
    },
  ],
  sources: [
    {
      label: "Medicare's Medigap buying and switching resources",
      href: "https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy",
    },
    {
      label: "NC DOI",
      href: "https://www.ncdoi.gov/consumers/new-medicare",
    },
    {
      label: "Medicare move-related enrollment rules",
      href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods",
    },
  ],
  related: [
    {
      href: "/guides/medicare-travel",
      label: "Temporary travel versus a permanent move",
    },
    {
      href: "/special-enrollment",
      label: "Special Enrollment Periods",
    },
    {
      href: "/service-area",
      label: "Medicare help in North Carolina communities",
    },
  ],
  closing:
    "I'm Christian Brinkley, a licensed NC insurance agent in Greensboro, NC. Bring your move date and current plan details to a phone review. There's no obligation to enroll. (919) 408-6671",
};

export const metadata = seoGuideMetadata(data);
export default function Page() {
  return <SeoGuidePage data={data} />;
}
