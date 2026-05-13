import { Card, CardContent } from "@/components/ui/card";
import {
  Utensils,
  TrendingUp,
  AlertTriangle,
  Star,
  Zap,
  BarChart2,
  Clock,
  CheckCircle,
} from "lucide-react";

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; border: string; icon: any }
> = {
  Good: {
    label: "Good",
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
    icon: Star,
  },
  Normal: {
    label: "Normal",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: Zap,
  },
  Under: {
    label: "Under",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: AlertTriangle,
  },
  SevereUnder: {
    label: "Severe Under",
    color: "text-[#ff3381]",
    bg: "bg-pink-50",
    border: "border-pink-200",
    icon: AlertTriangle,
  },
  Obese: {
    label: "Obese",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: TrendingUp,
  },
  NoData: {
    label: "No Data",
    color: "text-gray-400",
    bg: "bg-gray-50",
    border: "border-gray-200",
    icon: CheckCircle,
  },
};

export default function FeedingStatisticsCards({ data }: any) {
  if (!data) return null;
  const statusKey = data.currentFeedingStatus as string;
  const config = statusConfig[statusKey] ?? statusConfig.NoData;
  const StatusIcon = config.icon;

  const { recommendedMin, recommendedMax, actualAverage, message } =
    data.comparisonWithReference;
  const hasReference = recommendedMax > 0;
  const progressPct = hasReference
    ? Math.min(100, Math.round((actualAverage / recommendedMax) * 100))
    : null;

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Card 1 - Daily Average */}
      <Card className="rounded-xl hover:shadow-md transition-all duration-300 border bg-gray-100">
        <CardContent className="space-y-2 pt-4">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Utensils className="w-4 h-4" />
            <h3 className="font-semibold text-sm">Daily Average</h3>
          </div>
          <p className="text-2xl font-bold">
            {data.averageTimesPerDay}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              times/day
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Last 7 days:{" "}
            <span className="font-medium text-foreground">
              {data.last7DaysAverage} times/day
            </span>
          </p>
        </CardContent>
      </Card>

      {/* Card 2 - Feeding Status */}
      <Card
        className={`rounded-xl hover:shadow-md transition-all duration-300 border ${config.bg} ${config.border}`}
      >
        <CardContent className="space-y-2 pt-4">
          <div className={`flex items-center gap-2 ${config.color}`}>
            <StatusIcon className="w-4 h-4" />
            <h3 className="font-semibold text-sm">Feeding Status</h3>
          </div>
          <p className={`text-2xl font-bold ${config.color}`}>{config.label}</p>
          <p className="text-xs text-muted-foreground">
            Most common:{" "}
            <span className="font-medium text-foreground">
              {statusConfig[data.mostCommonFeedingType]?.label ??
                data.mostCommonFeedingType}
            </span>
          </p>
        </CardContent>
      </Card>

      {/* Card 3 - vs Recommended */}
      <Card className="rounded-xl hover:shadow-md transition-all duration-300 border bg-gray-100">
        <CardContent className="space-y-2 pt-4">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <BarChart2 className="w-4 h-4" />
            <h3 className="font-semibold text-sm">vs Recommended</h3>
          </div>

          {hasReference ? (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{actualAverage} actual</span>
                <span>
                  {recommendedMin}–{recommendedMax} goal
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${config.color.replace("text-", "bg-")}`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className={`text-xs ${config.color}`}>{message}</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-400">—</p>
              <p className="text-xs text-muted-foreground">{message}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Card 4 - Records Summary */}
      <Card className="rounded-xl hover:shadow-md transition-all duration-300 border bg-gray-100">
        <CardContent className="space-y-2 pt-4">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Clock className="w-4 h-4" />
            <h3 className="font-semibold text-sm">Records Summary</h3>
          </div>
          <p className="text-2xl font-bold">
            {data.totalRecords}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              total
            </span>
          </p>
          <div className="flex justify-between text-xs text-muted-foreground border-t pt-2">
            <span>Avg/day</span>
            <span className="font-medium text-foreground">
              {data.averageTimesPerDay}x
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
