"use client";

import { useTranslation } from "react-i18next";

type Vaccine = {
  childVaccineId: number;
  status: "Pending" | "Done" | "Missed";
};

type VaccinationGroup = {
  vaccines: Vaccine[];
};

export default function VaccinationProgress({
  data,
}: {
  data: VaccinationGroup[] | null;
}) {
  const { t } = useTranslation();

  // بنجمع كل التطعيمات في Array واحدة
  const allVaccines = data?.flatMap((group) => group.vaccines) || [];

  if (allVaccines.length === 0) return null; // لو مفيش داتا مفيش داعي نظهر حاجة

  const doneCount = allVaccines.filter((v) => v.status === "Done").length;
  const total = allVaccines.length;
  const percentage = Math.round((doneCount / total) * 100);

  // لون الخط والبار حسب النسبة
  const getAccentColor = () => {
    if (percentage === 100) return "text-green-500 bg-green-500";
    if (percentage > 50) return "text-[#ff3381] bg-[#ff3381]";
    return "text-yellow-500 bg-yellow-500";
  };

  const accentColorClass = getAccentColor().split(" ")[0]; // للحصول على الـ text color
  const bgColorClass = getAccentColor().split(" ")[1];    // للحصول على الـ bg color

  return (
    <div className="w-full space-y-3 py-2">
      {/* HEADER: Label + Percentage */}
      <div className="flex justify-between items-end">
        <div className="space-y-0.5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            {t("Overall Progress")}
          </p>
          <h3 className="text-xl font-bold text-gray-800">
            {percentage}% <span className="text-sm font-normal text-gray-400">{t("Completed")}</span>
          </h3>
        </div>
        
        <div className="text-right">
          <span className={`text-sm font-bold ${accentColorClass}`}>
            {doneCount}
          </span>
          <span className="text-sm text-gray-400 font-medium"> / {total} {t("Vaccines")}</span>
        </div>
      </div>

      {/* PROGRESS BAR: Sleek & Animated */}
      <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${bgColorClass} transition-all duration-700 ease-out rounded-full shadow-sm`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* FOOTER: Context Message */}
      <div className="flex items-center gap-1.5">
        {percentage === 100 ? (
          <>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-green-600 uppercase tracking-tight">
              {t("Fully Protected")}
            </span>
          </>
        ) : (
          <>
            <div className={`w-1.5 h-1.5 rounded-full ${bgColorClass}`} />
            <span className="text-xs font-medium text-gray-500">
              {total - doneCount} {t("vaccinations remaining to reach full protection")}
            </span>
          </>
        )}
      </div>
    </div>
  );
}