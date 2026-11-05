import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { NC_HISTORY } from "@/lib/ncLandscapeHistory";
import { loadUsIndex, moopChanges } from "@/lib/usMedicareIndex";
import type { UsStateDetail } from "@/lib/usMedicareIndexTypes";

const DIR = path.join(process.cwd(), "public", "data", "us-medicare");

function state(code: string): UsStateDetail {
  return JSON.parse(fs.readFileSync(path.join(DIR, `${code}.json`), "utf8")) as UsStateDetail;
}

describe("Medicare Advantage Index data", () => {
  const index = loadUsIndex();

  it("covers 50 states, DC and Puerto Rico for 2022-2027", () => {
    expect(index.years).toEqual([2022, 2023, 2024, 2025, 2026, 2027]);
    expect(Object.keys(index.states)).toHaveLength(52);
    expect(index.states.PR).toBeDefined();
    expect(index.states.DC).toBeDefined();
    for (const code of Object.keys(index.states))
      expect(fs.existsSync(path.join(DIR, `${code}.json`))).toBe(true);
  });

  it("matches the North Carolina history exactly", () => {
    const nc = state("NC");
    expect(nc.statewide).toEqual(NC_HISTORY.statewide);
    expect(nc.counties).toEqual(NC_HISTORY.counties);
  });

  it("gives every county a row for every year its state reports", () => {
    for (const code of Object.keys(index.states)) {
      const s = state(code);
      const years = Object.keys(s.statewide).sort();
      for (const [county, rows] of Object.entries(s.counties)) {
        expect(Object.keys(rows).sort(), `${code} ${county}`).toEqual(years);
      }
    }
  });

  it("ranks out-of-pocket changes from the data", () => {
    const changes = moopChanges(index);
    expect(changes.length).toBeGreaterThan(40);
    for (let i = 1; i < changes.length; i++)
      expect(changes[i - 1].pct).toBeGreaterThanOrEqual(changes[i].pct);
    expect(changes.find((c) => c.code === "NC")?.to).toBe(NC_HISTORY.statewide["2027"].moopMedian);
  });
});
