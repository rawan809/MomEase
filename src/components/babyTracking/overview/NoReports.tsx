"use client";

import { useTranslation } from "react-i18next";
import AddReport from "./AddReport";

interface AddReportData {
  periodStart?: string;
  periodEnd?: string;
  lastMonths?: number;
}

export default function NoReports({
  onAdd,
}: {
  onAdd: (data: AddReportData) => Promise<void>;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center px-6 text-center h-[50vh] space-y-4">
      <p className="text-base font-semibold mb-1">
        {t("No growth reports yet")}
      </p>
      <p className="text-sm text-gray-400 max-w-55 leading-relaxed">
        {t("Start tracking your child's growth by adding the first report")}
      </p>

      <AddReport addReport={onAdd} />
    </div>
  );
}