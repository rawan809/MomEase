import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const getSkinConditionInfo = (prediction: string) => {
  const p = prediction?.toLowerCase();

  if (p.includes("diaper") || p.includes("insect"))
    return {
      description:
        "Skin irritation caused by moisture or insect bites. Appears as redness or small bumps.",
      tips: [
        "Keep the area clean and dry",
        "Use gentle baby products",
        "Avoid scratching",
        "Consult doctor if swelling increases",
      ],
    };

  if (p.includes("impetigo"))
    return {
      description:
        "A contagious bacterial skin infection causing red sores or blisters.",
      tips: [
        "Keep skin clean",
        "Avoid touching the sores",
        "Use prescribed antibiotic cream",
        "Wash hands frequently",
      ],
    };

  if (p.includes("hand") || p.includes("mouth"))
    return {
      description:
        "A viral infection causing sores in the mouth and rash on hands and feet.",
      tips: [
        "Give plenty of fluids",
        "Keep child comfortable",
        "Avoid spicy foods",
        "Consult doctor if fever is high",
      ],
    };

  if (p.includes("chicken"))
    return {
      description:
        "A viral infection causing itchy red blisters that spread across the body.",
      tips: [
        "Avoid scratching",
        "Keep nails short",
        "Use soothing lotions",
        "Consult doctor if symptoms worsen",
      ],
    };

  return {
    description: "General skin condition detected.",
    tips: [
      "Keep skin clean",
      "Avoid irritation",
      "Monitor symptoms",
      "Consult doctor if needed",
    ],
  };
};

const SkinResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const result = state?.result;
  const prediction = result?.data?.diseaseName || "Unknown";
  const confidence = result?.data?.confidence
    ? `${result.data.confidence}%`
    : "0%";
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
