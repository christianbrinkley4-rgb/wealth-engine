import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, Phone } from "lucide-react";

import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LeadCluster } from "@/app/components/LeadCluster";
import { AGENT, COMPENSATION_DISCLOSURE, hasPublishableNpn, publishedProfiles } from "@/lib/agent";
import { breadcrumbJsonLd, pageOpenGraph, SITE_URL } from "@/lib/seo";

const title = "Christian Brinkley | Licensed Insurance Agent in Greensboro";
const description =
  "Licensed agent Christian Brinkley serves Greensboro and the Piedmont Triad: Medicare, life insurance, and retirement questions. Meet at home or by phone.";

const [firstName, ...lastNameParts] = AGENT.name.split(" ");

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    ...pageOpenGraph({
      title,
      description,
      path: "/about",
    }),
    type: "profile",
    firstName,
    lastName: lastNameParts.join(" ") || undefined,
  },
};

const START_HERE = [
  {
    href: "/turning-65",
    label: "Turning 65",
    text: "When to sign up and what to sign up for.",
  },
  {
    href: "/plan-check",
    label: "Already on Medicare",
    text: "A 90-second check on whether your plan still fits.",
  },
  {
    href: "/taxes-and-retirement",
    label: "Planning retirement",
    text: "Social Security, taxes, RMDs, and Medicare costs.",
  },
] as const;

const STEPS = [
  {
    t: "Tell me what you need help with",
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
] as const;

export default function AboutPage() {
  const profiles = publishedProfiles().filter((profile) =>
    ["youtube", "facebook", "instagram", "nextdoor", "linkedin", "google"].includes(
      profile.network,
    ),
  );

  return (
    <main className="ab">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/about#profile`,
        url: `${SITE_URL}/about`,
        name: title,
        mainEntity: {
          "@type": "Person",
          "@id": `${SITE_URL}/#christian`,
          name: AGENT.name,
          url: `${SITE_URL}/about`,
          image: `${SITE_URL}/christian-brinkley.jpg`,
          sameAs: AGENT.profiles,
        },
      }).replace(/</g, "\\u003c") }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".ab-hero-copy h1", ".ab-lede"],
            },
          }),
        }}
      />
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

      <section className="ab-hero">
        <div className="shell ab-hero-grid">
          <div className="ab-hero-copy">
            <p className="eyebrow">About</p>
            <h1>
              Hey, I’m <em>Christian.</em>
            </h1>
            <p className="ab-lede">
              I’m a licensed insurance agent in Greensboro. I grew up in Creedmoor, in Granville
              County. I’m 21, an accounting senior at UNCG, and I graduate in December 2026. I
              help families across the Triad with Medicare, life insurance, and retirement
              questions. I’m not a call center. I sit down with people myself, listen first, and
              help them figure out what they want to protect.
            </p>
            <p className="ab-license">
              Licensed agent · {AGENT.licenseLine}
              {hasPublishableNpn() ? ` · NPN ${AGENT.npn}` : ""}
            </p>
            <div className="ab-actions">
              <a href={AGENT.phoneHref} className="btn">
                <Phone size={18} aria-hidden /> {AGENT.phone}
              </a>
              <Link href="/schedule" className="btn btn-outline">
                <CalendarDays size={18} aria-hidden /> Book a time
              </Link>
              <a href={`mailto:${AGENT.email}`} className="link-draw">
                <Mail size={17} aria-hidden /> <span>Email me</span>
              </a>
            </div>
          </div>
          <figure className="ab-photo">
            <Image
              src="/christian-brinkley.jpg"
              alt={`${AGENT.name}, licensed insurance agent in Greensboro, North Carolina`}
              width={1200}
              height={1600}
              preload
              fetchPriority="high"
              sizes="(max-width: 899px) 90vw, 460px"
            />
          </figure>
        </div>
      </section>

      <section className="section-tight ab-start" aria-labelledby="ab-start-heading">
        <div className="shell">
          <h2 id="ab-start-heading" className="ab-h2" data-reveal>
            New here? Start with the one that fits.
          </h2>
          <ul className="ab-start-grid">
            {START_HERE.map((item, index) => (
              <li key={item.href} data-reveal style={{ "--i": index } as React.CSSProperties}>
                <Link href={item.href} className="card ab-start-card">
                  <span className="ab-start-num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="ab-start-label">{item.label}</span>
                  <span className="ab-start-text">{item.text}</span>
                  <ArrowRight size={20} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section ab-story" aria-labelledby="ab-story-heading">
        <div className="shell ab-story-grid">
          <div>
            <p className="eyebrow" data-reveal>
              Why I do this
            </p>
            <h2 id="ab-story-heading" className="ab-h2" data-reveal>
              One person you can come back to.
            </h2>
          </div>
          <div className="ab-prose">
            <p data-reveal>
              My life and my education are here in the Triad. I want to be someone you know and can
              come back to throughout retirement. A policy is one decision; the questions continue
              when your health, family, work, and priorities change.
            </p>
            <p data-reveal>
              We can start with Medicare, life insurance, long-term or short-term care, critical
              illness coverage, or annuities. We’ll look at what you already have, talk through your
              needs and budget, and work toward a clear next step. You’re welcome to include your
              spouse or another family member.
            </p>
            <p data-reveal>
              My approach is to listen first, explain the options I offer in plain language, and
              give you room to decide. We can meet at your home, at a convenient public place, or by
              phone. If your current coverage still fits, that is a useful answer too.
            </p>
            <p data-reveal>
              I got into this by working directly with a financial advisor. I reviewed 100+
              client files, sat in on dozens of money appointments, and ran the advisor’s
              monthly budget. That work showed me how retirement decisions connect to real life.
            </p>
            <p data-reveal>
              My accounting studies help me see how retirement decisions connect. Today I’m a
              licensed insurance agent, and I work with an advisor for retirement financial
              planning. Tax, legal, and investment advice belongs with the right qualified
              professional, and I’ll tell you when that conversation would help.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="ab-scope-heading">
        <div className="shell">
          <p className="eyebrow" data-reveal>
            Clear boundaries
          </p>
          <h2 id="ab-scope-heading" className="ab-h2" data-reveal>
            What I do, and what I don’t do.
          </h2>
          <div className="ab-paid-grid" style={{ marginTop: "1.5rem" }}>
            <div className="ab-paid-card" data-reveal>
              <h2>What I do</h2>
              <ul>
                <li>Explain Medicare, life insurance, care coverage, and annuities in plain language.</li>
                <li>Compare your costs, doctors, and prescriptions before you decide.</li>
                <li>Work with a financial advisor when your planning goes beyond insurance.</li>
              </ul>
            </div>
            <div className="ab-paid-card" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              <h2>What I don’t do</h2>
              <ul>
                <li>Recommend securities or investments. I’m not securities licensed.</li>
                <li>Give tax or legal advice. That belongs with a qualified professional.</li>
                <li>Present future credentials as current. I’m not a CPA, CFP, or registered investment adviser.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight ab-road" aria-labelledby="ab-road-heading">
        <div className="shell">
          <p className="eyebrow" data-reveal>
            Where I’m headed
          </p>
          <h2 id="ab-road-heading" className="ab-h2" data-reveal>
            Today, and the long game.
          </h2>
          <ol className="ab-road-list">
            <li data-reveal>
              <span className="ab-road-when">Today</span>
              <span className="ab-road-what">Licensed insurance agent, {AGENT.licenseLine} (since June 2026)</span>
            </li>
            <li data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              <span className="ab-road-when">In school</span>
              <span className="ab-road-what">
                {AGENT.education}. Coursework in individual tax and financial planning.
              </span>
            </li>
            <li data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              <span className="ab-road-when">Studying</span>
              <span className="ab-road-what">SIE exam (studying now, not yet passed)</span>
            </li>
            <li data-reveal style={{ "--i": 3 } as React.CSSProperties}>
              <span className="ab-road-when">Working toward</span>
              <span className="ab-road-what">CPA track after the master’s degree</span>
            </li>
            <li data-reveal style={{ "--i": 4 } as React.CSSProperties}>
              <span className="ab-road-when">The goal</span>
              <span className="ab-road-what">
                A planning practice here at home: Medicare, taxes, retirement, and insurance, with
                one person who knows your whole picture
              </span>
            </li>
          </ol>
          <p className="ab-road-note" data-reveal>
            The last three are goals, not credentials I hold today. I’ll update this page as each
            one becomes real.
          </p>
        </div>
      </section>

      <section className="section-tight ab-paid" aria-labelledby="ab-paid-heading">
        <div className="shell ab-paid-grid">
          <div className="ab-paid-card" data-reveal>
            <h2 id="ab-paid-heading">How I get paid</h2>
            <p>{COMPENSATION_DISCLOSURE}</p>
          </div>
          <div className="ab-steps" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <h2>What happens when you get in touch</h2>
            <ol>
              {STEPS.map((step, index) => (
                <li key={step.t}>
                  <span>{index + 1}</span>
                  <div>
                    <h3>{step.t}</h3>
                    <p>{step.b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {profiles.length > 0 ? (
        <section className="section-tight ab-online" aria-labelledby="ab-online-heading">
          <div className="shell">
            <h2 id="ab-online-heading" className="ab-h2" data-reveal>
              Find me online.
            </h2>
            <p className="ab-online-lede" data-reveal>
              Same person, same plain answers, wherever you find me.
            </p>
            <ul className="ab-online-grid">
              {profiles.map((profile, index) => (
                <li key={profile.network} data-reveal style={{ "--i": index } as React.CSSProperties}>
                  <a
                    href={profile.url}
                    rel="me noopener noreferrer"
                    target="_blank"
                    className="card ab-online-card"
                  >
                    {profile.label}
                    <ArrowRight size={18} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="section-tight ab-review" aria-labelledby="ab-review-heading">
        <div className="shell">
          <h2 id="ab-review-heading" className="ab-h2" data-reveal>
            Worked with me?
          </h2>
          <p className="ab-online-lede" data-reveal>
            A Google review helps your neighbors find me.{" "}
            <Link href="/review" className="link-draw">
              <span>Leave a review</span>
            </Link>
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell ab-lead">
          <LeadCluster heading="Questions I can help with" />
        </div>
      </section>

      <KitchenTableClose
        heading="What are you trying to figure out?"
        body="Tell me what’s on your mind. We can set up a no-cost conversation about your coverage and next steps."
        href="/start"
        label="Ask your question"
      />
    </main>
  );
}
