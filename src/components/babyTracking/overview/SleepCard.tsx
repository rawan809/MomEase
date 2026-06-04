import { Card, CardContent } from "@/components/ui/card";
import { Moon } from "lucide-react";
import type { SleepAnalysis } from "./types";
import { useTranslation } from "react-i18next";

type Props = {
  data?: SleepAnalysis;
};

const STATUS_STYLE: Record<string, { badge: string; bar: string }> = {
  Good: {
    badge: "bg-green-100 text-green-700",
    bar: "bg-green-500",
  },
  Poor: {
    badge: "bg-orange-100 text-orange-700",
    bar: "bg-orange-400",
  },
  "No Data": {
    badge: "bg-gray-100 text-gray-500",
    bar: "bg-gray-300",
  },
};

export default function SleepCard({ data }: Props) {
  const { t } = useTranslation();

  if (!data) {
    return (
      <Card className="border-0 shadow-md">
        <CardContent className="p-5">
          <p className="text-sm text-gray-400 text-center py-6">
            {t("No sleep data available.")}
          </p>
        </CardContent>
      </Card>
    );
  }

  const style = STATUS_STYLE[data.currentStatus] ?? STATUS_STYLE["No Data"];
  const hasData = data.averageSleepHours > 0;

  return (
    <Card className="border-0 shadow-md bg-accent/50">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon size={15} className="text-primary" />
            <p className="text-base font-semibold">{t("Sleep")}</p>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${style.badge}`}
          >
            {t(data.currentStatus)}
          </span>
        </div>

        {hasData ? (
          <>
            {/* Average */}
            <div className="text-center py-1">
              <p className="text-4xl font-bold text-primary">
                {data.averageSleepHours}
                <span className="text-lg font-medium text-gray-400 ml-1">
                  {t("h")}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{t("Average per day")}</p>
            </div>

            {/* Good / Poor days */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-100 rounded-2xl p-3 text-center">
                <p className="text-xl font-bold text-green-600">
                  {data.goodSleepDays}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{t("Good days")}</p>
              </div>
              <div className="bg-gray-100 rounded-2xl p-3 text-center">
                <p className="text-xl font-bold text-orange-500">
                  {data.poorSleepDays}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{t("Poor days")}</p>
              </div>
            </div>

            {/* Message */}
            <p className="text-xs text-gray-500 leading-relaxed">
              {t(data.message)}
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4 leading-relaxed">
            {data.message ? t(data.message) : t("No sleep records in this period.")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}