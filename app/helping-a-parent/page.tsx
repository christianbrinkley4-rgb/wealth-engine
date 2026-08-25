import type { Metadata } from "next";

import { pageOpenGraph } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT, COMPENSATION_DISCLOSURE } from "@/lib/agent";

/**
 * Written for the adult child, not the person turning 65.
 *
 * A large share of Medicare decisions are actually researched by a son or
 * daughter in their forties or fifties — and every other page on this site
 * addresses the beneficiary directly, which leaves that person reading over
 * someone else’s shoulder. They’re also the audience paid social can still
 * reach properly, since the ad rules that strip age targeting on the 65-plus
 * audience don’t hurt nearly as much here.
 */

export const metadata: Metadata = {
  title: "Helping a parent with Medicare",
  description:
    "If you are the one researching for Mom or Dad: the deadlines that matter, what you are allowed to do on their behalf, and what to ask. Greensboro, NC.",
  alternates: { canonical: "/helping-a-parent" },
  openGraph: pageOpenGraph({
    title: "Helping a parent with Medicare",
    description:
      "The deadlines, the paperwork you need before Social Security will talk to you, and what to ask. No cost.",
    path: "/helping-a-parent",
  }),
};

const START_HREF = "/start?topic=medicare&stage=helping_spouse_or_parent&ask=parent";

const FIRST_STEPS = [
  {
    title: "Get authorization before you need it",
    body: "Social Security won’t discuss your parent’s record with you until they’ve authorized it in writing, and Medicare works the same way. Everyone discovers this on the phone call where it stops them. Sorting it out first turns a five-call problem into a one-call problem.",
  },
  {
    title: "Find out the exact month",
    body: "Their sign-up window runs seven months: the three months before the month they turn 65, that month, and the three months after. Everything else on this page hangs off that date, so pin it down first.",
  },
  {
    title: "Ask whether they’re still working",
    body: "If your parent — or their spouse — still has coverage through a job, whether they can safely delay Part B depends on how many people that employer employs. Twenty or more usually means they can wait. Fewer than twenty usually means Medicare pays first whether or not they’ve enrolled, and claims can fall through the gap.",
  },
  {
    title: "Know which window closes quietly",
    body: "There’s a separate six-month window for supplemental coverage that opens once they’re 65 and on Part B. Inside it, their health history can’t be used to deny them or charge more. Outside it, in most states, it can — and that matters most for exactly the parents whose health is already the reason you’re researching this.",
  },
] as const;

const FAQ = [
  {
    q: "Can I enroll my parent myself?",
    a: "Not without authorization. You can do all the research, sit in on the calls, and help them compare — but the decision and the signature have to be theirs unless you hold power of attorney or they’ve filed authorization with Social Security. Worth starting that paperwork now if it isn’t already in place.",
  },
  {
    q: "My parent is overwhelmed and doesn’t want to talk about it. What do I do?",
    a: "Start with the date rather than the decision. Almost everyone relaxes once they know exactly how long they have, and most of the panic comes from not knowing whether they’ve already missed something. Usually they haven’t.",
  },
  {
    q: "They live in the Triad but I don’t. Can you still help?",
    a: "Yes — coverage depends on where they live, not where you do. I’m happy to have you both on the call, which is usually the easiest way to do this anyway.",
  },
  {
    q: "What does this cost?",
    a: COMPENSATION_DISCLOSURE,
  },
] as const;

export default function HelpingAParentPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <section className="bg-[var(--color-paper)] pt-8 pb-14 md:pt-12 md:pb-20">
        <div className="app-shell">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[3fr_2fr] md:gap-14">
            <div>
              <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
                For the son or daughter doing the research
              </p>
              <h1 className="text-32 md:text-42 mt-4 leading-[1.12] font-semibold tracking-tight text-balance">
                You’re the one reading about Medicare at 11pm. Not them.
              </h1>
              <p className="text-20 mt-5 max-w-xl leading-relaxed text-[var(--color-ink-muted)]">
                Someone has to figure out what Mom or Dad needs to do and by when, and it’s usually
                whichever adult child is best at forms. Here’s the short version — the dates that
                matter, the paperwork that blocks you, and what to actually ask.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href={START_HREF}
                  className="text-19 inline-flex h-16 min-h-16 items-center justify-center rounded-[12px] bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95"
                >
                  Tell me their situation →
                </Link>
                <a
                  href={AGENT.phoneHref}
                  className="text-19 inline-flex h-16 min-h-16 items-center justify-center gap-2 rounded-[12px] border-2 border-[var(--color-navy)] px-6 font-semibold text-[var(--color-navy)] transition-colors hover:bg-[rgba(15,34,65,0.05)]"
                >
                  <Phone className="size-5" aria-hidden />
                  {AGENT.phone}
                </a>
              </div>
              <p className="text-16 mt-4 text-[var(--color-ink-muted)]">
                One question and you’ll get the part that matters. No cost, and I’m happy to have
                you both on the call.
              </p>
            </div>

            <figure className="m-0">
              <Image
                src="/christian-brinkley.jpg"
                alt={`${AGENT.name}, licensed insurance agent in Greensboro, North Carolina`}
                width={1200}
                height={1600}
                priority
                sizes="(max-width: 768px) 100vw, 340px"
                className="w-full rounded-2xl border border-[rgba(15,34,65,0.1)] object-cover shadow-[0_12px_40px_rgba(15,34,65,0.10)]"
              />
              <figcaption className="text-16 mt-4 leading-snug">
                <span className="text-18 block font-semibold">{AGENT.name}</span>
                <span className="block text-[var(--color-ink-muted)]">
                  Licensed insurance agent · {AGENT.city}, {AGENT.state}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-18">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Four things to settle first</h2>
          <ol className="mt-8 flex flex-col gap-8">
            {FIRST_STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span className="text-18 flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">{step.title}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--color-navy)] py-14 text-[var(--color-paper)] md:py-18">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-26 font-semibold">
            If their window hasn’t opened yet, don’t hold it in your head
          </h2>
          <p className="text-18 mt-4 leading-relaxed" style={{ color: "rgba(245,240,232,0.9)" }}>
            The single most common way this goes wrong is that someone works out the right answer
            eight months early and then life happens. Give me the month they turn 65 and I’ll email
            you before the window opens — one email, nothing else.
          </p>
          <Link
            href="/remind-me"
            className="text-18 mt-7 inline-flex min-h-14 items-center justify-center rounded-xl bg-[var(--color-paper)] px-7 font-semibold text-[var(--color-navy)]"
          >
            Set a reminder →
          </Link>
        </div>
      </section>

      <section className="bg-white py-14 md:py-18">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions I get from adult children</h2>
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
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: FAQ.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              }),
            }}
          />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14 md:py-18">
        <div className="app-shell max-w-2xl text-center">
          <h2 className="text-28 font-semibold">Tell me where they are and I’ll help</h2>
          <p className="text-18 mt-4 text-[var(--color-ink-muted)]">
            One question about their situation, and you’ll have something useful whether or not we
            ever speak.
          </p>
          <Link
            href={START_HREF}
            className="text-18 mt-8 inline-flex min-h-14 min-w-[260px] items-center justify-center rounded-xl bg-[var(--color-navy)] px-8 py-4 font-semibold text-[var(--color-paper)]"
          >
            Start here →
          </Link>
          <p className="text-17 mt-6 text-[var(--color-ink-muted)]">
            Or call{" "}
            <a
              href={AGENT.phoneHref}
              className="font-semibold text-[var(--color-navy)] underline underline-offset-2"
            >
              {AGENT.phone}
            </a>
          </p>
        </div>
      </section>

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
