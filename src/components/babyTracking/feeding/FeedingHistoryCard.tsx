"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { FaRegTrashCan } from "react-icons/fa6";
import AddFeadingRecord from "./AddFeadingRecord";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

type FeedingRecord = {
  recordId?: number;
  feedingDate: string;
  feedingTimesPerDay: number;
  feedingTypeForBaby: string;
  feedingType?: string;
  notes: string;
  referenceInfo?: any;
};

type Props = {
  data: FeedingRecord;
  onEdit: (id: number, data: any) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

function FeedingHistoryCard({ data, onEdit, onDelete }: Props) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handleDelete = async () => {
    try {
      await onDelete(data.recordId!);
      toast.success(t("Record deleted"));
    } catch (err: any) {
      toast.error(err.message || t("Delete failed"));
    }
  };

  return (
    <div>
      <Card className="border bg-white hover:shadow-md duration-300 transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <p>{formatDate(data.feedingDate)} </p>
            <p className="text-[12px] bg-accent rounded-xl px-2 py-1 text-primary">
              {t(data.feedingTypeForBaby || "Breastfeeding")}
            </p>
          </CardTitle>
          <CardAction className="flex items-center gap-2">
            <div className="aspect-square w-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all">
              <AddFeadingRecord
                mode="edit"
                initialData={data}
                onSubmit={(formData) => onEdit(data.recordId!, formData)}
              />
            </div>
            <div
              className="hover:text-red-500 transition-all cursor-pointer"
              onClick={handleDelete}
            >
              <FaRegTrashCan size={20} />
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <p>
              {t("Feeding Times")}:{" "}
              <span className="font-semibold">
                {data.feedingTimesPerDay} {t("times/day")}
              </span>
            </p>
          </div>
          <div className="bg-gray-100 p-3 rounded-xl space-y-1">
            <p className="text-primary font-medium text-sm">
              {t("Reference Range")}
            </p>

            <div className="text-sm text-gray-700 flex items-center justify-between">
              <span>
                {data.referenceInfo?.minTimesPerDay} –{" "}
                {data.referenceInfo?.maxTimesPerDay} {t("times/day")}
              </span>

              <span className="text-gray-500 text-xs">
                ({data.referenceInfo?.ageRange} {t("months")})
              </span>
            </div>
          </div>
          <div className="bg-gray-100 p-2 rounded-xl">
            <p>
              <span className="font-semibold">{t("Notes")}:</span>{" "}
              {data.notes || t("No additional notes")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FeedingHistoryCard;
