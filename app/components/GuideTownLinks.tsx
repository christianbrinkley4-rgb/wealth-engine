import Link from "next/link";

import { featuredPlaces, highIntentPlaces, TRIAD_CITIES } from "@/lib/triad";

type Kind = "medicare" | "life" | "retirement";

const PREFIX: Record<Kind, string> = {
  medicare: "/medicare-in",
  life: "/life-insurance-in",
  retirement: "/retirement-in",
};

/**
 * Hub cities plus the five high-intent towns, linked into the matching local
 * URL. Guides used to name counties in prose and point only at /service-area.
 */
export function GuideTownLinks({
  kind = "medicare",
  heading = "Kitchen-table pages for the towns I actually drive to",
}: {
  kind?: Kind;
  heading?: string;
}) {
  const prefix = PREFIX[kind];
  const hubs = featuredPlaces();
  const extras = highIntentPlaces().filter((place) => !hubs.some((hub) => hub.slug === place.slug));
  const places = [...hubs, ...extras];

  return (
    <div className="mt-6">
      <p className="text-17 font-medium text-[var(--color-navy)]">{heading}</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {places.map((place) => (
          <li key={place.slug}>
            <Link href={`${prefix}/${place.slug}`} className="text-17 underline underline-offset-2">
              {place.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/service-area" className="text-17 font-medium underline underline-offset-2">
            All {TRIAD_CITIES.length} towns →
          </Link>
        </li>
      </ul>
    </div>
  );
}
