import React from "react";
import VaccinationList from "./VaccinationList";
import { useChild } from "@/contexts/ChildContext";
import { useVaccination } from "@/hooks/useVaccine";
import VaccinationProgress from "./VaccinationProgress";
import OverdueList from "./OverdueList";
import UpcomingTimeline from "./UpcomingTimeline";
import { toast } from "sonner";

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

const groupUpcoming = (list: Vaccine[]) => {
  const map = new Map();

  list.forEach((v) => {
    const key = v.scheduledDate.split("T")[0];

    if (!map.has(key)) {
      map.set(key, {
        ageLabel: `${v.ageInMonths} Months`,
        scheduledDate: v.scheduledDate,
        vaccines: [],
      });
    }

    map.get(key).vaccines.push(v);
  });

  return Array.from(map.values());
};

function Vaccination() {
  const { selectedChildId } = useChild();
  const {
    records,
    loading,
    updateStatus,
    markAsTaken,
    deleteVaccination,
    getSingleVaccination,
    fetchRecords,
    upcoming,
    overdue,
    completed,
  } = useVaccination(selectedChildId);
  const groupedUpcoming = groupUpcoming(upcoming);

  const handleMarkTaken = async (id: number) => {
    try {
      await markAsTaken(id);
      toast.success("marked as taken");
    } catch (err: any) {
      toast.error(err.message || " failed");
    }
  };

  const handleStatusChange = async (
    id: number,
    status: "Pending" | "Missed",
  ) => {
    try {
      updateStatus(id, {
        status: status,
        takenDate: new Date().toISOString(),
      });
      toast.success("Updated successfully ");
    } catch (err: any) {
      toast.error(err.message || " failed");
    }
  };

  if (loading) {
    return (
      <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
        Loading vaccinations...
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xl font-semibold">Vaccination</p>
        <p className="text-sm text-gray-500">Track your baby's Vaccination</p>
      </div>
      <div>
        <VaccinationProgress data={records} />
      </div>
      <div>
        {" "}
        {overdue && overdue.length > 0 && (
          <OverdueList data={overdue} onMarkTaken={handleMarkTaken} />
        )}
      </div>
      <div>
        <UpcomingTimeline
          data={groupedUpcoming}
          onMarkTaken={handleMarkTaken}
        />
      </div>
      <div>
        <VaccinationList
          data={records}
          onMarkTaken={handleMarkTaken}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}

export default Vaccination;
