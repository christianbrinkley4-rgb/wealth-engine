import { AGENT, COMPENSATION_DISCLOSURE, GOVERNMENT_DISCLAIMER, TPMO_DISCLAIMER } from "@/lib/agent";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { placeNames, TRIAD_CITIES } from "@/lib/triad";

/** Public summary kept consistent with the visitor-facing pages. */
export const dynamic = "force-static";

export function GET() {
  const cityLines = TRIAD_CITIES.map((city) =>
    [
      `- [Medicare in ${city.name}](${SITE_URL}/medicare-in/${city.slug}): personal help with enrollment, doctors, prescriptions, and coverage choices. Confirm Medicare Advantage availability for the visitor’s home address.`,
      `- [Life insurance in ${city.name}](${SITE_URL}/life-insurance-in/${city.slug}): review existing coverage and family needs.`,
      `- [Retirement help in ${city.name}](${SITE_URL}/retirement-in/${city.slug}): Medicare and insurance education, with financial planning coordinated through an advisor.`,
    ].join("\n"),
  ).join("\n");

  const body = `# ${SITE_NAME}

${AGENT.name} is a licensed insurance agent based in ${AGENT.city}, ${AGENT.state}, and an accounting master’s student at UNC Greensboro. He helps people approaching retirement, people already retired, and their families. Consultations are no cost, with no obligation to enroll or buy.

## Personal, local help

- Christian personally reviews inquiries. Contact information is not sold to other agents.
- Meetings can be at home, at a convenient public location, or by phone. Visitors may include a spouse or family member.
- Communities served: ${placeNames().join(", ")}.
- Visitors outside those communities can get in touch to discuss a way to meet. Phone consultations are available in North Carolina.
- Licensed in: ${AGENT.licensedStates.join(", ")}.
- Phone: ${AGENT.phone}.
- Hours: ${AGENT.hours} ${AGENT.afterHoursPromise}
- [About Christian](${SITE_URL}/about)
- [Service area](${SITE_URL}/service-area)
- [Request a consultation](${SITE_URL}/start)
- [Ways to arrange a meeting](${SITE_URL}/schedule)

## Local questions this site is meant to answer

This site is for people in and near Greensboro, High Point, and Winston-Salem, North Carolina who want a licensed agent they can meet in person. Typical questions:

- When to enroll in Medicare at 65, including if still working
- How Medicare Advantage and Medigap differ
- How to check whether a doctor in Guilford, Forsyth, or a neighboring county is in a plan
- Life insurance when work coverage ends
- How a 401(k) withdrawal or Roth conversion can affect a Medicare premium later

${TPMO_DISCLAIMER}

## Guides

- [Turning 65](${SITE_URL}/turning-65): Medicare enrollment timing, current coverage, and questions to consider before choosing a plan.
- [Annual enrollment](${SITE_URL}/annual-enrollment): review next year’s costs, doctors, and prescriptions before deciding whether to keep or change coverage.
- [Medicare Advantage and Medigap](${SITE_URL}/advantage-vs-medigap): differences in coverage, costs, provider access, and enrollment rules.
- [Keeping your doctors](${SITE_URL}/keep-my-doctor): steps to confirm a provider’s participation before enrolling.
- [Helping a parent](${SITE_URL}/helping-a-parent): organize questions, check dates, and understand permission requirements while respecting a parent’s wishes.
- [Life insurance](${SITE_URL}/life-insurance): review existing policies, beneficiaries, budget, and family needs.
- [Care and critical illness coverage](${SITE_URL}/care-coverage): understand coverage options, limits, and questions to ask.
- [Long-term care insurance](${SITE_URL}/long-term-care-insurance): care preferences, benefit requirements, costs, and family questions.
- [Short-term care insurance](${SITE_URL}/short-term-care-insurance): review limited care benefits, covered settings, and expenses that remain.
- [Critical illness insurance](${SITE_URL}/critical-illness-insurance): understand specified conditions, payment rules, exclusions, and existing coverage.
- [Annuities](${SITE_URL}/annuities): understand guarantees, costs, and access to funds before deciding.
- [Retirement income](${SITE_URL}/retirement-income): general education about retirement accounts and potential Medicare premium effects.
- [Social Security timing](${SITE_URL}/social-security-timing): consider income needs, family circumstances, and personal benefit estimates.
- [Medicare premium review](${SITE_URL}/irmaa-appeal): learn about requesting a review through Social Security after a qualifying life change.

## Published 2026 figures

- [2026 Medicare costs](${SITE_URL}/medicare-costs-2026): the Part A, Part B, Part D and IRMAA figures for 2026, each taken from a named CMS fact sheet. Part B standard premium $202.90 a month; Part B annual deductible $283; Part A hospital deductible $1,736 per benefit period; Part D out-of-pocket cap $2,100 a year; Part D maximum deductible $615. Income-related surcharges begin above $109,000 for a single filer and $218,000 filing jointly, based on the 2024 tax return. These figures are federal and identical in every state; only plan availability and pricing vary locally.

## Free tools

- [Medicare enrollment dates](${SITE_URL}/turning-65#enrollment-dates): find estimated enrollment dates, print them, or save them to a personal calendar without providing contact information. Includes the first-of-month birthday adjustment.
- [Save Medicare dates](${SITE_URL}/remind-me): the same calendar tool; this page does not offer automatic reminder emails.
- [2026 Medicare Part B estimate](${SITE_URL}/medicare): an estimate using published 2026 rates.
- [Roth conversion timing examples](${SITE_URL}/plan): compare estimated Medicare premium effects using 2026 rates.
- [Roth conversion estimate](${SITE_URL}/roth-window): explore income-related Medicare charges using 2026 rates. Future rates may differ.

## Qualifications and disclosures

Christian is currently a licensed insurance agent, not a CPA, CFP, or registered investment adviser. He works with an advisor for financial planning. Personal tax, legal, and investment advice requires an appropriately qualified professional. He represents a limited number of insurance companies; the site does not claim every Medicare plan is available through him. Confirm current plan and provider details before enrollment.

${COMPENSATION_DISCLOSURE}

${GOVERNMENT_DISCLAIMER} The site is not affiliated with the University of North Carolina at Greensboro or the Social Security Administration.

## Local pages

${cityLines}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
