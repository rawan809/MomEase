import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const getSeverityColor = (level: string) => {
  const l = level?.toLowerCase();
  if (l === "minimal" || l === "none") return "#4caf50";
  if (l === "mild") return "#ff9800";
  if (l === "moderate") return "#f44336";
  if (l === "moderately severe" || l === "severe") return "#b71c1c";
  return "var(--color-primary)";
};

const getSeverityMessage = (level: string) => {
  const l = level?.toLowerCase();
  if (l === "minimal" || l === "none")
    return "You're doing well emotionally! Your responses suggest minimal signs of depression.";
  if (l === "mild")
    return "You're experiencing some mild symptoms. Consider talking to someone you trust.";
  if (l === "moderate")
    return "You're showing moderate signs that deserve attention. We encourage you to reach out to a healthcare provider.";
  if (l === "moderately severe" || l === "severe")
    return "Your responses indicate significant symptoms. Please reach out to a mental health professional.";
  return "Thank you for completing the assessment.";
};

const getRecommendations = (level: string): string[] => {
  const l = level?.toLowerCase();
  if (l === "minimal" || l === "none")
    return [
      "Take small moments for yourself, even 5 minutes of quiet time.",
      "Connect with loved ones or join a mother's support group.",
      "Remember: asking for help is a sign of strength, not weakness.",
    ];
  if (l === "mild")
    return [
      "Try to maintain a regular sleep and eating schedule.",
      "Talk to a trusted friend or family member about how you feel.",
      "Monitor your mood over the next few weeks.",
    ];
  if (l === "moderate")
    return [
      "Schedule an appointment with your doctor or a counselor.",
      "Avoid isolating yourself — stay connected with supportive people.",
      "Consider joining a postpartum support group.",
    ];
  if (l === "moderately severe" || l === "severe")
    return [
      "Please contact your doctor or a mental health professional as soon as possible.",
      "Do not manage this alone — support is available and effective.",
      "If you feel unsafe, contact emergency services immediately.",
    ];
  return [];
};

const AssessmentResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const result = state?.result?.data;
  const maxScore = state?.maxScore;
  const severityColor = getSeverityColor(result?.levelName);
  const message = getSeverityMessage(result?.levelName);
  const recommendations = getRecommendations(result?.levelName);

  return (
    <div
      className="h-screen flex items-center justify-center px-(--space-lg) overflow-hidden"
      style={{ background: "var(--color-background)" }}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-primary text-2xl font-bold hover:opacity-70 transition"
      >
        ‹
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl p-(--space-md) w-full max-w-md flex flex-col gap-(--space-sm)"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <div
          className="rounded-2xl p-(--space-sm) text-center"
          style={{ background: `${severityColor}18` }}
        >
          <p className="text-(--text-small) mb-1">Emotional Well-being</p>
          <h2
            className="font-(--font-brand) text-h2"
            style={{ color: severityColor }}
          >
            {result?.levelName}
          </h2>
          <p className="text-(--text-small) mt-1">
            Score: {result?.totalScore}
          </p>
        </div>

        <p className="text-center text-muted">{message}</p>

        {result?.advice && (
          <div
            className="rounded-2xl p-(--space-sm)"
            style={{
              background: `${severityColor}10`,
              borderLeft: `4px solid ${severityColor}`,
            }}
          >
            <p className="text-(--text-small)" style={{ color: severityColor }}>
              {result.advice}
            </p>
          </div>
        )}

        <div
          className="rounded-2xl p-(--space-sm)"
          style={{ background: "var(--color-background)" }}
        >
          <h4 className="font-bold text-(--text-small) mb-(--space-xs)">
            Gentle Recommendations
          </h4>
          <ul className="flex flex-col gap-(--space-xs)">
            {recommendations.map((rec, i) => (
              <li key={i} className="text-(--text-small) flex gap-(--space-xs)">
                <span style={{ color: "var(--color-primary)" }}>•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() =>
            navigate(`/assessment/${result?.assessmentId}`, {
              state: { maxScore },
            })
          }
          className="w-full py-(--space-sm) rounded-full text-white font-bold transition-(--transition-fast) hover:opacity-90"
          style={{ background: "var(--color-primary)" }}
        >
          Retake Check-In
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
      </motion.div>
    </div>
  );
};

export default AssessmentResult;
