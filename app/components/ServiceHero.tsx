import Image from "next/image";
import Link from "next/link";
import { Phone, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { AGENT } from "@/lib/agent";

/**
 * The four money pages used to open like blog posts: paper background, no
 * face, no phone until you scrolled. The home page now looks like a product.
 * These pages are where search traffic actually lands, so they have to look
 * like the same site.
 */

const DEFAULT_PROOF = [
  "Licensed in North Carolina",
  "Personal review from a local agent",
  "Meet in person or by phone",
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
}: {
  crumbs: Array<{ name: string; href?: string }>;
  eyebrow: string;
  title: string;
  lede: string;
  secondaryHref: string;
  secondaryLabel: string;
  note?: ReactNode;
  proof?: readonly string[];
}) {
  return (
    <section className="bg-[var(--color-navy)] pt-8 pb-14 text-[var(--color-paper)] md:pt-12 md:pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[3fr_2fr] md:gap-14">
          <div>
            <nav aria-label="Breadcrumb" className="text-16 text-[var(--color-paper)]/70">
              {crumbs.map((crumb, index) => (
                <span key={`${crumb.name}-${index}`}>
                  {index > 0 ? <span aria-hidden> › </span> : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="underline underline-offset-2">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span>{crumb.name}</span>
                  )}
                </span>
              ))}
            </nav>

            <p className="text-13 mt-5 font-medium tracking-[0.12em] text-[var(--color-gold)] uppercase">
              {eyebrow}
            </p>
            <h1 className="text-32 md:text-42 mt-3 leading-[1.12] font-semibold text-balance">
              {title}
            </h1>
            <p className="text-20 mt-5 max-w-xl leading-relaxed text-[var(--color-paper)]/85">
              {lede}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={AGENT.phoneHref}
                className="text-19 inline-flex h-16 min-h-16 items-center justify-center gap-2 rounded-[12px] bg-[var(--color-paper)] px-8 font-semibold text-[var(--color-navy)] transition-opacity hover:opacity-95"
              >
                <Phone className="size-5 shrink-0" aria-hidden />
                {AGENT.phone}
              </a>
              <Link
                href={secondaryHref}
                className="text-19 inline-flex h-16 min-h-16 items-center justify-center rounded-[12px] border-2 border-[var(--color-paper)]/70 px-6 font-semibold transition-colors hover:bg-white/10"
              >
                {secondaryLabel}
              </Link>
            </div>
            {note ? (
              <div className="text-16 mt-4 text-[var(--color-paper)]/70">{note}</div>
            ) : (
              <p className="text-16 mt-4 text-[var(--color-paper)]/70">
                Free consultation. No obligation to enroll.
              </p>
            )}
          </div>

          <figure className="m-0 md:ml-auto md:max-w-[320px]">
            <Image
              src="/christian-brinkley.jpg"
              alt={`${AGENT.name}, licensed insurance agent in Greensboro, North Carolina`}
              width={1200}
              height={1600}
              priority
              sizes="(max-width: 768px) 100vw, 320px"
              className="w-full rounded-2xl border border-white/15 object-cover shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
            />
            <figcaption className="text-16 mt-4 leading-snug">
              <span className="text-18 block font-semibold">{AGENT.name}</span>
              <span className="block text-[var(--color-paper)]/75">
                Licensed insurance agent · {AGENT.city}, {AGENT.state}
              </span>
              <span className="block text-[var(--color-paper)]/75">{AGENT.education}</span>
            </figcaption>
            <ul className="mt-5 flex flex-col gap-3 border-t border-white/15 pt-5">
              {proof.map((point) => (
                <li key={point} className="text-16 flex gap-3 leading-snug">
                  <ShieldCheck
                    className="mt-0.5 size-5 shrink-0 text-[var(--color-gold)]"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </figure>
        </div>
      </div>
    </section>
  );
}
