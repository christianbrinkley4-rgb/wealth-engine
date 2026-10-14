import type { Metadata } from "next";
import { ServiceHero } from "@/app/components/ServiceHero";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

const QUESTIONS = [
  {
    q: "Are you licensed in North Carolina?",
    a: "Yes. I’m a licensed Life and Health insurance agent in North Carolina. You can verify my license through the NC Department of Insurance.",
  },
  {
    q: "Do you work with more than one insurance company?",
    a: "Yes. I represent a limited number of insurance companies. I’ll tell you which companies I work with and what I can help you review.",
  },
  {
    q: "How do you get paid?",
    a: "The consultation is free with no obligation. If you enroll through me, the insurance company pays me a commission. Your premium is the same as if you enrolled on your own. There is no markup to you.",
  },
  {
    q: "Will you be the person I talk to next year?",
    a: "Yes. You talk directly to me. You can return to me with questions about your coverage and your next annual review.",
  },
  {
    q: "Can you help me compare my current plan against other options?",
    a: "Yes. Bring your Annual Notice of Change letter, your prescription list, and your doctors' names. I’ll walk through costs, drug coverage, and provider networks side by side.",
  },
  {
    q: "What if I want to stay on my current plan?",
    a: "Keeping your plan is a useful outcome when it still fits. I’ll explain your options, and you decide whether to make a change.",
  },
  {
    q: "Do you sell my information?",
    a: "No. I review your inquiry personally. I do not sell your contact information to other agents or lead companies.",
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
    description: "Eight questions worth asking any Medicare agent, answered honestly.",
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
      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Medicare guides", href: "/learn" },
          { name: "Questions to ask an agent" },
        ]}
        eyebrow="Medicare help · Greensboro and the Triad"
        title="Eight questions to ask a Medicare agent"
        lede="Before you meet with a Medicare agent, ask about licensing, plan choices, costs, and what happens after enrollment. Here are my answers in plain language."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Ask me your question"
      />
      <article className="shell measure-prose section max-w-3xl">
        {QUESTIONS.map((item) => (
          <section key={item.q} className="border-t border-gray-300 py-7">
            <h2 className="text-28">{item.q}</h2>
            <p className="text-18 mt-3">{item.a}</p>
          </section>
        ))}
        <ComplianceDisclosure variant="medicare" />
      </article>
      <KitchenTableClose
        heading="Bring your Medicare questions."
        body="I can review your doctors, prescriptions, and enrollment dates with you. Your consultation is free, with no obligation to enroll."
        href="/start?topic=medicare&quick=1"
        label="Request a free consultation"
      />
    </main>
  );
}
