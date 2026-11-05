"""Build lib/ncLandscapeHistory.ts: six years (2022-2027) of North Carolina
Medicare Advantage and Part D landscape counts, by county and statewide.

Usage:
  python -I scripts/landscape/build-nc-history.py <landscape-root> lib/ncLandscapeHistory.ts

<landscape-root> holds one folder per year (2022 ... 2027) with the CSVs
extracted from the CMS Landscape Source Files:
  https://www.cms.gov/medicare/coverage/prescription-drug-coverage
  - CY2006-CY2025 Landscape Files (ZIP) for 2022-2025
  - CY2026 Landscape (202609) and CY2027 Landscape (202611) ZIPs

CMS changed the file layout twice:
  2022-2024: separate MA, SNP and PDP files, full state names, a few
             preamble rows above the header.
  2025-2027: one combined file with Contract Category Type and a SNP flag.

Definitions match scripts/landscape/build-nc-landscape.py so the 2026 and 2027
numbers equal lib/ncLandscape2027.ts:
  plans        Medicare Advantage plans open to anyone (no SNPs, no employer plans)
  withDrugs    of those, plans that include Part D
  zeroPremium  plans with drug coverage and a $0 monthly consolidated premium
  ppo / hmo    plan type contains PPO / HMO
  moopMedian   median in-network out-of-pocket maximum
  fourStarPlus overall star rating 4 or higher
  specialNeeds Special Needs Plans offered in the county

Insurer counts are left out on purpose: the old files name the contracting
legal entity, the new ones the parent company, so the counts don't compare.
Counts only. No plan names, insurer names or plan IDs are written out.
"""

import csv
import io
import json
import os
import statistics
import sys

ROOT = sys.argv[1]
OUT = sys.argv[2]
YEARS = [2022, 2023, 2024, 2025, 2026, 2027]


def money(s):
    s = (s or "").strip().replace("$", "").replace(",", "").replace("*", "").strip()
    # 2022-2023 files use Excel accounting format, which writes zero as "$-".
    if s == "-":
        return 0.0
    if s.startswith("(") and s.endswith(")"):
        s = "-" + s[1:-1]
    try:
        return float(s)
    except ValueError:
        return None


def star(s):
    try:
        return float((s or "").strip())
    except ValueError:
        return None


def read_old(path):
    text = open(path, encoding="utf-8-sig", errors="replace").read()
    rows = list(csv.reader(io.StringIO(text)))
    hi = next(i for i, row in enumerate(rows) if row and row[0].strip() == "State")
    header = [" ".join(h.split()) for h in rows[hi]]
    return [dict(zip(header, row)) for row in rows[hi + 1 :] if len(row) > 3]


def find(folder, *needles):
    for dirpath, _, files in os.walk(folder):
        for f in sorted(files):
            if f.lower().endswith(".csv") and all(n in f for n in needles):
                return os.path.join(dirpath, f)
    raise FileNotFoundError(f"{folder}: {needles}")


def old_year(year):
    """Normalize a 2022-2024 year into common records."""
    folder = os.path.join(ROOT, str(year))
    ma_name = ("MA_NtoW",) if year < 2024 else ("Landscape_MA_2",)
    ma = [r for r in read_old(find(folder, *ma_name)) if r.get("State", "").strip() == "North Carolina"]
    snp = [r for r in read_old(find(folder, "SNP")) if "anction" not in r.get("Plan Name", "")]
    snp = [r for r in snp if r.get("State", "").strip() == "North Carolina"]
    pdp = [r for r in read_old(find(folder, "PDP")) if r.get("State", "").strip() == "North Carolina"]
    star_col = next(k for k in ma[0] if "Star Rating" in k)
    moop_col = next(k for k in ma[0] if "MOOP" in k)
    prem_col = next(k for k in ma[0] if k.startswith("Monthly Consolidated Premium"))
    general = []
    for r in ma:
        general.append(
            {
                "county": r["County"].strip(),
                "id": (r["Contract ID"].strip(), r["Plan ID"].strip(), r["Segment ID"].strip()),
                "drugs": bool(r["Drug Benefit Type"].strip()),
                "premium": money(r[prem_col]),
                "type": r["Type of Medicare Health Plan"].replace("*", "").strip(),
                "moop": money(r[moop_col]),
                "star": star(r[star_col]),
            }
        )
    special = [{"county": r["County"].strip()} for r in snp]
    prem_col_pdp = next(k for k in pdp[0] if k.startswith("Monthly Drug Premium"))
    pdps = [money(r[prem_col_pdp]) for r in pdp]
    return general, special, pdps


def new_year(year):
    """Normalize a 2025-2027 combined file into common records."""
    path = find(os.path.join(ROOT, str(year)), f"CY{year}_Landscape")
    rows = list(csv.DictReader(open(path, encoding="utf-8-sig", errors="replace")))
    state = "State Abbreviation" if "State Abbreviation" in rows[0] else "State Territory Abbreviation"
    nc = [r for r in rows if r[state] == "NC"]
    general, special, pdps = [], [], []
    for r in nc:
        cat = r["Contract Category Type"]
        if cat == "PDP":
            pdps.append(money(r["Part D Total Premium"]))
        elif r["Special Needs Plan (SNP) Indicator"] == "Yes":
            special.append({"county": r["County Name"]})
        elif cat in ("MA", "MA-PD"):
            general.append(
                {
                    "county": r["County Name"],
                    "id": (r["Contract ID"], r["Plan ID"], r["Segment ID"]),
                    "drugs": cat == "MA-PD",
                    "premium": money(r["Monthly Consolidated Premium (Part C + D)"]),
                    "type": r["Plan Type"],
                    "moop": money(r["In-Network Maximum Out-of-Pocket (MOOP) Amount"]),
                    "star": star(r["Overall Star Rating"]),
                }
            )
    return general, special, pdps


def summarize(general, special_count):
    moops = [g["moop"] for g in general if g["moop"]]
    return {
        "plans": len(general),
        "withDrugs": sum(1 for g in general if g["drugs"]),
        "zeroPremium": sum(1 for g in general if g["drugs"] and g["premium"] == 0),
        "ppo": sum(1 for g in general if "PPO" in g["type"]),
        "hmo": sum(1 for g in general if "HMO" in g["type"]),
        "moopMedian": statistics.median(moops) if moops else None,
        "fourStarPlus": sum(1 for g in general if g["star"] is not None and g["star"] >= 4),
        "specialNeeds": special_count,
    }


counties = {}
statewide = {}
for year in YEARS:
    general, special, pdps = old_year(year) if year < 2025 else new_year(year)
    names = sorted({g["county"] for g in general} | {s["county"] for s in special})
    for c in names:
        g = [x for x in general if x["county"] == c]
        s = sum(1 for x in special if x["county"] == c)
        counties.setdefault(c, {})[str(year)] = summarize(g, s)
    unique = {}
    for g in general:
        unique.setdefault(g["id"], g)
    pdp_prem = [p for p in pdps if p is not None]
    statewide[str(year)] = {
        **summarize(list(unique.values()), len(special)),
        "countiesCovered": len(names),
        "pdpPlans": len(pdps),
        "pdpZeroPremium": sum(1 for p in pdp_prem if p == 0),
        "pdpLowestPremium": min(pdp_prem) if pdp_prem else None,
    }
    # specialNeeds statewide = county-plan rows, not unique plans; keep it per county only
    statewide[str(year)].pop("specialNeeds")

missing = [c for c, ys in counties.items() if len(ys) != len(YEARS)]
if len(counties) != 100 or missing:
    sys.exit(f"expected 100 counties with all years, got {len(counties)}; incomplete: {missing}")

data = {"years": YEARS, "statewide": statewide, "counties": dict(sorted(counties.items()))}
lines = [
    "// GENERATED by scripts/landscape/build-nc-history.py from the CMS Medicare Advantage",
    "// and Part D Landscape Source Files for CY2022 through CY2027. Do not edit by hand.",
    "// Counts only: no plan names, insurer names or plan IDs. Excludes employer plans.",
    'import type { NcHistory } from "./ncLandscapeHistoryTypes";',
    "",
    "export const NC_HISTORY: NcHistory = " + json.dumps(data, separators=(",", ":")) + ";",
    "",
]
open(OUT, "w", encoding="utf-8", newline="\n").write("\n".join(lines))
g = counties["Guilford"]
print("wrote", OUT, len(counties), "counties;", "Guilford plans", [g[str(y)]["plans"] for y in YEARS])
print("statewide unique plans", [statewide[str(y)]["plans"] for y in YEARS])
print("statewide median MOOP", [statewide[str(y)]["moopMedian"] for y in YEARS])
print("PDP lowest", [statewide[str(y)]["pdpLowestPremium"] for y in YEARS])
