import { useEffect, useState } from "react";
import {
  AddSleepRecord,
  GetSleepRecords,
  EditSleepRecord,
  DeleteSleepRecord,
  GetSleepStatistics,
  GetSleepWeekly,
  GetSleepMonthly,
} from "../../services/sleep";

type SleepRecord = {
  recordId: number;
  childId: number;
  childName: string;
  sleepDate: string;
  sleepHoursTotal: string;
  sleepHoursTotalFormatted: string;
  notes: string;
  status: "Good" | "Normal" | "Poor" | "Unknown";
};
export function useSleep(childId: number | null) {
  const [records, setRecords] = useState<SleepRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const [statistics, setStatistics] = useState<any>(null);
  const [weeklyData, setWeeklyData] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any>(null);

  //  FETCH

  const fetchRecords = async () => {
    if (!childId) return;
    setLoading(true);

    try {
      const res = await GetSleepRecords(childId);
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
      const res = await GetSleepStatistics(childId);
      setStatistics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWeekly = async () => {
    if (!childId) return;
    try {
      const res = await GetSleepWeekly(childId);
      setWeeklyData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMonthly = async () => {
    if (!childId) return;
    try {
      const res = await GetSleepMonthly(childId);
      setMonthlyData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchStatistics();
    fetchWeekly();
    fetchMonthly();
  }, [childId]);

  const refreshAnalytics = () => {
    fetchStatistics();
    fetchWeekly();
    fetchMonthly();
  };

  //  CRUD

  const addRecord = async (data: {
    sleepDate: string;
    sleepStartTime: string;
    sleepEndTime: string;
    quality: string;
    notes: string;
  }) => {
    if (!childId) return;

    try {
      const res = await AddSleepRecord(childId, data);

      if (!res.success) {
        throw new Error(res.message);
      }

      setRecords((prev) => [res.data, ...prev]);
      refreshAnalytics();
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  };

  const editRecord = async (
    id: number,
    data: {
      sleepDate: string;
      sleepStartTime: string;
      sleepEndTime: string;
      quality?: string;
      notes: string;
    },
  ) => {
    if (!childId) return;

    try {
      const res = await EditSleepRecord(childId, data, id);

      if (!res.success) {
        throw new Error(res.message);
      }

      setRecords((prev) =>
        prev.map((item) =>
          item.recordId === id ? { ...item, ...data } : item,
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
      const res = await DeleteSleepRecord(childId, id);

      if (!res.success) {
        throw new Error(res.message);
      }

      setRecords((prev) => prev.filter((item) => item.recordId !== id));
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
    fetchStatistics,
    fetchWeekly,
    fetchMonthly,

    // analytics
    statistics,
    weeklyData,
    monthlyData,
  };
}
