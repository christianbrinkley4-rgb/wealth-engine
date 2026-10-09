import type { Metadata } from "next";
import { LocalMedicarePage } from "@/app/components/LocalMedicarePage";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help in Graham, NC | Christian Brinkley",
  },
  description:
    "Turning 65 in Graham, NC? Free Medicare help from Christian Brinkley, a licensed NC insurance agent. Call or text (919) 408-6671.",
  alternates: { canonical: "/medicare-graham-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help that covers your whole map.",
    description:
      "Free, no-pressure Medicare plan reviews for Graham and Alamance County, from a licensed agent who'll check your doctors and prescriptions first.",
    path: "/medicare-graham-nc",
  }),
};


export default function Page() { return <LocalMedicarePage townKey="graham" />; }
