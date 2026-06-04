"use client";

import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

type Vaccine = {
  childVaccineId: number;
  vaccineName: string;
  doseTiming: string;
  diseasePrevented: string;
  dosage: string;
  vaccinationWay: string;
  scheduledDate: string;
  takenDate: string | null;
  status: "Pending" | "Done" | "Missed";
};

type VaccinationGroup = {
  ageInMonths: number;
  ageLabel: string;
  scheduledDate: string;
  vaccines: Vaccine[];
};

type Props = {
  data: VaccinationGroup[] | null;
  onMarkTaken: (id: number) => void;
  onStatusChange: (id: number, status: "Pending" | "Missed") => void;
};

const statusStyles: Record<string, string> = {
  Done: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-600",
  Missed: "bg-red-100 text-red-600",
  Overdue: "bg-red-100 text-red-600",
  Today: "bg-blue-100 text-blue-600",
  Upcoming: "bg-yellow-100 text-yellow-600",
};

export default function VaccinationList({
  data,
  onMarkTaken,
  onStatusChange,
}: Props) {
  const { t, i18n } = useTranslation();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(i18n.language, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (!data || data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
        <p className="text-sm text-gray-400">
          {t("No vaccination data available")}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xl font-semibold mb-5">{t("Vaccination Schedule")}</p>

      <Tabs defaultValue={data[0]?.ageLabel}>
        {/* Tabs Header */}
        <TabsList className="bg-gray-100 p-2 rounded-xl mb-4 md:gap-2 flex-wrap h-auto!">
          {data.map((group) => (
            <TabsTrigger
              key={group.ageLabel}
              value={group.ageLabel}
              className="md:p-2 text-xs bg"
            >
              {t(group.ageLabel)}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tabs Content */}
        {data.map((group) => (
          <TabsContent key={group.ageLabel} value={group.ageLabel}>
            <div className="rounded-xl border border-primary bg-white overflow-hidden">
              {/* Group header */}
              <div className="flex justify-between items-center px-4 py-3 bg-[#fff0f5]">
                <div>
                  <p className="font-semibold text-sm text-[#ff3381]">
                    {t(group.ageLabel)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(group.scheduledDate)}
                  </p>
                </div>

                <span className="text-xs bg-[#ffc8dd] text-[#ff3381] px-3 py-1 rounded-full">
                  {group.vaccines?.length ?? 0} {t("vaccines")}
                </span>
              </div>

              {/* Vaccines */}
              <div className="divide-y divide-gray-100">
                {group.vaccines?.map((vaccine) => (
                  <div
                    key={vaccine.childVaccineId}
                    className="px-4 py-3 space-y-2"
                  >
                    {/* Name + status */}
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-800">
                        {vaccine.vaccineName}
                      </p>

                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          statusStyles[vaccine.status],
                        )}
                      >
                        {t(vaccine.status)}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="text-xs text-gray-500 space-y-0.5">
                      <p>
                        {vaccine.doseTiming} · {vaccine.diseasePrevented}
                      </p>
                      <p>
                        {t("Dosage")}: {vaccine.dosage}
                      </p>
                      <p className="font-semibold">{vaccine.vaccinationWay}</p>
                    </div>

                    {/* Dates */}
                    <div className="flex justify-between text-xs text-gray-400 pt-1 border-t border-gray-100">
                      <span>
                        {t("Scheduled")}: {formatDate(vaccine.scheduledDate)}
                      </span>
                      <span>
                        {vaccine.takenDate
                          ? `${t("Taken")}: ${formatDate(vaccine.takenDate)}`
                          : t("Not taken yet")}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-wrap pt-1">
                      {vaccine.status !== "Done" && (
                        <button
                          onClick={() => onMarkTaken(vaccine.childVaccineId)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-[#ff3381] text-white hover:bg-[#e02a70]"
                        >
                          {t("Mark as Taken")}
                        </button>
                      )}

                      {vaccine.status === "Done" && (
                        <select
                          defaultValue=""
                          onChange={(e) => {
                            if (e.target.value)
                              onStatusChange(
                                vaccine.childVaccineId,
                                e.target.value as "Pending" | "Missed",
                              );
                          }}
                          className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700"
                        >
                          <option value="" disabled>
                            {t("Change status")}
                          </option>
                          <option value="Pending">{t("Pending")}</option>
                          <option value="Missed">{t("Missed")}</option>
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
