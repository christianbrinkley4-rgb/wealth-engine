import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { AGENT } from "@/lib/agent";

/**
 * The first real question anyone asks, answered locally.
 *
 * Deliberately contains no claim about which plans any particular hospital or
 * practice participates in. Those change every year, they vary by individual
 * plan rather than by carrier, and publishing a stale table would be worse
 * than publishing nothing — someone could choose a plan on it and lose their
 * doctor. What the page does instead is teach the reliable way to check, which
 * is genuinely useful, and offer to do the checking.
 */

export const metadata: Metadata = {
  title: "Can I keep my doctor on Medicare?",
  description:
    "Whether you keep your doctor depends on which kind of Medicare coverage you choose, not on luck. How networks actually work in the Greensboro area, how to check properly, and why the answer changes every year.",
  alternates: { canonical: "/keep-my-doctor" },
  openGraph: {
    title: "Can I keep my doctor on Medicare?",
    description:
      "The first question everyone asks, answered for the Triad — including how to check properly before you sign up.",
    url: "/keep-my-doctor",
    type: "website",
  },
};

const CHECK_STEPS = [
  {
    title: "Write down the actual names",
    body: "Not 'my cardiologist' — the practice name and the individual doctor. Networks are agreed practice by practice and sometimes doctor by doctor, so a practice being in-network doesn't guarantee every physician in it is.",
  },
  {
    title: "Check the plan's own directory, for the right year",
    body: "Every plan publishes a provider directory. Make sure you're looking at the one for the year the coverage starts, not the year you're reading it in.",
  },
  {
    title: "Then phone the practice's billing office",
    body: "This is the step people skip and the one that actually settles it. Ask specifically: 'Do you accept this exact plan, for next year, and are you taking new Medicare patients?' Directories go out of date; billing offices know.",
  },
  {
    title: "Ask about the hospital as well as the doctor",
    body: "Your physician can be in-network at a hospital that isn't, which is how people end up with a surprise on a surgery. Worth checking both.",
  },
  {
    title: "Re-check every fall",
    body: "Networks are renegotiated annually. A plan that covered your doctor this year may not next year, and the plan will not ring you about it.",
  },
] as const;

const FAQ = [
  {
    q: "Does Original Medicare have a network?",
    a: "No. With Original Medicare you can see any provider in the country who accepts Medicare, which most do. The trade-off is what it doesn't cap — which is why people pair it with supplemental coverage. If keeping a specific set of doctors is your top priority, this is the route that protects it.",
  },
  {
    q: "And Medicare Advantage?",
    a: "Those plans work through networks, like the insurance you had at work. Many people are perfectly happy on them and they often include extras Original Medicare doesn't. But the network is the thing to check before you sign up, not after.",
  },
  {
    q: "My doctor said they 'take Medicare'. Is that the same answer?",
    a: "Not necessarily. Accepting Medicare and being in a particular Medicare Advantage plan's network are two different things, and practice staff sometimes answer the first question when you meant the second. Ask about the specific plan by name.",
  },
  {
    q: "What if my spouse and I use different doctors?",
    a: "Then you may want different plans. There's no rule that a couple has to be on the same one, and choosing together when your needs differ is a common way people end up unhappy.",
  },
  {
    q: "Can you just check for me?",
    a: "Yes, and that's usually the fastest way. Tell me who you see and where you'd rather be treated, and I'll come back with what I can offer that fits — and tell you honestly when the answer is that a plan I can't offer suits you better.",
  },
] as const;

export default function KeepMyDoctorPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <section className="bg-[var(--color-paper)] pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="app-shell max-w-3xl">
          <p className="text-[13px] font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
            Greensboro &amp; the Triad
          </p>
          <h1 className="mt-3 text-[32px] leading-[1.12] font-semibold tracking-tight text-balance md:text-[42px]">
            &ldquo;Can I keep my doctor?&rdquo;
          </h1>
          <p className="mt-5 text-[20px] leading-relaxed text-[var(--color-ink-muted)]">
            It&apos;s the first thing almost everyone asks, and it&apos;s the question a national
            call center answers worst — because the answer depends on which practices around here
            take which specific plan, and that isn&apos;t something a script in another state knows.
          </p>
          <p className="mt-4 text-[19px] leading-relaxed">
            The good news is that it&apos;s knowable before you commit to anything. Here&apos;s how
            the answer is actually determined, and how to check it properly.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/start?topic=medicare"
              className="inline-flex h-16 min-h-16 items-center justify-center rounded-[12px] bg-[var(--color-navy)] px-8 text-[19px] font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95"
            >
              Tell me who you see →
            </Link>
            <a
              href={AGENT.phoneHref}
              className="inline-flex h-16 min-h-16 items-center justify-center gap-2 rounded-[12px] border-2 border-[var(--color-navy)] px-6 text-[19px] font-semibold text-[var(--color-navy)] transition-colors hover:bg-[rgba(15,34,65,0.05)]"
            >
              <Phone className="size-5" aria-hidden />
              {AGENT.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="app-shell max-w-3xl">
          <h2 className="text-[28px] font-semibold">It comes down to which road you take</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="card-surface p-6">
              <h3 className="text-[20px] font-semibold">Original Medicare</h3>
              <p className="mt-3 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                No network. Any provider in the country who accepts Medicare — and most do. If
                keeping a particular specialist matters more than anything else, this is the route
                that protects it. Usually paired with supplemental coverage, which has its own
                six-month window at 65 when your health history can&apos;t be held against you.
              </p>
            </div>
            <div className="card-surface p-6">
              <h3 className="text-[20px] font-semibold">Medicare Advantage</h3>
              <p className="mt-3 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                Works through a network, like employer insurance did. Often includes extras, and
                plenty of people are happy on one. But your doctors need checking against the
                specific plan before you sign up — and again every fall, because networks are
                renegotiated every year.
              </p>
            </div>
          </div>
          <p className="mt-6 text-[18px] leading-relaxed">
            Neither is the right answer in general. Which one is right depends on who you see, how
            often, and how much unpredictability you can live with — which is a twenty-minute
            conversation, not a web page.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="app-shell max-w-3xl">
          <h2 className="text-[28px] font-semibold">How to check properly</h2>
          <p className="mt-3 text-[18px] leading-relaxed text-[var(--color-ink-muted)]">
            If you do nothing else on this page, do step three. It is the one that settles the
            question, and it is the one almost everybody skips.
          </p>
          <ol className="mt-8 flex flex-col gap-6">
            {CHECK_STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-[17px] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-[19px] font-semibold">{step.title}</h3>
                  <p className="mt-1 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="app-shell max-w-3xl">
          <h2 className="text-[28px] font-semibold">Around here specifically</h2>
          <p className="mt-4 text-[18px] leading-relaxed">
            Most people in Greensboro and the surrounding towns are attached to one of the large
            systems in the area — Cone Health locally, with Novant Health and Atrium Health Wake
            Forest Baptist serving much of the wider Triad — plus a set of independent practices
            people have often used for decades.
          </p>
          <p className="mt-4 text-[18px] leading-relaxed text-[var(--color-ink-muted)]">
            I deliberately don&apos;t publish a table of which plans each of them takes. Those
            arrangements change annually, they vary plan by plan rather than by insurance company,
            and a page that&apos;s six months stale is exactly how somebody chooses a plan and then
            loses their doctor. Checking it properly for your specific doctors takes me a few
            minutes, so ask me instead of trusting a table.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--color-ink-muted)]">
            I have no affiliation with any of those health systems; they&apos;re named here only
            because they&apos;re where most people in the area are seen.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="app-shell max-w-3xl">
          <h2 className="text-[28px] font-semibold">Common questions</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-[19px] font-semibold">{item.q}</dt>
                <dd className="mt-2 text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
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

      <section className="bg-white py-14">
        <div className="app-shell max-w-2xl text-center">
          <h2 className="text-[28px] font-semibold">Tell me who you see</h2>
          <p className="mt-4 text-[18px] text-[var(--color-ink-muted)]">
            Give me the names and I&apos;ll check them against what I can offer — and tell you
            plainly when something I can&apos;t offer would suit you better.
          </p>
          <Link
            href="/start?topic=medicare"
            className="mt-8 inline-flex min-h-14 min-w-[260px] items-center justify-center rounded-xl bg-[var(--color-navy)] px-8 py-4 text-[18px] font-semibold text-[var(--color-paper)]"
          >
            Start here →
          </Link>
          <p className="mt-6 text-[17px] text-[var(--color-ink-muted)]">
            Or call{" "}
            <a
              href={AGENT.phoneHref}
              className="font-semibold text-[var(--color-navy)] underline underline-offset-2"
            >
              {AGENT.phone}
            </a>{" "}
            — {AGENT.hours}.
          </p>
        </div>
      </section>

      <div className="app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
