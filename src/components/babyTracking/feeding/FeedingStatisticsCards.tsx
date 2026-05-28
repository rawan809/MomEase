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
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    progress: string;
    icon: any;
  }
> = {
  Good: {
    label: "Good",
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
    progress: "bg-green-500",
    icon: Star,
  },

  Normal: {
    label: "Normal",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    progress: "bg-yellow-500",
    icon: Zap,
  },

  Under: {
    label: "Under",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    progress: "bg-orange-500",
    icon: AlertTriangle,
  },

  SevereUnder: {
    label: "Severe Under",
    color: "text-[#ff3381]",
    bg: "bg-pink-50",
    border: "border-pink-200",
    progress: "bg-[#ff3381]",
    icon: AlertTriangle,
  },

  Obese: {
    label: "Obese",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
    progress: "bg-blue-500",
    icon: TrendingUp,
  },

  NoData: {
    label: "No Data",
    color: "text-gray-400",
    bg: "bg-gray-50",
    border: "border-gray-200",
    progress: "bg-gray-400",
    icon: CheckCircle,
  },
};

export default function FeedingStatisticsCards({
  data,
}: any) {
  if (!data) return null;

  const statusKey = data.currentFeedingStatus as string;

  const config =
    statusConfig[statusKey] ?? statusConfig.NoData;

  const StatusIcon = config.icon;

  const {
    recommendedMin,
    recommendedMax,
    actualAverage,
    message,
  } = data.comparisonWithReference || {};

  const hasReference =
    recommendedMin > 0 || recommendedMax > 0;


  const progressPct = hasReference
    ? Math.min(
        100,
        Math.round(
          (actualAverage / recommendedMax) * 100,
        ),
      )
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Card 1 */}
      <Card className="rounded-2xl border bg-gray-100 transition-all duration-300 hover:shadow-md">
        <CardContent className="pt-5 space-y-3">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Utensils className="w-4 h-4" />

            <h3 className="text-sm font-semibold">
              Daily Average
            </h3>
          </div>

          <p className="text-2xl font-bold wrap-break-word">
            {data.averageTimesPerDay}

            <span className="ml-1 text-sm font-normal text-muted-foreground">
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

      {/* Card 2 */}
      <Card
        className={`rounded-2xl border transition-all duration-300 hover:shadow-md ${config.bg} ${config.border}`}
      >
        <CardContent className="pt-5 space-y-3">
          <div
            className={`flex items-center gap-2 ${config.color}`}
          >
            <StatusIcon className="w-4 h-4" />

            <h3 className="text-sm font-semibold">
              Feeding Status
            </h3>
          </div>

          <p
            className={`text-2xl font-bold wrap-break-word ${config.color}`}
          >
            {config.label}
          </p>

          <p className="text-xs text-muted-foreground">
            Most common:{" "}
            <span className="font-medium text-foreground">
              {data.mostCommonFeedingType}
            </span>
          </p>
        </CardContent>
      </Card>

      {/* Card 3 */}
      <Card className="rounded-2xl border bg-gray-100 transition-all duration-300 hover:shadow-md">
        <CardContent className="pt-5 space-y-4">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <BarChart2 className="w-4 h-4" />

            <h3 className="text-sm font-semibold">
              vs Recommended
            </h3>
          </div>

          {hasReference ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground gap-2">
                <span>{actualAverage.toFixed(2)} actual</span>

                <span>
                  {recommendedMin}–{recommendedMax} goal
                </span>
              </div>

              {/* Progress */}
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${config.progress}`}
                  style={{
                    width: `${progressPct}%`,
                  }}
                />
              </div>

              <p
                className={`text-xs leading-relaxed ${config.color}`}
              >
                {message}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-400">
                —
              </p>

              <p className="text-xs text-muted-foreground">
                No recommendation available
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Card 4 */}
      <Card className="rounded-2xl border bg-gray-100 transition-all duration-300 hover:shadow-md">
        <CardContent className="pt-5 space-y-3">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Clock className="w-4 h-4" />

            <h3 className="text-sm font-semibold">
              Records Summary
            </h3>
          </div>

          <p className="text-2xl font-bold wrap-break-word">
            {data.totalRecords}

            <span className="ml-1 text-sm font-normal text-muted-foreground">
              total
            </span>
          </p>

          <div className="flex items-center justify-between border-t pt-2 text-xs text-muted-foreground">
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