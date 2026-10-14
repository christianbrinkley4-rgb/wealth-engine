import type { Metadata } from "next";
import Link from "next/link";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { MedicareByline } from "@/app/components/MedicareByline";
import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { ServiceHero } from "@/app/components/ServiceHero";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  pageOpenGraph,
  pageTwitter,
  speakableJsonLd,
} from "@/lib/seo";

const path = "/north-carolina-medicare-programs";
const title = "NC Medicare Programs: SHIIP, Savings, PACE and Medicaid";
const description =
  "Find North Carolina Medicare counseling, Extra Help, savings programs, Medigap rights, PACE, and Medicaid application routes. Get free help from a local agent.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title, description, path }),
  twitter: pageTwitter({ title, description }),
};

const sections = [
  {
    id: "shiip",
    heading: "Where can I get independent Medicare counseling in Guilford County?",
    answer:
      "North Carolina SHIIP offers free, unbiased Medicare counseling. Use the state counselor directory to find Guilford County assistance before choosing coverage.",
    detail:
      "SHIIP counselors explain Medicare and compare options without selling or endorsing insurance products. Senior Resources of Guilford has a SHIIP program. Check the state directory for its current contact details and appointment availability. You can use independent counseling and still speak with an agent about plans the agent represents.",
    source:
      "https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip",
    sourceName: "NC DOI: SHIIP",
    extra: {
      href: "https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip/contact-seniors-health-insurance-information-program-shiip",
      label: "Find a counselor by county",
    },
  },
  {
    id: "medigap",
    heading: "What Medigap enrollment rights apply in North Carolina?",
    answer:
      "Medigap open enrollment generally lasts six months after you are 65 and enrolled in Part B. North Carolina also protects some younger applicants.",
    detail:
      "N.C.G.S. 58-54-45 requires specified Medigap plans for people under 65 eligible because of disability. For Medicare eligibility beginning in 2020 or later, insurers must make Plan A available and also Plan D or G if they market either to newly eligible older applicants. Apply within the statutory six-month Part B window. Retroactive eligibility has a separate notification-based timing provision. This is not a promise that every plan is available without health questions at any time.",
    source:
      "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/ByArticle/Chapter_58/Article_54.html",
    sourceName: "NC General Assembly: section 58-54-45",
    extra: {
      href: "https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when",
      label: "Medicare.gov: Medigap open enrollment",
    },
  },
  {
    id: "extra-help",
    heading: "Can Extra Help lower my prescription costs?",
    answer:
      "Extra Help reduces Medicare Part D costs for people with limited income and resources. Some qualify automatically; others apply through Social Security.",
    detail:
      "Medicare.gov lists 2026 annual income limits of $23,940 for an individual and $32,460 for a married couple. Resource limits are $18,090 and $36,100 respectively. Those are eligibility guidelines, not a calculation of every household's countable income or assets. Full Medicaid, a Medicare Savings Program, or SSI can qualify you automatically. Ask about Extra Help even if you are unsure where your income falls.",
    source: "https://www.medicare.gov/basics/costs/help/drug-costs",
    sourceName: "Medicare.gov: Extra Help, 2026 limits",
    extra: {
      href: "https://www.ssa.gov/medicare/part-d-extra-help",
      label: "Apply for Extra Help with Social Security",
    },
  },
  {
    id: "savings",
    heading: "Which Medicare Savings Program might help with my Part B premium?",
    answer:
      "QMB, SLMB, and QI help eligible Medicare beneficiaries with premiums. North Carolina DSS evaluates countable income, resources, and other requirements before approving assistance.",
    detail:
      "QMB can help with Medicare premiums and covered cost sharing. SLMB and QI help with Part B premiums. NC calls these MQB-Q, MQB-B, and MQB-E. The table below uses NC's April 1, 2026 monthly countable-income limits. These are not gross-pay cutoffs: disregards and other eligibility rules matter. Ask DSS to evaluate your application rather than deciding you are ineligible from a single number.",
    source: "https://policies.ncdhhs.gov/wp-content/uploads/MA-2252-Non-MAGI-Income-2.pdf",
    sourceName: "NCDHHS: MA-2252, effective April 1, 2026",
    extra: {
      href: "https://www.medicare.gov/basics/costs/help/medicare-savings-programs",
      label: "Medicare.gov: what each savings program pays",
    },
  },
  {
    id: "cap-da",
    heading: "What is North Carolina CAP/DA?",
    answer:
      "CAP/DA is a Medicaid waiver supporting eligible disabled adults at home instead of institutional care. Medical assessments and Medicaid financial requirements apply.",
    detail:
      "The Community Alternatives Program for Disabled Adults can provide home and community services for people who meet the required level of care. It is a Medicaid program, not a Medicare supplement or an insurance policy sold by an agent. Ask county DSS about Medicaid eligibility and the local CAP case-management path. A request starts an assessment, not an automatic approval or guarantee of an immediate service slot.",
    source: "https://policies.ncdhhs.gov/wp-content/uploads/ma-2280-CAP.pdf",
    sourceName: "NC Medicaid: Community Alternatives Program policy",
    extra: {
      href: "https://medicaid.ncdhhs.gov/blog/2025/01/08/community-alternatives-program-disabled-adults-renewal-approved",
      label: "NC Medicaid: renewed CAP/DA waiver",
    },
  },
  {
    id: "pace",
    heading: "Who can use PACE in North Carolina?",
    answer:
      "PACE serves eligible adults aged 55 or older who need nursing-home-level care and can live safely in the community within a participating service area.",
    detail:
      "PACE coordinates health care and support through a local program. Eligibility depends on the service area, care assessment, and financial requirements. Participants can have Medicare, Medicaid, both, or pay privately. Check the current NC provider list for your address. Having Medicare alone does not establish that PACE is available to you or that there will be no monthly charge.",
    source:
      "https://medicaid.ncdhhs.gov/beneficiaries/long-term-services-and-supports/program-all-inclusive-care-elderly",
    sourceName: "NC Medicaid: PACE eligibility and providers",
  },
  {
    id: "applications",
    heading: "Does Medicaid expansion replace Medicare, and how do I apply?",
    answer:
      "Medicaid expansion does not replace Medicare. Ask county DSS about Medicare-related Medicaid eligibility, and apply through North Carolina ePASS or your local office.",
    detail:
      "North Carolina's expansion group covers eligible adults ages 19 through 64 who are not eligible for Medicare Part A or B. When Medicare eligibility begins, DSS should review whether a different Medicaid category or Medicare Savings Program applies. For applications, NC Medicaid is called Medical Assistance in ePASS. You can also apply in person or arrange an interview with county DSS. Submit financial documents through the official application path, not this site's contact form.",
    source:
      "https://medicaid.ncdhhs.gov/nc-medicaid-state-plans-and-amendments-list20231208/download?attachment=",
    sourceName: "NC Medicaid: expansion eligibility categories",
    extra: {
      href: "https://medicaid.ncdhhs.gov/apply",
      label: "NC Medicaid: ePASS and county DSS application routes",
    },
  },
] as const;

export default function NorthCarolinaMedicarePrograms() {
  return (
    <main className="text-[var(--color-navy)]">
      {[
        articleJsonLd({
          headline: title,
          description,
          path,
          datePublished: "2026-10-12",
          dateModified: "2026-10-12",
        }),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "NC Medicare programs", path },
        ]),
        speakableJsonLd([".sh-title", ".sh-lede"], path),
      ].map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
      ))}
      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "NC Medicare programs" }]}
        eyebrow="North Carolina Medicare resources"
        title="North Carolina programs that help with Medicare"
        lede="Start with the kind of help you need: independent counseling, lower premiums, prescription assistance, or support at home. Here are North Carolina's application paths and the rules to check before choosing a plan."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Talk through your options"
      />
      <MedicareByline reviewed="2026-10-12" />
      <nav className="app-shell max-w-3xl py-6" aria-label="Programs on this page">
        <ul className="space-y-2">
          {sections.map((s) => (
            <li key={s.id}>
              <a className="underline" href={`#${s.id}`}>
                {s.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="measure-prose app-shell max-w-3xl py-8">
          <h2 className="text-28 font-semibold">{s.heading}</h2>
          <p className="text-18 mt-4">{s.answer}</p>
          <p className="text-17 mt-4">{s.detail}</p>
          {s.id === "savings" ? (
            <div className="mt-6 overflow-x-auto">
              <table className="art-table">
                <caption>NC monthly countable-income limits, effective April 1, 2026</caption>
                <thead>
                  <tr>
                    <th scope="col">Program</th>
                    <th scope="col">Individual</th>
                    <th scope="col">Couple</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">QMB / MQB-Q</th>
                    <td>$1,330</td>
                    <td>$1,804</td>
                  </tr>
                  <tr>
                    <th scope="row">SLMB / MQB-B</th>
                    <td>$1,596</td>
                    <td>$2,164</td>
                  </tr>
                  <tr>
                    <th scope="row">QI / MQB-E</th>
                    <td>$1,796</td>
                    <td>$2,435</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-16 mt-3">
                NC&apos;s chart lists MQB resource limits of $9,950 for one person and $14,910 for a
                couple. Ask DSS which assets count.
              </p>
            </div>
          ) : null}
          <p className="text-16 mt-4">
            Sources:{" "}
            <a className="underline" href={s.source}>
              {s.sourceName}
            </a>
            {"extra" in s ? (
              <>
                {"; "}
                <a className="underline" href={s.extra.href}>
                  {s.extra.label}
                </a>
              </>
            ) : null}
            .
          </p>
          <p className="text-16 mt-2 text-[var(--color-ink-muted)]">
            Sources checked October 12, 2026. Eligibility is decided by the responsible program.
          </p>
        </section>
      ))}
      <p className="app-shell text-18 max-w-3xl py-6">
        Need help choosing a next step?{" "}
        <Link className="underline" href="/medicare-agent-greensboro-nc">
          Read the Greensboro Medicare guide
        </Link>{" "}
        or{" "}
        <Link className="underline" href="/start?topic=medicare&quick=1">
          book a free conversation
        </Link>
        .
      </p>
      <RelatedMedicareGuides />
      <div className="app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
