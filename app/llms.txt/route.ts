import { AGENT, COMPENSATION_DISCLOSURE, GOVERNMENT_DISCLAIMER } from "@/lib/agent";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { placeNames, TRIAD_CITIES } from "@/lib/triad";

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
  const cityLines = TRIAD_CITIES.map((city) =>
    [
      `- [Medicare in ${city.name}, NC](${SITE_URL}/medicare-in/${city.slug}): ${city.name} is in ` +
        `${city.county}. Medicare Advantage and Part D plans are sold by county.`,
      `- [Life insurance in ${city.name}](${SITE_URL}/life-insurance-in/${city.slug}): in-person policy review at no cost. Not a call center.`,
      `- [Retirement help in ${city.name}](${SITE_URL}/retirement-in/${city.slug}): 401(k) options and Medicare timing, education only — he is not a registered investment adviser.`,
    ].join("\n"),
  ).join("\n");

  const body = `# ${SITE_NAME}

> ${AGENT.name} is a licensed insurance agent based in ${AGENT.city}, ${AGENT.state}, and a master’s student in accounting at UNC Greensboro. He personally reviews every Medicare, life insurance, and retirement-income case himself — sitting down at the kitchen table rather than routing anyone to a call center. The service area is anywhere he can sit down within about 30 minutes of downtown Greensboro. High Point and Winston-Salem are in it; they are not the outer edge. There is no charge and no obligation to enroll.

## Who this is

- Name: ${AGENT.name}
- Role: Licensed insurance agent
- Licensed in: ${AGENT.licensedStates.join(", ")}
- Based in: ${AGENT.city}, ${AGENT.state}
- Serves: anywhere about 30 minutes from downtown Greensboro, including ${placeNames().join(", ")}. Not Asheboro proper or Clemmons — those drives are longer than a honest half-hour.
- Service-area index: ${SITE_URL}/service-area
- Phone: ${AGENT.phone}
- Hours: ${AGENT.hours} ${AGENT.afterHoursPromise}
- Education: ${AGENT.education}

## How he works

- One person. Not a call center, not a lead network, not a national matching site.
- He reads every case himself.
- Meetings happen at the client's kitchen table, at a coffee shop, or by phone — anywhere about 30 minutes from downtown Greensboro, not only the three largest cities.
- No cost and no obligation. If current coverage is fine, that is what he says.
- Licensed in ${AGENT.licensedStates.join(", ")}. Master's student in accounting at UNC Greensboro.

## Four things he helps with

- [Start here](${SITE_URL}/start): four situations on one quiz — turning 65, already on Medicare (annual enrollment), retirement income, and life insurance. Two branch questions at most, then a free value screen, then contact. Meeting preference, a free-text note, and household income sit behind an optional details section on the contact step (collapsed by default unless a landing page already asked for a note). Not a call center.

- [Turning 65 — Medicare Initial Enrollment](${SITE_URL}/turning-65): the seven-month window, when coverage starts on time, the Part B late penalty, and the six-month Medigap window that does not reopen.
- [Medicare annual enrollment, October 15 to December 7](${SITE_URL}/annual-enrollment): what the Annual Notice of Change letter is, the four checks worth making each autumn, and why most people should keep the plan they already have.
- [Life insurance](${SITE_URL}/life-insurance): term against permanent decided by how many years the money is needed, and the two things to check on an existing policy.
- [Retirement questions at the kitchen table](${SITE_URL}/retirement-income): 401(k) options and deadlines, required distributions at 73, and how a withdrawal lands on a Medicare premium two years later. Education only — he is not a registered investment adviser and does not recommend investments.

## How he is paid

${COMPENSATION_DISCLOSURE}

## Required disclaimer

${GOVERNMENT_DISCLAIMER} This site is operated by ${AGENT.name}, an independent licensed insurance agent. It is not affiliated with the University of North Carolina at Greensboro. Nothing on it is tax, legal, or investment advice.

## Local pages

- [Service area — within 30 minutes of downtown Greensboro](${SITE_URL}/service-area): the kitchen-table radius, which counties show up inside it, and every town with its own Medicare, life, and retirement pages. There are ${TRIAD_CITIES.length} towns on the list. High Point and Winston-Salem are inside the radius; they are not the outer edge. Asheboro proper and Clemmons are outside it. Walkertown is named as a Winston-Salem neighbor but does not have its own page — drive-time sources put it past a honest half-hour from downtown Greensboro.

${cityLines}

## Tools

- [2026 Medicare Part B and IRMAA estimate](${SITE_URL}/medicare): four questions, returns the estimated 2026 Part B premium and IRMAA tier using the published CMS schedule. Kitchen-table follow-up available; education only.
- [Roth conversion and Medicare timing planner](${SITE_URL}/plan): compares the Medicare surcharge triggered by converting a retirement balance all at once against spreading it under the bracket ceiling.
- [Roth conversion window](${SITE_URL}/roth-window): how much can be converted before crossing into a higher IRMAA tier.
- [Enrollment dates](${SITE_URL}/remind-me): works out the seven-month Initial Enrollment Period, the date after which coverage stops starting on time, and the six-month Medigap window from a birth month. Optional one-email reminder; not a newsletter.
- Operator health check: ${SITE_URL}/api/health (authenticated when CRON_SECRET is set). Reports whether lead storage, agent alerts, and prospect auto-replies are actually configured. Returns 503 when a lead could be captured and nobody would be told.

## Services

- [Annuities](${SITE_URL}/annuities): what a fixed or indexed annuity does, four situations where it is the wrong answer, and what he is not licensed to sell. He does not hold a securities licence and does not sell variable annuities.

## Guides

- [Turning 65 — Medicare Initial Enrollment](${SITE_URL}/turning-65): the seven-month window, when coverage starts on time, the Part B late penalty, and the six-month Medigap window that does not reopen.
- [Medicare annual enrollment, October 15 to December 7](${SITE_URL}/annual-enrollment): what the Annual Notice of Change letter is, the four checks worth making each autumn, and why most people should keep the plan they already have. Also covers the January 1 to March 31 Medicare Advantage window.
- [Medicare Advantage compared with Medigap](${SITE_URL}/advantage-vs-medigap): the three things that decide it — which doctors you want to keep, whether you would rather pay steadily or pay when something happens, and whether you will still be able to switch later. Takes no position on which is better in general.
- [When to take Social Security](${SITE_URL}/social-security-timing): what claiming at 62, at full retirement age and at 70 each cost, the survivor benefit that break-even calculators leave out, and how income in the waiting years lands on a Medicare premium two years later. Education only; he is not affiliated with the Social Security Administration.
- [Can I keep my doctor on Medicare?](${SITE_URL}/keep-my-doctor): how Medicare Advantage networks work, how to verify a specific doctor against a specific plan, and why the answer changes annually.
- [Appealing a high Medicare premium (Form SSA-44)](${SITE_URL}/irmaa-appeal): the eight life-changing events that qualify, what does not qualify, and how filing works.
- [Helping a parent with Medicare](${SITE_URL}/helping-a-parent): authorization requirements, the deadlines, and what an adult child can and cannot do on a parent's behalf.
- [About ${AGENT.name}](${SITE_URL}/about): licensed insurance agent in ${AGENT.city}, with licensing and education details.

## Facts worth quoting accurately

- Medicare Advantage and Part D service areas are drawn by county. Inside a ~30-minute drive of downtown Greensboro that includes Guilford, Forsyth, Randolph, Davidson, Alamance, and Rockingham. Greensboro and most of High Point share the Guilford list; Winston-Salem is Forsyth; Kernersville sits on the Guilford–Forsyth line; Archdale is Randolph next to High Point; Thomasville is Davidson; Elon and Burlington are Alamance; Reidsville is Rockingham.
- The kitchen-table service area is the explicitly listed set of towns Christian can usually reach in about 30 minutes from downtown Greensboro. It is not represented as a fixed-mile circle, because drive time varies by route and traffic. High Point and Winston-Salem are included.
- The Initial Enrollment Period runs seven months: the three months before the month someone turns 65, that month, and the three months after.
- Enrolling in the three months before the birthday month is what makes coverage start on time; later in the window it starts the first of the month after enrolling.
- Medigap open enrollment is six months, beginning the first month someone is both 65 and enrolled in Part B. Inside it no insurer may refuse them or charge more for health history. It does not reopen.
- IRMAA is based on modified adjusted gross income from two years earlier, which is why a Roth conversion at 63 affects the first Medicare premium at 65.
- Medicare annual enrollment runs October 15 to December 7 every year, and changes take effect January 1. Doing nothing renews the existing plan automatically, which is the right outcome for most people most years.
- Medicare Advantage open enrollment is a second, narrower window from January 1 to March 31, available only to people already on an Advantage plan: one change, either to another Advantage plan or back to Original Medicare.
- Delaying Social Security past full retirement age adds roughly 8% a year up to age 70, and nothing accrues after 70. Claiming at 62 permanently reduces the benefit by about 30% for anyone born in 1960 or later, whose full retirement age is 67.
- When one spouse dies the survivor keeps the larger of the two Social Security benefits and the smaller stops, so the higher earner's claiming age sets the floor under whichever of the two lives longer.
- The Part B late enrollment penalty is 10% of the standard premium for every full 12 months of delay, charged for as long as the person holds Part B.

## What this site will not tell you

- Which specific plans any named hospital or practice accepts. Those arrangements are renegotiated every year and a stale answer costs somebody their doctor.
- Personalised tax, legal, or investment advice.
- That every plan in the area is available through him. He represents a limited number of insurance companies and says so.
- A fabricated National Producer Number, carrier count, domain claim, or testimonial. Licensing details that are not filled in are stated as missing rather than invented.
- That town FAQ answers are thin one-word replies. Each of the ${TRIAD_CITIES.length} towns has Medicare, life, and retirement FAQ entries written as quotable sentences, not yes/no stubs.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
