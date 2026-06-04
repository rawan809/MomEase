"use client";

import {
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  Scale,
  Ruler,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

//  TYPES

type DailyGrowth = {
  date: string;
  weight: number | null;
  height: number | null;
  status: string;
};

type MonthlyData = {
  year: number;
  month: number;
  monthName: string;
  dailyGrowth: DailyGrowth[];
  monthlyWeightGain: number;
  monthlyHeightGain: number;
  totalRecords: number;
  goodGrowthDays: number;
  poorGrowthDays: number;
};

//  COMPONENT

export default function MonthlyGrowth({
  monthlyData,
}: {
  monthlyData: MonthlyData | null;
}) {
  const { t } = useTranslation();

  //  HELPERS (نقلت بالداخل للتنظيم والاستخدام النظيف)
  const getTrendIcon = (value: number) => {
    if (value > 0) return <ArrowUp className="text-green-500" />;
    if (value < 0) return <ArrowDown className="text-red-500" />;
    return <Minus className="text-gray-400" />;
  };

  const getDayNumber = (date: string) => {
    return new Date(date).getDate();
  };

  // لو مفيش داتا
  if (!monthlyData) {
    return (
      <Card className="bg-gray-100">
        <CardContent className="h-50 flex items-center justify-center text-gray-500">
          {t("No monthly data available")}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Monthly Summary */}
      <Card className="rounded-xl shadow-sm border bg-white border-primary hover:shadow-md transition-all">
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Calendar />
            <h3 className="font-semibold">
              {t(monthlyData.monthName)} {monthlyData.year}
            </h3>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{t("Monthly overview")}</span>

            <span className="bg-[#ffc8dd] px-3 py-1 rounded-xl text-sm">
              {monthlyData.totalRecords ?? 0} {t("records")}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Weight */}
            <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Scale size={16} />
                <span className="text-sm">{t("Weight")}</span>
              </div>

              <div className="flex items-center gap-1 font-semibold">
                {monthlyData.monthlyWeightGain ?? 0} {t("kg")}
                {getTrendIcon(monthlyData.monthlyWeightGain ?? 0)}
              </div>
            </div>

            {/* Height */}
            <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Ruler size={16} />
                <span className="text-sm">{t("Height")}</span>
              </div>

              <div className="flex items-center gap-1 font-semibold ">
                {monthlyData.monthlyHeightGain ?? 0} {t("cm")}
                {getTrendIcon(monthlyData.monthlyHeightGain ?? 0)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card className="rounded-xl shadow-sm border bg-white border-primary hover:shadow-md transition-all">
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-[#ff3381]">{t("Monthly Tracking")}</h3>

          <div className="grid md:grid-cols-7 grid-cols-5 gap-2">
            {monthlyData.dailyGrowth?.length ? (
              monthlyData.dailyGrowth.map((day, index) => {
                const hasData = day.weight !== null;

                return (
                  <div
                    key={index}
                    className={cn(
                      "h-16 rounded-xl border flex flex-col items-center justify-center md:text-xs text-[10px] ",
                      hasData
                        ? "bg-[#ffc8dd] border-transparent"
                        : "bg-gray-50 text-gray-400",
                    )}
                  >
                    <span className="text-[10px]">
                      {getDayNumber(day.date)}
                    </span>

                    {hasData && (
                      <div className="text-center">
                        <p className="font-semibold">
                          {day.weight} {t("kg")}
                        </p>
                        <p className="font-semibold">
                          {day.height} {t("cm")}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="col-span-7 text-center text-gray-500 py-5">
                {t("No daily data")}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Smart Insight */}
      <Card className="rounded-xl shadow-sm border bg-white border-primary hover:shadow-md transition-all">
        <CardContent>
          <div className="bg-[#ffc8dd] rounded-xl p-4 text-sm">
            {monthlyData.totalRecords === 0
              ? t("No data this month. Try to track growth regularly.")
              : monthlyData.totalRecords < 5
                ? t("Tracking is limited this month. Consistency improves insights.")
                : t("Tracking is consistent this month. Growth monitoring looks stable.")}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}