import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SkinImage from "../../src/assets/images/Dep.png";
import { useTranslation } from "react-i18next";

const SkinDiagnosis = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
              <span className="text-primary font-semibold">{t("Skin Diagnosis")}</span>
            </p>
            <h1 className="font-bold text-(--text-normal) leading-snug mt-(--space-xs)">
              {t("Get AI-powered insights about common baby skin conditions and gentle care tips.")}
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

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/skin-diagnosis/upload")}
            className="w-fit px-(--space-xl) py-(--space-sm) rounded-full text-white font-bold transition-(--transition-fast)"
            style={{ background: "var(--color-primary)" }}
          >
            {t("Upload photo")}
          </motion.button>

          <p className="text-muted italic" style={{ fontSize: "13px" }}>
            {t("This is guidance, not medical advice. Trust your instincts — you know your baby best.")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkinDiagnosis;