import type { Metadata } from "next";
import Link from "next/link";
import { ServiceHero } from "@/app/components/ServiceHero";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

const QUESTIONS = [
  {
    q: "Are you licensed in North Carolina?",
    a: "Yes. I’m a licensed Life and Health insurance agent in North Carolina. You can verify my license through the NC Department of Insurance.",
    link: { href: "/about", label: "More about Christian Brinkley" },
  },
  {
    q: "Do you work with more than one insurance company?",
    a: "Yes. I represent a limited number of insurance companies. I’ll tell you which companies I work with and what I can help you review.",
    link: { href: "/medicare-advantage-vs-medigap", label: "Compare Medicare Advantage and Medigap" },
  },
  {
    q: "How do you get paid?",
    a: "The consultation is free with no obligation. If you enroll through me, the insurance company pays me a commission. Your premium is the same as if you enrolled on your own. There is no markup to you.",
    link: { href: "/aep", label: "What a free review covers" },
  },
  {
    q: "Will you be the person I talk to next year?",
    a: "Yes. You talk directly to me. You can return to me with questions about your coverage and your next annual review.",
    link: { href: "/guides/medicare-automatic-renewal", label: "Do you have to renew Medicare every year?" },
  },
  {
    q: "Can you help me compare my current plan against other options?",
    a: "Yes. Bring your Annual Notice of Change letter, your prescription list, and your doctors' names. I’ll walk through costs, drug coverage, and provider networks side by side.",
    link: { href: "/anoc", label: "How to read your Annual Notice of Change" },
  },
  {
    q: "What if I want to stay on my current plan?",
    a: "Keeping your plan is a useful outcome when it still fits. I’ll explain your options, and you decide whether to make a change.",
    link: { href: "/aep-checklist", label: "The Annual Enrollment checklist" },
  },
  {
    q: "Do you sell my information?",
    a: "No. I review your inquiry personally. I do not sell your contact information to other agents or lead companies.",
    link: { href: "/privacy", label: "Read the privacy policy" },
  },
  {
    q: "Can my spouse or family member join the meeting?",
    a: "Absolutely. Spouses, adult children, and caregivers are welcome at every appointment, in person or by phone.",
    link: { href: "/guides/medicare-spouse-younger-than-65", label: "Medicare when your spouse is younger than 65" },
  },
  {
    q: "When should I enroll in Medicare?",
    a: "Your first chance is the 7 months around your 65th birthday: the 3 months before, your birthday month, and the 3 months after. Enroll in the first 3 months to avoid a gap in coverage.",
    link: { href: "/turning-65", label: "The turning 65 guide" },
  },
  {
    q: "What does Medicare cost each month?",
    a: "It depends on your coverage. In 2026 the standard Part B premium is $202.90 a month, and Advantage and drug plan costs vary by plan and county. The total matters more than any one premium.",
    link: { href: "/medicare-costs-2026", label: "Medicare costs in 2026" },
  },
  {
    q: "Will my doctors take my plan?",
    a: "That depends on the exact plan, not just the company name. Bring your doctor list and I will check each one against the plans you are considering before you enroll.",
    link: { href: "/medicare-advantage-doctor-networks", label: "How to check a plan's doctor network" },
  },
  {
    q: "What if my plan is ending next year?",
    a: "A plan ending is not the same as losing Medicare. Read the notice for your exact plan ID and county, then compare replacement coverage before the enrollment window closes.",
    link: { href: "/guides/medicare-advantage-plans-leaving-nc-2027", label: "Medicare Advantage plans leaving NC in 2027" },
  },
] as const;

export const metadata: Metadata = {
  title: "Questions to ask a Medicare agent | Christian Brinkley",
  description:
    "Twelve questions worth asking any Medicare agent before you meet, with Christian Brinkley's honest answers. Licensed in NC, free consultations.",
  alternates: { canonical: "/questions-to-ask-medicare-agent" },
  openGraph: pageOpenGraph({
    title: "Questions to ask a Medicare agent",
    description:
      "Twelve questions worth asking any Medicare agent before you meet, with honest answers from a licensed Greensboro NC agent.",
    path: "/questions-to-ask-medicare-agent",
  }),
  twitter: pageTwitter({
    title: "Questions to ask a Medicare agent",
    description: "Twelve questions worth asking any Medicare agent, answered honestly.",
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
        title="Twelve questions to ask a Medicare agent"
        lede="Before you meet with a Medicare agent, ask about licensing, plan choices, costs, and what happens after enrollment. Here are my answers in plain language."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Ask me your question"
      />
      <article className="shell measure-prose section max-w-3xl">
        {QUESTIONS.map((item) => (
          <section key={item.q} className="border-t border-gray-300 py-7">
            <h2 className="text-28">{item.q}</h2>
            <p className="text-18 mt-3">{item.a}</p>
            <p className="text-16 mt-3">
              <Link href={item.link.href} className="underline underline-offset-2">
                {item.link.label}
              </Link>
            </p>
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
