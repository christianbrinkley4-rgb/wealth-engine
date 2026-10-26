import { ENGINE_BOOKING_URL } from "./lib/leadEnginePublic";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LOCATION_CONSOLIDATIONS } from "./lib/locationConsolidation";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // Separate output lets an isolated preview coexist with another local session.
  distDir:
    process.env.WEALTH_PREVIEW === "1"
      ? ".next-preview"
      : process.env.WEALTH_PREVIEW === "build"
        ? ".next-verify"
        : ".next",
  turbopack: {
    root: dirname,
  },
  experimental: { cpus: 1 },
  /**
   * Security headers. Added 2026-10-09 per security audit.
   * These protect against common web vulnerabilities.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...(process.env.VERCEL_ENV === "preview"
            ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
            : []),
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  /**
   * Short ad / habit URLs. The canonical paid pages live under the longer
   * slugs in lib/landingPages.ts; these keep a mistyped or abbreviated link
   * from 404ing into a dead end.
   */
  async redirects() {
    return [
      { source: "/book", destination: ENGINE_BOOKING_URL, permanent: true },
      ...Object.entries(LOCATION_CONSOLIDATIONS).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      { source: "/wealth/calculators", destination: "/tools", permanent: true },
      {
        source: "/lp/retirement",
        destination: "/lp/retirement-income",
        permanent: true,
      },
      // Calculator canonicalization (2026-10-08): /tools is the canonical
      // calculator system. The older /wealth/calculators versions 301 here so
      // ranking signals consolidate on one URL per calculator.
      {
        source: "/wealth/calculators/compound-interest",
        destination: "/tools/compound-interest",
        permanent: true,
      },
      {
        source: "/wealth/calculators/debt-payoff",
        destination: "/tools/debt-payoff",
        permanent: true,
      },
      {
        source: "/wealth/calculators/roth-vs-traditional",
        destination: "/tools/roth-vs-traditional",
        permanent: true,
      },
      {
        source: "/wealth/calculators/budget",
        destination: "/tools/budget",
        permanent: true,
      },
      // Page consolidation (2026-10-13): merge duplicate/cannibalizing pages.
      // /annual-enrollment (evergreen) merged into /aep (seasonal campaign page).
      { source: "/annual-enrollment", destination: "/aep", permanent: true },
      // /advantage-vs-medigap (generic) merged into the Greensboro-localized version.
      {
        source: "/advantage-vs-medigap",
        destination: "/medicare-advantage-vs-medigap-greensboro-nc",
        permanent: true,
      },
      // /medicare-supplement-plans-greensboro-nc merged into /medigap-plans-greensboro-nc
      // ("Medigap" is the higher-volume search term).
      {
        source: "/medicare-supplement-plans-greensboro-nc",
        destination: "/medigap-plans-greensboro-nc",
        permanent: true,
      },
      // Linkable asset consolidation (2026-10-13): new verified pages replace
      // older versions with projections or fewer terms.
      {
        source: "/medicare-numbers-2027",
        destination: "/medicare-costs-2027",
        permanent: true,
      },
      {
        source: "/medicare-words",
        destination: "/medicare-glossary",
        permanent: true,
      },
      {
        source: "/medicare-annual-enrollment-2026-checklist",
        destination: "/aep-checklist",
        permanent: true,
      },
      {
        source: "/medicare-plan-checklist",
        destination: "/aep-checklist",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
