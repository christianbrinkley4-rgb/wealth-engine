import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Medicare Changes for 2027.
 *
 * The freshness play: for AEP-season queries, recently published or updated
 * pages are outranking established domains right now. Every figure below is
 * from CMS announcements for 2027; sources are linked, nothing is invented,
 * and no plan or carrier is named or recommended.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Changes 2027: What to Know Before Open Enrollment",
  },
  description:
    "Medicare changes for 2027: Part D costs, the drug cap, Advantage premiums, and what to check before December 7. From a licensed Greensboro agent.",
  alternates: { canonical: "/medicare-changes-2027" },
  openGraph: pageOpenGraph({
    title: "Medicare Changes for 2027",
    description:
      "Part D deductible, the drug cost cap, Advantage premiums, and the dates that matter, explained plainly before open enrollment.",
    path: "/medicare-changes-2027",
  }),
};

const CHANGES = [
  {
    t: "Part D deductible: up to $700",
    b: "The maximum Part D deductible rises from $615 in 2026 to $700 in 2027. Plans can set it lower, but none can go above $700. If your plan charges the full deductible, that is what you pay for covered drugs before coverage kicks in.",
  },
  {
    t: "Part D out-of-pocket cap: $2,400",
    b: "The yearly cap on what you pay out of pocket for covered Part D drugs rises from $2,100 to $2,400. Once your spending hits the cap, you pay nothing for covered drugs for the rest of the year. The cap is the single most important number if you take expensive medications.",
  },
  {
    t: "Medicare Advantage average premium: about $12",
    b: "CMS projects the average Medicare Advantage premium falls to roughly $12 a month for 2027. Averages hide a lot, though. Your plan's actual premium, copays, and drug costs are what matter, and those change plan by plan.",
  },
  {
    t: "Star ratings formula changes",
    b: "CMS is adjusting how it calculates plan star ratings. Ratings affect plan bonuses and can signal quality, but a plan's rating is no substitute for checking your own doctors and drugs against it.",
  },
  {
    t: "Marketing rules loosen October 1, 2026",
    b: "Some Medicare marketing restrictions ease starting October 1, 2026, which means you may see more plan advertising this fall. Treat every ad as a starting point, not advice. An ad cannot tell you whether a plan fits your doctors and prescriptions.",
  },
] as const;

const FAQ = [
  {
    q: "What is changing for Medicare in 2027?",
    a: "The big ones: the Part D deductible can go as high as $700 (up from $615), the yearly out-of-pocket cap on covered drugs rises to $2,400 (up from $2,100), the average Medicare Advantage premium is projected around $12 a month, star rating calculations are changing, and some marketing rules loosen starting October 1, 2026. Your own plan's changes are spelled out in the Annual Notice of Change letter it mailed in September.",
  },
  {
    q: "When is open enrollment for 2027 coverage?",
    a: "October 15 through December 7, 2026. Changes you make during that window take effect January 1, 2027. December 7 is a hard deadline, it does not move.",
  },
  {
    q: "Will my plan change in 2027?",
    a: "Probably, in some way. Plans adjust premiums, deductibles, copays, drug lists, and doctor networks every year. Your plan mailed an Annual Notice of Change in September explaining exactly what is different. If you did not read it, bring it to a review and we will go through it together.",
  },
  {
    q: "What should I do before December 7?",
    a: "Three things: make a list of every prescription you take and the pharmacy you use, confirm your doctors and preferred hospital are still in your plan's network for 2027, and compare your total yearly costs, not just the monthly premium. A free review covers all three.",
  },
  {
    q: "Where can I get help with this in Greensboro?",
    a: "I offer free Medicare reviews in Greensboro, High Point, Winston-Salem, and nearby communities, in person or by phone. Call or text (919) 408-6671. No obligation to enroll in anything.",
  },
] as const;

export default function MedicareChanges2027Page() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare changes 2027", path: "/medicare-changes-2027" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare Changes for 2027: What You Need to Know Before Open Enrollment",
              description:
                "Part D costs, the out-of-pocket cap, Advantage premiums, and the dates that matter for 2027.",
              path: "/medicare-changes-2027",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare changes 2027" }]}
        eyebrow="Open enrollment: October 15 to December 7, 2026"
        title="What is changing for Medicare in 2027?"
        lede="Every fall brings new numbers for Medicare: what drugs cost, what plans charge, and what your own plan is changing. Here is what CMS has announced for 2027, in plain English, and what to check before the December 7 deadline."
        secondaryHref="/start?topic=medicare&stage=already_on_medicare"
        secondaryLabel="Get a free 2027 review →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The 2027 changes, one by one</h2>
          <p className="text-18 mt-4 leading-relaxed">
            These figures come from the Centers for Medicare and Medicaid Services (CMS)
            announcements for 2027. Your own plan may differ from the national averages, which is
            why the letter your plan mailed in September matters more than any headline.
          </p>
          <ol className="mt-8 flex flex-col gap-6">
            {CHANGES.map((item, index) => (
              <li key={item.t} className="flex gap-5 border-t border-gray-300 pt-5">
                <span className="text-18 flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">{item.t}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {item.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            Want the figures without the explanation?{" "}
            <Link href="/medicare-numbers-2027" className="underline underline-offset-2">
              Here are the 2027 Medicare numbers at a glance
            </Link>
            . Wondering what the drug changes mean for your prescriptions?{" "}
            <Link href="/medicare-part-d-donut-hole-2027" className="underline underline-offset-2">
              Here is how Part D works in 2027
            </Link>
            .
          </p>
          <p className="text-16 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            Sources: CMS 2027 Medicare Advantage and Part D announcements;{" "}
            <Link
              href="https://www.cms.gov/newsroom/fact-sheets"
              className="underline underline-offset-2"
            >
              CMS newsroom fact sheets
            </Link>
            . Figures are national; your plan&apos;s details are in its Annual Notice of Change.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Your plan&apos;s letter matters more</h2>
          <p className="text-18 mt-4 leading-relaxed">
            In September, your plan mailed an Annual Notice of Change: a letter spelling out exactly
            what is different for 2027. Premiums, deductibles, copays, drug lists, doctor networks.
            Any of it can change on January 1.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Most people never read it. It is long and dense, and it does not tell you what to{" "}
            <em>do</em>. Bring it to me and I will translate it into plain English, then we check
            your drugs and doctors against it. If your plan still looks good, I will tell you so.{" "}
            <Link href="/anoc" className="underline underline-offset-2">
              What the ANOC letter actually says
            </Link>
            .
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask me about 2027</h2>
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
        heading="Let's check what 2027 means for you"
        body={`We will go through your plan's changes, your prescriptions, and your doctors before December 7. The review is free, with no obligation to enroll. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=already_on_medicare"
        label="Request a free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
