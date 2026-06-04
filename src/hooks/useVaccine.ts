import { useEffect, useState } from "react";
import {
  GetVaccinationList,
  GetVaccination,
  UpdateVaccination,
  DeleteVaccination,
  GetUpcomingVaccinations,
  GetOverdueVaccinations,
  GetCompletedVaccinations,
  MarkVaccinationTaken,
} from "../../services/vaccination";

//  Types

type Vaccine = {
  childVaccineId: number;
  childId: number;
  scheduleId: number;
  vaccineName: string;
  doseTiming: string;
  diseasePrevented: string;
  dosage: string;
  vaccinationWay: string;
  ageInMonths: number;
  scheduledDate: string;
  takenDate: string | null;
  status: "Pending" | "Done" | "Missed";
};

type VaccinationGroup = {
  ageInMonths: number;
  ageLabel: string;
  scheduledDate: string;
  vaccines: Vaccine[];
};

//  Hook

export function useVaccination(childId: number | null) {
  const [records, setRecords] = useState<VaccinationGroup[]>([]);
  const [loading, setLoading] = useState(false);

  const [upcoming, setUpcoming] = useState<Vaccine[]>([]);
  const [overdue, setOverdue] = useState<Vaccine[]>([]);
  const [completed, setCompleted] = useState<Vaccine[]>([]);

  // FETCH

  const fetchRecords = async () => {
    if (!childId) return;
    setLoading(true);

    try {
      const res = await GetVaccinationList(childId);
      setRecords(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcoming = async () => {
    if (!childId) return;
    try {
      const res = await GetUpcomingVaccinations(childId, 30);
      setUpcoming(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOverdue = async () => {
    if (!childId) return;
    try {
      const res = await GetOverdueVaccinations(childId);
      setOverdue(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCompleted = async () => {
    if (!childId) return;
    try {
      const res = await GetCompletedVaccinations(childId);
      setCompleted(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchUpcoming();
    fetchOverdue();
    fetchCompleted();
  }, [childId]);

  const refreshAnalytics = () => {
    fetchUpcoming();
    fetchOverdue();
    fetchCompleted();
  };

  // ACTIONS

  const updateStatus = async (
    id: number,
    data: {
      status: "Pending" | "Done" | "Missed";
      takenDate?: string;
    },
  ) => {
    if (!childId) return;

    try {
      const res = await UpdateVaccination(childId, id, data);

      if (!res.success) {
        throw new Error(res.message);
      }

      // update inside grouped records
      setRecords((prev) =>
        prev.map((group) => ({
          ...group,
          vaccines: group.vaccines.map((v) =>
            v.childVaccineId === id ? { ...v, ...res.data } : v,
          ),
        })),
      );

      refreshAnalytics();
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  };

  const markAsTaken = async (id: number) => {
    if (!childId) return;

    try {
      const res = await MarkVaccinationTaken(childId, id);

      if (!res.success) {
        throw new Error(res.message);
      }

      setRecords((prev) =>
        prev.map((group) => ({
          ...group,
          vaccines: group.vaccines.map((v) =>
            v.childVaccineId === id ? { ...v, ...res.data } : v,
          ),
        })),
      );

      refreshAnalytics();
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  };

  const deleteVaccination = async (id: number) => {
    if (!childId) return;

    try {
      const res = await DeleteVaccination(childId, id);

      if (!res.success) {
        throw new Error(res.message);
      }

      setRecords((prev) =>
        prev.map((group) => ({
          ...group,
          vaccines: group.vaccines.filter((v) => v.childVaccineId !== id),
        })),
      );

      refreshAnalytics();
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  };

  const getSingleVaccination = async (id: number) => {
    if (!childId) return;

    try {
      const res = await GetVaccination(childId, id);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  };

  // RETURN

  return {
    records,
    loading,
    
    fetchUpcoming,
    fetchOverdue,

    // actions
    updateStatus,
    markAsTaken,
    deleteVaccination,
    getSingleVaccination,
    fetchRecords,

    // analytics-like
    upcoming,
    overdue,
    completed,
  };
}
