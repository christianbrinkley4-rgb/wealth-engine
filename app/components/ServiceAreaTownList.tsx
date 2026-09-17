import Link from "next/link";

import { featuredPlaces, townPlaces, type TriadCity } from "@/lib/triad";

export function ServiceAreaTownList({ hrefFor }: { hrefFor: (place: TriadCity) => string }) {
  const towns = townPlaces();
  return (
    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
      {towns.map((place) => (
        <li key={place.slug}>
          <Link href={hrefFor(place)} className="text-17 underline-offset-2 hover:underline">
            {place.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FeaturedPlaceCards({
  hrefFor,
  labelFor,
}: {
  hrefFor: (place: TriadCity) => string;
  labelFor: (place: TriadCity) => string;
}) {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      {featuredPlaces().map((city) => (
        <li
          key={city.slug}
          className="flex flex-col rounded-xl border border-[rgba(21,46,52,0.12)] bg-[var(--color-paper)] p-6"
        >
          <p className="text-13 font-medium tracking-[0.1em] text-[var(--color-gold-ink)] uppercase">
            {city.county}
          </p>
          <h3 className="text-22 mt-2 font-semibold">{city.name}</h3>
          <p className="text-16 mt-2 text-[var(--color-ink-muted)]">
            Meet at home or talk by phone
          </p>
          <Link
            href={hrefFor(city)}
            className="text-17 mt-4 font-medium underline-offset-2 hover:underline"
          >
            {labelFor(city)} →
          </Link>
        </li>
      ))}
    </ul>
  );
}
