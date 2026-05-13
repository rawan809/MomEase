import AddSleepRecord from "./AddSleepRecord";
import SleepChart from "./SleepChart";
import SleepStatistics from "./SleepStatistics";
import { useSleep } from "@/hooks/useSleep";
import { useChild } from "@/contexts/ChildContext";
import SleepHistoryCard from "./SleepHistoryCard";
import WeeklySleep from "./WeeklySleep";
import MonthlySleep from "./MonthlySleep";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Sleep() {
  const { selectedChildId } = useChild();
  const {
    records,
    loading,
    addRecord,
    editRecord,
    deleteRecord,
    fetchRecords,
    statistics,
    weeklyData,
    monthlyData,
  } = useSleep(selectedChildId);

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-end flex-wrap gap-3">
        <div>
          <p className="text-xl font-semibold">Sleep </p>
          <p className="text-sm text-gray-500">
            Track and analyze your baby's sleep patterns to ensure they get the
            rest they need.
          </p>
        </div>
        <AddSleepRecord addRecord={addRecord} />
      </div>
      <div>
        <SleepChart data={weeklyData} />
      </div>
      <div>
        <p className="text-xl font-semibold mb-3">Sleep Statistics</p>
        <SleepStatistics data={statistics} />
      </div>
      <div >
        <p className="text-xl font-semibold mb-5"> Weekly & Monthly sleep</p>
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
            <WeeklySleep weeklyData={weeklyData} />
          </TabsContent>
          <TabsContent value="month">
            <MonthlySleep monthlyData={monthlyData}/>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <p className="text-xl font-semibold mb-3">Recent Records</p>
        <p className="text-sm text-gray-500">View and manage feeding history</p>
        <div className="mt-3 space-y-3">
          {records.map((record) => (
            <SleepHistoryCard
              data={record}
              onDelete={deleteRecord}
              onEdit={editRecord}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sleep;
