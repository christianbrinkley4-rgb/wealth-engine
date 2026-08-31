import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone, ShieldCheck } from "lucide-react";

import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { AGENT, COMPENSATION_DISCLOSURE } from "@/lib/agent";
import { faqJsonLd, pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Medicare & Retirement Questions — Greensboro, NC",
  description:
    "Straight answers on Medicare timing, retirement income, and life insurance for Piedmont Triad households. Licensed agent in Greensboro. No cost to talk.",
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({
    title: "Medicare & Retirement Questions — Greensboro",
    description:
      "A licensed local agent, two short questions, and a real answer before you give up your phone number.",
    path: "/",
  }),
};

const primaryCta =
  "inline-flex h-16 min-h-16 w-full shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-navy)] px-6 text-20 font-semibold text-balance text-[var(--color-paper)] transition-opacity hover:opacity-95 md:w-auto md:min-w-[280px] md:px-8";

/**
 * The four situations people actually arrive in.
 *
 * Written the way somebody would say it rather than the way the industry
 * files it: nobody with an old 401(k) thinks "retirement income", and nobody
 * thinks "I need an annuity" — they think about the money lasting. Medicare
 * splits in two because turning 65 and the annual window are different
 * questions, asked by different people, at different times of the year.
 *
 * Each one lands somewhere that answers rather than on a form.
 */
const SITUATIONS = [
  {
    q: "I\u2019m turning 65",
    blurb: "When you have to sign up, what happens if you miss it, and the dates in your case",
    href: "/start?topic=medicare&stage=turning_65_soon",
  },
  {
    q: "I\u2019m already on Medicare",
    blurb:
      "Whether to change anything in this year\u2019s window, and why your premium is what it is",
    href: "/start?topic=medicare&stage=already_on_medicare",
  },
  {
    q: "I\u2019m working out my retirement income",
    blurb:
      "An old 401(k), Social Security timing, and what a withdrawal does to your premium later",
    href: "/start?topic=financial_planning",
  },
  {
    q: "I have a question about life insurance",
    blurb: "Whether what you have is enough, and what happens to it when the job ends",
    href: "/start?topic=life_insurance",
  },
] as const;

const FAQ = [
  {
    q: "What do you do for me, exactly?",
    a: "Figure out what you need, check your doctors and prescriptions against the plans I can offer for the year your coverage starts, do the enrollment paperwork with you, and answer the phone afterwards when a claim is denied or a letter makes no sense. That last part is most of the job and there is no fee for any of it.",
  },
  {
    q: "What does this cost?",
    a: "Nothing. There is no fee to ask me a question or to talk something through, and no charge for help comparing options.",
  },
  {
    q: "So how do you get paid?",
    a: COMPENSATION_DISCLOSURE,
  },
  {
    q: "Is this going to turn into ten phone calls from strangers?",
    a: "No. Your answers come to me and stay with me. I don’t sell leads, and I don’t pass your name to a call center or a lead network. One person reads what you wrote, and that person calls you.",
  },
  {
    q: "What happens after I send the form?",
    a: "I read it myself, and it doesn’t go to anyone else. Then I call or email you, usually the same day and always within one business day. If a particular time is easier for you, say so and I’ll send you a link to pick one.",
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
      <section className="bg-[var(--color-paper)] pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[3fr_2fr] md:gap-14">
            <div>
              <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
                Greensboro · High Point · Winston-Salem
              </p>

              <h1 className="text-34 md:text-46 mt-4 leading-[1.12] font-semibold tracking-tight text-balance text-[var(--color-navy)]">
                What are you trying to figure out?
              </h1>

              <p className="text-20 mt-5 max-w-xl leading-relaxed text-[var(--color-ink-muted)]">
                The company behind that ad has never been to Greensboro. I have — I’m one licensed
                agent here in the Triad, and I answer Medicare, retirement and life insurance
                questions myself. Before I ask you for anything, and whether or not we ever work
                together.
              </p>

              {/*
                Proof, immediately. Anyone can claim to be the honest one; the
                way to demonstrate it is to answer something useful on the spot
                rather than trade it for a phone number.
              */}
              <div className="mt-6 max-w-xl border-l-4 border-[var(--color-gold-ink)] bg-white/70 py-3 pl-5">
                <p className="text-18 leading-relaxed text-[var(--color-navy)]">
                  <strong>Here’s the kind of thing I mean.</strong> Medicare sets your premium from
                  a tax return two years old. So if you retired last year, you’re being charged on
                  what you earned while you were still working — and there’s a form that can fix it.
                </p>
                <Link
                  href="/irmaa-appeal"
                  className="text-17 mt-2 inline-block font-medium text-[var(--color-navy)] underline underline-offset-4"
                >
                  How that appeal works →
                </Link>
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button asChild className={primaryCta}>
                  <Link href="/start">Ask your question →</Link>
                </Button>
                <a
                  href={AGENT.phoneHref}
                  className="text-19 inline-flex h-16 min-h-16 items-center justify-center gap-2 rounded-[12px] border-2 border-[var(--color-navy)] px-6 font-semibold text-[var(--color-navy)] transition-colors hover:bg-[rgba(15,34,65,0.05)]"
                >
                  <Phone className="size-5" aria-hidden />
                  {AGENT.phone}
                </a>
              </div>
              <p className="text-16 mt-4 text-[var(--color-ink-muted)]">
                A couple of questions, then a real answer. No cost, and your information is never
                sold.
              </p>
              <p className="text-16 mt-2 text-[var(--color-ink-muted)]">
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
                className="w-full rounded-2xl border border-[rgba(15,34,65,0.1)] object-cover shadow-[0_12px_40px_rgba(15,34,65,0.10)]"
              />
              <figcaption className="text-16 mt-4 leading-snug text-[var(--color-navy)]">
                <span className="text-18 block font-semibold">{AGENT.name}</span>
                <span className="block text-[var(--color-ink-muted)]">
                  Licensed insurance agent · {AGENT.city}, {AGENT.state}
                </span>
                <span className="block text-[var(--color-ink-muted)]">{AGENT.education}</span>
              </figcaption>

              {/*
                The hero had roughly 200px of empty column under this caption.
                Four things a sceptical reader can check, in the place they are
                already looking, rather than a void.
              */}
              <ul className="mt-6 flex flex-col gap-3 border-t border-[rgba(15,34,65,0.12)] pt-5">
                {[
                  "Licensed in North Carolina",
                  "You reach me, not a call center",
                  "No cost, and nothing to sign",
                  "Your information is never sold",
                ].map((point) => (
                  <li key={point} className="text-16 flex gap-3 leading-snug">
                    <ShieldCheck
                      className="mt-0.5 size-5 shrink-0 text-[var(--color-gold-ink)]"
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

      {/*
        The four situations, two across so each keeps a line of explanation
        underneath rather than being squeezed into a label.
      */}
      <section className="bg-[var(--color-paper)] pb-14 md:pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {SITUATIONS.map((item) => (
              <li key={item.q}>
                <Link
                  href={item.href}
                  className="group flex min-h-[132px] flex-col justify-center rounded-xl border border-[rgba(15,34,65,0.14)] bg-white px-6 py-5 transition-colors hover:border-[var(--color-navy)]"
                >
                  <span className="text-20 font-semibold text-[var(--color-navy)]">
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
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*
        ---------- what the job is ----------
        The page above this one lists six things I won't do. Nowhere did it say
        what I will do, which left "ask a question" as the entire offer — an
        invitation to a conversation with no stated destination. People do not
        hand over a phone number for an ambiguous outcome, and an agent whose
        service is never described reads as someone with nothing to describe.
      */}
      <section className="bg-white py-16 md:py-20">
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
                t: "Do the paperwork with you",
                b: "Enrollment forms, Social Security, the Medigap application, an SSA-44 if your premium was set on income you no longer earn. I sit with you while it happens, on the phone or at your kitchen table.",
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

      {/*
        ---------- what I won’t do ----------
        The most credible thing on the page, because a call center can’t copy
        it. Every one of these is a promise a boiler room would never make, and
        the last one — admitting there are plans I can’t show you — is the one
        that buys the rest their credibility.
      */}
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
                t: "You decide what happens next",
                b: "Sometimes that’s a plan comparison. Sometimes it’s me telling you what you have is fine. Either way there’s nothing to sign and no one calls you again unless you ask.",
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
                  asks a question and one person answers it.
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
                  body: "Greensboro, High Point, Winston-Salem and nearby",
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
            Two questions and you’ll have something useful, whether or not we ever talk.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Button asChild className={primaryCta}>
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
