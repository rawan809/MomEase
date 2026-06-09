import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mic, Info, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import HeroImage from "@/components/HeroSection/HeroImage";
import { BabySelectDialog } from "@/components/UI/BabySelectDialog";
import { useChild } from "@/contexts/ChildContext";
import formatBabyAge from "@/utils/formatBabyAge";
import { useEffect } from "react";
import { useChildren } from "@/hooks/useChildren";

const CryAnalysis = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSelectBabyOpen, setIsSelectBabyOpen] = useState(false);
  const { selectedChildId } = useChild();
  const { children, fetchChildById, selectedChild } = useChildren();
  // const selectedChild = children.find((c) => c.childId === selectedChildId);

  useEffect(() => {
    if (children.length > 0 && selectedChildId !== null) {
      fetchChildById(selectedChildId);
    }
  }, [children, selectedChildId]);
  
  return (
    <section
      className="min-h-screen flex items-center justify-center px-(--space-lg) py-(--space-xl) pt-20"
      style={{ background: "var(--color-background)" }}
    >
      <div className="max-w-5xl w-full mx-auto flex flex-col-reverse lg:flex-row items-center gap-(--space-xl)">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex justify-center"
        >
          <HeroImage />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col gap-(--space-md)"
        >
          {/* <div className="flex justify-center lg:justify-center">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 56, height: 56, background: "#fff0f6" }}
            >
              <Mic size={24} style={{ color: "var(--color-primary)" }} />
            </div>
          </div> */}

          <h1 className="font-bold  leading-tight" style={{ fontSize: 36 }}>
            {t("Understanding Baby's Cry")}
          </h1>

          <p
            className=" "
            style={{
              color: "var(--color-muted)",
              fontSize: 15,
              lineHeight: 1.7,
            }}
          >
            {t(
              "Let our AI help you understand what your baby might be trying to communicate through their cry. Our clinical-grade analysis provides instant emotional clarity.",
            )}
          </p>

          <div
            className="rounded-2xl p-(--space-md) flex flex-col gap-(--space-sm)"
            style={{ background: "white", boxShadow: "var(--shadow-md)" }}
          >
            <p
              className="font-bold text-sm flex items-center gap-2"
              style={{ color: "var(--color-primary)" }}
            >
              {/* <Info size={14} /> */}
              {t("How It Works")}
            </p>
            {[
              "Record your baby's cry for 5-10 seconds while keeping the device near.",
              "AI analyzes the sound patterns, pitch, and frequency in real-time.",
              "Get insights and gentle, clinically-backed suggestions to try immediately.",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle
                  size={14}
                  className="shrink-0 mt-0.5 text-primary"
                />
                <p style={{ fontSize: 13, color: "var(--color-muted)" }}>
                  {t(step)}
                </p>
              </div>
            ))}
          </div>

          {/* Baby Selection Card */}
          {selectedChild ? (
            <div
              className={`rounded-2xl p-4 flex items-center justify-between border  gap-3 bg-white ${selectedChild.gender === "Boy" ? "border-blue-400" : "border-primary"} shadow-md `}
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
                    {t("Analyzing cry for:")}
                  </span>
                  <p className="font-bold  leading-tight">
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
                navigate("/cryAnalysis/record");
              } else {
                setIsSelectBabyOpen(true);
              }
            }}
            className="flex items-center justify-center gap-2 py-(--space-sm) rounded-full text-white font-bold transition hover:opacity-90 cursor-pointer"
            style={{ background: "var(--color-primary)", fontSize: 15 }}
          >
            <Mic size={16} />
            {selectedChild ? t("Start Recording") : t("Select Baby & Start")}
          </motion.button>

          <p
            className="text-center "
            style={{ fontSize: 12, color: "var(--color-muted)" }}
          >
            {t(
              "This is guidance, not medical advice. Trust your instincts — you know your baby best.",
            )}
          </p>
        </motion.div>
      </div>

      <BabySelectDialog
        open={isSelectBabyOpen}
        onOpenChange={setIsSelectBabyOpen}
        onSelect={() => navigate("/cryAnalysis/record")}
      />
    </section>
  );
};

export default CryAnalysis;
