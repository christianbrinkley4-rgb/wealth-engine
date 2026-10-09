import type { Metadata } from "next";
import { LocalMedicarePage } from "@/app/components/LocalMedicarePage";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help in Ramseur, NC | Christian Brinkley",
  },
  description:
    "Turning 65 in Ramseur, NC? Free Medicare help from Christian Brinkley, a licensed NC insurance agent. Call or text (919) 408-6671.",
  alternates: { canonical: "/medicare-ramseur-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help close to home in Ramseur.",
    description:
      "Free, no-pressure Medicare plan reviews for Ramseur and Randolph County, from a licensed agent who'll check your doctors and prescriptions first.",
    path: "/medicare-ramseur-nc",
  }),
};


export default function Page() { return <LocalMedicarePage townKey="ramseur" />; }
