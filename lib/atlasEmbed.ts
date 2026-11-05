/**
 * NC Medicare Atlas: the embeddable county widget.
 *
 * Other sites (libraries, churches, senior centers, local news) paste an
 * iframe pointing at /embed/county-medicare plus a plain credit link. The
 * iframe is a tiny standalone HTML page built here, so it carries none of the
 * site's header, footer, analytics or sticky call bar.
 *
 * Rules carried over from /medicare-2027-by-county:
 * - Counts only. Never plan names, insurer names or plan IDs.
 * - No "ending" counts: the Landscape file can't tell an ended plan from a
 *   renumbered one.
 * - TPMO disclaimer and a pointer to Medicare.gov / 1-800-MEDICARE and SHIIP,
 *   so a neutral host (a library) is comfortable showing it.
 *
 * Data: lib/ncLandscape2027.ts (CMS CY2027 and CY2026 Landscape files).
 */

import { TPMO_DISCLAIMER } from "@/lib/agent";
import { NC_LANDSCAPE } from "@/lib/ncLandscape2027";
import { describeCounty, formatDollars } from "@/lib/ncLandscapeCopy";

export const ATLAS_EMBED_PATH = "/embed/county-medicare";
export const ATLAS_PAGE_PATH = "/nc-medicare-atlas";
export const SITE_ORIGIN = "https://christianbrinkleync.com";
export const ATLAS_DEFAULT_COUNTY = "Guilford";
/**
 * Default iframe height. The tallest county needs about 985px on a 320px
 * phone, so nothing is ever cut off. Where the host allows scripts, the
 * optional resize snippet below shrinks it to fit (about 670px on desktop).
 */
export const ATLAS_IFRAME_HEIGHT = 1000;
/** postMessage type the widget sends with its height. */
export const ATLAS_HEIGHT_MESSAGE = "nc-medicare-atlas-height";

const TRACK = "utm_source=atlas_embed&utm_medium=referral&utm_campaign=nc_medicare_atlas";

export const ATLAS_COUNTIES: readonly string[] = Object.keys(NC_LANDSCAPE.counties).sort();

export interface AtlasRow {
  label: string;
  y2026: string;
  y2027: string;
}

export interface AtlasCounty {
  summary: string;
  rows: AtlasRow[];
  specialNeeds: number;
}

export function atlasCounty(name: string): AtlasCounty | null {
  const data = NC_LANDSCAPE.counties[name];
  if (!data) return null;
  const a = data.y2026;
  const b = data.y2027;
  return {
    summary: describeCounty(name, data),
    specialNeeds: b.specialNeeds,
    rows: [
      { label: "Medicare Advantage plans", y2026: String(a.plans), y2027: String(b.plans) },
      {
        label: "With drug coverage and a $0 plan premium",
        y2026: String(a.zeroPremium),
        y2027: String(b.zeroPremium),
      },
      { label: "PPO plans", y2026: String(a.ppo), y2027: String(b.ppo) },
      { label: "HMO plans", y2026: String(a.hmo), y2027: String(b.hmo) },
      {
        label: "Rated 4 stars or higher",
        y2026: String(a.fourStarPlus),
        y2027: String(b.fourStarPlus),
      },
      {
        label: "Insurance companies offering plans",
        y2026: String(a.insurers),
        y2027: String(b.insurers),
      },
      {
        label: "Typical in-network out-of-pocket max",
        y2026: formatDollars(a.moopMedian),
        y2027: formatDollars(b.moopMedian),
      },
    ],
  };
}

/** A valid county name from a query value, or the default. */
export function pickCounty(value: string | null | undefined): string {
  if (!value) return ATLAS_DEFAULT_COUNTY;
  const wanted = value.trim().toLowerCase();
  return ATLAS_COUNTIES.find((c) => c.toLowerCase() === wanted) ?? ATLAS_DEFAULT_COUNTY;
}

/** The snippet a partner pastes. Plain HTML so the credit link is a real link on their page. */
export function atlasEmbedCode(county: string = ATLAS_DEFAULT_COUNTY): string {
  const src = `${SITE_ORIGIN}${ATLAS_EMBED_PATH}${county === ATLAS_DEFAULT_COUNTY ? "" : `?county=${encodeURIComponent(county)}`}`;
  return [
    `<iframe src="${src}" title="2027 Medicare Advantage changes by North Carolina county" width="100%" height="${ATLAS_IFRAME_HEIGHT}" style="border:0;max-width:640px" loading="lazy"></iframe>`,
    `<p style="font-size:14px">NC Medicare Atlas by <a href="${SITE_ORIGIN}${ATLAS_PAGE_PATH}">Christian Brinkley, Greensboro</a>. Data from CMS.</p>`,
    atlasResizeScript(),
  ].join("\n");
}

/**
 * Optional: fits the iframe to its content. Only trusts messages from the
 * site's own origin, and only resizes iframes that point at the widget. If a
 * host strips scripts, the fixed default height still shows everything.
 */
export function atlasResizeScript(): string {
  return `<script>window.addEventListener("message",function(e){if(e.origin!=="${SITE_ORIGIN}"||!e.data||e.data.type!=="${ATLAS_HEIGHT_MESSAGE}")return;var h=Math.min(Math.max(+e.data.height||0,400),1400);document.querySelectorAll('iframe[src^="${SITE_ORIGIN}${ATLAS_EMBED_PATH}"]').forEach(function(f){if(f.contentWindow===e.source)f.style.height=h+"px";});});</script>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** JSON safe to drop inside a <script> tag. */
function scriptJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function rowsHtml(c: AtlasCounty): string {
  return c.rows
    .map(
      (r) =>
        `<div class="row"><dt>${escapeHtml(r.label)}</dt><dd><span class="old">${escapeHtml(r.y2026)}</span><span aria-hidden="true"> &rarr; </span><span class="sr"> in 2026, </span><strong>${escapeHtml(r.y2027)}</strong><span class="sr"> in 2027</span></dd></div>`,
    )
    .join("");
}

/** The full standalone HTML document served inside the iframe. */
export function renderAtlasEmbed(county: string): string {
  const name = pickCounty(county);
  const all: Record<string, AtlasCounty> = {};
  for (const c of ATLAS_COUNTIES) {
    const entry = atlasCounty(c);
    if (entry) all[c] = entry;
  }
  const first = all[name];
  const options = ATLAS_COUNTIES.map(
    (c) =>
      `<option value="${escapeHtml(c)}"${c === name ? " selected" : ""}>${escapeHtml(c)} County</option>`,
  ).join("");
  const updated = NC_LANDSCAPE.dataUpdated;
  const learnMore = `${SITE_ORIGIN}/medicare-2027-by-county?${TRACK}`;
  const home = `${SITE_ORIGIN}/?${TRACK}`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>2027 Medicare Advantage changes by NC county</title>
<style>
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#13233f;background:#fff;font-size:17px;line-height:1.35}
.wrap{max-width:640px;margin:0 auto;padding:14px;border:2px solid #13233f;border-radius:12px}
h1{font-size:20px;line-height:1.2;margin:0 0 4px}
.sub{margin:0 0 12px;color:#45526b;font-size:15px}
label{display:block;font-weight:600;margin:0 0 6px}
select{width:100%;font-size:18px;padding:10px;border:2px solid #13233f;border-radius:8px;background:#fff;color:#13233f}
.sum{margin:12px 0 8px;font-size:16px}
dl{margin:0}
.row{display:flex;justify-content:space-between;gap:12px;padding:6px 0;border-top:1px solid #d9dee7}
dt{flex:1 1 auto}
dd{margin:0;white-space:nowrap;text-align:right}
.old{color:#6b7689}
strong{font-weight:700}
.note,.fine{font-size:12px;line-height:1.4;color:#45526b;margin:8px 0 0}
.credit{font-size:14px;margin:12px 0 0}
a{color:#0b4f9c}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
</style>
</head>
<body>
<div class="wrap">
<h1>What changed in Medicare Advantage for 2027?</h1>
<p class="sub">Every North Carolina county, 2026 vs. 2027, from CMS data.</p>
<label for="c">Choose your county</label>
<select id="c">${options}</select>
<div aria-live="polite">
<p class="sum" id="s">${escapeHtml(first.summary)}</p>
<dl id="r">${rowsHtml(first)}</dl>
<p class="note" id="n">Counts leave out Special Needs Plans (<span id="snp">${first.specialNeeds}</span> in this county for 2027) and employer plans. &ldquo;Typical&rdquo; is the median. These counts can&rsquo;t tell you whether your own plan continues; your Annual Notice of Change says that.</p>
</div>
<p class="credit">Free tool by <a href="${home}" target="_blank" rel="noopener">Christian Brinkley</a>, a licensed insurance agent in Greensboro. <a href="${learnMore}" target="_blank" rel="noopener">More detail</a>.</p>
<p class="fine">Source: CMS CY2027 and CY2026 Medicare Advantage Landscape files (updated ${escapeHtml(updated)}). Not connected with or endorsed by the U.S. government or the federal Medicare program. For free, unbiased help, call NC SHIIP or 1-800-MEDICARE. ${escapeHtml(TPMO_DISCLAIMER)}</p>
</div>
<script>
(function(){
var D=${scriptJson(all)};
var sel=document.getElementById("c");
function esc(t){return String(t).replace(/[&<>"]/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;"}[ch];});}
function show(name){
var c=D[name]; if(!c) return;
document.getElementById("s").textContent=c.summary;
document.getElementById("snp").textContent=c.specialNeeds;
document.getElementById("r").innerHTML=c.rows.map(function(r){
return '<div class="row"><dt>'+esc(r.label)+'</dt><dd><span class="old">'+esc(r.y2026)+'</span><span aria-hidden="true"> &rarr; </span><span class="sr"> in 2026, </span><strong>'+esc(r.y2027)+'</strong><span class="sr"> in 2027</span></dd></div>';
}).join("");
}
function report(){try{var h=Math.ceil(document.querySelector(".wrap").getBoundingClientRect().height)+4;if(window.parent!==window)window.parent.postMessage({type:"${ATLAS_HEIGHT_MESSAGE}",height:h},"*");}catch(e){}}
sel.addEventListener("change",function(){show(sel.value);report();});
window.addEventListener("load",report);
setTimeout(report,400);setTimeout(report,1500);
if(window.ResizeObserver)new ResizeObserver(report).observe(document.querySelector(".wrap"));
window.addEventListener("resize",report);
})();
</script>
</body>
</html>`;
}
