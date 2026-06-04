import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

// TYPES

type DailySleep = {
  date: string;
  sleepHours: string | null;
  status: "Good" | "Normal" | "Poor" | "Unknown";
  sleepHoursFormatted: string | null;
};

type WeeklySleepData = {
  weekStart: string;
  weekEnd: string;
  dailySleep: DailySleep[];
  weeklyAverageSleep: string;
  totalRecords: number;
  weeklyAverageSleepFormatted: string;
};

// COMPONENT

export default function WeeklySleep({
  weeklyData,
}: {
  weeklyData: WeeklySleepData | null;
}) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // HELPERS (نقلت داخل المكون للاستفادة من متغير اللغة الحالي)
  const getDayName = (date: string) =>
    new Date(date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", { weekday: "short" });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      month: "short",
      day: "numeric",
    });

  if (!weeklyData) {
    return (
      <Card className="bg-gray-100">
        <CardContent className="h-40 flex items-center justify-center text-gray-500">
          {t("No weekly data available")}
        </CardContent>
      </Card>
    );
  }

  const safeDays = weeklyData.dailySleep ?? [];

  return (
    <div className="space-y-6">
      {/* WEEK SUMMARY */}
      <Card className="rounded-xl shadow-sm border bg-white border-primary hover:shadow-md transition-all">
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <CalendarDays />
            <h3 className="font-semibold">{t("This Week")}</h3>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {formatDate(weeklyData.weekStart)} →{" "}
              {formatDate(weeklyData.weekEnd)}
            </div>

            <div className="bg-[#ffc8dd] px-3 py-1 rounded-xl text-sm">
              {weeklyData.totalRecords ?? 0} {t("records")}
            </div>
          </div>

          <div className="text-sm text-gray-700">
            {t("Weekly Average:")}{" "}
            <span className="font-semibold">
              {weeklyData.weeklyAverageSleepFormatted ?? "0h"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* DAILY GRID */}
      <Card className="rounded-xl shadow-sm border bg-white border-primary hover:shadow-md transition-all">
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-[#ff3381]">{t("Daily Tracking")}</h3>

          <div className="grid md:grid-cols-7 grid-cols-2 gap-2">
            {safeDays.length ? (
              safeDays.map((day, index) => {
                const hasData = !!day.sleepHours;

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
                          {day.sleepHoursFormatted?.slice(0, 5)}
                        </div>
                        <div className="text-[10px]">{t(day.status)}</div>
                      </>
                    ) : (
                      <div className="text-[10px]">{t("No data")}</div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="col-span-7 text-center text-gray-500 py-5">
                {t("No daily sleep data")}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* INSIGHT */}
      <Card className="rounded-xl shadow-sm border bg-white border-primary hover:shadow-md transition-all">
        <CardContent>
          <div className="bg-[#ffc8dd] rounded-xl p-4 text-sm">
            {weeklyData.totalRecords === 0
              ? t("No sleep records this week. Start tracking daily sleep.")
              : weeklyData.totalRecords < 3
                ? t("Few sleep records this week. More tracking improves insights.")
                : t("Great tracking this week! Keep it up.")}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}