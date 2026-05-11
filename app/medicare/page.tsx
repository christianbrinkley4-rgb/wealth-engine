import { MedicareWizard } from "@/app/medicare/MedicareWizard";

/** Medicare flow: 4 questionnaire steps (?step=1–4) plus results (?step=5); see useWizardStep(5) in MedicareWizard. */

export default function MedicarePage() {
  return <MedicareWizard />;
}
