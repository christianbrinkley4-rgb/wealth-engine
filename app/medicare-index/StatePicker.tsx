"use client";

import { useEffect, useState } from "react";

import { ResponsiveTable } from "@/app/components/ResponsiveTable";
import { formatDollars, formatPremium } from "@/lib/ncLandscapeCopy";
import { US_DATA_PATH, type UsStateDetail } from "@/lib/usMedicareIndexTypes";

const TH = "text-16 py-3 pr-4 font-semibold";
const TD = "text-16 py-3 pr-4";

/** Pick a state (then a county) and see six years of Medicare Advantage data. */
export function StatePicker({ states }: { states: Array<{ code: string; name: string }> }) {
  const [code, setCode] = useState("NC");
  const [detail, setDetail] = useState<UsStateDetail | null>(null);
  const [county, setCounty] = useState("");
  const [failed, setFailed] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    fetch(`${US_DATA_PATH}/${code}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: UsStateDetail) => {
        if (!live) return;
        setDetail(d);
        setCounty(Object.keys(d.counties).sort()[0] ?? "");
      })
      .catch(() => live && setFailed(code));
    return () => {
      live = false;
    };
  }, [code]);

  const ready = detail && detail.state === code;
  const counties = ready ? Object.keys(detail.counties).sort() : [];
  const countyRows = ready && county ? detail.counties[county] : null;

  return (
    <div className="mt-6">
      <label htmlFor="index-state" className="text-17 block font-semibold">
        Choose a state
      </label>
      <select
        id="index-state"
        className="text-17 mt-2 w-full rounded-lg border-2 border-[var(--color-navy)] bg-white p-3"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      >
        {states.map((s) => (
          <option key={s.code} value={s.code}>
            {s.name}
          </option>
        ))}
      </select>

      {failed === code && !(detail && detail.state === code) && (
        <p className="text-17 mt-4 text-[var(--color-ink-muted)]">
          That state didn&apos;t load. Try again in a moment.
        </p>
      )}

      {ready && (
        <div aria-live="polite">
          <h3 className="text-19 mt-6 font-semibold">{detail.name}, statewide</h3>
          <div className="mt-3 overflow-x-auto">
            <ResponsiveTable className="w-full min-w-[600px] border-collapse text-left">
              <caption className="sr-only">{detail.name} Medicare plans by year</caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className={TH}>
                    Year
                  </th>
                  <th scope="col" className={TH}>
                    Medicare Advantage plans
                  </th>
                  <th scope="col" className={TH}>
                    $0 premium with drugs
                  </th>
                  <th scope="col" className={TH}>
                    Typical out-of-pocket max
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    Lowest drug plan premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {detail.years.map((y) => {
                  const s = detail.statewide[String(y)];
                  return (
                    <tr key={y} className="border-b border-gray-300 align-top">
                      <th scope="row" className={TH}>
                        {y}
                      </th>
                      <td className={TD}>{s ? s.plans : "Not reported"}</td>
                      <td className={TD}>{s ? s.zeroPremium : "Not reported"}</td>
                      <td className={`${TD} whitespace-nowrap`}>
                        {s ? formatDollars(s.moopMedian) : "Not reported"}
                      </td>
                      <td className="text-16 py-3 whitespace-nowrap">
                        {s ? formatPremium(s.pdpLowestPremium) : "Not reported"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </ResponsiveTable>
          </div>

          {counties.length > 0 && (
            <>
              <label htmlFor="index-county" className="text-17 mt-8 block font-semibold">
                Choose a county in {detail.name}
              </label>
              <select
                id="index-county"
                className="text-17 mt-2 w-full rounded-lg border-2 border-[var(--color-navy)] bg-white p-3"
                value={county}
                onChange={(event) => setCounty(event.target.value)}
              >
                {counties.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {countyRows && (
                <div className="mt-3 overflow-x-auto">
                  <ResponsiveTable className="w-full min-w-[520px] border-collapse text-left">
                    <caption className="sr-only">
                      {county}, {detail.name} Medicare Advantage plans by year
                    </caption>
                    <thead>
                      <tr className="border-b-2 border-[var(--color-navy)]">
                        <th scope="col" className={TH}>
                          Year
                        </th>
                        <th scope="col" className={TH}>
                          Plans
                        </th>
                        <th scope="col" className={TH}>
                          $0 premium with drugs
                        </th>
                        <th scope="col" className="text-16 py-3 font-semibold">
                          Typical out-of-pocket max
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.years.map((y) => {
                        const c = countyRows[String(y)];
                        return (
                          <tr key={y} className="border-b border-gray-300 align-top">
                            <th scope="row" className={TH}>
                              {y}
                            </th>
                            <td className={TD}>{c ? c.plans : "Not reported"}</td>
                            <td className={TD}>{c ? c.zeroPremium : "Not reported"}</td>
                            <td className="text-16 py-3 whitespace-nowrap">
                              {c
                                ? c.plans
                                  ? formatDollars(c.moopMedian)
                                  : "No plans"
                                : "Not reported"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </ResponsiveTable>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
