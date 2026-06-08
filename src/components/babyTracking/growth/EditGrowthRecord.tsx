"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MdOutlineEdit } from "react-icons/md";
import { useTranslation } from "react-i18next";

type GrowthRecord = {
  growthId?: number;
  recordDate?: string;
  ageInWeeks?: number;
  ageInMonths?: number;
  weightKg: number;
  heightCm: number;
};

type Props = {
  data: GrowthRecord;
  onEdit: (
    id: number,
    data: { weightKg: number; heightCm: number }
  ) => Promise<void>;
};

function GrowthEditRecord({ data, onEdit }: Props) {
  const { t } = useTranslation();
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // ✅ preload values
  useEffect(() => {
    if (data && open) {
      setWeight(data.weightKg);
      setHeight(data.heightCm);
    }
  }, [data, open]);

  const handleSubmit = async () => {
    if (!weight || !height) {
      toast.error(t("Please enter weight and height"));
      return;
    }

    if (weight <= 0 || height <= 0) {
      toast.error(t("Values must be greater than 0"));
      return;
    }

    try {
      setLoading(true);

      await onEdit(data.growthId!, {
        weightKg: weight,
        heightCm: height,
      });

      toast.success(t("Growth record updated"));

      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || t("Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="aspect-square w-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all cursor-pointer">
          <MdOutlineEdit size={20} />
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>{t("Edit Growth Record")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex flex-col">
          {/* Weight */}
          <div className="flex flex-col gap-2">
            <label htmlFor="weight">{t("Weight (kg)")}</label>
            <input
              id="weight"
              type="number"
              value={weight === 0 ? "" : weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="border px-3 py-2 rounded-md"
            />
          </div>

          {/* Height */}
          <div className="flex flex-col gap-2">
            <label htmlFor="height">{t("Height (cm)")}</label>
            <input
              id="height"
              type="number"
              value={height === 0 ? "" : height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="border px-3 py-2 rounded-md"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary/80 text-white rounded-xl px-3 py-2 hover:bg-primary transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? t("Updating...") : t("Update Record")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GrowthEditRecord;