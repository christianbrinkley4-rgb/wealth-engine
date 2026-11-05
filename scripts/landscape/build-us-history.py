"""Build the national Medicare Advantage landscape history, 2022-2027.

Usage:
  python -I scripts/landscape/build-us-history.py <landscape-root> public/data/us-medicare

Same inputs, definitions and parsing rules as build-nc-history.py, run for
every state plus DC and Puerto Rico. Writes one JSON file per state
(<ST>.json) and index.json with the statewide rows for every state, so pages
can load a single state without shipping the whole country to the browser.

The North Carolina output is checked against lib/ncLandscapeHistory.ts by
lib/__tests__/us-medicare-index.test.ts.
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
SKIP = {"AS", "GU", "MP", "VI"}  # tiny territories with few or no MA plans


def money(s):
    s = (s or "").strip().replace("$", "").replace(",", "").replace("*", "").strip()
    if s == "-":  # Excel accounting zero in the 2022-2023 files
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


def files(folder, *needles):
    out = []
    for dirpath, _, names in os.walk(folder):
        for f in sorted(names):
            if f.lower().endswith(".csv") and all(n in f for n in needles) and "anction" not in f:
                out.append(os.path.join(dirpath, f))
    if not out:
        raise FileNotFoundError(f"{folder}: {needles}")
    return out


def state_names():
    path = files(os.path.join(ROOT, "2025"), "CY2025_Landscape")[0]
    names = {}
    for r in csv.DictReader(open(path, encoding="utf-8-sig", errors="replace")):
        names[r["State Name"]] = r["State Abbreviation"]
    return names


NAME_TO_ABBR = state_names()


def old_year(year):
    folder = os.path.join(ROOT, str(year))
    ma = []
    for f in files(folder, "MA_") if year < 2024 else files(folder, "Landscape_MA_2"):
        ma += read_old(f)
    snp = []
    for f in files(folder, "SNP"):
        snp += read_old(f)
    pdp = []
    for f in files(folder, "PDP"):
        pdp += read_old(f)
    star_col = next(k for k in ma[0] if "Star Rating" in k)
    moop_col = next(k for k in ma[0] if "MOOP" in k)
    prem_col = next(k for k in ma[0] if k.startswith("Monthly Consolidated Premium"))
    general = []
    for r in ma:
        st = NAME_TO_ABBR.get(r.get("State", "").strip())
        if not st:
            continue
        general.append(
            {
                "state": st,
                "county": r["County"].strip(),
                "id": (r["Contract ID"].strip(), r["Plan ID"].strip(), r["Segment ID"].strip()),
                "drugs": bool(r["Drug Benefit Type"].strip()),
                "premium": money(r[prem_col]),
                "type": r["Type of Medicare Health Plan"].replace("*", "").strip(),
                "moop": money(r[moop_col]),
                "star": star(r[star_col]),
            }
        )
    special = []
    for r in snp:
        st = NAME_TO_ABBR.get(r.get("State", "").strip())
        if st:
            special.append({"state": st, "county": r["County"].strip()})
    prem_col_pdp = next(k for k in pdp[0] if k.startswith("Monthly Drug Premium"))
    pdps = []
    for r in pdp:
        st = NAME_TO_ABBR.get(r.get("State", "").strip())
        if st:
            pdps.append({"state": st, "premium": money(r[prem_col_pdp])})
    return general, special, pdps


def new_year(year):
    path = files(os.path.join(ROOT, str(year)), f"CY{year}_Landscape")[0]
    rows = list(csv.DictReader(open(path, encoding="utf-8-sig", errors="replace")))
    state = "State Abbreviation" if "State Abbreviation" in rows[0] else "State Territory Abbreviation"
    general, special, pdps = [], [], []
    for r in rows:
        st = r[state]
        cat = r["Contract Category Type"]
        if cat == "PDP":
            pdps.append({"state": st, "premium": money(r["Part D Total Premium"])})
        elif r["Special Needs Plan (SNP) Indicator"] == "Yes":
            special.append({"state": st, "county": r["County Name"]})
        elif cat in ("MA", "MA-PD"):
            general.append(
                {
                    "state": st,
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


def summarize(general, special_count=None):
    moops = [g["moop"] for g in general if g["moop"]]
    out = {
        "plans": len(general),
        "withDrugs": sum(1 for g in general if g["drugs"]),
        "zeroPremium": sum(1 for g in general if g["drugs"] and g["premium"] == 0),
        "ppo": sum(1 for g in general if "PPO" in g["type"]),
        "hmo": sum(1 for g in general if "HMO" in g["type"]),
        "moopMedian": statistics.median(moops) if moops else None,
        "fourStarPlus": sum(1 for g in general if g["star"] is not None and g["star"] >= 4),
    }
    if special_count is not None:
        out["specialNeeds"] = special_count
    return out


by_state = {}
for year in YEARS:
    general, special, pdps = old_year(year) if year < 2025 else new_year(year)
    states = sorted({g["state"] for g in general} | {p["state"] for p in pdps})
    for st in states:
        if st in SKIP or st not in NAME_TO_ABBR.values():
            continue
        g_st = [g for g in general if g["state"] == st]
        s_st = [s for s in special if s["state"] == st]
        p_st = [p["premium"] for p in pdps if p["state"] == st]
        rec = by_state.setdefault(st, {"counties": {}, "statewide": {}})
        names = sorted({g["county"] for g in g_st} | {s["county"] for s in s_st})
        for c in names:
            rec["counties"].setdefault(c, {})[str(year)] = summarize(
                [g for g in g_st if g["county"] == c], sum(1 for s in s_st if s["county"] == c)
            )
        unique = {}
        for g in g_st:
            unique.setdefault(g["id"], g)
        prem = [p for p in p_st if p is not None]
        rec["statewide"][str(year)] = {
            **summarize(list(unique.values())),
            "countiesCovered": len({g["county"] for g in g_st}),
            "pdpPlans": len(p_st),
            "pdpZeroPremium": sum(1 for p in prem if p == 0),
            "pdpLowestPremium": min(prem) if prem else None,
        }

# A county missing from a year the state does report had no plans that year
# (common in rural counties). Record that as zero. Years a state is absent
# from the file entirely (DC in 2022-2023) stay missing and show as "not reported".
ZERO = {"plans": 0, "withDrugs": 0, "zeroPremium": 0, "ppo": 0, "hmo": 0, "moopMedian": None, "fourStarPlus": 0, "specialNeeds": 0}
for rec in by_state.values():
    for c, ys in rec["counties"].items():
        for y in rec["statewide"]:
            ys.setdefault(y, dict(ZERO))
        rec["counties"][c] = dict(sorted(ys.items()))

abbr_to_name = {v: k for k, v in NAME_TO_ABBR.items()}
os.makedirs(OUT, exist_ok=True)
index = {"years": YEARS, "states": {}}
for st, rec in sorted(by_state.items()):
    data = {"state": st, "name": abbr_to_name[st], "years": YEARS, **rec}
    data["counties"] = dict(sorted(rec["counties"].items()))
    with open(os.path.join(OUT, f"{st}.json"), "w", encoding="utf-8", newline="\n") as fh:
        json.dump(data, fh, separators=(",", ":"))
    index["states"][st] = {"name": abbr_to_name[st], "counties": len(rec["counties"]), "statewide": rec["statewide"]}
with open(os.path.join(OUT, "index.json"), "w", encoding="utf-8", newline="\n") as fh:
    json.dump(index, fh, separators=(",", ":"))

gaps = [st for st, rec in by_state.items() if len(rec["statewide"]) != len(YEARS)]
print("states:", len(by_state), "missing years:", gaps)
for st in ("NC", "FL", "TX", "CA", "AK"):
    if st in by_state:
        s = by_state[st]["statewide"]
        print(st, [s.get(str(y), {}).get("plans") for y in YEARS], [s.get(str(y), {}).get("moopMedian") for y in YEARS])
