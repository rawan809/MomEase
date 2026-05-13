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

type FeedingFormData = {
  feedingDate: string;
  feedingTimesPerDay: number;
  feedingTypeForBaby: string;
  notes: string;
};

type Props = {
  onSubmit: (data: FeedingFormData) => Promise<void>;
  initialData?: FeedingFormData;
  mode?: "add" | "edit";
};

function AddFeadingRecord({ onSubmit, initialData, mode }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FeedingFormData>({
    feedingDate: initialData?.feedingDate || "",
    feedingTimesPerDay: initialData?.feedingTimesPerDay || 1,
    feedingTypeForBaby: initialData?.feedingTypeForBaby || "Breastfeeding",
    notes: initialData?.notes || "",
  });
  useEffect(() => {
    if (initialData) {
      setForm({
        feedingDate: initialData.feedingDate?.split("T")[0] || "",
        feedingTimesPerDay: initialData.feedingTimesPerDay || 1,
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
      [id]: id === "feedingTimesPerDay" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.feedingDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      setLoading(true);
      const formattedDate = new Date(
        form.feedingDate + "T12:00:00",
      ).toISOString();

      await onSubmit({
        ...form,
        feedingDate: formattedDate,
      });

      toast.success(
        mode === "edit"
          ? "Feeding record updated successfully"
          : "Feeding record added successfully",
      );

      setTimeout(() => {
        setOpen(false);
      }, 1000);
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
          {mode === "add" && (
            <button className="bg-primary/80 text-white rounded-xl px-3 py-2 cursor-pointer hover:bg-primary transition-all md:text-[16px] text-sm">
              Add Feeding Record
            </button>
          )}

          {mode === "edit" && (
            <MdOutlineEdit
              size={20}
              className="aspect-square  w-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all"
            />
          )}
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="border-b pb-5">
            <DialogTitle>
              {mode === "edit" ? "Edit Feeding Record" : "Add Feeding Record"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 flex flex-col">
            <div className="flex flex-col gap-2">
              <label htmlFor="feedingDate">feeding Date</label>
              <input
                id="feedingDate"
                type="date"
                value={form.feedingDate}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="feedingTimesPerDay">feeding Times Per Day</label>
              <input
                id="feedingTimesPerDay"
                type="number"
                value={form.feedingTimesPerDay}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="feedingTypeForBaby">Feeding Type</label>
              <select
                id="feedingTypeForBaby"
                className="border px-3 py-2 rounded-md"
                value={form.feedingTypeForBaby}
                onChange={handleChange}
              >
                <option value="Breastfeeding">Breastfeeding</option>
                <option value="Formula">Formula</option>
                <option value="SolidFood">SolidFood</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="notes">Notes (optional)</label>
              <textarea
                id="notes"
                value={form.notes}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-primary/80 text-white rounded-xl px-3 py-2 cursor-pointer hover:bg-primary transition-all md:text-[16px] text-sm"
            >
              {loading
                ? mode === "edit"
                  ? "Updating..."
                  : "Adding..."
                : mode === "edit"
                  ? "Update Record"
                  : "Add Record"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddFeadingRecord;
