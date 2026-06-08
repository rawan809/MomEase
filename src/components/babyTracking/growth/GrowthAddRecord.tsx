"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

function GrowthAddRecord({
  addRecord,
}: {
  addRecord: (data: { weightKg: number; heightCm: number }) => Promise<void>;
}) {
  const { t } = useTranslation();
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);

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
      await addRecord({
        weightKg: weight,
        heightCm: height,
      });
      toast.success(t("Growth record added successfully"));
      setWeight(0);
      setHeight(0);
    } catch (err: any) {
      toast.error(err.message || t("Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-primary/80 text-white rounded-xl px-3 py-2 cursor-pointer hover:bg-primary transition-all md:text-[16px] text-sm">
            {t("Add Growth Record")}
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="border-b pb-5">
            <DialogTitle>{t("Add Growth Record")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 flex flex-col">
            <div className="flex flex-col gap-2">
              <label htmlFor="weight">{t("Weight by kg")}</label>
              <input
                id="weight"
                type="number"
                value={weight === 0 ? "" : weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="border px-3 py-2 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="height">{t("Height by cm")}</label>
              <input
                value={height === 0 ? "" : height}
                onChange={(e) => setHeight(Number(e.target.value))}
                id="height"
                type="number"
                className="border px-3 py-2 rounded-md"
              />
            </div>

            <button
              className="bg-primary/80 text-white rounded-xl px-3 py-2 cursor-pointer hover:bg-primary transition-all md:text-[16px] text-sm"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? t("Adding...") : t("Add Record")}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GrowthAddRecord;