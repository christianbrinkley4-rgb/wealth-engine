"use client";

import { useState } from "react";

import { ResponsiveTable } from "@/app/components/ResponsiveTable";
import {
  HISTORY_COUNTIES,
  HISTORY_YEARS,
  county,
  describeCountyHistory,
  formatDollars,
} from "@/lib/ncHistoryCopy";

/** Pick any of North Carolina's 100 counties and see six years side by side. */
export function HistoryCountyPicker() {
  const [name, setName] = useState("Guilford");

  return (
    <div className="mt-6">
      <label htmlFor="history-county" className="text-17 block font-semibold">
        Choose your county
      </label>
      <select
        id="history-county"
        className="text-17 mt-2 w-full rounded-lg border-2 border-[var(--color-navy)] bg-white p-3"
        value={name}
        onChange={(event) => setName(event.target.value)}
      >
        {HISTORY_COUNTIES.map((c) => (
          <option key={c} value={c}>
            {c} County
          </option>
        ))}
      </select>
      <div aria-live="polite">
        <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          {describeCountyHistory(name)}
        </p>
        <div className="mt-4 overflow-x-auto">
          <ResponsiveTable className="w-full min-w-[560px] border-collapse text-left">
            <caption className="sr-only">
              {name} County Medicare Advantage plans by year, 2022 to 2027
            </caption>
            <thead>
              <tr className="border-b-2 border-[var(--color-navy)]">
                <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                  Year
                </th>
                <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                  Plans
                </th>
                <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                  $0 premium with drugs
                </th>
                <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                  4 stars or higher
                </th>
                <th scope="col" className="text-16 py-3 font-semibold">
                  Typical out-of-pocket max
                </th>
              </tr>
            </thead>
            <tbody>
              {HISTORY_YEARS.map((y) => {
                const d = county(name, y);
                if (!d) return null;
                return (
                  <tr key={y} className="border-b border-gray-300 align-top">
                    <th scope="row" className="text-16 py-3 pr-4 font-semibold">
                      {y}
                    </th>
                    <td className="text-16 py-3 pr-4">{d.plans}</td>
                    <td className="text-16 py-3 pr-4">{d.zeroPremium}</td>
                    <td className="text-16 py-3 pr-4">{d.fourStarPlus}</td>
                    <td className="text-16 py-3 whitespace-nowrap">
                      {formatDollars(d.moopMedian)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </ResponsiveTable>
        </div>
      </div>
    </div>
  );
}
