

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

type SleepFormData = {
  sleepDate: string;
  sleepHoursTotal: string;
  notes: string;
};

type Props = {
  addRecord: (data: SleepFormData) => Promise<void>;
};

function AddSleepRecord({ addRecord }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [form, setForm] = useState({
    sleepDate: "",
    notes: "",
  });

  const formatSleepDuration = () => {
    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    return `${h}:${m}:00`;
  };

  const handleSubmit = async () => {
    if (!form.sleepDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      setLoading(true);

      const formattedDate = new Date(
        form.sleepDate + "T12:00:00",
      ).toISOString();

      await addRecord({
        sleepDate: formattedDate,
        sleepHoursTotal: formatSleepDuration(),
        notes: form.notes,
      });

      toast.success("Sleep record added successfully");

      setForm({ sleepDate: "", notes: "" });
      setHours(0);
      setMinutes(0);

      setTimeout(() => {
        setOpen(false);
      }, 800);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <button className="bg-primary/80 text-white rounded-xl px-3 py-2 hover:bg-primary transition-all text-sm">
            Add Sleep Record
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="border-b pb-5">
            <DialogTitle>Add Sleep Record</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 flex flex-col">
            <div className="flex flex-col gap-2">
              <label htmlFor="sleepDate">Sleep Date</label>
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
              <label>Sleep Duration</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={hours}
                  min={0}
                  max={24}
                  onChange={(e) =>
                    setHours(Math.min(24, Math.max(0, Number(e.target.value))))
                  }
                  className="border px-3 py-2 rounded-md w-20 text-center"
                />
                <span>hr</span>

                <input
                  type="number"
                  value={minutes}
                  min={0}
                  max={59}
                  onChange={(e) =>
                    setMinutes(Math.min(59, Math.max(0, Number(e.target.value))))
                  }
                  className="border px-3 py-2 rounded-md w-20 text-center"
                />
                <span>min</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="notes">Notes</label>
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
              {loading ? "Adding..." : "Add Record"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddSleepRecord;