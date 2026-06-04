import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mic, Info, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import HeroImage from "@/components/HeroSection/HeroImage";

const CryAnalysis = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          <div className="flex justify-center lg:justify-center">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 56, height: 56, background: "#fff0f6" }}
            >
              <Mic size={24} style={{ color: "var(--color-primary)" }} />
            </div>
          </div>

          <h1
            className="font-bold text-center lg:text-left leading-tight"
            style={{ fontSize: 36 }}
          >
            {t("Understanding Baby's Cry")}
          </h1>

          <p
            className="text-center lg:text-left"
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
              <Info size={14} />
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
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--color-primary)" }}
                />
                <p style={{ fontSize: 13, color: "var(--color-muted)" }}>
                  {t(step)}
                </p>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/cryAnalysis/record")}
            className="flex items-center justify-center gap-2 py-(--space-sm) rounded-full text-white font-bold transition hover:opacity-90 cursor-pointer"
            style={{ background: "var(--color-primary)", fontSize: 15 }}
          >
            <Mic size={16} />
            {t("Start Recording")}
          </motion.button>

          <p
            className="text-center italic"
            style={{ fontSize: 12, color: "var(--color-muted)" }}
          >
            {t(
              "This is guidance, not medical advice. Trust your instincts — you know your baby best.",
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CryAnalysis;