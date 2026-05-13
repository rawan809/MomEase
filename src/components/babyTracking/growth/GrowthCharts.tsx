import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Ruler, Scale, Activity } from "lucide-react";

const COLORS = {
  primary: "#ff3381",
  blue: "#3b82f6",
};

//  TYPES

type GrowthPoint = {
  date: string;
  ageInWeeks: number;
  value: number;
};

type GrowthChartData = {
  childName: string;
  weightData: GrowthPoint[];
  heightData: GrowthPoint[];
};

//  COMPONENT

export function GrowthTrendsChart({
  growthData,
}: {
  growthData: GrowthChartData | null;
}) {
  if (
    !growthData ||
    (!growthData.weightData?.length && !growthData.heightData?.length)
  ) {
    return (
      <Card className="w-full bg-gray-100">
        <CardContent className="flex items-center justify-center h-75 text-gray-500">
          No growth data available yet
        </CardContent>
      </Card>
    );
  }

  //  PREPARE DATA

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(date));

  const weightPoints = growthData.weightData.map((d) => ({
    date: formatDate(d.date),
    weight: d.value,
  }));

  const heightPoints = growthData.heightData.map((d) => ({
    date: formatDate(d.date),
    height: d.value,
  }));

  const map = new Map<
    string,
    { date: string; weight?: number; height?: number }
  >();

  weightPoints.forEach((p) => {
    map.set(p.date, { ...map.get(p.date), date: p.date, weight: p.weight });
  });

  heightPoints.forEach((p) => {
    map.set(p.date, { ...map.get(p.date), date: p.date, height: p.height });
  });

  const combinedData = Array.from(map.values());

  const chartConfig = {
    weight: { label: "Weight (kg)", color: COLORS.blue },
    height: { label: "Height (cm)", color: COLORS.primary },
  } satisfies ChartConfig;

  //  UI

  return (
    <Card className="w-full border-none shadow-sm bg-gray-100">
      <Tabs defaultValue="weight" className="w-full">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6">
          <div>
            <CardTitle className="text-xl font-bold">Growth Trends</CardTitle>
            <CardDescription>Track weight and height over time</CardDescription>
          </div>

          <TabsList className="bg-slate-100 p-1">
            <TabsTrigger value="weight" className="gap-2">
              <Scale className="h-4 w-4" /> Weight
            </TabsTrigger>
            <TabsTrigger value="height" className="gap-2">
              <Ruler className="h-4 w-4" /> Height
            </TabsTrigger>
            <TabsTrigger value="combined" className="gap-2">
              <Activity className="h-4 w-4" /> Combined
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent>
          {/* Weight */}
          <TabsContent value="weight">
            <GrowthLineChart
              data={weightPoints}
              dataKey="weight"
              color={COLORS.blue}
              unit="kg"
              config={chartConfig}
            />
          </TabsContent>

          {/* Height */}
          <TabsContent value="height">
            <GrowthLineChart
              data={heightPoints}
              dataKey="height"
              color={COLORS.primary}
              unit="cm"
              config={chartConfig}
            />
          </TabsContent>

          {/* Combined */}
          <TabsContent value="combined">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />

                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke={COLORS.blue}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                <Line
                  type="monotone"
                  dataKey="height"
                  stroke={COLORS.primary}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}

//  SUB COMPONENT

type LineChartProps = {
  data: { date: string; [key: string]: number | string }[];
  dataKey: string;
  color: string;
  unit: string;
  config: ChartConfig;
};

function GrowthLineChart({
  data,
  dataKey,
  color,
  unit,
  config,
}: LineChartProps) {
  if (!data?.length) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        No data
      </div>
    );
  }

  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
        <XAxis dataKey="date" />
        <YAxis
          label={{
            value: unit,
            angle: -90,
            position: "insideLeft",
          }}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />

        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={3}
          dot={{ r: 5 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
