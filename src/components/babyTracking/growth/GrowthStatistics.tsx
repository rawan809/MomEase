"use client";

import {
  ArrowUp,
  ArrowDown,
  Minus,
  Scale,
  Ruler,
  Activity,
  HeartPulse,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

//  TYPES

type GrowthStatisticsData = {
  totalRecords: number;
  averageWeight: number;
  maxWeight: number;
  minWeight: number;
  weightGainTotal: number;
  monthlyWeightGainAverage: number;

  averageHeight: number;
  maxHeight: number;
  minHeight: number;
  heightGainTotal: number;
  monthlyHeightGainAverage: number;

  currentGrowthStatus: "Normal" | "Less" | "More" | string;
  weightTrend: "Increasing" | "Decreasing" | "Stable" | string;
  heightTrend: "Increasing" | "Decreasing" | "Stable" | string;
};

//  COMPONENT

export default function GrowthStatistics({
  data,
}: {
  data: GrowthStatisticsData | null;
}) {
  const { t } = useTranslation();

  //  HELPERS (تم نقلها بالداخل لتتمكن من استخدام دالة الترجمة t)
  const getTrendIcon = (trend: string) => {
    if (trend === "Increasing") return <ArrowUp className="text-green-500" />;
    if (trend === "Decreasing") return <ArrowDown className="text-red-500" />;
    return <Minus className="text-gray-400" />;
  };

  const getStatusColor = (status: string) => {
    if (status === "Normal")
      return <div className="text-2xl font-bold text-green-500">{t("Normal")}</div>;

    if (status === "Less")
      return <div className="text-2xl font-bold text-red-500">{t("Less")}</div>;

    if (status === "More")
      return <div className="text-2xl font-bold text-blue-500">{t("More")}</div>;

    return <div className="text-2xl font-bold text-gray-400">{t(status)}</div>;
  };

  // لو مفيش داتا
  if (!data) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card className="col-span-full bg-gray-100">
          <CardContent className="h-37.5 flex items-center justify-center text-gray-500">
            {t("No statistics available yet")}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* Weight */}
      <Card className="rounded-xl hover:shadow-md transition-all border bg-gray-100">
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Scale />
            <h3 className="font-semibold">{t("Weight")}</h3>
          </div>

          <div className="flex items-end justify-between">
            <span className="text-sm md:text-base">
              {t("Monthly Avg Gain")}:
              <span className="font-semibold ml-1">
                {data.monthlyWeightGainAverage.toFixed(2) ?? 0} {t("kg")}
              </span>
            </span>

            {getTrendIcon(data.weightTrend)}
          </div>
        </CardContent>
      </Card>

      {/* Height */}
      <Card className="rounded-xl hover:shadow-md transition-all border bg-gray-100">
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Ruler />
            <h3 className="font-semibold">{t("Height")}</h3>
          </div>

          <div className="flex items-end justify-between">
            <span className="text-sm md:text-base">
              {t("Monthly Avg Gain")}:
              <span className="font-semibold ml-1">
                {data.monthlyHeightGainAverage.toFixed(2) ?? 0} {t("cm")}
              </span>
            </span>

            {getTrendIcon(data.heightTrend)}
          </div>
        </CardContent>
      </Card>

      {/* Growth Status */}
      <Card className="rounded-xl hover:shadow-md transition-all border bg-gray-100">
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <HeartPulse />
            <h3 className="font-semibold">{t("Growth Status")}</h3>
          </div>

          {getStatusColor(data.currentGrowthStatus)}

          <div className="text-sm text-gray-500">{t("Based on latest records")}</div>

          <div className="bg-gray-100 p-2 rounded-xl text-sm">
            {t("Total Records")}: {data.totalRecords ?? 0}
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="rounded-xl hover:shadow-md transition-all border bg-gray-100">
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Activity />
            <h3 className="font-semibold">{t("Progress")}</h3>
          </div>

          <div className="flex justify-between text-sm">
            <span>{t("Weight Gain")}</span>
            <span className="font-semibold">
              {data.weightGainTotal ?? 0} {t("kg")}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>{t("Height Gain")}</span>
            <span className="font-semibold">
              {data.heightGainTotal ?? 0} {t("cm")}
            </span>
          </div>

          <div className="bg-[#ffc8dd] p-2 rounded-xl text-sm">
            {data.weightTrend === "Increasing" &&
            data.heightTrend === "Increasing"
              ? t("Healthy growth pattern")
              : t("Monitor growth closely")}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}