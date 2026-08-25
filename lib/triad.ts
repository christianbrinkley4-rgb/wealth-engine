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
      "Greensboro sits in Guilford County, and for Medicare purposes the county is the line that matters. Medicare Advantage and Part D plans are sold county by county, so the list of plans available to you here is the Guilford County list — the same one somebody in High Point sees, and a different one from Winston-Salem, twenty-five minutes down the road.",
    localDetail:
      "Most people I talk to in Greensboro are attached to Cone Health, and their first question is whether their doctor stays. That is answerable before you sign anything, and it is answerable for the year your coverage actually starts rather than the year you are asking in. What it is not is answerable from a table on a website, because those arrangements are renegotiated every year.",
    nearby: ["Summerfield", "Oak Ridge", "Jamestown", "Pleasant Garden", "Whitsett"],
    faq: [
      {
        q: "Do I have to use a Greensboro agent to enroll?",
        a: "No. You can enroll at Medicare.gov, by calling 1-800-MEDICARE, or through any licensed agent anywhere. What a local agent knows that a national call center does not is which practices around here take which specific plan, and that is usually the question that decides it.",
      },
      {
        q: "Are the plans in Greensboro different from the rest of the Triad?",
        a: "They are the same as High Point, because both sit in Guilford County, and they are generally different from Winston-Salem, which is Forsyth County. Plan availability follows the county line rather than the city limit.",
      },
      {
        q: "Do you meet in person in Greensboro?",
        a: "Yes. Kitchen table, a coffee shop, or over the phone if that is easier. There is no charge either way, and no fee for meeting.",
      },
    ],
  },
  {
    slug: "high-point",
    name: "High Point",
    county: "Guilford County",
    countyNote:
      "High Point sits mainly in Guilford County, with parts of the city reaching into Davidson and Randolph. If your address is on one of those edges it is worth checking which county your mail actually goes to, because that is what decides your plan list.",
    population: "about 115,000",
    hospitals: [
      "Atrium Health Wake Forest Baptist High Point Medical Center",
      "Cone Health facilities in the northern part of the city",
    ],
    intro:
      "High Point is in Guilford County, which means the Medicare Advantage and Part D plans available to you are the same list somebody in Greensboro sees. That surprises people, because High Point's hospitals are largely Winston-Salem's — Atrium Health Wake Forest Baptist runs High Point Medical Center — so the plans follow one city and the doctors follow another.",
    localDetail:
      "That split is the thing worth getting right in High Point. Your plan options come from Guilford County, but the network you care about may be anchored in Forsyth. It is entirely workable, and it is also the most common way somebody here ends up on a plan that covers them everywhere except the hospital they actually use.",
    nearby: ["Jamestown", "Archdale", "Thomasville", "Trinity", "Wallburg"],
    faq: [
      {
        q: "Are my Medicare plan choices in High Point the same as Greensboro?",
        a: "Generally yes. Both are in Guilford County, and Medicare Advantage and Part D service areas are drawn by county, so the available plans are the same list. Which of them fits you can still be a completely different answer, because that depends on your doctors and prescriptions.",
      },
      {
        q: "My doctors are at Wake Forest Baptist but I live in High Point. Does that cause a problem?",
        a: "Not automatically, but it is the detail to check first. Your plan options come from Guilford County while that network reaches across into Forsyth, so the question is whether the specific plan you are considering includes the specific providers you use. That is checkable in advance, and it is worth doing before you enroll rather than after.",
      },
      {
        q: "Part of High Point is in Davidson County. Which one applies to me?",
        a: "The county your residence is actually in, which is not always the one people assume. If you are near an edge, it is worth confirming — it changes which plans you can buy at all.",
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
      "Winston-Salem is in Forsyth County, and that is the first thing to establish, because Medicare Advantage and Part D plans are sold by county. The list you can choose from here is the Forsyth list. It is not the same list as Greensboro or High Point, even though people move between those cities every day.",
    localDetail:
      "Winston-Salem has two large systems in it — Atrium Health Wake Forest Baptist and Novant Health Forsyth — and plenty of households use both, one for a primary doctor and one for a specialist. That is the case worth being careful about, because a plan can easily include one and not the other, and the surprise usually arrives with a surgery rather than a check-up.",
    nearby: ["Clemmons", "Kernersville", "Lewisville", "Rural Hall", "Walkertown"],
    faq: [
      {
        q: "Why are the plans in Winston-Salem different from Greensboro?",
        a: "Because Medicare draws plan service areas by county, and Winston-Salem is Forsyth while Greensboro is Guilford. An insurance company can offer a plan in one county and not the neighbouring one, and the premiums and extras can differ where they do offer both.",
      },
      {
        q: "I use both Wake Forest Baptist and Novant. Can one plan cover both?",
        a: "Sometimes, and that is exactly the thing to check by name before enrolling rather than assuming. Tell me which doctors at which system and I will check the specific plans I can offer against them.",
      },
      {
        q: "You are based in Greensboro. Does that matter?",
        a: "Not for your coverage. What matters is the county you live in, which sets your plan options, and I am licensed across North Carolina. Most of this happens by phone anyway, and I am about twenty-five minutes away when it does not.",
      },
    ],
  },
];

export function getTriadCity(slug: string): TriadCity | undefined {
  return TRIAD_CITIES.find((city) => city.slug === slug);
}
