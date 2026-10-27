/**
 * "What's changing for 2027" cards on the home page.
 *
 * These four topics are the ones that start real conversations on Facebook
 * groups and Nextdoor (Christian, Oct 26, 2026): news about changes that
 * affect someone's own coverage. Every figure carries its source and date.
 * Re-check each source before editing a figure, and never add plan or
 * carrier names here.
 */
export interface Change2027 {
  id: string;
  kicker: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  source: string;
}

export const CHANGES_2027: Change2027[] = [
  {
    id: "plans-ending",
    kicker: "Plans ending",
    title: "Some Medicare Advantage plans won't be back in 2027",
    body: "193 counties will have no Medicare Advantage plans next year, up from about 120. If your plan is ending, you have until February 28, 2027 to choose, and you may be able to buy a Medigap policy without health questions.",
    href: "/medicare-plans-ending-2027",
    cta: "What to do if yours is ending",
    source: "NPR, Oct 24, 2026, citing a KFF analysis of federal data",
  },
  {
    id: "drug-premiums",
    kicker: "Drug plans",
    title: "Paid $0 for your drug plan this year? Check your letter.",
    body: "About 4 million people in stand-alone Part D plans paid no monthly premium in 2026. All of them will pay a premium in 2027, whether they keep their plan or switch.",
    href: "/medicare-part-d-plans",
    cta: "How to compare drug plans",
    source: "KFF, Oct 2, 2026",
  },
  {
    // Deadline copy: rewrite or replace this card after November 6, 2026.
    id: "state-health-plan",
    kicker: "NC state retirees",
    title: "State Health Plan Medicare Advantage costs go up",
    body: "State Health Plan open enrollment ends November 6, 2026. Retirees on the 70/30 plan who do nothing move to the Base Medicare Advantage plan. Out-of-pocket maximums rise to $4,500 on Base and $3,700 on Enhanced.",
    href: "/guides/nc-state-health-plan-medicare",
    cta: "What state retirees should check",
    source: "shpnc.gov, Oct 2026; Becker's Payer Issues, June 8, 2026",
  },
  {
    id: "auto-renew",
    kicker: "Doing nothing",
    title: "Most people let their plan renew without looking",
    body: "In the most recent federal survey data, 69% of people with Medicare didn't compare their coverage during open enrollment. Most plans renew on their own, with whatever changed in your letter.",
    href: "/guides/medicare-automatic-renewal",
    cta: "What auto-renewal means for you",
    source: "KFF analysis of CMS survey data for the 2021 open enrollment, Sept 26, 2024",
  },
];
