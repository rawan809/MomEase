"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { MdOutlineEdit } from "react-icons/md";

type SleepRecord = {
  recordId: number;
  childId: number;
  childName: string;
  sleepDate: string;
  sleepStartTime: string;
  sleepEndTime: string;
  sleepStartTimeFormatted: string;
  sleepEndTimeFormatted: string;
  sleepDuration: string;
  sleepDurationFormatted: string;
  quality: string | null;
  sleepRefId: number | null;
  notes: string;
  status: "Good" | "Normal" | "Poor" | "Unknown";
};

type Props = {
  data: SleepRecord;
  onEdit: (
    id: number,
    data: {
      sleepDate: string;
      sleepStartTime: string;
      sleepEndTime: string;
      notes: string;
    },
  ) => Promise<void>;
};

function EditSleepRecord({ data, onEdit }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    sleepDate: "",
    sleepStartTime: "",
    sleepEndTime: "",
    notes: "",
  });

  useEffect(() => {
    if (data && open) {
      setForm({
        sleepDate: data.sleepDate?.split("T")[0] || "",
        sleepStartTime: data.sleepStartTime?.slice(0, 5) || "",
        sleepEndTime: data.sleepEndTime?.slice(0, 5) || "",
        notes: data.notes || "",
      });
    }
  }, [data, open]);

  const handleSubmit = async () => {
    if (!form.sleepDate) {
      toast.error(t("Please select a date"));
      return;
    }

    if (!form.sleepStartTime || !form.sleepEndTime) {
      toast.error(t("Please select sleep start and end times"));
      return;
    }

    try {
      setLoading(true);

      const formattedDate = new Date(
        `${form.sleepDate}T12:00:00`,
      ).toISOString();

      await onEdit(data.recordId, {
        sleepDate: formattedDate,
        sleepStartTime: form.sleepStartTime,
        sleepEndTime: form.sleepEndTime,
        notes: form.notes,
      });

      toast.success(t("Sleep record updated"));
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || t("Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="w-7 rounded-full hover:bg-gray-200 p-1 cursor-pointer">
            <MdOutlineEdit size={20} />
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="border-b pb-5">
            <DialogTitle>{t("Edit Sleep Record")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 flex flex-col">
            <div className="flex flex-col gap-2">
              <label htmlFor="sleepDate">{t("Sleep Date")}</label>
              <input
                id="sleepDate"
                type="date"
                value={form.sleepDate}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, sleepDate: e.target.value }))
                }
                className="border px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="sleepStartTime">{t("Sleep Start Time")}</label>
              <input
                id="sleepStartTime"
                type="time"
                value={form.sleepStartTime}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    sleepStartTime: e.target.value,
                  }))
                }
                className="border px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="sleepEndTime">{t("Sleep End Time")}</label>
              <input
                id="sleepEndTime"
                type="time"
                value={form.sleepEndTime}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    sleepEndTime: e.target.value,
                  }))
                }
                className="border px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="notes">{t("Notes")}</label>
              <textarea
                id="notes"
                value={form.notes}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="border px-3 py-2 rounded-md"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-primary/80 text-white rounded-xl px-3 py-2 hover:bg-primary transition-all text-sm"
            >
              {loading ? t("Updating...") : t("Update Record")}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditSleepRecord;