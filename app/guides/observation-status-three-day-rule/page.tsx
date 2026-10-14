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
 * Observation status and the 3-day rule.
 *
 * Federal Original Medicare rules. The skilled nursing coinsurance figure is
 * left off on purpose; the costs page carries the yearly amounts.
 */

const PATH = "/guides/observation-status-three-day-rule";

export const metadata: Metadata = {
  title: {
    absolute: "Observation Status and Medicare's 3-Day Rule, Explained",
  },
  description: "You can spend nights in a hospital bed and still not be an inpatient. Here's how observation status works and why it can affect skilled nursing coverage.",
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Observation status and the 3-day rule: why your hospital stay matters",
    description: "A night in a hospital bed doesn't always count as an inpatient stay. Here's what observation status means for your bill and for rehab coverage afterward.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Observation status and the 3-day rule: why your hospital stay matters",
    description: "A night in a hospital bed doesn't always count as an inpatient stay. Here's what observation status means for your bill and for rehab coverage afterward.",
    path: PATH,
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "What is observation status in a hospital?",
    a: "Observation status means you're being treated as a hospital outpatient while doctors decide whether to admit you or send you home. You can be in a regular hospital room overnight and still be under observation.",
  },
  {
    q: "What is Medicare's 3-day rule?",
    a: "Under Original Medicare, skilled nursing facility care is covered only after a qualifying hospital stay of three days in a row as an inpatient. The day you're discharged doesn't count, and neither does time in the emergency room or under observation.",
  },
  {
    q: "How do I know if I'm an inpatient or under observation?",
    a: "Ask your doctor or nurse directly. If you get observation services for more than 24 hours, the hospital must also give you a written notice called the Medicare Outpatient Observation Notice, which says you're an outpatient.",
  },
  {
    q: "Does observation status cost more than being admitted?",
    a: "It depends. Observation is billed under Part B, so you generally pay 20% for doctor services and a copay for each outpatient service. An inpatient stay is billed under Part A with one deductible per benefit period. Either one can come out higher.",
  },
  {
    q: "Do Medicare Advantage plans follow the 3-day rule?",
    a: "Not always. Medicare Advantage plans can waive the three-day inpatient requirement for skilled nursing care, and some do. Many also require prior authorization. Check your plan's Evidence of Coverage or call the plan.",
  },
];

export default function ObservationStatusThreeDayRulePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: PATH },
              { name: "Observation status", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Observation Status and Medicare's 3-Day Rule, Explained",
              description: "You can spend nights in a hospital bed and still not be an inpatient. Here's how observation status works and why it can affect skilled nursing coverage.",
              path: PATH,
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
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }, { name: "Observation status" }]}
        eyebrow="Guide · Updated October 13, 2026"
        title={"Observation status and the 3-day rule: why your hospital stay matters"}
        lede={"You can sleep in a hospital bed for two or three nights and never be admitted. It's called observation status. It changes how you're billed, and it can decide whether Medicare pays for rehab afterward."}
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free consultation"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              {"Under Original Medicare, skilled nursing facility care is only covered after you've been a hospital inpatient for three days in a row, not counting the day you leave. Time under observation doesn't count toward those three days, even if you stayed overnight. If you're in the hospital, ask whether you've been admitted as an inpatient."}
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">{"Inpatient and observation are two different things"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"When you're in the hospital, you're in one of two categories. You're an inpatient once a doctor writes an order to admit you. Until then, you're an outpatient, even if you're in a room upstairs with a wristband on."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Observation is outpatient care. The hospital is watching you and running tests to decide whether you need to be admitted or can go home. It can last a few hours or run past a night or two. From the bed, it looks exactly the same as being admitted. On paper, it isn't."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"Why it changes your bill"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Medicare pays for the two categories out of different parts."}
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Inpatient stays fall under Part A."}</strong>{" "}
              {"You pay the Part A hospital deductible for the benefit period, and that generally covers the first 60 days."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Observation falls under Part B."}</strong>{" "}
              {"You typically pay 20% of the Medicare-approved amount for the doctor's services, plus a copay for each outpatient hospital service, after the Part B deductible."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Your regular medicines may be billed separately."}</strong>{" "}
              {"Drugs you'd normally take at home, given to you during an outpatient stay, often aren't covered by Part B. If you have Part D, you may be able to file a claim with your drug plan afterward."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Sometimes observation costs you less than an inpatient stay. Sometimes it costs more. The bigger issue for most families is what comes next."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"The 3-day rule"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"After a hospital stay, a lot of people need a few weeks of rehab in a skilled nursing facility. Original Medicare covers that only if you had a qualifying hospital stay first. That means three days in a row as an inpatient. The day you're discharged doesn't count. Time in the emergency room and time under observation don't count either."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Here's how that plays out. Say someone falls, goes to the ER on Monday night, and is kept under observation until Wednesday. She's admitted as an inpatient Wednesday and discharged to rehab on Friday. She was in the hospital four nights. But only Wednesday and Thursday count as inpatient days. That's two days, not three, so Original Medicare wouldn't cover the skilled nursing stay."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"That's the trap. The family counts nights. Medicare counts inpatient days."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"The notice to watch for"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If you receive observation services for more than 24 hours, the hospital has to give you a written notice. It's called the Medicare Outpatient Observation Notice, and people usually just call it the MOON. It tells you that you're an outpatient and explains what that can mean for your costs and for skilled nursing coverage."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If someone hands you that form, it's your cue to ask questions. Don't sign it and set it aside."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"What to do while you're in the hospital"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Ask the question directly."}</strong>{" "}
              {"Each day, ask the nurse or doctor whether you're an inpatient or under observation. Have a family member ask if you're not up to it."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Ask the doctor why."}</strong>{" "}
              {"The decision is a medical one, based on how long the doctor expects you to need hospital care. If you think you belong as an inpatient, ask your doctor to explain or reconsider."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Talk to the case manager before discharge."}</strong>{" "}
              {"If rehab is being discussed, ask whether you have a qualifying three-day inpatient stay. If you don't, ask what your options are and what each would cost."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Keep the paperwork."}</strong>{" "}
              {"Hold on to the MOON and your discharge papers. They show your status and dates."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If the hospital changes you from inpatient to observation during your stay, ask whether you have a right to appeal that change. In some cases you do."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"If you have a Medicare Advantage plan"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Medicare Advantage plans set their own rules here. Some waive the three-day requirement for skilled nursing care, and many require prior authorization before a rehab stay. Don't assume either way. Call the number on your plan card, or look in your Evidence of Coverage under skilled nursing facility care."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"This is one of the things worth checking when you review your coverage each fall. I cover how that review works on the "}
            <Link href="/aep" className="underline underline-offset-2">
              {"Annual Enrollment page"}
            </Link>
            {". For what Medicare does and doesn't pay for after rehab ends, see "}
            <Link href="/guides/medicare-in-home-care" className="underline underline-offset-2">
              {"does Medicare pay for in-home care"}
            </Link>
            {"."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If you want to go over how your current coverage would handle a hospital stay, "}
            <Link href="/start?topic=medicare&quick=1" className="underline underline-offset-2">
              {"book a free consultation"}
            </Link>
            {". It's easier to sort out at home than from a hospital room."}
          </p>
          <p className="text-16 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            {"Sources, checked October 13, 2026: "}
            <a href="https://www.medicare.gov/coverage/skilled-nursing-facility-snf-care" rel="noopener" className="underline underline-offset-2">
              {"Medicare.gov: skilled nursing facility care"}
            </a>
            {"."}
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
            {"Want to know how your coverage handles a hospital stay?"} Call or text Christian Brinkley in Greensboro, NC at {AGENT.phone}.
            The consultation is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="observation-status-three-day-rule" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading={"Know your coverage before you need it"}
        body={`${"Bring your plan card or your Medicare Supplement policy. We'll look at what a hospital stay and rehab would cost you under the coverage you have now."} Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&quick=1"
        label="Request a free consultation"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
    </main>
  );
}
