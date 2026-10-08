"use client";

import dynamic from "next/dynamic";

// Cal.com embed is 141KB and only needed when the user reaches the calendar.
// Lazy-load it client-side so it never blocks the initial page render.
// (next/dynamic with ssr:false must live in a Client Component, not in page.tsx.)
export const CalEmbedLazy = dynamic(
  () => import("@/components/CalEmbed").then((mod) => mod.CalEmbed),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[700px] items-center justify-center">
        <div className="animate-pulse text-(--slate-dim)">Loading calendar...</div>
      </div>
    ),
  },
);
