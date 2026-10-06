import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { AGENT, GOOGLE_WRITE_REVIEW_URL } from "@/lib/agent";
import { parseReviewSource, REVIEW_PATH, REVIEW_PROMPTS } from "@/lib/review";

import { ReviewButton, ReviewViewTracker } from "./ReviewActions";

// A short link Christian hands to people he has worked with. Not a page to find
// in search, and the same address is on printed cards, so it never changes.
export const metadata: Metadata = {
  title: "Leave a review",
  description: "For people I’ve worked with. A Google review helps neighbors find me.",
  alternates: { canonical: REVIEW_PATH },
  robots: { index: false, follow: true },
};

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string | string[] }>;
}) {
  const rawFrom = (await searchParams).from;
  const source = parseReviewSource(Array.isArray(rawFrom) ? rawFrom[0] : rawFrom);

  const heading =
    source === "meeting" ? "Thanks for sitting down with me." : "Worked with me? Thank you.";

  return (
    <main className="rvp">
      <ReviewViewTracker source={source} />
      <div className="shell">
        <div className="rvp-card">
          <Image
            src="/christian-brinkley-square.jpg"
            alt={`${AGENT.name}, licensed insurance agent in ${AGENT.city}, North Carolina`}
            width={192}
            height={192}
            sizes="96px"
            className="rvp-avatar"
            priority
          />
          <p className="rvp-who">
            <strong>{AGENT.name}</strong>
            <span>
              {AGENT.licenseLine} · {AGENT.city}, {AGENT.state}
            </span>
          </p>

          <h1>{heading}</h1>
          <p className="rvp-lede">
            If we’ve worked together, a Google review helps your neighbors find an agent they can
            actually call. It takes a couple of minutes. Say what’s true, good or not so good. A few
            sentences is plenty.
          </p>

          <ReviewButton href={GOOGLE_WRITE_REVIEW_URL} source={source} />
          <p className="rvp-hint">Opens Google in a new tab. You’ll need a Google account.</p>

          <div className="rvp-prompts">
            <h2>Not sure where to start?</h2>
            <ul>
              {REVIEW_PROMPTS.map((prompt) => (
                <li key={prompt}>{prompt}</li>
              ))}
            </ul>
            <p>Your own words are best. I’ll never ask you to say anything in particular.</p>
          </div>

          <p className="rvp-fine">
            I don’t give anything in return for a review, and I ask everyone I’ve worked with the
            same way.
          </p>
        </div>

        <p className="rvp-new">
          Haven’t worked with me yet? No review needed. If you have a Medicare question, call me at{" "}
          <a href={AGENT.phoneHref}>
            <Phone size={15} aria-hidden /> {AGENT.phone}
          </a>{" "}
          or <Link href="/start">ask it here</Link>.
        </p>
      </div>
    </main>
  );
}
