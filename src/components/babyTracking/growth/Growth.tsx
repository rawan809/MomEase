"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { GrowthTrendsChart } from "./GrowthCharts";
import GrowthAddRecord from "./GrowthAddRecord";
import GrowthStatistics from "./GrowthStatistics";
import WeeklyGrowth from "./WeeklyGrowth";
import MonthlyGrowth from "./MonthlyGrowth";
import { useChild } from "@/contexts/ChildContext";
import { useGrowth } from "@/hooks/useGrowth";
import GrowthHistoryCard from "./GrowthHistoryCard";
import LoadingState from "@/components/UI/LoadingState";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

function Growth() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const { selectedChildId } = useChild();
  const {
    records,
    loading,
    addRecord,
    editRecord,
    deleteRecord,
    statistics,
    weeklyData,
    monthlyData,
    chartData,
    fetchRecords,
    fetchStatistics,
    fetchWeekly,
    fetchMonthly,
    fetchChart,
  } = useGrowth(selectedChildId);

  useEffect(() => {
    fetchRecords();
    fetchStatistics();
    fetchWeekly();
    fetchMonthly();
    fetchChart();
  }, [language]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-gray-400 text-sm">
        <LoadingState />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-end flex-wrap gap-3">
        <div>
          <p className="text-xl font-semibold">{t("Growth")}</p>
          <p className="text-sm text-gray-500">
            {t("Track and analyze your baby's Growth")}
          </p>
        </div>
        <GrowthAddRecord addRecord={addRecord} />
      </div>

      <div className="mt-5">
        <GrowthTrendsChart growthData={chartData} />
      </div>

      <div className="mt-5">
        <p className="text-xl font-semibold mb-5">{t("Growth statistics")}</p>
        <GrowthStatistics data={statistics} />
      </div>

      <div className="mt-5">
        <p className="text-xl font-semibold mb-5">
          {t("Weekly & Monthly growth")}
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
            <WeeklyGrowth weeklyData={weeklyData} />
          </TabsContent>
          <TabsContent value="month">
            <MonthlyGrowth monthlyData={monthlyData} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-5">
        <div>
          <p className="text-xl font-semibold">{t("Recent Records")}</p>
          <p className="text-sm text-gray-500">
            {t("View and manage growth history")}
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
