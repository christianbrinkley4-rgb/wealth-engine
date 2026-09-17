import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, HeartHandshake } from "lucide-react";
import { AGENT } from "@/lib/agent";
import { pageOpenGraph } from "@/lib/seo";

const description =
  "Talk with Christian Brinkley about long-term care, short-term care, and critical illness insurance. A no-cost, no-obligation consultation in the Piedmont Triad.";
export const metadata: Metadata = {
  title: "Care and Critical Illness Insurance",
  description,
  alternates: { canonical: "/care-coverage" },
  openGraph: pageOpenGraph({
    title: "A conversation about your family’s care",
    description,
    path: "/care-coverage",
  }),
};
const options = [
  {
    title: "Long-term care",
    href: "/long-term-care-insurance",
    detail:
      "Explore insurance designed for ongoing care needs. We can review where care may be received, what qualifies for benefits, and how benefits are limited.",
    question: "Who would help if everyday activities became difficult?",
  },
  {
    title: "Short-term care",
    href: "/short-term-care-insurance",
    detail:
      "Look at coverage with a shorter benefit period. We can discuss the services included, eligibility requirements, and how it fits with coverage you already have.",
    question: "What help could your family need during a period of recovery?",
  },
  {
    title: "Critical illness",
    href: "/critical-illness-insurance",
    detail:
      "Understand benefits tied to the covered illnesses defined in a policy. We can review those definitions, exclusions, waiting periods, and how a benefit may be used.",
    question: "How would a serious covered illness affect the household budget?",
  },
];

export default function CareCoveragePage() {
  return (
    <main className="personal-home">
      <section className="personal-hero personal-section personal-shell">
        <p className="personal-eyebrow">FOR THE PEOPLE WHO MATTER TO YOU</p>
        <h1>
          Let’s talk about care,
          <br />
          <em>before you have to arrange it.</em>
        </h1>
        <p className="personal-lede">
          A conversation can help your family understand the choices. I’m {AGENT.name}, a local
          licensed insurance agent. We can sit down at your kitchen table, review what you have, and
          talk through the care coverage I offer.
        </p>
        <div className="personal-actions">
          <Link className="personal-button" href="/start?topic=care_coverage">
            Request my free consultation <ArrowRight size={19} aria-hidden />
          </Link>
        </div>
        <p className="personal-micro">
          <Check size={16} aria-hidden /> No cost. No obligation to buy. Family members are welcome.
        </p>
      </section>
      <section className="personal-guides personal-section">
        <div className="personal-shell">
          <p className="personal-eyebrow">THREE DIFFERENT CONVERSATIONS</p>
          <h2>Start with the kind of help you’re thinking about.</h2>
          <div className="personal-guide-grid mt-8">
            {options.map((option) => (
              <article key={option.title} className="personal-guide">
                <HeartHandshake size={26} strokeWidth={1.5} aria-hidden />
                <h3>{option.title}</h3>
                <p>{option.detail}</p>
                <p>
                  <strong>A starting question:</strong> {option.question}
                </p>
                <Link href={option.href} className="personal-text-link">
                  Read the guide <ArrowRight size={18} aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="personal-section personal-shell personal-about">
        <div>
          <p className="personal-eyebrow">MAKE OUR CONVERSATION USEFUL</p>
          <h2>Your questions are enough to get started.</h2>
          <p className="personal-body">
            If you have an existing policy, bring it along. A spouse or family member is welcome.
            We’ll discuss your priorities and budget before looking at coverage.
          </p>
        </div>
        <div className="rounded-lg border border-[#cdd6c9] bg-white p-6">
          <h3>Questions we can work through together</h3>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-lg">
            <li>What does my current coverage include?</li>
            <li>What starts a benefit, and when can it be paid?</li>
            <li>What are the limits, exclusions, and waiting periods?</li>
            <li>What would premiums mean for my budget over time?</li>
            <li>What could my family still need to pay for?</li>
          </ul>
        </div>
      </section>
      <section className="personal-close">
        <div className="personal-shell">
          <h2>A plan begins with a conversation.</h2>
          <p>We’ll talk through your options and the questions that matter to your family.</p>
          <Link className="personal-button personal-button-light" href="/start?topic=care_coverage">
            Request my free consultation <ArrowRight size={19} aria-hidden />
          </Link>
          <p className="personal-close-note">
            Coverage and eligibility depend on the specific policy and underwriting. This is an
            insurance consultation.
          </p>
        </div>
      </section>
    </main>
  );
}
