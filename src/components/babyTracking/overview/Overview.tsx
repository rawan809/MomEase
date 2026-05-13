import AddReport from "./AddReport";
import ReportCard from "./ReportCard";
import { useChild } from "@/contexts/ChildContext";
import { useGrowthReports } from "@/hooks/useGrowthReports";
import { useState } from "react";
import ReportDetails from "./ReportDetails";

export default function Overview() {
  const { selectedChildId } = useChild();
  const { reports, loading, addReport, deleteReport } =
    useGrowthReports(selectedChildId);
  const [openedReport, setOpenedReport] = useState<
    (typeof reports)[number] | null
  >(reports[0] ?? null);

  return (
    <div className="space-y-5">
      {openedReport ? (
        <ReportDetails
          report={openedReport}
          onBack={() => setOpenedReport(null)}
        />
      ) : (
        <>
          <div className="flex justify-between items-end flex-wrap gap-3">
            <div>
              <p className="text-xl font-semibold">Growth Report</p>
            </div>

            <AddReport addReport={addReport} />
          </div>

          <div className="space-y-4">
            {reports.map((report) => (
              <ReportCard
                key={report.reportId}
                data={report}
                onOpen={() => setOpenedReport(report)}
                onDelete={deleteReport}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
