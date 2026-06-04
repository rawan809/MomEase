import { useEffect, useState } from "react";

import {
  AddGrowthReport,
  GetGrowthReports,
  GetGrowthReportById,
  // GetLatestGrowthReport,
  DeleteGrowthReport,
} from "../../services/growthReport";
import type { GrowthReport } from "@/components/babyTracking/overview/types";




type AddReportPayload = {
  periodStart?: string;
  periodEnd?: string;
  lastMonths?: number;
};


export function useGrowthReports(childId: number | null) {
  const [reports, setReports] = useState<GrowthReport[]>([]);
  // const [latestReport, setLatestReport] =
  //   useState<GrowthReport | null>(null);

  const [selectedReport, setSelectedReport] =
    useState<GrowthReport | null>(null);

  const [loading, setLoading] = useState(false);


  const fetchReports = async () => {
    if (!childId) return;

    setLoading(true);

    try {
      const res = await GetGrowthReports(childId);

      setReports(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const fetchReportById = async (reportId: number) => {
    if (!childId) return;

    try {
      const res = await GetGrowthReportById(
        childId,
        reportId,
      );

      setSelectedReport(res.data);

      return res.data;
    } catch (err) {
      console.error(err);
    }
  };


  // const fetchLatestReport = async () => {
  //   if (!childId) return;

  //   try {
  //     const res = await GetLatestGrowthReport(
  //       childId,
  //     );

  //     setLatestReport(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


  useEffect(() => {
    fetchReports();
    // fetchLatestReport();
  }, [childId]);


  const addReport = async (
    data: AddReportPayload,
  ) => {
    if (!childId) return;

    try {
      const res = await AddGrowthReport(
        childId,
        data,
      );

      if (!res.success) {
        throw new Error(res.message);
      }

      setReports((prev) => [res.data, ...prev]);

      // setLatestReport(res.data);

      return res.data;
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };


  const deleteReport = async (
    reportId: number,
  ) => {
    if (!childId) return;

    try {
      const res = await DeleteGrowthReport(
        childId,
        reportId,
      );

      if (!res.success) {
        throw new Error(res.message);
      }

      setReports((prev) =>
        prev.filter(
          (item) => item.reportId !== reportId,
        ),
      );

      // if (latestReport?.reportId === reportId) {
      //   fetchLatestReport();
      // }
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };


  return {
    reports,
    // latestReport,
    selectedReport,

    loading,

    // fetch
    fetchReports,
    fetchReportById,
    // fetchLatestReport,

    // actions
    addReport,
    deleteReport,
  };
}