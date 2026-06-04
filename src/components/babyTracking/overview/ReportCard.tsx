"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

type Report = {
  reportId: number;
  childName: string;
  periodStart: string;
  periodEnd: string;
  growthStatus: string;
  createdAt: string;

  reportContent: {
    summary: {
      overallStatus: string;
      totalDays: number;
      growthRecordsCount: number;
      sleepRecordsCount: number;
      feedingRecordsCount: number;
      keyInsight: string;
    };

    recommendations: string[];
  };
};

type Props = {
  data: Report;
  onOpen: () => void;
  onDelete: (id: number) => Promise<void>;
};

function ReportCard({ data, onOpen, onDelete }: Props) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const summary = data.reportContent.summary;
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await onDelete(data.reportId);
      toast.success(t("Report deleted"));
    } catch (err: any) {
      toast.error(err.message || t("Delete failed"));
    }
  };

  return (
    <Card
      className="border bg-white hover:shadow-md transition-all"
      onClick={onOpen}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <CardTitle className="text-lg">
              {t("{{childName}} Report", { childName: data.childName })}
            </CardTitle>

            <div className="text-sm text-gray-500">
              {formatDate(data.periodStart)} → {formatDate(data.periodEnd)}
            </div>
          </div>

          <Badge
            className={`rounded-full px-3 py-1 ${
              data.growthStatus === "Good" || data.growthStatus === "جيد"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {data.growthStatus}
          </Badge>
        </div>

        <CardAction>
          <div className={"flex gap-2"}>
            <div className="hover:text-primary transition cursor-pointer">
              <Eye size={20} />
            </div>
            <div
              onClick={(e) => handleDelete(e)}
              className="hover:text-red-500 transition cursor-pointer"
            >
              <FaRegTrashCan size={18} />
            </div>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-100 rounded-xl p-3">
            <p className="text-xs text-gray-500">{t("Days")}</p>
            <p className="font-semibold text-lg">{summary.totalDays}</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-3">
            <p className="text-xs text-gray-500">{t("Feedings")}</p>
            <p className="font-semibold text-lg">
              {summary.feedingRecordsCount}
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-3">
            <p className="text-xs text-gray-500">{t("Growth Records")}</p>
            <p className="font-semibold text-lg">
              {summary.growthRecordsCount}
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-3">
            <p className="text-xs text-gray-500">{t("Sleep Records")}</p>
            <p className="font-semibold text-lg">{summary.sleepRecordsCount}</p>
          </div>
        </div>

        {/* Insight */}
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-3">
          <p className="text-sm text-primary font-medium">
            {summary.keyInsight}
          </p>
        </div>

        {/* Created At */}
        <div className="text-xs text-gray-400">
          {t("Created at {{date}}", { date: formatDate(data.createdAt) })}
        </div>
      </CardContent>
    </Card>
  );
}

export default ReportCard;
