import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Mic } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useChild } from "@/contexts/ChildContext";

const CryResult = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { state } = useLocation();

  const { children, selectedChildId } = useChild();
  const selectedChild = children.find((c) => c.childId === selectedChildId);

  const analysisResult = state?.resultData || {
    cryId: 14,
    audioUrl:
      "/uploads/cry-analysis/a657b57f-2e17-4b0c-ba19-33fb1ffab410_laugh_2.m4a_7.wav",
    result: "Laugh",
    confidence: 100,
    advice:
      "Your baby is happy and laughing! This is a wonderful sound. Enjoy this moment and continue the interaction that made them laugh.",
    childId: 37,
    createdAt: "2026-06-09T15:23:59.7131673+02:00",
    allScores: {
      belly_pain: 0,
      burping: 0,
      discomfort: 0,
      hungry: 0,
      laugh: 100,
    },
  };

  if (!analysisResult) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p>{t("No analysis result available")}</p>
      </section>
    );
  }

  const scores = Object.entries(analysisResult.allScores || {})
    .map(([label, value]) => ({
      label,
      value: Number(value),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <section
      className="min-h-screen w-full flex flex-col pt-24 px-(--space-lg) pb-(--space-lg)"
      style={{ background: "var(--color-background)" }}
    >
      {/* Header Profile Section */}
      {selectedChild && (
        <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              {selectedChild.photoUrl ? (
                <img
                  src={selectedChild.photoUrl}
                  alt={selectedChild.fullName}
                  className={`w-12 h-12 rounded-full object-cover border-2 ${
                    selectedChild.gender === "Boy"
                      ? "border-blue-400"
                      : "border-primary"
                  }`}
                />
              ) : (
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg bg-white ${
                    selectedChild.gender === "Boy"
                      ? "border-blue-400 text-blue-500"
                      : "border-primary text-primary"
                  }`}
                >
                  {selectedChild.fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
                {t("Analysis Result For")}
              </span>
              <p className="font-bold text-base text-gray-800">
                {selectedChild.fullName}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/cryAnalysis/record")}
            className="flex items-center justify-center gap-2 px-(--space-lg) py-(--space-sm) rounded-full text-white font-bold cursor-pointer shadow-sm shrink-0 w-full sm:w-auto"
            style={{
              background: "var(--color-primary)",
              fontSize: 13,
            }}
          >
            <Mic size={14} />
            {t("Analyze another cry")}
          </motion.button>
        </div>
      )}

      {/* Main Professional Layout Grid */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 lg:overflow-hidden mb-6">
        {/* Left Column: Main Result & Confidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-5 flex flex-col justify-center items-center text-center bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-50  h-full "
        >
          <div
            className="flex items-center justify-center rounded-full mb-4"
            style={{
              width: 84,
              height: 84,
              background: "#f0fdf4",
            }}
          >
            <CheckCircle size={42} style={{ color: "#4caf50" }} />
          </div>

          <h2
            className="font-extrabold mb-6 tracking-tight"
            style={{
              fontSize: 36,
              color: "var(--color-primary)",
            }}
          >
            {analysisResult.result}
          </h2>

          <div className="w-full max-w-sm bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <div className="flex justify-between mb-2">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-muted)" }}
              >
                {t("Detection Confidence")}
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {analysisResult.confidence}%
              </span>
            </div>

            <div
              className="h-3 rounded-full overflow-hidden"
              style={{ background: "#e2e8f0" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${analysisResult.confidence}%`,
                }}
                transition={{ duration: 1 }}
                className="h-full rounded-full"
                style={{
                  background: "var(--color-primary)",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Right Column: AI Advice & Detailed Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 flex flex-col gap-5 h-auto lg:h-full min-h-0"
        >
          {/* Advice Block */}
          <div
            className="rounded-3xl p-6 border border-gray-100/80 flex flex-col justify-center shrink-0"
            style={{ background: "white" }}
          >
            <p
              className="font-bold text-xs uppercase tracking-wider mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              {t("AI Advice")}
            </p>
            <p
              style={{
                fontSize: 14,
                color: "var(--color-muted)",
                lineHeight: 1.6,
              }}
            >
              {analysisResult.advice}
            </p>
          </div>

          {/* Progress Bars Block */}
          <div
            className="rounded-xl p-6 border border-gray-100/80 flex-1 flex flex-col lg:min-h-0"
            style={{ background: "white" }}
          >
            <p
              className="font-bold text-xs uppercase tracking-wider mb-4 shrink-0"
              style={{ color: "var(--color-primary)" }}
            >
              {t("Possible Cry Reasons")}
            </p>

            <div className="space-y-3 flex-1 lg:overflow-y-auto pr-0 lg:pr-1">
              {scores.map((item, index) => (
                <div
                  key={item.label}
                  className="bg-gray-50/40 p-2.5 rounded-xl border border-gray-50"
                >
                  <div className="flex justify-between mb-1.5">
                    <span className="font-semibold text-xs text-gray-700 capitalize">
                      {t(item.label.replace("_", " "))}
                    </span>
                    <span
                      className="font-bold text-xs"
                      style={{
                        color: "var(--color-primary)",
                      }}
                    >
                      {item.value}%
                    </span>
                  </div>

                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: "#e5e7eb" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${item.value}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.1,
                      }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          item.value === scores[0].value
                            ? "var(--color-primary)"
                            : "#cbd5e1",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CryResult;
