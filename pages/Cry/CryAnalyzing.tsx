import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, Clock, Target } from "lucide-react";

const CryAnalyzing = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const audioFile = state?.audioFile;

  const [currentStep, setCurrentStep] = useState(0);
  const [duration, setDuration] = useState("00:00s");

  const steps = [
    { label: "Loading audio", done: false },
    { label: "Noise filtering", done: false },
    { label: "Pattern recognition", done: false },
    { label: "Generating insights", done: false },
  ];

  const [stepStates, setStepStates] = useState(steps.map(() => false));

  useEffect(() => {
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        const secs = Math.floor(audio.duration);
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        setDuration(
          `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}s`,
        );
      };
    }
  }, [audioFile]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((_, i) => {
      const t = setTimeout(
        () => {
          setStepStates((prev) => {
            const updated = [...prev];
            updated[i] = true;
            return updated;
          });
          setCurrentStep(i + 1);
        },
        (i + 1) * 900,
      );
      timers.push(t);
    });

    const navTimer = setTimeout(
      () => {
        navigate("/cryAnalysis/result", { state: { audioFile } });
      },
      steps.length * 900 + 500,
    );
    timers.push(navTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

  const fileSizeKb = audioFile
    ? (audioFile.size / 1024).toFixed(1) + " KB"
    : "—";

  const stats = [
    { icon: MapPin, label: "Frequency Map", value: "44.1kHz" },
    { icon: Clock, label: "Duration", value: duration },
    {
      icon: Target,
      label: "Confidence",
      value: `${Math.min(94, currentStep * 25)}%`,
    },
  ];

  return (
    <section
      className="min-h-screen flex items-center justify-center px-(--space-lg)"
      style={{ background: "var(--color-background)" }}
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row gap-(--space-lg) items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-white rounded-3xl p-(--space-xl) flex flex-col items-center gap-(--space-md)"
          style={{ boxShadow: "var(--shadow-md)" }}
        >
          <button
            onClick={() => navigate(-1)}
            className="self-start text-sm font-semibold flex items-center gap-1 hover:opacity-70 transition"
            style={{ color: "var(--color-primary)" }}
          >
            ‹ Cancel Analysis
          </button>

          <p
            className="font-bold text-xs tracking-widest uppercase flex items-center gap-1"
            style={{ color: "var(--color-primary)" }}
          >
            ✦ AI Precision Engine
          </p>

          <h1 className="font-bold text-center" style={{ fontSize: 28 }}>
            Analyzing Crying Condition
          </h1>

          <p
            className="text-center"
            style={{
              fontSize: 14,
              color: "var(--color-muted)",
              lineHeight: 1.7,
              maxWidth: 360,
            }}
          >
            Our AI is carefully examining the unique sound patterns, frequency,
            and intensity of the baby's cry to provide you with meaningful
            insights.
          </p>

          <div className="flex items-center gap-1 my-(--space-sm)">
            {[4, 7, 5, 9, 6, 8, 5, 7, 4, 8, 6, 9, 5, 7, 4].map((h, i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [1, h / 3, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.08,
                }}
                className="rounded-full"
                style={{
                  width: 5,
                  height: h * 4,
                  background: "var(--color-primary)",
                  transformOrigin: "center",
                }}
              />
            ))}
          </div>

          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-2 px-(--space-md) py-(--space-xs) rounded-full"
            style={{ background: "#fff0f6" }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--color-primary)" }}
            />
            <p
              className="font-semibold"
              style={{ fontSize: 12, color: "var(--color-primary)" }}
            >
              {stepStates.every(Boolean)
                ? "Analysis Complete!"
                : "Processing Audio Waveform..."}
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-(--space-md) w-full">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="flex flex-col items-center gap-1 p-(--space-sm) rounded-2xl"
                style={{ background: "var(--color-background)" }}
              >
                <stat.icon
                  size={16}
                  style={{ color: "var(--color-primary)" }}
                />
                <p style={{ fontSize: 11, color: "var(--color-muted)" }}>
                  {stat.label}
                </p>
                <p className="font-bold" style={{ fontSize: 13 }}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          {audioFile && (
            <div
              className="w-full rounded-xl px-(--space-md) py-(--space-xs) flex items-center justify-between"
              style={{ background: "var(--color-background)", fontSize: 12 }}
            >
              <span style={{ color: "var(--color-muted)" }}>
                📁 {audioFile.name}
              </span>
              <span style={{ color: "var(--color-muted)" }}>{fileSizeKb}</span>
            </div>
          )}
        </motion.div>

        <div className="flex flex-col gap-(--space-md) w-full lg:w-72 shrink-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-(--space-md)"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <p
              className="font-bold text-sm mb-(--space-md)"
              style={{ color: "var(--color-primary)" }}
            >
              Analysis Progress
            </p>
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <div
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: 20,
                    height: 20,
                    background: stepStates[i]
                      ? "var(--color-primary)"
                      : "#f3f4f6",
                  }}
                >
                  {stepStates[i] ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5L4 7L8 3"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      className="w-2 h-2 rounded-full"
                      style={{ background: "var(--color-primary)" }}
                    />
                  )}
                </div>
                <p
                  className="text-sm"
                  style={{
                    color: stepStates[i]
                      ? "var(--color-primary)"
                      : "var(--color-muted)",
                    fontWeight: stepStates[i] ? 600 : 400,
                  }}
                >
                  {step.label}
                </p>
              </div>
            ))}

            <div
              className="w-full rounded-full mt-(--space-sm)"
              style={{ height: 6, background: "#f3f4f6" }}
            >
              <motion.div
                animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full"
                style={{ background: "var(--color-primary)" }}
              />
            </div>
            <p
              className="text-right mt-1"
              style={{ fontSize: 11, color: "var(--color-muted)" }}
            >
              {Math.round((currentStep / steps.length) * 100)}%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-(--space-md)"
            style={{ background: "#fff0f6", boxShadow: "var(--shadow-md)" }}
          >
            <p
              className="font-bold text-xs mb-(--space-sm) flex items-center gap-1"
              style={{ color: "var(--color-primary)" }}
            >
              💡 Parenting Pro-Tip
            </p>
            <p
              style={{
                fontSize: 12,
                color: "var(--color-muted)",
                lineHeight: 1.6,
              }}
            >
              While we analyze, remember to take a deep breath. You're doing a
              great job. Sometimes a gentle hum or a change in lighting can help
              soothe both you and the baby.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CryAnalyzing;
