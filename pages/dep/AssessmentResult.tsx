import { motion } from "framer-motion";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { getAssessmentResults } from "../../services/dep";
import LoadingState from "@/components/UI/LoadingState";

interface AssessmentResultData {
  levelName?: string;
  totalScore?: number;
  advice?: string;
  recommendations: string[];
  assessmentId?: string | number;
}

const getSeverityColor = (level?: string): string => {
  const l = level?.toLowerCase();

  if (l === "طبيعي" || l === "minimal" || l === "none") return "#4caf50";

  if (l === "خفيف" || l === "mild") return "#ff9800";

  if (l === "متوسط" || l === "moderate") return "#f44336";

  if (l === "شديد" || l === "moderately severe" || l === "severe")
    return "#b71c1c";

  return "var(--color-primary)";
};

// const getSeverityMessage = (level: string) => {
//   const l = level?.toLowerCase();

//   if (l === "minimal" || l === "none")
//     return "You're doing well emotionally! Your responses suggest minimal signs of depression.";

//   if (l === "mild")
//     return "You're experiencing some mild symptoms. Consider talking to someone you trust.";

//   if (l === "moderate")
//     return "You're showing moderate signs that deserve attention. We encourage you to reach out to a healthcare provider.";

//   if (l === "moderately severe" || l === "severe")
//     return "Your responses indicate significant symptoms. Please reach out to a mental health professional.";

//   return "Thank you for completing the assessment.";
// };
// const getRecommendations = (level: string): string[] => {
//   const l = level?.toLowerCase();

//   if (l === "minimal" || l === "none")
//     return [
//       "Take small moments for yourself, even 5 minutes of quiet time.",

//       "Connect with loved ones or join a mother's support group.",

//       "Remember: asking for help is a sign of strength, not weakness.",
//     ];

//   if (l === "mild")
//     return [
//       "Try to maintain a regular sleep and eating schedule.",

//       "Talk to a trusted friend or family member about how you feel.",

//       "Monitor your mood over the next few weeks.",
//     ];

//   if (l === "moderate")
//     return [
//       "Schedule an appointment with your doctor or a counselor.",

//       "Avoid isolating yourself — stay connected with supportive people.",

//       "Consider joining a postpartum support group.",
//     ];

//   if (l === "moderately severe" || l === "severe")
//     return [
//       "Please contact your doctor or a mental health professional as soon as possible.",

//       "Do not manage this alone — support is available and effective.",

//       "If you feel unsafe, contact emergency services immediately.",
//     ];

//   return [];
// };

const AssessmentResult = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const resultId = searchParams.get("resultId");
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState<AssessmentResultData | null>(
    state?.result?.data || null
  );
  const [loading, setLoading] = useState(!state?.result?.data);
  const maxScore = state?.maxScore;

  useEffect(() => {
    if (result) return;

    const fetchResult = async () => {
      try {
        setLoading(true);
        const res = await getAssessmentResults();
        if (res.success && Array.isArray(res.data)) {
          if (resultId) {
            const specificResult = res.data.find(
              (r: any) => String(r.resultId) === String(resultId)
            );
            if (specificResult) {
              setResult(specificResult);
              return;
            }
          }

          const assessmentResults = res.data.filter(
            (r: any) => String(r.assessmentId) === String(id)
          );
          if (assessmentResults.length > 0) {
            assessmentResults.sort(
              (a: any, b: any) =>
                new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
            );
            setResult(assessmentResults[0]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch assessment results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, resultId, result]);

  const severityColor = getSeverityColor(result?.levelName);
  const recommendations = result?.recommendations || [];

  if (loading) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ background: "var(--color-background)" }}
      >
        <LoadingState />
      </div>
    );
  }

  if (!result) {
    return (
      <div
        className="h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "var(--color-background)" }}
      >
        <p className="text-gray-500 font-semibold">{t("No result found")}</p>
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-2 rounded-full text-white font-bold"
          style={{ background: "var(--color-primary)" }}
        >
          {t("Back to Home")}
        </button>
      </div>
    );
  }

  return (
    <div
      className="h-screen flex items-center justify-center px-(--space-lg) overflow-hidden"
      style={{ background: "var(--color-background)" }}
    >
      <button
        onClick={() => navigate(-1)}
        className={`absolute top-6  text-primary text-4xl font-bold hover:opacity-70 transition ${language === "en" ? "left-6" : "right-6"}`}
      >
        ‹
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl p-(--space-md) w-full max-w-md flex flex-col gap-(--space-sm)"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <div
          className="rounded-2xl p-(--space-sm) text-center"
          style={{ background: `${severityColor}18` }}
        >
          <p className="text-(--text-small) mb-1">
            {t("Emotional Well-being")}
          </p>
          <h2
            className="font-(--font-brand) text-h2"
            style={{ color: severityColor }}
          >
            {result?.levelName}
          </h2>
          <p className="text-(--text-small) mt-1">
            {t("Score:")} {result?.totalScore}
          </p>
        </div>

        <p className="text-center text-muted">
          {" "}
          {t("Thank you for completing the assessment.")}
        </p>

        {result?.advice && (
          <div
            className="rounded-2xl p-(--space-sm)"
            style={{
              background: `${severityColor}10`,
              border: `2px solid ${severityColor}`,
            }}
          >
            <p className="text-(--text-small)" style={{ color: severityColor }}>
              {result.advice}
            </p>
          </div>
        )}

        <div
          className="rounded-2xl p-(--space-sm)"
          style={{ background: "var(--color-background)" }}
        >
          <h4 className="font-bold text-(--text-small) mb-(--space-xs)">
            {t("Gentle Recommendations")}
          </h4>
          <ul className="flex flex-col gap-(--space-xs)">
            {recommendations.map((rec, i) => (
              <li key={i} className="text-(--text-small) flex gap-(--space-xs)">
                <span style={{ color: "var(--color-primary)" }}>•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() =>
            navigate(`/assessment/${result?.assessmentId}`, {
              state: { maxScore },
            })
          }
          className="w-full py-(--space-sm) rounded-full text-white font-bold transition-(--transition-fast) hover:opacity-90"
          style={{ background: "var(--color-primary)" }}
        >
          {t("Retake Check-In")}
        </button>

        <button
          onClick={() => navigate("/home")}
          className="w-full py-(--space-sm) rounded-full font-bold text-(--text-small) border-2 transition-(--transition-fast) hover:bg-pink-50"
          style={{
            borderColor: "var(--color-primary)",
            color: "var(--color-primary)",
          }}
        >
          {t("Back to Home")}
        </button>
      </motion.div>
    </div>
  );
};

export default AssessmentResult;
