"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { TpmoDisclaimer } from "@/components/TpmoDisclaimer";
import { AGENT, GOVERNMENT_DISCLAIMER, publishedProfiles } from "@/lib/agent";
import { featuredPlaces } from "@/lib/triad";

const START = [
  { href: "/plan-check", label: "Plan check quiz" },
  { href: "/turning-65", label: "Turning 65" },
  { href: "/annual-enrollment", label: "Already on Medicare" },
  { href: "/anoc", label: "Your Annual Notice of Change" },
  { href: "/turning-65#enrollment-dates", label: "Find my Medicare dates" },
  { href: "/start", label: "Ask a question" },
  { href: "/schedule", label: "Book a time" },
] as const;

const LEARN = [
  { href: "/learn", label: "Learning Hub" },
  { href: "/guides", label: "Money, tax & Medicare guides" },
  { href: "/numbers", label: "2026-2027 money numbers" },
  { href: "/answers", label: "Medicare questions, answered" },
  { href: "/medicare-words", label: "Medicare words, in plain English" },
  { href: "/taxes-and-retirement", label: "Taxes & retirement" },
  { href: "/advantage-vs-medigap", label: "Advantage or Medigap" },
  { href: "/keep-my-doctor", label: "Keeping your doctors" },
  { href: "/social-security-timing", label: "Social Security timing" },
  { href: "/irmaa-appeal", label: "IRMAA appeals" },
  { href: "/helping-a-parent", label: "Helping a parent" },
] as const;

const MORE = [
  { href: "/insurance-services", label: "All insurance services" },
  { href: "/life-insurance", label: "Life insurance" },
  { href: "/care-coverage", label: "Care and critical illness coverage" },
  { href: "/retirement-income", label: "Retirement income" },
  { href: "/annuities", label: "Annuities" },
  { href: "/medicare", label: "Premium estimate" },
  { href: "/plan", label: "Conversion timing" },
  { href: "/roth-window", label: "Roth conversion window" },
  { href: "/about", label: "About Christian" },
  { href: "/privacy", label: "Privacy" },
] as const;

/**
 * The site footer, absent on paid-traffic landing pages.
 *
 * Those pages exist to offer exactly one next step. Twelve footer links is
 * eleven ways to leave without calling, so /lp/* gets the disclosures it is
 * legally required to carry and nothing else.
 */
export function SiteFooter() {
  const pathname = usePathname() ?? "/";
  if (pathname.startsWith("/lp/")) return null;
  // The /wealth hub and /links carry their own footer.
  if (pathname === "/links" || pathname === "/wealth" || pathname.startsWith("/wealth/")) return null;
  // The /ai guides are purely informational; no phone number on them.
  const isAiRoute = pathname === "/ai" || pathname.startsWith("/ai/");

  const year = new Date().getFullYear();
  const profiles = publishedProfiles();

  return (
    <footer className="ft">
      <div className="shell">
        <div className="ft-hero">
          <h2>
            Questions are easier <em>out loud.</em>
          </h2>
          <div className="ft-hero-side">
            {!isAiRoute && (
              <a href={AGENT.phoneHref} className="ft-phone">
                {AGENT.phone}
              </a>
            )}
            <p>
              {AGENT.hours} {AGENT.afterHoursPromise}
            </p>
          </div>
        </div>

        <div className="ft-grid">
          <div className="ft-col">
            <h3>{AGENT.name}</h3>
            <ul>
              <li>
                <span className="ft-col-text">
                  Licensed agent · {AGENT.licenseLine}
                  <br />
                  {AGENT.city}, {AGENT.state}
                </span>
              </li>
              <li>
                <Link href="/review">Worked with me? Leave a review</Link>
              </li>
            </ul>
            {profiles.length > 0 ? (
              <nav aria-label="Public profiles" className="ft-social">
                <h3>Find me online</h3>
                <ul>
                  {profiles.map((profile) => (
                    <li key={profile.network}>
                      <a href={profile.url} rel="me noopener noreferrer" target="_blank">
                        {profile.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>

          <div className="ft-col">
            <h3>Start here</h3>
            <ul>
              {START.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-col">
            <h3>Learn</h3>
            <ul>
              {LEARN.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-col">
            <h3>Near you</h3>
            <ul>
              {featuredPlaces().map((city) => (
                <li key={city.slug}>
                  <Link href={`/medicare-in/${city.slug}`}>Medicare in {city.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/medicare-creedmoor-nc">Medicare in Creedmoor</Link>
              </li>
              <li>
                <Link href="/medicare-oxford-nc">Medicare in Oxford</Link>
              </li>
              <li>
                <Link href="/service-area">All the towns I serve</Link>
              </li>
            </ul>
            <h3 className="ft-subhead">More help</h3>
            <ul>
              {MORE.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ft-legal">
          <TpmoDisclaimer className="ft-tpmo" />
          <p>
            {GOVERNMENT_DISCLAIMER} This site is operated by {AGENT.name}, a licensed insurance
            agent ({AGENT.licenseLine}) who represents a limited number of insurance companies. It
            is not affiliated with the University of North Carolina at Greensboro. Nothing here is
            tax, legal, or investment advice.
          </p>
          <p>
            © {year} {AGENT.name}. Your information goes to me only. It is never sold.
          </p>
        </div>
      </div>
    </footer>
  );
}
