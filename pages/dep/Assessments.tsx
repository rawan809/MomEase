import { type JSX, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Timer from "../../src/assets/icons/timer";
import ShieldCheck from "../../src/assets/icons/shieldCheck";
import Lock from "../../src/assets/icons/lock";

interface Assessment {
  assessmentId: number;
  name: string;
  description: string;
  totalQuestions: number;
  maxScore: number;
}

// map each assessmentId to an icon and a short label
const assessmentMeta: Record<number, { icon: JSX.Element; label: string }> = {
  1: { icon: <ShieldCheck />, label: "Postnatal" },
  2: { icon: <Timer />, label: "Depression" },
  3: { icon: <Lock />, label: "Anxiety" },
};

const AssessmentList = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await fetch("http://momease.runasp.net/api/assessments");
        const data = await res.json();
        setAssessments(data);
      } catch (err) {
        console.error("Failed to fetch assessments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-primary">Loading...</p>
      </div>
    );
  }

  return (
    <section
      className="min-h-screen py-(--space-xl) px-(--space-lg)"
      style={{ background: "var(--color-background)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-(--space-xl)"
        >
          <h1 className="font-(--font-brand) text-h1 leading-tight mb-(--space-sm)">
            Depression Self-Assessment Tests
          </h1>
          <p className="text-muted">
            Choose a test based on your comfort level and availability
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-(--space-lg)">
          {assessments.map((assessment, i) => {
            const meta = assessmentMeta[assessment.assessmentId];
            return (
              <motion.div
                key={assessment.assessmentId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-2xl p-(--space-lg) flex flex-col gap-(--space-md)"
                style={{ boxShadow: "var(--shadow-md)" }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 56, height: 56, background: "#ffe5ef" }}
                >
                  <div style={{ width: 24, height: 24 }}>{meta?.icon}</div>
                </div>

                {/* Title */}
                <h2 className="font-bold text-(--text-normal)">
                  {assessment.name}
                </h2>

                {/* Description */}
                <p className="text-muted flex-1">{assessment.description}</p>

                {/* Meta info */}
                <div className="flex gap-(--space-md) text-(--text-small) font-semibold">
                  <span>{assessment.totalQuestions} Questions</span>
                  <span>Max Score: {assessment.maxScore}</span>
                </div>

                {/* Button */}
                <button
                  onClick={() =>
                    navigate(`/assessment/${assessment.assessmentId}`)
                  }
                  className="w-full py-(--space-sm) rounded-full text-white font-bold transition-(--transition-fast) hover:opacity-90"
                  style={{ background: "var(--color-primary)" }}
                >
                  Start Test
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AssessmentList;
