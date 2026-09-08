import Link from "next/link";

import { isHighIntentPlace, nearbyCountyContrasts, type TriadCity } from "@/lib/triad";

/**
 * Facts already stored on the city record — drive time, county, hospitals —
 * that the templates used to bury in one interchangeable county paragraph.
 */
export function CitySnapshot({ city }: { city: TriadCity }) {
  const drive =
    city.minutesFromDowntown === 0
      ? "Where I live"
      : `About ${city.minutesFromDowntown} minutes from downtown Greensboro`;
  const contrasts = nearbyCountyContrasts(city);
  const deep = isHighIntentPlace(city.slug);

  return (
    <aside className="rounded-xl border border-[rgba(15,34,65,0.12)] bg-[var(--color-paper)] p-6">
      <p className="text-13 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
        {city.name} at a glance
      </p>
      <dl className="mt-4 flex flex-col gap-3">
        <div>
          <dt className="text-15 font-medium text-[var(--color-ink-muted)]">Drive</dt>
          <dd className="text-17 mt-0.5">{drive}</dd>
        </div>
        <div>
          <dt className="text-15 font-medium text-[var(--color-ink-muted)]">Medicare county</dt>
          <dd className="text-17 mt-0.5">{city.county}</dd>
        </div>
        <div>
          <dt className="text-15 font-medium text-[var(--color-ink-muted)]">Households</dt>
          <dd className="text-17 mt-0.5">{city.population}</dd>
        </div>
        <div>
          <dt className="text-15 font-medium text-[var(--color-ink-muted)]">
            Where people are treated
          </dt>
          <dd className="text-17 mt-0.5">{city.hospitals.join("; ")}</dd>
        </div>
      </dl>
      {city.countyNote ? (
        <p className="text-16 mt-4 border-l-4 border-[var(--color-gold-ink)] py-1 pl-4 leading-relaxed">
          {city.countyNote}
        </p>
      ) : null}
      {contrasts.length > 0 ? (
        <p className="text-16 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          Nearby towns on a different Medicare list:{" "}
          {contrasts.map((place, index) => (
            <span key={place.slug}>
              {index > 0 ? ", " : ""}
              <Link href={`/medicare-in/${place.slug}`} className="underline underline-offset-2">
                {place.name}
              </Link>{" "}
              ({place.county})
            </span>
          ))}
          . Life insurance and a 401(k) do not follow that line. Advantage does.
        </p>
      ) : deep ? (
        <p className="text-16 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          Neighbors on this list share {city.county}. Advantage still has to include the specific
          practice, for the year coverage starts.
        </p>
      ) : null}
    </aside>
  );
}
