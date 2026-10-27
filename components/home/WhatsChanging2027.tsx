import { ArrowRight } from "lucide-react";

import { TrackedLink as Link } from "@/components/TrackedLink";
import { CHANGES_2027 } from "@/lib/changes2027";
import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import { AGENT } from "@/lib/agent";

/**
 * Home page news block: the 2027 changes people are actually asking about.
 * Server-rendered, no client JS. Sources are printed on every card.
 */
export function WhatsChanging2027() {
  return (
    <section className="section-tight chg" aria-labelledby="chg-heading">
      <div className="shell">
        <div className="section-head split">
          <h2 id="chg-heading">
            What&rsquo;s changing <em>for 2027</em>
          </h2>
          <p>
            Your plan&rsquo;s letter explains what changes for you. Here&rsquo;s the bigger news
            I&rsquo;m getting asked about this fall.
          </p>
        </div>
        <ul className="chg-grid">
          {CHANGES_2027.map((item) => (
            <li key={item.id}>
              <Link href={item.href} className="card chg-card">
                <span className="chg-kicker">{item.kicker}</span>
                <span className="chg-title">{item.title}</span>
                <span className="chg-body">{item.body}</span>
                <span className="chg-cta">
                  {item.cta} <ArrowRight size={17} aria-hidden />
                </span>
                <span className="chg-source">Source: {item.source}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="chg-close">
          Not sure which of these touches you?{" "}
          <a href={ENGINE_BOOKING_URL} target="_blank" rel="noopener" data-cta-location="inline">
            Book a phone review
          </a>{" "}
          or call or text <a href={AGENT.phoneHref}>{AGENT.phone}</a>.
        </p>
      </div>
    </section>
  );
}
