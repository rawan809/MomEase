import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface HeroTextProps {
  firstName?: string;
}

const HeroText = ({ firstName }: HeroTextProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 space-y-(--space-lg)"
    >
      <h1 className="font-(--font-brand) text-h1 leading-tight">
        {t("Welcome again,")} <span className="text-primary">{firstName}</span>
      </h1>

      <p className=" text-muted max-w-xl">{t("How can we help you today?")}</p>

      <div className="flex gap-(--space-md)">
        <Link
          to={"/community"}
          className="
            border-2 border-primary
            text-primary
            px-(--space-xl)
            py-(--space-sm)
            rounded-lg
            transition-(--transition-fast)
            hover:bg-primary
            hover:text-white
          "
        >
          {t("Join Our Community")}
        </Link>
      </div>
    </motion.div>
  );
};

export default HeroText;
