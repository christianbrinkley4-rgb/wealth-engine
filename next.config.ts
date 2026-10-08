import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
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
   * Short ad / habit URLs. The canonical paid pages live under the longer
   * slugs in lib/landingPages.ts; these keep a mistyped or abbreviated link
   * from 404ing into a dead end.
   */
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
