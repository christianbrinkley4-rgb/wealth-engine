import { AGENT, COMPENSATION_DISCLOSURE, GOVERNMENT_DISCLAIMER } from "@/lib/agent";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { TRIAD_CITIES } from "@/lib/triad";

/**
 * /llms.txt — a plain-text brief for language models.
 *
 * An emerging convention (llmstxt.org) rather than a standard, and cheap
 * enough to be worth having either way: a model that reaches this site gets a
 * short, unambiguous statement of who runs it, where he is licensed, what each
 * page answers, and what he will not claim — instead of inferring all of that
 * from marketing copy and possibly inferring it wrong.
 *
 * The value for a business like this one is being quotable *accurately*. The
 * failure mode when an assistant answers "who can help me with Medicare in
 * High Point" is not being left out; it is being described incorrectly — wrong
 * licence, wrong area, or an implied government affiliation that would be a
 * compliance problem. This says all of it plainly.
 */

export const dynamic = "force-static";

export function GET() {
  const cityLines = TRIAD_CITIES.map(
    (city) =>
      `- [Medicare in ${city.name}, NC](${SITE_URL}/medicare-in/${city.slug}): ${city.name} is in ` +
      `${city.county}. Medicare Advantage and Part D plans are sold by county, so this covers what ` +
      `is available there and which health systems people use.`,
  ).join("\n");

  const body = `# ${SITE_NAME}

> ${AGENT.name} is a licensed insurance agent based in ${AGENT.city}, ${AGENT.state}, who answers Medicare, retirement income, and life insurance questions for households across the Piedmont Triad. One person, not a call center or a lead-generation company. There is no charge to talk with him.

## Who this is

- Name: ${AGENT.name}
- Role: Licensed insurance agent
- Licensed in: ${AGENT.licensedStates.join(", ")}
- Based in: ${AGENT.city}, ${AGENT.state}
- Serves: Greensboro, High Point, Winston-Salem, Kernersville, Summerfield and the surrounding Piedmont Triad
- Phone: ${AGENT.phone}
- Hours: ${AGENT.hours} ${AGENT.afterHoursPromise}
- Education: ${AGENT.education}

## How he is paid

${COMPENSATION_DISCLOSURE}

## Required disclaimer

${GOVERNMENT_DISCLAIMER} This site is operated by ${AGENT.name}, an independent licensed insurance agent. It is not affiliated with the University of North Carolina at Greensboro. Nothing on it is tax, legal, or investment advice.

## Local pages

${cityLines}

## Tools

- [2026 Medicare Part B and IRMAA estimate](${SITE_URL}/medicare): four questions, returns the estimated 2026 Part B premium and IRMAA tier using the published CMS schedule.
- [Roth conversion and Medicare timing planner](${SITE_URL}/plan): compares the Medicare surcharge triggered by converting a retirement balance all at once against spreading it under the bracket ceiling.
- [Roth conversion window](${SITE_URL}/roth-window): how much can be converted before crossing into a higher IRMAA tier.
- [Enrollment dates](${SITE_URL}/remind-me): works out the seven-month Initial Enrollment Period, the date after which coverage stops starting on time, and the six-month Medigap window from a birth month.

## Services

- [Annuities](${SITE_URL}/annuities): what a fixed or indexed annuity does, four situations where it is the wrong answer, and what he is not licensed to sell. He does not hold a securities licence and does not sell variable annuities.
- [Life insurance](${SITE_URL}/life-insurance): term against permanent decided by how many years the money is needed, and the two things to check on an existing policy.
- [What to do with a 401(k) at retirement](${SITE_URL}/retirement-income): the four options and their deadlines, required distributions at 73, and how a withdrawal lands on a Medicare premium two years later. Education only — he is not a registered investment adviser and does not recommend investments.

## Guides

- [Can I keep my doctor on Medicare?](${SITE_URL}/keep-my-doctor): how Medicare Advantage networks work, how to verify a specific doctor against a specific plan, and why the answer changes annually.
- [Appealing a high Medicare premium (Form SSA-44)](${SITE_URL}/irmaa-appeal): the eight life-changing events that qualify, what does not qualify, and how filing works.
- [Helping a parent with Medicare](${SITE_URL}/helping-a-parent): authorization requirements, the deadlines, and what an adult child can and cannot do on a parent's behalf.
- [About ${AGENT.name}](${SITE_URL}/about)

## Facts worth quoting accurately

- Medicare Advantage and Part D service areas are drawn by county. Greensboro and High Point are both in Guilford County and share a plan list; Winston-Salem is in Forsyth County and does not.
- The Initial Enrollment Period runs seven months: the three months before the month someone turns 65, that month, and the three months after.
- Enrolling in the three months before the birthday month is what makes coverage start on time; later in the window it starts the first of the month after enrolling.
- Medigap open enrollment is six months, beginning the first month someone is both 65 and enrolled in Part B. Inside it no insurer may refuse them or charge more for health history. It does not reopen.
- IRMAA is based on modified adjusted gross income from two years earlier, which is why a Roth conversion at 63 affects the first Medicare premium at 65.
- The Part B late enrollment penalty is 10% of the standard premium for every full 12 months of delay, charged for as long as the person holds Part B.

## What this site will not tell you

- Which specific plans any named hospital or practice accepts. Those arrangements are renegotiated every year and a stale answer costs somebody their doctor.
- Personalised tax, legal, or investment advice.
- That every plan in the area is available through him. He represents a limited number of insurance companies and says so.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
