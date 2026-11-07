import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";

const data: SeoGuideData = {
  slug: "medicare-automatic-renewal",
  title: "Do you have to renew Medicare every year?",
  metaTitle: "Do You Have to Renew Medicare Every Year?",
  description:
    "Usually, you don't reapply for Medicare each year. See which coverage continues, when a plan notice requires action, and what to review each fall.",
  published: "2026-10-08",
  reviewed: "2026-11-07",
  answer:
    "No. Original Medicare does not ask you to renew each year, and most Medicare Advantage and Part D plans renew automatically. You act only if your plan ends, you move out of its service area, or you want to change coverage. Original Medicare generally continues while you're eligible and pay any required premiums, while Medicare Advantage and Part D plans usually continue only if the plan and your eligibility continue.",
  sections: [
    {
      title: "Do I have to renew Medicare each year?",
      paragraphs: [
        "No. Original Medicare has no yearly renewal. It continues while you stay eligible and pay any required premiums. You do not reapply, and you do not get a new card each January.",
        "Medicare Advantage and Part D plans also usually renew automatically. The exception is when the plan ends, you move out of its service area, or you choose to change coverage. Even when nothing needs renewing, read the Annual Notice of Change each fall, because premiums, drugs, and costs can change.",
      ],
    },
    {
      title: "What generally continues",
      paragraphs: [
        "Continuation depends on your coverage type, eligibility, and required premiums. Review plan notices even when you do not need to reapply. See [Medicare Open Enrollment](https://www.medicare.gov/health-drug-plans/open-enrollment) and [Medigap renewal protections](https://www.medicare.gov/health-drug-plans/medigap/basics).",
      ],
      table: {
        caption: "What generally continues",
        headers: ["Coverage", "Annual reapplication usually needed?", "Reason to check"],
        rows: [
          ["Original Medicare", "No", "Eligibility, premiums owed, and official notices"],
          [
            "Medicare Advantage",
            "No, if the plan and eligibility continue",
            "Nonrenewal, move, eligibility change, or benefit changes",
          ],
          [
            "Part D",
            "No, if the plan and eligibility continue",
            "Nonrenewal, service area, drugs, pharmacy, and costs",
          ],
          [
            "Medigap",
            "Usually no; generally guaranteed renewable",
            "Pay premiums and read insurer notices",
          ],
        ],
      },
    },
    {
      title: "A notice isn't always a renewal form",
      paragraphs: [
        "An Annual Notice of Change describes the coming year's changes for a Medicare Advantage or drug plan. Your plan must send it so you receive it by September 30 each year, before Annual Enrollment opens October 15. Source: Medicare.gov. A nonrenewal notice means something different. Read the plan status before deciding you can do nothing. If a plan ends, confirm replacement medical and drug coverage rather than assuming Medicare will pick a new Advantage plan for you. See [Medicare Special Enrollment Periods](https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods).",
      ],
    },
    {
      title: "Review even when you don't reapply",
      paragraphs: [
        "Check your doctors, drugs, pharmacy, premiums, deductible, and cost sharing for the new year. Medicare Open Enrollment runs October 15 through December 7, with changes generally effective January 1. A review doesn't require changing plans. Source: [Medicare Open Enrollment](https://www.medicare.gov/health-drug-plans/open-enrollment).",
      ],
    },
    {
      title: "Medicaid paperwork is separate",
      paragraphs: [
        "If you also have Medicaid or help with Medicare costs, answer renewal or information requests from the agency handling that benefit. Medicare continuing doesn't mean every assistance program continues without paperwork. Keep your address current with your coverage providers.",
      ],
    },
    {
      title: "A short annual review checklist",
      bullets: [
        "Confirm that the plan is continuing at your permanent address.",
        "Read the Annual Notice of Change and the coming year's Evidence of Coverage.",
        "Check every prescription, dose, pharmacy, and any coverage restriction.",
        "Check your specific doctors and hospitals with both the plan and provider.",
        "Compare the new premium, deductible, medical cost sharing, and applicable out-of-pocket limits. Keep coverage that still fits if you do not need a change.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do you have to renew Medicare every year?",
      a: "Usually no. Original Medicare continues while you stay eligible and pay any required premiums, and Medicare Advantage and Part D plans usually renew automatically. Check the Annual Notice of Change each fall, because premiums, drugs, and costs can change even when nothing needs renewing.",
    },
    {
      q: "Do I need a new Original Medicare card every January?",
      a: "No. The card isn't an annual renewal form. Replace it if you need a replacement, and check the effective dates when you first enroll.",
    },
    {
      q: "Can a plan renew with higher costs?",
      a: "Yes. Continuing enrollment doesn't freeze premiums, drug coverage, or cost sharing.",
    },
    {
      q: "What if my plan says it won't renew?",
      a: "Follow the notice and confirm which enrollment period and effective dates apply. Drug coverage may need a separate decision. See [what to do if your plan is not returning](/guides/medicare-plan-not-renewing-triad).",
    },
  ],
  sources: [
    {
      label: "Medicare.gov",
      href: "https://www.medicare.gov/health-drug-plans/medigap/basics",
    },
    {
      label: "CMS: Guide to consumer mailings (ANOC sent each September)",
      href: "https://www.cms.gov/medicare/prescription-drug-coverage/limitedincomeandresources/downloads/consumer-mailings.pdf",
    },
    {
      label: "Medicare Special Enrollment Periods",
      href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods",
    },
    {
      label: "Medicare Open Enrollment",
      href: "https://www.medicare.gov/health-drug-plans/open-enrollment",
    },
  ],
  related: [
    {
      href: "/anoc",
      label: "Read your Annual Notice of Change",
    },
    {
      href: "/guides/medicare-advantage-plans-leaving-nc-2027",
      label: "Medicare Advantage plans leaving NC in 2027",
    },
    {
      href: "/guides/extra-help-medicare-savings-programs-nc",
      label: "Assistance programs have separate rules",
    },
  ],
  closing:
    "I'm Christian Brinkley, a licensed NC insurance agent in Greensboro, NC. Bring a renewal or nonrenewal letter to a phone review. There's no obligation to enroll. (919) 408-6671",
};

export const metadata = seoGuideMetadata(data);
export default function Page() {
  return <SeoGuidePage data={data} />;
}
