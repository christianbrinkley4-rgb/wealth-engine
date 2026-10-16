import type { Article } from "./articles";

/** Corrected user-supplied drafts, checked against linked primary sources on October 16, 2026. */
export const RELEASE_ARTICLES: Article[] = [
  {
    slug: "glp1-medicare-coverage-2026",
    title: "Does Medicare cover GLP-1 drugs for $50 in 2026?",
    metaTitle: "Medicare GLP-1 Coverage in 2026: The $50 Bridge",
    description:
      "The Medicare GLP-1 Bridge offers certain drugs to eligible people for $50 a month. How it differs from Part D and what to check before AEP ends.",
    keyword: "GLP-1 Medicare coverage 2026",
    eyebrow: "Medicare drug coverage, explained",
    lede: "The $50 program is real. It is temporary, has eligibility rules, and is separate from your ordinary Part D coverage.",
    published: "2026-10-16",
    updated: "2026-10-16",
    intro:
      "A headline about $50 weight-loss drugs can leave you with a practical question: does that apply to my prescription? Start by finding out which coverage route is involved. A drug covered through your regular Medicare drug plan and a drug supplied through the Medicare GLP-1 Bridge follow different rules. Don't change your treatment or switch plans based on the headline alone. Your prescriber and pharmacist can help identify the route for your prescription.",
    sections: [
      {
        h2: "What changed in 2026",
        blocks: [
          {
            kind: "p",
            text: "The Medicare GLP-1 Bridge began July 1, 2026. CMS says this temporary demonstration runs through December 31, 2027. Eligible people with Medicare drug coverage can receive certain medicines for weight management. It operates outside the normal Part D benefit. Your drug plan does not have to opt in. [Read the CMS program overview](https://www.cms.gov/medicare/coverage/prescription-drug-coverage/medicare-glp-1-bridge).",
          },
        ],
      },
      {
        h2: "Which drugs does the Bridge cover?",
        blocks: [
          {
            kind: "p",
            text: "Medicare lists Foundayo tablets, Wegovy injections or tablets, and Zepbound KwikPen. The exact product matters: the Bridge does not cover single-dose Zepbound vials or pens. Ozempic is not on that Bridge list. [Check the current Medicare drug list](https://www.medicare.gov/coverage/weight-loss-drugs).",
          },
          {
            kind: "p",
            text: "Write down the product on your prescription, including its dose and delivery device. A familiar brand name is not enough to settle the coverage question. Ask the pharmacy to check that exact prescription.",
          },
        ],
      },
      {
        h2: "Who can qualify?",
        blocks: [
          {
            kind: "p",
            text: "There are age, body mass index, medical-condition and prior-coverage requirements. A prescriber must provide the required certification and prior authorization when requested. This article cannot determine whether you qualify. [Use Medicare's eligibility information](https://www.medicare.gov/coverage/weight-loss-drugs) with your healthcare provider.",
          },
          {
            kind: "p",
            text: "CMS says people with certain diagnoses, including type 2 diabetes, are excluded from the Bridge and should check their Part D coverage instead. Previous GLP-1 coverage through Part D can also affect Bridge eligibility. [See the CMS coverage rules](https://www.cms.gov/medicare/coverage/prescription-drug-coverage/medicare-glp-1-bridge/information-part-d-plans).",
          },
        ],
      },
      {
        h2: "What does the $50 payment mean?",
        blocks: [
          {
            kind: "p",
            text: "For an eligible prescription through the Bridge, the payment is $50 for a one-month supply. It is not a blanket maximum for every GLP-1 prescription on Medicare. Regular Part D coverage has its own costs.",
          },
          {
            kind: "p",
            text: "The Bridge payment does not count toward your Part D deductible or yearly out-of-pocket limit. Extra Help does not lower that Bridge copayment, and the Medicare Prescription Payment Plan does not spread it across months. [Medicare explains the cost rules](https://www.medicare.gov/coverage/weight-loss-drugs).",
          },
        ],
      },
      {
        h2: "How does this relate to the Part D cap?",
        blocks: [
          {
            kind: "p",
            text: "In 2026, the annual out-of-pocket limit for covered Part D drugs is $2,100. Bridge payments stay outside that calculation. A covered prescription under your ordinary drug plan follows that plan's rules instead. [Review Medicare drug coverage costs](https://www.medicare.gov/health-drug-plans/part-d/basics/costs) and the [CMS Bridge FAQ](https://www.cms.gov/files/document/medicare-glp-1-bridge-expectations-faqs.pdf).",
          },
          {
            kind: "p",
            text: "Keep these two questions separate when you call: how is this prescription covered, and which payments count toward my drug-plan limit? Ask for a written explanation if the answers are unclear.",
          },
        ],
      },
      {
        h2: "What to check during Annual Enrollment",
        blocks: [
          {
            kind: "p",
            text: "Annual Enrollment runs October 15 through December 7. It lets eligible people review Medicare Advantage and Part D options for the following year. [Medicare explains the enrollment window](https://www.medicare.gov/health-drug-plans/open-enrollment).",
          },
          {
            kind: "ul",
            items: [
              "List all prescriptions, doses and preferred pharmacies, not just the GLP-1.",
              "Ask your prescriber which coverage route applies to the GLP-1 prescription.",
              "Check the coming year's formulary, authorization rules and pharmacy costs for drugs covered through Part D.",
              "Review your full coverage before deciding whether to change plans.",
            ],
          },
          {
            kind: "p",
            text: "Bring the prescription label and any coverage or denial letter to the conversation. Keep Medicare and Social Security numbers off public forms. We can start with your question without putting your medical details into a website message.",
          },
        ],
      },
      {
        h2: "Want help sorting out the coverage questions?",
        blocks: [
          {
            kind: "p",
            text: "I'm Christian Brinkley. I'm 21 and a licensed NC insurance agent in Greensboro. I can help you organize the insurance questions for a conversation. Your healthcare provider handles treatment decisions. A consultation doesn't establish eligibility or guarantee coverage.",
          },
          {
            kind: "p",
            text: "[Request a Medicare conversation](/aep#request-review). No obligation to enroll. (919) 408-6671",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Is Ozempic automatically $50 on Medicare?",
        a: "No. Ozempic is not on Medicare's Bridge drug list. Its coverage and cost under an ordinary Part D plan require a separate check.",
      },
      {
        q: "Does everyone with Medicare qualify for the Bridge?",
        a: "No. Medicare drug coverage and the program's eligibility requirements must be checked. Ask your healthcare provider and Medicare about your situation.",
      },
      {
        q: "Does the Bridge copay count toward my Part D limit?",
        a: "No. CMS says the Bridge operates outside Part D, so its copayment does not count toward that limit.",
      },
      {
        q: "Can Christian help me understand where to start?",
        a: "Yes. Bring your insurance question and relevant coverage letter. For a free conversation with no obligation to enroll, call (919) 408-6671",
      },
    ],
    sources: [
      {
        label: "Medicare: covered Bridge drugs, eligibility and costs",
        href: "https://www.medicare.gov/coverage/weight-loss-drugs",
      },
      {
        label: "CMS: Medicare GLP-1 Bridge",
        href: "https://www.cms.gov/medicare/coverage/prescription-drug-coverage/medicare-glp-1-bridge",
      },
      {
        label: "CMS: information for Part D plans",
        href: "https://www.cms.gov/medicare/coverage/prescription-drug-coverage/medicare-glp-1-bridge/information-part-d-plans",
      },
      {
        label: "CMS: Bridge expectations and FAQs",
        href: "https://www.cms.gov/files/document/medicare-glp-1-bridge-expectations-faqs.pdf",
      },
      {
        label: "Medicare: Part D costs",
        href: "https://www.medicare.gov/health-drug-plans/part-d/basics/costs",
      },
      {
        label: "Medicare: Open Enrollment",
        href: "https://www.medicare.gov/health-drug-plans/open-enrollment",
      },
    ],
    related: [
      {
        label: "Annual Enrollment review",
        href: "/aep",
      },
      {
        label: "Understanding your plan letter",
        href: "/anoc",
      },
    ],
    startHref: "/aep#request-review",
  },
  {
    slug: "medicare-advantage-plan-terminations-2026",
    title: "My Medicare Advantage plan is ending. What should I do?",
    metaTitle: "Medicare Advantage Plan Ending? Your Next Steps",
    description:
      "A plan non-renewal does not mean Medicare itself ends. Check your notice, enrollment rights, doctors and drug coverage before the plan ends.",
    keyword: "Medicare Advantage plan ending 2026",
    eyebrow: "Medicare plan letters, explained",
    lede: "Start with the notice and its end date. Annual Enrollment and a non-renewal Special Enrollment Period have different rules.",
    published: "2026-10-16",
    updated: "2026-10-16",
    intro:
      "If you received a letter saying your Medicare Advantage plan will end, put the whole letter somewhere you can find it. Keep the envelope and any separate drug-coverage information too. The first question is what the notice actually says. A plan that is leaving Medicare, a contract that is not renewed, and a plan changing benefits are different situations. You don't need a national headline to tell you whether your own plan is affected. Start with your plan's written notice.",
    sections: [
      {
        h2: "Confirm what is ending and when",
        blocks: [
          {
            kind: "p",
            text: "Look for the plan name, coverage end date, reason for the notice and contact number. If you cannot find the letter, call the number on your member card and request a copy. Ask whether this is a non-renewal, another contract termination, or a change to next year's benefits.",
          },
          {
            kind: "p",
            text: "An Annual Notice of Change describes coming-year changes. Don't assume every change letter means the plan is ending. Read the actual notice with someone who can help explain the coverage and timing questions.",
          },
        ],
      },
      {
        h2: "December 7 is important, but it is not the only possible deadline",
        blocks: [
          {
            kind: "p",
            text: "Annual Enrollment runs October 15 through December 7. Eligible changes generally take effect January 1. If your plan will end December 31, use the fall window to arrange the coverage you want for the new year. [Read Medicare's Open Enrollment guidance](https://www.medicare.gov/health-drug-plans/open-enrollment).",
          },
          {
            kind: "p",
            text: "For a Medicare Advantage contract that is not renewed, Medicare lists a Special Enrollment Period from December 8 through the last day of February of the following year. Other contract terminations have different timing. [Check the event-specific Medicare rules](https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods).",
          },
          {
            kind: "p",
            text: "If December 7 has passed, get help promptly. Confirm your exact enrollment right and the date new coverage would start. An extra enrollment window does not mean you should leave a drug-coverage question unresolved until February.",
          },
        ],
      },
      {
        h2: "Does doing nothing mean losing Medicare?",
        blocks: [
          {
            kind: "p",
            text: "For the non-renewal situation, Medicare says you move to Original Medicare if you do not join another Medicare Advantage plan before the current plan ends. That is different from losing Medicare altogether. [See Medicare's non-renewal explanation](https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods).",
          },
          {
            kind: "p",
            text: "Original Medicare does not generally include outpatient prescription drug coverage. Check whether you need a separate Part D plan and when it can start. Ask what costs and additional benefits will change. Do not assume that every part of your old coverage continues automatically. [Review drug-coverage costs](https://www.medicare.gov/health-drug-plans/part-d/basics/costs).",
          },
        ],
      },
      {
        h2: "Compare the coverage you would actually use",
        blocks: [
          {
            kind: "ul",
            items: [
              "Doctors and hospitals: verify the exact plan and coming plan year with both the plan and the provider. Accepting Medicare is not the same as being in a particular plan's network.",
              "Prescriptions: list each drug, dose and preferred pharmacy. Check coverage requirements and expected costs.",
              "Medical costs: compare the premium, deductible, copays, coinsurance and out-of-pocket limit.",
              "Other coverage: bring information about employer, retiree, Medicaid or other insurance that may coordinate with Medicare.",
            ],
          },
          {
            kind: "p",
            text: "Available plans depend on where you live. A national average is not a list of your local options. Use your address and your own doctors and prescriptions when you compare. [Medicare Plan Compare](https://www.medicare.gov/plan-compare) is a place to begin.",
          },
        ],
      },
      {
        h2: "Ask about Medigap rights before applying",
        blocks: [
          {
            kind: "p",
            text: "Some coverage losses create guaranteed issue rights to buy certain Medigap policies. These protections and deadlines are separate from Annual Enrollment. Do not assume you can buy any Medigap policy at any time without health questions. Keep your plan-ending notice as evidence. [Read Medicare's Medigap timing guidance](https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when).",
          },
        ],
      },
      {
        h2: "Bring the letter and start with your questions",
        blocks: [
          {
            kind: "p",
            text: "I'm Christian Brinkley, a 21-year-old licensed NC insurance agent in Greensboro. Bring the notice, your doctor list and your prescription list. We can work through the insurance questions in plain language and identify what still needs confirmation. There is no obligation to enroll or switch plans.",
          },
          {
            kind: "p",
            text: "[Request a Medicare conversation](/aep#request-review). Do not submit Medicare or Social Security numbers through the callback form. (919) 408-6671",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Does a plan-ending letter mean I lose Medicare itself?",
        a: "No. Medicare describes a return to Original Medicare in the non-renewal situation if another Medicare Advantage plan is not chosen. Check drug coverage separately.",
      },
      {
        q: "Can I still change coverage after December 7?",
        a: "A qualifying non-renewal has a Special Enrollment Period from December 8 through the last day of February. Confirm the notice and effective date; other terminations have different rules.",
      },
      {
        q: "Does a national statistic prove my plan is ending?",
        a: "No. Confirm your own plan, county and plan year with the plan. Its written notice is the starting point.",
      },
      {
        q: "Where can I get help understanding my letter?",
        a: "You can contact your plan, Medicare, or a licensed agent. For a free conversation with Christian in Greensboro, with no obligation to enroll, call (919) 408-6671",
      },
    ],
    sources: [
      {
        label: "Medicare: Special Enrollment Periods",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods",
      },
      {
        label: "Medicare: Open Enrollment",
        href: "https://www.medicare.gov/health-drug-plans/open-enrollment",
      },
      {
        label: "Medicare: Part D costs",
        href: "https://www.medicare.gov/health-drug-plans/part-d/basics/costs",
      },
      {
        label: "Medicare: when to buy Medigap",
        href: "https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when",
      },
      {
        label: "Medicare Plan Compare",
        href: "https://www.medicare.gov/plan-compare",
      },
    ],
    related: [
      {
        label: "Annual Enrollment review",
        href: "/aep",
      },
      {
        label: "Plan not renewing: Triad checklist",
        href: "/guides/medicare-plan-not-renewing-triad",
      },
      {
        label: "Your Annual Notice of Change",
        href: "/anoc",
      },
    ],
    startHref: "/aep#request-review",
  },
];
