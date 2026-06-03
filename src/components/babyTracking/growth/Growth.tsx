import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GrowthTrendsChart } from "./GrowthCharts";
import GrowthAddRecord from "./GrowthAddRecord";
import GrowthStatistics from "./GrowthStatistics";
import WeeklyGrowth from "./WeeklyGrowth";
import MonthlyGrowth from "./MonthlyGrowth";
import { useChild } from "@/contexts/ChildContext";
import { useGrowth } from "@/hooks/useGrowth";
import GrowthHistoryCard from "./GrowthHistoryCard";

function Growth() {
  const { selectedChildId } = useChild();
  const {
    records,
    // loading,
    addRecord,
    editRecord,
    deleteRecord,
    statistics,
    weeklyData,
    monthlyData,
    chartData,
  } = useGrowth(selectedChildId);

  return (
    <div>
      <div className="flex justify-between items-end flex-wrap gap-3">
        <div>
          <p className="text-xl font-semibold">Growth </p>
          <p className="text-sm text-gray-500">
            Track and analyze your baby's Growth
          </p>
        </div>
        <GrowthAddRecord addRecord={addRecord} />
      </div>
      <div className="mt-5">
        {" "}
        <GrowthTrendsChart growthData={chartData} />
      </div>
      <div className="mt-5">
        <p className="text-xl font-semibold mb-5">Growth statistics</p>
        <GrowthStatistics data={statistics} />
      </div>
      <div className="mt-5">
        <p className="text-xl font-semibold mb-5"> Weekly & Monthly growth</p>
        <Tabs defaultValue="week">
          <TabsList className="bg-gray-100 p-4 rounded-xl mb-3">
            <TabsTrigger value="week" className="p-3">
              Weekly
            </TabsTrigger>
            <TabsTrigger value="month" className="p-3">
              Monthly
            </TabsTrigger>
          </TabsList>
          <TabsContent value="week">
            <WeeklyGrowth weeklyData={weeklyData} />
          </TabsContent>
          <TabsContent value="month">
            <MonthlyGrowth monthlyData={monthlyData} />
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-5">
        <div>
          <p className="text-xl font-semibold">Recent Records </p>
          <p className="text-sm text-gray-500">
            View and manage feeding history
          </p>
          <div className="mt-3 space-y-3">
            {records.map((record) => (
              <GrowthHistoryCard
                key={record.growthId}
                data={record}
                onDelete={deleteRecord}
                onEdit={editRecord}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Growth;
