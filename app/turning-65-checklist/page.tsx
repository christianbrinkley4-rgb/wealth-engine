import type { Metadata } from "next";
import { ChecklistPointer, ReadNext } from "@/app/components/ReadNext";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LeadCluster } from "@/app/components/LeadCluster";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Lead magnet: "The Turning-65 Checklist". A focused, actionable checklist
 * for people approaching 65 in the Triad. Linked from social posts and used
 * as the QR destination on print. Distinct from /turning-65 (the deep guide):
 * this is the scannable, do-this-next version.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Turning 65 Checklist: 8 Steps Before Your 65th Birthday",
  },
  description:
    "Turning 65? The 8-step Medicare checklist a licensed Greensboro agent walks through with every new client. Free, no call center.",
  alternates: { canonical: "/turning-65-checklist" },
  openGraph: pageOpenGraph({
    title: "The Turning-65 Checklist: 8 steps before your 65th birthday",
    description:
      "Your Initial Enrollment Period, the Part B decision, the one-time Medigap window, and the penalty traps. From a licensed agent in Greensboro.",
    path: "/turning-65-checklist",
  }),
};

const STEPS = [
  {
    t: "Mark your 7-month Initial Enrollment Period on the calendar",
    b: "Your Initial Enrollment Period covers seven months: the three months before the month you turn 65, your birthday month, and the three months after. If your birthday falls on the first of the month, everything shifts one month earlier. Write the actual dates down. Knowing this window cold is what keeps the rest of the process on track.",
  },
  {
    t: "Decide: are you still working with employer coverage?",
    b: "If you are 65, still working, and covered by an employer group plan with 20 or more employees, you can usually delay Part B without a late penalty. When the job or the coverage ends, you get an 8-month Special Enrollment Period. But COBRA and retiree coverage do not count as active employment coverage. If the company has fewer than 20 employees, you generally need to enroll at 65. Get this decision right before you do anything else, because it drives every step below.",
  },
  {
    t: "Sign up for Part A",
    b: "Part A (hospital insurance) is premium-free for most people who paid Medicare taxes for at least 10 years. There is rarely a reason to delay it. You can enroll online at ssa.gov, by phone, or in person at a Social Security office. If you are already receiving Social Security benefits, you will be enrolled automatically.",
  },
  {
    t: "Make the Part B decision carefully",
    b: "Part B (medical insurance) has a monthly premium, and the late enrollment penalty is 10% of the premium for every 12-month period you were eligible but did not enroll, and it lasts as long as you have Part B. This is the penalty that actually sticks. If you are delaying because of employer coverage, confirm the coverage qualifies (see step 2). If you are not sure, ask before your window closes, not after.",
  },
  {
    t: "Choose your path: Original Medicare plus supplements, or Medicare Advantage",
    b: "You have two main ways to get your coverage. Original Medicare (Parts A and B) plus a Medigap supplement plus a Part D drug plan, or a Medicare Advantage plan (Part C) that bundles things together. Neither is right for everyone. Medigap gives you predictable costs and any-doctor flexibility. Advantage often has lower premiums and extra benefits but works through networks. This is the decision worth sitting down over, not making from a TV commercial.",
  },
  {
    t: "Do not miss the Medigap open enrollment window",
    b: "This is the one people miss most often. When you are 65 or older and enrolled in Part B, you get a one-time 6-month Medigap open enrollment period. During it, insurers cannot deny you or charge more because of health problems. Outside this window, they can ask health questions and turn you down in most states. If you think you might ever want Medigap, this window is the time.",
  },
  {
    t: "Line up your prescriptions",
    b: "Whether you go the Part D route or an Advantage plan with drug coverage, pull your current medication list and check each drug against the plan's formulary. Drug lists change every year, and a medication that is affordable on one plan can be expensive or uncovered on another. Bring the actual list, with dosages, to any enrollment conversation.",
  },
  {
    t: "Confirm your doctors are covered",
    b: "Before you enroll in anything with a network, verify your primary care doctor, your specialists, and your preferred hospital are in that specific plan's network. 'Takes Medicare' and 'in my plan's network' are two different things. Call the doctor's office and ask about the plan by name, or check the plan's provider directory and then confirm by phone.",
  },
] as const;

const FAQ = [
  {
    q: "When should I start working on this?",
    a: "Three months before the month you turn 65. That is when your Initial Enrollment Period opens, and starting then gives you time to compare options without rushing. If you are delaying Part B because of employer coverage, start the conversation about a month before that coverage ends.",
  },
  {
    q: "I am still working at 65. Do I need to do anything?",
    a: "Maybe not right away, but do not assume. If your employer has 20 or more employees and you are on the group health plan, you can usually delay Part B without penalty. If the company is smaller, or you are on COBRA or retiree coverage, the normal enrollment rules apply. Confirm your situation before your Initial Enrollment Period ends.",
  },
  {
    q: "What does Medicare actually cost?",
    a: "It depends on your choices. Part A is usually free. Part B has a monthly premium. Then there is either a Medigap premium plus a Part D premium, or a Medicare Advantage premium (many are low or $0, but you still pay the Part B premium). There is a full breakdown on the Medicare costs page.",
  },
  {
    q: "Can I change my mind after I enroll?",
    a: "Sometimes. The Annual Enrollment Period (October 15 to December 7) lets you change plans every fall. But Medigap is the exception: outside your one-time open enrollment window, switching Medigap plans can mean medical underwriting. Choose carefully the first time.",
  },
  {
    q: "Do I need a local agent, or can I just do this myself?",
    a: "You can absolutely enroll yourself through Medicare.gov or Social Security. A licensed local agent does not charge you anything (we are paid by the insurance companies) and can walk through the tradeoffs with you in person. I do this for folks across the Triad every week. Either way, do not make the decision from a commercial alone.",
  },
] as const;

export default function Turning65ChecklistPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Turning 65", path: "/turning-65" },
              { name: "Checklist", path: "/turning-65-checklist" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "The Turning-65 Checklist: 8 Steps Before Your 65th Birthday",
              description:
                "The 8-step Medicare checklist for people turning 65 in the Piedmont Triad: enrollment dates, the Part B decision, the Medigap window, and the penalty traps.",
              path: "/turning-65-checklist",
              datePublished: "2026-10-03",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToJsonLd({
              name: "How to prepare for Medicare when turning 65",
              description:
                "The eight-step checklist: enrollment dates, employer coverage, Part A and B, choosing a path, the Medigap window, prescriptions, and doctors.",
              path: "/turning-65-checklist",
              steps: STEPS.map((step) => ({ name: step.t, text: step.b })),
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Turning 65", href: "/turning-65" },
          { name: "Checklist" },
        ]}
        eyebrow="Piedmont Triad · Greensboro, High Point, Winston-Salem"
        title="The Turning-65 Checklist: 8 steps before your 65th birthday"
        lede="Turning 65 comes with a pile of mail and a lot of noise. This is the checklist I walk through with people before their 65th birthday. Print it, work it top to bottom, and you will know exactly where you stand."
        secondaryHref="/schedule?topic=medicare"
        secondaryLabel="Walk through it with me →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">
            Turning 65 triggers a lot of mail and a lot of noise. Most of it is marketing. This
            checklist is the actual sequence that matters: the dates, the decisions, and the two
            windows you only get once. Work it in order. If you want the deeper explanation behind
            any step,{" "}
            <Link href="/turning-65" className="underline underline-offset-2">
              the full turning-65 guide
            </Link>{" "}
            has it.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I&apos;m Christian Brinkley, a licensed Medicare agent here in Greensboro. I do not
            charge for this help. If you get stuck on any step,{" "}
            <Link href="/schedule?topic=medicare" className="underline underline-offset-2">
              book a free walkthrough
            </Link>{" "}
            or call me at {AGENT.phone}.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Want a copy to print and write on?{" "}
            <a
              href="/turning-65-checklist.pdf"
              download
              className="font-semibold underline underline-offset-2"
            >
              Download the checklist (PDF, 2 pages)
            </a>
            . It has room for your dates, doctors, prescriptions, and questions.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The 8-step checklist</h2>
          <ol className="mt-8 flex flex-col gap-6">
            {STEPS.map((item, index) => (
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
            Step 5 is the big fork in the road. If you want the full comparison,{" "}
            <Link href="/advantage-vs-medigap" className="underline underline-offset-2">
              here is Advantage versus Medigap in plain English
            </Link>
            . And for the real dollar picture,{" "}
            <Link href="/medicare-costs" className="underline underline-offset-2">
              here is what Medicare costs
            </Link>
            , and{" "}
            <Link href="/medicare-numbers-2027" className="underline underline-offset-2">
              here are the 2027 numbers at a glance
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Gather these before you start</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Enrollment goes much faster with the paperwork in one place. Pull these together before
            you apply or sit down with anyone:
          </p>
          <ul className="mt-6 flex list-disc flex-col gap-3 pl-6">
            <li className="text-17 leading-relaxed">
              Your Social Security card and a government photo ID. You will need both to enroll
              through Social Security.
            </li>
            <li className="text-17 leading-relaxed">
              Your current health insurance card and a summary of the plan, so we can confirm
              whether it counts as creditable coverage if you are delaying Part B.
            </li>
            <li className="text-17 leading-relaxed">
              A list of every prescription with dosages and the pharmacy you use. Drug lists decide
              more about your costs than almost anything else.
            </li>
            <li className="text-17 leading-relaxed">
              The names of your doctors, specialists, and preferred hospital, so each can be checked
              against a plan&apos;s network.
            </li>
            <li className="text-17 leading-relaxed">
              If you are still working: proof of your employer coverage and your employment start
              date, in case you need a Special Enrollment Period later.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The two windows you only get once</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Two of these steps deserve a second look, because they do not come back. Your Initial
            Enrollment Period is a one-time seven months. Your Medigap open enrollment is a one-time
            six months. Miss the first and you can face late penalties. Miss the second and an
            insurer can ask about your health before selling you a supplement. Everything else on
            this list can be revisited. Those two cannot.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Common questions</h2>
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
          <GuideTownLinks />
          <LeadCluster
            current="/turning-65-checklist"
            heading="Keep reading, or get help with the checklist"
          />
        </div>
      </section>

      <ReadNext>
        <ChecklistPointer />
      </ReadNext>
      <KitchenTableClose
        heading="Work the checklist with me"
        body="Bring your 65th birthday month and your current insurance card. We will walk all eight steps together, free, no obligation, about 30 minutes."
        href="/schedule?topic=medicare"
        label="Book my free walkthrough →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
