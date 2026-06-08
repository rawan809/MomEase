"use client";

import {
  ArrowUp,
  ArrowDown,
  Minus,
  CalendarDays,
  Scale,
  Ruler,
} from "lucide-react";

import { Card, CardContent } from "@/components/UI/card";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

//  TYPES

type DailyGrowth = {
  date: string;
  weight: number | null;
  height: number | null;
  status: string;
};

type WeeklyData = {
  weekStart: string;
  weekEnd: string;
  dailyGrowth: DailyGrowth[];
  weeklyWeightGain: number;
  weeklyHeightGain: number;
  totalRecords: number;
};

//  COMPONENT

export default function WeeklyGrowth({
  weeklyData,
}: {
  weeklyData: WeeklyData | null;
}) {
  const { t, i18n } = useTranslation();

  //  HELPERS (تم نقلها بالداخل لتعتمد ديناميكياً على لغة التطبيق)
  const getDayName = (date: string) =>
    new Date(date).toLocaleDateString(i18n.language, { weekday: "short" });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(i18n.language, {
      month: "short",
      day: "numeric",
    });

  const getTrendIcon = (value: number) => {
    if (value > 0) return <ArrowUp className="text-green-500" />;
    if (value < 0) return <ArrowDown className="text-red-500" />;
    return <Minus className="text-gray-400" />;
  };

  // لو مفيش داتا خالص
  if (!weeklyData) {
    return (
      <Card className="bg-gray-100">
        <CardContent className="h-50 flex items-center justify-center text-gray-500">
          {t("No weekly data available")}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Weekly Summary */}
      <Card className="rounded-xl shadow-sm border bg-white border-primary hover:shadow-md transition-all">
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <CalendarDays />
            <h3 className="font-semibold">{t("This Week")}</h3>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {formatDate(weeklyData.weekStart)} &rarr;{" "}
              {formatDate(weeklyData.weekEnd)}
            </div>

            <div className="bg-[#ffc8dd] px-3 py-1 rounded-xl text-sm">
              {weeklyData.totalRecords ?? 0} {t("records")}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Weight */}
            <div className="bg-gray-100 p-3 rounded-xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Scale size={16} />
                <span className="text-sm">{t("Weight")}</span>
              </div>

              <div className="flex items-center gap-1 font-semibold">
                {weeklyData.weeklyWeightGain ?? 0} {t("kg")}
                {getTrendIcon(weeklyData.weeklyWeightGain ?? 0)}
              </div>
            </div>

            {/* Height */}
            <div className="bg-gray-100 p-3 rounded-xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Ruler size={16} />
                <span className="text-sm">{t("Height")}</span>
              </div>

              <div className="flex items-center gap-1 font-semibold">
                {weeklyData.weeklyHeightGain ?? 0} {t("cm")}
                {getTrendIcon(weeklyData.weeklyHeightGain ?? 0)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Timeline */}
      <Card className="rounded-xl shadow-sm border bg-white border-primary hover:shadow-md transition-all">
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-[#ff3381]">{t("Daily Tracking")}</h3>

          <div className="grid md:grid-cols-7 grid-cols-2 gap-2">
            {weeklyData.dailyGrowth?.length ? (
              weeklyData.dailyGrowth.map((day, index) => {
                const hasData = day.weight !== null;

                return (
                  <div
                    key={index}
                    className={cn(
                      "rounded-xl p-2 text-center border",
                      hasData
                        ? "bg-[#ffc8dd] border-transparent"
                        : "bg-gray-100 text-gray-400",
                    )}
                  >
                    <div className="text-xs mb-1">{getDayName(day.date)}</div>

                    {hasData ? (
                      <>
                        <div className="text-xs font-semibold">
                          {day.weight} {t("kg")}
                        </div>
                        <div className="text-xs font-semibold">
                          {day.height} {t("cm")}
                        </div>
                      </>
                    ) : (
                      <div className="text-[10px]">{t("No data")}</div>
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
            {weeklyData.totalRecords === 0
              ? t("No records this week. Try adding daily measurements.")
              : weeklyData.totalRecords < 3
                ? t("Few measurements this week. More tracking gives better insights.")
                : t("Great tracking this week! Keep it up")}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}