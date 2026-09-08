import type { Metadata } from "next";
import Image from "next/image";
import { Phone } from "lucide-react";

import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LeadCluster } from "@/app/components/LeadCluster";
import { AGENT, COMPENSATION_DISCLOSURE, hasPublishableNpn } from "@/lib/agent";
import { breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";
import { SERVICE_AREA_LABEL } from "@/lib/triad";

export const metadata: Metadata = {
  title: "About Christian Brinkley",
  description:
    "Christian Brinkley is a licensed insurance agent in Greensboro and a UNCG master’s student. He reviews every case himself — at your kitchen table, no cost, no obligation.",
  alternates: { canonical: "/about" },
  openGraph: pageOpenGraph({
    title: "About Christian Brinkley — licensed Greensboro agent",
    description:
      "A local master’s student and licensed agent who sits down at your kitchen table instead of sending you to a call center.",
    path: "/about",
  }),
};

export default function AboutPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ),
        }}
      />

      <section className="bg-[var(--color-navy)] py-12 text-[var(--color-paper)] md:py-16">
        <div className="app-shell">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[2fr_3fr] md:gap-14">
            <Image
              src="/christian-brinkley.jpg"
              alt={`${AGENT.name}, licensed insurance agent in Greensboro, North Carolina`}
              width={1200}
              height={1600}
              priority
              sizes="(max-width: 768px) 100vw, 320px"
              className="w-full max-w-[320px] rounded-2xl border border-white/15 object-cover shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
            />

            <div>
              <p className="text-13 font-medium tracking-[0.12em] text-[var(--color-gold)] uppercase">
                {SERVICE_AREA_LABEL}
              </p>
              <h1 className="text-34 mt-3 leading-tight font-semibold tracking-tight">
                {AGENT.name}
              </h1>
              <p className="text-19 mt-2 font-medium text-[var(--color-paper)]/90">
                Licensed insurance agent · {AGENT.city}, {AGENT.state}
              </p>
              <p className="text-19 mt-4 max-w-xl leading-relaxed text-[var(--color-paper)]/85">
                Licensed in {AGENT.licensedStates.join(", ")}, and finishing a master’s in
                accounting at UNC Greensboro. This site is mine. It isn’t a call center, and it
                isn’t a lead company dressed up to look like one person. If we talk, we sit down at
                your kitchen table — or on the phone, if that’s easier.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={AGENT.phoneHref}
                  className="text-18 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-paper)] px-6 font-semibold text-[var(--color-navy)]"
                >
                  <Phone className="size-5" aria-hidden />
                  {AGENT.phone}
                </a>
                <a
                  href={`mailto:${AGENT.email}`}
                  className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-[var(--color-paper)]/70 px-6 font-semibold text-[var(--color-paper)]"
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
            So the deal here is simple: tell me what you’re trying to figure out, and I’ll tell you
            the part that matters. We can do that at your kitchen table, at a coffee shop, or on the
            phone — anywhere I can reach in about 30 minutes from downtown Greensboro, not only the
            three largest cities. If that turns into me helping you with coverage, good. If it turns
            into me telling you that you’re already fine, or that you need an accountant rather than
            an agent, that’s a good outcome too — and it happens regularly.
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
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold text-[var(--color-navy)]">
            What happens when you send a form
          </h2>
          <ol className="mt-8 flex flex-col gap-6">
            {[
              {
                t: "Your answers are stored",
                b: "They go into a private database I control. They are not sold, and they are not passed to another agent or a lead network.",
              },
              {
                t: "I get an alert",
                b: "When email or text alerting is configured on this site, I am notified as soon as you submit. If that alerting is down, the submission is still saved — and you should call or email me directly so nothing waits on a silent inbox.",
              },
              {
                t: "You hear from me",
                b: "Usually the same day, always within one business day. Kitchen table, coffee shop, or the phone — whichever you asked for. There is an operator health check on this deployment that reports whether storage and alerting are actually wired; it is not a public marketing page.",
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
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-[var(--color-paper)] py-14">
        <div className="app-shell max-w-xl">
          <div className="rounded-xl border border-[rgba(15,34,65,0.1)] bg-white p-6 md:p-8">
            <h2 className="text-20 font-semibold text-[var(--color-navy)]">
              Licensing and education
            </h2>
            <ul className="text-17 mt-4 list-disc space-y-3 pl-5 leading-relaxed text-[var(--color-navy)]">
              <li>Licensed insurance agent in {AGENT.licensedStates.join(", ")}</li>
              {hasPublishableNpn() ? <li>National Producer Number {AGENT.npn}</li> : null}
              <li>Master’s in Accounting, University of North Carolina at Greensboro</li>
              <li>Coursework in individual tax and financial planning</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <LeadCluster heading="Four things I sit down and walk through" />
        </div>
      </section>

      <KitchenTableClose
        heading="What are you trying to figure out?"
        body="Two questions, and you’ll have something useful before I ask for anything."
        href="/start"
        label="Ask your question →"
      />
    </main>
  );
}
