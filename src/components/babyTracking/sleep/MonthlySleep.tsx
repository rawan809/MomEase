import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// TYPES

type DailySleep = {
  date: string;
  sleepHours: string | null;
  status: "Good" | "Normal" | "Poor" | "Unknown";
};

type MonthlySleepData = {
  year: number;
  month: number;
  monthName: string;
  dailySleep: DailySleep[];
  monthlyAverageSleep: string;
  totalRecords: number;
  goodDays: number;
  poorDays: number;
};

// HELPERS

const getDayNumber = (date: string) => new Date(date).getDate();

// COMPONENT

export default function MonthlySleep({
  monthlyData,
}: {
  monthlyData: MonthlySleepData | null;
}) {
  if (!monthlyData) {
    return (
      <Card className="bg-gray-100">
        <CardContent className="h-50 flex items-center justify-center text-gray-500">
          No monthly data available
        </CardContent>
      </Card>
    );
  }

  const safeDays = monthlyData.dailySleep ?? [];

  return (
    <div className="space-y-6">

      {/* MONTH SUMMARY */}
      <Card className="rounded-xl shadow-sm border bg-white border-primary hover:shadow-md transition-all">
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Calendar />
            <h3 className="font-semibold">
              {monthlyData.monthName} {monthlyData.year}
            </h3>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Monthly overview</span>

            <span className="bg-[#ffc8dd] px-3 py-1 rounded-xl text-sm">
              {monthlyData.totalRecords ?? 0} records
            </span>
          </div>

          <div className="text-sm text-gray-700">
            Monthly Average:{" "}
            <span className="font-semibold">
              {monthlyData.monthlyAverageSleep ?? "0h"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* GRID */}
      <Card className="rounded-xl shadow-sm border bg-white border-primary hover:shadow-md transition-all">
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-[#ff3381]">Monthly Tracking</h3>

          <div className="grid grid-cols-7 gap-2">
            {safeDays.length ? (
              safeDays.map((day, index) => {
                const hasData = !!day.sleepHours;

                return (
                  <div
                    key={index}
                    className={cn(
                      "h-16 rounded-xl border flex flex-col items-center justify-center text-xs",
                      hasData
                        ? "bg-[#ffc8dd] border-transparent"
                        : "bg-gray-50 text-gray-400",
                    )}
                  >
                    <span className="text-[10px]">
                      {getDayNumber(day.date)}
                    </span>

                    {hasData ? (
                      <>
                        <p className="text-[10px] font-semibold">
                          {day.sleepHours?.slice(0, 5)}
                        </p>
                        <p className="text-[10px] font-semibold">
                          {day.status}
                        </p>
                      </>
                    ) : (
                      <span className="text-[10px]">No data</span>
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
            {monthlyData.totalRecords === 0
              ? "No sleep records this month. Start tracking daily sleep."
              : monthlyData.totalRecords < 5
                ? "Limited sleep tracking this month. More data improves insights."
                : "Great consistency this month! Sleep tracking looks good."}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}