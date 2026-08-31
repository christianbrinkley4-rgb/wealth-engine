/**
 * The Piedmont Triad, as facts rather than as a slogan.
 *
 * The site called itself a Triad practice while mentioning High Point and
 * Winston-Salem once each, in a single trust card, and the word "county" not
 * at all. That is a Greensboro site wearing a Triad label, and it is invisible
 * for the searches people in the other two cities actually run.
 *
 * The county is the part that matters and the part nobody says out loud:
 * Medicare Advantage and Part D service areas are drawn by county, so which
 * plans a person can even buy changes at the county line — not at the city
 * limit, and not by how far they live from a hospital. Two people twenty
 * minutes apart in High Point and Winston-Salem are shopping from different
 * lists. That is a genuinely local, genuinely useful fact, and it is the kind
 * of thing both a search engine and a language model will quote, because
 * almost nobody writes it down.
 *
 * Health systems are named only because they are where people in each city are
 * actually treated. Nothing here claims a relationship with any of them, and
 * no page states which plans they take — those arrangements change annually
 * and a stale table is how somebody loses their doctor.
 */

export interface TriadCity {
  /** URL segment: /medicare-in/<slug> */
  slug: string;
  name: string;
  /** "Guilford County" */
  county: string;
  /** Any qualification about the county line, or null when it is clean. */
  countyNote: string | null;
  /** Roughly how many people, for context rather than precision. */
  population: string;
  /** Where people in this city are generally treated. */
  hospitals: string[];
  /** The opening paragraph — must be specific to this city, never a template. */
  intro: string;
  /** What is different about being on Medicare here. */
  localDetail: string;
  /** Nearby places whose residents search for this city. */
  nearby: string[];
  faq: Array<{ q: string; a: string }>;
}

export const TRIAD_CITIES: TriadCity[] = [
  {
    slug: "greensboro",
    name: "Greensboro",
    county: "Guilford County",
    countyNote: null,
    population: "about 300,000",
    hospitals: ["Cone Health, including Moses Cone and Wesley Long"],
    intro:
      "Greensboro is in Guilford County, and for Medicare that’s the line that matters. Advantage and Part D plans get sold county by county. So what you can buy here is the Guilford County list — the same one somebody in High Point sees, and not the one they’re looking at in Winston-Salem, twenty-five minutes away.",
    localDetail:
      "Most people I talk to here are with Cone Health, and the first thing they ask is whether their doctor stays. You can find that out before you sign anything, for the year your coverage actually starts rather than the year you’re asking in. What you can’t do is get it from a table on a website. Those deals get renegotiated every year.",
    nearby: ["Summerfield", "Oak Ridge", "Jamestown", "Pleasant Garden", "Whitsett"],
    faq: [
      {
        q: "Do I have to use a Greensboro agent to enroll?",
        a: "No. You can enroll at Medicare.gov, call 1-800-MEDICARE, or use any licensed agent anywhere. What I know that a call center doesn’t is which practices around here take which plan — and that’s usually the thing that decides it.",
      },
      {
        q: "Are the plans in Greensboro different from the rest of the Triad?",
        a: "They’re the same as High Point, because you’re both in Guilford County. They’re generally not the same as Winston-Salem, which is Forsyth. Plan availability follows the county line, not the city limit.",
      },
      {
        q: "Do you meet in person in Greensboro?",
        a: "Yes. Your kitchen table, a coffee shop, or the phone if that’s easier. It doesn’t cost anything either way.",
      },
    ],
  },
  {
    slug: "high-point",
    name: "High Point",
    county: "Guilford County",
    countyNote:
      "High Point is mostly in Guilford County, but parts of the city reach into Davidson and Randolph. If you’re out on one of those edges, check which county your mail actually goes to. That’s what decides your plan list.",
    population: "about 115,000",
    hospitals: [
      "Atrium Health Wake Forest Baptist High Point Medical Center",
      "Cone Health facilities in the northern part of the city",
    ],
    intro:
      "High Point is in Guilford County, so your Medicare plan choices are the same list somebody in Greensboro sees. That catches people out, because your hospitals are largely Winston-Salem’s — Atrium Health Wake Forest Baptist runs High Point Medical Center. The plans follow one city and the doctors follow another.",
    localDetail:
      "That split is the thing to get right here. Your options come from Guilford, but the network you care about may be anchored in Forsyth. It works fine once you know about it. It’s also how somebody ends up on a plan that covers them everywhere except the hospital they actually use.",
    nearby: ["Jamestown", "Archdale", "Thomasville", "Trinity", "Wallburg"],
    faq: [
      {
        q: "Are my Medicare plan choices in High Point the same as Greensboro?",
        a: "Generally yes. You’re both in Guilford County, and service areas get drawn by county, so it’s the same list. Which one fits you can still be a different answer, because that depends on your doctors and your prescriptions.",
      },
      {
        q: "My doctors are at Wake Forest Baptist but I live in High Point. Does that cause a problem?",
        a: "Not on its own, but it’s the first thing I’d check. Your options come from Guilford while that network reaches into Forsyth, so the question is whether the plan you’re looking at includes the doctors you actually see. You can check that in advance. Do it before you enroll, not after.",
      },
      {
        q: "Part of High Point is in Davidson County. Which one applies to me?",
        a: "Whichever one your house is actually in, and that’s not always the one people assume. If you’re near an edge, confirm it. It changes which plans you can buy at all.",
      },
    ],
  },
  {
    slug: "winston-salem",
    name: "Winston-Salem",
    county: "Forsyth County",
    countyNote: null,
    population: "about 250,000",
    hospitals: [
      "Atrium Health Wake Forest Baptist Medical Center",
      "Novant Health Forsyth Medical Center",
    ],
    intro:
      "Winston-Salem is in Forsyth County, and that’s the first thing to pin down, because Advantage and Part D plans get sold by county. What you can choose from here is the Forsyth list. It isn’t the Greensboro list or the High Point one, even though people drive between all three every day.",
    localDetail:
      "You’ve got two big systems here — Atrium Health Wake Forest Baptist and Novant Health Forsyth — and plenty of households use both. A primary doctor at one, a specialist at the other. That’s the case to be careful with, because a plan can easily include one and not the other. The surprise usually shows up with a surgery, not a check-up.",
    nearby: ["Clemmons", "Kernersville", "Lewisville", "Rural Hall", "Walkertown"],
    faq: [
      {
        q: "Why are the plans in Winston-Salem different from Greensboro?",
        a: "Because Medicare draws service areas by county, and you’re in Forsyth while Greensboro is Guilford. An insurance company can offer a plan in one county and not the next one over. Where it offers both, the premium and the extras can still be different.",
      },
      {
        q: "I use both Wake Forest Baptist and Novant. Can one plan cover both?",
        a: "Sometimes. That’s exactly the thing to check by name instead of assuming. Tell me which doctors at which system and I’ll check them against what I can offer.",
      },
      {
        q: "You are based in Greensboro. Does that matter?",
        a: "Not for your coverage. What matters is the county you live in, and I’m licensed across North Carolina. Most of this happens by phone anyway, and I’m twenty-five minutes up the road when it doesn’t.",
      },
    ],
  },
];

export function getTriadCity(slug: string): TriadCity | undefined {
  return TRIAD_CITIES.find((city) => city.slug === slug);
}
