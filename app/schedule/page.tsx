import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Mail, Phone } from "lucide-react";

import { CalEmbed } from "@/components/CalEmbed";
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
    "Let’s go over the coverage you already have, the people who matter to you, and your questions, at a comfortable pace. We can meet by phone, by video, or at your home in the Triad, and I’ll confirm the location with you. You are welcome to invite a family member. When you book, please leave out medical details, policy numbers, and account numbers.",
  care_coverage:
    "Let’s talk about long-term care, short-term care, or critical illness insurance. We can review the help you might need, the support your family has, and the benefits and limits of coverage you’re considering.",
  financial_planning:
    "Let’s start with your retirement insurance needs and the questions on your mind. I can explain insurance options, including annuities, and arrange an introduction to an advisor for financial planning if you would like one.",
};

const TOPIC_NOTES: Record<SchedulingTopic, string> = {
  medicare: "Doctors, prescriptions, enrollment timing",
  life_insurance: "Coverage you have, people you protect",
  care_coverage: "Long-term, short-term, critical illness",
  financial_planning: "Retirement income and Social Security",
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
    <main className="sched">
      <div className="shell sched-grid">
        <div className="sched-intro">
          <div className="sched-who">
            <Image
              src="/christian-brinkley-square.jpg"
              alt="Christian Brinkley"
              width={128}
              height={128}
              sizes="64px"
            />
            <p>
              <strong>{AGENT.name}</strong>
              <span>
                Licensed agent · {AGENT.licenseLine} · {AGENT.city}, {AGENT.state}
              </span>
            </p>
          </div>
          <p className="eyebrow">A conversation, at your pace</p>
          <h1>
            {topic ? SCHEDULING_LABELS[topic] : "Pick a time that works for you."}
          </h1>
          <p className="sched-lede">
            {topic
              ? TOPIC_DESCRIPTIONS[topic]
              : "Choose what you’d like to talk about so we set aside time for the right conversation. Your booking comes straight to me, Christian Brinkley."}
          </p>
          <ul className="sched-points">
            {[
              "Free initial insurance consultation. No obligation to enroll.",
              "At your home, a convenient public place, by phone, or by video. A family member is welcome.",
              "Your information is not sold or passed to other agents.",
            ].map((text) => (
              <li key={text}>
                <Check size={18} aria-hidden />
                {text}
              </li>
            ))}
          </ul>
          <p className="sched-small">
            We set aside 60 minutes. I ask for at least 24 hours’ notice.
            {topic === null || topic === "medicare"
              ? " For a Medicare conversation, I’ll also confirm with you personally before we meet."
              : ""}{" "}
            Any separate financial planning services and fees would be explained by the advisor
            before you agree to them.
          </p>
          <div className="sched-contact">
            <a href={AGENT.phoneHref}>
              <Phone size={17} aria-hidden /> {AGENT.phone}
            </a>
            <a href={`mailto:${AGENT.email}`}>
              <Mail size={17} aria-hidden /> Email Christian
            </a>
          </div>
        </div>

        <div className="sched-panel">
          {!topic ? (
            <nav aria-label="Choose your consultation topic" className="sched-topics">
              <p className="sched-step">Step 1 · What would you like to talk about?</p>
              {SCHEDULING_TOPICS.map((service) => (
                <Link key={service} href={`/schedule?topic=${service}`} className="card sched-topic">
                  <span>
                    <span className="sched-topic-title">{SCHEDULING_LABELS[service]}</span>
                    <span className="sched-topic-note">{TOPIC_NOTES[service]}</span>
                  </span>
                  <ArrowRight size={20} aria-hidden />
                </Link>
              ))}
            </nav>
          ) : (
            <div className="sched-book">
              <div className="sched-book-head">
                <p className="sched-step">Step 2 · Choose a time</p>
                <Link href="/schedule" className="sched-change">
                  <ArrowLeft size={16} aria-hidden /> Change topic
                </Link>
              </div>
              {bookingUrl ? (
                <CalEmbed bookingUrl={bookingUrl} title={`${SCHEDULING_LABELS[topic]} calendar`} />
              ) : (
                <div className="sched-request">
                  <h2>Tell me a little about what you need.</h2>
                  <p>
                    Answer a few short questions, then tell me how you’d like to meet and a
                    convenient time. I’ll follow up to arrange our conversation. Your request goes
                    directly to me.
                  </p>
                  <Link href={requestHref} className="btn">
                    Request a conversation <ArrowRight size={18} className="arrow" aria-hidden />
                  </Link>
                  <p className="sched-small">An appointment is confirmed once we agree on a time.</p>
                </div>
              )}
            </div>
          )}
          <p className="sched-small sched-soa">
            For a Medicare plan discussion, any required permission and scope of appointment will be
            arranged before the meeting. Please keep Medicare numbers, Social Security numbers, and
            medical records out of the booking form.
          </p>
        </div>
      </div>
    </main>
  );
}
