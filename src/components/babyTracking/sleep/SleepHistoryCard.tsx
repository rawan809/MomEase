"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";
import EditSleepRecord from "./EditSleepRecord";

// TYPES

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

type Props = {
  data: SleepRecord | null;
  onEdit: (
    id: number,
    data: { sleepDate: string; sleepHoursTotal: string; notes: string },
  ) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

// HELPERS

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const statusColor: Record<string, string> = {
  Good: "text-green-500",
  Normal: "text-yellow-500",
  Poor: "text-[#ff3381]",
  Unknown: "text-gray-400",
};

// COMPONENT

function SleepHistoryCard({ data, onEdit, onDelete }: Props) {
  if (!data) {
    return (
      <Card className="bg-gray-100">
        <CardContent className="h-30 flex items-center justify-center text-gray-500">
          No record available
        </CardContent>
      </Card>
    );
  }

  const handleDelete = async () => {
    try {
      await onDelete(data.recordId);
      toast.success("Record deleted");
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <Card className="border bg-white hover:shadow-md transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <p>{formatDate(data.sleepDate)}</p>

          <span
            className={`text-xs px-2 py-1 rounded-full bg-gray-50 border font-medium ${statusColor[data.status]}`}
          >
            {data.status}
          </span>
        </CardTitle>

        <CardAction className="flex items-center gap-3">
          <EditSleepRecord data={data} onEdit={onEdit} />

          <button
            onClick={handleDelete}
            className="hover:text-red-500 transition"
          >
            <FaRegTrashCan size={18} />
          </button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Sleep Duration */}
        <div className="flex justify-between bg-gray-100 p-3 rounded-xl">
          <span className="text-primary">Sleep</span>
          <span className="font-semibold">
            {data.sleepHoursTotalFormatted}
          </span>
        </div>

        {/* Notes */}
        <div className="flex justify-between bg-gray-100 p-3 rounded-xl">
          <span className="text-primary">Notes</span>
          <span className="font-medium text-gray-600">
            {data.notes || "—"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default SleepHistoryCard;