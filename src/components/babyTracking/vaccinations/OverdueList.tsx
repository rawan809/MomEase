"use client";

import { useTranslation } from "react-i18next";

type Vaccine = {
  childVaccineId: number;
  vaccineName: string;
  doseTiming: string;
  diseasePrevented: string;
  dosage: string;
  scheduledDate: string;
  status: "Pending" | "Done" | "Missed";
};

type Props = {
  data: Vaccine[] | null;
  onMarkTaken: (id: number) => void;
};

export default function OverdueList({
  data,
  onMarkTaken,
}: Props) {
  const { t, i18n } = useTranslation();

  // تحويل التاريخ ليعتمد على لغة التطبيق الحالية
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(i18n.language, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (!data || data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
        <p className="text-sm text-gray-400">{t("No overdue vaccinations")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-red-500 uppercase tracking-wide">
        {t("Overdue")} ({data.length})
      </p>

      {data.map((vaccine) => (
        <div
          key={vaccine.childVaccineId}
          className="rounded-xl border border-red-200 bg-red-50 p-4 space-y-3"
        >
          {/* Top row */}
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="font-semibold text-sm text-gray-800">
                {vaccine.vaccineName}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {vaccine.doseTiming} · {vaccine.diseasePrevented}
              </p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600 whitespace-nowrap">
              {t(vaccine.status)}
            </span>
          </div>

          {/* Info row */}
          <div className="text-xs text-gray-500 flex justify-between">
            <span>{t("Dosage")}: {vaccine.dosage}</span>
            <span>{t("Was due")}: {formatDate(vaccine.scheduledDate)}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1 flex-wrap">
            <button
              onClick={() => onMarkTaken(vaccine.childVaccineId)}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#ff3381] text-white hover:bg-[#e02a70] transition-colors"
            >
              {t("Mark as Taken")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}