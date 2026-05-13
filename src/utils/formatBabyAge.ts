export default function formatBabyAge({
  ageInDays,
  ageInMonths,
}: {
  ageInDays: number;
  ageInMonths: number;
}) {
  // أقل من شهر → باليوم
  if (ageInMonths === 0) {
    return `${ageInDays} day${ageInDays !== 1 ? "s" : ""}`;
  }

  // أقل من سنة → بالشهور
  if (ageInMonths < 12) {
    return `${ageInMonths} month${ageInMonths !== 1 ? "s" : ""}`;
  }

  // سنة أو أكتر
  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;

  if (months === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }

  return `${years} year${years !== 1 ? "s" : ""} ${months} month${
    months !== 1 ? "s" : ""
  }`;
}