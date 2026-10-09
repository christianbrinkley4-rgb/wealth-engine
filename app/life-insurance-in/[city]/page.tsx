import type { Metadata } from "next";
import { isIndexableTown } from "@/lib/triad";

import {
  LocalCityServicePage,
  localServiceMetadata,
  localServiceStaticParams,
} from "@/app/components/LocalCityServicePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return localServiceStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  return { ...localServiceMetadata("life", city), robots: { index: isIndexableTown("life-insurance", city), follow: true } };
}

export default async function LifeInsuranceCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  return <LocalCityServicePage kind="life" slug={city} />;
}
