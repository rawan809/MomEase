import { ArrowLeft } from "lucide-react";

import ReportSummaryCard from "./ReportSummaryCard";
import GrowthAnalysisCard from "./GrowthAnalysisCard";
import SleepCard from "./SleepCard";
import FeedingOverviewCard from "./FeedingOverviewCard";
import RecommendationsCard from "./RecommendationsCard";
import CorrelationCard from "./CorrelationCard";
import SimpleChartCard from "./SimpleChartCard";

import type { GrowthReport } from "./types";

type Props = {
  report: GrowthReport;
  onBack: () => void;
};

function ReportDetails({ report, onBack }: Props) {
  const {
    summary,
    growthAnalysis,
    sleepAnalysis,
    feedingAnalysis,
    recommendations,
  } = report.reportContent;

  const correlations =
    (report as any).correlations ?? (report.reportContent as any).correlations;
  const charts = (report as any).charts ?? (report.reportContent as any).charts;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back to reports
        </button>

        <ReportSummaryCard
          summary={summary}
          childName={report.childName}
          periodStart={report.periodStart}
          periodEnd={report.periodEnd}
        />
      </div>
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 ">
          Growth & Development
        </h3>
        <GrowthAnalysisCard data={growthAnalysis} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SimpleChartCard title="Weight Progress" data={charts.weightChart} />
          <SimpleChartCard title="Height Progress" data={charts.heightChart} />
        </div>
      </section>
      {/* 4. Daily Habits (Sleep & Feeding) */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 ">
          Daily Routine Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SleepCard data={sleepAnalysis} />
          <SimpleChartCard title="Sleep Trends" data={charts.sleepChart} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeedingOverviewCard data={feedingAnalysis} />
          <SimpleChartCard title="Feeding Trends" data={charts.feedingChart} />
        </div>
      </section>
      {/* 5. Correlations & Insights (AI logic) */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 ">Pattern Insights</h3>
        <CorrelationCard data={correlations} />
      </section>
      {/* 6. Actionable Steps (The Conclusion) */}
      <section className="space-y-4 pt-4">
        <h3 className="text-lg font-bold text-gray-800">
          Personalized Recommendations
        </h3>
        <RecommendationsCard recommendations={recommendations} />
      </section>
    </div>
  );
}

export default ReportDetails;
