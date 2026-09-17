import { CareGuidePage, careGuideMetadata } from "@/app/components/CareGuidePage";

export const metadata = careGuideMetadata("long-term-care-insurance");

export default function Page() {
  return <CareGuidePage slug="long-term-care-insurance" />;
}
