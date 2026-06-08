import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { FaRegTrashCan } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// TYPES

type AssessmentResult = {
  resultId: number;
  assessmentId: number;
  totalScore: number;
  levelName: string;
  advice: string;
  recommendations: string[];
  completedAt: string;
};

type Props = {
  data: AssessmentResult;
  onDelete: (id: number) => Promise<void>;
};

// HELPERS

const levelConfig: Record<string, { color: string; bg: string; border: string; labelKey: string }> = {
  Minimal:  { labelKey: "Minimal",  color: "text-green-500",     bg: "bg-green-50",  border: "border-green-200"  },
  Mild:     { labelKey: "Mild",     color: "text-yellow-500",    bg: "bg-yellow-50", border: "border-yellow-200" },
  Moderate: { labelKey: "Moderate", color: "text-orange-500",    bg: "bg-orange-50", border: "border-orange-200" },
  Severe:   { labelKey: "Severe",   color: "text-[#ff3381]",     bg: "bg-pink-50",   border: "border-pink-200"   },
};

const assessmentName: Record<number, string> = {
  1: "EPDS",
  2: "PHQ-9",
  3: "GAD-7",
};

function ResultHistoryCard({ data, onDelete }: Props) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const config = levelConfig[data.levelName] ?? {
    labelKey: data.levelName,
    color: "text-gray-400",
    bg: "bg-gray-100",
    border: "border-gray-200",
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await onDelete(data.resultId);
      toast.success(t("Record deleted"));
    } catch (err: any) {
      toast.error(err.message || t("Delete failed"));
    }
  };

  return (
    <Card
      className="border bg-white hover:shadow-md transition-all cursor-pointer"
      onClick={() => navigate(`/assessment/${data.assessmentId}/result?resultId=${data.resultId}`, {
        state: { result: { data: data } }
      })}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold">
            {assessmentName[data.assessmentId] ?? `Assessment #${data.assessmentId}`}
          </p>
          <span
            className={`text-xs px-2 py-1 rounded-full border font-medium ${config.color} ${config.bg} ${config.border}`}
          >
            {t(config.labelKey)}
          </span>
        </CardTitle>

        <button
          onClick={handleDelete}
          className="hover:text-red-500 transition cursor-pointer ml-auto"
        >
          <FaRegTrashCan size={18} />
        </button>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Score */}
        <div className="flex justify-between bg-gray-100 p-3 rounded-xl">
          <span className="text-primary">{t("Score")}</span>
          <span className="font-semibold">{data.totalScore}</span>
        </div>

        {/* Date */}
        <div className="flex justify-between bg-gray-100 p-3 rounded-xl">
          <span className="text-primary">{t("Date")}</span>
          <span className="font-semibold">{formatDate(data.completedAt)}</span>
        </div>

        {/* Advice */}
        <div className="bg-gray-100 p-3 rounded-xl">
          <span className="text-primary block mb-1">{t("Advice")}</span>
          <span className="text-sm text-gray-600">{t(data.advice)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default ResultHistoryCard;