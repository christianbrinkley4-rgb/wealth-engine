import Link from "next/link";

import { isHighIntentPlace, nearbyCountyContrasts, type TriadCity } from "@/lib/triad";

export type CitySnapshotTopic = "medicare" | "life" | "retirement";

/**
 * Facts already stored on the city record — drive time, county, hospitals —
 * that the templates used to bury in one interchangeable county paragraph.
 */
export function CitySnapshot({
  city,
  topic = "medicare",
}: {
  city: TriadCity;
  topic?: CitySnapshotTopic;
}) {
  const contrasts = nearbyCountyContrasts(city);
  const deep = isHighIntentPlace(city.slug);
  const isLife = topic === "life";

  return (
    <aside className="rounded-xl border border-[rgba(21,46,52,0.12)] bg-[var(--color-paper)] p-6">
      <p className="text-13 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
        {city.name} at a glance
      </p>
      <dl className="mt-4 flex flex-col gap-3">
        <div>
          <dt className="text-15 font-medium text-[var(--color-ink-muted)]">Ways to meet</dt>
          <dd className="text-17 mt-0.5">At home, at a public location, or by phone</dd>
        </div>
        <div>
          <dt className="text-15 font-medium text-[var(--color-ink-muted)]">
            {isLife ? "County" : "Medicare county"}
          </dt>
          <dd className="text-17 mt-0.5">{city.county}</dd>
        </div>
        {city.minutesFromDowntown > 0 ? (
          <div>
            <dt className="text-15 font-medium text-[var(--color-ink-muted)]">
              Typical drive from Greensboro
            </dt>
            <dd className="text-17 mt-0.5">
              About {city.minutesFromDowntown} minutes in ordinary traffic
            </dd>
          </div>
        ) : null}
        {isLife ? (
          <div>
            <dt className="text-15 font-medium text-[var(--color-ink-muted)]">
              Helpful to have nearby
            </dt>
            <dd className="text-17 mt-0.5">
              Your current policy, who you want protected, and any coverage through work
            </dd>
          </div>
        ) : (
          <div>
            <dt className="text-15 font-medium text-[var(--color-ink-muted)]">
              Nearby hospitals and health systems
            </dt>
            <dd className="text-17 mt-0.5">{city.hospitals.join("; ")}</dd>
          </div>
        )}
        {isLife && city.nearby.length > 0 ? (
          <div>
            <dt className="text-15 font-medium text-[var(--color-ink-muted)]">
              Nearby communities
            </dt>
            <dd className="text-17 mt-0.5">{city.nearby.join(", ")}</dd>
          </div>
        ) : null}
      </dl>
      {city.countyNote ? (
        <p className="text-16 mt-4 rounded-lg bg-[#f3f0e6] px-4 py-3 leading-relaxed">
          {city.countyNote}
        </p>
      ) : null}
      {isLife ? (
        <p className="text-16 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          We can meet in {city.name} or talk by phone. Bring questions about what you already have
          before we talk about anything new.
        </p>
      ) : contrasts.length > 0 ? (
        <p className="text-16 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          Nearby communities in other counties:{" "}
          {contrasts.map((place, index) => (
            <span key={place.slug}>
              {index > 0 ? ", " : ""}
              <Link href={`/medicare-in/${place.slug}`} className="underline underline-offset-2">
                {place.name}
              </Link>{" "}
              ({place.county})
            </span>
          ))}
          . Medicare Advantage plan availability may differ, so we’ll check your home address.
        </p>
      ) : deep ? (
        <p className="text-16 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          When comparing Medicare Advantage plans in {city.county}, we’ll check your doctors and
          hospitals for the year your coverage will begin.
        </p>
      ) : null}
    </aside>
  );
}
