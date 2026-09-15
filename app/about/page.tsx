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
    "Meet Christian Brinkley, a local licensed insurance agent and UNCG master’s student. Personal Medicare and insurance help at home or by phone. No-cost consultation.",
  alternates: { canonical: "/about" },
  openGraph: pageOpenGraph({
    title: "About Christian Brinkley — licensed Greensboro agent",
    description:
      "Get to know Christian, his connection to the Triad, and his approach to helping families throughout retirement.",
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
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[2fr_3fr] md:gap-14">
            <Image
              src="/christian-brinkley.jpg"
              alt={`${AGENT.name}, licensed insurance agent in Greensboro, North Carolina`}
              width={1200}
              height={1600}
              priority
              sizes="(max-width: 768px) 100vw, 320px"
              className="order-2 h-52 w-full max-w-[320px] rounded-2xl border border-white/15 object-cover object-top shadow-[0_18px_50px_rgba(0,0,0,0.28)] md:order-1 md:h-auto"
            />

            <div className="order-1 md:order-2">
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
                I’m a licensed insurance agent in {AGENT.licensedStates.join(", ")}, working toward
                my master’s in accounting at UNC Greensboro. I sit down with families at their
                kitchen tables to understand their questions and what they want to protect. Your
                insurance consultation is no cost, with no obligation to buy anything.
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
            My life and my education are here in the Triad. I want to be someone you know and can
            come back to throughout retirement. A policy is one decision; the questions continue
            when your health, family, work, and priorities change.
          </p>
          <p>
            We can start with Medicare, life insurance, long-term or short-term care, critical
            illness coverage, or annuities. We’ll look at what you already have, discuss your needs
            and budget, and work toward a clear next step. You’re welcome to include your spouse or
            another family member.
          </p>
          <p>
            My approach is to listen first, explain the options I offer in plain language, and give
            you room to decide. We can meet at your home, at a convenient public location, or by
            phone. If your current coverage still fits, that is a useful conclusion too.
          </p>
          <p>
            My accounting studies help me understand how retirement decisions connect. I’m currently
            a licensed insurance agent, and I work with an advisor for retirement financial
            planning. Tax, legal, and investment advice belongs with the appropriately qualified
            professional. I’ll help you identify when that conversation would be useful.
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
            What happens when you get in touch{" "}
          </h2>
          <ol className="mt-8 flex flex-col gap-6">
            {[
              {
                t: "Your answers are stored",
                b: "Your information comes directly to me. It is kept private and is never sold or sent to other agents.",
              },
              {
                t: "I get an alert",
                b: "Your request comes straight to me for a personal review. If you’d like to talk sooner, call or email me directly.",
              },
              {
                t: "You hear from me",
                b: "I’ll get in touch so we can arrange a time and place that work for you, including a visit at home or a phone conversation.",
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
              <li>{AGENT.education}</li>
              <li>Coursework in individual tax and financial planning</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(15,34,65,0.08)] bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <LeadCluster heading="Questions I can help with" />
        </div>
      </section>

      <KitchenTableClose
        heading="What are you trying to figure out?"
        body="Tell me what’s on your mind. We can arrange a no-cost conversation about your coverage and next steps."
        href="/start"
        label="Ask your question →"
      />
    </main>
  );
}
