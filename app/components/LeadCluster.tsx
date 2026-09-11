import Link from "next/link";

const LEADS = [
  {
    href: "/turning-65",
    label: "Turning 65",
    blurb: "When to enroll and how to get started",
  },
  {
    href: "/annual-enrollment",
    label: "Annual enrollment",
    blurb: "Review your coverage for the coming year",
  },
  {
    href: "/life-insurance",
    label: "Life insurance",
    blurb: "Review the protection your family needs",
  },
  {
    href: "/retirement-income",
    label: "Retirement income",
    blurb: "401(k) options and Medicare timing",
  },
] as const;

export function LeadCluster({
  current,
  heading = "Other questions I can help with",
}: {
  current?: string;
  heading?: string;
}) {
  return (
    <nav aria-label="Related help" className="mt-8">
      <p className="text-17 font-medium text-[var(--color-navy)]">{heading}</p>
      <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {LEADS.filter((item) => item.href !== current).map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex min-h-16 flex-col justify-center rounded-xl border border-[rgba(15,34,65,0.14)] bg-white px-5 py-4 transition-colors hover:border-[var(--color-navy)]"
            >
              <span className="text-17 font-semibold">{item.label} →</span>
              <span className="text-16 mt-1 text-[var(--color-ink-muted)]">{item.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
