import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DepText = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 space-y-(--space-lg)"
    >
      <h2 className="font-(--font-brand) text-h1 leading-tight text-bold">
        {t("Let's Check In Together")}
      </h2>

      <p className=" text-muted max-w-xl">
        {t("This is a safe, private space to reflect on how you've been feeling. There are no wrong answers.")}
      </p>
      <div className="flex gap-(--space-md) justify-center">
        <button
          onClick={() => navigate("/assessments")}
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
          {t("Start Check-in")}{" "}
        </button>
      </div>
    </motion.div>
  );
};

export default DepText;