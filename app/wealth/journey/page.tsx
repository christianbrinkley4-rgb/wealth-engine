import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { SITE_URL } from "@/lib/seo";
import { wealthMetadata } from "@/lib/wealth/seo";
import { JOURNEY, WEALTH_FACTS } from "@/lib/wealth/site";

const path = "/wealth/journey";
const description =
  "Building in public: a 21-year-old licensed agent and accounting senior documenting what he learns about money, one dated entry at a time.";

export const metadata: Metadata = wealthMetadata({
  title: "The Journey: Building in Public at 21",
  description,
  path,
});

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export default function JourneyPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "The journey: building in public",
          description,
          url: `${SITE_URL}${path}`,
          author: { "@id": `${SITE_URL}/#christian` },
          blogPost: JOURNEY.map((entry) => ({
            "@type": "BlogPosting",
            headline: entry.title,
            datePublished: entry.date,
            articleBody: entry.body.join(" "),
            author: { "@id": `${SITE_URL}/#christian` },
            url: `${SITE_URL}${path}#day-${entry.day}`,
          })),
        }}
      />
      <PageHead
        eyebrow="Building in public"
        title={
          <>
            The journey. <span className="w-mark">Newest first.</span>
          </>
        }
        lede="No highlight reel. I write down what I'm doing, what I'm learning and what went wrong. Entries are dated and I don't backfill."
        crumbs={[{ name: "Journey", path }]}
      />
      <section className="w-section">
        <div className="w-shell w-narrow">
          <ol className="w-timeline">
            {JOURNEY.map((entry) => (
              <li className="w-entry" id={`day-${entry.day}`} key={entry.day} data-reveal>
                <div className="w-entry-meta">
                  <span className="w-chip">Day {entry.day}</span>
                  <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                  <span>{entry.tag}</span>
                </div>
                <h2>{entry.title}</h2>
                {entry.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </li>
            ))}
          </ol>

          <div className="w-card" style={{ marginTop: 12 }}>
            <h2 className="w-h3">Got a question I should answer next?</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-muted)" }}>
              Text me. If it&apos;s a good one, it becomes the next tool or article. {WEALTH_FACTS.phone}
            </p>
            <div className="w-btn-row">
              <a href={WEALTH_FACTS.smsHref} className="w-btn">
                <MessageCircle size={18} aria-hidden /> Text Christian
              </a>
              <Link href="/wealth#tools" className="w-btn w-btn-ghost">
                See what&apos;s built so far
              </Link>
            </div>
          </div>
        </div>
      </section>
      <NextUp
        links={[
          { href: "/wealth/tools", label: "Get the 2 free downloads", kind: "Free tools" },
          { href: "/wealth/learn/what-accountants-actually-do", label: "What accountants actually do", kind: "Article" },
          { href: "/wealth/quiz/money-personality", label: "Money personality quiz", kind: "Quiz" },
        ]}
      />
    </main>
  );
}
