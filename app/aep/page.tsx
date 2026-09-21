import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LeadCluster } from "@/app/components/LeadCluster";
import { ServiceHero } from "@/app/components/ServiceHero";
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
 * front door — what a fall review covers, how it works, and how to book one.
 * Copy drafted from the AEP 2026 content pack, in Christian's voice.
 */

/**
 * Revalidate hourly so the AEP phase headline flips near the Oct 15 / Dec 7
 * boundaries without a redeploy.
 */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Annual Enrollment 2026 | Free Fall Review in Greensboro NC",
  },
  description:
    "Medicare Annual Enrollment runs Oct 15 – Dec 7. Sit down with Christian Brinkley, a licensed local agent in Greensboro, for a free no-pressure review of your 2027 coverage.",
  alternates: { canonical: "/aep" },
  openGraph: pageOpenGraph({
    title: "Medicare Annual Enrollment 2026 | Free fall review in Greensboro NC",
    description:
      "Oct 15 – Dec 7: review your 2027 Medicare coverage with a licensed local agent. Free, no pressure, no call center.",
    path: "/aep",
  }),
};

const CHECKS = [
  {
    t: "Your plan's 2027 changes",
    b: "What your Annual Notice of Change actually says, in plain English — premiums, deductibles, copays, and anything else that's different next year.",
  },
  {
    t: "Your prescriptions",
    b: "Whether your drugs are still covered, and what they'd cost you next year. Drug coverage changes more than anything else, year to year.",
  },
  {
    t: "Your doctors",
    b: 'Whether your doctors and preferred hospitals are still in your plan\'s network for 2027. "Takes Medicare" and "in my plan\'s network" are two different things.',
  },
  {
    t: "Your total costs",
    b: "Premium plus deductible plus copays, added up honestly — not just the monthly number. Sometimes the slightly higher premium costs less overall.",
  },
  {
    t: "Your drug plan",
    b: "If you have a standalone Part D plan, we check it too. Part D plans change premiums and drug lists aggressively from year to year.",
  },
] as const;

const STEPS = [
  {
    t: "You book a time",
    b: `Book below, or call or text me at ${AGENT.phone}. My hours are Monday–Saturday, 8:00–7:00.`,
  },
  {
    t: "We talk",
    b: "In person around Greensboro, or by phone if that's easier. Bring your plan letter and your medication list if you have them.",
  },
  {
    t: "I walk you through your options",
    b: "In plain language. I answer your questions. You decide.",
  },
  {
    t: "That's it",
    b: "There's no fee, no obligation, and no pressure to change anything. Plenty of people I meet with keep the plan they have — and that's a good outcome.",
  },
] as const;

const FAQ = [
  {
    q: "What is Medicare Annual Enrollment?",
    a: "It's the fall window — October 15 through December 7 every year — when anyone with Medicare can change their coverage for the coming year. Changes take effect January 1.",
  },
  {
    q: "Do I have to change my plan?",
    a: "No. You're never required to change. But your plan's costs, drug coverage, and doctor network can change each year, so it's worth checking whether it still fits before the window closes.",
  },
  {
    q: "What can I change during Annual Enrollment?",
    a: "You can switch from one Medicare Advantage plan to another, switch from Original Medicare to a Medicare Advantage plan (or back), join a Part D drug plan, switch Part D plans, or drop Part D. Note: if you leave a Medicare Advantage plan to go back to Original Medicare and want a Medigap supplement, you may need to pass medical underwriting outside your initial enrollment period — we'll talk through that honestly if it applies to you.",
  },
  {
    q: "Does it cost anything to meet with you?",
    a: "No. The consultation is free with no obligation. If you enroll through me, I'm paid a commission by the insurance company, and your premium is the same as enrolling on your own.",
  },
  {
    q: "What should I bring to our review?",
    a: "Your plan's Annual Notice of Change letter (mailed in September), a list of your current prescriptions, and the names of your doctors. If you don't have all of it, come anyway — we'll work with what you've got.",
  },
  {
    q: "I'm turning 65 soon — is Annual Enrollment for me?",
    a: "If you're already enrolled in Medicare, yes. If you're turning 65 and new to Medicare, you have your own 7-month Initial Enrollment Period instead — start with the turning-65 guide to find your exact dates. Either way, I'm happy to help you sort out which window applies.",
  },
] as const;

/**
 * Renders an FAQ answer, upgrading the turning-65 answer's guide mention to a
 * real link. The JSON-LD keeps the plain-text version, which is what the
 * schema expects.
 */
function FaqAnswer({ item }: { item: (typeof FAQ)[number] }) {
  if (item.q.startsWith("I'm turning 65 soon")) {
    return (
      <>
        If you&apos;re already enrolled in Medicare, yes. If you&apos;re turning 65 and new to
        Medicare, you have your own 7-month Initial Enrollment Period instead —{" "}
        <Link href="/turning-65" className="underline underline-offset-2">
          start with the turning-65 guide
        </Link>{" "}
        to find your exact dates. Either way, I&apos;m happy to help you sort out which window
        applies.
      </>
    );
  }
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
              { name: "Annual enrollment 2026", path: "/aep" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare Annual Enrollment 2026: free fall review in Greensboro NC",
              description:
                "What a free fall review covers: your plan's 2027 changes, prescriptions, doctors, and total costs — with a licensed local agent.",
              path: "/aep",
              datePublished: "2026-09-19",
              dateModified: "2026-09-19",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Medicare Annual Enrollment 2026 review",
              description:
                "A free fall review of your plan's 2027 changes, prescriptions, doctors, and total costs with a licensed local agent in Greensboro.",
              path: "/aep",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Annual enrollment 2026" }]}
        eyebrow="October 15 – December 7, 2026 · Piedmont Triad"
        title={AEP_HERO_TITLES[aepPhase()]}
        lede="From October 15 through December 7, you can change your Medicare coverage for next year. I'll sit down with you — in person or by phone — and walk through what's changing with your plan, your drugs, and your doctors. Free, no pressure, no call center."
        secondaryHref="/schedule?topic=medicare"
        secondaryLabel="Book my free review →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Why review your plan this fall</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Your Medicare plan doesn&apos;t stay the same from year to year — even if you loved it
              this year. Every fall, plans update their premiums, deductibles, copays, drug lists,
              and doctor networks for the coming year. Your plan sent you a letter in September
              (called an &ldquo;Annual Notice of Change&rdquo;) spelling out exactly what&apos;s
              different for 2027. Most people never read it.
            </p>
            <p>
              That&apos;s what a fall review is for. We go through that letter together, line by
              line, and you decide whether your plan still fits — or whether something else fits
              better. No obligation either way.
            </p>
            <p>
              New to how the fall window works?{" "}
              <Link href="/annual-enrollment" className="underline underline-offset-2">
                Read the full annual enrollment guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What we check together</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Bring your current plan information and a list of your prescriptions. In about 30–45
            minutes, we&apos;ll check:
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
            Here&apos;s exactly what happens — no surprises:
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
            When you reach out, you talk to me. I&apos;m a licensed insurance agent here in
            Greensboro and an accounting master&apos;s student at UNCG. I&apos;m one person, not a
            call center, and I personally answer every inquiry.{" "}
            <Link href="/about" className="underline underline-offset-2">
              More about me
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What happens after December 7</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Annual Enrollment closes on December 7, and any changes you make take effect January
              1. After the 7th, your options to change coverage are limited for the rest of the year
              — so if you want to review your plan, the fall window is the time to do it.
            </p>
            <p>
              If a life change — a move, losing employer coverage — already opened a window for you,
              you may not need to wait for fall.{" "}
              <Link href="/special-enrollment" className="underline underline-offset-2">
                See how special enrollment works
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

{/* Second-opinion campaign — a fresh set of eyes on the plan they already have. */}
      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <div className="rounded-2xl border border-gray-300 bg-[var(--color-paper)] p-6 md:p-10">
            <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-navy)] uppercase">
              A second set of eyes
            </p>
            <h2 className="text-28 mt-3 font-semibold">
              Already have a plan? Get a free second opinion before December 7.
            </h2>
            <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
              <p>
                You wouldn&apos;t skip a second opinion on a surgery. Your Medicare plan deserves
                the same.
              </p>
              <p>
                Every year, plans change — premiums, drug tiers, doctor networks. Your agent may be
                great. But a free second look from an independent local agent costs you nothing and
                could save you real money next year.
              </p>
              <p>Here&apos;s how it works:</p>
            </div>
            <ol className="mt-6 flex flex-col gap-6">
              {[
                {
                  t: "You bring your current plan",
                  b: "Your ANOC letter, your drug list, your doctors. That's it.",
                },
                {
                  t: "I review it independently",
                  b: "I'm not with a call center and I'm not tied to one company. I compare what's out there for 2027 in our area.",
                },
                {
                  t: "You get a straight answer",
                  b: "If your current plan is still the best fit, I'll tell you to stay put. If something fits you better, I'll show you exactly why.",
                },
              ].map((item, index) => (
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
            <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
              No pressure to switch. No obligation. And if you like your current agent, keep them —
              you&apos;ll just head into January knowing you checked.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={AGENT.phoneHref}
                aria-label={`Call ${AGENT.name} at ${AGENT.phone} — get my free second opinion`}
                className="text-18 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)]"
              >
                <Phone className="size-5 shrink-0" aria-hidden />
                {AGENT.phone}
              </a>
              <Link
                href="/start"
                className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-[var(--color-navy)] px-8 font-semibold text-[var(--color-navy)]"
              >
                Book my free checkup →
              </Link>
            </div>
            <p className="text-16 mt-4 text-[var(--color-ink-muted)]">
              Free consultation. No obligation to enroll. No call centers, just me.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">A quick word on cost</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The consultation is free. If you enroll in a plan through me, the insurance company pays
            me a commission — your premium is exactly the same as if you&apos;d enrolled on your
            own. You just get a local human instead of a 1-800 number.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Questions I get every fall</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
          />
          <GuideTownLinks />
          <LeadCluster current="/aep" heading="Turning 65, or a different Medicare question?" />
        </div>
      </section>

      <KitchenTableClose
        heading="Book your free fall review"
        body="Annual Enrollment closes December 7 — and my calendar fills up fast in November. Pick a time that works for you, or call or text me and you'll reach me, not a call center."
        href="/schedule?topic=medicare"
        label="Book my free review →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
