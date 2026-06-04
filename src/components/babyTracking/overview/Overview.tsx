import AddReport from "./AddReport";
import ReportCard from "./ReportCard";
import { useChild } from "@/contexts/ChildContext";
import { useGrowthReports } from "@/hooks/useGrowthReports";
import LoadingState from "@/components/ui/LoadingState";
import NoReports from "./NoReports";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Overview() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { selectedChildId } = useChild();
  const navigate = useNavigate();
  const { reports, loading, addReport, deleteReport, fetchReports } =
    useGrowthReports(selectedChildId);

  useEffect(() => {
    fetchReports();
  }, [language]);

  return (
    <div className="space-y-5">
      {loading ? (
        <LoadingState />
      ) : reports.length === 0 ? (
        <NoReports onAdd={addReport} />
      ) : (
        <>
          <div className="flex justify-between items-end flex-wrap gap-3">
            <div>
              <p className="text-xl font-semibold">{t("Growth Report")}</p>
            </div>

            <AddReport addReport={addReport} />
          </div>

          <div className="space-y-4">
            {reports.map((report) => (
              <ReportCard
                key={report.reportId}
                data={report}
                onOpen={() => navigate(`/babytracking/report/${report.reportId}`)}
                onDelete={deleteReport}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
