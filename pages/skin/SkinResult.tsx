import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const getSkinConditionInfo = (prediction: string) => {
  const p = prediction?.toLowerCase();

  if (p?.includes("diaper"))
    return {
      description:
        "A common skin irritation in the diaper area caused by prolonged exposure to moisture. Appears as red, inflamed skin.",
      tips: [
        "Change diapers frequently to keep skin dry",
        "Use fragrance-free baby wipes",
        "Apply a zinc oxide barrier cream at each change",
        "Allow baby some diaper-free time to air out",
      ],
    };
  if (p?.includes("eczema"))
    return {
      description:
        "Yellowish, greasy, scaly patches on the scalp. May also appear on eyebrows or behind ears. Very common in infants.",
      tips: [
        "Gently massage baby's scalp with your fingers",
        "Wash hair regularly with gentle baby shampoo",
        "Use a soft brush to loosen flakes",
        "Apply baby oil before washing if very crusty",
      ],
    };
  if (p?.includes("acne"))
    return {
      description:
        "Small red or white bumps on baby's face caused by maternal hormones. Usually clears up on its own within weeks.",
      tips: [
        "Gently wash the area with warm water daily",
        "Avoid squeezing or scrubbing the bumps",
        "Do not apply lotions or oils to affected area",
        "Consult your doctor if it worsens",
      ],
    };
  if (p?.includes("ringworm"))
    return {
      description:
        "A fungal infection that appears as a circular, scaly rash. It is contagious and requires antifungal treatment.",
      tips: [
        "Keep the affected area clean and dry",
        "Consult your doctor for antifungal cream",
        "Wash hands thoroughly after touching the area",
        "Avoid sharing towels or clothing",
      ],
    };
  return {
    description:
      "A skin condition detected by AI analysis. Please consult your healthcare provider for a proper diagnosis.",
    tips: [
      "Keep the affected area clean and dry",
      "Avoid harsh soaps or fragrances",
      "Monitor the condition over the next few days",
      "Consult your doctor if it worsens or spreads",
    ],
  };
};

const SkinResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const result = state?.result;
  const prediction = result?.prediction;
  const confidence = result?.confidence;
  const info = getSkinConditionInfo(prediction);

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        height: "calc(100vh - 64px)",
        background: "var(--color-background)",
        padding: "24px 32px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full max-w-2xl mx-auto w-full gap-(--space-md)"
      >
        <div className="flex flex-col items-center text-center gap-(--space-xs)">
          <div
            className="flex items-center justify-center rounded-full mb-(--space-xs)"
            style={{ width: 52, height: 52, background: "#f0fdf4" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13L9 17L19 7"
                stroke="#4caf50"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-(--text-small)">Likely Condition</p>
          <h2
            className="font-(--font-brand) text-h2"
            style={{ color: "var(--color-primary)" }}
          >
            {prediction}
          </h2>
          <p className="text-muted" style={{ fontSize: "13px" }}>
            Confidence: {confidence}
          </p>
          <p className="text-muted max-w-md" style={{ fontSize: "14px" }}>
            {info.description}
          </p>
        </div>

        <div
          className="rounded-2xl p-(--space-md) flex-1"
          style={{
            background: "white",
            borderLeft: "4px solid var(--color-primary)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <h4 className="font-bold text-(--text-small) mb-(--space-sm)">
            Gentle Care Tips
          </h4>
          <ul className="flex flex-col gap-(--space-sm)">
            {info.tips.map((tip, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-start gap-(--space-xs)"
                style={{ fontSize: "14px", color: "var(--color-muted)" }}
              >
                <span
                  style={{
                    color: "var(--color-primary)",
                    fontSize: "18px",
                    lineHeight: 1,
                  }}
                >
                  •
                </span>
                {tip}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-(--space-sm)">
          <button
            onClick={() => navigate("/skin-diagnosis/upload")}
            className="w-full py-(--space-sm) rounded-full text-white font-bold transition-(--transition-fast) hover:opacity-90"
            style={{ background: "var(--color-primary)" }}
          >
            Analyze another Photo
          </button>

          <button
            onClick={() => navigate("/home")}
            className="w-full py-(--space-sm) rounded-full font-bold text-(--text-small) border-2 transition-(--transition-fast) hover:bg-pink-50"
            style={{
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
            }}
          >
            Back to Home
          </button>
        </div>

        <p
          className="text-center text-muted italic"
          style={{ fontSize: "12px" }}
        >
          This is guidance, not medical advice. Trust your instincts — you know
          your baby best.
        </p>
      </motion.div>
    </div>
  );
};

export default SkinResult;
