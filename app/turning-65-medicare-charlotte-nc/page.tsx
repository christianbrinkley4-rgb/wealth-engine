import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";

const data: SeoGuideData = {
  slug: "turning-65-medicare-charlotte-nc",
  path: "/turning-65-medicare-charlotte-nc",
  title: "Turning 65 in Charlotte, NC: Medicare help and checklist",
  metaTitle: "Turning 65 Medicare Help Charlotte NC: Checklist",
  description:
    "Turning 65 in Charlotte? Check Medicare enrollment, job coverage, doctors, prescriptions, and where to get help before choosing coverage.",
  published: "2026-11-05",
  answer:
    "Turning 65 in Charlotte? Start by checking when Medicare should begin and whether current job coverage changes your enrollment steps. Then compare your doctors, prescriptions, and coverage options for your home address.",
  sections: [
    {
      title: "1. Find your Medicare enrollment window",
      paragraphs: [
        "Your usual Initial Enrollment Period lasts seven months: the three months before your 65th birthday month, that month, and the three months after. If your birthday is on the first day of a month, Medicare treats your birthday as being in the previous month for this timing. Confirm your dates before choosing a start date.",
        "Some people are enrolled automatically. Others must apply. Check whether you already have a Medicare card and which start dates it shows. [Apply through Social Security](/answers/how-to-apply-for-medicare) if you need to enroll in Parts A and B. You don't have to start Social Security retirement payments to apply for Medicare.",
      ],
    },
    {
      title: "2. Check current job coverage before delaying Part B",
      paragraphs: [
        "Coverage through your own or your spouse's current employment may let you delay Part B without a late enrollment penalty. Ask the benefits administrator who pays first after 65 and get the answer for your actual coverage. Employer size matters for coordination, but it isn't the whole enrollment decision.",
        "COBRA and retiree coverage aren't current-employment coverage for the usual Part B Special Enrollment Period. HSA contributions also need attention when Medicare starts, including possible retroactive Part A coverage. Read the [Part B and employer coverage guide](/guides/medicare-part-b-employer-coverage) before deciding to wait.",
      ],
    },
    {
      title: "3. Compare two ways to receive Medicare coverage",
      paragraphs: [
        "Both paths need a closer look at covered services, monthly costs, and what you pay when you use care. Medigap supplements Original Medicare. It doesn't supplement Medicare Advantage.",
      ],
      table: {
        caption: "Questions to compare before choosing a coverage path",
        headers: ["Decision", "Original Medicare", "Medicare Advantage"],
        rows: [
          [
            "Doctors",
            "Generally providers nationwide that accept Medicare",
            "Check the exact plan's network and out-of-network rules",
          ],
          [
            "Prescriptions",
            "A separate Part D plan is usually needed",
            "Most plans include Part D; check the plan",
          ],
          [
            "Other coverage",
            "Consider whether a Medigap policy is available and appropriate",
            "Check copayments, annual medical out-of-pocket limit, and approval rules",
          ],
        ],
      },
    },
    {
      title: "4. Use your address, not just the Charlotte city name",
      paragraphs: [
        "Medicare Advantage availability depends on the plan's service area. Confirm the county for your home address before comparing plans. A Charlotte mailing address alone doesn't establish which plans you can join.",
        "Write down the exact doctor, practice location, hospital, pharmacy, and medication name and dose. Ask about your specific plan, not simply whether an office takes Medicare. Check prescription coverage and pharmacy costs in [Medicare Plan Compare](https://www.medicare.gov/plan-compare/). A familiar hospital name isn't proof that every doctor or service participates.",
      ],
    },
    {
      title: "5. Put your first conversation checklist together",
      bullets: [
        "Your birthday month and any Medicare start dates already assigned.",
        "Your current insurance, whether it comes from current employment, and when it ends.",
        "Your doctors, prescriptions and doses, and preferred pharmacies.",
        "Any retiree, Medicaid, VA, or other coverage that needs coordination.",
        "Questions about premiums, doctor access, travel, and what happens next.",
      ],
      paragraphs: [
        "Keep your Social Security number, Medicare number, and medical records out of a general website inquiry. Ask how to provide needed information securely.",
      ],
    },
    {
      title: "6. Choose the kind of help you want",
      paragraphs: [
        "[NC SHIIP](https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip) offers free, unbiased Medicare counseling. Use its county resources for local counseling options. Social Security handles Part A and Part B enrollment. Medicare.gov provides official coverage information and plan comparisons.",
        "A licensed insurance agent can explain represented insurance options, but doesn't offer every plan or make Medicare eligibility decisions. If you'd like a phone conversation, see [Medicare consultations for Charlotte residents](/medicare-consultation-charlotte-nc) for what to prepare and what a call covers.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I enroll in Medicare through Social Security?",
      a: "Social Security handles most Part A and Part B applications. The Railroad Retirement Board handles enrollment for certain railroad beneficiaries. Private plan enrollment is a separate step.",
    },
    {
      q: "Can I delay Part B while I'm still working?",
      a: "Possibly, when you have qualifying coverage through your own or your spouse's current employment. Confirm who pays first, your enrollment rights, and HSA implications before delaying.",
    },
    {
      q: "Does fall enrollment replace my turning-65 window?",
      a: "No. The October 15 to December 7 annual enrollment period for Medicare health and drug plans doesn't replace your Initial Enrollment Period for Parts A and B.",
    },
    {
      q: "Do you have an office in Charlotte?",
      a: "Christian is based in Greensboro. Charlotte appointments are by phone.",
    },
  ],
  sources: [
    {
      label: "Medicare: When can I sign up?",
      href: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-can-i-sign-up-for-medicare",
    },
    {
      label: "Social Security: Sign up for Medicare",
      href: "https://www.ssa.gov/medicare/sign-up",
    },
    { label: "NC DOI: New to Medicare", href: "https://www.ncdoi.gov/consumers/new-medicare" },
    {
      label: "Medicare: Your coverage options",
      href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/your-coverage-options",
    },
  ],
  related: [
    {
      label: "Medicare phone consultations for Charlotte residents",
      href: "/medicare-consultation-charlotte-nc",
    },
    { label: "How to apply for Medicare", href: "/answers/how-to-apply-for-medicare" },
    {
      label: "Part B when you're still working",
      href: "/guides/medicare-part-b-employer-coverage",
    },
  ],
  closing:
    "I'm Christian Brinkley, a 21-year-old licensed NC insurance agent based in Greensboro, NC. Charlotte residents can book a free phone conversation about Medicare questions. There's no obligation to enroll. (919) 408-6671",
  bookingLabel: "Book a Medicare phone conversation",
};

export const metadata = seoGuideMetadata(data);
export default function Page() {
  return <SeoGuidePage data={data} />;
}
