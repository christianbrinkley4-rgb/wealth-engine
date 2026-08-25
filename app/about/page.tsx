import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { AGENT, COMPENSATION_DISCLOSURE, hasPublishableNpn } from "@/lib/agent";

export const metadata: Metadata = {
  title: "About Christian Brinkley",
  description:
    "Christian Brinkley is a licensed insurance agent in Greensboro, NC, finishing a master’s in accounting at UNCG. He answers every question himself.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <section className="bg-[var(--color-paper)] py-12 md:py-16">
        <div className="app-shell">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[2fr_3fr] md:gap-14">
            <Image
              src="/christian-brinkley.jpg"
              alt={`${AGENT.name}, licensed insurance agent in Greensboro, North Carolina`}
              width={1200}
              height={1600}
              priority
              sizes="(max-width: 768px) 100vw, 320px"
              className="w-full max-w-[320px] rounded-2xl border border-[rgba(15,34,65,0.1)] object-cover shadow-[0_12px_40px_rgba(15,34,65,0.08)]"
            />

            <div>
              <h1 className="text-34 leading-tight font-semibold tracking-tight text-[var(--color-navy)]">
                {AGENT.name}
              </h1>
              <p className="text-19 mt-2 font-medium text-[var(--color-navy)]">
                Licensed insurance agent · {AGENT.city}, {AGENT.state}
              </p>
              <p className="text-19 mt-4 max-w-xl leading-relaxed text-[var(--color-ink-muted)]">
                {AGENT.linesOfAuthority.join(" and ")} licensed in {AGENT.licensedStates.join(", ")}
                . Finishing a master’s in accounting at UNC Greensboro. This site is my own — it
                isn’t a call center or a lead-generation company.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={AGENT.phoneHref}
                  className="text-18 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)]"
                >
                  <Phone className="size-5" aria-hidden />
                  {AGENT.phone}
                </a>
                <a
                  href={`mailto:${AGENT.email}`}
                  className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-[var(--color-navy)] px-6 font-semibold text-[var(--color-navy)]"
                >
                  Email me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-white py-14">
        <div className="measure-prose app-shell text-18 max-w-3xl space-y-7 leading-[1.85] text-[var(--color-navy)]">
          <p>
            I grew up around here and I still live here. What got me into this work was watching how
            differently two people can end up on the same decision — one who happened to hear about
            a deadline in time, and one who didn’t.
          </p>
          <p>
            Most of what goes wrong with Medicare isn’t someone picking the wrong plan. It’s a
            seven-month enrollment window that quietly closed, or a six-month window for
            supplemental coverage that nobody mentioned, or a premium set from a tax return two
            years old that could have been appealed. None of that is complicated. It just isn’t
            explained anywhere you’d naturally look.
          </p>
          <p>
            So the deal here is simple: tell me what you’re trying to work out, and I’ll tell you
            the part that matters. If that turns into me helping you with coverage, good. If it
            turns into me telling you that you’re already fine, or that you need an accountant
            rather than an agent, that’s a good outcome too — and it happens regularly.
          </p>
          <p>
            The accounting side of my background is why I keep dragging these conversations back to
            taxes and timing. Insurance and tax questions in retirement are the same question most
            of the time, and very few people get to talk to someone looking at both.
          </p>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <div className="rounded-xl border border-[rgba(15,34,65,0.12)] bg-white p-6 md:p-8">
            <h2 className="text-22 font-semibold text-[var(--color-navy)]">How I get paid</h2>
            <p className="text-18 mt-3 leading-relaxed text-[var(--color-navy)]">
              {COMPENSATION_DISCLOSURE}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-white py-14">
        <div className="app-shell max-w-xl">
          <div className="rounded-xl border border-[rgba(15,34,65,0.1)] bg-white p-6 md:p-8">
            <h2 className="text-20 font-semibold text-[var(--color-navy)]">
              Licensing and education
            </h2>
            <ul className="text-17 mt-4 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-navy)]">
              <li>
                Licensed insurance producer — {AGENT.linesOfAuthority.join(", ")} — in{" "}
                {AGENT.licensedStates.join(", ")}
              </li>
              {hasPublishableNpn() ? <li>National Producer Number {AGENT.npn}</li> : null}
              <li>Master’s in Accounting, University of North Carolina at Greensboro</li>
              <li>Coursework in individual tax and financial planning</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-[var(--color-paper)] py-16">
        <div className="app-shell text-center">
          <h2 className="text-26 font-semibold text-[var(--color-navy)]">
            What are you trying to figure out?
          </h2>
          <p className="text-17 mx-auto mt-4 max-w-lg text-[var(--color-ink-muted)]">
            Two questions, and you’ll have something useful before I ask for anything.
          </p>
          <Link
            href="/start"
            className="text-17 mt-8 inline-flex min-h-14 min-w-[240px] items-center justify-center rounded-xl bg-[var(--color-navy)] px-8 py-4 font-semibold text-[var(--color-paper)] transition-opacity hover:opacity-95"
          >
            Ask your question →
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
    </main>
  );
}
