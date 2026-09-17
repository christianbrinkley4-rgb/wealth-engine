import { CareGuidePage, careGuideMetadata } from "@/app/components/CareGuidePage";

export const metadata = careGuideMetadata("short-term-care-insurance");

export default function Page() {
  return <CareGuidePage slug="short-term-care-insurance" />;
}
