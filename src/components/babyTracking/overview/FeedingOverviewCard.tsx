import { Card, CardContent } from "@/components/UI/card";
import { Utensils } from "lucide-react";
import type { FeedingAnalysis } from "./types";
import { useTranslation } from "react-i18next";

type Props = {
  data?: FeedingAnalysis;
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

export default function FeedingOverviewCard({ data }: Props) {
  const { t } = useTranslation();

  if (!data) {
    return (
      <Card className="border-0 shadow-md">
        <CardContent className="p-5">
          <p className="text-sm text-gray-400 text-center py-6">
            {t("No feeding data available.")}
          </p>
        </CardContent>
      </Card>
    );
  }

  const style = STATUS_STYLE[data.currentStatus] ?? STATUS_STYLE["No Data"];

  return (
    <Card className="border-0 shadow-md bg-accent/50">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils size={15} className="text-primary" />
            <p className="text-base font-semibold">{t("Feeding Overview")}</p>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${style.badge}`}
          >
            {t(data.currentStatus)}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-100 rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold text-primary">
              {data.averageFeedingsPerDay}
            </p>
            <p className="text-xs text-gray-500 mt-1">{t("Avg / day")}</p>
          </div>
          <div className="bg-gray-100 rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold text-green-600">
              {data.goodFeedingDays}
            </p>
            <p className="text-xs text-gray-500 mt-1">{t("Good days")}</p>
          </div>
          <div className="bg-gray-100 rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold text-orange-500">
              {data.poorFeedingDays}
            </p>
            <p className="text-xs text-gray-500 mt-1">{t("Poor days")}</p>
          </div>
        </div>

        {/* Message */}
        <p className="text-xs text-gray-500 leading-relaxed">{t(data.message)}</p>
      </CardContent>
    </Card>
  );
}