"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ChartConfig } from "@/components/ui/chart";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslation } from "react-i18next";

// الألوان المطلوبة
const COLORS = {
  primary: "#ff3381",
  accent: "#ffc8dd",
  muted: "#fce4ec",
};

/* 1. Weekly Feeding Trend Chart (Bar Chart)*/
export function WeeklyFeedingChart({ weeklyData }: { weeklyData: any }) {
  const { t, i18n } = useTranslation();

  const chartData =
    weeklyData?.dailyRecords?.map((record: any) => ({
      // تم التحسين: استخدام لغة التطبيق الحالية i18n.language لترجمة الأيام تلقائياً
      day: new Intl.DateTimeFormat(i18n.language, {
        weekday: "short",
      }).format(new Date(record.date)),
      times:
        record.records?.reduce(
          (sum: number, item: any) => sum + item.timesPerDay,
          0,
        ) || 0,
    })) || [];

  const chartConfig = {
    times: {
      label: t("Times per Day"),
      color: COLORS.primary,
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full bg-gray-100 gap-1 h-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-8 flex-wrap gap-4">
        <div className="grid gap-1">
          <CardTitle className="font-bold">{t("Weekly Feeding Trend")}</CardTitle>

          <CardDescription>{t("Last 7 days feeding times per day")}</CardDescription>
        </div>

        <div className="rounded-xl bg-accent/20 px-3 py-1 text-sm font-medium text-[#ff3381]">
          {t("Weekly Avg")}:{" "}
          <span className="font-bold">
            {weeklyData?.weeklyAverage || 0} {t("times/day")}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-70 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                strokeOpacity={0.4}
              />

              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, "dataMax + 2"]}
              />

              <ChartTooltip content={<ChartTooltipContent hideLabel />} />

              {/* خط المتوسط */}
              <ReferenceLine
                y={weeklyData?.weeklyAverage || 0}
                stroke={COLORS.primary}
                strokeDasharray="3 3"
                label={{
                  position: "right",
                  value: t("Avg"),
                  fill: COLORS.primary,
                  fontSize: 12,
                }}
              />

              <Bar
                dataKey="times"
                radius={[4, 4, 0, 0]}
                fill="var(--color-times)"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}