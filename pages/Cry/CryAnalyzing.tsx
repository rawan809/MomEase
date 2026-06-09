import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useChild } from "@/contexts/ChildContext";
import { useCryAnalysis } from "@/hooks/useBabyCry"; // 1. استيراد الهوك

const CryAnalyzing = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();
  const { children, selectedChildId } = useChild();

  // استدعاء الهوك الخاص بالـ API
  const { performCryAnalysis, loading } = useCryAnalysis();

  const selectedChild = children.find((c) => c.childId === selectedChildId);
  const audioFile = state?.audioFile;

  const [currentStep, setCurrentStep] = useState(0);
  const [duration, setDuration] = useState(`00:00${t("s")}`);
  const [error, setError] = useState<string | null>(null);

  // لحفظ نتيجة الـ API مؤقتاً حتى ينتهي الأنميشن المرئي
  const apiResponseRef = useRef<any>(null);
  const animationDoneRef = useRef<boolean>(false);

  const steps = [
    { label: "Loading audio", done: false },
    { label: "Noise filtering", done: false },
    { label: "Pattern recognition", done: false },
    { label: "Generating insights", done: false },
  ];

  const [stepStates, setStepStates] = useState(steps.map(() => false));

  // حساب مدة الملف الصوتي
  useEffect(() => {
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        const secs = Math.floor(audio.duration);
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        setDuration(
          `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}${t("s")}`,
        );
      };
    }
  }, [audioFile, t]);

  // 2. تفعيل الأنميشن المتتالي + إرسال طلب الـ API الفعلي
  useEffect(() => {
    if (!audioFile || !selectedChildId) {
      setError(t("Missing audio file or child selection."));
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    // أنميشن الخطوات الوهمي الجميل (كل خطوة تأخذ 900ms)
    steps.forEach((_, i) => {
      const tId = setTimeout(
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
      timers.push(tId);
    });

    // دالة استدعاء الـ API في الخلفية
    const startAnalysis = async () => {
      try {
        const response = await performCryAnalysis({
          childId: selectedChildId,
          audioFile: audioFile,
        });

        // حفظ النتيجة في المرجع (Ref) لعدم تدمير الأنميشن
        apiResponseRef.current = response;

        // لو الأنميشن خلص والـ API رجع، انقل فوراً
        if (animationDoneRef.current) {
          goToResultPage(response);
        }
      } catch (err: any) {
        setError(err.message || t("Analysis failed. Please try again."));
      }
    };

    startAnalysis();

    // مؤقت انتهاء الأنميشن بالكامل
    const totalAnimationTime = steps.length * 900 + 500;
    const finalTimer = setTimeout(() => {
      animationDoneRef.current = true;
      // لو الـ API خلص بالفعل قبل الأنميشن، انقل فوراً
      if (apiResponseRef.current) {
        goToResultPage(apiResponseRef.current);
      }
    }, totalAnimationTime);

    timers.push(finalTimer);

    return () => timers.forEach(clearTimeout);
  }, [audioFile, selectedChildId]);

  // دالة مشتركة للانتقال لصفحة النتائج مع تمرير البيانات الحقيقية
  const goToResultPage = (resultData: any) => {
    navigate("/cryAnalysis/result", {
      state: {
        audioFile,
        resultData, // الداتا الحقيقية القادمة من السيرفر
      },
    });
  };

  const fileSizeKb = audioFile
    ? (audioFile.size / 1024).toFixed(1) + " KB"
    : "—";

  const stats = [
    { icon: MapPin, label: "Frequency Map", value: "44.1kHz" },
    { icon: Clock, label: "Duration", value: duration },
  ];

  return (
    <section
      className="min-h-screen flex items-center justify-center px-(--space-lg) py-(--space-lg) pt-20"
      style={{ background: "var(--color-background)" }}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-(--space-lg) items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1  flex flex-col items-center gap-(--space-md)"
        >
          <button
            onClick={() => navigate(-1)}
            className="self-start text-sm font-semibold flex items-center gap-1 hover:opacity-70 transition cursor-pointer"
            style={{ color: "var(--color-primary)" }}
          >
            ‹ {t("Cancel Analysis")}
          </button>

          {/* عرض رسالة الخطأ إن وجدت */}
          {error && (
            <div className="w-full text-center text-red-500 bg-red-50 p-3 rounded-xl border border-red-200 text-sm">
              {error}
            </div>
          )}

          {selectedChild && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="relative">
                {selectedChild.photoUrl ? (
                  <img
                    src={selectedChild.photoUrl}
                    alt={selectedChild.fullName}
                    className={`w-20 h-20 rounded-full object-cover border-4 shadow-sm ${
                      selectedChild.gender === "Boy"
                        ? "border-blue-100"
                        : "border-pink-100"
                    }`}
                  />
                ) : (
                  <div
                    className={`w-20 h-20 rounded-full border-4 flex items-center justify-center font-bold text-2xl bg-white shadow-sm ${
                      selectedChild.gender === "Boy"
                        ? "border-blue-100 text-blue-500"
                        : "border-pink-100 text-pink-500"
                    }`}
                  >
                    {selectedChild.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border border-white"></span>
                </span>
              </div>
            </motion.div>
          )}

          <h1 className="font-bold text-center" style={{ fontSize: 28 }}>
            {selectedChild
              ? t("Analyzing {{name}}'s cry", { name: selectedChild.fullName })
              : t("Analyzing Crying Condition")}
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
            {t(
              "Our AI is carefully examining the unique sound patterns, frequency, and intensity of the baby's cry to provide you with meaningful insights.",
            )}
          </p>

          {/* Sound Waves Animation */}
          <div
            className="flex gap-1 mt-(--space-sm) items-end"
            style={{ height: 28 }}
          >
            {[3, 5, 4, 7, 6, 5, 8, 4, 6, 5].map((h, i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [1, h / 4, 1] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="rounded-full"
                style={{
                  width: 5,
                  height: h * 3,
                  background: "var(--color-primary)",
                  transformOrigin: "bottom",
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
              {/* لو الـ API طول والأنميشن خلص، يفضل يكتب للحارس جاري الاستخراج */}
              {loading && stepStates.every(Boolean)
                ? t("Finalizing deep analysis...")
                : stepStates.every(Boolean)
                  ? t("Analysis Complete!")
                  : t("Processing Audio Waveform...")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-(--space-md) w-full">
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
                  {t(stat.label)}
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
                {audioFile.name}
              </span>
              <span style={{ color: "var(--color-muted)" }}>{fileSizeKb}</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CryAnalyzing;
