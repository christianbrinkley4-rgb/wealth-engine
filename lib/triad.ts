/**
 * The kitchen-table service area: anywhere about 30 minutes from downtown
 * Greensboro.
 *
 * High Point and Winston-Salem stay in. They are not the outer edge. The
 * towns between them, and the ones twenty minutes north, east, and south, are
 * the households he can actually sit down with. A site that only names the
 * three cities is invisible for the searches people in Kernersville,
 * Summerfield, Jamestown, and Archdale actually run.
 *
 * Medicare Advantage and Part D are sold by county. Guilford, Forsyth,
 * Randolph, Davidson, Alamance, and Rockingham all show up inside this
 * radius, so two kitchens fifteen minutes apart can be shopping from
 * different lists. That is the local fact a national marketplace will not have.
 *
 * Places past an honest half-hour — Clemmons, Asheboro proper, Lewisville —
 * are not listed. Burlington and Reidsville are the highway edges (~30
 * minutes on I-40 and US-29 in ordinary traffic). Randleman is the south
 * edge toward Asheboro.
 *
 * Walkertown is named as a Winston-Salem neighbor but is not a city page.
 * Drive-time sources disagree (about 32–36 minutes from downtown Greensboro)
 * and the usual route goes through Kernersville or Winston-Salem, so it sits
 * past an honest half-hour in ordinary traffic. A thin template page would
 * also just repeat Forsyth / Wake Forest / Novant copy already on
 * Winston-Salem and Kernersville.
 *
 * Structured data uses the explicit town list rather than turning this
 * drive-time promise into a fixed-mile circle.
 */

export interface TriadCity {
  slug: string;
  name: string;
  /** "Guilford County" — or a split when the town sits on a line. */
  county: string;
  countyNote: string | null;
  /** Typical drive from downtown Greensboro in ordinary traffic. */
  minutesFromDowntown: number;
  /** Hub pages get extra weight on the homepage. */
  featured: boolean;
  population: string;
  hospitals: string[];
  intro: string;
  localDetail: string;
  nearby: string[];
  faq: Array<{ q: string; a: string }>;
  lifeIntro: string;
  lifeDetail: string;
  lifeFaq: Array<{ q: string; a: string }>;
  retirementIntro: string;
  retirementDetail: string;
  retirementFaq: Array<{ q: string; a: string }>;
}

export const SERVICE_AREA_LABEL = "Within 30 minutes of downtown Greensboro";

export const SERVICE_AREA_LEDE =
  "I sit down with households anywhere I can reach in about 30 minutes from downtown Greensboro — not only the three big cities.";

export const TRIAD_CITIES: TriadCity[] = [
  {
    slug: "greensboro",
    name: "Greensboro",
    county: "Guilford County",
    countyNote: null,
    minutesFromDowntown: 0,
    featured: true,
    population: "about 300,000",
    hospitals: ["Cone Health, including Moses Cone and Wesley Long"],
    intro:
      "Greensboro is in Guilford County, and for Medicare that’s the line that matters. Advantage and Part D plans get sold county by county. What you can buy here is the Guilford list — the same one Jamestown and most of High Point see, and not the one they’re looking at in Winston-Salem or Kernersville’s Forsyth side.",
    localDetail:
      "Most people I talk to here are with Cone Health, and the first thing they ask is whether their doctor stays. You can find that out before you sign anything, for the year your coverage actually starts. What you can’t do is get it from a table on a website. Those deals get renegotiated every year.",
    nearby: ["Summerfield", "Oak Ridge", "Jamestown", "Pleasant Garden", "McLeansville", "Colfax"],
    faq: [
      {
        q: "Do I have to use a Greensboro agent to enroll?",
        a: "You can enroll at Medicare.gov, call 1-800-MEDICARE, or use any licensed agent anywhere. What I know that a national phone service doesn’t is which practices around here take which plan — and that’s usually the thing that decides it.",
      },
      {
        q: "Are the plans in Greensboro different from High Point?",
        a: "Generally no. You’re both in Guilford County. They are different from Winston-Salem (Forsyth), Archdale (Randolph), and Thomasville (Davidson). Plan availability follows the county line, not the city limit.",
      },
      {
        q: "Do you meet in person in Greensboro?",
        a: "Consultations are free and available in person across Greensboro or by phone.",
      },
    ],
    lifeIntro:
      "Greensboro is where I live and where most of these conversations begin. Life insurance is not sold by county, so the focus is your family, current coverage, beneficiaries, and timeline.",
    lifeDetail:
      "A lot of the policies I read here came with a job at Cone Health, the university, the city, or a manufacturer that has since changed names. Group coverage usually ends when the badge does. The other common Greensboro problem is a beneficiary form that still names an ex-spouse. Neither one needs a new policy. Both need twenty minutes with the actual paperwork.",
    lifeFaq: [
      {
        q: "Do you meet in person in Greensboro?",
        a: "Meet in person or by phone. Free consultation with no obligation.",
      },
      {
        q: "I have life insurance through work at Cone or the university. Is that enough?",
        a: "Find out exactly what happens to it when you leave or retire. Group coverage usually ends with the job. Bring the certificate and I’ll tell you whether you have a gap.",
      },
      {
        q: "What does a review cost?",
        a: "Nothing. A fair share of them end with me saying what you have is fine.",
      },
    ],
    retirementIntro:
      "Greensboro households ask the same retirement question national sites often address with an advisor match: what do I do with this 401(k), and will a withdrawal wreck something else. I can sit down and explain the four options and the Medicare timing. I cannot tell you how to invest it — I am not a registered investment adviser.",
    retirementDetail:
      "What I am is a licensed agent finishing a master’s in accounting at UNCG, which is why these conversations keep coming back to tax brackets and a premium set from a return two years old. If you worked for the state, Cone, or a private plan here, the paperwork is different. The Medicare income-timing issue is the same: a big conversion at 63 shows up on the first Part B bill at 65.",
    retirementFaq: [
      {
        q: "Are you a retirement advisor in Greensboro?",
        a: "I’m a licensed insurance agent, not a registered investment adviser. I explain 401(k) options, Social Security timing, and how withdrawals hit Medicare.",
      },
      {
        q: "Will you come to my house in Greensboro?",
        a: "In-person and phone consultations are available across Greensboro at no cost.",
      },
      {
        q: "Can you tell me which funds to pick?",
        a: "That’s investment advice. What I can show you is what a withdrawal or Roth conversion does to your Medicare premium two years later.",
      },
    ],
  },
  {
    slug: "high-point",
    name: "High Point",
    county: "Guilford County",
    countyNote:
      "High Point is mostly in Guilford County, but parts of the city reach into Davidson and Randolph. If you’re out on one of those edges, check which county your mail actually goes to. That’s what decides your plan list.",
    minutesFromDowntown: 22,
    featured: true,
    population: "about 115,000",
    hospitals: [
      "Atrium Health Wake Forest Baptist High Point Medical Center",
      "Cone Health facilities in the northern part of the city",
    ],
    intro:
      "High Point is about twenty minutes from downtown Greensboro and mostly in Guilford County, so your Medicare plan choices are the same list somebody in Greensboro sees. That catches people out, because your hospitals are largely Winston-Salem’s — Atrium Health Wake Forest Baptist runs High Point Medical Center. The plans follow one county and the doctors follow another.",
    localDetail:
      "That split is the thing to get right here. Your options come from Guilford, but the network you care about may be anchored in Forsyth. It works fine once you know about it. It’s also how somebody ends up on a plan that covers them everywhere except the hospital they actually use.",
    nearby: ["Jamestown", "Archdale", "Thomasville", "Colfax", "Greensboro"],
    faq: [
      {
        q: "Are my Medicare plan choices in High Point the same as Greensboro?",
        a: "Generally yes, if your house is in Guilford County. Which one fits you can still be a different answer, because that depends on your doctors and your prescriptions.",
      },
      {
        q: "My doctors are at Wake Forest Baptist but I live in High Point. Does that cause a problem?",
        a: "Not on its own, but it’s the first thing I’d check. Your options come from Guilford while that network reaches into Forsyth. Do it before you enroll, not after.",
      },
      {
        q: "Part of High Point is in Davidson County. Which one applies to me?",
        a: "Whichever one your house is actually in. If you’re near an edge, confirm it. It changes which plans you can buy at all.",
      },
    ],
    lifeIntro:
      "High Point is twenty minutes from my kitchen and a different kind of household than Greensboro: family businesses, furniture and manufacturing, and a lot of people whose doctors are at High Point Medical Center even though their Medicare plan list is Guilford’s. Life insurance doesn’t follow that county line. Who reads the policy with you does.",
    lifeDetail:
      "The gap I see most here is job coverage that people thought was permanent. It usually isn’t. A term policy bought twenty years ago for a mortgage that has five years left is the other common one. Bring the pages, not a guess at the face amount. I’ll sit down in High Point the same as in Greensboro.",
    lifeFaq: [
      {
        q: "Do you actually come to High Point?",
        a: "in person or by phone. I’m licensed in North Carolina and I live in Greensboro — that’s a drive, not a national phone service.",
      },
      {
        q: "My coverage is through work. Should I replace it before I retire?",
        a: "First find out what happens to it when you leave. Then look at whether the need ends. The product mostly follows that answer.",
      },
      {
        q: "Is there a fee to review a policy I already have?",
        a: "And I’ll tell you if you should leave it alone.",
      },
    ],
    retirementIntro:
      "High Point retirees get the same national ads Greensboro does. What I can do in person is narrower and more useful for the questions I actually get — an old 401(k), a withdrawal that will hit Medicare, Social Security timing. I am not a registered adviser, and my educational scope is clear.",
    retirementDetail:
      "If you live on a High Point edge in Davidson or Randolph, Medicare Advantage is a different county list. A 401(k) rollover is not. The mistake is treating them as the same decision. Sit down with both in front of you and the Medicare timing is usually the part nobody else mentioned.",
    retirementFaq: [
      {
        q: "Can you be my financial advisor in High Point?",
        a: "I’m a licensed insurance agent. I can explain how a 401(k) option or a Roth conversion lands on a Medicare premium. I cannot manage investments.",
      },
      {
        q: "Do you meet in High Point?",
        a: "I meet with clients in High Point. Consultations are free and available in person or by phone.",
      },
      {
        q: "I still work. Is this too early?",
        a: "The years before 65 are when a conversion is most likely to show up on your first Medicare premium. That’s worth knowing before you move money, not after.",
      },
    ],
  },
  {
    slug: "winston-salem",
    name: "Winston-Salem",
    county: "Forsyth County",
    countyNote: null,
    minutesFromDowntown: 28,
    featured: true,
    population: "about 250,000",
    hospitals: [
      "Atrium Health Wake Forest Baptist Medical Center",
      "Novant Health Forsyth Medical Center",
    ],
    intro:
      "Winston-Salem is in Forsyth County, about half an hour west of downtown Greensboro on I-40 — inside the in-person service area, not past it. Advantage and Part D plans get sold by county, so what you can choose from here is the Forsyth list. It isn’t the Greensboro list, even though people drive between the two every day.",
    localDetail:
      "You’ve got two big systems here — Atrium Health Wake Forest Baptist and Novant Health Forsyth — and plenty of households use both. A plan can easily include one and not the other. The surprise usually shows up with a surgery, not a check-up.",
    nearby: ["Kernersville", "Colfax", "Walkertown", "Greensboro"],
    faq: [
      {
        q: "Why are the plans in Winston-Salem different from Greensboro?",
        a: "Because Medicare draws service areas by county, and you’re in Forsyth while Greensboro is Guilford. An insurance company can offer a plan in one county and not the next one over.",
      },
      {
        q: "I use both Wake Forest Baptist and Novant. Can one plan cover both?",
        a: "Sometimes. That’s exactly the thing to check by name instead of assuming. Tell me which doctors at which system and I’ll check them against what I can offer.",
      },
      {
        q: "You are based in Greensboro. Does that matter?",
        a: "Not for your coverage. What matters is the county you live in. I’m about half an hour up I-40 when we sit down, and licensed in North Carolina either way.",
      },
    ],
    lifeIntro:
      "Winston-Salem is Forsyth County, about half an hour from where I live. That distance is the whole difference between this site and large online marketplaces: I will drive it and sit down at your table. Wake Forest Baptist and Novant are where a lot of the group coverage in this city comes from, and that coverage usually leaves when the job does.",
    lifeDetail:
      "Households here often have a policy from work plus something bought years ago from an agent who has since retired. Beneficiary forms go stale. Term dates sneak up. I’ll read both with you. I don’t need you to come to Greensboro.",
    lifeFaq: [
      {
        q: "You’re in Greensboro. Will you come to Winston-Salem?",
        a: "About half an hour. In person or by phone. No cost.",
      },
      {
        q: "I have coverage through Wake Forest or Novant. Is that enough?",
        a: "It depends what happens to it when you retire. Group life is often a multiple of salary that disappears with the paycheck. Bring the certificate.",
      },
      {
        q: "Do I have to buy something if we meet?",
        a: "A lot of these meetings end with me saying you’re already fine.",
      },
    ],
    retirementIntro:
      "Winston-Salem searches for retirement advisors the same way Greensboro does, and the ads all sell a match through a matching service. I will sit down in Forsyth and explain what an old 401(k) actually does. I will not manage the money. I am not a registered investment adviser.",
    retirementDetail:
      "Forsyth Medicare Advantage lists are not Guilford’s. A rollover is the same paperwork either side of the county line. A lot of people here have money in a Wake Forest or Novant plan and a doctor in the other system, so the Medicare half of retirement and the 401(k) half need to be looked at together.",
    retirementFaq: [
      {
        q: "I want a financial planner in Winston-Salem. Is that you?",
        a: "Not in the licensed sense. I don’t hold a securities license. I can walk through 401(k) options and Medicare timing at no cost.",
      },
      {
        q: "Will you meet in Winston-Salem?",
        a: "in person or by phone. I’m licensed in North Carolina.",
      },
      {
        q: "Does Forsyth vs Guilford matter for a 401(k)?",
        a: "Not for the rollover itself. It matters a great deal if you’re also on Medicare Advantage, because those plans are sold by county.",
      },
    ],
  },
  {
    slug: "kernersville",
    name: "Kernersville",
    county: "Forsyth County",
    countyNote:
      "Most of Kernersville is in Forsyth County. The east side reaches into Guilford. Confirm the county on your tax bill or your mail — that is the Medicare plan list, not the town name.",
    minutesFromDowntown: 28,
    featured: false,
    population: "about 27,000",
    hospitals: ["Novant Health Kernersville Medical Center", "Cone Health to the east"],
    intro:
      "Kernersville sits on the Guilford–Forsyth line, about half an hour west of downtown Greensboro. That is the whole Medicare story here. Two houses on the same road can be shopping from different Advantage lists because one is in Forsyth and the other is in Guilford. A national phone service will ask for your ZIP and guess. I can look at the county.",
    localDetail:
      "Novant Health Kernersville Medical Center is in town. Plenty of people still see specialists at Forsyth Medical Center or at Cone in Greensboro. The plan has to include the place you actually go, not the place the town is named after.",
    nearby: ["Colfax", "Oak Ridge", "Winston-Salem", "Greensboro"],
    faq: [
      {
        q: "Is Kernersville Guilford or Forsyth for Medicare?",
        a: "Most of the town is Forsyth. The east side is Guilford. Check your tax bill. The town name does not decide it.",
      },
      {
        q: "Will you sit down in Kernersville?",
        a: "About half an hour from downtown Greensboro. In person or by phone.",
      },
      {
        q: "My doctor is in Greensboro and I live in Kernersville. Which list am I on?",
        a: "The list for the county your house is in. Then we check whether that plan includes the Greensboro doctor. Those are two different questions.",
      },
    ],
    lifeIntro:
      "Kernersville is a community in the local service area — close enough that I drive it the same as Greensboro, and far enough that a national marketplace treats it as a ZIP to sell. Group coverage here often came with a job in Winston-Salem or at the airport corridor, and it usually ends when the commute does.",
    lifeDetail:
      "I see a lot of term policies bought when someone first moved out here for the schools. The mortgage is smaller now. The kids are older. The policy date is still the original one. Twenty minutes with the pages is the review. Nothing to buy first.",
    lifeFaq: [
      {
        q: "Do you come to Kernersville?",
        a: "About 30 minutes from downtown Greensboro. No cost.",
      },
      {
        q: "Does the county line matter for life insurance?",
        a: "It matters a great deal for Medicare Advantage. Treat them as separate decisions.",
      },
      {
        q: "What should I bring?",
        a: "The policy, the beneficiary page, and anything from work. If you can’t find it, we’ll start from what you remember.",
      },
    ],
    retirementIntro:
      "Kernersville households are often one commute away from a Winston-Salem 401(k) and one county line away from a different Medicare list. I can sit down and separate those. I cannot manage the investments. I am not a registered adviser.",
    retirementDetail:
      "If you live on the Guilford side, a Roth conversion hits the same Medicare income-timing issue as Greensboro. If you live on the Forsyth side, the Advantage list is different and the Medicare timing remains the same. The conversion does not care which county you are in. The plan list does.",
    retirementFaq: [
      {
        q: "Are you a financial advisor in Kernersville?",
        a: "I am a licensed insurance agent, not a registered investment adviser. I provide education about 401(k) options and Medicare timing.",
      },
      {
        q: "Will you meet here?",
        a: "I meet with clients in Kernersville. Consultations are free and available in person or by phone.",
      },
      {
        q: "I still work in Winston-Salem. Is this too early?",
        a: "The years before 65 are when a conversion shows up on the first Medicare premium. Worth knowing while you still commute.",
      },
    ],
  },
  {
    slug: "summerfield",
    name: "Summerfield",
    county: "Guilford County",
    countyNote: null,
    minutesFromDowntown: 22,
    featured: false,
    population: "about 11,000",
    hospitals: ["Cone Health in Greensboro"],
    intro:
      "Summerfield is north Guilford, about twenty minutes from downtown Greensboro up 220. Medicare Advantage here is the Guilford County list — the same one Greensboro sees. What is different is the household: more people who moved out for land and still drive into Cone for every appointment.",
    localDetail:
      "The plan has to include the Greensboro doctors you actually use. Living in Summerfield does not change the county list. It does change how far you are willing to drive for a specialist, and that is the conversation I can have at the table than on a script.",
    nearby: ["Oak Ridge", "Stokesdale", "Browns Summit", "Greensboro"],
    faq: [
      {
        q: "Are Summerfield Medicare plans different from Greensboro?",
        a: "Guilford County. Same list. Your doctors and prescriptions still decide which one fits.",
      },
      {
        q: "Will you come to Summerfield?",
        a: "About twenty minutes north. In person or by phone.",
      },
      {
        q: "We use Cone for everything. Is that enough to know?",
        a: "It’s the starting point. We still check the specific doctors by name for the year your coverage starts.",
      },
    ],
    lifeIntro:
      "Summerfield is where a lot of Greensboro families moved when they wanted a longer driveway and kept the same jobs. The life insurance often still says the old address. I’ll sit down and read it here. I don’t need you to drive into town.",
    lifeDetail:
      "Term coverage bought for a bigger mortgage is the usual file. The house is paid down. The need may not be. Bring the policy. The county line does not affect life insurance. Who is across the table does.",
    lifeFaq: [
      {
        q: "Do you meet in Summerfield?",
        a: "I meet with clients in Summerfield. Consultations are free and available in person or by phone.",
      },
      {
        q: "We already have coverage through a Greensboro job. Should we keep it?",
        a: "Find out what happens when you leave the job. That’s the whole question.",
      },
      {
        q: "Is there a charge?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Summerfield retirees often have a Greensboro 401(k) and a Cone doctor. I can explain what a withdrawal does to the Medicare premium two years later. I cannot pick the funds. I am not a registered adviser.",
    retirementDetail:
      "The drive north does not change the tax timing. A conversion at 63 still shows up on the first Part B bill at 65. Sitting down here instead of on a matching site is the difference.",
    retirementFaq: [
      {
        q: "Can you manage our retirement accounts in Summerfield?",
        a: "I can explain 401(k) options and Medicare timing. Investment management is a different license.",
      },
      {
        q: "Will you come out here?",
        a: "I meet with clients in Summerfield. Consultations are free and available in person or by phone.",
      },
      {
        q: "We’re not 65 yet.",
        a: "That’s when the Medicare timing is most useful to know, not least.",
      },
    ],
  },
  {
    slug: "jamestown",
    name: "Jamestown",
    county: "Guilford County",
    countyNote: null,
    minutesFromDowntown: 20,
    featured: false,
    population: "about 4,000",
    hospitals: [
      "Atrium Health Wake Forest Baptist High Point Medical Center",
      "Cone Health in Greensboro",
    ],
    intro:
      "Jamestown sits between Greensboro and High Point, about twenty minutes from downtown either way, and it is Guilford County. Your Medicare list is the Greensboro list. Your doctors might be at High Point Medical Center. That split is the local fact. The town is small. The county line is not ambiguous here the way it is in Kernersville.",
    localDetail:
      "Guilford College Road households often have a primary doctor in one city and a specialist in the other. The plan has to cover both, by name, for the year coverage starts. I can check that at your table than assume Jamestown works like Greensboro because it shares a county.",
    nearby: ["High Point", "Greensboro", "Pleasant Garden", "Archdale"],
    faq: [
      {
        q: "Is Jamestown on the Greensboro Medicare list?",
        a: "Guilford County. Same Advantage and Part D list as Greensboro and most of High Point.",
      },
      {
        q: "My hospital is High Point Medical Center. Does that still work?",
        a: "Often, but check it. The list is Guilford. The hospital system is Wake Forest Baptist. Those are not the same thing.",
      },
      {
        q: "Will you sit down in Jamestown?",
        a: "About twenty minutes. In person or by phone.",
      },
    ],
    lifeIntro:
      "Jamestown is close enough that I treat it like a Greensboro neighborhood with a High Point hospital. Life insurance here is usually a policy bought when someone first settled between the two cities. I’ll read it at the table. No national phone service.",
    lifeDetail:
      "Job coverage from High Point furniture or Greensboro offices is the usual mix. It ends when the job ends. The town name on the policy does not keep it in force.",
    lifeFaq: [
      {
        q: "Do you come to Jamestown?",
        a: "In-person and phone consultations are available at no cost.",
      },
      {
        q: "Should I replace work coverage before I retire?",
        a: "First find out what happens to it when you leave. Then decide whether the need ends.",
      },
      {
        q: "Do I have to buy something?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Jamestown is Guilford County for Medicare and a High Point hospital for a lot of care. A 401(k) rollover does not care. The Medicare premium two years after a conversion does. I explain that at the table. I do not manage the money.",
    retirementDetail:
      "If you still work in one city and live in Jamestown, the years before 65 are when a large withdrawal is most likely to show up on the first Medicare bill. That is the issue to review, focused on education.",
    retirementFaq: [
      {
        q: "Are you a retirement advisor in Jamestown?",
        a: "I am a licensed insurance agent, not a registered investment adviser. I provide education about 401(k) options and Medicare timing.",
      },
      {
        q: "Will you meet here?",
        a: "I meet with clients in Jamestown. Consultations are free and available in person or by phone.",
      },
      {
        q: "Does living between Greensboro and High Point change the 401(k) rules?",
        a: "It can change which Medicare Advantage list you’re on if you were on a county edge — Jamestown itself is Guilford.",
      },
    ],
  },
  {
    slug: "oak-ridge",
    name: "Oak Ridge",
    county: "Guilford County",
    countyNote: null,
    minutesFromDowntown: 20,
    featured: false,
    population: "about 7,000",
    hospitals: ["Cone Health in Greensboro"],
    intro:
      "Oak Ridge is northwest Guilford, about twenty minutes from downtown Greensboro on Bryan Boulevard and NC-68. Medicare Advantage is the Guilford list. The airport is next door. A lot of households here still see every doctor in Greensboro and assume the town name might mean a different plan menu. It doesn’t.",
    localDetail:
      "What is different is the commute: PTI, the 68 corridor, sometimes a specialist in Kernersville. The plan has to include the Greensboro Cone practices you actually use. Living near the airport does not create a separate Medicare county.",
    nearby: ["Summerfield", "Stokesdale", "Colfax", "Kernersville", "Greensboro"],
    faq: [
      {
        q: "Are Oak Ridge Medicare plans different from Greensboro?",
        a: "Oak Ridge is Guilford County, so the Advantage and Part D list matches Greensboro. Your doctors and prescriptions still decide which plan fits.",
      },
      {
        q: "Will you come to Oak Ridge?",
        a: "About twenty minutes. In person or by phone.",
      },
      {
        q: "We fly a lot. Does that change Medicare Advantage?",
        a: "Travel is one of the questions I’d ask. Original Medicare plus Medigap behaves differently on the road than an Advantage HMO. That’s a real conversation, not a slogan.",
      },
    ],
    lifeIntro:
      "Oak Ridge households often bought coverage when they built out here for the schools. I’ll sit down and read what you have. The airport next door does not change life insurance. Who is across the table does.",
    lifeDetail:
      "Group life through a Greensboro employer or a company near PTI is common. It usually ends with the badge. Bring the certificate from work and the policy you bought on your own.",
    lifeFaq: [
      {
        q: "Do you meet in Oak Ridge?",
        a: "I meet with clients in Oak Ridge. Consultations are free and available in person or by phone.",
      },
      {
        q: "Is work coverage enough?",
        a: "Only if it continues after you leave. Most of it doesn’t.",
      },
      {
        q: "Any fee?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Oak Ridge is Guilford County, Cone doctors, and often a 401(k) from a Greensboro or airport-corridor job. I can walk through what a withdrawal does to Medicare. I cannot tell you what to hold in the account.",
    retirementDetail:
      "The drive out 68 does not change IRMAA. A conversion two years before you enroll still sets the first Part B premium. That’s the part matching sites skip.",
    retirementFaq: [
      {
        q: "Can you be our financial planner in Oak Ridge?",
        a: "Licensed insurance agent. Medicare timing and 401(k) options, not investment advice.",
      },
      {
        q: "Will you come here?",
        a: "I meet with clients in Oak Ridge. Consultations are free and available in person or by phone.",
      },
      {
        q: "We’re years from Medicare.",
        a: "Those are the years a conversion is most likely to show up later. Worth a conversation now.",
      },
    ],
  },
  {
    slug: "archdale",
    name: "Archdale",
    county: "Randolph County",
    countyNote:
      "Archdale is in Randolph County, immediately south of High Point. High Point’s Medicare list is usually Guilford. Yours is not. Confirm the county on your mail if you live near the city line.",
    minutesFromDowntown: 25,
    featured: false,
    population: "about 12,000",
    hospitals: ["Atrium Health Wake Forest Baptist High Point Medical Center"],
    intro:
      "Archdale is about twenty-five minutes south of downtown Greensboro, just past High Point on I-85, and it is Randolph County. That is the fact a High Point neighbor will not have. Medicare Advantage in Archdale is not the Guilford list. You can live three minutes from High Point Medical Center and be shopping from a different menu.",
    localDetail:
      "The hospital you use may be in Guilford. The plan list is Randolph. That split is how people enroll in something that looks right on a High Point mailer and does not include the doctors they actually see. I can check the county first, then the doctors, at your table.",
    nearby: ["High Point", "Thomasville", "Jamestown", "Randleman"],
    faq: [
      {
        q: "Are Archdale Medicare plans the same as High Point?",
        a: "Usually no. Archdale is Randolph County. Most of High Point is Guilford. Confirm your county. It changes the list you can buy from.",
      },
      {
        q: "My doctors are in High Point. Can I still use them?",
        a: "That is what should be verified. Randolph plans may or may not include a specific High Point practice. We look it up by name for the year coverage starts.",
      },
      {
        q: "Will you sit down in Archdale?",
        a: "About twenty-five minutes from downtown Greensboro. In person or by phone.",
      },
    ],
    lifeIntro:
      "Archdale is a Randolph County in-person meeting twenty-five minutes from Greensboro. Life insurance does not follow the county line that just changed your Medicare list. I’ll drive it and read the policy with you.",
    lifeDetail:
      "A lot of coverage here came with High Point work. The job was in Guilford. The house is in Randolph. The group policy does not care. It ends when the job ends. Bring the certificate.",
    lifeFaq: [
      {
        q: "Do you come to Archdale?",
        a: "I meet with clients in Archdale. Consultations are free and available in person or by phone.",
      },
      {
        q: "Does Randolph vs Guilford matter for life insurance?",
        a: "It matters for Medicare Advantage. Don’t mix them.",
      },
      {
        q: "Do I have to buy?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Archdale is Randolph County for Medicare and often a High Point 401(k). Those are different rules. I can sit down and separate them. I am not a registered investment adviser.",
    retirementDetail:
      "A rollover is the same paperwork as in Greensboro. The Advantage list is not. If you are turning 65, look at both in the same meeting. That’s why I can be at the table than on a national matching site.",
    retirementFaq: [
      {
        q: "Are you a financial advisor in Archdale?",
        a: "I explain 401(k) options and how withdrawals hit Medicare.",
      },
      {
        q: "Will you meet here?",
        a: "I meet with clients in Archdale. Consultations are free and available in person or by phone.",
      },
      {
        q: "I work in High Point and live in Archdale. Which Medicare list?",
        a: "The county your house is in — Randolph, for most of Archdale — not the county you drive to for work.",
      },
    ],
  },
  {
    slug: "thomasville",
    name: "Thomasville",
    county: "Davidson County",
    countyNote:
      "Thomasville is in Davidson County. High Point next door is mostly Guilford. Confirm your county if you live near the line. It decides the Medicare plan list.",
    minutesFromDowntown: 30,
    featured: false,
    population: "about 27,000",
    hospitals: ["Atrium Health Wake Forest Baptist High Point Medical Center"],
    intro:
      "Thomasville is about thirty minutes south of downtown Greensboro, just past High Point, and it is Davidson County. That is the edge of the in-person service area, not past it. Medicare Advantage here is not the Guilford list High Point mailers are written for. The chair factory town and the hospital system are easy to confuse with High Point. The county line is not.",
    localDetail:
      "Most people I talk to here still use High Point Medical Center. The plan has to include it from a Davidson list, not a Guilford one. If you live on the north side toward Archdale, check the county on the tax bill before you enroll in anything a High Point neighbor recommended.",
    nearby: ["Archdale", "High Point", "Randleman"],
    faq: [
      {
        q: "Is Thomasville on the same Medicare list as High Point?",
        a: "Thomasville is Davidson County. Most of High Point is Guilford. Different lists.",
      },
      {
        q: "Will you drive to Thomasville?",
        a: "About half an hour. That’s the edge of where I sit down in person.",
      },
      {
        q: "Can a Davidson plan include High Point Medical Center?",
        a: "Sometimes. We check the specific plan and the year coverage starts. Confirm the current network before enrolling.",
      },
    ],
    lifeIntro:
      "Thomasville is a half-hour drive and a Davidson County in-person meeting. Life insurance here often came with furniture-industry work that has since changed names. I’ll read what you still have. No national phone service.",
    lifeDetail:
      "Group coverage from a High Point or Thomasville employer usually ends at retirement. Permanent coverage bought at an in-person meeting twenty years ago is the other file. Bring both if you have them.",
    lifeFaq: [
      {
        q: "Do you come to Thomasville?",
        a: "About 30 minutes from downtown Greensboro. No cost.",
      },
      {
        q: "Does Davidson County change life insurance?",
        a: "It changes Medicare Advantage. Different problem.",
      },
      {
        q: "Fee?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Thomasville is Davidson County for Medicare and often a High Point 401(k). I can explain the four options and the two-year Medicare income lookback. I cannot manage the account. I am not a registered adviser.",
    retirementDetail:
      "The county line that just changed your Advantage list does not change required distributions at 73. It does change which Medicare plan you can buy when you enroll. Sit down with both questions at once.",
    retirementFaq: [
      {
        q: "Can you be my financial advisor in Thomasville?",
        a: "Licensed insurance agent. 401(k) options and Medicare timing only.",
      },
      {
        q: "Will you meet here?",
        a: "About half an hour. In person or by phone.",
      },
      {
        q: "We’re on the High Point line.",
        a: "Confirm the county. That’s the Medicare list. The 401(k) paperwork is the same either side.",
      },
    ],
  },
  {
    slug: "pleasant-garden",
    name: "Pleasant Garden",
    county: "Guilford County",
    countyNote: null,
    minutesFromDowntown: 18,
    featured: false,
    population: "about 5,000",
    hospitals: ["Cone Health in Greensboro"],
    intro:
      "Pleasant Garden is south Guilford, under twenty minutes from downtown Greensboro down 421 or Randleman Road. Medicare Advantage is the Guilford list. The temptation is to think “south of town” means Randolph. For most of Pleasant Garden it does not. Confirm it if you live toward Randleman.",
    localDetail:
      "Doctors are usually Cone. The plan list is Guilford. What I check is the specific practice, because south-side households sometimes also see someone in High Point. Two systems, one county list, still two networks to verify.",
    nearby: ["Greensboro", "Jamestown", "Randleman", "McLeansville"],
    faq: [
      {
        q: "Is Pleasant Garden Guilford County for Medicare?",
        a: "Yes, for the town itself. If you live toward the Randolph line, confirm the county on your mail.",
      },
      {
        q: "Will you come to Pleasant Garden?",
        a: "Under twenty minutes from downtown. In person or by phone.",
      },
      {
        q: "We see Cone doctors. Are we fine?",
        a: "Probably the right starting point. We still check names and the year coverage starts.",
      },
    ],
    lifeIntro:
      "Pleasant Garden is a short drive south and a Guilford County in-person meeting. I’ll sit down here the same as in town. Life insurance is not a different product because the address says Pleasant Garden.",
    lifeDetail:
      "Policies here are often the same Greensboro-job group coverage plus a term policy for the house. The group coverage leaves with the job. I’ll read both.",
    lifeFaq: [
      {
        q: "Do you meet in Pleasant Garden?",
        a: "I meet with clients in Pleasant Garden. Consultations are free and available in person or by phone.",
      },
      {
        q: "Should we keep work life insurance after we retire?",
        a: "Only if it actually continues. Most of it doesn’t. Bring the certificate.",
      },
      {
        q: "Any obligation?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Pleasant Garden is Guilford Medicare and usually a Greensboro 401(k). I explain what a withdrawal does to the premium two years later. I do not pick investments.",
    retirementDetail:
      "Being south of the city does not change IRMAA. It does mean I can sit down here than ask you to drive in for a conversation that takes twenty minutes.",
    retirementFaq: [
      {
        q: "Are you a retirement planner in Pleasant Garden?",
        a: "Licensed agent. Education, not investment advice.",
      },
      {
        q: "Will you come here?",
        a: "I meet with clients in Pleasant Garden. Consultations are free and available in person or by phone.",
      },
      {
        q: "Not 65 yet.",
        a: "Those are the years a conversion or a withdrawal is most likely to show up on the first Medicare premium. Worth knowing before 65, not after — and I will sit down in Pleasant Garden to walk through it.",
      },
    ],
  },
  {
    slug: "whitsett",
    name: "Whitsett",
    county: "Guilford County",
    countyNote:
      "Whitsett is Guilford County. Gibsonville and Elon next door start to pick up Alamance. Confirm the county if you live toward the east line.",
    minutesFromDowntown: 20,
    featured: false,
    population: "about 600",
    hospitals: ["Cone Health in Greensboro", "Cone Health Alamance Regional in Burlington"],
    intro:
      "Whitsett is east Guilford, about twenty minutes from downtown Greensboro toward Burlington on I-40/85. Medicare Advantage is the Guilford list. The town is small. The county line with Alamance is close. People here use Cone in Greensboro, Alamance Regional, or both. That is the check, not a ZIP code a marketplace targets.",
    localDetail:
      "If you live toward Gibsonville, confirm Guilford vs Alamance before you enroll. Two minutes of driveway can change the plan list. Then we check whether the plan includes the hospital you actually use.",
    nearby: ["Gibsonville", "McLeansville", "Elon", "Burlington", "Greensboro"],
    faq: [
      {
        q: "Is Whitsett on the Greensboro Medicare list?",
        a: "Yes, if your house is in Guilford County. Confirm it if you live toward Alamance.",
      },
      {
        q: "We use Alamance Regional. Can a Guilford plan include it?",
        a: "Sometimes. We check by name for the year coverage starts. I will not publish a stale table.",
      },
      {
        q: "Will you sit down in Whitsett?",
        a: "About twenty minutes east. In person or by phone.",
      },
    ],
    lifeIntro:
      "Whitsett is a Guilford County in-person meeting on the way to Burlington. I’ll drive it. Life insurance here is often a Greensboro job policy plus something bought when the house went up. I’ll read both.",
    lifeDetail:
      "Group coverage does not become more permanent because you live east of town. It ends when the job ends. Bring the pages.",
    lifeFaq: [
      {
        q: "Do you come to Whitsett?",
        a: "I meet with clients in Whitsett. Consultations are free and available in person or by phone.",
      },
      {
        q: "Does the Alamance line matter for life insurance?",
        a: "Not for life insurance. It can change your Medicare Advantage list. In Whitsett I keep those separate on purpose.",
      },
      {
        q: "Fee?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Whitsett is Guilford for Medicare if that’s where the house is, and often a Greensboro or Burlington 401(k). I separate those at the table. I do not manage the money.",
    retirementDetail:
      "A conversion hits IRMAA the same in Whitsett as in Greensboro. The Advantage list only changes if the house is actually in Alamance. Confirm the county first.",
    retirementFaq: [
      {
        q: "Financial advisor in Whitsett?",
        a: "Licensed agent. 401(k) options and Medicare timing.",
      },
      {
        q: "Will you meet here?",
        a: "I meet with clients in Whitsett. Consultations are free and available in person or by phone.",
      },
      {
        q: "We might be in Alamance.",
        a: "Then the Medicare list is different. The 401(k) rules are not. We’ll look at the tax bill.",
      },
    ],
  },
  {
    slug: "mcleansville",
    name: "McLeansville",
    county: "Guilford County",
    countyNote: null,
    minutesFromDowntown: 15,
    featured: false,
    population: "unincorporated Guilford County",
    hospitals: ["Cone Health in Greensboro"],
    intro:
      "McLeansville is northeast Guilford, about fifteen minutes from downtown Greensboro. It does not have a city hall. It does have a Medicare county: Guilford. Advantage and Part D are the Greensboro list. The search people actually run is still “Medicare in McLeansville,” and a site that only names the three big cities will not answer it.",
    localDetail:
      "Doctors are almost always Cone. The work is checking the specific practice and whether anyone also sees a specialist toward Burlington. Fifteen minutes is not a different market. It is a different search.",
    nearby: ["Browns Summit", "Whitsett", "Greensboro", "Gibsonville"],
    faq: [
      {
        q: "Is McLeansville Guilford County for Medicare?",
        a: "McLeansville is Guilford County — the same Advantage and Part D list Greensboro shops from.",
      },
      {
        q: "Will you come to McLeansville?",
        a: "About fifteen minutes. In person or by phone.",
      },
      {
        q: "We don’t have a city address. Does that matter?",
        a: "Medicare cares about the county, not whether the place is incorporated. Guilford is Guilford.",
      },
    ],
    lifeIntro:
      "McLeansville is a Guilford County in-person meeting fifteen minutes from mine. I’ll sit down here. Life insurance is the same question as in town: how many more years the money needs to be there.",
    lifeDetail:
      "Unincorporated does not mean uninsured. I read the same group certificates and the same term policies. Bring what you have.",
    lifeFaq: [
      {
        q: "Do you meet in McLeansville?",
        a: "I meet with clients in McLeansville. Consultations are free and available in person or by phone.",
      },
      {
        q: "Work coverage through Greensboro — keep it?",
        a: "Find out what happens when you leave. That is the starting point for a review.",
      },
      {
        q: "Obligation?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "McLeansville is Guilford Medicare and usually a Greensboro 401(k). I explain the four options and the two-year Medicare income lookback. I am not a registered adviser.",
    retirementDetail:
      "There is no special McLeansville retirement product. There is an in-person meeting fifteen minutes away and a Medicare timing question most matching sites will not mention.",
    retirementFaq: [
      {
        q: "Retirement advisor in McLeansville?",
        a: "I am a licensed insurance agent, not a registered investment adviser. I provide education about 401(k) options and Medicare timing in McLeansville, but not individualized investment advice.",
      },
      {
        q: "Will you come out?",
        a: "I meet with clients in McLeansville. Consultations are free and available in person or by phone.",
      },
      {
        q: "Too early if we’re 60?",
        a: "That’s when a conversion is most likely to hit the first Medicare premium. Not too early.",
      },
    ],
  },
  {
    slug: "browns-summit",
    name: "Browns Summit",
    county: "Guilford County",
    countyNote: null,
    minutesFromDowntown: 20,
    featured: false,
    population: "unincorporated Guilford County",
    hospitals: ["Cone Health in Greensboro"],
    intro:
      "Browns Summit is north Guilford on US-29, about twenty minutes from downtown Greensboro toward Reidsville. Medicare Advantage is the Guilford list. Reidsville next door is Rockingham. If you live toward the county line, that is the first thing to pin down — not the name of the crossroads.",
    localDetail:
      "Most care is Cone in Greensboro. Some households also use UNC Health Rockingham in Reidsville. Guilford plans and Rockingham plans are different lists. The driveway toward 29 does not look like a county line. The tax bill does.",
    nearby: ["McLeansville", "Summerfield", "Reidsville", "Greensboro"],
    faq: [
      {
        q: "Is Browns Summit on the Greensboro Medicare list?",
        a: "Yes, if the house is in Guilford. Toward Reidsville, confirm you are not in Rockingham.",
      },
      {
        q: "Will you sit down in Browns Summit?",
        a: "About twenty minutes north. In person or by phone.",
      },
      {
        q: "We see a doctor in Reidsville.",
        a: "Then we check whether a Guilford plan includes that practice. Verify it before enrolling because you drive 29 every week.",
      },
    ],
    lifeIntro:
      "Browns Summit is twenty minutes up 29. I’ll sit down there. Life insurance does not change at the Rockingham line. Medicare Advantage does. I’ll keep those separate.",
    lifeDetail:
      "Coverage here is often a Greensboro job policy. It ends when the commute ends. Bring the certificate and anything you bought on your own.",
    lifeFaq: [
      {
        q: "Do you come to Browns Summit?",
        a: "I meet with clients in Browns Summit. Consultations are free and available in person or by phone.",
      },
      {
        q: "Rockingham line — does it matter for life insurance?",
        a: "Not for life insurance. It can change your Medicare Advantage list. In Browns Summit I keep those separate on purpose.",
      },
      {
        q: "Must we buy?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Browns Summit is Guilford for Medicare if the house is Guilford, and a Greensboro 401(k) for a lot of people. I explain timing. I do not manage investments.",
    retirementDetail:
      "If you are on the Rockingham edge, the Advantage list changes and the IRMAA math does not. Confirm the county, then look at the withdrawal.",
    retirementFaq: [
      {
        q: "Financial planner in Browns Summit?",
        a: "I am a licensed insurance agent, not a registered investment adviser. I provide education about 401(k) options and Medicare timing in Browns Summit, but not individualized investment advice.",
      },
      {
        q: "Will you meet here?",
        a: "I meet with clients in Browns Summit. Consultations are free and available in person or by phone.",
      },
      {
        q: "Close to Reidsville — which county?",
        a: "Whatever is on the tax bill. That’s the Medicare list.",
      },
    ],
  },
  {
    slug: "gibsonville",
    name: "Gibsonville",
    county: "Guilford and Alamance Counties",
    countyNote:
      "Gibsonville sits on the Guilford–Alamance line. Confirm which county your house is in. That is the Medicare Advantage list — not the town name.",
    minutesFromDowntown: 22,
    featured: false,
    population: "about 9,000",
    hospitals: ["Cone Health in Greensboro", "Cone Health Alamance Regional in Burlington"],
    intro:
      "Gibsonville is about twenty minutes east of downtown Greensboro and it sits on two counties. That is the Medicare story. A house on the Guilford side is on the Greensboro list. A house on the Alamance side is on the Burlington list. The town name is the same. The plan menus are not.",
    localDetail:
      "People here use Cone in Greensboro, Alamance Regional, or both. Elon is next door. I can look at the tax bill and the doctors’ names in person than let a ZIP code decide it.",
    nearby: ["Whitsett", "Elon", "Burlington", "McLeansville", "Greensboro"],
    faq: [
      {
        q: "Which Medicare list is Gibsonville on?",
        a: "Whichever county the house is in. Guilford or Alamance. Check the tax bill. The town name does not decide it.",
      },
      {
        q: "Will you come to Gibsonville?",
        a: "About twenty minutes. In person or by phone.",
      },
      {
        q: "We use Alamance Regional and live on the Guilford side.",
        a: "Then we check whether a Guilford plan includes that hospital. Two different facts.",
      },
    ],
    lifeIntro:
      "Gibsonville is an in-person meeting on the Guilford–Alamance line. Life insurance ignores that line. I’ll still drive it, because the person who reads the policy should not be a remote representative.",
    lifeDetail:
      "Work coverage from Burlington, Elon, or Greensboro is common. It ends with the job. The county split that just changed your Medicare list does not keep group life in force.",
    lifeFaq: [
      {
        q: "Do you meet in Gibsonville?",
        a: "In-person and phone consultations are available at no cost.",
      },
      {
        q: "Does the county split matter for life insurance?",
        a: "Not for life insurance. It can change your Medicare Advantage list. In Gibsonville I keep those separate on purpose.",
      },
      {
        q: "Fee?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Gibsonville can be two Medicare counties in one town. A 401(k) is not. I sit down and keep those straight. I am not a registered investment adviser.",
    retirementDetail:
      "Confirm the county before you enroll in Advantage. Then look at what a conversion does to the premium. Matching sites will not ask about the town line. I will.",
    retirementFaq: [
      {
        q: "Retirement advisor in Gibsonville?",
        a: "Licensed agent. 401(k) options and Medicare timing.",
      },
      {
        q: "Will you meet here?",
        a: "I meet with clients in Gibsonville. Consultations are free and available in person or by phone.",
      },
      {
        q: "How do I know my county?",
        a: "Tax bill or property record. Not the town name, not the ZIP alone.",
      },
    ],
  },
  {
    slug: "elon",
    name: "Elon",
    county: "Alamance County",
    countyNote: null,
    minutesFromDowntown: 28,
    featured: false,
    population: "about 11,000",
    hospitals: ["Cone Health Alamance Regional in Burlington"],
    intro:
      "Elon is Alamance County, about half an hour east of downtown Greensboro past Gibsonville. Medicare Advantage here is not the Guilford list. It is the Alamance list, the same one Burlington sees. University town, Cone Health hospital in Burlington, and an in-person meeting I can reach in person.",
    localDetail:
      "Alamance Regional is the usual hospital. Some households still see specialists in Greensboro. The plan has to include both if that’s how you actually get care. Living next to Elon University does not put you on the Guilford menu.",
    nearby: ["Gibsonville", "Burlington", "Whitsett"],
    faq: [
      {
        q: "Are Elon Medicare plans the same as Greensboro?",
        a: "Elon is Alamance County. Greensboro is Guilford. Different lists.",
      },
      {
        q: "Will you sit down in Elon?",
        a: "About half an hour. In person or by phone.",
      },
      {
        q: "I still see a Greensboro specialist.",
        a: "Then we check whether an Alamance plan includes that practice. Verify it before enrolling.",
      },
    ],
    lifeIntro:
      "Elon is a half-hour east. I’ll sit down there. Life insurance does not follow the Alamance line that just changed your Medicare list. Who reads the policy still does.",
    lifeDetail:
      "University and hospital jobs are a lot of the group coverage in this town. It usually ends when the badge does. Bring the certificate.",
    lifeFaq: [
      {
        q: "Do you come to Elon?",
        a: "About 30 minutes from downtown Greensboro. No cost.",
      },
      {
        q: "Alamance vs Guilford for life insurance?",
        a: "Not for life insurance. It can change your Medicare Advantage list. In Elon I keep those separate on purpose.",
      },
      {
        q: "Must we buy?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Elon is Alamance County for Medicare and often a 401(k) from the university, the hospital, or a Greensboro commute. I explain options and timing. I do not manage investments.",
    retirementDetail:
      "The Advantage list is Alamance. The IRMAA math is the same as Greensboro. Sit down with both. That’s the local version of a retirement conversation, focused on education.",
    retirementFaq: [
      {
        q: "Financial advisor in Elon?",
        a: "I am a licensed insurance agent, not a registered investment adviser. I provide education about 401(k) options and Medicare timing in Elon, but not individualized investment advice.",
      },
      {
        q: "Will you meet here?",
        a: "I meet with clients in Elon. Consultations are free and available in person or by phone.",
      },
      {
        q: "I work in Greensboro and live in Elon.",
        a: "Medicare follows the house — Alamance — not the commute.",
      },
    ],
  },
  {
    slug: "burlington",
    name: "Burlington",
    county: "Alamance County",
    countyNote: null,
    minutesFromDowntown: 30,
    featured: false,
    population: "about 55,000",
    hospitals: ["Cone Health Alamance Regional Medical Center"],
    intro:
      "Burlington is about thirty minutes east of downtown Greensboro on I-40/85 in ordinary traffic — the eastern edge of where I sit down in person, not past it. It is Alamance County. Medicare Advantage here is not the Guilford list. Alamance Regional is Cone Health, which confuses people who think Cone means the Greensboro plan menu. The hospital system and the county list are different facts.",
    localDetail:
      "If you live on the west side toward Elon and Gibsonville, you are still usually Alamance. Confirm it. Then we check the doctors by name. I will drive this in ordinary traffic. I will not pretend Asheboro is the same kind of trip.",
    nearby: ["Elon", "Gibsonville", "Whitsett"],
    faq: [
      {
        q: "Is Burlington within your service area?",
        a: "About half an hour on I-40 in ordinary traffic. That’s the eastern edge of in-person meetings.",
      },
      {
        q: "Are Burlington Medicare plans the same as Greensboro?",
        a: "Alamance vs Guilford. Different lists, even though Alamance Regional is Cone Health.",
      },
      {
        q: "Will you sit down in Burlington?",
        a: "I meet with clients in Burlington. Consultations are free and available in person or by phone.",
      },
    ],
    lifeIntro:
      "Burlington is a half-hour east and an in-person meeting I will drive to. Life insurance here often came with mill, hospital, or lab work. I’ll read what you have. No national phone service.",
    lifeDetail:
      "Group life through Alamance Regional or a local employer usually ends at retirement. Bring the certificate. The Cone logo on the hospital does not put you on a Greensboro life-insurance product. There isn’t one. There’s a person who will sit down.",
    lifeFaq: [
      {
        q: "Do you come to Burlington?",
        a: "I meet with clients in Burlington. Consultations are free and available in person or by phone.",
      },
      {
        q: "Is that too far?",
        a: "It’s the edge of in-person visits. I still make it.",
      },
      {
        q: "Fee?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Burlington is Alamance County for Medicare and a different 401(k) landscape than Greensboro. I can explain options and how a withdrawal hits a Medicare premium. I am not a registered adviser.",
    retirementDetail:
      "Cone Health on the hospital does not mean Guilford Advantage. Confirm Alamance, then look at the conversion timing. Those are the details to review together.",
    retirementFaq: [
      {
        q: "Retirement advisor in Burlington?",
        a: "I am a licensed insurance agent, not a registered investment adviser. I provide education about 401(k) options and Medicare timing in Burlington, but not individualized investment advice.",
      },
      {
        q: "Will you meet here?",
        a: "I meet with clients in Burlington. Consultations are free and available in person or by phone.",
      },
      {
        q: "I used to live in Greensboro.",
        a: "Medicare follows the house you live in now. Alamance list, not the old Guilford one.",
      },
    ],
  },
  {
    slug: "stokesdale",
    name: "Stokesdale",
    county: "Guilford County",
    countyNote:
      "Stokesdale is mostly Guilford County. The north side approaches Rockingham. Confirm the county if you live toward the line.",
    minutesFromDowntown: 28,
    featured: false,
    population: "about 6,000",
    hospitals: ["Cone Health in Greensboro"],
    intro:
      "Stokesdale is northwest Guilford, about half an hour from downtown Greensboro through Oak Ridge on NC-68. Medicare Advantage is the Guilford list for most of the town. Rockingham County starts not far north. That is worth confirming before you enroll in anything a Summerfield neighbor is on.",
    localDetail:
      "Doctors are usually Cone in Greensboro. The drive is longer than Oak Ridge and still inside the in-person service area. I sit down here. I do not treat Stokesdale as too far because it isn’t Greensboro proper.",
    nearby: ["Oak Ridge", "Summerfield", "Reidsville", "Greensboro"],
    faq: [
      {
        q: "Is Stokesdale Guilford County for Medicare?",
        a: "Mostly yes. Confirm if you live toward Rockingham.",
      },
      {
        q: "Will you come to Stokesdale?",
        a: "About half an hour. In person or by phone.",
      },
      {
        q: "That’s farther than Summerfield.",
        a: "It’s still about 30 minutes. That’s the service area — not the city limit.",
      },
    ],
    lifeIntro:
      "Stokesdale is a Guilford County in-person meeting I will drive to. Life insurance here is often a policy bought when someone wanted land and kept a Greensboro job. I’ll read it on site.",
    lifeDetail:
      "Group coverage from Greensboro does not become permanent because the house is in Stokesdale. Bring the work certificate and the policy in the file cabinet.",
    lifeFaq: [
      {
        q: "Do you meet in Stokesdale?",
        a: "I meet with clients in Stokesdale. Consultations are free and available in person or by phone.",
      },
      {
        q: "Too far?",
        a: "Stokesdale is about 28 minutes from downtown Greensboro, inside the in-person service area described here.",
      },
      {
        q: "Obligation?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Stokesdale is Guilford Medicare for most houses and a Greensboro 401(k) for a lot of commuters. I explain timing. I do not manage the account.",
    retirementDetail:
      "The extra ten minutes past Oak Ridge does not change IRMAA. It does mean you should not have to drive into Greensboro for a twenty-minute conversation.",
    retirementFaq: [
      {
        q: "Financial planner in Stokesdale?",
        a: "I am a licensed insurance agent, not a registered investment adviser. I provide education about 401(k) options and Medicare timing in Stokesdale, but not individualized investment advice.",
      },
      {
        q: "Will you come here?",
        a: "I meet with clients in Stokesdale. Consultations are free and available in person or by phone.",
      },
      {
        q: "Near Rockingham — which Medicare list?",
        a: "Whatever county is on the tax bill. In Stokesdale most houses are Guilford County, but the Rockingham edge is close enough to confirm.",
      },
    ],
  },
  {
    slug: "colfax",
    name: "Colfax",
    county: "Guilford County",
    countyNote: null,
    minutesFromDowntown: 18,
    featured: false,
    population: "unincorporated Guilford County",
    hospitals: ["Cone Health in Greensboro", "Novant Health Kernersville Medical Center"],
    intro:
      "Colfax is west Guilford, under twenty minutes from downtown Greensboro on I-40 toward Kernersville and PTI. Medicare Advantage is the Guilford list. Kernersville next door is mostly Forsyth. The interchange does not look like a county line. The plan list changes when you cross it.",
    localDetail:
      "Households here use Cone, Kernersville Medical Center, or High Point Medical Center. Guilford plans still have to include the specific place you go. Colfax is not a different Medicare county from Greensboro. Kernersville often is.",
    nearby: ["Kernersville", "Oak Ridge", "Jamestown", "High Point", "Greensboro"],
    faq: [
      {
        q: "Is Colfax on the Greensboro Medicare list?",
        a: "Colfax is Guilford County — the same Advantage and Part D list Greensboro shops from.",
      },
      {
        q: "We use the Kernersville hospital. Is that a problem?",
        a: "It’s the thing to check. The hospital is in Forsyth. Your list is Guilford. Confirm the plan includes it.",
      },
      {
        q: "Will you sit down in Colfax?",
        a: "Under twenty minutes. In person or by phone.",
      },
    ],
    lifeIntro:
      "Colfax is I-40, the airport, and a Guilford County in-person meeting. I’ll sit down here. Life insurance is usually Greensboro or High Point job coverage plus a policy for the house.",
    lifeDetail:
      "Group life from a warehouse, airline, or furniture job in this corridor usually ends with the badge. Bring the certificate. The Kernersville exit does not change that.",
    lifeFaq: [
      {
        q: "Do you come to Colfax?",
        a: "I meet with clients in Colfax. Consultations are free and available in person or by phone.",
      },
      {
        q: "Forsyth line — life insurance?",
        a: "Not for life insurance. It can change your Medicare Advantage list. In Colfax I keep those separate on purpose.",
      },
      {
        q: "Fee?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Colfax is Guilford Medicare and often a 401(k) from the I-40 corridor. I explain options and the two-year Medicare income lookback. I am not a registered adviser.",
    retirementDetail:
      "If you work in Kernersville and live in Colfax, Medicare follows the house — Guilford — not the job. The 401(k) follows the plan document. Sit down with both.",
    retirementFaq: [
      {
        q: "Retirement advisor in Colfax?",
        a: "I am a licensed insurance agent, not a registered investment adviser. I provide education about 401(k) options and Medicare timing in Colfax, but not individualized investment advice.",
      },
      {
        q: "Will you meet here?",
        a: "I meet with clients in Colfax. Consultations are free and available in person or by phone.",
      },
      {
        q: "I work in Kernersville.",
        a: "Advantage follows your house county. Colfax is Guilford. Kernersville is often Forsyth.",
      },
    ],
  },
  {
    slug: "reidsville",
    name: "Reidsville",
    county: "Rockingham County",
    countyNote: null,
    minutesFromDowntown: 30,
    featured: false,
    population: "about 14,000",
    hospitals: ["UNC Health Rockingham (Annie Penn Hospital)"],
    intro:
      "Reidsville is about thirty minutes north of downtown Greensboro on US-29 — the northern edge of in-person meetings. It is Rockingham County. Medicare Advantage here is not the Guilford list. Browns Summit on the way up is still Guilford. The county line is the whole story, and a Greensboro mailer will not mention it.",
    localDetail:
      "UNC Health Rockingham is where a lot of care happens. Some households still see Cone specialists in Greensboro. The plan has to include the places you actually go, from a Rockingham list. I will make this drive. I will not stretch it to Danville and call that the same radius.",
    nearby: ["Browns Summit", "Stokesdale", "Summerfield"],
    faq: [
      {
        q: "Is Reidsville in your service area?",
        a: "About half an hour on US-29. That’s the northern edge of in-person meetings.",
      },
      {
        q: "Same Medicare plans as Greensboro?",
        a: "Rockingham County vs Guilford. Different lists.",
      },
      {
        q: "Will you sit down in Reidsville?",
        a: "I meet with clients in Reidsville. Consultations are free and available in person or by phone.",
      },
    ],
    lifeIntro:
      "Reidsville is a half-hour north. I’ll sit down there. Life insurance does not follow the Rockingham line. The person who reads it should still be willing to drive 29.",
    lifeDetail:
      "Group coverage from mill, hospital, or a Greensboro commute is common. It ends with the job. Bring what you have.",
    lifeFaq: [
      {
        q: "Do you come to Reidsville?",
        a: "I meet with clients in Reidsville. Consultations are free and available in person or by phone.",
      },
      {
        q: "Too far?",
        a: "Reidsville is about 30 minutes from downtown Greensboro, inside the in-person service area described here.",
      },
      {
        q: "Fee?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Reidsville is Rockingham County for Medicare. A 401(k) from a Greensboro job is a different document. I explain both. I do not manage investments.",
    retirementDetail:
      "The Advantage list is Rockingham. IRMAA is the same math. Don’t enroll from a Guilford mailer because you used to live south of the line.",
    retirementFaq: [
      {
        q: "Financial advisor in Reidsville?",
        a: "I am a licensed insurance agent, not a registered investment adviser. I provide education about 401(k) options and Medicare timing in Reidsville, but not individualized investment advice.",
      },
      {
        q: "Will you meet here?",
        a: "I meet with clients in Reidsville. Consultations are free and available in person or by phone.",
      },
      {
        q: "I still drive to Cone.",
        a: "Then we check whether a Rockingham plan includes those doctors. Verify it before enrolling.",
      },
    ],
  },
  {
    slug: "randleman",
    name: "Randleman",
    county: "Randolph County",
    countyNote: null,
    minutesFromDowntown: 28,
    featured: false,
    population: "about 4,000",
    hospitals: ["Cone Health in Greensboro", "Randolph Health in Asheboro"],
    intro:
      "Randleman is about half an hour south of downtown Greensboro on US-220 — as far toward Asheboro as I sit down in person. Asheboro itself is closer to 50 minutes and is not on this list. Randleman is Randolph County. Medicare Advantage is not the Guilford list Pleasant Garden is on, even though the drive looks like the same road.",
    localDetail:
      "Some people still use Cone in Greensboro. Some use Randolph Health. The plan list is Randolph. Pleasant Garden, twenty minutes north, is Guilford. That is the kind of local split a national phone service will not have, and it is why the page exists.",
    nearby: ["Pleasant Garden", "Archdale", "Thomasville"],
    faq: [
      {
        q: "Do you serve Asheboro?",
        a: "Asheboro proper is about 50 minutes — outside the in-person service area. Randleman is the south edge I will drive. Phone is always fine farther out.",
      },
      {
        q: "Same Medicare plans as Greensboro?",
        a: "Randleman is Randolph County. Greensboro is Guilford. Those are different Advantage lists.",
      },
      {
        q: "Will you sit down in Randleman?",
        a: "About half an hour. In person or by phone.",
      },
    ],
    lifeIntro:
      "Randleman is the south edge of in-person visits. I’ll sit down there. Life insurance does not follow the Randolph line. Asheboro is farther than I claim for an in-person meeting; this town is not.",
    lifeDetail:
      "Coverage here often came with mill or Greensboro work. Bring the pages. I will not list Asheboro as if I drive it every week.",
    lifeFaq: [
      {
        q: "Do you come to Randleman?",
        a: "I meet with clients in Randleman. Consultations are free and available in person or by phone.",
      },
      {
        q: "What about Asheboro?",
        a: "That’s past an honest half-hour. We can talk on the phone. I won’t pretend it’s the same drive.",
      },
      {
        q: "Fee?",
        a: "Policy reviews are free, with no obligation to purchase or enroll.",
      },
    ],
    retirementIntro:
      "Randleman is Randolph County for Medicare and the south edge of in-person meetings. I explain 401(k) options and Medicare timing. I am not a registered adviser. I will not claim Asheboro as a local market.",
    retirementDetail:
      "The Advantage list is Randolph. Pleasant Garden’s is Guilford. A conversion hits IRMAA the same in both. Confirm the county, then look at the withdrawal.",
    retirementFaq: [
      {
        q: "Retirement advisor in Randleman?",
        a: "I am a licensed insurance agent, not a registered investment adviser. I provide education about 401(k) options and Medicare timing in Randleman, but not individualized investment advice.",
      },
      {
        q: "Will you meet here?",
        a: "I meet with clients in Randleman. Consultations are free and available in person or by phone.",
      },
      {
        q: "We were looking at Asheboro pages.",
        a: "Asheboro is outside this radius. Randleman is the town I will drive to on that road.",
      },
    ],
  },
];

export function getTriadCity(slug: string): TriadCity | undefined {
  return TRIAD_CITIES.find((city) => city.slug === slug);
}

export function featuredPlaces(): TriadCity[] {
  return TRIAD_CITIES.filter((city) => city.featured);
}

export function townPlaces(): TriadCity[] {
  return TRIAD_CITIES.filter((city) => !city.featured);
}

/**
 * Towns people actually search (between the three hubs and the highway
 * edges). Pages for these already exist; this list is only so the homepage
 * and city templates can surface facts already on the record — county line,
 * drive time, hospitals — instead of repeating the same county lecture.
 */
export const HIGH_INTENT_SLUGS = [
  "kernersville",
  "summerfield",
  "jamestown",
  "burlington",
  "stokesdale",
] as const;

export function highIntentPlaces(): TriadCity[] {
  return HIGH_INTENT_SLUGS.map((slug) => getTriadCity(slug)).filter((city): city is TriadCity =>
    Boolean(city),
  );
}

/**
 * One sentence per town, built from facts already on the record — drive time,
 * county, hospitals, named neighbors — so thinner city pages do not all share
 * the same county lecture with the name swapped.
 */
export function placeCheckBeat(city: TriadCity): string {
  const hospitals =
    city.hospitals.length === 1
      ? city.hospitals[0]
      : `${city.hospitals.slice(0, -1).join(", ")} and ${city.hospitals[city.hospitals.length - 1]}`;
  const drive =
    city.minutesFromDowntown === 0
      ? `${city.name} is where I live`
      : `${city.name} is about ${city.minutesFromDowntown} minutes from downtown Greensboro`;
  const contrasts = nearbyCountyContrasts(city);
  const nextDoor =
    contrasts.length > 0
      ? ` Next door, ${contrasts.map((place) => `${place.name} (${place.county})`).join(" and ")} shops from a different Advantage list.`
      : ` Nearby ${city.nearby[0]} is still a local service area; people search the town name, not the county.`;
  return `${drive}. What I actually check is whether a plan sold for ${city.county} includes the places people here use — ${hospitals}.${nextDoor}`;
}

export function lifePlaceBeat(city: TriadCity): string {
  const drive =
    city.minutesFromDowntown === 0
      ? "This is where I live, so the drive is not the story"
      : `I will sit down in ${city.name} — about ${city.minutesFromDowntown} minutes from downtown Greensboro`;
  const neighbors = city.nearby.slice(0, 2).join(" and ");
  const hospitals =
    city.hospitals.length === 1
      ? city.hospitals[0]
      : `${city.hospitals[0]} (and often ${city.hospitals[1]})`;
  return `${drive}. ${city.county} decides the Medicare Advantage list. It does not decide life insurance. Households here still tend to use ${hospitals}, the same as neighbors searching ${neighbors}. Bring the policy and the beneficiary page.`;
}

export function retirementPlaceBeat(city: TriadCity): string {
  const drive =
    city.minutesFromDowntown === 0
      ? "Greensboro households ask this at my table"
      : `${city.name} is about ${city.minutesFromDowntown} minutes from downtown Greensboro`;
  return `${drive}. A 401(k) rollover is the same paperwork on either side of a county line. Medicare Advantage in ${city.name} is the ${city.county} list. Sit down with both at once — especially if care still happens at ${city.hospitals[0]}.`;
}

export function nearbyCountyContrasts(
  city: TriadCity,
): Array<{ name: string; slug: string; county: string }> {
  const contrasts: Array<{ name: string; slug: string; county: string }> = [];
  for (const name of city.nearby) {
    const other = TRIAD_CITIES.find((place) => place.name === name);
    if (!other) continue;
    if (other.county === city.county) continue;
    contrasts.push({ name: other.name, slug: other.slug, county: other.county });
  }
  return contrasts;
}

export function isHighIntentPlace(slug: string): boolean {
  return (HIGH_INTENT_SLUGS as readonly string[]).includes(slug);
}

export function placeNames(): string[] {
  return TRIAD_CITIES.map((city) => city.name);
}

export function relatedPlaces(city: TriadCity, limit = 8): TriadCity[] {
  const nearbyLower = new Set(city.nearby.map((name) => name.toLowerCase()));
  return TRIAD_CITIES.filter((other) => other.slug !== city.slug)
    .map((other) => {
      let score = 0;
      if (nearbyLower.has(other.name.toLowerCase())) score += 4;
      if (other.county === city.county) score += 1;
      if (other.featured) score += 1;
      return { other, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.other.minutesFromDowntown - b.other.minutesFromDowntown)
    .slice(0, limit)
    .map((row) => row.other);
}

export function placesByCounty(): Array<{ county: string; places: TriadCity[] }> {
  const map = new Map<string, TriadCity[]>();
  for (const city of TRIAD_CITIES) {
    const key = city.county.includes(" and ") ? city.county : city.county;
    const list = map.get(key) ?? [];
    list.push(city);
    map.set(key, list);
  }
  return [...map.entries()].map(([county, places]) => ({ county, places }));
}
