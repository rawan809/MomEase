import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChild } from "@/contexts/ChildContext";
import { useGrowthReports } from "@/hooks/useGrowthReports";
import ReportDetails from "@/components/babyTracking/overview/ReportDetails";
import LoadingState from "@/components/ui/LoadingState";
import { useTranslation } from "react-i18next";

export default function ReportDetailsPage() {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const { selectedChildId } = useChild();
  const { fetchReportById, selectedReport } = useGrowthReports(selectedChildId);
  const [localLoading, setLocalLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedChildId && reportId) {
      setLocalLoading(true);
      fetchReportById(Number(reportId)).finally(() => {
        setLocalLoading(false);
      });
    } else if (!selectedChildId) {
      // If childId is not loaded yet, wait for it
      setLocalLoading(true);
    }
  }, [selectedChildId, reportId]);

  if (localLoading) {
    return <LoadingState />;
  }

  if (!selectedReport) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 font-medium">{t("Report not found")}</p>
        <button
          onClick={() => navigate("/babytracking/overview")}
          className="mt-4 text-sm text-primary hover:underline cursor-pointer"
        >
          {t("Back to Overview")}
        </button>
      </div>
    );
  }

  return (
    <ReportDetails
      report={selectedReport}
      onBack={() => navigate("/babytracking/overview")}
    />
  );
}
