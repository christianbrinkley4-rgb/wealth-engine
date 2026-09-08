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
    "Licensed Greensboro agent Christian Brinkley reviews Medicare (turning 65 and AEP), life insurance, and retirement questions in person — at your kitchen table. No cost, no call center.",
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({
    title: "Medicare, life insurance & retirement help in Greensboro",
    description:
      "One licensed agent in the Triad. Your kitchen table. No call center, no cost, no obligation.",
    path: "/",
  }),
  twitter: pageTwitter({
    title: "Medicare, life insurance & retirement help in Greensboro",
    description:
      "One licensed agent in the Triad. Your kitchen table. No call center, no cost, no obligation.",
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
    q: "Your seven-month Medicare window",
    blurb: "When you have to sign up, what happens if you miss it, and the dates in your case",
    href: "/turning-65",
  },
  {
    Icon: CalendarDays,
    label: "Annual enrollment",
    q: "Already on Medicare this fall",
    blurb: "Whether to change anything in this year’s window, and why most people should not",
    href: "/annual-enrollment",
  },
  {
    Icon: Landmark,
    label: "Retirement income",
    q: "An old 401(k) and Social Security",
    blurb:
      "What a withdrawal does to your Medicare premium two years later — and the four options for the account",
    href: "/retirement-income",
  },
  {
    Icon: HeartPulse,
    label: "Life insurance",
    q: "Whether what you have is enough",
    blurb:
      "The one question that settles term against permanent, and what happens when the job ends",
    href: "/life-insurance",
  },
] as const;

const CONTRAST = [
  {
    them: "A call center in another state",
    us: "One licensed agent who lives in Greensboro",
  },
  {
    them: "Your name sold to whoever pays",
    us: "Your answers come to me and stop there",
  },
  {
    them: "A script and a close on the first call",
    us: "I sit down at your kitchen table — or we talk on the phone",
  },
  {
    them: "Pressure to enroll today",
    us: "I’ll tell you when what you have is already fine",
  },
] as const;

const FAQ = [
  {
    q: "What do you do for me, exactly?",
    a: "Figure out what you need, check your doctors and prescriptions against the plans I can offer for the year your coverage starts, do the enrollment paperwork with you, and answer the phone afterwards when a claim is denied or a letter makes no sense. That last part is most of the job and there is no fee for any of it. If you’d rather do this at your kitchen table than on the phone, that’s the usual way.",
  },
  {
    q: "Will you actually come to my house?",
    a: "Yes. Anywhere I can sit down within about 30 minutes of downtown Greensboro — Greensboro itself, High Point, Winston-Salem, Kernersville, Summerfield, Jamestown, and the towns in between. Kitchen table, a coffee shop, or the phone if that’s easier. There is no charge either way, and nothing to sign before we talk.",
  },
  {
    q: "What does this cost?",
    a: "Nothing. There is no fee to ask me a question, to compare options, or for me to sit down with you. No obligation to enroll or buy anything.",
  },
  {
    q: "So how do you get paid?",
    a: COMPENSATION_DISCLOSURE,
  },
  {
    q: "Is this going to turn into ten phone calls from strangers?",
    a: "No. Your answers come to me and stay with me. I don’t sell leads, and I don’t pass your name to a call center or a lead network. One person reads what you wrote, and that person calls you — or sits down with you.",
  },
  {
    q: "What happens after I send the form?",
    a: "I read it myself, and it doesn’t go to anyone else. Then I call or email you, usually the same day and always within one business day. If a particular time is easier for you, say so and I’ll send you a link to pick one. A lot of people would rather I come by than talk on the phone. That’s fine.",
  },
  {
    q: "Do I have to buy anything?",
    a: "No. A good share of these conversations end with me telling someone their current coverage is fine, or that what they need is a CPA or an attorney rather than an agent. That’s a useful answer too.",
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
                Medicare and retirement help at your kitchen table in Greensboro
              </h1>

              <p className="text-20 mt-5 max-w-xl leading-relaxed text-[var(--color-paper)]/85">
                Turning 65, annual enrollment, life insurance, and retirement income — reviewed in
                person by one licensed agent who lives here. I’m a master’s student in accounting at
                UNCG. I read every case myself. No cost, no obligation, and never a call center.
              </p>

              <div className="mt-6 max-w-xl border-l-4 border-[var(--color-gold)] bg-white/5 py-3 pl-5">
                <p className="text-18 leading-relaxed">
                  <strong>The company behind that ad has never been to Greensboro.</strong> I have.
                  If we work together, we sit down at your table — or we talk on the phone. Either
                  way it’s me, and it doesn’t cost you anything.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button asChild className={primaryCta}>
                  <Link href="/start">Ask your question →</Link>
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
                A couple of questions, then a real answer. No cost, and your information is never
                sold.
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
                  "I sit down with you — not a call center",
                  "No cost, no obligation, nothing to sign",
                  "Your information is never sold",
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
            Four things I help with
          </p>
          <h2 className="text-30 mt-3 font-semibold text-[var(--color-navy)]">
            What are you trying to figure out?
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
            Not sure which door?{" "}
            <Link href="/start" className="font-semibold underline underline-offset-2">
              Two questions, then a real answer →
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
            Kitchen-table help in the towns around Greensboro
          </h2>
          <p className="text-18 mt-4 max-w-2xl leading-relaxed text-[var(--color-ink-muted)]">
            {SERVICE_AREA_LEDE} Medicare Advantage is sold by county. Guilford, Forsyth, Randolph,
            Davidson, Alamance, and Rockingham all show up inside this drive. Each town has its own
            pages — not a name swapped into a template.
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

      {/* ---------- kitchen table vs the mills ---------- */}
      <section className="border-y border-[rgba(15,34,65,0.1)] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
            Why this is different
          </p>
          <h2 className="text-30 mt-3 max-w-3xl font-semibold text-[var(--color-navy)]">
            Those sites match you with a stranger. I sit down at your kitchen table.
          </h2>
          <p className="text-18 mt-4 max-w-2xl leading-relaxed text-[var(--color-ink-muted)]">
            SmartAsset, the Medicare quote sites, the life-insurance mills — they are built to sell
            your phone number. This one is built so a neighbor can ask a question and one person
            answers it, in person, at no cost and with no obligation.
          </p>
          <p className="text-18 mt-4 max-w-2xl leading-relaxed text-[var(--color-ink-muted)]">
            You will not get a ranked list of advisors in three ZIP codes. You get one licensed
            agent who lives in Greensboro, a master’s student at UNCG, and a calendar that includes
            driving to your kitchen table.
          </p>

          <div className="mt-10 overflow-hidden rounded-xl border border-[rgba(15,34,65,0.12)]">
            <div className="grid grid-cols-1 bg-[var(--color-paper)] md:grid-cols-2">
              <p className="text-13 border-b border-[rgba(15,34,65,0.1)] px-6 py-3 font-medium tracking-[0.08em] text-[var(--color-ink-muted)] uppercase md:border-r">
                The national sites
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
              Ask a question without talking to a mill →
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
                t: "Sit down with you while the paperwork happens",
                b: "Enrollment forms, Social Security, the Medigap application, an SSA-44 if your premium was set on income you no longer earn. Your kitchen table, a coffee shop, or the phone — whichever is easier. I don’t send you a portal and disappear.",
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
            <strong>None of it costs you anything.</strong> The insurance company sets your premium,
            and it’s the same whether you enroll through me, through a call center, or on your own.
            So the only real question is who you’d rather have answering the phone in March.
          </p>
        </div>
      </section>

      {/* ---------- what I won’t do ---------- */}
      <section className="border-y border-[rgba(15,34,65,0.1)] bg-white py-16 md:py-20">
        <div className="measure-prose mx-auto max-w-3xl px-4">
          <h2 className="text-30 font-semibold text-[var(--color-navy)]">What I won’t do</h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            You already know how this usually goes. So here is what happens instead, stated plainly
            enough that you can hold me to it.
          </p>

          <ul className="mt-8 flex flex-col gap-6">
            {[
              {
                t: "I won’t call you from six different numbers",
                b: "You’ll hear from one person, at one number, and it’s mine. If you’d rather I email, say so and I’ll email.",
              },
              {
                t: "I won’t put you on a list",
                b: "Your answers come to me and stop there. Nothing is sold, and nothing goes to another agent or a lead company.",
              },
              {
                t: "I won’t read you a script",
                b: "If you ask something I don’t know, you’ll get “I don’t know, let me find out” rather than a rehearsed answer that sounds close enough.",
              },
              {
                t: "I won’t push you to decide on the first call",
                b: "Most of these decisions have a deadline months away. If you need to think it over, talk to your spouse, or call your doctor’s office first, that’s the right thing to do.",
              },
              {
                t: "I won’t disappear after you enroll",
                b: "That’s when the real questions start. A denied claim, a drug that isn’t covered, a letter that makes no sense. Same number, same person, and no charge for any of it.",
              },
              {
                t: "I won’t pretend I can show you everything",
                b: "I represent a limited number of insurance companies, so there are plans I can’t offer you. When one of those is the better fit, I’ll tell you, and you can take that to Medicare.gov, 1-800-MEDICARE, or another agent.",
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
                t: "We sit down — or you decide that’s enough",
                b: "Kitchen table, coffee shop, or the phone. Sometimes that’s a plan comparison. Sometimes it’s me telling you what you have is fine. Either way there’s nothing to sign.",
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
                  Most Medicare forms online hand your phone number to a dozen strangers who all
                  call at once. I built this because there ought to be a version where a neighbor
                  asks a question and one person answers it — at the kitchen table, not from a
                  cubicle in another state.
                </p>
                <p>
                  I’m a licensed insurance agent in Greensboro, finishing a master’s in accounting
                  at UNCG. The accounting half is why I’d rather talk about enrollment deadlines and
                  tax brackets than sell you something you don’t need — and it’s why I can help with
                  the parts most agents hand back to you.
                </p>
                <p>
                  If we end up working together, good. If this ends with me telling you your current
                  coverage is fine, that’s a real answer too, and it happens often.
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
            Start with whatever’s bothering you
          </h2>
          <p className="text-18 mt-4 text-[var(--color-ink-muted)]">
            Two questions and you’ll have something useful, whether or not we ever sit down.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Button asChild className={paperPrimaryCta}>
              <Link href="/start">Ask your question →</Link>
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
