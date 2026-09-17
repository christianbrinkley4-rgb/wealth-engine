import type { Metadata } from "next";

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
  return localServiceMetadata("retirement", city);
}

export default async function RetirementCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  return <LocalCityServicePage kind="retirement" slug={city} />;
}
