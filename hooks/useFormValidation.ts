export function useFormValidation() {
  const validateZip = (value: string) => {
    if (!/^\d{5}$/.test(value.trim())) {
      return "Just need a real 5-digit ZIP code.";
    }
    return null;
  };

  const validateAge = (value: number) => {
    if (!Number.isInteger(value) || value < 55 || value > 85) {
      return "Age should land between 55 and 85 for this Medicare estimate.";
    }
    return null;
  };

  const validateIncome = (value: number) => {
    if (!Number.isFinite(value) || value <= 0) {
      return "Use a real annual income so the Medicare math comes out right.";
    }
    return null;
  };

  return { validateZip, validateAge, validateIncome };
}
