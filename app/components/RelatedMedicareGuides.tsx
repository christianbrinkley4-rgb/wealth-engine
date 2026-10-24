import Link from "next/link";

export function RelatedMedicareGuides() {
  return (
    <nav className="measure-prose app-shell max-w-3xl py-10" aria-label="Related Medicare guides">
      <h2 className="text-24 font-semibold">Related Medicare guides</h2>
      <ul className="text-17 mt-4 space-y-3">
        <li>
          <Link className="underline" href="/medicare-agent-greensboro-nc">
            Medicare help in Greensboro and Guilford County
          </Link>
        </li>
        <li>
          <Link className="underline" href="/medicare-greensboro-nc">
            Greensboro Medicare hub: costs, enrollment dates, and local help
          </Link>
        </li>
        <li>
          <Link className="underline" href="/north-carolina-medicare-programs">
            North Carolina programs that help with Medicare
          </Link>
        </li>
        <li>
          <Link className="underline" href="/aep">
            Reviewing your coverage during Annual Enrollment
          </Link>
        </li>
        <li>
          <Link className="underline" href="/turning-65">
            Turning 65 and finding your enrollment dates
          </Link>
        </li>
      </ul>
    </nav>
  );
}
