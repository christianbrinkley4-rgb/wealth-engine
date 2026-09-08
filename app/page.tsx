import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  HeartPulse,
  Landmark,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { AGENT, COMPENSATION_DISCLOSURE } from "@/lib/agent";
import { faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import {
  featuredPlaces,
  highIntentPlaces,
  SERVICE_AREA_LABEL,
  SERVICE_AREA_LEDE,
  townPlaces,
} from "@/lib/triad";

export const metadata: Metadata = {
  title: { absolute: "Medicare, Life Insurance & Retirement Help in Greensboro, NC" },
  description:
    "Personal Medicare, life insurance, and retirement education for Greensboro-area households. Work directly with local licensed agent Christian Brinkley.",
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({
    title: "Medicare, life insurance & retirement help in Greensboro",
    description:
      "Get a personal review from a local licensed agent. Meet in person or by phone. Free consultation, with no obligation.",
    path: "/",
  }),
  twitter: pageTwitter({
    title: "Medicare, life insurance & retirement help in Greensboro",
    description:
      "Get a personal review from a local licensed agent. Meet in person or by phone. Free consultation, with no obligation.",
  }),
};

const primaryCta =
  "inline-flex h-16 min-h-16 w-full shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-paper)] px-6 text-20 font-semibold text-balance text-[var(--color-navy)] transition-opacity hover:opacity-95 md:w-auto md:min-w-[280px] md:px-8";

const paperPrimaryCta =
  "inline-flex h-16 min-h-16 w-full shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-navy)] px-6 text-20 font-semibold text-balance text-[var(--color-paper)] transition-opacity hover:opacity-95 md:w-auto md:min-w-[280px] md:px-8";

/**
 * The four lead paths, named the way search and the household both say them.
 * Each one lands on an indexed page that answers first, then offers a form —
 * not the other way around.
 */
const SITUATIONS = [
  {
    Icon: ShieldCheck,
    label: "Turning 65",
    q: "Build your Medicare timeline",
    blurb: "Coordinate employer coverage, Part B, Medigap, HSA contributions, and a younger spouse",
    href: "/turning-65",
  },
  {
    Icon: CalendarDays,
    label: "Annual enrollment",
    q: "Review your current coverage",
    blurb: "Check next year’s costs, prescriptions, and physician networks before you decide",
    href: "/annual-enrollment",
  },
  {
    Icon: Landmark,
    label: "Retirement income",
    q: "Coordinate income and Medicare",
    blurb: "Understand how Social Security, withdrawals, and the IRMAA lookback fit together",
    href: "/retirement-income",
  },
  {
    Icon: HeartPulse,
    label: "Life insurance",
    q: "Review your family’s protection",
    blurb: "Check personal and employer coverage, beneficiaries, end dates, and ongoing needs",
    href: "/life-insurance",
  },
] as const;

const CONTRAST = [
  {
    them: "A broad online marketplace",
    us: "A personal review with one local agent",
  },
  {
    them: "A general recommendation",
    us: "Your physicians, prescriptions, dates, and priorities",
  },
  {
    them: "Phone-only support",
    us: "Meet in person or by phone",
  },
  {
    them: "A one-time transaction",
    us: "A local relationship before and after enrollment",
  },
] as const;

const FAQ = [
  {
    q: "What do you do for me, exactly?",
    a: "I help you organize your timeline, compare the plans I represent, verify physicians and prescriptions, and complete enrollment if you choose. You can also contact me later when coverage questions come up.",
  },
  {
    q: "Will you actually come to my house?",
    a: "I meet with clients across Greensboro and nearby communities. Consultations are free and available in person or by phone.",
  },
  {
    q: "What does this cost?",
    a: "Consultations and plan comparisons are free. There is no obligation to enroll or purchase coverage.",
  },
  {
    q: "So how do you get paid?",
    a: COMPENSATION_DISCLOSURE,
  },
  {
    q: "Who receives my information?",
    a: "Your inquiry goes directly to Christian Brinkley. It is not sold or distributed to other agents.",
  },
  {
    q: "What happens after I send the form?",
    a: "Christian reviews your answers and follows up by phone or email, usually the same day and within one business day. You can choose an in-person or phone consultation.",
  },
  {
    q: "Do I have to buy anything?",
    a: "The consultation is free and there is no obligation. If your question requires a CPA, attorney, or registered investment adviser, I will say so.",
  },
] as const;

export default function HomePage() {
  return (
    <main className="text-[var(--color-navy)]">
      {/* ---------- hero ---------- */}
      <section className="bg-[var(--color-navy)] pt-10 pb-16 text-[var(--color-paper)] md:pt-14 md:pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[3fr_2fr] md:gap-14">
            <div>
              <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold)] uppercase">
                {SERVICE_AREA_LABEL}
              </p>

              <h1 className="text-34 md:text-46 mt-4 leading-[1.12] font-semibold text-balance">
                Make confident Medicare decisions before 65
              </h1>

              <p className="text-20 mt-5 max-w-xl leading-relaxed text-[var(--color-paper)]/85">
                Coordinate enrollment dates, employer coverage, HSA timing, physicians, and
                retirement income with a local licensed agent who reviews every case personally.
              </p>

              <div className="mt-6 max-w-xl border-l-4 border-[var(--color-gold)] bg-white/5 py-3 pl-5">
                <p className="text-18 leading-relaxed">
                  <strong>Work directly with Christian Brinkley.</strong> Meet in person or by phone
                  for a private, one-on-one review. Free consultation. No obligation.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button asChild className={primaryCta}>
                  <Link href="/start">Review my Medicare timeline →</Link>
                </Button>
                <a
                  href={AGENT.phoneHref}
                  className="text-19 inline-flex h-16 min-h-16 items-center justify-center gap-2 rounded-[12px] border-2 border-[var(--color-paper)]/70 px-6 font-semibold text-[var(--color-paper)] transition-colors hover:bg-white/10"
                >
                  <Phone className="size-5" aria-hidden />
                  {AGENT.phone}
                </a>
              </div>
              <p className="text-16 mt-4 text-[var(--color-paper)]/70">
                Answer a few questions so Christian can prepare for your conversation.
              </p>
              <p className="text-16 mt-2 text-[var(--color-paper)]/70">
                {AGENT.hours} {AGENT.afterHoursPromise}
              </p>
            </div>

            <figure className="m-0 md:ml-auto md:max-w-[360px]">
              <Image
                src="/christian-brinkley.jpg"
                alt={`${AGENT.name}, licensed insurance agent in Greensboro, North Carolina`}
                width={1200}
                height={1600}
                priority
                sizes="(max-width: 768px) 100vw, 360px"
                className="w-full rounded-2xl border border-white/15 object-cover shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
              />
              <figcaption className="text-16 mt-4 leading-snug">
                <span className="text-18 block font-semibold">{AGENT.name}</span>
                <span className="block text-[var(--color-paper)]/75">
                  Licensed insurance agent · {AGENT.city}, {AGENT.state}
                </span>
                <span className="block text-[var(--color-paper)]/75">{AGENT.education}</span>
              </figcaption>

              <ul className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-5">
                {[
                  "Licensed in North Carolina",
                  "Personal review from one local agent",
                  "Meet in person or by phone",
                  "Free consultation with no obligation",
                ].map((point) => (
                  <li key={point} className="text-16 flex gap-3 leading-snug">
                    <ShieldCheck
                      className="mt-0.5 size-5 shrink-0 text-[var(--color-gold)]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- four lead paths ---------- */}
      <section className="bg-[var(--color-paper)] py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
            Choose the help you need
          </p>
          <h2 className="text-30 mt-3 font-semibold text-[var(--color-navy)]">
            Start with your current decision
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {SITUATIONS.map((item) => (
              <li key={item.q}>
                <Link
                  href={item.href}
                  className="group flex min-h-[148px] gap-5 rounded-xl border border-[rgba(15,34,65,0.12)] bg-white px-6 py-6 shadow-[0_2px_16px_rgba(15,34,65,0.05)] transition-[border-color,box-shadow] hover:border-[var(--color-navy)] hover:shadow-[0_8px_28px_rgba(15,34,65,0.08)]"
                >
                  <item.Icon
                    className="mt-0.5 size-8 shrink-0 text-[var(--color-gold-ink)]"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="flex flex-col">
                    <span className="text-13 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
                      {item.label}
                    </span>
                    <span className="text-22 mt-1 font-semibold text-[var(--color-navy)]">
                      {item.q}
                      <span
                        aria-hidden
                        className="ml-2 inline-block text-[var(--color-gold-ink)] transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                    <span className="text-16 mt-2 leading-snug text-[var(--color-ink-muted)]">
                      {item.blurb}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-17 mt-6">
            Not sure where to begin?{" "}
            <Link href="/start" className="font-semibold underline underline-offset-2">
              Find the right starting point →
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- local pages, one city at a time ---------- */}
      <section className="border-t border-[rgba(15,34,65,0.1)] bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
            {SERVICE_AREA_LABEL}
          </p>
          <h2 className="text-30 mt-3 font-semibold text-[var(--color-navy)]">
            Local help across the Triad
          </h2>
          <p className="text-18 mt-4 max-w-2xl leading-relaxed text-[var(--color-ink-muted)]">
            {SERVICE_AREA_LEDE} Local pages explain the county-specific Medicare details that can
            affect plan availability and physician networks.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {featuredPlaces().map((city) => (
              <li
                key={city.slug}
                className="flex flex-col rounded-xl border border-[rgba(15,34,65,0.12)] bg-[var(--color-paper)] p-6"
              >
                <p className="text-13 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
                  {city.county}
                </p>
                <h3 className="text-22 mt-2 font-semibold">{city.name}</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  <li>
                    <Link
                      href={`/medicare-in/${city.slug}`}
                      className="text-17 font-medium underline-offset-2 hover:underline"
                    >
                      Medicare in {city.name} →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/life-insurance-in/${city.slug}`}
                      className="text-17 font-medium underline-offset-2 hover:underline"
                    >
                      Life insurance in {city.name} →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/retirement-in/${city.slug}`}
                      className="text-17 font-medium underline-offset-2 hover:underline"
                    >
                      Retirement help in {city.name} →
                    </Link>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
          <p className="text-13 mt-10 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
            Towns people actually search
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {highIntentPlaces().map((place) => (
              <li
                key={place.slug}
                className="flex flex-col rounded-xl border border-[rgba(15,34,65,0.12)] bg-white px-4 py-4"
              >
                <span className="text-18 font-semibold">{place.name}</span>
                <span className="text-15 mt-1 text-[var(--color-ink-muted)]">
                  {place.minutesFromDowntown} min · {place.county.replace(" County", "")}
                </span>
                <span className="mt-3 flex flex-col gap-2">
                  <Link
                    href={`/medicare-in/${place.slug}`}
                    className="text-16 min-h-11 font-medium underline-offset-2 hover:underline"
                  >
                    Medicare
                  </Link>
                  <Link
                    href={`/life-insurance-in/${place.slug}`}
                    className="text-16 min-h-11 font-medium underline-offset-2 hover:underline"
                  >
                    Life insurance
                  </Link>
                  <Link
                    href={`/retirement-in/${place.slug}`}
                    className="text-16 min-h-11 font-medium underline-offset-2 hover:underline"
                  >
                    Retirement
                  </Link>
                </span>
              </li>
            ))}
          </ul>
          <p className="text-13 mt-10 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
            Also within about 30 minutes
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {townPlaces().map((place) => (
              <li key={place.slug}>
                <Link
                  href={`/medicare-in/${place.slug}`}
                  className="text-17 underline-offset-2 hover:underline"
                >
                  {place.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-17 mt-6">
            <Link href="/service-area" className="font-medium underline underline-offset-2">
              Every town, with Medicare, life insurance, and retirement pages →
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- local service difference ---------- */}
      <section className="border-y border-[rgba(15,34,65,0.1)] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
            Why this is different
          </p>
          <h2 className="text-30 mt-3 max-w-3xl font-semibold text-[var(--color-navy)]">
            A personal review, built around your priorities
          </h2>
          <p className="text-18 mt-4 max-w-2xl leading-relaxed text-[var(--color-ink-muted)]">
            Your Medicare decision may affect employer coverage, HSA contributions, a younger
            spouse, established physicians, and retirement income. A careful review considers the
            full picture before comparing plans.
          </p>
          <p className="text-18 mt-4 max-w-2xl leading-relaxed text-[var(--color-ink-muted)]">
            Christian is a Greensboro-based licensed agent and UNCG accounting master’s student. He
            personally reviews each case and is available in person or by phone.
          </p>

          <div className="mt-10 overflow-hidden rounded-xl border border-[rgba(15,34,65,0.12)]">
            <div className="grid grid-cols-1 bg-[var(--color-paper)] md:grid-cols-2">
              <p className="text-13 border-b border-[rgba(15,34,65,0.1)] px-6 py-3 font-medium tracking-[0.08em] text-[var(--color-ink-muted)] uppercase md:border-r">
                General marketplace
              </p>
              <p className="text-13 hidden border-b border-[rgba(15,34,65,0.1)] px-6 py-3 font-medium tracking-[0.08em] text-[var(--color-navy)] uppercase md:block">
                Here
              </p>
            </div>
            {CONTRAST.map((row) => (
              <div
                key={row.them}
                className="grid grid-cols-1 border-t border-[rgba(15,34,65,0.1)] md:grid-cols-2"
              >
                <p className="text-17 px-6 py-4 text-[var(--color-ink-muted)] md:border-r md:border-[rgba(15,34,65,0.1)]">
                  <span className="mb-1 block font-medium tracking-[0.08em] text-[var(--color-ink-muted)] uppercase md:hidden">
                    Them
                  </span>
                  {row.them}
                </p>
                <p className="text-17 bg-[var(--color-paper)] px-6 py-4 font-medium text-[var(--color-navy)] md:bg-white">
                  <span className="mb-1 block font-medium tracking-[0.08em] text-[var(--color-gold-ink)] uppercase md:hidden">
                    Here
                  </span>
                  {row.us}
                </p>
              </div>
            ))}
          </div>
          <p className="text-18 mt-8">
            <Link href="/start" className="font-semibold underline underline-offset-2">
              Get a personal coverage review →
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- what the job is ---------- */}
      <section className="bg-[var(--color-paper)] py-16 md:py-20">
        <div className="measure-prose mx-auto max-w-3xl px-4">
          <h2 className="text-30 font-semibold text-[var(--color-navy)]">
            What working with me looks like
          </h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Four things. That’s the whole job.
          </p>

          <ol className="mt-8 flex flex-col gap-6">
            {[
              {
                t: "Figure out what you need",
                b: "Which doctors you want to keep. What prescriptions you take. Whether you travel, and what you could live with paying if something went wrong. About twenty minutes, and most of it isn’t about money.",
              },
              {
                t: "Compare what I can offer against it",
                b: "I check your doctors and your prescriptions against the plans available where you live, for the year your coverage starts. If something I can’t offer suits you better, I’ll say so and tell you where to find it.",
              },
              {
                t: "Help you complete the next step",
                b: "If you decide to enroll, I help with the application and explain what to expect. Meetings are available in person or by phone.",
              },
              {
                t: "Pick up the phone afterwards",
                b: "A denied claim. A drug that stopped being covered. The notice in September saying your plan is changing. This is most of the work, and there’s no fee for it either.",
              },
            ].map((step, index) => (
              <li key={step.t} className="flex gap-5 border-t border-gray-300 pt-5">
                <span className="text-18 flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold text-[var(--color-navy)]">{step.t}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {step.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="text-18 mt-8 border-l-4 border-[var(--color-gold-ink)] py-2 pl-5 leading-relaxed text-[var(--color-navy)]">
            <strong>The consultation is free.</strong> If you enroll through me, the insurance
            company may pay a commission. Your premium is not increased for using my help.
          </p>
        </div>
      </section>

      {/* ---------- what I won’t do ---------- */}
      <section className="border-y border-[rgba(15,34,65,0.1)] bg-white py-16 md:py-20">
        <div className="measure-prose mx-auto max-w-3xl px-4">
          <h2 className="text-30 font-semibold text-[var(--color-navy)]">What you can expect</h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Clear communication, a thoughtful review, and time to make your own decision.
          </p>

          <ul className="mt-8 flex flex-col gap-6">
            {[
              {
                t: "One point of contact",
                b: "You work directly with Christian by phone or email.",
              },
              {
                t: "Respect for your privacy",
                b: "Your inquiry is not sold or distributed to other agents.",
              },
              {
                t: "Answers based on your situation",
                b: "The review starts with your dates, coverage, physicians, prescriptions, and priorities.",
              },
              {
                t: "Time to consider your options",
                b: "You can review the information, speak with your spouse, and confirm details before deciding.",
              },
              {
                t: "Support after enrollment",
                b: "You can contact the same local agent when coverage questions arise.",
              },
              {
                t: "Clear scope and disclosures",
                b: "I represent a limited number of insurance companies and cannot offer every plan. Medicare.gov and 1-800-MEDICARE remain available for a complete market view.",
              },
            ].map((item) => (
              <li key={item.t} className="border-t border-gray-300 pt-5">
                <h3 className="text-20 font-semibold text-[var(--color-navy)]">{item.t}</h3>
                <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.b}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- what happens next ---------- */}
      <section className="bg-[var(--color-paper)] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-30 font-semibold text-[var(--color-navy)]">
            What happens when you get in touch
          </h2>
          <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                n: "1",
                t: "I read what you sent",
                b: "Me, personally. Not an assistant, and it doesn’t go to anyone else. What you write is what I look up before we talk.",
              },
              {
                n: "2",
                t: "I call or email you",
                b: "Usually the same day, and always within one business day. If you’d rather email than talk, say so and that’s what I’ll do.",
              },
              {
                n: "3",
                t: "Choose how to meet",
                b: "Meet in person or by phone. The consultation is free, and the decision remains yours.",
              },
            ].map((step) => (
              <li key={step.n} className="flex flex-col gap-3">
                <span className="text-18 flex size-11 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {step.n}
                </span>
                <h3 className="text-19 font-semibold text-[var(--color-navy)]">{step.t}</h3>
                <p className="text-17 leading-relaxed text-[var(--color-ink-muted)]">{step.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- trust ---------- */}
      <section className="bg-[var(--color-navy)] py-16 text-[var(--color-paper)] md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold)] uppercase">
                Why I built this
              </p>
              <h2 className="text-28 mt-3 leading-snug font-semibold text-[var(--color-paper)]">
                I live here too.
              </h2>
              <div
                className="text-18 mt-6 space-y-4 leading-[1.75]"
                style={{ color: "rgba(245, 240, 232, 0.9)" }}
              >
                <p>
                  Medicare often overlaps with retirement, tax, and family decisions. I built this
                  practice to give Triad households a clear local point of contact for those
                  conversations.
                </p>
                <p>
                  I’m a licensed insurance agent in Greensboro and a master’s student in accounting
                  at UNCG. That training supports a careful approach to enrollment dates, IRMAA, and
                  the way Medicare fits into retirement decisions.
                </p>
                <p>
                  My role is to help you understand the options I represent and decide whether one
                  fits. There is no obligation to make a change.
                </p>
              </div>
              <Button
                asChild
                className={`${primaryCta} mt-8 bg-[var(--color-paper)] text-[var(--color-navy)]`}
              >
                <Link href="/about">More about me →</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                {
                  Icon: ShieldCheck,
                  title: "Licensed agent",
                  body: `Licensed in ${AGENT.licensedStates.join(", ")}, and this is what I do full time`,
                },
                {
                  Icon: Phone,
                  title: "You reach me",
                  body: "The number on this page is my phone, not a queue",
                },
                {
                  Icon: Clock,
                  title: "A fast answer",
                  body: "Usually the same day, and always within one business day",
                },
                {
                  Icon: MapPin,
                  title: "Piedmont Triad",
                  body: "About 30 minutes from downtown Greensboro — not only the three big cities",
                },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <Icon
                    className="mb-3 size-8 text-[var(--color-gold)]"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3 className="text-17 font-semibold text-[var(--color-paper)]">{title}</h3>
                  <p className="text-15 mt-2 leading-relaxed text-[var(--color-paper)]/80">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Renders only once lib/testimonials.ts holds a real quote. */}
      <Testimonials />

      {/* ---------- FAQ ---------- */}
      <section className="bg-white py-16 md:py-20">
        <div className="measure-prose mx-auto max-w-3xl px-4">
          <h2 className="text-30 font-semibold text-[var(--color-navy)]">
            The questions people ask me most
          </h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold text-[var(--color-navy)]">{item.q}</dt>
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

      {/* ---------- closing CTA ---------- */}
      <section className="bg-[var(--color-paper)] py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-30 font-semibold text-[var(--color-navy)]">
            Get a clear second set of eyes
          </h2>
          <p className="text-18 mt-4 text-[var(--color-ink-muted)]">
            Share your situation, review the key considerations, and choose whether to talk.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Button asChild className={paperPrimaryCta}>
              <Link href="/start">Start my personal review →</Link>
            </Button>
            <a
              href={AGENT.phoneHref}
              className="text-18 font-semibold text-[var(--color-navy)] underline underline-offset-4"
            >
              Or call {AGENT.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-white py-8">
        <div className="text-16 mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-[var(--color-ink-muted)]">
          <span className="font-medium">More on this site:</span>
          <Link href="/turning-65" className="underline underline-offset-2">
            Turning 65
          </Link>
          <Link href="/keep-my-doctor" className="underline underline-offset-2">
            Can I keep my doctor?
          </Link>
          <Link href="/irmaa-appeal" className="underline underline-offset-2">
            Appealing a high premium
          </Link>
          <Link href="/helping-a-parent" className="underline underline-offset-2">
            Helping a parent with Medicare
          </Link>
          <Link href="/remind-me" className="underline underline-offset-2">
            Remind me when my window opens
          </Link>
          <Link href="/medicare" className="underline underline-offset-2">
            Medicare premium estimate
          </Link>
          <Link href="/roth-window" className="underline underline-offset-2">
            Roth conversion estimate
          </Link>
          <Link href="/plan" className="underline underline-offset-2">
            What conversion timing costs
          </Link>
        </div>
      </section>
    </main>
  );
}
