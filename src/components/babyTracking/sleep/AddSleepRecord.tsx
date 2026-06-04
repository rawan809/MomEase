import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next"; // استيراد hook الترجمة

type SleepFormData = {
  sleepDate: string;
  sleepStartTime: string;
  sleepEndTime: string;
  quality: string;
  notes: string;
};

type Props = {
  addRecord: (data: SleepFormData) => Promise<void>;
};

function AddSleepRecord({ addRecord }: Props) {
  const { t } = useTranslation(); // تهيئة دالة الترجمة
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    sleepDate: "",
    sleepStartTime: "",
    sleepEndTime: "",
    quality: "",
    notes: "",
  });

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

      await addRecord({
        sleepDate: formattedDate,
        sleepStartTime: `${form.sleepStartTime}`,
        sleepEndTime: `${form.sleepEndTime}`,
        quality: form.quality,
        notes: form.notes,
      });

      toast.success(t("Sleep record added successfully"));

      setForm({
        sleepDate: "",
        sleepStartTime: "",
        sleepEndTime: "",
        quality: "",
        notes: "",
      });

      setTimeout(() => {
        setOpen(false);
      }, 800);
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
          <div className="bg-primary/80 text-white rounded-xl px-3 py-2 hover:bg-primary transition-all text-sm cursor-pointer">
            {t("Add Sleep Record")}
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="border-b pb-5">
            <DialogTitle>{t("Add Sleep Record")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 flex flex-col">
            <div className="flex flex-col gap-2">
              <label htmlFor="sleepDate">{t("Sleep Date")}</label>
              <input
                id="sleepDate"
                type="date"
                value={form.sleepDate}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    sleepDate: e.target.value,
                  }))
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
              <label htmlFor="quality">{t("Sleep Quality")}</label>
              <select
                id="quality"
                value={form.quality}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    quality: e.target.value,
                  }))
                }
                className="border px-3 py-2 rounded-md"
              >
                <option value="">{t("Select Quality")}</option>
                <option value="Poor">{t("Poor")}</option>
                <option value="Fair">{t("Fair")}</option>
                <option value="Good">{t("Good")}</option>
                <option value="Excellent">{t("Excellent")}</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="notes">{t("Notes")}</label>
              <textarea
                id="notes"
                value={form.notes}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                className="border px-3 py-2 rounded-md"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-primary/80 text-white rounded-xl px-3 py-2 hover:bg-primary transition-all text-sm"
            >
              {loading ? t("Adding...") : t("Add Record")}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddSleepRecord;