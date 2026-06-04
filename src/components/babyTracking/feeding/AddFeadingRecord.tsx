import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { MdOutlineEdit } from "react-icons/md";
import { useTranslation } from "react-i18next";

type FeedingFormData = {
  feedingDate: string;
  feedingTimesPerDay: string;
  feedingTypeForBaby: string;
  notes: string;
};

type Props = {
  onSubmit: (data: {
    feedingDate: string;
    feedingTimesPerDay: number;
    feedingTypeForBaby: string;
    notes: string;
  }) => Promise<void>;
  initialData?: {
    feedingDate: string;
    feedingTimesPerDay: number;
    feedingTypeForBaby: string;
    notes: string;
  };
  mode?: "add" | "edit";
};

function AddFeadingRecord({ onSubmit, initialData, mode }: Props) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<FeedingFormData>({
    feedingDate: initialData?.feedingDate || "",
    feedingTimesPerDay: String(initialData?.feedingTimesPerDay || 1),
    feedingTypeForBaby: initialData?.feedingTypeForBaby || "Breastfeeding",
    notes: initialData?.notes || "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        feedingDate: initialData.feedingDate?.split("T")[0] || "",
        feedingTimesPerDay: String(initialData.feedingTimesPerDay || 1),
        feedingTypeForBaby: initialData.feedingTypeForBaby || "Breastfeeding",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.feedingDate) {
      toast.error(t("Please select a date"));
      return;
    }

    const feedingTimes = Number(form.feedingTimesPerDay);

    if (!feedingTimes || feedingTimes <= 0) {
      toast.error(t("Please enter valid feeding times"));
      return;
    }

    try {
      setLoading(true);

      const formattedDate = new Date(
        form.feedingDate + "T12:00:00",
      ).toISOString();

      await onSubmit({
        ...form,
        feedingTimesPerDay: feedingTimes,
        feedingDate: formattedDate,
      });

      toast.success(
        mode === "edit"
          ? t("Feeding record updated successfully")
          : t("Feeding record added successfully"),
      );

      setTimeout(() => {
        setOpen(false);
      }, 1000);
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
          {mode === "add" && (
            <div className="bg-primary/80 text-white rounded-xl px-3 py-2 cursor-pointer hover:bg-primary transition-all md:text-[16px] text-sm">
              {t("Add Feeding Record")}
            </div>
          )}

          {mode === "edit" && (
            <MdOutlineEdit
              size={20}
              className="aspect-square w-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all"
            />
          )}
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="border-b pb-5">
            <DialogTitle>
              {mode === "edit"
                ? t("Edit Feeding Record")
                : t("Add Feeding Record")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 flex flex-col">
            <div className="flex flex-col gap-2">
              <label htmlFor="feedingDate">{t("feeding Date")}</label>

              <input
                id="feedingDate"
                type="date"
                value={form.feedingDate}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="feedingTimesPerDay">
                {t("feeding Times Per Day")}
              </label>

              <input
                id="feedingTimesPerDay"
                type="number"
                value={form.feedingTimesPerDay}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="feedingTypeForBaby">{t("Feeding Type")}</label>

              <select
                id="feedingTypeForBaby"
                className="border px-3 py-2 rounded-md"
                value={form.feedingTypeForBaby}
                onChange={handleChange}
              >
                <option value={t("Breastfeeding")}>{t("Breastfeeding")}</option>

                <option value={t("Formula")}>{t("Formula")}</option>

                <option value={t("SolidFood")}>{t("SolidFood")}</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="notes">{t("Notes (optional)")}</label>

              <textarea
                id="notes"
                value={form.notes}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-primary/80 text-white rounded-xl px-3 py-2 cursor-pointer hover:bg-primary transition-all md:text-[16px] text-sm"
            >
              {loading
                ? mode === "edit"
                  ? t("Updating...")
                  : t("Adding...")
                : mode === "edit"
                  ? t("Update Record")
                  : t("Add Record")}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddFeadingRecord;
