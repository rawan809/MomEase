import AddSleepRecord from "./AddSleepRecord";
import SleepChart from "./SleepChart";
import SleepStatistics from "./SleepStatistics";
import { useSleep } from "@/hooks/useSleep";
import { useChild } from "@/contexts/ChildContext";
import SleepHistoryCard from "./SleepHistoryCard";
import WeeklySleep from "./WeeklySleep";
import MonthlySleep from "./MonthlySleep";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingState from "@/components/ui/LoadingState";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

function Sleep() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { selectedChildId } = useChild();
  const {
    records,
    loading,
    addRecord,
    editRecord,
    deleteRecord,
    fetchRecords,
    fetchStatistics,
    fetchWeekly,
    fetchMonthly,
    statistics,
    weeklyData,
    monthlyData,
  } = useSleep(selectedChildId);

  useEffect(() => {
    fetchMonthly();
    fetchRecords();
    fetchStatistics();
    fetchWeekly();
  }, [language]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-gray-400 text-sm">
        <LoadingState />
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-end flex-wrap gap-3">
        <div>
          <p className="text-xl font-semibold">{t("Sleep")}</p>
          <p className="text-sm text-gray-500">
            {t(
              "Track and analyze your baby's sleep patterns to ensure they get the rest they need.",
            )}
          </p>
        </div>
        <AddSleepRecord addRecord={addRecord} />
      </div>
      <div>
        <SleepChart data={weeklyData} />
      </div>
      <div>
        <p className="text-xl font-semibold mb-3">{t("Sleep Statistics")}</p>
        <SleepStatistics data={statistics} />
      </div>
      <div>
        <p className="text-xl font-semibold mb-5">
          {t("Weekly & Monthly sleep")}
        </p>
        <Tabs defaultValue="week">
          <TabsList className="bg-gray-100 p-4 rounded-xl mb-3">
            <TabsTrigger value="week" className="p-3">
              {t("Weekly")}
            </TabsTrigger>
            <TabsTrigger value="month" className="p-3">
              {t("Monthly")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="week">
            <WeeklySleep weeklyData={weeklyData} />
          </TabsContent>
          <TabsContent value="month">
            <MonthlySleep monthlyData={monthlyData} />
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <p className="text-xl font-semibold mb-3">{t("Recent Records")}</p>
        {/* ملاحظة: النص الإنجليزي الأصلي كان مكتوب فيه feeding history، احتفظت به كما هو لتترجمه براحتك */}
        <p className="text-sm text-gray-500">
          {t("View and manage feeding history")}
        </p>
        <div className="mt-3 space-y-3">
          {records.map((record) => (
            <SleepHistoryCard
              key={record.recordId}
              data={record as any}
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
