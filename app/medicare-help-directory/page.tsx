import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Triad Free Medicare Help Directory.
 *
 * A neutral, linkable asset: every entry is a real government or nonprofit
 * program, verified before publication. The goal is for libraries, senior
 * centers, and community sites to link to it. The contact line stays quiet.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Free Medicare Help in the Triad: Directory of Resources",
  },
  description:
    "Free, unbiased Medicare help in Greensboro, Winston-Salem, and High Point: NC SHIIP counseling, the Area Agency on Aging, 1-800-MEDICARE, and the Senior Medicare Patrol.",
  alternates: { canonical: "/medicare-help-directory" },
  openGraph: pageOpenGraph({
    title: "Free Medicare help in the Triad: a directory",
    description:
      "Real, no-cost Medicare counseling and support for Greensboro, Winston-Salem, High Point, and nearby communities. Every entry verified.",
    path: "/medicare-help-directory",
  }),
  twitter: pageTwitter({
    title: "Free Medicare help in the Triad: a directory",
    description:
      "Real, no-cost Medicare counseling and support for Greensboro, Winston-Salem, High Point, and nearby communities. Every entry verified.",
    path: "/medicare-help-directory",
  }),
};

const DIRECTORY = [
  {
    name: "NC SHIIP (Seniors' Health Insurance Information Program)",
    what: "Free, unbiased Medicare counseling from trained volunteers and staff. They explain Original Medicare, Medicare Advantage, Medigap, and Part D, screen for Extra Help with drug costs, and run fraud-awareness outreach through the NC Senior Medicare Patrol.",
    coverage: "All 100 North Carolina counties, including Guilford, Forsyth, Davidson, Randolph, Alamance, Rockingham, and Stokes.",
    contact: "Call 855-408-1212, Monday through Friday, 8 a.m. to 5 p.m.",
    web: { label: "www.ncshiip.com", href: "https://www.ncshiip.com" },
    note: "SHIIP counselors do not sell insurance. They are a division of the North Carolina Department of Insurance.",
  },
  {
    name: "Piedmont Triad Regional Council: Area Agency on Aging",
    what: "The regional Area Agency on Aging for the Piedmont Triad. They connect adults 60 and older (and their caregivers) with local services: home and community-based care, caregiver support, health promotion programs, and the regional Long-Term Care Ombudsman.",
    coverage: "Alamance, Caswell, Davie, Davidson, Forsyth, Guilford, Montgomery, Randolph, Rockingham, Stokes, Surry, and Yadkin counties.",
    contact: "Call 336-904-0300.",
    web: { label: "ptrc.org", href: "https://www.ptrc.org/services/area-agency-on-aging" },
    note: "The council office is in Kernersville. Services are delivered through county partners across the region.",
  },
  {
    name: "1-800-MEDICARE",
    what: "The official Medicare helpline. They can answer questions about enrollment, coverage, and your Medicare statements, and help if your information has been used without your permission.",
    coverage: "Nationwide. Available 24 hours a day, 7 days a week (except some federal holidays).",
    contact: "Call 1-800-633-4227. TTY users can call 1-877-486-2048.",
    web: { label: "www.medicare.gov", href: "https://www.medicare.gov" },
    note: "This is the number Medicare itself publishes. Use it to check on anything a caller claims about your coverage.",
  },
  {
    name: "Senior Medicare Patrol (SMP)",
    what: "Volunteers who teach people how to spot Medicare billing errors and fraud, and help document suspected fraud. In North Carolina, the SMP works alongside NC SHIIP.",
    coverage: "Statewide, through the NC Senior Medicare Patrol program.",
    contact: "Call 1-877-808-2468.",
    web: { label: "smpresource.org", href: "https://smpresource.org" },
    note: "If you see charges on your Medicare statement for services you did not get, the SMP can help you document it.",
  },
] as const;

const FAQ = [
  {
    q: "Is there really free help with Medicare, or is there a catch?",
    a: "The programs listed here are real and free. NC SHIIP is run by the North Carolina Department of Insurance, the Area Agency on Aging is a regional government program, and 1-800-MEDICARE is the federal helpline. None of them charge you, and none of them sell insurance plans.",
  },
  {
    q: "How is this different from calling an insurance agent?",
    a: "Counselors at SHIIP and the Area Agency on Aging do not earn a commission from any plan you pick. They explain your options without a sales angle. An agent (like me) helps you compare specific plans and can enroll you; a counselor helps you understand the system first. Some people use both.",
  },
  {
    q: "Can I get help even if I am not on Medicare yet?",
    a: "Yes. SHIIP counselors regularly help people who are turning 65 and approaching their enrollment window. If you are within a few months of 65, call them or schedule a free consultation to walk through your timeline.",
  },
  {
    q: "Do these programs help with scams and fraud?",
    a: "Yes. The Senior Medicare Patrol exists for exactly that: teaching people to spot billing errors and suspected fraud, and helping document it. NC SHIIP also runs fraud-awareness outreach. If someone calls claiming to be from Medicare and asks for personal or bank information, hang up and call 1-800-MEDICARE to check.",
  },
  {
    q: "I want a local agent too. Is that an option?",
    a: "Of course. I offer free, no-obligation Medicare consultations in Greensboro, Winston-Salem, High Point, and nearby communities. You can call or text me at (919) 408-6671 or book a time online.",
  },
] as const;

export default function MedicareHelpDirectoryPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free Medicare help directory", path: "/medicare-help-directory" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline:
                "Free Medicare help in the Triad: a directory of verified resources",
              description:
                "Free, unbiased Medicare counseling and support in Greensboro, Winston-Salem, and High Point: NC SHIIP, the Area Agency on Aging, 1-800-MEDICARE, and the Senior Medicare Patrol.",
              path: "/medicare-help-directory",
              datePublished: "2026-10-13",
              dateModified: "2026-10-13",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Free Medicare help directory" }]}
        eyebrow="Greensboro, Winston-Salem & High Point · No cost, no catch"
        title="Free Medicare help in the Triad"
        lede="You do not have to figure Medicare out alone, and you do not have to pay for help. These are real, verified programs that answer Medicare questions for free in our area. I put this list together because I send people to these resources all the time. Every entry below was verified before I published it."
        secondaryHref="/schedule?topic=medicare"
        secondaryLabel="Book a free consultation with me →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The directory</h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            Start with whichever one fits your situation. If you are not sure where to begin, NC
            SHIIP is usually the best first call.
          </p>

          <div className="mt-8 flex flex-col gap-6">
            {DIRECTORY.map((entry) => (
              <article
                key={entry.name}
                className="card-surface p-6 sm:p-8"
              >
                <h3 className="text-22 font-semibold">{entry.name}</h3>
                <p className="text-17 mt-3 leading-relaxed">{entry.what}</p>
                <dl className="text-16 mt-4 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <dt className="font-semibold">Covers:</dt>
                    <dd className="text-[var(--color-ink-muted)]">{entry.coverage}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold">Contact:</dt>
                    <dd className="text-[var(--color-ink-muted)]">
                      {entry.contact}{" "}
                      <a
                        href={entry.web.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        {entry.web.label}
                      </a>
                    </dd>
                  </div>
                </dl>
                <p className="text-15 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                  {entry.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What these programs can and cannot do</h2>
          <p className="text-18 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            SHIIP counselors and Area Agency on Aging staff can explain Medicare, compare your
            options, and help you spot fraud. What they cannot do is enroll you in a plan. For
            that, you work directly with Medicare or with a licensed agent.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            A lot of people do both: get the unbiased overview from a counselor, then sit down
            with an agent to compare specific plans and enroll. If you want that second part,{" "}
            <Link href="/schedule?topic=medicare" className="underline underline-offset-2">
              book a free consultation
            </Link>
            . It costs nothing and there is no obligation.
          </p>
          <GuideTownLinks heading="Personal Medicare help near you" />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions I get about free help</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
          />
        </div>
      </section>

      <KitchenTableClose
        heading="Want to talk it through with a local agent?"
        body="Free consultation, no obligation. We can meet at your home, talk by phone, or meet somewhere convenient. Bring your questions and we will take them one at a time."
        href="/schedule?topic=medicare"
        label="Book a free consultation →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-17 mb-8 leading-relaxed text-[var(--color-ink-muted)]">
          If you are worried about a suspicious call or letter, read{" "}
          <Link href="/medicare-scam-alert" className="underline underline-offset-2">
            our Medicare scam alert
          </Link>
          . For what is changing this year, see{" "}
          <Link href="/medicare-changes-2027" className="underline underline-offset-2">
            Medicare changes for 2027
          </Link>
          .
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
      <RelatedMedicareGuides />
    </main>
  );
}
