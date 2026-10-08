import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";

import { getPersonality, PERSONALITIES } from "@/lib/wealth/quizzes";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";

/**
 * One page per money personality. This is where a shared result lands, so
 * the link someone posts has its own title and its own share card instead of
 * the generic quiz one.
 */

const PUBLISHED = "2026-10-06";

export function generateStaticParams() {
  return PERSONALITIES.map((type) => ({ type: type.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const result = getPersonality(type);
  if (!result) return {};
  const path = `/wealth/quiz/money-personality/${result.id}`;
  const meta = wealthMetadata({
    title: `${result.name}: a money personality. ${result.tagline}`,
    description: `${result.summary} See the strengths, the blind spots and what to do next. Then take the 2-minute quiz.`.slice(0, 158),
    path,
  });
  // The share card for this page is the type's own image, next to this file.
  const image = { url: `${path}/opengraph-image`, width: 1200, height: 630, alt: `${result.name}. ${result.tagline}` };
  return {
    ...meta,
    openGraph: { ...meta.openGraph, images: [image] },
    twitter: { ...meta.twitter, images: [image.url] },
  };
}

export default async function PersonalityTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const result = getPersonality(type);
  if (!result) notFound();

  const path = `/wealth/quiz/money-personality/${result.id}`;
  const others = PERSONALITIES.filter((item) => item.id !== result.id);

  return (
    <main>
      <JsonLd
        data={wealthArticleJsonLd({
          headline: `${result.name}: a money personality`,
          description: result.summary,
          path,
          datePublished: PUBLISHED,
          dateModified: PUBLISHED,
        })}
      />
      <PageHead
        eyebrow="Money personality"
        title={
          <>
            {result.name}. <span className="w-mark">{result.tagline}</span>
          </>
        }
        lede="One of four money personalities from my 2-minute quiz. Sound like you? Take it and find out."
        crumbs={[
          { name: "Quizzes", path: "/wealth/quiz" },
          { name: "Money personality", path: "/wealth/quiz/money-personality" },
          { name: result.name, path },
        ]}
      >
        <div className="w-btn-row">
          <Link href="/wealth/quiz/money-personality" className="w-btn">
            Take the quiz <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </PageHead>

      <section className="w-section">
        <div className="w-shell">
          <div className="w-quiz">
            <div className="w-result-card" data-type={result.id} data-tilt>
              <p className="w-eyebrow">A money personality</p>
              <h2 className="w-result-name">{result.name}</h2>
              <p className="w-result-tag">{result.tagline}</p>
              <p className="w-result-sum">{result.summary}</p>
            </div>
            <div className="w-two">
              <div className="w-card">
                <h3>Strengths</h3>
                <ul>
                  {result.strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="w-card">
                <h3>Blind spots</h3>
                <ul>
                  {result.blindSpots.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="w-steps-title" style={{ marginTop: 28 }}>
              Next steps for {result.name}
            </p>
            <ul className="w-next-list">
              {result.nextSteps.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span>Next</span>
                    <strong>{link.label}</strong>
                    <ArrowUpRight size={20} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="w-note">
              <strong>For fun and self-reflection.</strong> These 4 types describe habits. It isn&apos;t a
              scientific test and it isn&apos;t advice. Nobody is 100% one type.
            </p>
          </div>
        </div>
      </section>

      <NextUp
        title="The other three"
        links={others.map((item) => ({
          href: `/wealth/quiz/money-personality/${item.id}`,
          label: `${item.name}: ${item.tagline}`,
          kind: "Money personality",
        }))}
      />
    </main>
  );
}
