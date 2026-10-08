import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { getTool } from "@/lib/wealth/site";

/** The manifesto: why Christian documents his money journey in the open. */

const PATH = "/wealth/building-in-public";
const TITLE = "Building in public: the manifesto";
const DESCRIPTION =
  "Why I document my money journey in the open: dated entries, real wins and misses, and a record that beats a highlight reel.";

export function generateMetadata(): Metadata {
  return wealthMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
}

const ANSWER =
  "I document my money journey in dated entries at the journey page. Real wins, real misses, no backfill. This page is the why behind it.";

type Section = { heading: string; paragraphs: string[]; list?: string[] };

const SECTIONS: Section[] = [
  {
    heading: "Why document at all",
    paragraphs: [
      "Accountability. Writing something down makes it real.",
      "A highlight reel only shows the wins. A real record shows the misses too. The misses teach the most.",
    ],
  },
  {
    heading: "What it means here",
    paragraphs: [
      "Every entry at the [journey page](/wealth/journey) carries a date. I write them as they happen, in my own words.",
      "No backfill. No rewriting the past to look smarter. What is written stays written.",
    ],
  },
  {
    heading: "What I am learning",
    paragraphs: [
      "Real things. I have reviewed 100+ client files with a financial advisor and sat in on dozens of client money appointments.",
      "I am a licensed NC insurance agent and a UNCG accounting senior. I build tools in Python and I run this site.",
      "You will see that mix here: money, accounting, and code, as I learn them.",
    ],
  },
  {
    heading: "The long game",
    paragraphs: [
      "One day I want to run my own practice. These entries are the record of the road there.",
      "No timeline announced. The work comes first.",
    ],
  },
  {
    heading: "How to follow",
    paragraphs: [
      "New entries land at the [journey page](/wealth/journey). Email drops go out to subscribers there.",
      "If you want the full map first, start at the [wealth home](/wealth).",
    ],
  },
];

const FAQ = [
  {
    q: "What does building in public mean?",
    a: "Sharing your work and results as they happen. Not just the wins.",
  },
  {
    q: "Will you show your mistakes too?",
    a: "Yes. Wins and misses both. A record that skips the misses is a highlight reel, not a record.",
  },
  {
    q: "Are the entries written in real time?",
    a: "Yes. Each one is dated when written. I do not backfill or rewrite old entries.",
  },
  {
    q: "Is this financial advice?",
    a: "No. It is education and my own experience. I am not securities licensed and I am not your advisor.",
  },
];

const SOURCES = [
  {
    href: "https://christianbrinkleync.com/wealth/journey",
    label: "My journey entries",
  },
  {
    href: "https://christianbrinkleync.com/wealth",
    label: "christianbrinkleync.com/wealth",
  },
];

/** Render [label](href) spans as internal links. */
function rich(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <Link key={index} href={match[2]}>
          {match[1]}
        </Link>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export default function BuildingInPublicPage() {
  const tool = getTool("first-1000");
  return (
    <main>
      <JsonLd
        data={wealthArticleJsonLd({
          headline: TITLE,
          description: DESCRIPTION,
          path: PATH,
          datePublished: "2026-10-08",
          dateModified: "2026-10-08",
        })}
      />
      <PageHead
        eyebrow="Journey"
        title={TITLE}
        lede="This is the why behind the journey entries. Read this once, then follow along."
        crumbs={[{ name: TITLE, path: PATH }]}
      >
        <ul className="w-meta">
          <li>3 min read</li>
          <li>Updated October 8, 2026</li>
          <li>By Christian Brinkley</li>
        </ul>
      </PageHead>

      <article className="w-section-tight">
        <div className="w-shell w-narrow">
          <p className="w-answer">
            <span>Short answer</span>
            {ANSWER}
          </p>
          <div className="w-prose">
            {SECTIONS.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{rich(paragraph)}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{rich(item)}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Try it yourself">
            <p className="w-eyebrow">
              Now try it · {tool.kind} · {tool.time}
            </p>
            <h2 className="w-h3">{tool.title}</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>{tool.blurb}</p>
            <div className="w-btn-row">
              <Link href={tool.href} className="w-btn">
                Open it <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </aside>

          <div className="w-sources">
            <h2>Sources</h2>
            <ul>
              {SOURCES.map((source) => (
                <li key={source.href}>
                  <a href={source.href} rel="noopener">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <EducationNote />

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Start a conversation">
            <p className="w-eyebrow">No cost, no pressure</p>
            <h2 className="w-h3">Talk it through</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              Have a money question or want a second set of eyes? Start a conversation and we will take it
              one question at a time.
            </p>
            <div className="w-btn-row">
              <Link href="/start" className="w-btn">
                Start a conversation <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
            <p style={{ margin: "14px 0 0", color: "var(--w-on-ink-muted)" }}>
              Christian Brinkley, Greensboro, NC, <a href="tel:+19194086671">(919) 408-6671</a>
            </p>
          </aside>
        </div>
      </article>

      <Faq items={FAQ} title="Quick answers" />
      <NextUp
        title="Read next"
        links={[
          { href: "/wealth/journey", label: "The journey", kind: "Journey" },
          { href: "/wealth", label: "Wealth home", kind: "Hub" },
          { href: "/wealth/quiz/first-1000", label: "What do I do with my first $1,000?", kind: "Quiz" },
        ]}
      />
    </main>
  );
}
