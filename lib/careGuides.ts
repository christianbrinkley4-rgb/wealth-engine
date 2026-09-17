export interface CareGuide {
  slug: string;
  title: string;
  description: string;
  headline: string;
  introduction: string;
  focus: "long_term" | "short_term" | "critical_illness";
  sections: Array<{ heading: string; text: string }>;
  questions: string[];
  faq: Array<{ q: string; a: string }>;
  sources: Array<{ title: string; url: string }>;
}

export const CARE_GUIDES: CareGuide[] = [
  {
    slug: "long-term-care-insurance",
    title: "Long-Term Care Insurance in Greensboro & the Triad",
    description:
      "Discuss long-term care insurance, home care, policy limits, and family needs with Christian Brinkley in Greensboro. No-cost, no-obligation consultation.",
    headline: "Planning for care starts with your family.",
    introduction:
      "If you needed help with everyday activities, who would you want involved, and where would you prefer to receive care? We can talk through those questions, review any coverage you have, and consider the long-term care insurance options I offer.",
    focus: "long_term",
    sections: [
      {
        heading: "Understand what Medicare covers",
        text: "Medicare generally does not pay for ongoing help with everyday activities when that is the only care you need. Coverage for qualifying skilled care follows different rules. Understanding the difference can help your family plan for expenses that may remain.",
      },
      {
        heading: "Start with how you would want care arranged",
        text: "A useful conversation begins with your preferences. Would you want help at home? Could a spouse or family member assist, and what would that ask of them? Bring those questions before choosing a benefit amount. We can review the types of care a proposed policy includes and the providers it allows.",
      },
      {
        heading: "Read the benefit requirements together",
        text: "A policy explains when benefits can begin, what evidence is needed, and whether there is a waiting period. It also sets limits on what can be paid and for how long. We can go through the wording and identify what your family could still need to cover.",
      },
      {
        heading: "Consider the premium over time",
        text: "A policy needs to fit your budget today and during retirement. Ask whether premiums can change, what options you would have if they became difficult to afford, and what happens if you stop paying. If you already own coverage, bring it to the review before considering a replacement.",
      },
    ],
    questions: [
      "Where can I receive covered care?",
      "What must happen before benefits start?",
      "How are the benefit amount and duration limited?",
      "Can the premium change, and what choices would I have?",
      "How would this fit with my savings and existing coverage?",
    ],
    faq: [
      {
        q: "Does Medicare pay for long-term care?",
        a: "Medicare generally does not cover non-medical long-term care, such as ongoing help with bathing or dressing. Some skilled care is covered when Medicare’s requirements are met. Review your situation with Medicare and your care providers.",
      },
      {
        q: "Can a policy cover care at home?",
        a: "Some policies include home care, but the covered services, provider requirements, and benefit limits vary. We can review the exact policy language and the questions you want answered.",
      },
      {
        q: "Should I bring a policy I already have?",
        a: "Yes. Bring the policy, a recent statement, and any notices about premium changes. We can review what you have before discussing other options. There is no obligation to replace it.",
      },
      {
        q: "Can my family join the consultation?",
        a: "Yes. A spouse or another family member is welcome. I offer no-cost consultations at home, at a convenient public location, or by phone in Greensboro and nearby Triad communities.",
      },
    ],
    sources: [
      {
        title: "Medicare.gov: long-term care coverage",
        url: "https://www.medicare.gov/coverage/long-term-care",
      },
      {
        title: "North Carolina Department of Insurance: long-term care information",
        url: "https://www.ncdoi.gov/consumers/long-term-care-information",
      },
      {
        title: "NAIC: understanding long-term care insurance",
        url: "https://content.naic.org/consumer/long-term-care-insurance.htm",
      },
    ],
  },
  {
    slug: "short-term-care-insurance",
    title: "Short-Term Care Insurance in Greensboro & the Triad",
    description:
      "Review short-term care insurance, covered services, waiting periods, and benefit limits with Christian Brinkley. Personal, no-cost help in the Piedmont Triad.",
    headline: "What help might you need during a period of care?",
    introduction:
      "Short-term care insurance is a conversation about coverage for a limited period of care. Before choosing a policy, let’s look at the services included, how benefits begin, and what you and your family might still need to arrange.",
    focus: "short_term",
    sections: [
      {
        heading: "Begin with the help you have in mind",
        text: "You may be thinking about help at home, a period in a care facility, or support for a spouse. Describe what you would want help paying for. We can then check whether a policy addresses that need instead of relying on the product name alone.",
      },
      {
        heading: "Know how long benefits could last",
        text: "A limited benefit period is an important part of this review. Ask how covered days are counted, whether there is a daily or total payment limit, and what happens if care continues after benefits end. We can discuss those questions alongside any existing coverage.",
      },
      {
        heading: "Check the conditions for payment",
        text: "A need for help does not automatically mean a policy will pay. Read the benefit requirements, waiting periods, exclusions, and provider rules. Ask what documentation would be needed and how a claim is submitted so your family understands the process before relying on it.",
      },
      {
        heading: "Plan for any remaining expenses",
        text: "Bring your current insurance information and the questions you have about care costs. We can identify possible overlap, limits, and expenses the proposed policy would leave to you. Compare the premiums with your budget and consider what you would do if you needed care for longer than expected.",
      },
    ],
    questions: [
      "Which services and care settings are included?",
      "What qualifies me to receive a benefit?",
      "How long is the waiting period?",
      "What happens when the benefit period ends?",
      "What existing coverage should we review before I decide?",
    ],
    faq: [
      {
        q: "How does short-term care differ from long-term care insurance?",
        a: "Compare the specific contracts, especially benefit duration, payment limits, covered services, and eligibility requirements. The policy names alone do not tell you whether either option fits your needs.",
      },
      {
        q: "Does it pay for every period of recovery?",
        a: "No. A claim must meet the policy’s definitions and requirements. We can review the covered situations and exclusions before you decide whether a policy would be useful.",
      },
      {
        q: "Can I review this alongside my current coverage?",
        a: "Yes. Bring your existing policy information. We can discuss what each policy does, where coverage may overlap, and which expenses could still remain.",
      },
      {
        q: "Is the consultation free?",
        a: "Yes. There is no cost and no obligation to buy. We can meet in Greensboro or a nearby Triad community, or talk by phone. A family member is welcome to join.",
      },
    ],
    sources: [
      {
        title: "North Carolina Department of Insurance: questions for comparing care policies",
        url: "https://www.ncdoi.gov/documents/consumer/shiip/long-term-care-policy-comparison-form/open",
      },
      {
        title: "Medicare.gov: understanding long-term care coverage limits",
        url: "https://www.medicare.gov/coverage/long-term-care",
      },
    ],
  },
  {
    slug: "critical-illness-insurance",
    title: "Critical Illness Insurance in Greensboro & the Triad",
    description:
      "Understand critical illness insurance, covered conditions, exclusions, and benefit limits with Christian Brinkley in Greensboro. No-cost consultation.",
    headline: "Understand what critical illness coverage would provide.",
    introduction:
      "A serious illness can bring questions about expenses as well as care. Critical illness policies cover specific situations defined in the contract. We can review those definitions, the benefits offered, and how coverage might fit with what you already have.",
    focus: "critical_illness",
    sections: [
      {
        heading: "Read the list of covered illnesses",
        text: "The name of a condition is only a starting point. Check the policy’s definition, any severity requirements, exclusions, and waiting periods. Do not assume every diagnosis or every stage of an illness qualifies. We can review the wording and note questions to confirm with the insurer.",
      },
      {
        heading: "Understand how a benefit is paid",
        text: "Ask how the payment amount is determined, who receives it, and whether payment depends on treatment expenses or other conditions. Also ask how a prior claim affects later benefits. The answer comes from the specific policy, not from a general advertisement.",
      },
      {
        heading: "Look at the coverage you already have",
        text: "Bring your current insurance information so we can consider what you have before discussing another policy. Think about the expenses that would concern your family and any savings available to help. A focused review can make the decision easier to understand.",
      },
      {
        heading: "Consider costs and limits together",
        text: "Review premiums, any age-related changes, how long coverage can continue, and what happens if you cancel. Make sure the policy’s limits and your budget are part of the same conversation. You are welcome to take time and include someone you trust before deciding.",
      },
    ],
    questions: [
      "Which diagnoses meet this policy’s definitions?",
      "Are there waiting periods or excluded conditions?",
      "How is the benefit calculated and paid?",
      "Can benefits be paid for more than one covered event?",
      "How could the premiums or coverage change over time?",
    ],
    faq: [
      {
        q: "Does critical illness insurance cover every serious illness?",
        a: "No. Benefits depend on the conditions and definitions in the policy. Review the covered illnesses, exclusions, and claim requirements before relying on the coverage.",
      },
      {
        q: "Is every critical illness policy the same?",
        a: "No. Covered conditions, benefit amounts, payment rules, exclusions, and eligibility can differ. We can review the options I offer and explain the details that matter to you.",
      },
      {
        q: "Can we review a policy I already own?",
        a: "Yes. Bring the policy and a recent statement. We can discuss its benefits, limitations, and premiums, along with any questions you have about keeping the coverage.",
      },
      {
        q: "Can we meet in person in the Triad?",
        a: "Yes. I serve Greensboro, High Point, Winston-Salem, and nearby communities. We can arrange a home visit, meet at a convenient public location, or talk by phone. The consultation is no cost, with no obligation.",
      },
    ],
    sources: [
      {
        title: "NAIC: health insurance and specified-disease coverage",
        url: "https://content.naic.org/consumer/health-insurance.htm",
      },
      {
        title: "North Carolina Department of Insurance: consumer guide to cancer insurance",
        url: "https://www.ncdoi.gov/documents/consumer/publications/consumer-guide-cancer-insurance/open",
      },
    ],
  },
];

export function careGuide(slug: string): CareGuide {
  const guide = CARE_GUIDES.find((item) => item.slug === slug);
  if (!guide) throw new Error(`Unknown care guide: ${slug}`);
  return guide;
}
