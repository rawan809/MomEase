import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeroText = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 space-y-(--space-lg)"
    >
      <h1 className="font-(--font-brand) text-h1 leading-tight">
        {t("You’re not alone. We’re here to support you after")}{" "}
        <span className="text-primary">{t("childbirth.")}</span>
      </h1>

      <p className=" text-muted max-w-xl">
        {t(
          "From health tracking to emotional check-ins everything you need to feel safe, supported, and in control.",
        )}
      </p>

      <div className="flex gap-(--space-md)">
        <Link
          to="/login"
          className="
            bg-accent
            px-(--space-lg)
            py-(--space-sm)
            rounded-lg
            shadow-(--shadow-md)
            transition-(--transition-fast)
            hover:scale-105
          "
        >
          {t("Start now")}
        </Link>

        <button
          className="
            border-2 border-primary
            text-primary
            px-(--space-lg)
            py-(--space-sm)
            rounded-lg
            transition-(--transition-fast)
            hover:bg-primary
            hover:text-white
          "
        >
          {t("Download the app")}
        </button>
      </div>
    </motion.div>
  );
};

export default HeroText;
