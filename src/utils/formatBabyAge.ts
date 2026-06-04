import i18next from "i18next";

export default function formatBabyAge({
  ageInDays,
  ageInMonths,
}: {
  ageInDays: number;
  ageInMonths: number;
}) {
  // أقل من شهر → باليوم
  if (ageInMonths === 0) {
    return i18next.t("{{count}} day", { count: ageInDays, defaultValue_other: "{{count}} days" });
  }

  // أقل من سنة → بالشهور
  if (ageInMonths < 12) {
    return i18next.t("{{count}} month", { count: ageInMonths, defaultValue_other: "{{count}} months" });
  }

  // سنة أو أكتر
  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;

  if (months === 0) {
    return i18next.t("{{count}} year", { count: years, defaultValue_other: "{{count}} years" });
  }

  // دمج السنوات والشهور بشكل مرن بالاعتماد على النصوص الإنجليزية كـ مفاتيح وفول باك
  const yearsStr = i18next.t("{{count}} year", { count: years, defaultValue_other: "{{count}} years" });
  const monthsStr = i18next.t("{{count}} month", { count: months, defaultValue_other: "{{count}} months" });

  return `${yearsStr} ${monthsStr}`;
}