import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone, ShieldCheck } from "lucide-react";

import { MedicareTimeline } from "@/components/MedicareTimeline";
import { Testimonials } from "@/components/Testimonials";
import { AGENT, COMPENSATION_DISCLOSURE } from "@/lib/agent";
import { faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import { featuredPlaces } from "@/lib/triad";

const title = "Christian Brinkley | Medicare Help in Greensboro, High Point & Winston-Salem";
const description =
  "Turning 65 in the Triad? Christian Brinkley is a licensed agent who lives here, not a call center. Find your Medicare enrollment dates and meet at home or by phone. No cost.";
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
    a: "Yes. I’m a licensed insurance agent based in Greensboro. I help with Medicare and related coverage across Greensboro, High Point, Winston-Salem, and nearby Triad communities.",
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

const PROMISES = [
  {
    title: "The same person, every year.",
    text: "When it’s time to review your coverage each fall, you call the same person. No new rep every time.",
  },
  {
    title: "Wherever suits you.",
    text: "At your home anywhere in the Triad, a public place nearby, or by phone. Bring your spouse or your kids.",
  },
  {
    title: "Your number stays with me.",
    text: "Your information is never sold to other agents or lead companies. No surprise calls.",
  },
] as const;

const COSTS = [
  {
    figure: "10%",
    href: "/part-b-penalty",
    title: "Signing up for Part B late",
    text: "If a late-enrollment penalty applies, your Part B premium generally increases by 10% for each full year you delayed, for as long as you have Part B.",
  },
  {
    figure: "1%",
    title: "Going without drug coverage",
    text: "A penalty may apply after 63 days or more without qualifying drug coverage after your enrollment window. It is based on 1% of the national base premium per full uncovered month. People with Extra Help do not pay this penalty.",
  },
  {
    figure: "6 mo.",
    title: "Your Medigap enrollment window",
    text: "Your six-month window starts when you are 65 or older and enrolled in Part B. During it, you can’t be turned down or charged more because of your health. You may also have protected rights at other times.",
  },
] as const;

const STEPS = [
  {
    title: "You call, or send me a note.",
    text: "It comes straight to me, not a queue. I’ll get in touch personally to find a time that works.",
  },
  {
    title: "We sit down together.",
    text: "At home, somewhere nearby, or by phone. We go through your doctors, prescriptions, and budget.",
  },
  {
    title: "You decide, in your own time.",
    text: "There’s no cost and no obligation to enroll. And I’m still here when the next question comes.",
  },
] as const;

const GUIDES = [
  {
    label: "When to sign up",
    title: "When should I sign up for Medicare?",
    text: "Your enrollment window, coverage through work, and what to do first.",
    href: "/turning-65",
  },
  {
    label: "Your options",
    title: "Medicare Advantage or a Medigap plan?",
    text: "How the two paths differ on doctors, costs, and travel.",
    href: "/advantage-vs-medigap",
  },
  {
    label: "Your doctors",
    title: "Can I keep my doctors?",
    text: "What to check for Cone Health, Novant Health, and Atrium Health doctors before you choose.",
    href: "/keep-my-doctor",
  },
] as const;

const BEYOND = [
  { label: "Life insurance", href: "/life-insurance" },
  { label: "Care coverage", href: "/care-coverage" },
  { label: "Retirement income", href: "/retirement-income" },
  { label: "Annuities", href: "/annuities" },
] as const;

export default function HomePage() {
  const credentials = [
    `Licensed insurance agent in ${AGENT.licensedStates.join(" and ")}`,
    ...AGENT.credentials,
    AGENT.advisorPartner
      ? `Works with ${AGENT.advisorPartner} on retirement planning`
      : "Works with an advisor when retirement planning calls for one",
  ];

  return (
    <main className="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(QUESTIONS)) }}
      />

      {/* Hero: headline, a face, and both ways to act, inside the first phone screen. */}
      <section className="home-hero">
        <div className="personal-shell home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-eyebrow">
              <span className="home-dot" aria-hidden />
              Greensboro · High Point · Winston-Salem
            </p>
            <h1>
              Turning 65? Get Medicare right <em>the first time.</em>
            </h1>
            <p className="home-lede">
              I’m Christian Brinkley, a licensed insurance agent in Greensboro. I’m not a call
              center: when you call, I answer, and we can meet at your home, somewhere nearby, or by
              phone. When a question comes up next year, it’s still me.
            </p>
            <div className="home-hero-id">
              <Image
                src="/christian-brinkley-square.jpg"
                alt=""
                width={128}
                height={128}
                sizes="64px"
                className="home-avatar"
              />
              <span>
                <span className="home-signature">Christian Brinkley</span>
                <span className="home-hero-id-note">No cost, no obligation. Never sold.</span>
              </span>
            </div>
            <div className="home-hero-actions" id="home-hero-actions">
              <a href="#your-timeline" className="home-button">
                Find my enrollment dates <ArrowRight size={20} aria-hidden />
              </a>
              <a href={AGENT.phoneHref} className="home-button home-button-outline">
                <Phone size={19} aria-hidden />
                <span>
                  Call <span className="home-hide-wide">{AGENT.phone}</span>
                  <span className="home-show-wide">me</span>
                </span>
              </a>
            </div>
            <p className="home-micro">
              <ShieldCheck size={18} aria-hidden />
              No cost, no obligation. Your information is never sold.
            </p>
          </div>
          <figure className="home-portrait">
            <Image
              src="/christian-brinkley.jpg"
              alt="Christian Brinkley, licensed insurance agent in Greensboro"
              width={1200}
              height={1600}
              loading="eager"
              sizes="(max-width: 899px) 16px, 480px"
            />
            <figcaption>
              <span className="home-signature">Christian Brinkley</span>
              <span>Licensed in North Carolina</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="home-band" aria-labelledby="home-band-heading">
        <div className="personal-shell home-band-grid">
          <h2 id="home-band-heading">What you get with one local agent</h2>
          {PROMISES.map((item) => (
            <div key={item.title} className="home-band-item">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section" id="your-timeline" aria-labelledby="timeline-heading">
        <div className="personal-shell">
          <div className="home-heading-row">
            <div>
              <p className="home-eyebrow">Your Medicare timeline</p>
              <h2 id="timeline-heading">Seven months to enroll. Here are your dates.</h2>
            </div>
            <p className="home-heading-note">
              Pick the month you turn 65. You’ll see when your window opens, when coverage can
              start, and when your initial enrollment window ends.
            </p>
          </div>
          <MedicareTimeline currentYear={new Date().getUTCFullYear()} />
        </div>
      </section>

      <section className="home-section home-rule-top" aria-labelledby="costs-heading">
        <div className="personal-shell">
          <p className="home-eyebrow home-eyebrow-rust">What it costs to get wrong</p>
          <h2 id="costs-heading" className="home-h2-narrow">
            Three Medicare rules that can cost you for years.
          </h2>
          <div className="home-costs">
            {COSTS.map((item) => (
              <div key={item.figure} className="home-cost">
                <span className="home-cost-figure">{item.figure}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {"href" in item && item.href ? (
                    <Link className="home-link" href={item.href}>
                      Work out my own number <ArrowRight size={18} aria-hidden />
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <div className="home-costs-foot">
            <p>
              Special Enrollment Periods and programs that help pay Medicare costs can change which
              penalties apply. Coverage through your or your spouse’s current job may also affect
              your dates. We can review your situation together.{" "}
              <a
                href="https://www.medicare.gov/basics/costs/medicare-costs/avoid-penalties"
                className="underline underline-offset-4"
              >
                Read Medicare’s penalty rules.
              </a>
            </p>
            <Link href="/start?topic=medicare&stage=turning_65_soon" className="home-link">
              Talk it through with me <ArrowRight size={19} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="home-section" aria-labelledby="about-heading">
        <div className="personal-shell home-about">
          <div className="home-about-media">
            {AGENT.introVideoUrl ? (
              <video
                controls
                playsInline
                preload="none"
                poster="/christian-brinkley.jpg"
                src={AGENT.introVideoUrl}
                aria-label="A short hello from Christian Brinkley"
              />
            ) : (
              <Image
                src="/christian-brinkley.jpg"
                alt="Christian Brinkley"
                width={1200}
                height={1600}
                sizes="(max-width: 899px) calc(100vw - 2.5rem), 540px"
              />
            )}
          </div>
          <div className="home-about-copy">
            <p className="home-eyebrow">Who you’ll be talking to</p>
            <h2 id="about-heading">I live here, and I plan to be your agent for a long time.</h2>
            <p>
              I meet families at their kitchen tables across Greensboro, High Point, and
              Winston-Salem. I listen first, explain your options in plain English, and give you
              room to decide. If your current coverage still fits, I’ll tell you that too.
            </p>
            <ul className="home-checks">
              {credentials.map((item) => (
                <li key={item}>
                  <Check size={20} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/about" className="home-link">
              More about me <ArrowRight size={19} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section home-steps-section" aria-labelledby="steps-heading">
        <div className="personal-shell">
          <p className="home-eyebrow">What happens next</p>
          <h2 id="steps-heading">No script. No pressure. No hand-off.</h2>
          <ol className="home-steps">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <span className="home-step-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="home-steps-actions">
            <Link href="/start?topic=medicare" className="home-button">
              Ask for a visit <ArrowRight size={20} aria-hidden />
            </Link>
            <p>
              or call <a href={AGENT.phoneHref}>{AGENT.phone}</a>
            </p>
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="guides-heading">
        <div className="personal-shell">
          <p className="home-eyebrow">Plain-English guides</p>
          <h2 id="guides-heading">Rather read first? Start here.</h2>
          <div className="home-guides">
            {GUIDES.map((guide) => (
              <Link key={guide.href} href={guide.href} className="home-guide">
                <span className="home-guide-label">{guide.label}</span>
                <span className="home-guide-title">{guide.title}</span>
                <span className="home-guide-text">{guide.text}</span>
                <ArrowRight size={22} aria-hidden className="home-guide-arrow" />
              </Link>
            ))}
          </div>
          <p className="home-already">
            Already on Medicare?{" "}
            <Link href="/annual-enrollment">Start with a review of your current coverage</Link>
          </p>
          <p className="home-already">
            Want the numbers first?{" "}
            <Link href="/medicare-costs-2026">
              Every 2026 premium, deductible and bracket, with its source
            </Link>
          </p>
        </div>
      </section>

      <section className="personal-shell" aria-label="Beyond Medicare">
        <div className="home-beyond">
          <p className="home-eyebrow home-eyebrow-muted">Beyond Medicare</p>
          <p className="home-beyond-text">
            I also help with life insurance, long-term care coverage, and retirement income
            questions. That’s a separate conversation, whenever you’re ready.
          </p>
          <ul className="home-beyond-links">
            {BEYOND.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-section" aria-labelledby="faq-heading">
        <div className="personal-shell home-faq">
          <div className="home-faq-intro">
            <p className="home-eyebrow">Before we meet</p>
            <h2 id="faq-heading">Questions people ask me first.</h2>
            <p>I meet people in these communities and the towns around them:</p>
            <ul className="home-towns">
              {featuredPlaces().map((town) => (
                <li key={town.slug}>
                  <Link href={`/medicare-in/${town.slug}`}>{town.name}</Link>
                </li>
              ))}
            </ul>
            <Link href="/service-area" className="home-link">
              See the full service area <ArrowRight size={19} aria-hidden />
            </Link>
          </div>
          <div className="home-faq-list">
            {QUESTIONS.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span aria-hidden>+</span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="home-close" aria-labelledby="close-heading">
        <div className="personal-shell home-close-grid">
          <div>
            <h2 id="close-heading">Call me. I’ll be the one who picks up.</h2>
            <p>{AGENT.afterHoursPromise}</p>
          </div>
          <div className="home-close-actions">
            <a href={AGENT.phoneHref} className="home-close-phone">
              {AGENT.phone}
            </a>
            <div>
              <a href="#your-timeline" className="home-button home-button-light">
                Find my dates
              </a>
              <Link href="/start?topic=medicare" className="home-button home-button-ghost">
                Ask for a visit
              </Link>
            </div>
            <p>No cost · No obligation · One local agent</p>
          </div>
        </div>
      </section>
    </main>
  );
}
