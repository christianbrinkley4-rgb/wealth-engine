import { SHIIP_CONTACT_URL } from "@/lib/planChecklist";

export type LocalFact = { name: string; body: string; sourceUrl: string; checkedOn: string; kind: "county" | "counseling" | "care" | "public_resource" };
export type LocalMedicareTown = { name: string; path: string; intro: string; facts: LocalFact[] };
const checkedOn = "2026-10-09";
function fact(kind: LocalFact["kind"], name: string, body: string, sourceUrl: string): LocalFact { return { kind, name, body, sourceUrl, checkedOn }; }
const guilford = "https://www.guilfordcountync.gov/government/departments-and-agencies/planning-and-development/jurisdictions-within-guilford-county";
const sr = "https://www.senior-resources-guilford.org/programs";
const shepherd = "https://www.shepherdscenter.org/shiip-medicare-counseling";
const cone = "https://careers.conehealth.com/us/en/locations";
const hp = "https://www.wakehealth.edu/locations/hospitals/high-point-medical-center";
const wake = "https://www.wakehealth.edu/patient-and-family-resources/right-place-for-you";
const kernersville = "https://www.novanthealth.org/locations/medical-centers/kernersville-medical-center/about/";
const eldercare = "https://alamanceeldercare.com/resources/";
const libraries = "https://library.alamancecountync.gov/";
const randolphLibraries = "https://www.randolphlibrary.org/Locations.html";
const randolphCare = "https://www.randolphhealth.org/patients-and-visitors/patient-portal/";
const randolph = "https://www.randolphcountync.gov/196/Emergency-Medical-Services-EMS";

/** Public resources, not Christian's offices, meeting sites or affiliations. */
export const LOCAL_MEDICARE_TOWNS: Record<string, LocalMedicareTown> = {
  greensboro: {
    name: "Greensboro", path: "/medicare-in/greensboro",
    intro: "Start with your Greensboro address, the practices you visit, and the questions on your mind. These public resources can help you prepare before we talk about Medicare.",
    facts: [
      fact("county", "Greensboro and Guilford County", "Guilford County lists Greensboro among its local jurisdictions. Use the county for your home address when researching Medicare Advantage options. A doctor's Greensboro office address is a different piece of information; keep both on your research sheet.", guilford),
      fact("counseling", "Senior Resources of Guilford", "Senior Resources of Guilford lists SHIIP among its programs for older adults. Its published contact is 1401 Benjamin Parkway, Greensboro, and 336-373-4816. Ask the organization about Medicare counseling appointments if you want an independent place to discuss questions.", sr),
      fact("care", "Cone Health", "Cone Health's own location overview identifies a network serving Guilford and surrounding counties. If your appointment paperwork names Cone Health, bring the particular practice and clinician, rather than only the health-system name. Those details help when checking a provider directory.", cone),
      fact("public_resource", "Central Library", "The State Library of North Carolina directory lists Greensboro's Central Library at 219 North Church Street. Check the branch's current services before going. This is a public resource for research, not my office or a place to assume private health discussions are available.", "https://library.nc.gov/nc-libraries/library-directory"),
    ],
  },
  "high-point": {
    name: "High Point", path: "/medicare-in/high-point",
    intro: "Keep your home location separate from where you receive care in High Point. The resources below give you places to start gathering the details for a Medicare conversation.",
    facts: [
      fact("county", "Confirm the county at home", "High Point appears in Guilford County's jurisdiction directory. For an address near a county boundary, confirm the actual county instead of treating the city name as the answer. Write that county next to your ZIP before opening the official plan research tool.", guilford),
      fact("counseling", "Guilford's Medicare counseling resource", "The Senior Resources of Guilford program directory includes SHIIP. Contact the organization at 336-373-4816 to ask how to arrange counseling. This is a separate public service; contacting Christian does not enroll you in SHIIP or connect you to its appointment system.", sr),
      fact("care", "High Point Medical Center", "Atrium Health Wake Forest Baptist identifies High Point Medical Center as part of its system. If you use this hospital, put it on your list separately from an outpatient physician office. Confirm the hospital and each clinician for the coverage year you are researching.", hp),
      fact("public_resource", "High Point Public Library", "The city's library page gives the address as 901 North Main Street. Use the official page to check services and hours before a visit. A library can be a starting point for public information, while personal paperwork and account passwords deserve care on any shared computer.", "https://www.highpointnc.gov/799/The-High-Point-Library"),
    ],
  },
  "winston-salem": {
    name: "Winston-Salem", path: "/medicare-in/winston-salem",
    intro: "Winston-Salem has a county Medicare counseling program and several places to find public information. Bring the names on your own appointment letters so we can discuss the care you actually use.",
    facts: [
      fact("county", "Forsyth County resources", "Forsyth County operates the Central Library in downtown Winston-Salem. Begin with the county shown for your residence when researching coverage, even if appointments take you elsewhere in the Triad. The location of a specialist should not replace the location of your home.", "https://forsyth.cc/Library/Central/"),
      fact("counseling", "The Shepherd's Center", "The Shepherd's Center says it coordinates SHIIP in Forsyth County. Residents can call 336-748-0217 for free, unbiased Medicare counseling. The organization also describes Welcome to Medicare workshops; check its current schedule rather than relying on a date from an old flyer.", shepherd),
      fact("care", "Wake Forest Baptist Medical Center", "The health system describes its Winston-Salem medical center as its main location for patient care and training. List this facility if it is part of your care, along with any separately located offices you visit. A system's name alone does not confirm a plan's network.", wake),
      fact("public_resource", "Forsyth Central Library", "Central Library is at 660 West Fifth Street. Its county page describes meeting spaces, the North Carolina Collection, and other research resources. Follow the library's reservation and use policies; this listing does not mean I hold appointments there or that the library endorses my services.", "https://forsyth.cc/Library/Central/"),
    ],
  },
  kernersville: {
    name: "Kernersville", path: "/medicare-in/kernersville",
    intro: "In Kernersville, even a county detail deserves a second look. The town's own tax page names two county departments. Here are public sources to keep that question separate from your doctor list.",
    facts: [
      fact("county", "Two county tax departments", "The Town of Kernersville says property information is maintained by Forsyth and Guilford County tax departments. Check your own address's county before comparing Medicare Advantage availability. Do not infer it from a Kernersville mailing address or from which hospital is closest.", "https://toknc.com/finance/tax-info/"),
      fact("counseling", "Counseling for Forsyth residents", "For a Kernersville household in Forsyth County, the Shepherd's Center publishes its SHIIP counseling number as 336-748-0217. Its page directs residents of other counties to North Carolina SHIIP. Confirm your county first, then ask the appropriate program about appointment arrangements.", shepherd),
      fact("care", "Novant Health Kernersville Medical Center", "Novant describes Kernersville Medical Center as the local hospital and a department of Forsyth Medical Center. Copy the exact facility name from your records when building a research list. Also include the office locations of doctors you see outside the hospital campus.", kernersville),
      fact("public_resource", "Paddison Memorial Branch", "Forsyth County's Paddison Memorial Branch is at 248 Harmon Lane in downtown Kernersville. The branch page describes an auditorium, a makerspace, and library collections. Consult the county's page for current services, accessibility, and hours; it is listed here as a public resource only.", "https://www.forsyth.cc/library/paddison/about_us.aspx"),
    ],
  },
  burlington: {
    name: "Burlington", path: "/medicare-in/burlington",
    intro: "A Burlington Medicare review starts with the address where you live and the providers you want to check. These Alamance resources give you useful starting points for your own research.",
    facts: [
      fact("county", "Burlington in Alamance County", "Burlington's official location page places the city in Alamance County and describes its I-40/I-85 connections. For Medicare research, use your residence's county. Visiting a doctor along that highway corridor does not establish which county's plan options are available at home.", "https://www.burlingtonnc.gov/2042/Location"),
      fact("counseling", "Alamance ElderCare's resource directory", "Alamance ElderCare lists SHIIP with the contact number 919-704-6714. Its directory also includes caregiver and other local services. Use the published resource contact to ask about Medicare counseling, and confirm the appointment location directly before making a trip.", eldercare),
      fact("care", "Alamance Regional Medical Center", "Cone Health identifies Alamance Regional Medical Center as a hospital in Alamance County. If that is your preferred hospital, record it by name rather than writing only 'Cone.' Bring your separate physician and pharmacy details too, so each item can be researched individually.", cone),
      fact("public_resource", "May Memorial Library", "Alamance County lists May Memorial Library at 342 South Spring Street, Burlington, with telephone 336-229-3588. The county library page supplies branch hours and updates. Call the branch about the resources you need before visiting, without assuming it is a Medicare counseling site.", libraries),
    ],
  },
  summerfield: {
    name: "Summerfield", path: "/medicare-in/summerfield",
    intro: "Summerfield's town pages point to county counseling and community activities for older adults. Keep those public services alongside your personal doctor list, without treating either as a coverage check.",
    facts: [
      fact("county", "Northwest Guilford County", "The Town of Summerfield's welcome page locates the town in northwest Guilford County. When you prepare for a Medicare conversation, record your residence's county and ZIP together. If a mailing address or boundary leaves you uncertain, verify the address before researching county-specific options.", "https://www.summerfieldnc.gov/welcome"),
      fact("counseling", "The town's SHIIP contact", "Summerfield's senior resource page names Senior Resources of Guilford as a Medicare counseling contact at 336-373-4816, extension 253. It describes SHIIP as free and unbiased. Check appointment arrangements with that organization; its counselors operate independently of my insurance practice.", "https://www.summerfieldnc.gov/seniors"),
      fact("care", "Care through Cone Health", "Cone Health's location overview includes Guilford County in the area its network serves. For a Summerfield resident who already uses that network, the useful next step is a list of actual clinicians and facilities. Do not replace that list with a general statement about a health system.", cone),
      fact("public_resource", "Summerfield Community Center", "The town's senior page gives Summerfield Community Center's address as 5404 Centerfield Road and lists older-adult activities there. Follow the town's current calendar and reservation instructions. The center is a community resource, not a location where I claim to hold Medicare appointments.", "https://www.summerfieldnc.gov/seniors"),
    ],
  },
  jamestown: {
    name: "Jamestown", path: "/medicare-in/jamestown",
    intro: "For Jamestown, gather the care locations that matter to you on both sides of your usual trips. County resources and the town library can help you prepare questions before a consultation.",
    facts: [
      fact("county", "Jamestown's county directory entry", "Guilford County names Jamestown in its jurisdiction directory and describes county permitting services for the town. Use the county at your residential address for plan research. Traveling to an appointment in High Point or another community does not change that home-address starting point.", guilford),
      fact("counseling", "Guilford's SHIIP program listing", "Senior Resources of Guilford includes the Seniors' Health Insurance Information Program in its program list. The published main number is 336-373-4816. A Jamestown resident can ask the organization how to reach Medicare counseling and what documents to bring to an appointment.", sr),
      fact("care", "A hospital to record separately", "High Point Medical Center belongs to Atrium Health Wake Forest Baptist. If your Jamestown household uses it, note the hospital separately from your primary-care practice. A review needs the places on your own records, including facilities outside town, rather than a list chosen just by distance.", hp),
      fact("public_resource", "Jamestown Public Library", "The library publishes its street address as 200 West Main Street and its telephone as 336-454-4815. Use its own website for current hours and services. Keep this street address separate from the library's mailing box when planning a visit; I am listing a public resource, not an office.", "https://www.jamestownpubliclibrary.com/"),
    ],
  },
  stokesdale: {
    name: "Stokesdale", path: "/medicare-in/stokesdale",
    intro: "A Stokesdale mailing address is a starting point for research, not a substitute for checking your home location. Use these public contacts to prepare a county and care list you can confirm.",
    facts: [
      fact("county", "Stokesdale in Guilford's directory", "Guilford County lists Stokesdale among jurisdictions for which it provides planning services. For coverage research, verify the county of the particular home address instead of assuming every nearby address belongs to the same county. Keep any boundary question on your list for the consultation.", guilford),
      fact("counseling", "Independent county counseling", "The Senior Resources of Guilford directory includes SHIIP, with the organization's main telephone at 336-373-4816. If Guilford is your home county, ask about counseling arrangements. If it is another county, use the state counselor locator to find the appropriate local contact.", sr),
      fact("care", "Kernersville hospital information", "Novant identifies Kernersville Medical Center as a department of Forsyth Medical Center. For someone in Stokesdale who receives care there, the hospital name belongs on the research sheet even though it is outside town. Record any other hospitals you use as separate entries.", kernersville),
      fact("public_resource", "Stokesdale Town Hall", "The town publishes Town Hall's street address as 8325 Angel-Pardue Road and its number as 336-643-4011. Its site links to forms, maps, and local government information. This is a public contact for town questions, not a Medicare counseling office or a Christian Brinkley meeting location.", "https://www.stokesdale.org/"),
    ],
  },
  butner: {
    name: "Butner", path: "/medicare-butner-nc",
    intro: "Butner's town page places it in southern Granville County, near the Triangle. Start with your home address, then write down the care locations you would want checked.",
    facts: [
      fact("county", "Southern Granville County", "The current official town page places Butner in southern Granville County and describes its access to I-85 and nearby Creedmoor. For Medicare research, begin with the county of your home address. A town's proximity to Durham does not change that starting point, and your doctor's location is a separate item.", "https://www.butnernc.gov/164/About-Butner"),
      fact("counseling", "Granville County SHIIP", "Granville County's staff directory lists a Medicare specialist and SHIIP coordinator at 919-693-1930. Call Senior Services to ask how counseling is arranged for your location. The directory also lists South Granville Senior Center contacts, but an appointment should be confirmed rather than assumed.", "https://www.granvillecounty.org/m/Directory"),
      fact("care", "Duke University Hospital", "Duke Health gives Duke University Hospital's address as 2301 Erwin Road in Durham. If you travel there for care from Butner, include the hospital and the particular clinic on your list. This public location information makes no statement about any Medicare plan's participation or coverage.", "https://www.dukehealth.org/hospitals/duke-university-hospital"),
      fact("public_resource", "South Branch Library in Creedmoor", "Granville County locates South Branch Library at 1550 South Campus Drive, Creedmoor. The branch describes public computers, free Wi-Fi, copy and fax services, and a public meeting room. Review the library's policies before a visit; these are public services, with no claimed relationship to my practice.", "https://www.granvillecounty.org/419/South-Branch-Library"),
    ],
  },
  graham: {
    name: "Graham", path: "/medicare-graham-nc",
    intro: "Graham's public sources give you county contacts, a nearby hospital reference, and a local library. Use them to get organized while keeping the details of your own care at the center of the conversation.",
    facts: [
      fact("county", "Alamance's county seat", "The City of Graham identifies Graham as the county seat of Alamance County. A county seat is a government location, not proof that a medical provider participates in a plan. Begin with the county where you live, then check the providers and facilities on your own list.", "https://www.cityofgraham.com/community-profile/"),
      fact("counseling", "A local resource directory", "Alamance ElderCare publishes a SHIIP contact number of 919-704-6714 alongside its caregiver and community resources. You can ask about independent Medicare counseling through that listed contact. Confirm the counselor's location and appointment instructions directly instead of assuming the ElderCare office handles every service in its directory.", eldercare),
      fact("care", "Alamance Regional in the Cone network", "Cone Health's location page names Alamance Regional Medical Center as a hospital in Alamance County. For a Graham resident using that facility, include its name and your treating practices on the preparation sheet. Add a specialist elsewhere as another item, even when both appointments share a system name.", cone),
      fact("public_resource", "Graham Public Library", "The county library directory places Graham Public Library at 211 South Main Street and gives its phone as 336-570-6730. Check the branch's current hours on the county page. Public library information is useful for planning a visit; it does not establish private meeting space or an insurance affiliation.", libraries),
    ],
  },
  ramseur: {
    name: "Ramseur", path: "/medicare-ramseur-nc",
    intro: "Keep the Ramseur address where you live distinct from the places you drive for care. Your research sheet can hold both, while the public resources below help you find the right contacts.",
    facts: [
      fact("county", "Randolph County's Ramseur base", "Randolph County's emergency medical services directory names Ramseur as Base 3. For Medicare research, separately confirm the county of your residence. County services and ambulance locations do not tell you which physicians, hospitals, or prescription drugs a particular insurance plan covers.", randolph),
      fact("counseling", "Find the Randolph counselor", "North Carolina SHIIP offers a county counselor locator and says its counseling is free and unbiased. Select Randolph County when that is your home county. Use the current locator for the appointment contact rather than relying on a telephone number copied from an older community booklet.", SHIIP_CONTACT_URL),
      fact("care", "Randolph Health records", "Randolph Health's patient portal page publishes its address as 364 White Oak Street in Asheboro and explains access to hospital records. If you use the hospital, your own records can help identify the visits and clinicians to discuss. Office records may be separate from the hospital's portal.", randolphCare),
      fact("public_resource", "Ramseur Public Library", "Randolph County Public Library lists the Ramseur branch at 1512 South Main Street, telephone 336-824-2232. Follow its location page for branch hours before traveling. Keep personal Medicare credentials off shared devices unless you understand the sign-out and privacy steps needed for the service you are using.", randolphLibraries),
    ],
  },
  liberty: {
    name: "Liberty", path: "/medicare-liberty-nc",
    intro: "For Liberty, begin with a short list of the offices and hospitals on your actual records. These county and community sources can help you prepare without guessing what a plan will cover.",
    facts: [
      fact("county", "Liberty in the county service directory", "Randolph County names Liberty as Base 2 in its emergency medical services information. Use your residential county when checking Medicare options, and keep any address uncertainty visible on your notes. A county service listing should never be read as an insurance network or benefit directory.", randolph),
      fact("counseling", "State SHIIP's county locator", "The North Carolina Department of Insurance provides a locator for free, unbiased SHIIP counseling in each county. For a Liberty household in Randolph County, select Randolph in that tool and confirm how to make an appointment. No details entered on this site are passed into the locator.", SHIIP_CONTACT_URL),
      fact("care", "A separate hospital record source", "Randolph Health describes its hospital patient portal and lists 364 White Oak Street, Asheboro, as its address. When that hospital is part of your care, use the names on your paperwork to prepare questions. The portal information is about records, not a confirmation of Medicare coverage.", randolphCare),
      fact("public_resource", "Liberty Public Library", "The Randolph library system lists Liberty Public Library at 239 South Fayetteville Street, phone 336-622-4605. Check current opening times on the branch directory, especially before a Monday visit. The library is a public information resource; I do not claim to hold appointments at this location.", randolphLibraries),
    ],
  },
};
