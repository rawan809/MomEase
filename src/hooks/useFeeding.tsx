import { useEffect, useState } from "react";
import {
  GetFeedingRecords,
  AddFeedingRecord,
  EditFeedingRecord,
  DeleteFeedingRecord,
  GetFeedingStatistics,
  GetFeedingWeekly,
  GetFeedingMonthly,
} from "../../services/feeding";

type FeedingRecord = {
  recordId?: number;
  feedingDate: string;
  feedingTimesPerDay: number;
  feedingTypeForBaby: string;
  feedingType?: string;
  notes: string;
  referenceInfo?: any;
};

export function useFeeding(childId: number | null) {
  const [records, setRecords] = useState<FeedingRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<any>(null);
  const [weeklyData, setWeeklyData] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any>(null);

  //  fetch data
  const fetchRecords = async () => {
    if (!childId) return;
    setLoading(true);

    try {
      const res = await GetFeedingRecords(childId);
      setRecords(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Statistics
  const fetchStatistics = async () => {
    if (!childId) return;
    try {
      const res = await GetFeedingStatistics(childId);
      setStatistics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  //   week
  const fetchWeekly = async () => {
    if (!childId) return;
    try {
      const res = await GetFeedingWeekly(childId);
      setWeeklyData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  //   month
  const fetchMonthly = async () => {
    if (!childId) return;
    try {
      const res = await GetFeedingMonthly(childId);
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

  //  add
  const addRecord = async (data: any) => {
    if (!childId) return;

    try {
      const res = await AddFeedingRecord(childId, data);

      if (!res.success) {
        throw new Error(res.message);
      }

      setRecords((prev) => [res.data, ...prev]);
      refreshAnalytics();
    } catch (err: any) {
      // ✅ هنا بيجي الـ 400 response من السيرفر
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  //  edit
  const editRecord = async (id: number, data: FeedingRecord) => {
    if (!childId) return;

    try {
      const res = await EditFeedingRecord(childId, data, id);

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
  //  delete
  const deleteRecord = async (id: number) => {
    if (!childId) return;
    try {
      const res = await DeleteFeedingRecord(childId, id);
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

  return {
    records,
    loading,
    fetchRecords,
    addRecord,
    editRecord,
    deleteRecord,
    statistics,
    weeklyData,
    monthlyData,
   fetchStatistics, 
  };
}
