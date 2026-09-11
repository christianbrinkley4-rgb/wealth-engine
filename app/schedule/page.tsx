import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import { AGENT } from "@/lib/agent";
import {
  bookingUrlForTopic,
  isSchedulingTopic,
  SCHEDULING_LABELS,
  SCHEDULING_TOPICS,
  type SchedulingTopic,
} from "@/lib/scheduling";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Talk with Christian Brinkley",
  description:
    "Request a personal conversation about Medicare, life insurance, or retirement planning questions with Christian Brinkley in the Piedmont Triad.",
  alternates: { canonical: "/schedule" },
  robots: { index: false, follow: true },
  openGraph: pageOpenGraph({
    title: "Let’s talk through your questions",
    description:
      "One local point of contact. A free initial insurance consultation with Christian Brinkley.",
    path: "/schedule",
  }),
};

const TOPIC_DESCRIPTIONS: Record<SchedulingTopic, string> = {
  medicare:
    "Let’s talk about when to enroll, the coverage you have, your doctors and prescriptions, and the Medicare options I represent. This conversation stays focused on Medicare and the health coverage topics we agree to discuss.",
  life_insurance:
    "Let’s review who you want to protect, the coverage you already have, and what your family may need as life changes. We can talk through policy types, costs, and your questions before you decide anything.",
  care_coverage:
    "Let’s talk about long-term care, short-term care, or critical illness insurance. We can review the help you might need, the support your family has, and the benefits and limits of coverage you’re considering.",
  financial_planning:
    "Let’s start with your retirement insurance needs and the questions on your mind. I can explain insurance options, including annuities, and arrange an introduction to an advisor for financial planning if you would like one.",
};

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string | string[] }>;
}) {
  const rawTopic = (await searchParams).topic;
  const topic = isSchedulingTopic(rawTopic) ? rawTopic : null;
  const bookingUrl = bookingUrlForTopic(topic);
  const requestHref = topic ? `/start?topic=${topic}` : "/start";

  return (
    <main className="personal-schedule bg-[#faf8f2] px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-4">
          <Image
            src="/christian-brinkley-square.jpg"
            alt="Christian Brinkley"
            width={76}
            height={76}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{AGENT.name}</p>
            <p className="text-16 text-[#53605f]">Licensed insurance agent · Greensboro, NC</p>
          </div>
        </div>
        <p className="personal-eyebrow">A CONVERSATION, AT YOUR PACE</p>
        <h1>
          {topic
            ? SCHEDULING_LABELS[topic]
            : "Your family. Your questions. Your free consultation."}
        </h1>
        <p className="personal-body">
          {topic
            ? TOPIC_DESCRIPTIONS[topic]
            : "Choose what you’d like to discuss so we can set aside time for the right conversation. Your consultation comes directly to me, Christian Brinkley."}
        </p>
        <p className="personal-body">
          We can meet at your home, at a convenient public location, by phone, or by video. A family
          member is welcome. There is no cost for this insurance consultation and no obligation to
          buy. Any separate financial planning services and fees would be explained by the advisor
          before you agree to them.
        </p>
        {!topic ? (
          <nav
            aria-label="Choose your consultation topic"
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {SCHEDULING_TOPICS.map((service) => (
              <Link
                key={service}
                href={`/schedule?topic=${service}`}
                className="text-18 flex min-h-20 items-center justify-between gap-4 rounded-lg border border-[#cdd6c9] bg-white p-5 font-semibold hover:border-[#254f46] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#254f46]"
              >
                {SCHEDULING_LABELS[service]}
                <ArrowRight size={20} className="shrink-0" aria-hidden />
              </Link>
            ))}
          </nav>
        ) : (
          <Link href="/schedule" className="personal-text-link mt-3">
            Choose a different topic
          </Link>
        )}
        {topic || bookingUrl ? (
          <div className="mt-8 rounded-lg border border-[#cdd6c9] bg-white p-6 md:p-8">
            <h2 className="text-26">
              {bookingUrl
                ? "Choose a time that works for you."
                : "Tell me a little about what you need."}
            </h2>
            <p className="personal-body">
              {bookingUrl
                ? "Open the calendar to see available times and meeting details. Follow its steps to select a time, and look for your appointment confirmation before making plans."
                : "Answer a few short questions, then tell me how you’d like to meet and a convenient time. I’ll follow up to arrange our conversation. Your request goes directly to me."}
            </p>
            {bookingUrl ? (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="personal-button"
              >
                View available times <ArrowRight size={19} aria-hidden />
              </a>
            ) : (
              <Link href={requestHref} className="personal-button">
                Request a conversation <ArrowRight size={19} aria-hidden />
              </Link>
            )}
            <p className="text-15 mt-3 text-[#53605f]">
              {bookingUrl
                ? "Opens the booking calendar in a new tab."
                : "An appointment is confirmed once we agree on a time."}
            </p>
          </div>
        ) : null}
        <ul className="text-17 my-8 space-y-3">
          {[
            "Free initial insurance consultation. No obligation to enroll.",
            "In person, by phone, or by video, depending on what works for you.",
            "Your information is not sold or distributed to other agents.",
          ].map((text) => (
            <li key={text} className="flex gap-3">
              <Check size={19} className="mt-1 shrink-0 text-[#254f46]" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-6 border-t border-[#d9ded8] pt-6">
          <a className="personal-text-link" href={AGENT.phoneHref}>
            <Phone size={18} aria-hidden />
            {AGENT.phone}
          </a>
          <a className="personal-text-link" href={`mailto:${AGENT.email}`}>
            <Mail size={18} aria-hidden />
            Email Christian
          </a>
        </div>
        <p className="text-16 mt-5 text-[#53605f]">
          For a Medicare plan discussion, any required permission and scope of appointment will be
          arranged before the meeting. Please keep Medicare numbers, Social Security numbers, and
          medical records out of the contact form.
        </p>
      </div>
    </main>
  );
}
