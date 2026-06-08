import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useTranslation } from "react-i18next";
import i18next from "i18next";

type ChartItem = {
  date: string;
  value?: number;
};

type Props = {
  title: string;
  data: ChartItem[];
};

const formatChartData = (
  data: ChartItem[],
  locale: string
) => {
  return data.map((item) => ({
    ...item,
    shortDate: new Date(item.date).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
      month: "short",
      day: "numeric",
    }),
  }));
};

function SimpleChartCard({
  title,
  data,
}: Props) {
  const { t } = useTranslation();
  const currentLanguage = i18next?.language ?? "en";

  if (!data?.length) return null;

  const formattedData = formatChartData(data, currentLanguage);

  return (
    <Card className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      {/* Header */}
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-semibold">
          {t(title)}
        </CardTitle>

        <p className="text-xs text-gray-500">
          {t("Track your child's progress over time")}
        </p>
      </CardHeader>

      {/* Chart */}
      <CardContent className="h-80 pt-6">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <ComposedChart
            data={formattedData}
            margin={{
              top: 20,
              right: 20,
              left: -10,
              bottom: 10,
            }}
          >
            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />

            {/* X */}
            <XAxis
              dataKey="shortDate"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#9ca3af",
              }}
            />

            {/* Y */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#9ca3af",
              }}
              domain={[
                "dataMin - 2",
                "dataMax + 2",
              ]}
            />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.08)",
                padding: "10px",
              }}
            />

            {/* Child Line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ff3381"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#ff3381",
                strokeWidth: 2,
                stroke: "#fff",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>

      {/* Legend */}
      <div className="flex items-center justify-center border-t border-gray-100 px-6 pb-5 pt-4">
        <div className="flex items-center gap-2">
          <div className="h-0.75 w-4 rounded-full bg-[#ff3381]" />

          <span className="text-[11px] font-medium text-gray-500">
            {t("Child Progress")}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default SimpleChartCard;