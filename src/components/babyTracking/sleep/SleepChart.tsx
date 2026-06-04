"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

type SleepDay = {
  date: string;
  sleepHours: string | null;
  sleepHoursFormatted: string;
};

type SleepData = {
  dailySleep?: SleepDay[];
  weeklyAverageSleep?: string;
  weeklyAverageSleepFormatted?: string;
  sleepHoursFormatted?: string;
};

function convertToHours(time: string | null) {
  if (!time) return 0;

  const [h, m, s] = time.split(":").map(Number);

  return h + m / 60 + s / 3600;
}

export default function SleepChart({ data }: { data?: SleepData }) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const safeData = data?.dailySleep ?? [];

  const chartData = safeData.map((d) => ({
    day: new Date(d.date).toLocaleDateString(
      language === "ar" ? "ar-EG" : "en-US",
      {
        weekday: "short",
      },
    ),
    hours: convertToHours(d.sleepHours),
    formatted: d.sleepHoursFormatted,
  }));
  const weeklyAvg = data?.weeklyAverageSleepFormatted;

  return (
    <Card className="bg-gray-100 rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl">{t("Sleep Overview")}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">
              {/* {data.weeklyAverageSleepFormatted} */}
              {weeklyAvg}
            </p>
            <p className="text-sm text-gray-600">{t("weekly average")}</p>
          </div>
        </div>

        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="day" stroke="#888" />

              <Tooltip formatter={(_, __, item) => item.payload.formatted} />

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
