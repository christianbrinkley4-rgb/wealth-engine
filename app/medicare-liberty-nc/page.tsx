import type { Metadata } from "next";
import { LocalMedicarePage } from "@/app/components/LocalMedicarePage";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help in Liberty, NC | Christian Brinkley",
  },
  description:
    "Turning 65 in Liberty, NC? Free Medicare help from Christian Brinkley, a licensed NC insurance agent. Call or text (919) 408-6671.",
  alternates: { canonical: "/medicare-liberty-nc" },
  openGraph: pageOpenGraph({
    title: "Small-town Medicare help, straight answers.",
    description:
      "Free, no-pressure Medicare plan reviews for Liberty and Randolph County, from a licensed agent who'll check your doctors and prescriptions first.",
    path: "/medicare-liberty-nc",
  }),
};


export default function Page() { return <LocalMedicarePage townKey="liberty" />; }
