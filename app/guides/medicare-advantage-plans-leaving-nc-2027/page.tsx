import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { GuideCapture } from "@/app/components/GuideCapture";
import { StandaloneRelatedLinks } from "@/app/components/StandaloneRelatedLinks";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Medicare Advantage plans leaving North Carolina in 2027.
 *
 * Targets "medicare advantage plans leaving north carolina 2027". Only
 * verified exits are named: Humana (~600k members), UnitedHealthcare
 * (~390k members), Sentara's NC exit, CarolinaEast network exits. No
 * speculation about which specific plans are leaving the Triad. Readers
 * are directed to check their own ANOC or non-renewal letter.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Advantage Plans Leaving North Carolina in 2027: What to Do",
  },
  description:
    "Some Medicare Advantage plans are ending for 2027. How to tell if yours is affected, what your options are, and the deadlines that matter.",
  alternates: { canonical: "/guides/medicare-advantage-plans-leaving-nc-2027" },
  openGraph: pageOpenGraph({
    title: "Medicare Advantage plans leaving North Carolina in 2027",
    description:
      "Which exits are verified, how to read your plan's letter, and what to do before December 7.",
    path: "/guides/medicare-advantage-plans-leaving-nc-2027",
  }),
  twitter: pageTwitter({
    title: "Medicare Advantage plans leaving North Carolina in 2027",
    description:
      "Which exits are verified, how to read your plan's letter, and what to do before December 7.",
    path: "/guides/medicare-advantage-plans-leaving-nc-2027",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Which Medicare Advantage plans are leaving North Carolina in 2027?",
    a: "Nationally, Humana is ending plans covering about 600,000 members and UnitedHealthcare is discontinuing plans covering about 390,000 members for 2027. In North Carolina, Sentara Health Plans already left the Medicare Advantage market effective the end of 2025. Whether a specific plan in your county is affected depends on your carrier's service area decisions. Your plan's letter is the only reliable source for your situation.",
  },
  {
    q: "How do I know if my plan is ending?",
    a: "If your plan is ending, you get a non-renewal notice by early October. If your plan is continuing, you get an Annual Notice of Change by September 30 explaining next year's costs and benefits. If you are not sure which letter you received, call the member services number on your plan card.",
  },
  {
    q: "What happens if my plan ends and I do nothing?",
    a: "You return to Original Medicare on January 1. You can still join another Medicare Advantage plan or a standalone Part D drug plan through the last day of February. But waiting means you choose under pressure, so it is better to pick during Annual Enrollment, October 15 through December 7.",
  },
  {
    q: "Can I get a Medigap plan if my Advantage plan ends?",
    a: "Usually yes. When your Medicare Advantage plan ends, you get a guaranteed right to buy certain Medigap plans without medical underwriting. You can apply as early as 60 days before your coverage ends and no later than 63 days after. This is one of the few times Medigap is guaranteed, so it is worth considering even if you end up choosing another Advantage plan.",
  },
  {
    q: "My hospital left my plan's network. Is that the same as my plan ending?",
    a: "No, but it can feel just as disruptive. A network exit means your doctors or hospital are no longer in network, while your plan itself continues. In eastern North Carolina, CarolinaEast Medical Center left the BCBS NC Medicare Advantage network in July 2026 and leaves the UnitedHealthcare network at the end of 2026. If your providers leave your network, Annual Enrollment is your chance to switch to a plan that includes them.",
  },
  {
    q: "Are there really counties with no Medicare Advantage plans in 2027?",
    a: "Yes. About 181 counties nationwide will have no Medicare Advantage plans in 2027, up from 67 this year. If your county is one of them, Original Medicare plus a standalone Part D drug plan is your path. Medigap is worth a serious look in that situation.",
  },
];

export default function PlansLeavingNc2027Page() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/medicare-advantage-plans-leaving-nc-2027" },
              { name: "Plans leaving NC in 2027", path: "/guides/medicare-advantage-plans-leaving-nc-2027" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare Advantage Plans Leaving North Carolina in 2027: What to Do",
              description:
                "Verified 2027 Medicare Advantage exits, how to read your plan's letter, and what to do before December 7.",
              path: "/guides/medicare-advantage-plans-leaving-nc-2027",
              datePublished: "2026-10-13",
              dateModified: "2026-10-13",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Guides" },
          { name: "Plans leaving NC in 2027" },
        ]}
        eyebrow="Guide · Updated October 13, 2026"
        title="Medicare Advantage plans leaving North Carolina in 2027"
        lede="Some plans are ending for 2027. Here is what is verified, how to tell if yours is affected, and what to do about it."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Get a free plan review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              For 2027, Humana is ending plans covering about 600,000 members nationally and
              UnitedHealthcare is discontinuing plans covering about 390,000. In North Carolina,
              Sentara already left the Medicare Advantage market, and CarolinaEast Medical Center
              has left or is leaving major carrier networks. If your plan is ending, you got a
              non-renewal letter by early October. Annual Enrollment, October 15 through
              December 7, is your window to pick something better.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">What is actually happening</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The Medicare Advantage market is shrinking for 2027. Carriers are pulling back from
            less profitable plans and counties instead of chasing enrollment growth. The average
            beneficiary can choose from about 35 plans in 2027, down from 39 in 2026. About 181
            counties nationwide will have no Medicare Advantage plans at all, up from 67 this
            year.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The two biggest national exits: Humana is ending plans that cover roughly 600,000
            members, and UnitedHealthcare is discontinuing plans covering roughly 390,000 members.
            Neither company is leaving Medicare entirely. Both are still selling plans in thousands
            of counties. But for the people in the discontinued plans, a specific plan is ending
            in their county, and they have to choose something else.
          </p>

          <h2 className="text-28 mt-12 font-semibold">What is happening in North Carolina specifically</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Two North Carolina developments are worth knowing about. Sentara Health Plans
            discontinued its Medicare Advantage plans in North Carolina effective the end of
            2025. Members had to find replacement coverage during the 2025 open enrollment.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Separately, CarolinaEast Medical Center in New Bern exited the Blue Cross Blue Shield
            of North Carolina Medicare Advantage network in July 2026, and it leaves the
            UnitedHealthcare Medicare Advantage network at the end of 2026. That is a hospital
            leaving carrier networks, not a plan ending, but the effect on members is similar: if
            CarolinaEast is your hospital, your current plan may no longer cover it in network.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I cannot tell you from here whether a specific plan in Guilford, Forsyth, or
            Randolph County is ending. Carriers make those decisions county by county, and the
            only reliable source for your situation is your own plan&apos;s letter. Anyone who
            tells you otherwise without seeing your letter is guessing.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Which letter did you get</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            This is the most important thing to sort out. There are two different letters, and
            they mean very different things:
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">Annual Notice of Change.</strong>{" "}
              Sent by September 30. This means your plan continues into 2027, but costs,
              benefits, or networks may change. Read it carefully. A plan that continues can
              still get worse.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Non-renewal notice.</strong>{" "}
              Sent by early October. This means your plan is ending on December 31. You must
              choose something else.
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you are not sure which one you received, call the member services number on your
            plan card and ask directly. Do not guess.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Your options if your plan is ending</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            You have three paths, and Annual Enrollment (October 15 through December 7) is the
            time to choose:
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">Join another Medicare Advantage plan.</strong>{" "}
              Compare what is available in your county. Check that your doctors and hospital are
              in the new plan&apos;s network, and compare drug coverage if you take
              prescriptions.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Return to Original Medicare.</strong>{" "}
              If you do nothing, this is where you land on January 1. You can still add a
              standalone Part D drug plan, and you have through the last day of February to join
              another Advantage plan if you change your mind.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Original Medicare plus Medigap.</strong>{" "}
              A plan ending gives you a guaranteed right to buy certain Medigap plans without
              medical underwriting. You can apply as early as 60 days before your coverage ends
              and up to 63 days after. This is one of the rare times Medigap is guaranteed, so
              give it real consideration even if you lean toward another Advantage plan.
            </li>
          </ul>

          <h2 className="text-28 mt-12 font-semibold">Your options if your plan continues but got worse</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            A continuing plan can still raise your premium, drop your doctors, cut supplemental
            benefits, or raise drug costs. Read the Annual Notice of Change line by line. If the
            2027 version of your plan no longer fits, Annual Enrollment is the same window to
            switch. You do not need your plan to end to leave it.
          </p>

          <h2 className="text-28 mt-12 font-semibold">What not to do</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Do not wait until December to open the letter. Do not assume your plan is fine
            because it was fine last year. And do not pick a replacement based on a TV
            commercial or a $0 premium alone. Check the provider directory for your doctors, the
            drug formulary for your prescriptions, and the out-of-pocket maximum for a bad
            health year.{" "}
            <Link href="/aep" className="underline underline-offset-2">
              Here is how Annual Enrollment works
            </Link>
            , and{" "}
            <Link href="/turning-65" className="underline underline-offset-2">
              the turning 65 guide covers the basics
            </Link>{" "}
            if any of the terminology is new.
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common questions</h2>
          <dl className="mt-8 flex flex-col gap-6">
            {FAQS.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-5">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            Got a letter from your plan and not sure what it means? Call or text Christian
            Brinkley in Greensboro, NC at {AGENT.phone}. I will read it with you. The review is
            free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="medicare-advantage-plans-leaving-nc-2027" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Plan ending? Let's find your next one"
        body={`Bring your letter and your prescription list. I will compare your options side by side before December 7. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&quick=1"
        label="Request a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
    </main>
  );
}
