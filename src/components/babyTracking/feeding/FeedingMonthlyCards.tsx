import { Utensils, Calendar, TrendingUp, BarChart2 } from "lucide-react";



const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; dot: string; emoji: string }
> = {
  Good: {
    label: "Good",
    color: "text-green-600",
    bg: "bg-green-100",
    dot: "bg-green-500",
    emoji: "✅",
  },
  Normal: {
    label: "Normal",
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    dot: "bg-yellow-500",
    emoji: "🟡",
  },
  Under: {
    label: "Under",
    color: "text-orange-600",
    bg: "bg-orange-100",
    dot: "bg-orange-400",
    emoji: "⚠️",
  },
  SevereUnder: {
    label: "Severe Under",
    color: "text-[#ff3381]",
    bg: "bg-pink-100",
    dot: "bg-[#ff3381]",
    emoji: "🚨",
  },
  Obese: {
    label: "Obese",
    color: "text-blue-600",
    bg: "bg-blue-100",
    dot: "bg-blue-500",
    emoji: "📈",
  },
};

export default function FeedingMonthlyCards({ data }:any) {
  if (!data) return null;
  const dominant = data.dominantStatus as string;
  const dominantConfig = statusConfig[dominant] ?? statusConfig.Normal;
  const distribution = data.feedingTypeDistribution as Record<string, number>;
  const total = Object.values(distribution).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <p>Monthly Summary</p>
        </div>
        <span className="text-xs text-muted-foreground">{data.monthName}</span>
      </div>

      {/* Quick Stats Row */}
      <div className="flex gap-2">
        <div className="flex-1 bg-gray-100 rounded-xl px-3 py-2 text-center">
          <p className="text-lg font-bold">{data.totalRecords}</p>
          <p className="text-xs text-muted-foreground">Records</p>
        </div>
        <div className="flex-1 bg-gray-100 rounded-xl px-3 py-2 text-center">
          <p className="text-lg font-bold">
            {data.averageTimesPerDay}
            <span className="text-xs font-normal">/day</span>
          </p>
          <p className="text-xs text-muted-foreground">Avg Feedings</p>
        </div>
        <div
          className={`flex-1 rounded-xl px-3 py-2 text-center ${dominantConfig.bg}`}
        >
          <p className={`text-lg font-bold ${dominantConfig.color}`}>
            {dominantConfig.emoji}
          </p>
          <p className={`text-xs font-medium ${dominantConfig.color}`}>
            {dominantConfig.label}
          </p>
        </div>
      </div>

      {/* Distribution */}
      <div className="bg-gray-100 rounded-xl px-4 py-3 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
          <BarChart2 className="w-3 h-3" /> Feeding Quality This Month
        </p>
        {Object.entries(distribution).map(([key, count]) => {
          const cfg = statusConfig[key] ?? statusConfig.Normal;
          const pct = Math.round((count / total) * 100);
          return (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span
                  className={`flex items-center gap-1.5 font-medium ${cfg.color}`}
                >
                  <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </span>
                <span className="text-muted-foreground">
                  {count} records · {pct}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${cfg.dot}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
