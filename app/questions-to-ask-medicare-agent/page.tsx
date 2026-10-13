import type { Metadata } from "next";
import Link from "next/link";
import { faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import { SITE_URL } from "@/lib/seo";

const QUESTIONS = [
  {
    q: "Are you licensed in North Carolina?",
    a: "Yes. Christian Brinkley is a licensed Life and Health insurance agent in North Carolina. You can verify any agent's license through the NC Department of Insurance.",
  },
  {
    q: "Do you work with more than one insurance company?",
    a: "Yes. Christian represents a limited number of insurance companies, not just one. He will tell you upfront which companies he works with and what he cannot help with.",
  },
  {
    q: "How do you get paid?",
    a: "The consultation is free with no obligation. If you enroll through Christian, he is paid a commission by the insurance company. Your premium is the same as if you enrolled on your own. There is no markup to you.",
  },
  {
    q: "Will you be the person I talk to next year?",
    a: "Yes. You work with Christian directly, not a call center. The same person answers your questions this year and reviews your plan next year.",
  },
  {
    q: "Can you help me compare my current plan against other options?",
    a: "Yes. Bring your Annual Notice of Change letter, your prescription list, and your doctors' names. He will walk through costs, drug coverage, and provider networks side by side.",
  },
  {
    q: "What if I want to stay on my current plan?",
    a: "That is a perfectly good outcome. The review is about making sure your plan still fits, not about switching. Many reviews end with staying put.",
  },
  {
    q: "Do you sell my information?",
    a: "No. Your contact information is not sold to other agents or lead companies. Inquiries are reviewed personally by Christian.",
  },
  {
    q: "Can my spouse or family member join the meeting?",
    a: "Absolutely. Spouses, adult children, and caregivers are welcome at every appointment, in person or by phone.",
  },
] as const;

export const metadata: Metadata = {
  title: "Questions to ask a Medicare agent | Christian Brinkley",
  description:
    "Eight questions worth asking any Medicare agent before you meet, with Christian Brinkley's honest answers. Licensed in NC, free consultations.",
  alternates: { canonical: "/questions-to-ask-medicare-agent" },
  openGraph: pageOpenGraph({
    title: "Questions to ask a Medicare agent",
    description:
      "Eight questions worth asking any Medicare agent before you meet, with honest answers from a licensed Greensboro NC agent.",
    path: "/questions-to-ask-medicare-agent",
  }),
  twitter: pageTwitter({
    title: "Questions to ask a Medicare agent",
    description:
      "Eight questions worth asking any Medicare agent, answered honestly.",
    path: "/questions-to-ask-medicare-agent",
  }),
};

export default function QuestionsToAskPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(QUESTIONS)) }}
      />
      <article>
        <h1>Questions to ask a Medicare agent</h1>
        <p>
          Before you sit down with anyone about Medicare, these are the
          questions worth asking. Here are Christian&apos;s answers, in plain
          language.
        </p>
        {QUESTIONS.map((item) => (
          <section key={item.q}>
            <h2>{item.q}</h2>
            <p>{item.a}</p>
          </section>
        ))}
        <p>
          <Link href="/schedule">Book a free consultation</Link> or call{" "}
          <a href="tel:+19194086671">(919) 408-6671</a>.
        </p>
      </article>
    </main>
  );
}
