import { Card, CardContent } from "@/components/ui/card";
import {
  Moon, TrendingUp, TrendingDown, Star, AlertTriangle,
  Clock, BarChart2, Zap, Activity
} from "lucide-react";

type Status = "Good" | "Normal" | "Poor" | "Unknown";

type SleepStatisticsType = {
  totalRecords?: number;
  averageSleepHours?: string;
  averageSleepHoursFormatted?: string;
  maxSleepHours?: string;
  minSleepHours?: string;
  goodSleepDays?: number;
  normalSleepDays?: number;
  poorSleepDays?: number;
  sleepQualityPercentage?: number;
  last7DaysAverage?: string;
  last7DaysAverageFormatted?: string;
  currentSleepStatus?: Status;
  mostCommonStatus?: Status;
  comparisonWithReference?: {
    status?: Status;
    recommendedMinHours?: number;
    recommendedMaxHours?: number;
    actualAverageHours?: number;
    message?: string;
  };
};

const sleepData: SleepStatisticsType = {
  totalRecords: 1,
  averageSleepHours: "05:30:00",
  averageSleepHoursFormatted: "5h 30m",
  maxSleepHours: "05:30:00",
  minSleepHours: "05:30:00",
  goodSleepDays: 0,
  normalSleepDays: 0,
  poorSleepDays: 1,
  sleepQualityPercentage: 0,
  last7DaysAverage: "05:30:00",
  last7DaysAverageFormatted: "5h 30m",
  currentSleepStatus: "Poor",
  mostCommonStatus: "Poor",
  comparisonWithReference: {
    status: "Poor",
    recommendedMinHours: 14,
    recommendedMaxHours: 17,
    actualAverageHours: 5.5,
    message: "Sleep duration is significantly below recommended. Please consult with a pediatrician.",
  },
};

const statusConfig = {
  Good: { color: "text-green-500", bg: "bg-green-50", border: "border-green-200", icon: Star },
  Normal: { color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-200", icon: Zap },
  Poor: { color: "text-[#ff3381]", bg: "bg-pink-50", border: "border-pink-200", icon: AlertTriangle },
  Unknown: { color: "text-gray-400", bg: "bg-gray-100", border: "border-gray-200", icon: AlertTriangle },
};

export default function SleepStatistics({ data = sleepData }: { data?: SleepStatisticsType }) {
  const safe = data ?? sleepData;

  const status = (safe.currentSleepStatus ?? "Unknown") as keyof typeof statusConfig;
  const config = statusConfig[status] ?? statusConfig.Unknown;
  const StatusIcon = config.icon;

  const actualH = safe.comparisonWithReference?.actualAverageHours ?? 0;
  const maxH = safe.comparisonWithReference?.recommendedMaxHours ?? 1;
  const minH = safe.comparisonWithReference?.recommendedMinHours ?? 0;

  const progressPct = Math.min(100, Math.round((actualH / maxH) * 100));

  return (
    <div className="grid grid-cols-2 gap-3">

      <Card className="rounded-xl hover:shadow-md transition-all duration-300 border bg-gray-100">
        <CardContent className="space-y-2 pt-4">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Moon className="w-4 h-4" />
            <h3 className="font-semibold text-sm">Average Sleep</h3>
          </div>
          <p className="text-2xl font-bold">
            {safe.averageSleepHoursFormatted ?? "0h"}
          </p>
          <p className="text-xs text-muted-foreground">
            Last 7 days:{" "}
            <span className="font-medium text-foreground">
              {safe.last7DaysAverageFormatted ?? "0h"}
            </span>
          </p>
        </CardContent>
      </Card>

      <Card className={`rounded-xl hover:shadow-md transition-all duration-300 border ${config.bg} ${config.border}`}>
        <CardContent className="space-y-2 pt-4">
          <div className={`flex items-center gap-2 ${config.color}`}>
            <StatusIcon className="w-4 h-4" />
            <h3 className="font-semibold text-sm">Sleep Status</h3>
          </div>
          <p className={`text-2xl font-bold ${config.color}`}>
            {safe.currentSleepStatus ?? "Unknown"}
          </p>
          <p className="text-xs text-muted-foreground">
            Most common:{" "}
            <span className="font-medium text-foreground">
              {safe.mostCommonStatus ?? "Unknown"}
            </span>
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-xl hover:shadow-md transition-all duration-300 border bg-gray-100">
        <CardContent className="space-y-2 pt-4">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Activity className="w-4 h-4" />
            <h3 className="font-semibold text-sm">vs Recommended</h3>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{actualH}h actual</span>
              <span>{minH}–{maxH}h goal</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  status === "Good" ? "bg-green-400" : status === "Normal" ? "bg-yellow-400" : "bg-[#ff3381]"
                }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          {status === "Poor" && (
            <p className="text-xs text-[#ff3381]">
              {safe.comparisonWithReference?.message ?? ""}
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-xl hover:shadow-md transition-all duration-300 border bg-gray-100">
        <CardContent className="space-y-2 pt-4">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <BarChart2 className="w-4 h-4" />
            <h3 className="font-semibold text-sm">Quality Breakdown</h3>
          </div>
          <div className="flex gap-1 text-xs">
            <div className="flex-1 bg-green-100 text-green-700 rounded-md px-1 py-1 text-center">
              <div className="font-bold">{safe.goodSleepDays ?? 0}d</div>
              <div>Good</div>
            </div>
            <div className="flex-1 bg-yellow-100 text-yellow-700 rounded-md px-1 py-1 text-center">
              <div className="font-bold">{safe.normalSleepDays ?? 0}d</div>
              <div>Normal</div>
            </div>
            <div className="flex-1 bg-pink-100 text-[#ff3381] rounded-md px-1 py-1 text-center">
              <div className="font-bold">{safe.poorSleepDays ?? 0}d</div>
              <div>Poor</div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground pt-1 border-t">
            <span className="flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> {(safe.minSleepHours ?? "00:00").slice(0, 5)}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {(safe.maxSleepHours ?? "00:00").slice(0, 5)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {safe.totalRecords ?? 0} records
            </span>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}