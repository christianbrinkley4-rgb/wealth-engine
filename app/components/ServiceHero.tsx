import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { AGENT } from "@/lib/agent";

/**
 * The hero for every service and guide page: where search traffic actually
 * lands. A dark pine band with the page's promise, both ways to act, and a
 * real face. On a phone the portrait folds into a small ID card so the
 * buttons stay inside the first screen.
 */

const DEFAULT_PROOF = [
  `Licensed agent · ${AGENT.licenseLine}`,
  "One local person, not a call center",
  "Meet at home, nearby, or by phone",
  "Free consultation. No obligation.",
] as const;

export function ServiceHero({
  crumbs,
  eyebrow,
  title,
  lede,
  secondaryHref,
  secondaryLabel,
  note,
  proof = DEFAULT_PROOF,
  hidePhoneCta = false,
}: {
  crumbs: Array<{ name: string; href?: string }>;
  eyebrow: string;
  title: string;
  lede: string;
  secondaryHref: string;
  secondaryLabel: string;
  note?: ReactNode;
  proof?: readonly string[];
  /** The /ai guides are purely informational; they carry no phone CTA. */
  hidePhoneCta?: boolean;
}) {
  // Older pages put an arrow character in the label; the button draws its own.
  const label = secondaryLabel.replace(/\s*→\s*$/, "");
  return (
    <section className="sh on-dark">
      <div className="sh-glow" aria-hidden />
      <div className="shell sh-grid">
        <div className="sh-copy">
          <nav aria-label="Breadcrumb" className="sh-crumbs">
            {crumbs.map((crumb, index) => (
              <span key={`${crumb.name}-${index}`}>
                {index > 0 ? <span aria-hidden> / </span> : null}
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.name}</Link>
                ) : (
                  <span aria-current="page">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>

          <p className="eyebrow on-dark sh-eyebrow">{eyebrow}</p>
          <h1 className="sh-title">{title}</h1>
          <p className="sh-lede">{lede}</p>

          <div className="sh-actions">
            {!hidePhoneCta && (
              <a href={AGENT.phoneHref} className="btn btn-light">
                <Phone size={19} aria-hidden />
                {AGENT.phone}
              </a>
            )}
            <Link href={secondaryHref} className="btn btn-ghost-light">
              {label} <ArrowRight size={18} className="arrow" aria-hidden />
            </Link>
          </div>
          {note ? (
            <div className="sh-note">{note}</div>
          ) : hidePhoneCta ? null : (
            <p className="sh-note">Free consultation. No obligation to enroll.</p>
          )}
        </div>

        <figure className="sh-figure">
          <div className="sh-photo">
            <Image
              src="/christian-brinkley.jpg"
              alt={`${AGENT.name}, licensed insurance agent in Greensboro, North Carolina`}
              width={1200}
              height={1600}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 899px) 76px, 340px"
            />
          </div>
          <figcaption>
            <span className="sh-name">{AGENT.name}</span>
            <span className="sh-role">
              {AGENT.licenseLine} · {AGENT.city}, {AGENT.state}
            </span>
          </figcaption>
          <ul className="sh-proof">
            {proof.map((point) => (
              <li key={point}>
                <Check size={17} strokeWidth={2.25} aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  );
}
