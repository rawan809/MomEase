import { useEffect, useState } from "react";
import {
  GetGrowthRecords,
  AddGrowthRecord,
  EditGrowthRecord,
  DeleteGrowthRecord,
  GetGrowthChart,
  GetGrowthStatistics,
  GetGrowthWeekly,
  GetGrowthMonthly,
} from "../../services/growth";

type GrowthRecord = {
  growthId?: number;
  recordDate?: string;
  ageInWeeks?: number;
  ageInMonths?: number;
  weightKg: number;
  heightCm: number;
};

export function useGrowth(childId: number | null) {
  const [records, setRecords] = useState<GrowthRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const [statistics, setStatistics] = useState<any>(null);
  const [weeklyData, setWeeklyData] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);

  //FETCH

  const fetchRecords = async () => {
    if (!childId) return;
    setLoading(true);

    try {
      const res = await GetGrowthRecords(childId);
      setRecords(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    if (!childId) return;
    try {
      const res = await GetGrowthStatistics(childId);
      setStatistics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWeekly = async () => {
    if (!childId) return;
    try {
      const res = await GetGrowthWeekly(childId);
      setWeeklyData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMonthly = async () => {
    if (!childId) return;
    try {
      const res = await GetGrowthMonthly(childId);
      setMonthlyData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChart = async () => {
    if (!childId) return;
    try {
      const res = await GetGrowthChart(childId);
      setChartData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchStatistics();
    fetchWeekly();
    fetchMonthly();
    fetchChart();
  }, [childId]);

  const refreshAnalytics = () => {
    fetchStatistics();
    fetchWeekly();
    fetchMonthly();
    fetchChart();
  };

  //  CRUD

  const addRecord = async (data: { weightKg: number; heightCm: number }) => {
    if (!childId) return;

    try {
      const res = await AddGrowthRecord(childId, data);
      console.log(res);
      if (!res.success) {
        throw new Error(res.message);
      }

      setRecords((prev) => [res.data, ...prev]);
      refreshAnalytics();
    } catch (err: any) {
      console.log(err);
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  };

  const editRecord = async (
    id: number,
    data: { weightKg: number; heightCm: number },
  ) => {
    if (!childId) return;

    try {
      const res = await EditGrowthRecord(childId, data, id);

      if (!res.success) {
        throw new Error(res.message);
      }

      setRecords((prev) =>
        prev.map((item) =>
          item.growthId === id ? { ...item, ...data } : item,
        ),
      );

      refreshAnalytics();
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  };

  const deleteRecord = async (id: number) => {
    if (!childId) return;

    try {
      const res = await DeleteGrowthRecord(childId, id);

      if (!res.success) {
        throw new Error(res.message);
      }

      setRecords((prev) => prev.filter((item) => item.growthId !== id));

      refreshAnalytics();
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  };

  //  RETURN

  return {
    records,
    loading,

    // CRUD
    addRecord,
    editRecord,
    deleteRecord,
    fetchRecords,

    // analytics
    statistics,
    weeklyData,
    monthlyData,
    chartData,
  };
}
