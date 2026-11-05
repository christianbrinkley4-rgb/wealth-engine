import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";

const data: SeoGuideData = {
  slug: "medicare-travel",
  title: "Do Medicare Advantage plans cover out of state?",
  metaTitle: "Do Medicare Advantage Plans Cover Out of State?",
  description:
    "Medicare Advantage covers emergency and urgently needed care while traveling in the US. Routine care depends on your plan. Check HMO and PPO rules.",
  published: "2026-10-08",
  reviewed: "2026-11-05",
  answer:
    "Medicare Advantage plans cover emergency and urgently needed care while you're traveling in the United States. Routine out-of-state visits depend on your plan's network, benefits, and approval rules, so don't assume a doctor who accepts Medicare is covered by your plan.",
  sections: [
    {
      title: "What kind of care do you need?",
      paragraphs: [
        "HMO plans generally restrict routine care to their network, with specified exceptions. PPO plans generally allow out-of-network covered services at a different cost, but provider acceptance and plan terms still matter. Sources: [Medicare HMO rules](https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/HMO), [Medicare PPO rules](https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/PPO).",
      ],
      table: {
        caption: "What kind of care do you need?",
        headers: ["Care while away", "What to check"],
        rows: [
          [
            "Emergency care",
            "Seek needed emergency treatment; follow the plan's reporting and follow-up instructions",
          ],
          [
            "Urgently needed care",
            "Covered out-of-area care under the plan's Medicare rules; ordinary cost sharing can still apply",
          ],
          [
            "Routine appointment",
            "Network participation, out-of-network benefits, referrals, and authorization",
          ],
          [
            "Dialysis while temporarily away",
            "Arrange the facility and coverage with the plan before travel",
          ],
        ],
      },
    },
    {
      title: "Ask before a planned appointment",
      paragraphs: [
        "Give member services the provider's name, location, service, and date. Ask whether the visit is covered, whether approval is required, and what cost sharing applies. Confirm with the provider too. A carrier's logo on a website doesn't prove participation in your exact plan. Keep the answer and any confirmation number.",
      ],
    },
    {
      title: "A long visit isn't the same as a move",
      paragraphs: [
        "Plans have rules about how long you can remain outside the service area. Ask before an extended stay. If you're changing your permanent address, a move-related Special Enrollment Period may apply. Use the [Medicare enrollment guide](https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods), not a routine travel benefit, to check that situation.",
      ],
    },
    {
      title: "Original Medicare and foreign travel",
      paragraphs: [
        "Original Medicare generally allows covered care with Medicare-accepting providers across the US. Standard Medigap generally follows covered Medicare services, while Medicare SELECT policies can have network restrictions. Foreign care has different, limited rules; don't use an out-of-state answer as an overseas-coverage promise. Source: [Medicare foreign coverage guide](https://www.medicare.gov/publications/11037-medicare-coverage-outside-the-united-states.pdf).",
      ],
    },
    {
      title: "Pack a coverage checklist before leaving",
      bullets: [
        "Take your plan card and member services number. Keep medication names and doses available.",
        "For planned treatment, confirm the exact doctor, facility, service, network status, and any approval.",
        "Arrange recurring treatment, including dialysis, ahead of time. Ask what happens if a prescription needs a refill away from home.",
        "For overseas travel, check the destination, covered emergencies, reimbursement process, exclusions, and whether you need separate travel medical coverage.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can I see a routine specialist in another state?",
      a: "Check the exact provider and service with the plan. HMO, PPO, network, and authorization rules matter.",
    },
    {
      q: "Is emergency care free because I'm traveling?",
      a: "No. Coverage doesn't remove the plan's applicable cost sharing.",
    },
    {
      q: "Can I use my Medicare in another state?",
      a: "Original Medicare generally covers services from providers that accept Medicare across the US. Medicare Advantage covers emergency and urgently needed out-of-area care, but planned visits depend on the exact plan.",
    },
    {
      q: "Can I see a doctor in another state with Medicare?",
      a: "With Original Medicare, generally yes if the doctor accepts Medicare and the service is covered. With Medicare Advantage, confirm the doctor, service, network rules, and any approval before a planned appointment.",
    },
  ],
  sources: [
    {
      label: "Medicare HMO rules",
      href: "https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/HMO",
    },
    {
      label: "Medicare PPO rules",
      href: "https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/PPO",
    },
    {
      label: "Medicare enrollment guide",
      href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods",
    },
    {
      label: "Medicare foreign coverage guide",
      href: "https://www.medicare.gov/publications/11037-medicare-coverage-outside-the-united-states.pdf",
    },
  ],
  related: [
    {
      href: "/guides/moving-to-north-carolina-medicare",
      label: "Moving permanently to North Carolina",
    },
    {
      href: "/medicare-advantage-doctor-networks",
      label: "Check a plan's provider network",
    },
    {
      href: "/medicare-advantage-vs-medigap-greensboro-nc",
      label: "Compare Medicare Advantage and Medigap",
    },
  ],
  closing:
    "I'm Christian Brinkley, a licensed NC insurance agent in Greensboro, NC. Bring your travel plans and coverage questions to a phone review. Confirm planned care with your insurer. (919) 408-6671",
};

export const metadata = seoGuideMetadata(data);
export default function Page() {
  return <SeoGuidePage data={data} />;
}
