"use client";

import { useTranslation } from "react-i18next";

type Vaccine = {
  childVaccineId: number;
  vaccineName: string;
  doseTiming: string;
  diseasePrevented: string;
  dosage: string;
  scheduledDate: string;
  takenDate: string | null;
  status: "Pending" | "Done" | "Missed";
};

type VaccinationGroup = {
  ageLabel: string;
  scheduledDate: string;
  vaccines: Vaccine[];
};

type Props = {
  data: VaccinationGroup[] | null;
  onMarkTaken: (id: number) => void;
};

const DAYS_AHEAD = 30;

export default function UpcomingTimeline({
  data,
  onMarkTaken,
}: Props) {
  const { t, i18n } = useTranslation();
  const today = new Date();
  const cutoff = new Date();
  cutoff.setDate(today.getDate() + DAYS_AHEAD);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(i18n.language, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const getDaysUntil = (date: string) => {
    const todayZero = new Date();
    todayZero.setHours(0, 0, 0, 0);
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    return Math.ceil(
      (target.getTime() - todayZero.getTime()) / (1000 * 60 * 60 * 24),
    );
  };

  // filter groups that have pending vaccines in the next 30 days
  const upcomingGroups = (data ?? [])
    .map((group) => ({
      ...group,
      vaccines: group.vaccines.filter((v) => {
        const d = new Date(v.scheduledDate);
        return v.status === "Pending" && d >= today && d <= cutoff;
      }),
    }))
    .filter((group) => group.vaccines.length > 0);

  if (upcomingGroups.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
        <p className="text-sm text-gray-400">
          {t("No upcoming vaccinations in the next 30 days")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-[#ff3381] uppercase tracking-wide">
        {t("Next 30 Days")}
      </p>

      {/* Timeline */}
      <div className="relative pl-6">
        {/* vertical line */}
        <div className="absolute left-2 top-2 bottom-2 w-px bg-[#ffc8dd]" />

        <div className="space-y-6">
          {upcomingGroups.map((group, gi) => {
            const daysUntil = getDaysUntil(group.scheduledDate);

            return (
              <div key={gi} className="relative">
                {/* dot */}
                <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 rounded-full bg-[#ff3381] border-2 border-white" />

                <div className="space-y-2">
                  {/* group header */}
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-700">
                      {group.ageLabel}
                    </p>
                    <span className="text-xs text-gray-400">
                      {formatDate(group.scheduledDate)}
                    </span>
                    <span className="ml-auto text-xs bg-[#ffc8dd] text-[#ff3381] px-2 py-0.5 rounded-full">
                      {daysUntil === 0
                        ? t("Today")
                        : daysUntil === 1
                          ? t("Tomorrow")
                          : t("In {{count}} days", { count: daysUntil })}
                    </span>
                  </div>

                  {/* vaccines */}
                  {group.vaccines.map((vaccine) => (
                    <div
                      key={vaccine.childVaccineId}
                      className="rounded-xl border border-gray-200 bg-white p-3 space-y-2"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {vaccine.vaccineName}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {vaccine.doseTiming} · {vaccine.diseasePrevented}
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-600 whitespace-nowrap">
                          {t(vaccine.status)}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400">
                        {t("Dosage")}: {vaccine.dosage}
                      </p>

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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}