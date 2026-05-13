import {
  ArrowUp,
  ArrowDown,
  Minus,
  Scale,
  Ruler,
  Activity,
  HeartPulse,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

//  TYPES

type GrowthStatisticsData = {
  totalRecords: number;
  averageWeight: number;
  maxWeight: number;
  minWeight: number;
  weightGainTotal: number;
  monthlyWeightGainAverage: number;

  averageHeight: number;
  maxHeight: number;
  minHeight: number;
  heightGainTotal: number;
  monthlyHeightGainAverage: number;

  currentGrowthStatus: "Normal" | "Less" | "More" | string;
  weightTrend: "Increasing" | "Decreasing" | "Stable" | string;
  heightTrend: "Increasing" | "Decreasing" | "Stable" | string;
};

//  HELPERS

const getTrendIcon = (trend: string) => {
  if (trend === "Increasing") return <ArrowUp className="text-green-500" />;
  if (trend === "Decreasing") return <ArrowDown className="text-red-500" />;
  return <Minus className="text-gray-400" />;
};

const getStatusColor = (status: string) => {
  if (status === "Normal")
    return <div className="text-2xl font-bold text-green-500">{status}</div>;

  if (status === "Less")
    return <div className="text-2xl font-bold text-red-500">{status}</div>;

  if (status === "More")
    return <div className="text-2xl font-bold text-blue-500">{status}</div>;

  return <div className="text-2xl font-bold text-gray-400">{status}</div>;
};

//  COMPONENT

export default function GrowthStatistics({
  data,
}: {
  data: GrowthStatisticsData | null;
}) {
  //  لو مفيش داتا
  if (!data) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card className="col-span-full bg-gray-100">
          <CardContent className="h-37.5 flex items-center justify-center text-gray-500">
            No statistics available yet
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* Weight */}
      <Card className="rounded-xl hover:shadow-md transition-all border bg-gray-100">
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Scale />
            <h3 className="font-semibold">Weight</h3>
          </div>

          <div className="flex items-end justify-between">
            <span className="text-sm md:text-base">
              Monthly Avg Gain:
              <span className="font-semibold ml-1">
                {data.monthlyWeightGainAverage.toFixed(2) ?? 0} kg
              </span>
            </span>

            {getTrendIcon(data.weightTrend)}
          </div>
        </CardContent>
      </Card>

      {/* Height */}
      <Card className="rounded-xl hover:shadow-md transition-all border bg-gray-100">
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Ruler />
            <h3 className="font-semibold">Height</h3>
          </div>

          <div className="flex items-end justify-between">
            <span className="text-sm md:text-base">
              Monthly Avg Gain:
              <span className="font-semibold ml-1">
                {data.monthlyHeightGainAverage.toFixed(2) ?? 0} cm
              </span>
            </span>

            {/*  FIX هنا */}
            {getTrendIcon(data.heightTrend)}
          </div>
        </CardContent>
      </Card>

      {/* Growth Status */}
      <Card className="rounded-xl hover:shadow-md transition-all border bg-gray-100">
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <HeartPulse />
            <h3 className="font-semibold">Growth Status</h3>
          </div>

          {/*  استخدمنا helper */}
          {getStatusColor(data.currentGrowthStatus)}

          <div className="text-sm text-gray-500">Based on latest records</div>

          <div className="bg-gray-100 p-2 rounded-xl text-sm">
            Total Records: {data.totalRecords ?? 0}
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="rounded-xl hover:shadow-md transition-all border bg-gray-100">
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-[#ff3381]">
            <Activity />
            <h3 className="font-semibold">Progress</h3>
          </div>

          <div className="flex justify-between text-sm">
            <span>Weight Gain</span>
            <span className="font-semibold">
              {data.weightGainTotal ?? 0} kg
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Height Gain</span>
            <span className="font-semibold">
              {data.heightGainTotal ?? 0} cm
            </span>
          </div>

          <div className="bg-[#ffc8dd] p-2 rounded-xl text-sm">
            {data.weightTrend === "Increasing" &&
            data.heightTrend === "Increasing"
              ? "Healthy growth pattern"
              : "Monitor growth closely"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
