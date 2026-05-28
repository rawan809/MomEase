import { WeeklyFeedingChart } from "./FeadingCharts";
import AddFeadingRecord from "./AddFeadingRecord";
import FeedingHistoryCard from "./FeedingHistoryCard";
import { useFeeding } from "@/hooks/useFeeding";
import { useChild } from "@/contexts/ChildContext";
import FeedingStatisticsCards from "./FeedingStatisticsCards";
// import FeedingMonthlyCards from "./FeedingMonthlyCards";

function Feeding() {
  const { selectedChildId } = useChild();
  const {
    records,
    // loading,
    addRecord,
    weeklyData,
    statistics,
    // monthlyData,
    deleteRecord,
    editRecord,
  } = useFeeding(selectedChildId);

  return (
    <div className="">
      <div className="flex justify-between items-end flex-wrap gap-3">
        <div>
          <p className="text-xl font-semibold">Feeding </p>
          <p className="text-sm text-gray-500">
            Track and analyze your baby's feeding Patters
          </p>
        </div>
        <AddFeadingRecord onSubmit={addRecord} mode="add" />
      </div>
      <div className="mt-5">
        <WeeklyFeedingChart weeklyData={weeklyData} />
      </div>
      <div className="mt-5">
        <p className="text-xl font-semibold mb-5">Feeding Statistics </p>
        <FeedingStatisticsCards data={statistics} />
      </div>
      <div className="mt-5">
        {/* <FeedingMonthlyCards data={monthlyData} /> */}
      </div>
      <div className="mt-5">
        <div>
          <p className="text-xl font-semibold">Recent Records </p>
          <p className="text-sm text-gray-500">
            View and manage feeding history
          </p>
        </div>
        <div className="mt-3 space-y-3">
          {records.map((record) => (
            <FeedingHistoryCard
              key={record.recordId}
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

export default Feeding;
