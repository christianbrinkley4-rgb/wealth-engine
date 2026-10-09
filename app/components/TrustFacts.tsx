import Link from "next/link";
import { AGENT, GOOGLE_MAPS_PROFILE_URL, hasPublishableNpn, publishedProfiles } from "@/lib/agent";
import { GOOGLE_REVIEWS } from "@/lib/testimonials";

/** Empty proof fields stay empty. No badges, quotes or implied review counts. */
export function TrustFacts() {
  const reviews = GOOGLE_REVIEWS;
  return <aside className="trust-facts" aria-label="About working with Christian">
    <p><strong>{AGENT.licenseLine}</strong> · {AGENT.licensedStates.join(", ")}</p>
    {hasPublishableNpn() ? <p><a href="https://www.ncdoi.gov/licensees/insurance-producer-and-adjuster-licensing" rel="noopener noreferrer">Check my license</a> · NPN {AGENT.npn}</p> : null}
    <p>Questions go to me, not a call center. No-cost consultation, with no obligation to enroll or buy.</p>
    <p>{publishedProfiles().map(profile => <a key={profile.network} href={profile.url} rel="me noopener noreferrer" className="trust-profile">{profile.label}</a>)}</p>
    <p>{reviews && reviews.count > 0 && reviews.rating > 0 ? <a href={reviews.url}>{reviews.count} Google reviews · {reviews.rating} out of 5</a> : <a href={GOOGLE_MAPS_PROFILE_URL}>Read or leave a Google review</a>}</p>
    <p><Link href="/medicare-words">Where my numbers come from: terms and official sources</Link></p>
  </aside>;
}
