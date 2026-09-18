/**
 * The in-person service area: anywhere about 30 minutes from downtown
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

export const SERVICE_AREA_LABEL = "Serving the Piedmont Triad and nearby communities";

export const SERVICE_AREA_LEDE =
  "I offer personal Medicare and insurance help in Greensboro, High Point, Winston-Salem, and nearby communities. We can meet at your home or talk by phone.";

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
      "Getting ready for Medicare in Greensboro? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "If you receive care through Cone Health or an independent practice in Greensboro, we can check your doctors and preferred hospital against the plans you’re considering. Bring a list of your prescriptions and pharmacy, too.",
    nearby: ["Summerfield", "Oak Ridge", "Jamestown", "Pleasant Garden", "McLeansville", "Colfax"],
    faq: [
      {
        // City-scoped identity question. medicareCityFaqs() must not add a
        // second "Medicare agent in Greensboro" FAQ on top of this one.
        q: "Are you a Medicare insurance agent in Greensboro?",
        a: "Yes. I’m Christian Brinkley, a licensed insurance agent in Greensboro. I help people in Guilford County with Medicare questions — whether you’re turning 65 or already enrolled — and we can check the options available at your home address. We can meet at your home, at a convenient public place, or by phone. There is no cost, and no obligation to enroll.",
      },
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Greensboro?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Greensboro, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Greensboro understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
      },
    ],
  },
  {
    slug: "high-point",
    name: "High Point",
    county: "Guilford County",
    countyNote:
      "If your home is near a county boundary, we’ll confirm your county before comparing Medicare Advantage plans. The county where you receive medical care may be different from the county where you live.",
    minutesFromDowntown: 22,
    featured: true,
    population: "about 115,000",
    hospitals: [
      "Atrium Health Wake Forest Baptist High Point Medical Center",
      "Cone Health facilities in the northern part of the city",
    ],
    intro:
      "Getting ready for Medicare in High Point? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "You may live in High Point and see doctors in more than one part of the Triad. We’ll check each practice and your preferred hospital, along with the plans available where you live.",
    nearby: ["Jamestown", "Archdale", "Thomasville", "Colfax", "Greensboro"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in High Point?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in High Point, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in High Point understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
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
      "Getting ready for Medicare in Winston-Salem? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "If your doctors are with Atrium Health Wake Forest Baptist, Novant Health, or both, we’ll check each one. Being able to continue with the people who know your health history may be an important part of your decision.",
    nearby: ["Kernersville", "Colfax", "Walkertown", "Greensboro"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Winston-Salem?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Winston-Salem, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Winston-Salem understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
      },
    ],
  },
  {
    slug: "kernersville",
    name: "Kernersville",
    county: "Forsyth County",
    countyNote:
      "If your home is near a county boundary, we’ll confirm your county before comparing Medicare Advantage plans. The county where you receive medical care may be different from the county where you live.",
    minutesFromDowntown: 28,
    featured: false,
    population: "about 27,000",
    hospitals: ["Novant Health Kernersville Medical Center", "Cone Health to the east"],
    intro:
      "Getting ready for Medicare in Kernersville? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "Kernersville is close to both Greensboro and Winston-Salem. If you travel between them for care, we can review your doctors and hospitals together and check the coverage available at your home address.",
    nearby: ["Colfax", "Oak Ridge", "Winston-Salem", "Greensboro"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Kernersville?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Kernersville, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Kernersville understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
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
      "Getting ready for Medicare in Summerfield? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "If you travel from Summerfield to Greensboro for appointments, we can include those doctors and hospitals in your coverage review. Your prescriptions, pharmacy, and expected costs are part of the conversation as well.",
    nearby: ["Oak Ridge", "Stokesdale", "Browns Summit", "Greensboro"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Summerfield?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Summerfield, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Summerfield understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
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
      "Getting ready for Medicare in Jamestown? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "If you see doctors in both Greensboro and High Point, we can check all of them when reviewing your options. Bring your current insurance information so we can compare it with what you may need in retirement.",
    nearby: ["High Point", "Greensboro", "Pleasant Garden", "Archdale"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Jamestown?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Jamestown, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Jamestown understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
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
      "Getting ready for Medicare in Oak Ridge? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "Whether your doctors are in Oak Ridge or elsewhere in the Triad, we can check the practices you want to keep. We’ll also talk about your prescriptions and what you’re comfortable spending on coverage and care.",
    nearby: ["Summerfield", "Stokesdale", "Colfax", "Kernersville", "Greensboro"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Oak Ridge?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Oak Ridge, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Oak Ridge understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
      },
    ],
  },
  {
    slug: "archdale",
    name: "Archdale",
    county: "Randolph County",
    countyNote:
      "If your home is near a county boundary, we’ll confirm your county before comparing Medicare Advantage plans. The county where you receive medical care may be different from the county where you live.",
    minutesFromDowntown: 25,
    featured: false,
    population: "about 12,000",
    hospitals: ["Atrium Health Wake Forest Baptist High Point Medical Center"],
    intro:
      "Getting ready for Medicare in Archdale? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "If you live in Archdale and receive care in High Point, we can check those doctors and hospitals while reviewing the plans available at your home address.",
    nearby: ["High Point", "Thomasville", "Jamestown", "Randleman"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Archdale?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Archdale, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Archdale understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
      },
    ],
  },
  {
    slug: "thomasville",
    name: "Thomasville",
    county: "Davidson County",
    countyNote:
      "If your home is near a county boundary, we’ll confirm your county before comparing Medicare Advantage plans. The county where you receive medical care may be different from the county where you live.",
    minutesFromDowntown: 30,
    featured: false,
    population: "about 27,000",
    hospitals: ["Atrium Health Wake Forest Baptist High Point Medical Center"],
    intro:
      "Getting ready for Medicare in Thomasville? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "Your coverage review can include doctors in Thomasville and any specialists you see elsewhere. We’ll check the specific practices you use, along with your prescriptions and pharmacy.",
    nearby: ["Archdale", "High Point", "Randleman"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Thomasville?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Thomasville, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Thomasville understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
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
      "Getting ready for Medicare in Pleasant Garden? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "If you see doctors in Greensboro, we can include them in your review from the comfort of your home in Pleasant Garden. We’ll take time to discuss your current coverage and any changes coming with retirement.",
    nearby: ["Greensboro", "Jamestown", "Randleman", "McLeansville"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Pleasant Garden?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Pleasant Garden, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Pleasant Garden understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
      },
    ],
  },
  {
    slug: "whitsett",
    name: "Whitsett",
    county: "Guilford County",
    countyNote:
      "If your home is near a county boundary, we’ll confirm your county before comparing Medicare Advantage plans. The county where you receive medical care may be different from the county where you live.",
    minutesFromDowntown: 20,
    featured: false,
    population: "about 600",
    hospitals: ["Cone Health in Greensboro", "Cone Health Alamance Regional in Burlington"],
    intro:
      "Getting ready for Medicare in Whitsett? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "If you receive care in Greensboro, Burlington, or both, we can review those providers together. We’ll confirm your home address and check the options available to you.",
    nearby: ["Gibsonville", "McLeansville", "Elon", "Burlington", "Greensboro"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Whitsett?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Whitsett, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Whitsett understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
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
      "Getting ready for Medicare in McLeansville? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "You can meet with me in McLeansville to review your doctors, prescriptions, and current coverage. If you’re still working, we can also discuss how your employer coverage fits with Medicare.",
    nearby: ["Browns Summit", "Whitsett", "Greensboro", "Gibsonville"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in McLeansville?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in McLeansville, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in McLeansville understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
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
      "Getting ready for Medicare in Browns Summit? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "If your appointments take you to Greensboro or Reidsville, we can include those providers in your review. The starting point is your home address and the care you want to continue receiving.",
    nearby: ["McLeansville", "Summerfield", "Reidsville", "Greensboro"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Browns Summit?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Browns Summit, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Browns Summit understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
      },
    ],
  },
  {
    slug: "gibsonville",
    name: "Gibsonville",
    county: "Guilford and Alamance Counties",
    countyNote:
      "If your home is near a county boundary, we’ll confirm your county before comparing Medicare Advantage plans. The county where you receive medical care may be different from the county where you live.",
    minutesFromDowntown: 22,
    featured: false,
    population: "about 9,000",
    hospitals: ["Cone Health in Greensboro", "Cone Health Alamance Regional in Burlington"],
    intro:
      "Getting ready for Medicare in Gibsonville? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "Gibsonville includes areas in Guilford and Alamance counties. We’ll confirm your county and review the doctors you see, whether your appointments are in Greensboro, Burlington, or closer to home.",
    nearby: ["Whitsett", "Elon", "Burlington", "McLeansville", "Greensboro"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Gibsonville?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Gibsonville, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Gibsonville understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
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
      "Getting ready for Medicare in Elon? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "If you use Alamance Regional or see specialists elsewhere, we can check each provider when reviewing your options. We’ll also include your prescriptions and preferred pharmacy.",
    nearby: ["Gibsonville", "Burlington", "Whitsett"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Elon?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Elon, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Elon understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
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
      "Getting ready for Medicare in Burlington? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "Your Medicare review can include Alamance Regional and any other doctors or hospitals you use. We’ll look at your expected costs and how your coverage may change when you retire.",
    nearby: ["Elon", "Gibsonville", "Whitsett"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Burlington?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Burlington, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Burlington understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
      },
    ],
  },
  {
    slug: "stokesdale",
    name: "Stokesdale",
    county: "Guilford County",
    countyNote:
      "If your home is near a county boundary, we’ll confirm your county before comparing Medicare Advantage plans. The county where you receive medical care may be different from the county where you live.",
    minutesFromDowntown: 28,
    featured: false,
    population: "about 6,000",
    hospitals: ["Cone Health in Greensboro"],
    intro:
      "Getting ready for Medicare in Stokesdale? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "We can arrange a visit in Stokesdale and review your coverage together. If you live near a county boundary, we’ll confirm your address before comparing Medicare Advantage plans.",
    nearby: ["Oak Ridge", "Summerfield", "Reidsville", "Greensboro"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Stokesdale?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Stokesdale, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Stokesdale understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
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
      "Getting ready for Medicare in Colfax? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "If you receive care in Greensboro, High Point, or Kernersville, we can check all of those providers. Your coverage review will focus on the care you use and the plans available where you live.",
    nearby: ["Kernersville", "Oak Ridge", "Jamestown", "High Point", "Greensboro"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Colfax?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Colfax, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Colfax understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
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
    hospitals: ["Cone Health Annie Penn Hospital in Reidsville"],
    intro:
      "Getting ready for Medicare in Reidsville? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "If you use Annie Penn Hospital or travel to Greensboro for specialist care, we can check those providers together. We’ll review the plans available at your Rockingham County address.",
    nearby: ["Browns Summit", "Stokesdale", "Summerfield"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Reidsville?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Reidsville, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Reidsville understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
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
      "Getting ready for Medicare in Randleman? I can help you understand your choices, review your current coverage, and plan your next steps. If you’re already enrolled, we can discuss whether your coverage still meets your needs.",
    localDetail:
      "If your care includes appointments in Greensboro or Asheboro, we can review those providers together. We’ll check the plans available at your home address and discuss what matters most to you.",
    nearby: ["Pleasant Garden", "Archdale", "Thomasville"],
    faq: [
      {
        q: "Can you help me check whether I can keep my doctors?",
        a: "Yes. We can review your doctors, hospitals, prescriptions, and pharmacy against the Medicare options you’re considering. We’ll confirm the details for the year your coverage will begin.",
      },
      {
        q: "When should I start discussing Medicare?",
        a: "It’s helpful to start several months before you turn 65 or before your employer coverage ends. If you’re already on Medicare, we can discuss your current coverage and when you may be able to make a change.",
      },
      {
        q: "Can we meet at my home in Randleman?",
        a: "Yes. Home visits and phone consultations are available. A spouse or family member is welcome to join you. The consultation is no cost, with no obligation to buy anything.",
      },
    ],
    lifeIntro:
      "As you approach retirement, it’s a good time to review the protection your family has. I offer no-cost life insurance consultations in Randleman, at your home or by phone.",
    lifeDetail:
      "We can look at your current policies, any coverage through work, and the expenses your family would need help with. We’ll review who would receive the benefit, how long the coverage lasts, and what it costs to keep.",
    lifeFaq: [
      {
        q: "Do I still need life insurance after I retire?",
        a: "That depends on your family’s needs, savings, debts, and existing coverage. We can review what your family would need help paying for and whether your current policy still fits.",
      },
      {
        q: "What happens to my life insurance through work?",
        a: "Employer coverage may change or end when you retire. Bring your benefits information so we can review what continues, what options you have, and any deadlines that apply.",
      },
      {
        q: "Is there a charge to review a policy I already have?",
        a: "No. The consultation is no cost, and you don’t have to buy a new policy. We can review the coverage you have and discuss whether it still meets your needs.",
      },
    ],
    retirementIntro:
      "Retirement brings decisions about income, health coverage, and your family’s future. I help people in Randleman understand their Medicare and insurance options, with financial planning support through an advisor I work with.",
    retirementDetail:
      "Whether you’re deciding when to retire or have already stopped working, we can discuss the questions on your mind. Bring any current coverage or benefit statements you’d like to review. We’ll identify which questions I can help with and where an advisor or tax professional should be involved.",
    retirementFaq: [
      {
        q: "What can you help me with as I plan for retirement?",
        a: "I’m a licensed insurance agent. I help with Medicare and insurance questions, including how retirement income may affect Medicare premiums. For financial planning, I work with an advisor so the appropriate professional is involved.",
      },
      {
        q: "Can my spouse or another family member join us?",
        a: "Of course. You’re welcome to include someone you trust. We can discuss your household’s priorities while reviewing each person’s coverage needs.",
      },
      {
        q: "Do I need to have a plan before we meet?",
        a: "No. Start with your questions. If you have current insurance or retirement benefit statements, they can help us understand your situation. We’ll discuss the next steps together.",
      },
    ],
  },
];

export function getTriadCity(slug: string): TriadCity | undefined {
  return TRIAD_CITIES.find((city) => city.slug === slug);
}

const MEDICARE_AGENT_IN_CITY = /are you a .*medicare.*agent in/i;

function keepOneMedicareAgentFaq(
  faqs: Array<{ q: string; a: string }>,
): Array<{ q: string; a: string }> {
  let keptAgentFaq = false;
  return faqs.filter((item) => {
    if (!MEDICARE_AGENT_IN_CITY.test(item.q)) return true;
    if (keptAgentFaq) return false;
    keptAgentFaq = true;
    return true;
  });
}

/**
 * FAQs shown on /medicare-in/[city]. Featured hubs get a city-named agent
 * question unless the city record already answers it (Greensboro does).
 * Never emit two "are you a Medicare agent in {city}" questions.
 */
export function medicareCityFaqs(city: TriadCity): Array<{ q: string; a: string }> {
  const hasOwnAgentFaq = city.faq.some((item) => MEDICARE_AGENT_IN_CITY.test(item.q));
  const faqs =
    !city.featured || hasOwnAgentFaq
      ? [...city.faq]
      : [
          {
            q: `Are you a licensed Medicare agent in ${city.name}?`,
            a: `Yes. I’m a licensed insurance agent, and I help people in ${city.name} with Medicare. We can meet at your home, at a convenient public location, or by phone. The consultation is no cost, with no obligation to enroll.`,
          },
          ...city.faq,
        ];
  return keepOneMedicareAgentFaq(faqs);
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

function joinList(items: readonly string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0]!;
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/**
 * One sentence per town, built from facts already on the record — drive time,
 * county, hospitals, named neighbors — so thinner city pages do not all share
 * the same county lecture with the name swapped.
 */
export function placeCheckBeat(city: TriadCity): string {
  const hospitals = joinList(city.hospitals);
  const drive =
    city.minutesFromDowntown > 0
      ? `, in ${city.county} about ${city.minutesFromDowntown} minutes from downtown Greensboro`
      : "";
  return (
    `We’ll start with the Medicare options available at your home address in ${city.name}${drive}. ` +
    `Then we’ll look at your doctors, including care through ${hospitals}, plus your prescriptions ` +
    `and expected costs so you can compare your choices.`
  );
}

export function lifePlaceBeat(city: TriadCity): string {
  const nearby = joinList(city.nearby.slice(0, 3));
  const nearbySentence = nearby ? ` Nearby communities include ${nearby}.` : "";
  if (city.minutesFromDowntown > 0) {
    return (
      `A visit in ${city.name} is about ${city.minutesFromDowntown} minutes from downtown Greensboro. ` +
      `We can meet at your home or by phone.${nearbySentence} ` +
      `You’re welcome to bring a spouse or family member, and there’s no obligation to change your coverage.`
    );
  }
  return (
    `A visit in ${city.name} can be at your home or by phone.${nearbySentence} ` +
    `You’re welcome to bring a spouse or family member, and there’s no obligation to change your coverage.`
  );
}

export function retirementPlaceBeat(city: TriadCity): string {
  const hospitals = joinList(city.hospitals);
  return (
    `Our conversation in ${city.name} can cover the insurance questions that come with retirement, ` +
    `including Medicare if you receive care through ${hospitals}. ` +
    `You can come back with questions as your needs change.`
  );
}

const LIFE_IN_CITY = /life insurance.*\bin\b/i;
const RETIREMENT_IN_CITY = /retirement.*\bin\b/i;

/**
 * Featured hubs get a city-named life-insurance question. Town pages keep the
 * city-specific answers already on the record without cloning a keyword FAQ.
 */
export function lifeCityFaqs(city: TriadCity): Array<{ q: string; a: string }> {
  const hasOwn = city.lifeFaq.some((item) => LIFE_IN_CITY.test(item.q));
  if (!city.featured || hasOwn) return [...city.lifeFaq];
  return [
    {
      q: `Can you review life insurance in ${city.name}?`,
      a:
        `Yes. I’m a licensed insurance agent, and I offer no-cost life insurance reviews in ${city.name}. ` +
        `We can meet at your home, at a convenient public location, or by phone. You don’t have to buy a new policy.`,
    },
    ...city.lifeFaq,
  ];
}

/** Featured hubs get a city-named retirement question; other towns do not. */
export function retirementCityFaqs(city: TriadCity): Array<{ q: string; a: string }> {
  const hasOwn = city.retirementFaq.some((item) => RETIREMENT_IN_CITY.test(item.q));
  if (!city.featured || hasOwn) return [...city.retirementFaq];
  return [
    {
      q: `Do you help with retirement questions in ${city.name}?`,
      a:
        `Yes. I help people in ${city.name} with Medicare and insurance questions that come with retirement, ` +
        `and I work with an advisor for financial planning. We can meet at your home, at a convenient public location, or by phone.`,
    },
    ...city.retirementFaq,
  ];
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
