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
import EditGrowthRecord from "./EditGrowthRecord";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext"; 
// TYPES

type GrowthRecord = {
  growthId?: number;
  recordDate?: string;
  ageInWeeks?: number;
  ageInMonths?: number;
  weightKg: number;
  heightCm: number;
};

type Props = {
  data: GrowthRecord | null;
  onEdit: (
    id: number,
    data: { weightKg: number; heightCm: number },
  ) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

// COMPONENT

function GrowthHistoryCard({ data, onEdit, onDelete }: Props) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // HELPERS (نُقلت بالداخل للاعتماد على لغة التطبيق الحالية بشكل ديناميكي)
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  //  No data
  if (!data) {
    return (
      <Card className="bg-gray-100">
        <CardContent className="h-30 flex items-center justify-center text-gray-500">
          {t("No record available")}
        </CardContent>
      </Card>
    );
  }

  const handleDelete = async () => {
    try {
      await onDelete(data.growthId!);
      toast.success(t("Record deleted"));
    } catch (err: any) {
      toast.error(err.message || t("Delete failed"));
    }
  };

  return (
    <Card className="border bg-white hover:shadow-md transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <p>{formatDate(data.recordDate!)}</p>
        </CardTitle>

        <CardAction className="flex items-center gap-3">
          {/* Edit */}
          <EditGrowthRecord data={data} onEdit={onEdit} />

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="hover:text-red-500 transition"
          >
            <FaRegTrashCan size={18} />
          </button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Weight */}
        <div className="flex justify-between bg-gray-100 p-3 rounded-xl">
          <span className="text text-primary">{t("Weight")}</span>
          <span className="font-semibold">{data.weightKg} {t("kg")}</span>
        </div>

        {/* Height */}
        <div className="flex justify-between bg-gray-100 p-3 rounded-xl">
          <span className="text text-primary">{t("Height")}</span>
          <span className="font-semibold">{data.heightCm} {t("cm")}</span>
        </div>

        {/* Age */}
        <div className="text-xs text-gray-500">
          {data.ageInWeeks && !data.ageInMonths ? (
            <span>{t("{{count}} Weeks old", { count: data.ageInWeeks })}</span>
          ) : (
            <span>{t("{{count}} Months old", { count: data.ageInMonths ?? 0 })}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default GrowthHistoryCard;