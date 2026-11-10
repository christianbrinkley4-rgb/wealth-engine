/**
 * Thin local aliases retain their links through permanent redirects.
 * Destinations must be final 200 pages with no #fragment: crawlers drop the
 * fragment, and fragment targets surfaced as Search Console "Redirect error"
 * (Nov 9, 2026).
 */
export const LOCATION_CONSOLIDATIONS: Record<string, string> = {
  "/medicare-in/high-point": "/medicare-agent-high-point-nc",
  "/medicare-in/high-point-nc": "/medicare-agent-high-point-nc",
  "/medicare-in/winston-salem": "/medicare-agent-winston-salem-nc",
  "/medicare-in/winston-salem-nc": "/medicare-agent-winston-salem-nc",
  "/medicare-in/burlington": "/medicare-agent-burlington-nc",
  "/medicare-in/burlington-nc": "/medicare-agent-burlington-nc",
  "/medicare-in/kernersville": "/medicare-agent-kernersville-nc",
  "/medicare-in/summerfield": "/medicare-nc-towns",
  "/medicare-in/jamestown": "/medicare-nc-towns",
  "/medicare-in/oak-ridge": "/medicare-nc-towns",
  "/medicare-in/archdale": "/medicare-nc-towns",
  "/medicare-in/thomasville": "/medicare-agent-thomasville-nc",
  "/medicare-in/pleasant-garden": "/medicare-nc-towns",
  "/medicare-in/whitsett": "/medicare-nc-towns",
  "/medicare-in/mcleansville": "/medicare-nc-towns",
  "/medicare-in/browns-summit": "/medicare-nc-towns",
  "/medicare-in/gibsonville": "/medicare-nc-towns",
  "/medicare-in/elon": "/medicare-nc-towns",
  "/medicare-in/stokesdale": "/medicare-nc-towns",
  "/medicare-in/colfax": "/medicare-nc-towns",
  "/medicare-in/reidsville": "/medicare-agent-reidsville-nc",
  "/medicare-in/randleman": "/medicare-nc-towns",
  // Oxford's short URL aliases the agent page. Creedmoor keeps both pages.
  "/medicare-oxford-nc": "/medicare-agent-oxford-nc",
  "/medicare-madison-nc": "/medicare-nc-towns",
  "/medicare-graham-nc": "/medicare-nc-towns",
  "/medicare-mebane-nc": "/medicare-nc-towns",
  "/medicare-liberty-nc": "/medicare-nc-towns",
  "/medicare-ramseur-nc": "/medicare-nc-towns",
  "/medicare-roxboro-nc": "/medicare-nc-towns",
  "/medicare-in/greensboro": "/medicare-agent-greensboro-nc",
  "/medicare-in/greensboro-nc": "/medicare-agent-greensboro-nc",
};

export function canonicalMedicareLocation(path: string): string {
  return LOCATION_CONSOLIDATIONS[path] ?? path;
}
