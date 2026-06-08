import { Card, CardContent } from "@/components/UI/card";
import { Badge } from "@/components/UI/badge";
import { AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import type { GrowthReportSummary } from "./types";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  summary?: GrowthReportSummary;
  childName?: string;
  periodStart?: string;
  periodEnd?: string;
};

type StatusConfig = {
  color: string;
  bg: string;
  icon: React.ReactNode;
};

const STATUS_CONFIG: Record<string, StatusConfig> = {
  Good: {
    color: "text-green-700",
    bg: "bg-green-100",
    icon: <CheckCircle size={14} />,
  },
  "Needs Attention": {
    color: "text-orange-700",
    bg: "bg-orange-100",
    icon: <AlertCircle size={14} />,
  },
  Poor: {
    color: "text-red-700",
    bg: "bg-red-100",
    icon: <TrendingUp size={14} className="rotate-180" />,
  },
};

const DEFAULT_STATUS: StatusConfig = {
  color: "text-gray-600",
  bg: "bg-gray-100",
  icon: <Clock size={14} />,
};

export default function ReportSummaryCard({
  summary,
  periodStart,
  periodEnd,
}: Props) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  if (!summary) {
    return (
      <Card className="border-0 shadow-md bg-(--card)">
        <CardContent className="p-5">
          <p className="text-sm text-gray-400 text-center py-6">
            {t("No report summary available.")}
          </p>
        </CardContent>
      </Card>
    );
  }

  const config = STATUS_CONFIG[summary.overallStatus] ?? DEFAULT_STATUS;

  return (
    <div className="space-y-6">
      {/* Enhanced Header Section */}
      <div className="flex flex-col gap-1 border-b border-gray-100 pb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            {t("Growth Report Summary")}
          </h2>
          <Badge
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border-0 ${config.bg} ${config.color}`}
          >
            {config.icon}
            {t(summary.overallStatus)}
          </Badge>
        </div>

        {periodStart && periodEnd && (
          <div className="flex items-center gap-2 text-gray-500">
            <Clock size={14} className="text-gray-400" />
            <span className="text-sm font-medium">
              {formatDate(periodStart)} – {formatDate(periodEnd)}
            </span>
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
              {t("{{count}} Days", { count: summary.totalDays })}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Key Insight */}
        <div className="bg-accent/50 rounded-2xl px-4 py-3 border border-black/3">
          <p className="text-sm text-gray-600 leading-relaxed">
            "{summary.keyInsight}"
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatItem
            label={t("Growth Records")}
            value={summary.growthRecordsCount}
          />
          <StatItem
            label={t("Sleep Records")}
            value={summary.sleepRecordsCount}
          />
          <StatItem
            label={t("Feeding Records")}
            value={summary.feedingRecordsCount}
          />
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-100 rounded-2xl p-3 text-center shadow-sm">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-xs text-gray-500 mt-1 leading-tight">{label}</p>
    </div>
  );
}
