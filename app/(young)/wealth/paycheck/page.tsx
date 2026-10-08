import type { Metadata } from "next";
import Link from "next/link";

import { articleJsonLd, breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";
import { WealthLane } from "@/lib/wealthLane";

const lesson = WealthLane.paycheckLesson();
const description =
  "What gross pay, federal income tax, Social Security, Medicare, and net pay mean on a stub. Education only. No sample dollars.";

export const metadata: Metadata = {
  title: lesson.title,
  description,
  alternates: { canonical: WealthLane.paycheckPath },
  openGraph: pageOpenGraph({ title: lesson.title, description, path: WealthLane.paycheckPath }),
  twitter: pageTwitter({ title: lesson.title, description }),
};

export default function PaycheckLessonPage() {
  return (
    <main className="wealth-lesson">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Wealth", path: "/wealth" },
              { name: "Paycheck", path: WealthLane.paycheckPath },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: lesson.title,
              description,
              path: WealthLane.paycheckPath,
              datePublished: "2026-10-06",
              dateModified: "2026-10-06",
            }),
          ),
        }}
      />
      <div className="wealth-shell">
        <p className="wealth-eyebrow">{lesson.eyebrow}</p>
        <h1>{lesson.title}</h1>
        <p className="wealth-lede">{lesson.lede}</p>
        <ol className="wealth-lesson-list">
          {lesson.lines.map((line) => (
            <li key={line.label}>
              <h2>{line.label}</h2>
              <p>{line.text}</p>
            </li>
          ))}
        </ol>
        <section className="wealth-lesson-also" aria-labelledby="stub-also">
          <h2 id="stub-also">{lesson.also.title}</h2>
          <p>{lesson.also.text}</p>
        </section>
        <p className="wealth-lesson-close">{lesson.close}</p>
        <Link href={WealthLane.hubPath} className="wealth-back">
          {lesson.back}
        </Link>
      </div>
    </main>
  );
}
