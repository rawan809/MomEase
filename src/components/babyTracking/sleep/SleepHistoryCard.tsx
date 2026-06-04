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
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext"; // استيراد سياق اللغة للتاريخ ديناميكياً
import EditSleepRecord from "./EditSleepRecord";

// TYPES

type ReferenceInfo = {
  sleepMinHours: string;
  sleepMaxHours: string;
  sleepMinHoursFormatted: string;
  sleepMaxHoursFormatted: string;
  ageRange: string;
};

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
  referenceInfo: ReferenceInfo | null;
};

type Props = {
  data: SleepRecord | null;
  onEdit: (
    id: number,
    data: {
      sleepDate: string;
      sleepStartTime: string;
      sleepEndTime: string;
      notes: string;
      quality?: string;
    },
  ) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

// HELPERS

const statusConfig: Record<
  string,
  { color: string; bg: string; border: string; labelKey: string }
> = {
  Good: {
    labelKey: "Good",
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  Normal: {
    labelKey: "Normal",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  Poor: {
    labelKey: "Poor",
    color: "text-[#ff3381]",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
  Unknown: {
    labelKey: "Unknown",
    color: "text-gray-400",
    bg: "bg-gray-100",
    border: "border-gray-200",
  },
  // مفاتيح الدعم في حال واجه المكون الكلمات العربية مباشرة من الـ Backend
  جيد: {
    labelKey: "جيد",
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  عادي: {
    labelKey: "عادي",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  سيء: {
    labelKey: "سيء",
    color: "text-[#ff3381]",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
  "غير محدد": {
    labelKey: "غير محدد",
    color: "text-gray-400",
    bg: "bg-gray-100",
    border: "border-gray-200",
  },
};

// COMPONENT

function SleepHistoryCard({ data, onEdit, onDelete }: Props) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // جلب تنسيق التاريخ بناءً على اختيار لغة العميل الحالية
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (!data) {
    return (
      <Card className="bg-gray-100">
        <CardContent className="h-30 flex items-center justify-center text-gray-500">
          {t("No record available")}
        </CardContent>
      </Card>
    );
  }

  const config = statusConfig[data.status] ?? statusConfig.Unknown;

  const handleDelete = async () => {
    try {
      await onDelete(data.recordId);
      toast.success(t("Record deleted"));
    } catch (err: any) {
      toast.error(err.message || t("Delete failed"));
    }
  };

  return (
    <Card className="border bg-white hover:shadow-md transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <p>{formatDate(data.sleepDate)}</p>

          <span
            className={`text-xs px-2 py-1 rounded-full border font-medium ${config.color} ${config.bg} ${config.border}`}
          >
            {config.labelKey}
          </span>
        </CardTitle>

        <CardAction className="flex items-center gap-3">
          <EditSleepRecord data={data} onEdit={onEdit} />
          <button
            onClick={handleDelete}
            className="hover:text-red-500 transition cursor-pointer"
          >
            <FaRegTrashCan size={18} />
          </button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Sleep Time Range */}
        <div className="flex justify-between bg-gray-100 p-3 rounded-xl">
          <span className="text-primary">{t("Sleep Time")}</span>
          <span className="font-semibold">
            {data.sleepStartTimeFormatted} – {data.sleepEndTimeFormatted}
          </span>
        </div>

        {/* Sleep Duration */}
        <div className="flex justify-between bg-gray-100 p-3 rounded-xl">
          <span className="text-primary">{t("Duration")}</span>
          <span className="font-semibold">{data.sleepDurationFormatted}</span>
        </div>

        {/* Reference Info */}
        {data.referenceInfo && (
          <div className="flex justify-between bg-gray-100 p-3 rounded-xl">
            <span className="text-primary">{t("Recommended")}</span>
            <span className="font-medium text-gray-600">
              {data.referenceInfo.sleepMinHoursFormatted} –{" "}
              {data.referenceInfo.sleepMaxHoursFormatted}
            </span>
          </div>
        )}

        {/* Notes */}
        {data.notes ? (
          <div className="flex justify-between bg-gray-100 p-3 rounded-xl">
            <span className="text-primary">{t("Notes")}</span>
            <span className="font-medium text-gray-600">{data.notes}</span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default SleepHistoryCard;
