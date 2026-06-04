"use client";

import VaccinationList from "./VaccinationList";
import { useChild } from "@/contexts/ChildContext";
import { useVaccination } from "@/hooks/useVaccine";
import VaccinationProgress from "./VaccinationProgress";
import OverdueList from "./OverdueList";
import UpcomingTimeline from "./UpcomingTimeline";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import LoadingState from "../../../components/ui/LoadingState";

type Vaccine = {
  childVaccineId: number;
  childId: number;
  scheduleId: number;
  vaccineName: string;
  doseTiming: string;
  diseasePrevented: string;
  dosage: string;
  vaccinationWay: string;
  ageInMonths: number;
  scheduledDate: string;
  takenDate: string | null;
  status: "Pending" | "Done" | "Missed";
};

// تم تعديل الدالة لتدعم الترجمة الذكية للشهور بناءً على العدد بدلاً من كلمة Months الثابتة
const groupUpcoming = (list: Vaccine[], t: any) => {
  const map = new Map();

  list.forEach((v) => {
    const key = v.scheduledDate.split("T")[0];

    if (!map.has(key)) {
      map.set(key, {
        ageLabel: t("{{count}} Months", { count: v.ageInMonths }),
        scheduledDate: v.scheduledDate,
        vaccines: [],
      });
    }

    map.get(key).vaccines.push(v);
  });

  return Array.from(map.values());
};

function Vaccination() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { selectedChildId } = useChild();
  const {
    records,
    loading,
    updateStatus,
    markAsTaken,
    fetchRecords,
    upcoming,
    overdue,
    fetchUpcoming,
    fetchOverdue,
  } = useVaccination(selectedChildId);
  
  // تمرير دالة الترجمة لتنسيق النصوص داخل تجميع المجموعات
  const groupedUpcoming = groupUpcoming(upcoming, t);

  useEffect(() => {
    fetchRecords();
    fetchUpcoming();
    fetchOverdue();
  }, [language]);

  const handleMarkTaken = async (id: number) => {
    try {
      await markAsTaken(id);
      toast.success(t("Marked as taken successfully"));
    } catch (err: any) {
      toast.error(err.message || t("Operation failed"));
    }
  };

  const handleStatusChange = async (
    id: number,
    status: "Pending" | "Missed",
  ) => {
    try {
      await updateStatus(id, {
        status: status,
        takenDate: new Date().toISOString(),
      });
      toast.success(t("Updated successfully"));
    } catch (err: any) {
      toast.error(err.message || t("Operation failed"));
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-gray-400 text-sm">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xl font-semibold">{t("Vaccination")}</p>
        <p className="text-sm text-gray-500">
          {t("Track your baby's Vaccination")}
        </p>
      </div>
      <div>
        <VaccinationProgress data={records} />
      </div>
      <div>
        {overdue && overdue.length > 0 && (
          <OverdueList data={overdue} onMarkTaken={handleMarkTaken} />
        )}
      </div>
      <div>
        <UpcomingTimeline
          data={groupedUpcoming}
          onMarkTaken={handleMarkTaken}
        />
      </div>
      <div>
        <VaccinationList
          data={records}
          onMarkTaken={handleMarkTaken}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}

export default Vaccination;