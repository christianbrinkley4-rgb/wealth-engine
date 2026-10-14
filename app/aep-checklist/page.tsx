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
 * AEP Checklist: 10 things to review before December 7.
 *
 * Each item answers three questions: what to check, where to find it, and
 * why it matters. Dates and rules follow Medicare.gov. No plan names, no
 * plan benefits, no dollar figures.
 */

const PATH = "/aep-checklist";
const REVIEWED = "2026-10-13";

const title = "AEP Checklist: 10 Things to Review Before December 7";
const description =
  "A 10-item Medicare Annual Enrollment checklist. For each item: what to check, where to find it (like your ANOC letter), and why it matters. Open enrollment ends December 7.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "AEP checklist: 10 things to review before December 7",
    description:
      "What to check, where to find it, and why it matters. A plain checklist for Medicare Annual Enrollment, October 15 to December 7.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "AEP checklist: 10 things to review before December 7",
    description:
      "What to check, where to find it, and why it matters. A plain checklist for Medicare Annual Enrollment, October 15 to December 7.",
    path: PATH,
  }),
};

const ITEMS = [
  {
    title: "Is your plan still offered next year?",
    check: "Whether your plan will be around on January 1.",
    where:
      "A separate letter from your plan, usually in early fall, if it's ending or leaving your county. No letter like that generally means your plan continues.",
    why: "If your plan is ending, you'll need to pick new coverage. You also get extra time to do it, so don't ignore that letter.",
  },
  {
    title: "Your monthly premium",
    check: "What the plan will cost you each month next year compared with this year.",
    where:
      "Your ANOC letter (Annual Notice of Change). The side-by-side table near the front shows this year and next year.",
    why: "It's the cost you pay every month, whether or not you use the plan. It can go up, down, or stay the same.",
  },
  {
    title: "Your deductible and out-of-pocket maximum",
    check:
      "How much you pay before the plan starts paying, and the most you could pay for covered care in a year.",
    where: "Your ANOC letter, in the same cost table as the premium.",
    why: "The out-of-pocket maximum is your worst-case number for the year. A plan with a low premium can still have a high one.",
  },
  {
    title: "Every prescription you take",
    check:
      "That each drug is still on the plan's drug list for next year, and which tier it's in.",
    where:
      "The drug section of your ANOC letter, then the plan's full drug list (formulary) for next year on the plan's website. You can also enter your drugs in the plan finder on Medicare.gov.",
    why: "Drug lists change every year. A drug can move to a higher tier or come off the list, and you'd find out at the pharmacy counter in January.",
  },
  {
    title: "The rules on your drugs",
    check:
      "Whether any of your drugs need prior authorization, step therapy, or have a quantity limit next year.",
    where:
      "The plan's drug list (formulary). These rules show up as short codes or notes next to each drug.",
    why: "A drug can be on the list and still need approval before the plan pays. It's better to know now than when you're out of refills.",
  },
  {
    title: "Your pharmacy",
    check:
      "That your pharmacy is in the plan's network next year, and whether it's a preferred pharmacy.",
    where: "The plan's pharmacy directory for next year, or call your pharmacy and ask.",
    why: "The same prescription can cost more at a pharmacy that isn't preferred, and may not be covered at one that's out of network.",
  },
  {
    title: "Your doctors and specialists",
    check: "That each doctor you see is in the plan's network for next year. Check them by name.",
    where:
      "The plan's provider directory for next year. Then call the doctor's office and ask if they'll be in your specific plan in January.",
    why: "A doctor can take Medicare and still be outside your plan's network. Networks can change from one year to the next.",
  },
  {
    title: "Your hospital",
    check: "That the hospital you'd want to use is in the plan's network next year.",
    where: "The plan's provider directory, or the hospital's billing and insurance office.",
    why: "Hospital stays are some of the biggest bills there are. You want to know before you need one.",
  },
  {
    title: "Copays for the care you actually use",
    check:
      "What you'll pay next year for the visits you make most, like primary care, specialists, labs, and therapy.",
    where:
      "Your ANOC letter for what's changing. Your Evidence of Coverage has the full list of what you pay for each service.",
    why: "A few dollars more per visit adds up if you see a specialist every month. Look at the services you use, not the whole list.",
  },
  {
    title: "The extras you count on",
    check: "Whether the dental, vision, hearing, or other extra benefits you use are changing.",
    where: "Your ANOC letter and your Evidence of Coverage.",
    why: "Extras can change every year. If one of them is a reason you chose the plan, make sure it's still there.",
  },
] as const;

const FAQ = [
  {
    q: "When is the Medicare Annual Enrollment Period?",
    a: "October 15 through December 7, every year. Changes you make take effect January 1. For 2027 coverage, that means October 15 to December 7, 2026.",
  },
  {
    q: "What happens if I do nothing during AEP?",
    a: "In most cases your current plan renews for next year with whatever changes are in your ANOC letter. That's fine if the plan still fits. The risk is finding out in January that a premium, a drug, or a doctor changed, so it's worth a look even if you plan to stay.",
  },
  {
    q: "What is an ANOC letter and when should I get it?",
    a: "ANOC stands for Annual Notice of Change. Your Medicare Advantage or drug plan sends it each fall, and you should have it by the end of September. It lists what's changing on January 1. If you can't find yours, call the number on your plan card and ask for another copy.",
  },
  {
    q: "Can I change my mind after December 7?",
    a: "Sometimes. If you're in a Medicare Advantage plan on January 1, you can make one change between January 1 and March 31. You can switch to a different Medicare Advantage plan or go back to Original Medicare. Certain life changes, like moving, can also open a Special Enrollment Period.",
  },
  {
    q: "Does AEP apply to Medicare Supplement plans?",
    a: "Not in the same way. AEP is for Medicare Advantage and Part D drug plans. A Medicare Supplement, also called Medigap, doesn't have a yearly enrollment window, and switching to a different one may mean answering health questions. If you have a Supplement, your drug plan is the part to review each fall.",
  },
] as const;

export default function AepChecklistPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "AEP checklist", path: PATH },
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
        crumbs={[{ name: "Home", href: "/" }, { name: "AEP checklist" }]}
        eyebrow="October 15 to December 7 · Annual Enrollment"
        title="AEP checklist: 10 things to review before December 7"
        lede="Your plan can change every January, even if you don't touch it. Here are ten things to check this fall. For each one: what to look at, where to find it, and why it matters."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free consultation →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Before you start, grab three things</h2>
          <ul className="text-18 mt-6 flex list-disc flex-col gap-3 pl-6 leading-relaxed">
            <li>
              <strong>Your ANOC letter.</strong> That&apos;s the Annual Notice of Change your plan
              mailed you in September.{" "}
              <Link href="/anoc" className="underline underline-offset-2">
                Here&apos;s how to read it
              </Link>
              .
            </li>
            <li>
              <strong>Your prescription list.</strong> Every drug, with the dose and how often you
              take it.
            </li>
            <li>
              <strong>Your doctors.</strong> Names of your primary care doctor, your specialists,
              and the hospital you&apos;d want to use.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The 10-item checklist</h2>
          <ol className="mt-8 flex flex-col gap-8">
            {ITEMS.map((item, index) => (
              <li key={item.title} className="flex gap-4 border-t border-gray-300 pt-6">
                <span
                  aria-hidden
                  className="text-15 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">
                    <span className="sr-only">{index + 1}. </span>
                    {item.title}
                  </h3>
                  <dl className="text-17 mt-3 flex flex-col gap-3 leading-relaxed">
                    <div>
                      <dt className="inline font-semibold">What to check: </dt>
                      <dd className="inline text-[var(--color-ink-muted)]">{item.check}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold">Where to find it: </dt>
                      <dd className="inline text-[var(--color-ink-muted)]">{item.where}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold">Why it matters: </dt>
                      <dd className="inline text-[var(--color-ink-muted)]">{item.why}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">If something changed</h2>
          <div className="text-18 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              If everything on the list still works for you, you don&apos;t have to do anything.
              Keeping your plan is a fine outcome.
            </p>
            <p>
              If something changed that matters to you, you have until December 7 to pick different
              coverage for January 1. You can compare plans yourself on Medicare.gov, call
              1-800-MEDICARE, talk to a free SHIIP counselor, or sit down with me.
            </p>
            <p>
              Stuck on a word in your letter?{" "}
              <Link href="/medicare-glossary" className="underline underline-offset-2">
                Medicare terms explained simply
              </Link>
              . Want the national numbers for next year?{" "}
              <Link href="/medicare-costs-2027" className="underline underline-offset-2">
                Medicare costs 2027
              </Link>
              . Need to check a doctor?{" "}
              <Link href="/keep-my-doctor" className="underline underline-offset-2">
                Keep my doctor
              </Link>
              .
            </p>
          </div>
          <GuideTownLinks heading="Personal Medicare help near you" />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions I get about Annual Enrollment</h2>
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
        heading="Want a second set of eyes on your list?"
        body="Bring your ANOC letter, your prescriptions, and your doctors' names. We'll go down this checklist together, in person or by phone, before December 7. Free consultation, no obligation to change anything."
        href="/start?topic=medicare&quick=1"
        label="Request a free consultation →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-17 mb-8 leading-relaxed text-[var(--color-ink-muted)]">
          For how the fall window works and what a review with me looks like, see{" "}
          <Link href="/aep" className="underline underline-offset-2">
            Medicare Annual Enrollment
          </Link>
          . For free, unbiased counseling with no sales angle, see{" "}
          <Link href="/medicare-help-directory" className="underline underline-offset-2">
            our free Medicare help directory
          </Link>
          . Open enrollment is also scam season, so keep the{" "}
          <Link href="/medicare-scam-alert" className="underline underline-offset-2">
            Medicare scam alert
          </Link>{" "}
          handy.
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed={REVIEWED} />
      <RelatedMedicareGuides />
    </main>
  );
}
