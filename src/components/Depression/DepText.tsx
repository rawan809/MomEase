import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar } from "lucide-react";

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
        {t(
          "This is a safe, private space to reflect on how you've been feeling. There are no wrong answers.",
        )}
      </p>
      <div className="flex gap-(--space-md) justify-center flex-wrap">
        <button
          onClick={() => navigate("/assessments")}
          className="
            text-white
            px-(--space-xl)
            py-(--space-sm)
            rounded-lg
            transition-(--transition-fast)
            bg-primary
            hover:bg-primary/90
          "
        >
          {t("Start Check-in")}{" "}
        </button>{" "}
        <button
          onClick={() => navigate("/depression/history")}
          className="
          flex items-center gap-2
            px-(--space-xl)
            py-(--space-sm)
            rounded-lg
            transition-(--transition-fast)
            border-2 border-primary
            hover:bg-accent/50
          "
        >
          <Calendar size={15}/>
          {t("View History")}{" "}
        </button>
      </div>
    </motion.div>
  );
};

export default DepText;
