import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { MedicareTimeline } from "@/components/MedicareTimeline";
import { AGENT, COMPENSATION_DISCLOSURE } from "@/lib/agent";
import { faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

const title = "Christian Brinkley | Medicare Help in the Piedmont Triad";
const description =
  "A no-cost, no-obligation insurance consultation with Christian Brinkley in the Piedmont Triad. Medicare, life insurance, and retirement questions. Meet in person, by phone, or by video.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({ title, description, path: "/" }),
  twitter: pageTwitter({ title, description }),
};

const QUESTIONS = [
  {
    q: "Will my information go to other agents?",
    a: "Your inquiry goes directly to me, Christian Brinkley. I do not sell your contact information or distribute it to other agents. If you need help from a financial advisor, we discuss that together before an introduction.",
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
    q: "Can we meet in person or by video?",
    a: "Yes. We can arrange a visit at your home in the Piedmont Triad, meet at a convenient public location, or talk by phone or video. You’re welcome to include your spouse or another family member. Tell me what works for you when you request a consultation.",
  },
  {
    q: "What do I need for our first conversation?",
    a: "Start with the questions on your mind. If you’d like to review coverage, it can help to have your current policy or plan information nearby. For Medicare, a list of your doctors, prescriptions, and pharmacy can help us know what to check. You don’t need to have everything organized before we talk. The request form does not ask for your Social Security number, Medicare number, or payment details.",
  },
  { q: "How are you paid?", a: COMPENSATION_DISCLOSURE },
] as const;
const STARTING_POINTS = [
  {
    title: "I’m new to Medicare",
    text: "I’m turning 65 or leaving coverage through work.",
    href: "/start?topic=medicare",
    icon: CalendarDays,
  },
  {
    title: "I’m already on Medicare",
    text: "I’d like to review my coverage or understand a change.",
    href: "/start?topic=medicare&stage=already_on_medicare",
    icon: ShieldCheck,
  },
  {
    title: "I’m thinking about my family",
    text: "I have questions about life insurance or future care.",
    href: "/start",
    icon: HeartHandshake,
  },
  {
    title: "I have retirement questions",
    text: "I’d like help knowing which steps and professionals I need.",
    href: "/start?topic=financial_planning",
    icon: MessageCircle,
  },
] as const;
const GUIDES = [
  {
    number: "01",
    title: "When do I sign up?",
    text: "Understand your enrollment window, employer coverage, and what to do first.",
    href: "/turning-65",
    label: "YOUR TIMELINE",
  },
  {
    number: "02",
    title: "Which type of coverage fits?",
    text: "Get a plain-English introduction to Original Medicare, Medigap, and Medicare Advantage.",
    href: "/advantage-vs-medigap",
    label: "YOUR OPTIONS",
  },
  {
    number: "03",
    title: "Can I keep my doctor?",
    text: "Know what to check for your doctors, hospitals, prescriptions, and pharmacy.",
    href: "/keep-my-doctor",
    label: "YOUR EVERYDAY CARE",
  },
] as const;

export default function HomePage() {
  return (
    <main className="personal-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(QUESTIONS)) }}
      />
      <section className="personal-hero">
        <div className="personal-shell personal-hero-grid">
          <div className="personal-hero-copy">
            <p className="personal-eyebrow">
              <span className="personal-dot" /> MEDICARE HELP, CLOSE TO HOME
            </p>
            <h1>
              Turning 65?
              <br />
              Let’s make a plan
              <br />
              <em>for what comes next.</em>
            </h1>
            <p className="personal-lede">
              I’m Christian Brinkley, a local insurance agent in Greensboro. I’ll help you
              understand your Medicare choices and how they fit your life. We can meet at your home,
              by phone, or by video. Your consultation is no cost, with no obligation to buy
              anything.
            </p>
            <div className="personal-actions">
              <Link href="/start" className="personal-button">
                Request my free consultation <ArrowRight size={19} aria-hidden />
              </Link>
              <a href="#your-timeline" className="personal-text-link">
                Find my Medicare dates <ArrowRight size={18} aria-hidden />
              </a>
            </div>
            <p className="personal-micro">
              <ShieldCheck size={16} aria-hidden /> Your request comes directly to me. Your
              information is never sold.
            </p>
          </div>
          <figure className="personal-portrait">
            <div className="personal-portrait-image">
              <Image
                src="/christian-brinkley.jpg"
                alt="Christian Brinkley, your local licensed insurance agent in Greensboro"
                width={1200}
                height={1600}
                priority
                sizes="(max-width: 760px) 88vw, 390px"
              />
              <span className="personal-portrait-tag">
                <MapPin size={15} aria-hidden /> Based in Greensboro, NC
              </span>
            </div>
            <figcaption>
              <div>
                <span className="personal-signature">Christian Brinkley</span>
                <span className="personal-portrait-role">
                  Licensed insurance agent · Your local point of contact
                </span>
              </div>
              <span className="personal-portrait-stamp" aria-hidden>
                <HeartHandshake size={27} strokeWidth={1.4} />
              </span>
            </figcaption>
          </figure>
        </div>
      </section>
      <div className="personal-promise-strip">
        <div className="personal-shell">
          {[
            "One local agent: Christian",
            "Your information is never sold",
            "In person, by phone, or by video",
            "No-cost consultation",
          ].map((text) => (
            <span key={text}>
              <Check size={17} aria-hidden />
              {text}
            </span>
          ))}
        </div>
      </div>

      <section className="personal-shell pt-12 pb-4" aria-labelledby="starting-point-heading">
        <div className="personal-section-heading">
          <div>
            <p className="personal-eyebrow">START WITH WHAT MATTERS TO YOU</p>
            <h2 id="starting-point-heading">What would you like help with?</h2>
          </div>
          <p>
            A few short questions will help me prepare for our conversation. You can ask for help
            for yourself, a spouse, or a parent.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {STARTING_POINTS.map(({ title: heading, text, href, icon: Icon }) => (
            <Link
              key={heading}
              href={href}
              className="flex min-h-28 items-center gap-4 rounded-lg border border-[var(--personal-line)] bg-white p-5 transition-colors hover:border-[var(--personal-green)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--personal-green)]"
            >
              <Icon size={25} className="shrink-0 text-[var(--personal-green)]" aria-hidden />
              <div className="flex-1">
                <h3 className="text-18 font-semibold">{heading}</h3>
                <p className="text-16 mt-1 leading-relaxed text-[var(--personal-muted)]">{text}</p>
              </div>
              <ArrowRight size={20} className="shrink-0" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <section
        className="personal-section personal-shell"
        id="your-timeline"
        aria-labelledby="timeline-intro"
      >
        <div className="personal-section-heading">
          <div>
            <p className="personal-eyebrow">A LITTLE CLARITY, RIGHT NOW</p>
            <h2 id="timeline-intro">
              Your next chapter.
              <br />
              Your own timeline.
            </h2>
          </div>
          <p>
            Medicare has a few important dates. Start with the month you turn 65, and I’ll help you
            make sense of them.
          </p>
        </div>
        <MedicareTimeline currentYear={new Date().getUTCFullYear()} />
      </section>

      <section className="personal-guides personal-section">
        <div className="personal-shell">
          <div className="personal-section-heading">
            <div>
              <p className="personal-eyebrow">GOOD QUESTIONS. CLEAR STARTING POINTS.</p>
              <h2>
                You don’t have to learn
                <br />
                everything at once.
              </h2>
            </div>
            <Link className="personal-text-link" href="/start">
              Help me find where to start <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <div className="personal-guide-grid">
            {GUIDES.map((guide) => (
              <Link key={guide.href} href={guide.href} className="personal-guide">
                <div className="personal-guide-top">
                  <span>{guide.label}</span>
                  <span className="personal-guide-number">{guide.number}</span>
                </div>
                <h3>{guide.title}</h3>
                <p>{guide.text}</p>
                <span className="personal-guide-link">
                  Read the guide <ArrowRight size={20} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
          <p className="personal-already">
            Already on Medicare?{" "}
            <Link href="/annual-enrollment">
              Start with a review of your current coverage <ArrowRight size={16} aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <section className="personal-section personal-shell personal-about">
        <div className="personal-about-note">
          <MessageCircle size={30} strokeWidth={1.4} aria-hidden />
          <blockquote>
            “I want you to have someone you can turn to throughout retirement.”
          </blockquote>
          <span className="personal-signature">Christian Brinkley</span>
          <span>Greensboro, North Carolina</span>
        </div>
        <div>
          <p className="personal-eyebrow">A PERSON YOU CAN COME BACK TO</p>
          <h2>
            Here for the questions
            <br />
            that come later, too.
          </h2>
          <p className="personal-body">
            Turning 65 comes with a lot of mail and a lot of decisions. I want you to have a
            familiar person to call—when a letter is confusing, your family’s needs change, or it’s
            time to review your coverage. Our first conversation can be the start of that
            relationship.
          </p>
          <p className="personal-body">
            I’m working toward my master’s in accounting right here at UNC Greensboro. I meet people
            at their kitchen tables across the Triad, and I take the time to understand their
            families. For retirement financial planning, I work with an advisor so the right
            professional is involved.
          </p>
          <Link className="personal-text-link" href="/about">
            A little more about me <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="personal-process personal-section">
        <div className="personal-shell">
          <p className="personal-eyebrow">WHAT HAPPENS NEXT</p>
          <h2>A simple start. At your pace.</h2>
          <ol className="personal-process-grid">
            <li>
              <span>1</span>
              <h3>Tell me what’s on your mind.</h3>
              <p>
                Answer a few short questions and tell me how to reach you. Your request comes
                directly to me. We’ll confirm a time and how you’d like to meet.
              </p>
            </li>
            <li>
              <span>2</span>
              <h3>We talk it through.</h3>
              <p>
                We can meet at home, at a convenient public location, by phone, or by video. Include
                a family member if you’d like. We start with your questions and what you already
                have.
              </p>
            </li>
            <li>
              <span>3</span>
              <h3>You choose your next step.</h3>
              <p>
                We outline the coverage options and next steps that fit your needs and budget. You
                decide what to do. The consultation is no cost, with no obligation to buy.
              </p>
            </li>
          </ol>
          <Link className="personal-button" href="/start">
            Request my free consultation <ArrowRight size={19} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="personal-section personal-shell">
        <div className="personal-section-heading">
          <div>
            <p className="personal-eyebrow">BEYOND YOUR MEDICARE CARD</p>
            <h2>Help for the bigger picture.</h2>
          </div>
          <p>
            Your coverage is one part of retirement. Start with whichever question matters to you
            today.
          </p>
        </div>
        <div className="personal-service-grid">
          <Link href="/life-insurance">
            <HeartHandshake size={28} strokeWidth={1.5} aria-hidden />
            <div>
              <h3>Life insurance</h3>
              <p>
                Review your family’s protection, existing coverage, and what changes when work ends.
              </p>
            </div>
            <ArrowRight size={22} aria-hidden />
          </Link>
          <Link href="/retirement-income">
            <CalendarDays size={28} strokeWidth={1.5} aria-hidden />
            <div>
              <h3>Retirement planning questions</h3>
              <p>
                Connect your insurance questions with financial planning through an advisor I work
                with.
              </p>
            </div>
            <ArrowRight size={22} aria-hidden />
          </Link>
          <Link href="/care-coverage">
            <ShieldCheck size={28} strokeWidth={1.5} aria-hidden />
            <div>
              <h3>Care and critical illness coverage</h3>
              <p>
                Talk through long-term care, short-term care, and critical illness insurance for
                your family.
              </p>
            </div>
            <ArrowRight size={22} aria-hidden />
          </Link>
          <Link href="/annuities">
            <CalendarDays size={28} strokeWidth={1.5} aria-hidden />
            <div>
              <h3>Annuities and retirement income</h3>
              <p>
                Understand the income options, costs, and access to your money before considering a
                contract.
              </p>
            </div>
            <ArrowRight size={22} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="personal-local">
        <div className="personal-shell">
          <div>
            <p className="personal-eyebrow">
              <MapPin size={16} aria-hidden /> ROOTED IN THE TRIAD
            </p>
            <h2>Local means close by.</h2>
            <p>
              Greensboro, High Point, Winston-Salem, and the communities around them. Meet in person
              or talk from the comfort of home.
            </p>
            <Link href="/service-area" className="personal-text-link">
              Explore the service area <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <div className="personal-town-list">
            {[
              { name: "Greensboro", slug: "greensboro" },
              { name: "High Point", slug: "high-point" },
              { name: "Winston-Salem", slug: "winston-salem" },
            ].map((town) => (
              <Link key={town.slug} href={`/medicare-in/${town.slug}`}>
                {town.name}
                <ArrowRight size={20} aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="personal-section personal-shell personal-faq">
        <div>
          <p className="personal-eyebrow">BEFORE WE TALK</p>
          <h2>
            A few things
            <br />
            you might wonder.
          </h2>
          <p className="personal-body">Have a different question? I’d be glad to hear it.</p>
          <a href={AGENT.phoneHref} className="personal-text-link">
            <Phone size={18} aria-hidden />
            {AGENT.phone}
          </a>
        </div>
        <div>
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
      </section>

      <section className="personal-close">
        <div className="personal-shell">
          <p className="personal-eyebrow">LET’S START WITH YOUR QUESTION</p>
          <h2>
            A clearer next step
            <br />
            starts with a conversation.
          </h2>
          <p>
            Let’s sit down, look at what matters to your family, and make your next step clearer.
          </p>
          <div className="personal-actions">
            <Link href="/start" className="personal-button personal-button-light">
              Request my free consultation <ArrowRight size={20} aria-hidden />
            </Link>
            <a href={AGENT.phoneHref} className="personal-text-link">
              <Phone size={18} aria-hidden />
              {AGENT.phone}
            </a>
          </div>
          <span className="personal-close-note">
            Free initial insurance consultation · No obligation · One local agent
          </span>
        </div>
      </section>
    </main>
  );
}
