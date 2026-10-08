/**
 * One-line freshness stamp for data-heavy pages: "Figures current as of
 * October 2026." Cheap credibility, in the Bankrate/NerdWallet style.
 * The date is the month the figures were last checked, not a promise
 * they never change.
 */
export function DataFreshness({
  date = "October 2026",
  source,
}: {
  date?: string;
  source?: string;
}) {
  return (
    <p className="data-fresh">
      Figures current as of {date}
      {source ? (
        <>
          {" "}· source: {source}
        </>
      ) : null}
      .
    </p>
  );
}
