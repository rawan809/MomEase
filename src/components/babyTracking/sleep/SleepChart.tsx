"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

type Status = "Good" | "Normal" | "Poor" | "Unknown";

const statusColor: Record<Status, string> = {
  Good: "#22c55e",
  Normal: "#facc15",
  Poor: "#ef4444",
  Unknown: "#9ca3af",
};

type SleepDay = {
  date: string;
  sleepHours: string | null;
  status: Status;
};

type SleepData = {
  dailySleep?: SleepDay[];
  weeklyAverageSleep?: string;
};

function convertToHours(time: string | null) {
  if (!time) return 0;
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
}

export default function SleepChart({ data }: { data?: SleepData }) {
  const safeData = data?.dailySleep ?? [];

  const chartData = safeData.map((d) => ({
    day: new Date(d.date).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    hours: convertToHours(d.sleepHours),
    status: d.status,
  }));
  const weeklyAvg = convertToHours(data?.weeklyAverageSleep ?? null);

  return (
    <Card className="bg-gray-100 rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl">Sleep Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">
              {weeklyAvg ? `${weeklyAvg.toFixed(1)}h` : "0h"}
            </p>
            <p className="text-sm text-gray-600">weekly average</p>
          </div>
        </div>

        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="day" stroke="#888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#ff3381"
                strokeWidth={3}
                dot={{ r: 4, fill: "#ffc8dd" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
