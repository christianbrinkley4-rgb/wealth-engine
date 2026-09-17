import { CareGuidePage, careGuideMetadata } from "@/app/components/CareGuidePage";

export const metadata = careGuideMetadata("critical-illness-insurance");

export default function Page() {
  return <CareGuidePage slug="critical-illness-insurance" />;
}
