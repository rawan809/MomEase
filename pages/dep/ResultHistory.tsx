import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ResultHistoryCard from "@/components/Depression/ResultHistoryCard";
import LoadingState from "@/components/UI/LoadingState";
import {
  getAssessmentResults,
  deleteAssessmentResult,
} from "../../services/dep"; // عدّل المسار حسب مشروعك

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

function ResultHistory() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getAssessmentResults();
        if (res.success) setResults(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [language]);

  const handleDelete = async (id: number) => {
    await deleteAssessmentResult(id);
    setResults((prev) => prev.filter((r) => r.resultId !== id));
  };

  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-10xl mx-auto px-(--space-lg)">
        {/* Back */}
        <Link
          to="/depression"
          className="text-sm text-primary font-semibold flex items-center gap-1 mb-3"
        >
          {language === "en" ? (
            <>
              <ArrowLeft size={16} /> {t("Back")}
            </>
          ) : (
            <>
              <ArrowRight size={16} /> {t("Back")}
            </>
          )}
        </Link>

        {/* Header */}
        <div className="mb-5">
          <p className="text-2xl font-bold flex items-center gap-2">
            <span className="text-primary">
              <Calendar />
            </span>
            {t("Your Previous Check-ins")}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="h-[40vh] flex items-center justify-center">
            <LoadingState />
          </div>
        ) : results.length === 0 ? (
          <div className="h-[40vh] flex items-center justify-center text-gray-400 text-sm">
            {t("No results found")}
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((result) => (
              <ResultHistoryCard
                key={result.resultId}
                data={result}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ResultHistory;
