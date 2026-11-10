/** Thin local aliases retain their links through permanent redirects. */
export const LOCATION_CONSOLIDATIONS: Record<string, string> = {
  "/medicare-in/high-point": "/medicare-agent-high-point-nc",
  "/medicare-in/high-point-nc": "/medicare-agent-high-point-nc",
  "/medicare-in/winston-salem": "/medicare-agent-winston-salem-nc",
  "/medicare-in/winston-salem-nc": "/medicare-agent-winston-salem-nc",
  "/medicare-in/burlington": "/medicare-agent-burlington-nc",
  "/medicare-in/burlington-nc": "/medicare-agent-burlington-nc",
  "/medicare-in/kernersville": "/medicare-agent-kernersville-nc",
  "/medicare-in/summerfield": "/medicare-nc-towns#guilford-county",
  "/medicare-in/jamestown": "/medicare-nc-towns#guilford-county",
  "/medicare-in/oak-ridge": "/medicare-nc-towns#guilford-county",
  "/medicare-in/archdale": "/medicare-nc-towns#randolph-county",
  "/medicare-in/thomasville": "/medicare-nc-towns#davidson-county",
  "/medicare-in/pleasant-garden": "/medicare-nc-towns#guilford-county",
  "/medicare-in/whitsett": "/medicare-nc-towns#guilford-county",
  "/medicare-in/mcleansville": "/medicare-nc-towns#guilford-county",
  "/medicare-in/browns-summit": "/medicare-nc-towns#guilford-county",
  "/medicare-in/gibsonville": "/medicare-nc-towns#alamance-county",
  "/medicare-in/elon": "/medicare-nc-towns#alamance-county",
  "/medicare-in/stokesdale": "/medicare-nc-towns#guilford-county",
  "/medicare-in/colfax": "/medicare-nc-towns#guilford-county",
  "/medicare-in/reidsville": "/medicare-agent-reidsville-nc",
  "/medicare-in/randleman": "/medicare-nc-towns#randolph-county",
  // Keep the restored local service page as the single destination for overlapping aliases.
  "/medicare-creedmoor-nc": "/medicare-agent-creedmoor-nc",
  "/medicare-oxford-nc": "/medicare-agent-oxford-nc",
  "/medicare-madison-nc": "/medicare-nc-towns#rockingham-county",
  "/medicare-graham-nc": "/medicare-nc-towns#alamance-county",
  "/medicare-mebane-nc": "/medicare-nc-towns#alamance-county",
  "/medicare-liberty-nc": "/medicare-nc-towns#randolph-county",
  "/medicare-ramseur-nc": "/medicare-nc-towns#randolph-county",
  "/medicare-roxboro-nc": "/medicare-nc-towns#person-county",
  "/medicare-in/greensboro": "/medicare-agent-greensboro-nc",
  "/medicare-in/greensboro-nc": "/medicare-agent-greensboro-nc",
};

export function canonicalMedicareLocation(path: string): string {
  return LOCATION_CONSOLIDATIONS[path] ?? path;
}
