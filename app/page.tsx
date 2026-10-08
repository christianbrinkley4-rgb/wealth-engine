import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CalendarHeart,
  Check,
  HeartHandshake,
  Landmark,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { EnrollmentWindow } from "@/components/home/EnrollmentWindow";
import { WaitingCost } from "@/components/home/WaitingCost";
import { Testimonials } from "@/components/Testimonials";
import {
  AGENT,
  COMPENSATION_DISCLOSURE,
  GOOGLE_MAPS_PROFILE_URL,
} from "@/lib/agent";
import { learnEntries, SITUATIONS } from "@/lib/learn";
import { faqJsonLd, localBusinessJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import { SITE_STATS } from "@/lib/siteStats";
import { hasTestimonials } from "@/lib/testimonials";
import { featuredPlaces } from "@/lib/triad";

const title = "Medicare Help in Greensboro | Christian Brinkley";
const description =
  "Turning 65 in the Triad? Christian Brinkley is a licensed agent, not a call center. Find your Medicare enrollment dates, meet at home or by phone. No cost.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({ title, description, path: "/" }),
  twitter: pageTwitter({ title, description }),
};

const QUESTIONS = [
  {
    q: "Are you a Medicare agent in Greensboro?",
    a: "Yes. I’m a licensed insurance agent based in Greensboro. I help with Medicare and related coverage across Greensboro, High Point, Winston-Salem, nearby Triad towns, and Granville County.",
  },
  {
    q: "Is this a call center?",
    a: `No. It’s just me, Christian Brinkley. When you call ${AGENT.phone}, you reach me, not a queue. ${AGENT.afterHoursPromise} Your information is never sold or passed to other agents.`,
  },
  {
    q: "Does it cost anything to talk with you?",
    a: "There is no charge for an initial insurance consultation or for help comparing the plans I represent. You do not have to enroll or buy a policy. Any separate financial planning services and fees would be explained by the advisor before you agree to them.",
  },
  {
    q: "I’m still working. Should I enroll at 65?",
    a: "It depends on your current employer coverage, the employer’s size, and other details such as HSA contributions. Coverage through your or your spouse’s current job may let you delay Part B. Check with the benefits administrator before changing anything. COBRA and retiree coverage work differently.",
  },
  {
    q: "Can you help me keep my doctors?",
    a: "We can review the doctors and hospitals you want to keep, your prescriptions, and your pharmacy against the specific plans I represent. Participation and coverage need to be confirmed for the plan and year you are considering.",
  },
  {
    q: "Can we meet in person?",
    a: "Yes. We can meet at your home in the Piedmont Triad, at a convenient public place, or talk by phone or video. You’re welcome to include your spouse or another family member.",
  },
  {
    q: "What do I need for our first conversation?",
    a: "Start with the questions on your mind. For Medicare, a list of your doctors, prescriptions, and pharmacy helps. You don’t need to have everything organized before we talk. The request form never asks for your Social Security number, Medicare number, or payment details.",
  },
  { q: "How are you paid?", a: COMPENSATION_DISCLOSURE },
] as const;

const SITUATION_CARDS = [
  {
    icon: CalendarHeart,
    title: "I’m turning 65 soon",
    text: "When to sign up, what to sign up for, and how to stay clear of penalties.",
    href: "/turning-65",
    cta: "Start with your window",
  },
  {
    icon: ShieldCheck,
    title: "I’m already on Medicare",
    text: "Plans change every year. Check whether yours still fits before December 7.",
    href: "/plan-check",
    cta: "Take the plan check",
  },
  {
    icon: Landmark,
    title: "I’m planning retirement",
    text: "Social Security timing, taxes, RMDs, and what Medicare will cost you.",
    href: "/taxes-and-retirement",
    cta: "See the timeline",
  },
  {
    icon: HeartHandshake,
    title: "I’m helping a parent",
    text: "What you can handle for Mom or Dad, and what they need to do themselves.",
    href: "/helping-a-parent",
    cta: "Read the guide",
  },
] as const;

const STEPS = [
  {
    title: "You call, or send me a note.",
    text: "It comes straight to me, not a queue. I’ll get in touch personally to find a time that works.",
  },
  {
    title: "We sit down together.",
    text: "At your kitchen table, somewhere nearby, or by phone. We go through your doctors, prescriptions, and budget.",
  },
  {
    title: "You decide, in your own time.",
    text: "There’s no cost and no obligation to enroll. And I’m still here when the next question comes.",
  },
] as const;

const PLAN_CHECK_PREVIEW = [
  "Yes, all of them",
  "Some of them",
  "Not sure",
  "I don't have a regular doctor",
] as const;

export default function HomePage() {
  const featured = learnEntries().filter((entry) => entry.featured).slice(0, 6);
  const towns = featuredPlaces();

  return (
    <main className="hp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".hx-title", ".hx-lede"],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(QUESTIONS)) }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="hx" aria-labelledby="hx-title">
        <div className="hx-bg" aria-hidden />
        <div className="shell hx-grid">
          <div className="hx-copy">
            <p className="eyebrow hx-eyebrow">Greensboro, NC · Medicare, taxes &amp; retirement</p>
            <h1 id="hx-title" className="hx-title">
              <span className="split-line">
                <span style={{ "--i": 0 } as React.CSSProperties}>Medicare and money,</span>
              </span>{" "}
              <span className="split-line">
                <span style={{ "--i": 1 } as React.CSSProperties}>explained by someone</span>
              </span>{" "}
              <span className="split-line">
                <span style={{ "--i": 2 } as React.CSSProperties}>
                  <em>who lives here.</em>
                </span>
              </span>
            </h1>
            <p className="hx-lede">
              I’m Christian Brinkley, a licensed insurance agent in Greensboro. I help people
              turning 65, people already on Medicare, and their kids figure out what to do next.
              No call center. When you call, you get me.
            </p>
            <div className="hx-actions" id="home-hero-actions">
              <Link href="/plan-check" className="btn btn-accent">
                Take the 90-second plan check <ArrowRight size={19} className="arrow" aria-hidden />
              </Link>
              <a href={AGENT.phoneHref} className="btn btn-outline">
                <Phone size={18} aria-hidden /> Call {AGENT.phone}
              </a>
            </div>
            <a href="#timing" className="hx-sublink">
              Turning 65? See how your enrollment window works <ArrowDown size={16} aria-hidden />
            </a>
            <p className="hx-micro">
              <ShieldCheck size={17} aria-hidden /> Free. No obligation. Your info is never sold.
            </p>
          </div>

          <div className="hx-visual">
            <div className="hx-arch">
              <Image
                src="/christian-brinkley.jpg"
                alt="Christian Brinkley, licensed insurance agent in Greensboro"
                width={1200}
                height={1600}
                preload
                fetchPriority="high"
                sizes="(max-width: 899px) 70vw, 440px"
              />
            </div>
            <div className="hx-chip hx-chip-a">
              <span className="hx-chip-dot" aria-hidden />
              <span>
                <strong>Licensed agent</strong>
                <span>{AGENT.licenseLine}</span>
              </span>
            </div>
            <div className="hx-chip hx-chip-b">
              <CalendarHeart size={20} aria-hidden />
              <span>
                <strong>Open enrollment</strong>
                <span>October 15 to December 7</span>
              </span>
            </div>
            <div className="hx-chip hx-chip-c">
              <span>
                <strong>Your kitchen table</strong>
                <span>or by phone. Your call.</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust by numbers ───────────────────────────────────────────── */}
      <section className="tband" aria-label="What this site offers">
        <div className="shell tband-inner">
          <dl className="tband-stats">
            <div className="tband-stat">
              <dt>
                <Link href="/tools">Free calculators</Link>
              </dt>
              <dd>{SITE_STATS.calculators}</dd>
            </div>
            <div className="tband-stat">
              <dt>
                <Link href="/tools">Decision quizzes</Link>
              </dt>
              <dd>{SITE_STATS.quizzes}</dd>
            </div>
            <div className="tband-stat">
              <dt>
                <Link href="/guides">Plain-English guides</Link>
              </dt>
              <dd>{SITE_STATS.guides}</dd>
            </div>
            <div className="tband-stat">
              <dt>
                <Link href="/wealth">Money articles</Link>
              </dt>
              <dd>{SITE_STATS.articles}</dd>
            </div>
          </dl>
          <p className="tband-note">Counted from the pages on this site. All free, no account.</p>
        </div>
      </section>

      {/* ── Where are you right now? ───────────────────────────────────── */}
      <section className="section-tight sit" aria-labelledby="sit-heading">
        <div className="shell">
          <div className="section-head split">
            <h2 id="sit-heading" data-reveal>
              Where are you <em>right now?</em>
            </h2>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Pick the one that sounds like you. Each one starts with plain answers, and you can
              call whenever you’re ready.
            </p>
          </div>
          <ul className="sit-grid">
            {SITUATION_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <li key={card.href} data-reveal style={{ "--i": index } as React.CSSProperties}>
                  <Link href={card.href} className="card sit-card">
                    <span className="sit-icon" aria-hidden>
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <span className="sit-title">{card.title}</span>
                    <span className="sit-text">{card.text}</span>
                    <span className="sit-cta">
                      {card.cta} <ArrowRight size={17} aria-hidden />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <Link href="/insurance-services" className="btn btn-outline">Explore all insurance services</Link>
          </div>
        </div>
      </section>

      {/* ── Signature: how Medicare timing works ───────────────────────── */}
      <section className="section tw" id="timing" aria-labelledby="tw-heading">
        <div className="shell">
          <div className="section-head split">
            <div>
              <p className="eyebrow" data-reveal>
                How Medicare timing works
              </p>
              <h2 id="tw-heading" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                Seven months. <em>One window.</em>
              </h2>
            </div>
            <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              You get one main chance to sign up without a penalty, and it’s built around the month
              you turn 65. Pick your month and watch how it works.
            </p>
          </div>
          <div data-reveal="scale">
            <EnrollmentWindow />
          </div>
        </div>
      </section>

      {/* ── Plan check ─────────────────────────────────────────────────── */}
      <section className="pc on-dark" aria-labelledby="pc-heading">
        <div className="pc-glow" aria-hidden />
        <div className="shell pc-grid">
          <div>
            <p className="eyebrow on-dark" data-reveal>
              Already on Medicare?
            </p>
            <h2 id="pc-heading" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Plans change every year. <em>Did yours?</em>
            </h2>
            <p className="pc-lede" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              Open enrollment runs October 15 to December 7. Seven quick questions about your
              doctors, your prescriptions, and what you pay, and you’ll get an honest read on
              whether a review is worth your time. Nothing gets sent anywhere unless you ask.
            </p>
            <div className="pc-actions" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
              <Link href="/plan-check" className="btn btn-accent">
                Start the plan check <ArrowRight size={19} className="arrow" aria-hidden />
              </Link>
              <span className="pc-meta">About 90 seconds · Free</span>
            </div>
          </div>
          <div className="pc-preview" aria-hidden data-reveal="scale">
            <div className="pc-card">
              <div className="pc-card-top">
                <span>Question 1 of 7</span>
                <span className="pc-progress">
                  <span />
                </span>
              </div>
              <p className="pc-q">Are your current doctors still in your plan’s network?</p>
              <ul>
                {PLAN_CHECK_PREVIEW.map((option, index) => (
                  <li key={option} className={index === 1 ? "is-picked" : undefined}>
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Signature: what waiting costs ──────────────────────────────── */}
      <section className="section wcs" aria-labelledby="wcs-heading">
        <div className="shell wcs-grid">
          <div className="wcs-copy">
            <p className="eyebrow" data-reveal>
              What waiting costs
            </p>
            <h2 id="wcs-heading" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Late on Part B? <em>That penalty sticks around.</em>
            </h2>
            <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              Drag the slider. It’s the same math Medicare uses: 10% of the standard premium for
              every full year you could’ve had Part B and didn’t. And you keep paying it for as long
              as you have Part B.
            </p>
          </div>
          <div data-reveal="scale">
            <WaitingCost />
          </div>
        </div>
      </section>

      {/* ── Meet Christian ─────────────────────────────────────────────── */}
      <section className="section meet" aria-labelledby="meet-heading">
        <div className="shell meet-grid">
          <figure className="meet-photo" data-reveal="left">
            <Image
              src="/christian-brinkley.jpg"
              alt="Christian Brinkley, the licensed agent you talk to when you call"
              width={1200}
              height={1600}
              sizes="(max-width: 899px) 100vw, 520px"
            />
            <figcaption>
              <span className="meet-sign">Christian Brinkley</span>
              <span>
                {AGENT.licenseLine} · {AGENT.city}, {AGENT.state}
              </span>
            </figcaption>
          </figure>
          <div className="meet-copy">
            <p className="eyebrow" data-reveal>
              Who you’ll be talking to
            </p>
            <h2 id="meet-heading" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Hey, I’m Christian.
            </h2>
            <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              I’m based in Greensboro and licensed for Life &amp; Health insurance in North Carolina.
              I’m an accounting senior at UNCG, graduating in December 2026.
            </p>
            <p data-reveal style={{ "--i": 3 } as React.CSSProperties}>
              Down the road, I want to run a planning practice right here, helping families with
              Medicare, taxes, retirement, and insurance in one place. For now, here’s what I
              promise: plain answers, no pressure, and if your coverage is already fine, I’ll tell
              you.
            </p>
            <ul className="meet-facts" data-reveal style={{ "--i": 4 } as React.CSSProperties}>
              <li>
                <Check size={18} aria-hidden /> Licensed agent · {AGENT.licenseLine}
              </li>
              <li>
                <Check size={18} aria-hidden /> {AGENT.education}
              </li>
              <li>
                <Check size={18} aria-hidden /> Meets at your home, somewhere nearby, or by phone
              </li>
              <li>
                <Check size={18} aria-hidden />{" "}
                {AGENT.advisorPartner
                  ? `Works with ${AGENT.advisorPartner} on retirement planning`
                  : "Works with an advisor when planning calls for one"}
              </li>
            </ul>
            <Link href="/about" className="link-draw" data-reveal>
              <span>More about me</span> <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Guides ───────────────────────────────────────────────────────── */}
      <section className="section lib" aria-labelledby="lib-heading">
        <div className="shell">
          <div className="section-head split">
            <div>
              <p className="eyebrow" data-reveal>
                Guides
              </p>
              <h2 id="lib-heading" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                Read first. <em>Call when you’re ready.</em>
              </h2>
            </div>
            <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              Plain-English guides on Medicare, taxes, Social Security, and insurance. No sales
              pitch and no email wall. Just the answers.
            </p>
          </div>
          <ul className="lib-chips" data-reveal>
            {SITUATIONS.map((situation) => (
              <li key={situation.id}>
                <Link href={`/learn#${situation.id}`}>{situation.label}</Link>
              </li>
            ))}
          </ul>
          <ul className="lib-grid">
            {featured.map((entry, index) => (
              <li key={entry.href} data-reveal style={{ "--i": index % 3 } as React.CSSProperties}>
                <Link href={entry.href} className="card lib-card">
                  <span className="lib-kind">
                    {entry.kind}
                    {entry.minutes ? ` · ${entry.minutes} min read` : ""}
                  </span>
                  <span className="lib-title">{entry.title}</span>
                  <span className="lib-blurb">{entry.blurb}</span>
                  <ArrowRight size={20} className="lib-arrow" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="lib-foot" data-reveal>
            <Link href="/learn" className="btn btn-outline">
              <BookOpen size={18} aria-hidden /> Browse the guides
            </Link>
          </div>
        </div>
      </section>

      {/* ── Reviews: real ones, or an honest wait ──────────────────────── */}
      {hasTestimonials() ? (
        <Testimonials />
      ) : (
        <section className="section-tight rv" aria-labelledby="rv-heading">
          <div className="shell">
            <div className="rv-card" data-reveal>
              <a
                href={GOOGLE_MAPS_PROFILE_URL}
                className="rv-gcard"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="rv-gbadge" aria-hidden>
                  G
                </span>
                <span className="rv-gtext">
                  <strong>Christian Brinkley</strong>
                  <span>Google Business Profile · Greensboro, NC</span>
                </span>
                <ArrowRight size={18} className="rv-go" aria-hidden />
              </a>
              <h2 id="rv-heading">I’d rather earn reviews than write them.</h2>
              <p>
                You won’t find made-up testimonials on this site. When people I’ve helped leave a
                review on Google, it’ll show up right here, word for word. If we’ve worked together,
                I’d really appreciate one.
              </p>
              <div className="rv-actions">
                <Link href="/review" className="btn btn-outline btn-sm">
                  Worked with me? Leave a review
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── How it works ───────────────────────────────────────────────── */}
      <section className="section steps" aria-labelledby="steps-heading">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow" data-reveal>
              What happens next
            </p>
            <h2 id="steps-heading" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              No script. No pressure. <em>No hand-off.</em>
            </h2>
          </div>
          <ol className="steps-list">
            {STEPS.map((step, index) => (
              <li key={step.title} data-reveal style={{ "--i": index } as React.CSSProperties}>
                <span className="steps-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="steps-actions" data-reveal>
            <Link href="/start?topic=medicare&quick=1" className="btn">
              Ask me a question <ArrowRight size={19} className="arrow" aria-hidden />
            </Link>
            <Link href="/schedule" className="link-draw">
              <span>Or book a time on my calendar</span> <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ and towns ──────────────────────────────────────────────── */}
      <section className="section faqx" aria-labelledby="faq-heading">
        <div className="shell faqx-grid">
          <div className="faqx-intro">
            <p className="eyebrow" data-reveal>
              Before we meet
            </p>
            <h2 id="faq-heading" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Questions people ask me first.
            </h2>
            <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              I meet people all over the Triad and back home in Granville County.
            </p>
            <ul className="faqx-towns" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
              {towns.map((town) => (
                <li key={town.slug}>
                  <Link href={`/medicare-in/${town.slug}`}>{town.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/medicare-creedmoor-nc">Creedmoor</Link>
              </li>
              <li>
                <Link href="/medicare-oxford-nc">Oxford</Link>
              </li>
              <li>
                <Link href="/medicare-butner-nc">Butner</Link>
              </li>
            </ul>
            <Link href="/service-area" className="link-draw">
              <span>See every town I serve</span> <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
          <div className="faq" data-reveal>
            {QUESTIONS.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span className="faq-icon" aria-hidden />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
