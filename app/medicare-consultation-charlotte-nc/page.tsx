import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";

const data: SeoGuideData = {
  slug: "medicare-consultation-charlotte-nc",
  path: "/medicare-consultation-charlotte-nc",
  title: "Free Medicare phone consultation for Charlotte, NC residents",
  metaTitle: "Free Medicare Consultation Charlotte NC | Christian",
  description:
    "Charlotte residents can book a free Medicare phone consultation with Christian Brinkley. Review questions, enrollment timing, doctors, and prescriptions.",
  published: "2026-11-05",
  answer:
    "Charlotte residents can book a free Medicare phone consultation about enrollment timing, plan notices, doctors, and prescriptions. There's no obligation to enroll, and you can bring a family member into the conversation.",
  sections: [
    {
      title: "Choose a phone appointment",
      paragraphs: [
        "The booking calendar offers 45-minute phone appointments. Choose an available time and follow the calendar's confirmation steps. Sending a question through a website form is a request for contact; it doesn't reserve an appointment.",
        "This is a conversation with a licensed insurance agent based in Greensboro. It isn't an appointment with Medicare, Social Security, or a Charlotte government office. Use the appointment link below when you're ready.",
      ],
    },
    {
      title: "What would you like to work through?",
      table: {
        caption: "Common reasons for a Medicare conversation",
        headers: ["Your question", "What to have nearby"],
        rows: [
          [
            "I'm turning 65 or retiring",
            "Current insurance details and expected coverage end date",
          ],
          [
            "My plan sent me a change or termination notice",
            "The actual notice, plan name, and plan ID",
          ],
          [
            "I want to check doctors and prescriptions",
            "Exact provider locations, medication names and doses, and pharmacy",
          ],
          [
            "I moved or my coverage changed",
            "Move date, new address county, and current coverage information",
          ],
        ],
      },
      paragraphs: [
        "We can discuss enrollment questions and review plans I represent when appropriate. A conversation doesn't establish that a doctor, drug, benefit, or enrollment period applies to you. Those details need to be checked against your circumstances and the actual plan.",
      ],
    },
    {
      title: "Before the call",
      bullets: [
        "Write down the question you most want answered.",
        "Have the current notice or insurance document available if it's relevant.",
        "List doctors and prescriptions if you'd like to discuss coverage checks.",
        "Invite a spouse, adult child, or other person you want involved.",
        "Keep Social Security numbers, Medicare numbers, and medical records out of a general inquiry message.",
      ],
      paragraphs: [
        "If you're new to Medicare, the [turning-65 checklist for Charlotte residents](/turning-65-medicare-charlotte-nc) explains the enrollment steps before the appointment. You don't need to arrive knowing every insurance term.",
      ],
    },
    {
      title: "During and after the conversation",
      paragraphs: [
        "We start with your question and the coverage you have now. Then we identify what needs checking, such as enrollment dates, a plan notice, provider participation, or drug coverage. If more documents are needed, we can identify them before discussing a change.",
        "For a plan discussion, required permission and scope-of-appointment steps apply before an individual sales appointment when required. Booking a call isn't an enrollment application and doesn't change coverage. You'll have time to ask questions and decide whether to take another step.",
        "Don't cancel current coverage because of an initial conversation. Confirm acceptance, effective dates, and how the change affects any employer, retiree, Medicaid, or other benefits first.",
      ],
    },
    {
      title: "Why the consultation doesn't have a fee",
      paragraphs: [
        "You aren't charged for the consultation. Insurance companies may pay agent commissions when an eligible person enrolls through an agent. That compensation doesn't mean every plan is represented or that a particular plan is right for you.",
        "I represent a limited number of companies and don't offer every plan available in your area. You can compare all available options through Medicare.gov or discuss public counseling through NC SHIIP. The required disclosure below explains the limits of the service.",
      ],
    },
    {
      title: "Other places to get an answer",
      paragraphs: [
        "For free, unbiased counseling, contact [NC SHIIP](https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip). Use [Medicare Plan Compare](https://www.medicare.gov/plan-compare/) for official plan comparisons. Social Security handles most Part A and Part B enrollment applications, not a private insurance agent.",
        "If you aren't sure what to ask, start with these [questions to ask a Medicare agent](/questions-to-ask-medicare-agent). An appointment should help you understand your choices, without a promised financial result or pressure to enroll.",
      ],
    },
  ],
  faqs: [
    {
      q: "Are you located in Charlotte?",
      a: "I'm based in Greensboro, NC. Charlotte appointments are by phone.",
    },
    {
      q: "Do I have to enroll during the call?",
      a: "No. The consultation is free and there's no obligation to enroll. A booked appointment doesn't change your insurance.",
    },
    {
      q: "Do you offer every Medicare plan?",
      a: "No. I represent a limited number of insurance companies. Medicare.gov and NC SHIIP can help you explore options beyond the plans I represent.",
    },
    {
      q: "Can a family member join the call?",
      a: "Yes. A spouse or family member is welcome. You'll still need to give any required permission for someone else to discuss or act on your coverage.",
    },
    {
      q: "Can you approve my Medicare application?",
      a: "No. Social Security, Medicare, state agencies, and insurers make the relevant eligibility and enrollment decisions. I can help explain the process and represented insurance options.",
    },
  ],
  sources: [
    {
      label: "NC DOI: SHIIP Medicare counseling",
      href: "https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip",
    },
    {
      label: "Medicare: Find health and drug plans",
      href: "https://www.medicare.gov/plan-compare/",
    },
    {
      label: "Social Security: Sign up for Medicare",
      href: "https://www.ssa.gov/medicare/sign-up",
    },
  ],
  related: [
    {
      label: "Turning 65 in Charlotte: enrollment checklist",
      href: "/turning-65-medicare-charlotte-nc",
    },
    { label: "Questions to ask before a consultation", href: "/questions-to-ask-medicare-agent" },
    { label: "How a Medicare plan review works", href: "/plan-check" },
  ],
  closing:
    "I'm Christian Brinkley, a 21-year-old licensed NC insurance agent in Greensboro, NC. For a Charlotte Medicare phone consultation, choose an appointment below. There's no obligation to enroll. (919) 408-6671",
  bookingLabel: "Choose a free phone appointment",
};

export const metadata = seoGuideMetadata(data);
export default function Page() {
  return <SeoGuidePage data={data} />;
}
