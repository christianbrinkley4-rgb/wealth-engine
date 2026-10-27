"use client";

import { useState } from "react";

import { NC_LANDSCAPE } from "@/lib/ncLandscape2027";
import { describeCounty, formatDollars } from "@/lib/ncLandscapeCopy";

const COUNTIES = Object.keys(NC_LANDSCAPE.counties).sort();

/** Pick any of North Carolina's 100 counties and see 2026 vs 2027. */
export function CountyPicker() {
  const [county, setCounty] = useState("Guilford");
  const data = NC_LANDSCAPE.counties[county];
  const rows = data
    ? [
        { label: "Medicare Advantage plans", a: data.y2026.plans, b: data.y2027.plans },
        { label: "With drug coverage and a $0 plan premium", a: data.y2026.zeroPremium, b: data.y2027.zeroPremium },
        { label: "PPO plans", a: data.y2026.ppo, b: data.y2027.ppo },
        { label: "HMO plans", a: data.y2026.hmo, b: data.y2027.hmo },
        { label: "Rated 4 stars or higher", a: data.y2026.fourStarPlus, b: data.y2027.fourStarPlus },
        { label: "Insurance companies offering plans", a: data.y2026.insurers, b: data.y2027.insurers },
        {
          label: "Typical in-network out-of-pocket max",
          a: formatDollars(data.y2026.moopMedian),
          b: formatDollars(data.y2027.moopMedian),
        },
      ]
    : [];

  return (
    <div className="cty-pick">
      <label htmlFor="county-select" className="cty-label">
        Choose your county
      </label>
      <select
        id="county-select"
        className="cty-select"
        value={county}
        onChange={(event) => setCounty(event.target.value)}
      >
        {COUNTIES.map((name) => (
          <option key={name} value={name}>
            {name} County
          </option>
        ))}
      </select>
      {data && (
        <div className="cty-card" aria-live="polite">
          <h3 className="cty-title">{county} County, 2026 vs. 2027</h3>
          <p className="cty-summary">{describeCounty(county, data)}</p>
          <dl className="cty-rows">
            {rows.map((row) => (
              <div key={row.label} className="cty-row">
                <dt>{row.label}</dt>
                <dd>
                  <span className="cty-old">{row.a}</span>
                  <span aria-hidden> → </span>
                  <span className="sr-only"> in 2026, </span>
                  <strong>{row.b}</strong>
                  <span className="sr-only"> in 2027</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="cty-note">
            Counts don&apos;t include Special Needs Plans ({data.y2027.specialNeeds} in {county}{" "}
            County for 2027) or employer plans. &ldquo;Typical&rdquo; is the median: half the
            plans are higher, half are lower.
          </p>
        </div>
      )}
    </div>
  );
}
