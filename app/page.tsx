import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Lock, MapPin, Phone, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AGENT, COMPENSATION_DISCLOSURE } from "@/lib/agent";
import { localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Medicare & Retirement Questions — Greensboro, NC",
  description:
    "Straight answers on Medicare timing, retirement income, and life insurance for Piedmont Triad households. Christian Brinkley is a licensed agent in Greensboro. No cost to talk.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Medicare & Retirement Questions — Greensboro",
    description:
      "A licensed local agent, two short questions, and a real answer before you give up your phone number.",
    url: "/",
    type: "website",
  },
};

const primaryCta =
  "inline-flex h-16 min-h-16 w-full shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-navy)] px-6 text-[20px] font-semibold text-balance text-[var(--color-paper)] transition-opacity hover:opacity-95 md:w-auto md:min-w-[280px] md:px-8";

const TOPICS = [
  {
    label: "Medicare",
    href: "/start?topic=medicare",
    blurb: "Enrollment windows, what the parts cover, why your premium is what it is",
  },
  {
    label: "Retirement income",
    href: "/start?topic=financial_planning",
    blurb: "Social Security timing, which accounts to draw from, taxes in retirement",
  },
  {
    label: "Life insurance",
    href: "/start?topic=life_insurance",
    blurb: "Coverage that ends at retirement, final expenses, reviewing what you have",
  },
] as const;

const FAQ = [
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
    a: "No. Your answers come to me and stay with me. I don't sell leads, I don't pass your name to a call center, and I'm not part of a national referral network. One person — me — reads what you wrote and calls you.",
  },
  {
    q: "What actually happens after I submit the form?",
    a: "You get an email straight away with your answers and the guidance you saw on screen. Then I call or email you personally, usually the same day and always within one business day. If you'd rather pick the time, there's a scheduling link in that email.",
  },
  {
    q: "Do I have to buy anything?",
    a: "No. A good share of these conversations end with me telling someone their current coverage is fine, or that what they need is a CPA or an attorney rather than an agent. That's a useful answer too.",
  },
] as const;

export default function HomePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />

      {/* ---------- hero ---------- */}
      <section className="bg-[var(--color-paper)] pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[3fr_2fr] md:gap-14">
            <div>
              <p className="text-[13px] font-medium tracking-[0.12em] text-[var(--color-gold-ink)] uppercase">
                Greensboro · Piedmont Triad
              </p>

              <h1 className="mt-4 text-[34px] leading-[1.12] font-semibold tracking-tight text-balance text-[var(--color-navy)] md:text-[46px]">
                Medicare decides your premium using a tax return from two years ago.
              </h1>

              <p className="mt-5 max-w-xl text-[20px] leading-relaxed text-[var(--color-ink-muted)]">
                That&apos;s the kind of thing nobody tells you until it shows up on a statement.
                Tell me what you&apos;re trying to sort out and I&apos;ll give you the part that
                actually matters — before I ask for anything.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button asChild className={primaryCta}>
                  <Link href="/start">Ask your question →</Link>
                </Button>
                <a
                  href={AGENT.phoneHref}
                  className="inline-flex h-16 min-h-16 items-center justify-center gap-2 rounded-[12px] border-2 border-[var(--color-navy)] px-6 text-[19px] font-semibold text-[var(--color-navy)] transition-colors hover:bg-[rgba(15,34,65,0.05)]"
                >
                  <Phone className="size-5" aria-hidden />
                  {AGENT.phone}
                </a>
              </div>
              <p className="mt-4 text-[16px] text-[var(--color-ink-muted)]">
                Two questions, then a real answer. No cost, and your information is never sold.
              </p>

              <div className="mt-10 flex flex-col gap-3">
                {TOPICS.map((topic) => (
                  <Link
                    key={topic.label}
                    href={topic.href}
                    className="group flex min-h-16 flex-col justify-center rounded-xl border border-[rgba(15,34,65,0.14)] bg-white px-5 py-4 transition-colors hover:border-[var(--color-navy)]"
                  >
                    <span className="text-[18px] font-semibold text-[var(--color-navy)]">
                      {topic.label} →
                    </span>
                    <span className="mt-1 text-[16px] leading-snug text-[var(--color-ink-muted)]">
                      {topic.blurb}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <figure className="m-0">
              <Image
                src="/christian-brinkley.jpg"
                alt={`${AGENT.name}, licensed insurance agent in Greensboro, North Carolina`}
                width={1200}
                height={1600}
                priority
                sizes="(max-width: 768px) 100vw, 380px"
                className="w-full rounded-2xl border border-[rgba(15,34,65,0.1)] object-cover shadow-[0_12px_40px_rgba(15,34,65,0.10)]"
              />
              <figcaption className="mt-4 text-[16px] leading-snug text-[var(--color-navy)]">
                <span className="block text-[18px] font-semibold">{AGENT.name}</span>
                <span className="block text-[var(--color-ink-muted)]">
                  Licensed insurance agent · {AGENT.city}, {AGENT.state}
                </span>
                <span className="block text-[var(--color-ink-muted)]">{AGENT.education}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- what happens next ---------- */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-[30px] font-semibold text-[var(--color-navy)]">
            What happens after you hit send
          </h2>
          <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                n: "1",
                t: "You get your answers by email",
                b: "Straight away — the same guidance you saw on screen, in writing, so you can read it again or show it to your spouse.",
              },
              {
                n: "2",
                t: "I read what you wrote",
                b: "Me personally, not a call center and not an assistant. Your answers tell me what to look up before we speak.",
              },
              {
                n: "3",
                t: "I call or email you",
                b: "Usually the same day, always within one business day. Pick your own time from the link in the email if you'd rather.",
              },
            ].map((step) => (
              <li key={step.n} className="flex flex-col gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-[var(--color-navy)] text-[18px] font-bold text-[var(--color-paper)]">
                  {step.n}
                </span>
                <h3 className="text-[19px] font-semibold text-[var(--color-navy)]">{step.t}</h3>
                <p className="text-[17px] leading-relaxed text-[var(--color-ink-muted)]">
                  {step.b}
                </p>
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
              <p className="text-[13px] font-medium tracking-[0.12em] text-[var(--color-gold)] uppercase">
                Why I built this
              </p>
              <h2 className="mt-3 text-[28px] leading-snug font-semibold text-[var(--color-paper)]">
                One local agent. No lead network.
              </h2>
              <div
                className="mt-6 space-y-4 text-[18px] leading-[1.75]"
                style={{ color: "rgba(245, 240, 232, 0.9)" }}
              >
                <p>
                  Most Medicare forms online hand your phone number to a dozen strangers who all
                  call at once. I built this so there&apos;s a version where a neighbor asks a
                  question and one person answers it.
                </p>
                <p>
                  I&apos;m a licensed insurance agent here in Greensboro, finishing a master&apos;s
                  in accounting at UNCG. That combination is why I&apos;d rather talk about
                  enrollment deadlines and tax brackets than sell you something you don&apos;t need.
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
                  body: `${AGENT.linesOfAuthority.join(" and ")} licensed in ${AGENT.licensedStates.join(", ")}`,
                },
                {
                  Icon: Phone,
                  title: "You reach me",
                  body: "The number on this page is my phone, not a queue",
                },
                {
                  Icon: Lock,
                  title: "Never sold",
                  body: "Your answers go to me and stay with me",
                },
                {
                  Icon: Clock,
                  title: "One business day",
                  body: "Usually the same day, and you get your answers instantly",
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
                  <h3 className="text-[17px] font-semibold text-[var(--color-paper)]">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-paper)]/80">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-[30px] font-semibold text-[var(--color-navy)]">
            The questions people actually ask me
          </h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-[19px] font-semibold text-[var(--color-navy)]">{item.q}</dt>
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

      {/* ---------- closing CTA ---------- */}
      <section className="bg-[var(--color-paper)] py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-[30px] font-semibold text-[var(--color-navy)]">
            Start with whatever&apos;s bothering you
          </h2>
          <p className="mt-4 text-[18px] text-[var(--color-ink-muted)]">
            Two questions and you&apos;ll have something useful, whether or not we ever talk.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Button asChild className={primaryCta}>
              <Link href="/start">Ask your question →</Link>
            </Button>
            <a
              href={AGENT.phoneHref}
              className="text-[18px] font-semibold text-[var(--color-navy)] underline underline-offset-4"
            >
              Or call {AGENT.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-[16px] text-[var(--color-ink-muted)]">
          <span>Also here:</span>
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
        </div>
      </section>
    </main>
  );
}
