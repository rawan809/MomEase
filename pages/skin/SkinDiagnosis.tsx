import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SkinImage from "@/assets/images/Dep.png";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useChild } from "@/contexts/ChildContext";
import { useChildren } from "@/hooks/useChildren";
import { BabySelectDialog } from "@/components/UI/BabySelectDialog";
import formatBabyAge from "@/utils/formatBabyAge";

const SkinDiagnosis = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSelectBabyOpen, setIsSelectBabyOpen] = useState(false);
  const { selectedChildId } = useChild();
  const { children, fetchChildById, selectedChild } = useChildren();

  useEffect(() => {
    if (children.length > 0 && selectedChildId !== null) {
      fetchChildById(selectedChildId);
    }
  }, [children, selectedChildId]);

  // تحويل الـ steps لنصوص ثابتة قابلة للترجمة مع الحفاظ على التنسيق الـ bold عبر الـ JSX لاحقاً
  const steps = [
    {
      boldText: "Take a clear photo",
      normalText: " of the affected skin area",
    },
    {
      boldText: "AI analyzes the image",
      normalText: " for common baby skin conditions",
    },
    {
      boldText: "Receive gentle care tips",
      normalText: " and personalized recommendations",
    },
  ];

  return (
    <section
      className="min-h-screen flex items-center justify-center px-(--space-lg) py-20"
      style={{ background: "var(--color-background)" }}
    >
      <div className="max-w-5xl w-full mx-auto flex flex-col-reverse lg:flex-row items-center gap-(--space-xl)">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex justify-center"
        >
          <img
            src={SkinImage}
            alt="Mother and baby"
            className="w-full max-w-sm object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col gap-(--space-md)"
        >
          <div>
            <p className="text-(--text-small)">
              {t("Welcome to")}{" "}
              <span className="text-primary font-semibold">
                {t("Skin Diagnosis")}
              </span>
            </p>
            <h1 className="font-bold text-(--text-normal) leading-snug mt-(--space-xs)">
              {t(
                "Get AI-powered insights about common baby skin conditions and gentle care tips.",
              )}
            </h1>
          </div>

          <div
            className="rounded-2xl p-(--space-md) flex flex-col gap-(--space-sm)"
            style={{ background: "white", boxShadow: "var(--shadow-md)" }}
          >
            <p
              className="font-bold text-(--text-small) flex items-center gap-(--space-xs)"
              style={{ color: "var(--color-primary)" }}
            >
              {t("How It Works")}
            </p>

            <ul className="flex flex-col gap-(--space-xs)">
              {steps.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
                  className="flex items-start gap-(--space-xs) text-(--text-small)"
                >
                  <span style={{ color: "var(--color-primary)" }}>•</span>
                  <span>
                    <span className="font-bold">{t(step.boldText)}</span>
                    {t(step.normalText)}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Baby Selection Card */}
          {selectedChild ? (
            <div
              className={`rounded-2xl p-4 flex items-center justify-between border gap-3 bg-white ${selectedChild.gender === "Boy" ? "border-blue-400" : "border-primary"} shadow-md `}
            >
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
                <div className="text-start">
                  <span className="text-[10px] uppercase font-bold tracking-wider block text-muted">
                    {t("Analyzing skin for:")}
                  </span>
                  <p className="font-bold leading-tight">
                    {selectedChild.fullName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatBabyAge({
                      ageInDays: selectedChild.ageInDays,
                      ageInMonths: selectedChild.ageInMonths,
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSelectBabyOpen(true)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 transition cursor-pointer"
              >
                {t("Change")}
              </button>
            </div>
          ) : (
            <div className="rounded-2xl p-4 flex items-center justify-between border border-dashed border-gray-200 bg-gray-50/50">
              <div className="text-start">
                <p className="font-semibold text-gray-700 text-sm">
                  {t("No baby selected")}
                </p>
                <p className="text-xs text-gray-500">
                  {t("Select a baby to start analysis")}
                </p>
              </div>
              <button
                onClick={() => setIsSelectBabyOpen(true)}
                className="px-4 py-1.5 text-xs font-bold rounded-full text-white transition hover:opacity-90 cursor-pointer"
                style={{ background: "var(--color-primary)" }}
              >
                {t("Select Baby")}
              </button>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (selectedChildId) {
                navigate("/skin-diagnosis/upload");
              } else {
                setIsSelectBabyOpen(true);
              }
            }}
            className="w-fit px-(--space-xl) py-(--space-sm) rounded-full text-white font-bold transition-(--transition-fast)"
            style={{ background: "var(--color-primary)" }}
          >
            {selectedChild ? t("Upload photo") : t("Select Baby & Start")}
          </motion.button>

          <p className="text-muted italic" style={{ fontSize: "13px" }}>
            {t(
              "This is guidance, not medical advice. Trust your instincts — you know your baby best.",
            )}
          </p>
        </motion.div>
      </div>

      <BabySelectDialog
        open={isSelectBabyOpen}
        onOpenChange={setIsSelectBabyOpen}
        onSelect={() => navigate("/skin-diagnosis/upload")}
      />
    </section>
  );
};

export default SkinDiagnosis;
