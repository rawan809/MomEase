import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Mic } from "lucide-react";

const mockResult = {
  condition: "Discomfort",
  description:
    "The cry sounds suggest your baby might be uncomfortable. This could be due to a wet diaper, room temperature, or restrictive clothing.",
  recommendations: [
    "Take small moments for yourself, even 5 minutes of quiet time.",
    "Connect with loved ones or join a mother's support group.",
    "If you're concerned, reach out to your healthcare provider.",
    "Remember: asking for help is a sign of strength, not weakness.",
  ],
};

const CryResult = () => {
  const navigate = useNavigate();

  return (
    <section
      className="min-h-screen flex items-center justify-center px-(--space-lg) py-(--space-xl)"
      style={{ background: "var(--color-background)" }}
    >
      <div className="max-w-xl w-full mx-auto flex flex-col lg:flex-row gap-(--space-lg) items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-white rounded-3xl p-(--space-lg) flex flex-col gap-(--space-md)"
          style={{ boxShadow: "var(--shadow-md)" }}
        >
          <div className="flex flex-col items-center text-center gap-(--space-sm)">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 64, height: 64, background: "#f0fdf4" }}
            >
              <CheckCircle size={32} style={{ color: "#4caf50" }} />
            </div>

            <p style={{ fontSize: 18, color: "var(--color-muted)" }}>
              Baby Might Be:{" "}
              <span
                className="font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {mockResult.condition}
              </span>
            </p>

            <p
              style={{
                fontSize: 14,
                color: "var(--color-muted)",
                lineHeight: 1.7,
                maxWidth: 420,
              }}
            >
              {mockResult.description}
            </p>
          </div>

          <div
            className="rounded-2xl p-(--space-md)"
            style={{ background: "var(--color-background)" }}
          >
            <p
              className="font-bold text-sm mb-(--space-sm)"
              style={{ color: "var(--color-primary)" }}
            >
              Recommended Steps
            </p>
            <ul className="flex flex-col gap-(--space-sm)">
              {mockResult.recommendations.map((rec, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2"
                  style={{ fontSize: 13, color: "var(--color-muted)" }}
                >
                  <span
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--color-primary)" }}
                  >
                    •
                  </span>
                  {rec}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex gap-(--space-sm) flex-wrap">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/cryAnalysis/record")}
              className="flex items-center gap-2 px-(--space-lg) py-(--space-sm) rounded-full text-white font-bold transition hover:opacity-90"
              style={{ background: "var(--color-primary)", fontSize: 13 }}
            >
              <Mic size={14} />
              Analyze another cry
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/home")}
              className="flex items-center gap-2 px-(--space-lg) py-(--space-sm) rounded-full font-bold border-2 transition hover:bg-pink-50"
              style={{
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
                fontSize: 13,
              }}
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CryResult;
