import { PRIORITY_MEDICARE_FAQS } from "@/lib/priorityMedicareFaqs";
import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { TrafficGuideLinks } from "@/app/components/TrafficGuideLinks";
import { MedicareByline } from "@/app/components/MedicareByline";
import { MedicareFactBlock } from "@/app/components/MedicareFactBlock";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import { ChecklistPointer, ReadNext } from "@/app/components/ReadNext";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LeadCluster } from "@/app/components/LeadCluster";
import { ServiceHero } from "@/app/components/ServiceHero";
import { EngineContact } from "@/components/EngineContact";
import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import "@/app/lead-engine.css";
import { AEP_HERO_TITLES, aepPhase } from "@/lib/aep";
import { AGENT } from "@/lib/agent";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";

/**
 * The 2026 Annual Enrollment campaign landing page.
 *
 * Evergreen /annual-enrollment teaches the window; this page is the seasonal
 * front door, what a fall review covers, how it works, and how to book one.
 * Copy drafted from the AEP 2026 content pack, in Christian's voice.
 */

/**
 * Revalidate hourly so the AEP phase headline flips near the Oct 15 / Dec 7
 * boundaries without a redeploy.
 */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Annual Enrollment 2027 | Free Review in Greensboro",
  },
  description:
    "Medicare Annual Enrollment runs Oct 15 to Dec 7. Free no-pressure review of your 2027 coverage with licensed local agent Christian Brinkley in Greensboro.",
  alternates: { canonical: "/aep" },
  openGraph: pageOpenGraph({
    title: "Medicare Annual Enrollment for 2027 coverage | Free fall review in Greensboro NC",
    description:
      "Oct 15 to Dec 7: review your 2027 Medicare coverage with a licensed local agent. Free, no pressure, no call center.",
    path: "/aep",
  }),
  twitter: pageTwitter({
    title: "Medicare Annual Enrollment for 2027 coverage | Free fall review in Greensboro NC",
    description:
      "Oct 15 to Dec 7: review your 2027 Medicare coverage with a licensed local agent. Free, no pressure, no call center.",
    path: "/aep",
  }),
};

const CHECKS = [
  {
    t: "Your plan's 2027 changes",
    b: "What your Annual Notice of Change actually says, in plain English: premiums, deductibles, copays, and anything else that's different next year.",
  },
  {
    t: "Your prescriptions",
    b: "Check each medicine, its dose, your pharmacy, and any coverage requirements against the coming year's plan documents.",
  },
  {
    t: "Your doctors",
    b: 'Whether your doctors and preferred hospitals are still in your plan\'s network for 2027. "Takes Medicare" and "in my plan\'s network" are two different things.',
  },
  {
    t: "Your total costs",
    b: "Compare the premium, deductible, copays, and coinsurance with the care and prescriptions you expect to use.",
  },
  {
    t: "Your drug plan",
    b: "If you have a standalone Part D plan, review its coming-year premium, covered medicines, pharmacy options, and expected costs.",
  },
] as const;

const STEPS = [
  {
    t: "You reach out",
    b: `Send a quick request, or call me at ${AGENT.phone}. Tell me a time that works for you.`,
  },
  {
    t: "I listen to your questions",
    b: "In person around Greensboro, or by phone if that's easier. Bring your plan letter and your medication list if you have them.",
  },
  {
    t: "I walk you through your options",
    b: "In plain language. I answer your questions. You decide.",
  },
  {
    t: "That's it",
    b: "There's no fee for the conversation and no obligation to enroll or change your coverage.",
  },
] as const;

const FAQ = PRIORITY_MEDICARE_FAQS.aep;

const LOCAL_FAQ = [
  {
    q: "Where can I meet you for a review in Greensboro?",
    a: "We can arrange a conversation at your home in Greensboro or Guilford County, a convenient public place, or by phone. You can bring a family member and your questions.",
  },
  {
    q: "Do you help people outside Greensboro?",
    a: "Yes. I meet with folks across the Piedmont Triad, including High Point, Winston-Salem, and Kernersville, plus Granville County towns like Oxford and Creedmoor. Phone reviews work the same wherever you are in North Carolina.",
  },
  {
    q: "Are Medicare Advantage plans the same in Guilford County as in Forsyth County?",
    a: "Not always. Plan availability and costs can differ by county, so a plan your friend in Winston-Salem has may not be offered at your Greensboro address. A review checks what is actually available where you live.",
  },
] as const;

const ALL_FAQ = [...FAQ, ...LOCAL_FAQ];

/**
 * Renders an FAQ answer, upgrading the turning-65 answer's guide mention to a
 * real link. The JSON-LD keeps the plain-text version, which is what the
 * schema expects.
 */
function FaqAnswer({ item }: { item: (typeof ALL_FAQ)[number] }) {
  return <>{item.a}</>;
}

export default function AepPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Annual enrollment for 2027", path: "/aep" },
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
                "Medicare Annual Enrollment for 2027 coverage: free fall review in Greensboro NC",
              description:
                "What a free fall review covers: your plan's 2027 changes, prescriptions, doctors, and total costs, with a licensed local agent.",
              path: "/aep",
              datePublished: "2026-09-19",
              dateModified: "2026-10-15",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Medicare Annual Enrollment 2027 coverage review",
              description:
                "A free fall review of your plan's 2027 changes, prescriptions, doctors, and total costs with a licensed local agent in Greensboro.",
              path: "/aep",
            }),
          ),
        }}
      />

      <ServiceHero
        variant="compact"
        crumbs={[{ name: "Home", href: "/" }, { name: "Annual enrollment for 2027" }]}
        eyebrow="October 15 to December 7, 2026 · Piedmont Triad"
        title={AEP_HERO_TITLES[aepPhase()]}
        lede="Annual Enrollment runs October 15 through December 7. Talk with Christian Brinkley about your 2027 doctors, prescriptions, and costs. Free, in person or by phone."
        secondaryHref="#request-review"
        secondaryLabel="Request a Medicare review"
      />

      <section
        id="request-review"
        className="engine shell"
        aria-label="Request a Medicare review"
        style={{ scrollMarginTop: 100 }}
      >
        <p className="engine-eyebrow">I’m 21. I’m a licensed NC insurance agent in Greensboro.</p>
        <div className="engine-grid">
          <EngineContact />
          <aside className="engine-card">
            <h2>Or choose a time to talk</h2>
            <p>
              Bring your plan letter and your questions. We can review what to check for 2027,
              including doctors, prescriptions, and costs.
            </p>
            <a className="engine-button" href={ENGINE_BOOKING_URL}>
              Open my Medicare calendar
            </a>
            <p>No cost for the conversation. No obligation to enroll.</p>
            <p>
              Still organizing your questions?{" "}
              <Link href="/medicare-fit">Try the five-question checklist</Link>.
            </p>
            <p>
              <a href={AGENT.phoneHref}>{AGENT.phone}</a>
            </p>
          </aside>
        </div>
      </section>

      {/* ANOC campaign, the September letter, translated into plain English. */}
      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-navy)] uppercase">
            Your plan&apos;s September letter
          </p>
          <h2 className="text-28 mt-3 font-semibold">
            Got your ANOC letter? Don&apos;t just file it away.
          </h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Every fall, Medicare Advantage plans mail you an Annual Notice of Change, a letter
              explaining what&apos;s different about your plan next year. Your premium, your drug
              costs, your doctor network: any of it can change on January 1, and the letter is how
              you find out.
            </p>
            <p>
              Start with what changes next year. Bring the letter and your questions, and we can go
              through it together.
            </p>
            <p>
              Here&apos;s what to do: bring it to me. I&apos;ll sit down with you, in person or by
              phone, and translate it into plain English. What&apos;s changing, what it costs you,
              and whether it still fits your doctors and prescriptions. Free. No pressure to switch
              plans, no obligation to enroll in anything.
            </p>
            <p>
              If your plan still looks good, I&apos;ll tell you so. If something changed that
              matters to you, I&apos;ll talk through your options before the December 7 deadline.
            </p>
          </div>

          <p className="text-16 mt-4 text-[var(--color-ink-muted)]">
            Free consultation. No obligation to enroll. No call centers, just me.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Why review your plan this fall</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Your Medicare plan doesn&apos;t stay the same from year to year, even if you loved it
              this year. Every fall, plans update their premiums, deductibles, copays, drug lists,
              and doctor networks for the coming year. Your plan sent you a letter in September
              (called an &ldquo;Annual Notice of Change&rdquo;) spelling out exactly what&apos;s
              different for 2027. Bring it with you so I can go through it with you.
            </p>
            <p>
              That&apos;s what a fall review is for. I go through that letter with you, line by
              line, and you decide whether your plan still fits, or whether something else fits
              better. No obligation either way.
            </p>
            <p>
              New to how the fall window works?{" "}
              <Link href="/aep" className="underline underline-offset-2">
                Read the full annual enrollment guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What I check for you</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Bring your current plan information and a list of your prescriptions. I&apos;ll discuss
            what needs checking and arrange any required paperwork before reviewing specific plans:
          </p>
          <ol className="mt-8 flex flex-col gap-6">
            {CHECKS.map((item, index) => (
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
            Wondering what the numbers look like next year?{" "}
            <Link href="/medicare-costs" className="underline underline-offset-2">
              See what Medicare costs
            </Link>
            , and if keeping your doctors is the top priority,{" "}
            <Link href="/keep-my-doctor" className="underline underline-offset-2">
              here&apos;s how to check your plan&apos;s network properly
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">How a review works with me</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Here&apos;s exactly what happens, no surprises:
          </p>
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
            When you reach out, you talk to{" "}
            <Link href="/about" className="underline underline-offset-2">
              Christian Brinkley
            </Link>
            , a licensed insurance agent here in Greensboro and an accounting student at UNCG.
            I&apos;m one person, not a call center, and I personally answer every inquiry.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">
            Open enrollment in Greensboro and Guilford County
          </h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              I am based in Greensboro and serve Guilford County and nearby communities. We can
              arrange a conversation in person or by phone. If you are in{" "}
              <Link href="/medicare-agent-high-point-nc" className="underline underline-offset-2">
                High Point
              </Link>
              ,{" "}
              <Link
                href="/medicare-agent-winston-salem-nc"
                className="underline underline-offset-2"
              >
                Winston-Salem
              </Link>
              , or{" "}
              <Link href="/medicare-agent-kernersville-nc" className="underline underline-offset-2">
                Kernersville
              </Link>
              , I come to you too. Folks in{" "}
              <Link href="/medicare-agent-burlington-nc" className="underline underline-offset-2">
                Burlington
              </Link>{" "}
              get the same help by phone or in person. The review works the same everywhere in the
              Triad.
            </p>
            <p>
              One local detail worth knowing: Medicare Advantage plan lineups can differ between
              Guilford County and neighboring Forsyth County. A plan your friend in Winston-Salem
              mentions may not be available at your Greensboro address, or may cost something
              different. I check availability at your home address, not someone else&apos;s.
            </p>
            <p>
              If your doctors are at Cone Health, Novant, or a private practice in town, bring their
              names. I will confirm each one against next year&apos;s plan documents together, so
              there are no surprises in January.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What happens after December 7</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Annual Enrollment closes on December 7, and any changes you make take effect January
              1. After the 7th, your options to change coverage are limited for the rest of the
              year, so if you want to review your plan, the fall window is the time to do it.
            </p>
            <p>
              If a life change, a move, losing employer coverage, already opened a window for you,
              you may not need to wait for fall.{" "}
              <Link href="/special-enrollment" className="underline underline-offset-2">
                See how special enrollment works
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <MedicareFactBlock heading="Annual Enrollment facts, with sources" />
      </div>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">A quick word on cost</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The consultation is free. If you enroll in a plan through me, the insurance company pays
            me a commission, your premium is exactly the same as if you&apos;d enrolled on your own.
            You just get a local human instead of a 1-800 number.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Questions I get every fall</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {ALL_FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  <FaqAnswer item={item} />
                </dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(ALL_FAQ)) }}
          />
          <GuideTownLinks />
          <LeadCluster current="/aep" heading="Turning 65, or a different Medicare question?" />
        </div>
      </section>

      <ReadNext>
        <p>
          Before you review coverage, read the{" "}
          <Link href="/medicare-changes-2027">2027 changes</Link> and the{" "}
          <Link href="/medicare-part-d-donut-hole-2027">Part D cap explanation</Link>, then work
          through the <Link href="/aep-checklist">Annual Enrollment checklist</Link>. If your plan
          is not renewing, see the{" "}
          <Link href="/guides/medicare-plan-not-renewing-triad">Triad checklist</Link>.
        </p>
        <ChecklistPointer />
      </ReadNext>

      <KitchenTableClose
        heading="Request your free fall review"
        body="Call me or send a request for a free conversation about your Medicare questions. I'll arrange any required appointment paperwork before I discuss specific plans. No obligation to enroll."
        href="#request-review"
        label="Request a free consultation"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-12" />
      <TrafficGuideLinks
        slugs={[
          "medicare-plan-not-renewing-triad",
          "medicare-dual-eligible-snp-triad",
          "medicare-part-b-giveback-plans",
          "medicare-advantage-open-enrollment-period",
        ]}
      />
      <RelatedMedicareGuides />
    </main>
  );
}
