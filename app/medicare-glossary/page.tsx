import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "@/components/Link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Medicare Terms Explained Simply: an A to Z glossary.
 *
 * One or two short sentences per term, in the words Christian would use out
 * loud. No dollar figures here on purpose, so nothing on this page goes stale
 * when CMS updates the yearly amounts.
 */

const PATH = "/medicare-glossary";
const REVIEWED = "2026-10-13";

const title = "Medicare Terms Explained Simply: A Plain-English Glossary";
const description =
  "Premium, deductible, copay, coinsurance, network, formulary and more. 28 Medicare terms explained in a sentence or two each, in plain English, from a local Greensboro agent.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Medicare terms explained simply",
    description:
      "28 Medicare words you'll see in the mail and hear at the doctor's office, each explained in a sentence or two.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Medicare terms explained simply",
    description:
      "28 Medicare words you'll see in the mail and hear at the doctor's office, each explained in a sentence or two.",
    path: PATH,
  }),
};

type Term = {
  id: string;
  term: string;
  aka?: string;
  definition: string;
  more?: { label: string; href: string };
};

/** Kept in A to Z order. The jump links are built from the first letters. */
const TERMS: readonly Term[] = [
  {
    id: "annual-enrollment-period",
    term: "Annual Enrollment Period",
    aka: "AEP, open enrollment",
    definition:
      "October 15 to December 7, every year. It's when you can change your Medicare Advantage plan or your drug plan. Changes start January 1.",
    more: { label: "AEP checklist", href: "/aep-checklist" },
  },
  {
    id: "annual-notice-of-change",
    term: "Annual Notice of Change",
    aka: "ANOC",
    definition:
      "The letter your plan mails you each fall. It lists what will be different next year, like your premium, your copays, and your covered drugs.",
    more: { label: "How to read your ANOC", href: "/anoc" },
  },
  {
    id: "assignment",
    term: "Assignment",
    definition:
      "When a doctor agrees to take the Medicare-approved amount as full payment. A doctor who accepts assignment can only bill you for your deductible and coinsurance.",
  },
  {
    id: "benefit-period",
    term: "Benefit period",
    definition:
      "How Part A counts a hospital stay. It starts the day you're admitted and ends after you've been out of the hospital or skilled nursing facility for 60 days in a row. The Part A deductible applies to each one.",
  },
  {
    id: "coinsurance",
    term: "Coinsurance",
    definition:
      "Your share of a bill, as a percentage. With Part B, you usually pay 20% and Medicare pays 80% after your deductible.",
  },
  {
    id: "copay",
    term: "Copay",
    aka: "copayment",
    definition:
      "Your share of a bill, as a set dollar amount. For example, a flat fee each time you see a doctor or fill a prescription.",
  },
  {
    id: "creditable-coverage",
    term: "Creditable coverage",
    definition:
      "Drug coverage from somewhere else, like a job, that's expected to pay at least as much as Medicare's standard drug coverage. If you have it, you can wait on Part D without a late penalty.",
  },
  {
    id: "deductible",
    term: "Deductible",
    definition:
      "What you pay for covered care before your coverage starts paying its share. Part A, Part B, and most drug plans each have their own.",
  },
  {
    id: "evidence-of-coverage",
    term: "Evidence of Coverage",
    aka: "EOC",
    definition:
      "Your plan's full rulebook for the year. It spells out what's covered, what you pay, and how to appeal a decision. The Annual Notice of Change is the short version of what's changing.",
  },
  {
    id: "extra-help",
    term: "Extra Help",
    aka: "Low-Income Subsidy",
    definition:
      "A federal program that lowers Part D costs for people with limited income and savings. You apply through Social Security.",
    more: { label: "Free Medicare help in the Triad", href: "/medicare-help-directory" },
  },
  {
    id: "formulary",
    term: "Formulary",
    aka: "drug list",
    definition:
      "The list of prescription drugs a plan covers. Every plan has its own, and it can change each year. If a drug isn't on the list, the plan usually won't pay for it.",
  },
  {
    id: "hmo",
    term: "HMO",
    aka: "Health Maintenance Organization",
    definition:
      "A type of Medicare Advantage plan. You generally have to use the plan's doctors and hospitals, except in an emergency. Many HMOs ask you to pick a primary care doctor.",
  },
  {
    id: "irmaa",
    term: "IRMAA",
    aka: "income-related monthly adjustment amount",
    definition:
      "An extra amount added to your Part B and Part D premiums if your income is above a certain level. It's based on your tax return from two years ago.",
    more: { label: "Medicare costs 2027", href: "/medicare-costs-2027" },
  },
  {
    id: "late-enrollment-penalty",
    term: "Late enrollment penalty",
    definition:
      "An amount added to your premium if you sign up late and didn't have other qualifying coverage. The Part B penalty lasts as long as you have Part B.",
    more: { label: "Work out the Part B penalty", href: "/part-b-penalty" },
  },
  {
    id: "maximum-out-of-pocket",
    term: "Maximum out-of-pocket",
    aka: "out-of-pocket limit",
    definition:
      "The most you'd pay in a year for covered medical care in a Medicare Advantage plan. Each plan sets its own. Original Medicare by itself has no yearly limit.",
  },
  {
    id: "medicare-advantage",
    term: "Medicare Advantage",
    aka: "Part C",
    definition:
      "A plan from a private company that covers your Part A and Part B benefits in one package. Most include drug coverage. You usually need to use the plan's network.",
  },
  {
    id: "medicare-supplement",
    term: "Medicare Supplement",
    aka: "Medigap",
    definition:
      "A policy you buy to go with Original Medicare. It helps pay costs Original Medicare leaves to you, like the deductibles and the 20% coinsurance. It doesn't include drug coverage.",
    more: {
      label: "Medicare Advantage or Medigap?",
      href: "/medicare-advantage-vs-medigap-greensboro-nc",
    },
  },
  {
    id: "network",
    term: "Network",
    definition:
      "The doctors, hospitals, and pharmacies a plan has contracts with. In network usually costs less. Out of network can cost more, or may not be covered at all.",
    more: { label: "Keep my doctor", href: "/keep-my-doctor" },
  },
  {
    id: "original-medicare",
    term: "Original Medicare",
    definition:
      "Part A and Part B together, run by the federal government. You can see any doctor or hospital in the country that takes Medicare.",
  },
  {
    id: "part-a",
    term: "Part A",
    aka: "hospital insurance",
    definition:
      "Covers hospital stays, skilled nursing facility care after a hospital stay, hospice, and some home health care. Most people pay no monthly premium for it.",
  },
  {
    id: "part-b",
    term: "Part B",
    aka: "medical insurance",
    definition:
      "Covers doctor visits, outpatient care, preventive services, and medical equipment. You pay a monthly premium for it.",
  },
  {
    id: "part-d",
    term: "Part D",
    aka: "prescription drug coverage",
    definition:
      "Coverage for prescription drugs, sold by private companies. You can get it as a separate drug plan or as part of most Medicare Advantage plans.",
  },
  {
    id: "ppo",
    term: "PPO",
    aka: "Preferred Provider Organization",
    definition:
      "A type of Medicare Advantage plan. You can see doctors outside the plan's network, but it usually costs more than staying in network.",
  },
  {
    id: "premium",
    term: "Premium",
    definition:
      "What you pay each month to have coverage, whether or not you use it.",
  },
  {
    id: "prior-authorization",
    term: "Prior authorization",
    definition:
      "Approval your plan may require before it will cover certain services or drugs. Your doctor's office usually asks for it.",
  },
  {
    id: "referral",
    term: "Referral",
    definition:
      "A written okay from your primary care doctor to see a specialist. Some plans require one before they'll cover the visit.",
  },
  {
    id: "special-enrollment-period",
    term: "Special Enrollment Period",
    aka: "SEP",
    definition:
      "A chance to sign up or change plans outside the usual dates. A life change opens it, like moving or losing coverage from a job.",
    more: { label: "Special Enrollment Periods", href: "/special-enrollment" },
  },
  {
    id: "tier",
    term: "Tier",
    definition:
      "A group of drugs on a plan's drug list. Drugs in lower tiers generally cost you less than drugs in higher tiers.",
  },
];

const LETTERS = Array.from(new Set(TERMS.map((entry) => entry.term[0].toUpperCase())));

/** The first term for each letter carries that letter's anchor. */
const firstForLetter = (entry: Term) =>
  TERMS.find((other) => other.term[0].toUpperCase() === entry.term[0].toUpperCase()) === entry;

const FAQ = [
  {
    q: "What's the difference between a copay and coinsurance?",
    a: "Both are your share of a bill. A copay is a set dollar amount, like a flat fee for an office visit. Coinsurance is a percentage, like the 20% you usually pay under Part B. With a copay you know the cost ahead of time. With coinsurance, what you pay depends on the size of the bill.",
  },
  {
    q: "What's the difference between a premium and a deductible?",
    a: "A premium is what you pay every month to have the coverage, whether you use it or not. A deductible is what you pay for covered care before your coverage starts paying its share. You can have both on the same plan.",
  },
  {
    q: "What is a formulary?",
    a: "A formulary is the list of prescription drugs a plan covers. Every plan has its own list, and plans can change it each year. Before you pick or keep a plan, check that each of your prescriptions is on next year's list and what tier it's in.",
  },
  {
    q: "Is Medicare Advantage the same as a Medicare Supplement?",
    a: "No. Medicare Advantage replaces the way you get your Part A and Part B benefits with a private plan, usually with a network. A Medicare Supplement, also called Medigap, works alongside Original Medicare and helps pay the costs it leaves to you. You can't have both at the same time.",
  },
  {
    q: "What does in network mean?",
    a: "It means the doctor, hospital, or pharmacy has a contract with your plan. In-network care usually costs you less. A doctor can take Medicare and still be outside your plan's network, so check your doctors by name for the year you're enrolling in.",
  },
] as const;

export default function MedicareGlossaryPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare glossary", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: title,
              description,
              path: PATH,
              datePublished: REVIEWED,
              dateModified: REVIEWED,
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare glossary" }]}
        eyebrow="A to Z · Plain English"
        title="Medicare terms explained simply"
        lede={`${TERMS.length} words you'll see in your Medicare mail and hear at the doctor's office. Each one gets a sentence or two. If a word still doesn't make sense, call me and I'll explain it for your situation.`}
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free consultation →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The glossary, A to Z</h2>
          <nav aria-label="Jump to a letter" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {LETTERS.map((letter) => (
                <li key={letter}>
                  <a
                    href={`#letter-${letter.toLowerCase()}`}
                    className="text-17 flex size-11 items-center justify-center rounded border border-gray-300 font-semibold underline-offset-2 hover:underline"
                  >
                    {letter}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <dl className="mt-8 flex flex-col gap-6">
            {TERMS.map((entry) => (
              <div
                key={entry.id}
                id={entry.id}
                className="scroll-mt-24 border-t border-gray-300 pt-5"
              >
                <dt className="text-20 font-semibold">
                  {firstForLetter(entry) ? (
                    <span
                      id={`letter-${entry.term[0].toLowerCase()}`}
                      className="scroll-mt-24"
                    />
                  ) : null}
                  {entry.term}
                  {entry.aka ? (
                    <span className="text-16 mt-1 block font-normal text-[var(--color-ink-muted)]">
                      Also called {entry.aka}
                    </span>
                  ) : null}
                </dt>
                <dd className="text-18 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {entry.definition}
                  {entry.more ? (
                    <>
                      {" "}
                      <Link href={entry.more.href} className="underline underline-offset-2">
                        {entry.more.label}
                      </Link>
                      .
                    </>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          <p className="text-17 mt-10 leading-relaxed text-[var(--color-ink-muted)]">
            Want the yearly dollar amounts that go with these words? See{" "}
            <Link href="/medicare-costs-2027" className="underline underline-offset-2">
              Medicare costs 2027
            </Link>
            .
          </p>
          <GuideTownLinks heading="Personal Medicare help near you" />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions I get about Medicare words</h2>
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
        heading="Got a letter you can't make sense of?"
        body="Bring it with you, or read it to me over the phone. I'll tell you what it means for you and whether you need to do anything. Free consultation, no obligation."
        href="/start?topic=medicare&quick=1"
        label="Request a free consultation →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed={REVIEWED} />
      <RelatedMedicareGuides />
    </main>
  );
}
