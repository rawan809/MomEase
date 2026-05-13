import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// TYPES

type DailySleep = {
  date: string;
  sleepHours: string | null;
  status: "Good" | "Normal" | "Poor" | "Unknown";
};

type WeeklySleepData = {
  weekStart: string;
  weekEnd: string;
  dailySleep: DailySleep[];
  weeklyAverageSleep: string;
  totalRecords: number;
};

// HELPERS

const getDayName = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { weekday: "short" });

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

// COMPONENT

export default function WeeklySleep({
  weeklyData,
}: {
  weeklyData: WeeklySleepData | null;
}) {
  if (!weeklyData) {
    return (
      <Card className="bg-gray-100">
        <CardContent className="h-40 flex items-center justify-center text-gray-500">
          No weekly data available
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
            <h3 className="font-semibold">This Week</h3>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {formatDate(weeklyData.weekStart)} →{" "}
              {formatDate(weeklyData.weekEnd)}
            </div>

            <div className="bg-[#ffc8dd] px-3 py-1 rounded-xl text-sm">
              {weeklyData.totalRecords ?? 0} records
            </div>
          </div>

          <div className="text-sm text-gray-700">
            Weekly Average:{" "}
            <span className="font-semibold">
              {weeklyData.weeklyAverageSleep ?? "0h"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* DAILY GRID */}
      <Card className="rounded-xl shadow-sm border bg-white border-primary hover:shadow-md transition-all">
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-[#ff3381]">Daily Tracking</h3>

          <div className="grid grid-cols-7 gap-2">
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
                    <div className="text-xs mb-1">
                      {getDayName(day.date)}
                    </div>

                    {hasData ? (
                      <>
                        <div className="text-xs font-semibold">
                          {day.sleepHours?.slice(0, 5)}
                        </div>
                        <div className="text-[10px]">
                          {day.status}
                        </div>
                      </>
                    ) : (
                      <div className="text-[10px]">No data</div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="col-span-7 text-center text-gray-500 py-5">
                No daily sleep data
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
              ? "No sleep records this week. Start tracking daily sleep."
              : weeklyData.totalRecords < 3
                ? "Few sleep records this week. More tracking improves insights."
                : "Great tracking this week! Keep it up."}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}