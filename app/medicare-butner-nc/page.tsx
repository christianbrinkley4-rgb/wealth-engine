import type { Metadata } from "next";
import { LocalMedicarePage } from "@/app/components/LocalMedicarePage";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help in Butner, NC | Christian Brinkley",
  },
  description:
    "Turning 65 in Butner, NC? Free Medicare help from Christian Brinkley, licensed NC agent and your neighbor in Creedmoor. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-butner-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help from a neighbor, not a call center.",
    description:
      "Free, no-pressure Medicare plan reviews for Butner and Granville County, from a licensed agent who lives just up the road in Creedmoor.",
    path: "/medicare-butner-nc",
  }),
};


export default function Page() { return <LocalMedicarePage townKey="butner" />; }
