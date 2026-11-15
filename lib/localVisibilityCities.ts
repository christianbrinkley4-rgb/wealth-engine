/** Local research checked November 9, 2026. These are service areas, not offices. */
const GHS = { name: "Granville Health System", url: "https://ghshospital.org/our-locations/" };
const DUKE = {
  name: "Duke University Hospital",
  url: "https://www.dukehealth.org/hospitals/duke-university-hospital",
};
const REGIONAL = {
  name: "Duke Regional Hospital",
  url: "https://www.dukehealth.org/hospitals/duke-regional-hospital/about",
};
const UNC = {
  name: "UNC Hospitals, N.C. Memorial Hospital",
  url: "https://www.unchealth.org/care-services/locations/nc-memorial-hospital-unc-hospitals",
};
const CARY = {
  name: "WakeMed Cary Hospital",
  url: "https://www.wakemed.org/location/cary-hospital",
};

type LocalBrief = {
  name: string;
  county: string;
  localHeading: string;
  paragraphs: readonly string[];
  hospitals: readonly { name: string; url: string; note: string }[];
  faq: readonly { q: string; a: string }[];
};

function city(brief: LocalBrief) {
  return {
    ...brief,
    title: `Medicare Agent Serving ${brief.name}, NC | Christian Brinkley`,
    heading: `Medicare help in ${brief.name}, NC`,
    description: `Medicare help in ${brief.name}, NC from licensed agent Christian Brinkley. Review doctors, prescriptions, coverage and enrollment dates. (919) 408-6671`,
    datePublished: "2026-11-09",
    dateModified: "2026-11-09",
    reviewed: "2026-11-09",
    sourcesChecked: "November 9, 2026",
    hospitalsHeading: `Care locations to include in a ${brief.name} review`,
    hospitalTakeaway:
      "These locations help you prepare a doctor list. They don't confirm that a plan covers a hospital or clinician. Check the exact plan, office, service, and year with the insurer and provider. Original Medicare and Medicare Advantage have different rules for choosing providers.",
    hospitalNote:
      "I'm not affiliated with or endorsed by these health systems. These links are local references, not network recommendations.",
    sources: [
      ...brief.hospitals.map((h) => ({ label: h.name, href: h.url })),
      {
        label: "Medicare.gov: preparing to join a plan",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan",
      },
      {
        label: "NC DOI: independent SHIIP counseling",
        href: "https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip",
      },
    ],
    provider: brief.hospitals[0].name,
    ctaHeading: `Talk through your ${brief.name} Medicare questions`,
    ctaLine:
      "I'm based in Greensboro and grew up in Creedmoor. Start by phone or ask about an agreed meeting. No cost for the conversation and no obligation to enroll. (919) 408-6671",
  };
}

export const LOCAL_VISIBILITY_CITIES = {
  reidsville: city({
    name: "Reidsville",
    county: "Rockingham County",
    localHeading: "Check Annie Penn and any Greensboro appointments separately",
    paragraphs: [
      "Annie Penn Hospital is part of Cone Health in Reidsville. If you receive care there and also see a Greensboro specialist, list both locations. The insurer and each office should confirm participation for the exact plan and year before you make a coverage decision.",
      "A Guilford County comparison doesn't automatically apply to your Rockingham County home. Begin with your residential address, then review the doctors, prescriptions, and pharmacy you use. A low monthly premium alone doesn't show what a year's care could cost.",
      "I'm Christian Brinkley, a licensed NC insurance agent based in Greensboro. Start by phone with your current plan card and questions. If employer coverage is ending or you recently moved, bring the relevant notices and dates so enrollment choices can be checked.",
    ],
    hospitals: [
      {
        name: "Cone Health: Annie Penn Hospital",
        url: "https://careers.conehealth.com/us/en/locations",
        note: "Cone Health's official location overview includes Annie Penn. This reference doesn't establish plan participation.",
      },
    ],
    faq: [
      {
        q: "Is Annie Penn automatically included in every Reidsville Medicare Advantage plan?",
        a: "No. Check the hospital and each clinician with the insurer and provider for your exact plan and year before choosing coverage.",
      },
      {
        q: "Can I use a Greensboro relative's plan comparison in Reidsville?",
        a: "Use your own home address and county first. Your provider list and prescriptions can differ too, even within the same family.",
      },
    ],
  }),
  thomasville: city({
    name: "Thomasville",
    county: "Davidson County area",
    localHeading: "Thomasville Medical Center and High Point care need their own checks",
    paragraphs: [
      "Novant Health Thomasville Medical Center is a local hospital reference for a Thomasville review. Put the exact doctor and office on your list as well. If you also receive care in High Point or Winston-Salem, include those locations instead of assuming one hospital network covers everything.",
      "Ask the insurer about your exact Medicare Advantage plan, the year, and whether planned visits require referrals or authorization. A hospital's location page confirms where care is offered. It doesn't confirm your insurance coverage.",
      "A review can start by phone with your home address, current coverage, prescriptions, and preferred pharmacy. If you're approaching retirement, include employer benefit details before canceling anything. I help with insurance and education; personal investment advice needs the appropriate professional.",
    ],
    hospitals: [
      {
        name: "Novant Health Thomasville Medical Center",
        url: "https://www.novanthealth.org/locations/medical-centers/thomasville-medical-center/",
        note: "Official hospital information. Check your specific clinician and planned service separately.",
      },
    ],
    faq: [
      {
        q: "Should I list my High Point specialist in a Thomasville review?",
        a: "Yes. Include every office you use, even if it's outside Thomasville or in a different health system, before comparing your coverage options.",
      },
      {
        q: "Does Novant's Thomasville location page confirm my plan is accepted?",
        a: "No. Ask Novant and the insurer about the exact plan, clinician, location, and year before making a decision about your coverage.",
      },
    ],
  }),
  lexington: city({
    name: "Lexington",
    county: "Davidson County",
    localHeading: "Separate Lexington hospital care from outpatient and specialist visits",
    paragraphs: [
      "Atrium Health Wake Forest Baptist lists Lexington Medical Center and several Lexington outpatient services, including imaging and rehabilitation. For a coverage review, identify which location and service you use. An outpatient visit can need a different check from a hospital admission.",
      "If your care includes a Winston-Salem specialist, add that office too. Confirm network participation, referral rules, and costs for the exact Medicare Advantage plan you're considering. Original Medicare has different provider-choice rules, so compare both coverage paths carefully.",
      "I offer phone conversations for Lexington residents, with meetings arranged individually. Bring your home address, current plan card, prescriptions and pharmacy, and any employer coverage notice. You can ask questions without committing to a change.",
    ],
    hospitals: [
      {
        name: "Atrium Health Wake Forest Baptist Lexington Medical Center",
        url: "https://www.wakehealth.edu/locations/hospitals/lexington-medical-center",
        note: "The official page lists the hospital and local outpatient services. Check your actual appointment location.",
      },
    ],
    faq: [
      {
        q: "Does a plan covering Lexington Medical Center also cover my Winston-Salem specialist?",
        a: "Don't assume so. Verify the specialist and office separately with the provider and insurer for your exact Medicare Advantage plan and year.",
      },
      {
        q: "Can I start a Lexington review by phone?",
        a: "Yes. Have your current plan information, doctor list, and prescriptions ready for the conversation. There's no cost or obligation to enroll.",
      },
    ],
  }),
  creedmoor: city({
    name: "Creedmoor",
    county: "Granville County",
    localHeading: "Creedmoor is home. Your review starts with where you get care.",
    paragraphs: [
      "I'm Christian Brinkley, a licensed NC insurance agent. I grew up in Creedmoor and I'm now based in Greensboro. You can start with a phone conversation about turning 65, retiring, or reviewing your existing Medicare coverage. An in-person meeting is arranged with you, rather than assumed.",
      "Granville Primary Care, Butner-Creedmoor and Granville Express Care are listed at 1614 NC-56 in Creedmoor. Granville Medical Center is in Oxford. If you use one of those locations and also see a Duke specialist in Durham, write down each office. A review should include that full list, not just a hospital system's name.",
      "Keep your Granville County home address separate from the addresses where you receive care. A specialist in Durham doesn't make a Durham resident's Medicare Advantage comparison the right one for you. Bring your current plan card, medication list, pharmacy, and any employer coverage notices before making a change.",
    ],
    hospitals: [
      {
        ...GHS,
        note: "The location directory lists primary and express care in Creedmoor and Granville Medical Center in Oxford.",
      },
      {
        ...REGIONAL,
        note: "Include a Durham appointment if this hospital or one of its offices is part of your care.",
      },
    ],
    faq: [
      {
        q: "Are you based in Creedmoor?",
        a: "I grew up in Creedmoor and I'm based in Greensboro. I serve Creedmoor by phone and discuss in-person meetings when arranging an appointment.",
      },
      {
        q: "Should a Creedmoor review include my Durham specialist?",
        a: "Yes. Bring the specialist's name and exact office address, along with local doctors. Each location needs a plan-specific check before choosing coverage.",
      },
    ],
  }),
  oxford: city({
    name: "Oxford",
    county: "Granville County",
    localHeading: "An Oxford review should include the hospital and the separate practices you use",
    paragraphs: [
      "Granville Medical Center is at 1010 College Street in Oxford. The health system also lists primary care, heart and vascular care, surgery, and rehabilitation at separate Oxford locations. Put the offices you actually visit on your list. An appointment with one practice doesn't establish coverage at every related facility.",
      "If Oxford is where you receive routine care and Durham is where you see a specialist, compare both parts of that arrangement. Ask about the exact clinician, outpatient location, referral requirements, and your share of the cost. A hospital directory is a starting point, not proof of a Medicare Advantage network.",
      "I'm Christian Brinkley, raised in nearby Creedmoor and based in Greensboro. We can begin by phone with your current coverage, prescriptions, preferred pharmacy, and enrollment dates. For independent Medicare counseling, use the NC SHIIP directory or call 1-855-408-1212.",
    ],
    hospitals: [
      {
        ...GHS,
        note: "Find the Oxford hospital and each outpatient practice separately in the official directory.",
      },
      { ...DUKE, note: "Add any Duke appointments in Durham to your Oxford review." },
    ],
    faq: [
      {
        q: "Does covering Granville Medical Center mean a plan covers every Oxford practice?",
        a: "No. Verify each doctor and facility for your exact plan and year. Hospital participation doesn't settle an individual practice's participation.",
      },
      {
        q: "What should I bring if I receive outpatient care in Oxford?",
        a: "Bring the office name, clinician, location, and current plan card. Ask the provider and insurer about any separate professional and facility charges.",
      },
    ],
  }),
  stem: city({
    name: "Stem",
    county: "Granville County",
    localHeading: "Start with your Stem address, then list care in Oxford and Durham",
    paragraphs: [
      "A Stem Medicare conversation can start over the phone. You don't need to travel to Greensboro for an initial review. I'm Christian Brinkley, a licensed NC insurance agent who grew up in Creedmoor. Bring your questions about enrollment, existing coverage, or employer insurance ending.",
      "Granville Health System lists hospital and outpatient locations in Oxford and primary care in the Butner-Creedmoor area. If those locations are part of your care, write down which ones. Add any Durham specialists as separate entries rather than assuming a county or health-system name settles coverage.",
      "Before comparing Medicare Advantage plans, confirm the residential address used for availability. Then check medications and the pharmacy you can use conveniently. For recurring appointments outside Stem, ask about the exact office and any referral requirements before choosing coverage.",
    ],
    hospitals: [
      {
        ...GHS,
        note: "Use the directory to identify the Oxford or Butner-Creedmoor location you actually visit.",
      },
    ],
    faq: [
      {
        q: "Can I review Medicare from Stem without driving to Greensboro?",
        a: "Yes. Start by phone with your current coverage and questions. Any in-person meeting is confirmed with you when the appointment is arranged.",
      },
      {
        q: "Does a doctor in Oxford determine which plans I can buy in Stem?",
        a: "Availability starts with your home address. The doctor still needs a separate check against the specific plan and year before you enroll.",
      },
    ],
  }),
  durham: city({
    name: "Durham",
    county: "Durham area",
    localHeading: "Duke University Hospital and Duke Regional need separate checks",
    paragraphs: [
      "Duke University Hospital is on Erwin Road in Durham. Duke Regional Hospital is a separate Durham location, with services that include Duke Cancer Center North Durham. Write down the hospital, specialist, and office for every appointment. The word Duke alone isn't a network check.",
      "For north Durham, include any care you receive at Duke Regional alongside appointments elsewhere in the Triangle. If you live closer to the Granville County line, start with your actual residential county. Where your doctor works doesn't determine your Medicare Advantage service area.",
      "Research Triangle Park is a business district, not a separate Medicare plan market. If you're leaving an employer in RTP, bring your coverage end date and ask the benefits administrator how Medicare coordinates with your plan before you cancel it. A home address and employer address can serve very different purposes in this review.",
    ],
    hospitals: [
      {
        ...DUKE,
        note: "The Erwin Road hospital in Durham. List your clinician and office as well.",
      },
      {
        ...REGIONAL,
        note: "A separate hospital location to check, including any north Durham appointments.",
      },
    ],
    faq: [
      {
        q: "Does a Medicare plan covering Duke University Hospital also cover Duke Regional?",
        a: "Don't assume so. Confirm both hospitals and each clinician for the exact plan, location, and year before making a decision about coverage.",
      },
      {
        q: "I work in RTP. Should I compare plans using my work ZIP code?",
        a: "Use your residential address for plan availability. Bring your employer coverage details separately to review enrollment timing before you cancel or change coverage.",
      },
      {
        q: "Can you help someone in north Durham?",
        a: "Yes. I offer phone conversations for north Durham residents and discuss meeting arrangements individually. I'm based in Greensboro and don't have a Durham storefront.",
      },
    ],
  }),
  "chapel-hill": city({
    name: "Chapel Hill",
    county: "Chapel Hill area",
    localHeading: "List the UNC clinic as well as the Chapel Hill hospital",
    paragraphs: [
      "UNC's N.C. Memorial Hospital is at 101 Manning Drive in Chapel Hill. UNC Health explains that hospital-based clinics may have facility charges in addition to other charges. When you compare coverage, identify the clinic and ask how that visit is billed, rather than relying only on the hospital's name.",
      "If you also use Duke care in Durham, include those appointments in the same review. Check each office for the exact Medicare Advantage plan and year. Original Medicare has different provider-choice rules, so compare how each coverage path handles the places you use.",
      "If you're retiring from a university or another employer, ask the benefits office about your own coverage and any spouse's benefits before dropping them. Bring that information, your residential address, prescriptions, and preferred pharmacy to the conversation. I can help with insurance questions; individualized tax and investment advice belongs with the appropriate professional.",
    ],
    hospitals: [
      {
        ...UNC,
        note: "Official Chapel Hill location information, including the notice about hospital-based clinic charges.",
      },
      { ...DUKE, note: "Include Durham care if it's part of your existing appointments." },
    ],
    faq: [
      {
        q: "Why does the exact UNC clinic matter when I review Medicare?",
        a: "Network participation and billing depend on the clinician and location. Ask whether a visit includes a separate facility charge and how your plan handles it.",
      },
      {
        q: "Should I cancel retiree coverage before a Chapel Hill Medicare review?",
        a: "Talk with the benefits administrator first. Bring the current benefits and coverage end dates so you can understand how Medicare fits before making changes.",
      },
    ],
  }),
  cary: city({
    name: "Cary",
    county: "Cary area",
    localHeading: "A Cary hospital and a Raleigh specialist belong on one list",
    paragraphs: [
      "WakeMed Cary Hospital is one place to include if you receive care in Cary. If your primary care is nearby but your specialist is in Raleigh or Chapel Hill, list each location. A plan review should follow your actual appointments rather than stop at the town boundary.",
      "Confirm your residential county before using a comparison prepared for a neighbor or family member. Then ask the insurer and each office about the exact plan and year. A familiar health-system name doesn't establish participation for every doctor within it.",
      "If you're approaching 65 while working, bring the employer plan's coverage details and expected end date. If you're already on Medicare, bring the Annual Notice of Change and a medication list with doses. A review can compare the coverage paths and their limits without assuming you need to switch.",
    ],
    hospitals: [
      {
        ...CARY,
        note: "List Cary Hospital if you use it, along with your specific outpatient practices.",
      },
      { ...UNC, note: "Add Chapel Hill visits separately if they're part of your care." },
    ],
    faq: [
      {
        q: "Can a Cary Medicare review include my Chapel Hill specialist?",
        a: "Yes. Include every office you use, even outside Cary, so each can be checked for the exact plan and year.",
      },
      {
        q: "Do I have to change plans during a review?",
        a: "No. A conversation can help you understand existing coverage and the questions to ask. There's no obligation to enroll or change plans.",
      },
    ],
  }),
  apex: city({
    name: "Apex",
    county: "Apex area",
    localHeading: "Apex Healthplex and Cary Hospital aren't interchangeable names",
    paragraphs: [
      "WakeMed Apex Healthplex is at 120 Healthplex Way and is operated by WakeMed Cary Hospital. Its official page describes emergency and imaging services. If you use outpatient care there, record the exact service and clinician rather than writing only Cary Hospital on your list.",
      "Your routine care, specialist visits, and emergency care can involve different locations and coverage rules. For a planned visit, confirm participation and costs with the insurer and provider. A local emergency department's location doesn't establish the network for a scheduled outpatient appointment.",
      "A phone review can cover the addresses where you get care, your home county, prescriptions, and the pharmacy you prefer. If retirement means an employer plan is ending, bring the benefits notice before discussing when to enroll. I'm based in Greensboro; an Apex meeting is arranged individually.",
    ],
    hospitals: [
      {
        name: "WakeMed Apex Healthplex",
        url: "https://www.wakemed.org/location/apex-healthplex",
        note: "Apex emergency and outpatient location operated by Cary Hospital. Check the specific service.",
      },
      { ...CARY, note: "Check hospital care separately from the Apex outpatient location." },
    ],
    faq: [
      {
        q: "Is Apex Healthplex operated by Cary Hospital?",
        a: "Yes, according to WakeMed. Still identify the Apex location, clinician, and service when asking your plan about coverage for a scheduled visit.",
      },
      {
        q: "Does a nearby emergency department prove my planned visit is in network?",
        a: "No. Emergency and scheduled care have different rules. Ask the provider and insurer about the exact planned service, location, and plan year.",
      },
    ],
  }),
  morrisville: city({
    name: "Morrisville",
    county: "Morrisville area",
    localHeading: "Compare the Cary, Durham, and Chapel Hill care you actually use",
    paragraphs: [
      "A Morrisville review can include appointments at WakeMed Cary Hospital, Duke in Durham, or UNC Hospitals in Chapel Hill. Those are separate care locations. Start with your existing doctors and planned appointments, then check them against the exact coverage you're considering.",
      "If your job is in Research Triangle Park, keep the employer's address separate from your home address. Plan availability starts with where you live. Employer insurance has its own coordination and enrollment questions, so ask the benefits office before ending coverage or assuming you can delay Medicare.",
      "For family members helping with the review, a single list makes the conversation easier: doctors and offices, prescriptions and doses, pharmacy, current coverage, and any coverage end dates. I'm a licensed insurance agent offering phone conversations. I don't have a Morrisville office or offer investment management.",
    ],
    hospitals: [
      { ...CARY, note: "Include this location if it's on your care list." },
      { ...DUKE, note: "Durham specialist or hospital care needs its own plan check." },
      { ...UNC, note: "Check Chapel Hill appointments separately." },
    ],
    faq: [
      {
        q: "Does working in RTP mean I use a Durham Medicare plan list?",
        a: "No. Compare availability using your home address. Review employer coverage and enrollment dates separately with the benefits administrator before canceling your existing coverage.",
      },
      {
        q: "Can a family member join my Morrisville phone review?",
        a: "Yes. You can include a spouse or family member and prepare the doctor and prescription lists together before we discuss your coverage questions.",
      },
    ],
  }),
  garner: city({
    name: "Garner",
    county: "Garner area",
    localHeading: "Start with the Garner Healthplex services you use",
    paragraphs: [
      "WakeMed Garner Healthplex is at 400 U.S. Highway 70 East. Its official directory lists emergency care, imaging, laboratory services, and doctor's offices. For a Medicare review, note whether your appointment is with a practice, an imaging service, or another facility service.",
      "WakeMed describes this location as serving southeastern Wake and Johnston County communities. That service area doesn't tell you the county of your own address or establish your plan's network. Confirm both before borrowing a plan comparison prepared for someone nearby.",
      "If you receive care in Raleigh as well as Garner, include those appointments. Bring prescriptions and your preferred pharmacy too. I can review insurance options by phone and discuss an in-person meeting by arrangement, with no obligation to enroll.",
    ],
    hospitals: [
      {
        name: "WakeMed Garner Healthplex",
        url: "https://www.wakemed.org/location/garner-healthplex",
        note: "Official directory of Garner emergency, imaging, laboratory, and practice locations.",
      },
    ],
    faq: [
      {
        q: "Does Garner Healthplex's service area determine my Medicare plan list?",
        a: "No. Use your residential address for availability, then check the Healthplex service and clinician against your specific plan before scheduling planned care.",
      },
      {
        q: "What should I list for a Garner imaging appointment?",
        a: "Bring the imaging location and service, referring clinician, and exact plan name. Ask the insurer about network rules, authorization, and costs.",
      },
    ],
  }),
  clayton: city({
    name: "Clayton",
    county: "Clayton area",
    localHeading: "Keep your home address and your Garner or Raleigh care separate",
    paragraphs: [
      "If you live in Clayton and use WakeMed Garner Healthplex, put that Garner location on your provider list. WakeMed identifies the Healthplex as serving southeastern Wake and Johnston County communities. Its presence nearby doesn't confirm coverage for a Clayton resident's plan.",
      "List your Clayton primary care practice and any Garner or Raleigh appointments separately. For planned care, ask about the exact doctor, facility, and year. Don't choose a plan only because a relative across a county boundary uses it.",
      "A medication review should include doses and the pharmacy you plan to use, alongside provider checks. If you've moved to Clayton, bring your move date and current plan information so enrollment options can be checked. A move doesn't mean you should drop coverage before understanding the next steps.",
    ],
    hospitals: [
      {
        name: "WakeMed Garner Healthplex",
        url: "https://www.wakemed.org/location/garner-healthplex",
        note: "A nearby care reference if you use Garner services. This is not a claim that it's in your plan's network.",
      },
    ],
    faq: [
      {
        q: "Can I keep using a Garner doctor after moving to Clayton?",
        a: "It depends on your coverage, service area, and the doctor's participation. Review your home address, move date, and exact plan before making a change.",
      },
      {
        q: "Should a Clayton comparison use a Raleigh relative's plan list?",
        a: "Start with your own residential address and county. Then compare the doctors, drugs, and pharmacy you actually use before deciding whether coverage fits.",
      },
    ],
  }),
  stovall: city({
    name: "Stovall",
    county: "Granville County",
    localHeading: "Prepare for Oxford care and appointments farther from home",
    paragraphs: [
      "For a Stovall review, include Granville Medical Center in Oxford if you receive care there. The health system's directory also lists separate Oxford outpatient practices. Write down your own locations rather than treating the whole system as a single doctor entry.",
      "If you travel beyond Granville County for a specialist, include that office, too. Compare the home address used for availability with each place you receive care. Recurring appointments deserve attention alongside monthly premiums and prescription costs.",
      "You can start by phone from Stovall. I'm Christian Brinkley, raised in Creedmoor and based in Greensboro. Bring your current plan, medication list, pharmacy, and any employer coverage notices. Independent SHIIP counseling is also available through the NC DOI county counselor directory.",
    ],
    hospitals: [
      {
        ...GHS,
        note: "The official directory identifies the Oxford hospital and separate outpatient practices.",
      },
    ],
    faq: [
      {
        q: "Can you help someone in Stovall by phone?",
        a: "Yes. A phone conversation can cover your current insurance, enrollment questions, doctors, and prescriptions. Any in-person meeting is arranged individually.",
      },
      {
        q: "Should a Stovall review include care outside Granville County?",
        a: "Yes. List every regular appointment, including care outside Granville County, so the exact office and plan can be checked before making a coverage decision.",
      },
    ],
  }),
} as const;
