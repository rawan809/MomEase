import { Card, CardContent } from "@/components/UI/card";
import { TrendingUp, TrendingDown, Minus, Scale } from "lucide-react";
import type { GrowthAnalysis } from "./types";
import { useTranslation } from "react-i18next";

type Props = {
  data?: GrowthAnalysis;
};

const TREND_ICON: Record<string, React.ReactNode> = {
  Increasing: <TrendingUp size={13} className="text-green-600" />,
  "في ازدياد": <TrendingUp size={13} className="text-green-600" />,
  Decreasing: <TrendingDown size={13} className="text-red-500" />,
  "في نقصان": <TrendingDown size={13} className="text-red-500" />,
  Stable: <Minus size={13} className="text-blue-500" />,
  "No Data": <Minus size={13} className="text-gray-400" />,
};

const STATUS_COLOR: Record<string, string> = {
  "Above Average": "text-green-600",
  Good: "text-green-600",
  Tall: "text-blue-600",
  Normal: "text-green-600",
  Low: "text-orange-500",
  "No Data": "text-gray-400",
};

export default function GrowthAnalysisCard({ data }: Props) {
  const { t } = useTranslation();

  if (!data) {
    return (
      <Card className="border-0 shadow-md">
        <CardContent className="p-5">
          <p className="text-sm text-gray-400 text-center py-6">
            {t("No growth data available.")}
          </p>
        </CardContent>
      </Card>
    );
  }

  const trend = data.trend ?? "No Data";

  return (
    <Card className="border-0 shadow-md bg-accent/50">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale size={15} className="text-primary" />
            <p className="text-base font-semibold">{t("Growth")}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            {TREND_ICON[trend] ?? <Minus size={13} className="text-gray-400" />}
            <span>{trend}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <GrowthMetric
            label={t("Weight Gain")}
            value={
              data.totalWeightGain
                ? t("{{count}} kg", { count: data.totalWeightGain })
                : "—"
            }
            status={data.weightStatus}
            statusColor={STATUS_COLOR[data.weightStatus]}
          />
          <GrowthMetric
            label={t("Height Gain")}
            value={
              data.totalHeightGain
                ? t("{{count}} cm", { count: data.totalHeightGain })
                : "—"
            }
            status={data.heightStatus}
            statusColor={STATUS_COLOR[data.heightStatus]}
          />
        </div>

        {/* Monthly Breakdown */}
        {data.monthlyBreakdown.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-medium">{t("Monthly")}</p>
            {data.monthlyBreakdown.map((m) => (
              <div
                key={m.month}
                className="flex items-center justify-between bg-white rounded-xl px-3 py-2"
              >
                <span className="text-sm text-gray-700">{t(m.month)}</span>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{t("{{count}} kg", { count: m.weightGain })}</span>
                  <span>{t("{{count}} cm", { count: m.heightGain })}</span>
                  <span
                    className={`font-semibold ${STATUS_COLOR[m.status] ?? "text-gray-600"}`}
                  >
                    {t(m.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 text-center py-2">
            {t("No monthly breakdown available yet.")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function GrowthMetric({
  label,
  value,
  status,
  statusColor,
}: {
  label: string;
  value: string;
  status: string;
  statusColor?: string;
}) {
  const { t } = useTranslation();
  return (
    <div className=" rounded-2xl p-3 space-y-1">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-xl font-bold text-primary">{value}</p>
      <p className={`text-xs font-medium ${statusColor ?? "text-gray-500"}`}>
        {t(status)}
      </p>
    </div>
  );
}
