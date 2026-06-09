import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, BarChart2, CheckCircle, Square } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useChild } from "@/contexts/ChildContext";
import formatBabyAge from "@/utils/formatBabyAge";
import { useChildren } from "@/hooks/useChildren";

const CryRecording = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { selectedChildId } = useChild();
  const { fetchChildById, children, selectedChild } = useChildren();
  useEffect(() => {
    if (children.length > 0 && selectedChildId !== null) {
      fetchChildById(selectedChildId);
    }
  }, [children, selectedChildId]);
  // const selectedChild = children.find((c) => c.childId === selectedChildId);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const guidelines = [
    "Stay within 1 meter of baby",
    "Minimize background noise",
    "Capture at least 10 seconds",
  ];

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } catch (err) {
      setError(t("Microphone access denied. Please allow microphone access."));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    clearInterval(intervalRef.current);
    setIsRecording(false);
    setIsDone(true);
  };

  const handleAnalyze = () => {
    if (!audioBlob) return;
    const audioFile = new File([audioBlob], "baby-cry.webm", {
      type: "audio/webm",
    });
    navigate("/cryAnalysis/analyzing", { state: { audioFile } });
  };

  const handleReset = () => {
    setSeconds(0);
    setIsDone(false);
    setIsRecording(false);
    setAudioBlob(null);
    chunksRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  return (
    <section
      className="min-h-screen px-(--space-lg) py-(--space-xl) pt-20 "
      style={{ background: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-(--space-md) ">
        {selectedChild ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center justify-between p-4  rounded-2xl border shadow-sm bg-accent/50 w-full ${selectedChild.gender === "Boy" ? "border-blue-400" : "border-primary"} `}
          >
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                {selectedChild.photoUrl ? (
                  <img
                    src={selectedChild.photoUrl}
                    alt={selectedChild.fullName}
                    className={`w-12 h-12 rounded-full object-cover border-2 ${
                      selectedChild.gender === "Boy"
                        ? "border-blue-400"
                        : "border-primary"
                    }`}
                  />
                ) : (
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg bg-white ${
                      selectedChild.gender === "Boy"
                        ? "border-blue-400 text-blue-500"
                        : "border-primary text-primary"
                    }`}
                  >
                    {selectedChild.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                {isRecording && (
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border border-white"></span>
                  </span>
                )}
              </div>
              <div className="text-start">
                <p className="font-bold text-gray-800 text-base md:text-lg leading-tight">
                  {t("Recording cry for {{name}}", {
                    name: selectedChild.fullName,
                  })}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {formatBabyAge({
                    ageInDays: selectedChild.ageInDays,
                    ageInMonths: selectedChild.ageInMonths,
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/cryAnalysis")}
              className="px-4 py-1.5 text-xs font-semibold rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 transition cursor-pointer"
            >
              {t("Back")}
            </button>
          </motion.div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border shadow-sm w-full border-gray-100">
            <h1 className="text-xl font-semibold text-gray-800">
              {t("Crying Sound Analysis")}
            </h1>
            <button
              onClick={() => navigate("/cryAnalysis")}
              className="px-4 py-1.5 text-xs font-semibold rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 transition cursor-pointer"
            >
              {t("Back")}
            </button>
          </div>
        )}

        {/*  Two-column grid  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-(--space-md) items-start min-h-[30vh]">
          {/*  Left: Record Card  */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-(--space-lg) flex flex-col items-center gap-(--space-md) h-full shadow-md "
          >
            {/* Error */}
            {error && (
              <div
                className="w-full px-(--space-md) py-(--space-sm) rounded-xl text-sm"
                style={{ background: "#fff3f3", color: "#f44336" }}
              >
                {error}
              </div>
            )}

            {/* Mic Button */}
            <motion.button
              onClick={() => {
                if (isDone) return;
                if (isRecording) stopRecording();
                else startRecording();
              }}
              animate={isRecording ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{
                duration: 1,
                repeat: isRecording ? Infinity : 0,
              }}
              className="flex items-center justify-center rounded-full text-white"
              style={{
                width: 100,
                height: 100,
                background: isDone ? "#4caf50" : "var(--color-primary)",
                boxShadow: isRecording
                  ? "0 0 0 12px #ff338130, 0 0 0 26px #ff338115"
                  : "var(--shadow-md)",
                cursor: isDone ? "default" : "pointer",
              }}
            >
              {isDone ? (
                <CheckCircle size={38} />
              ) : isRecording ? (
                <Square size={36} />
              ) : (
                <Mic size={38} />
              )}
            </motion.button>

            {/* Status */}
            <div className="text-center">
              <p className="font-semibold text-gray-700 pt-5">
                {isDone
                  ? t("Recording Complete!")
                  : isRecording
                    ? ""
                    : t("Hold Phone Near Baby")}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--color-muted)",
                  marginTop: 4,
                }}
              >
                {isDone
                  ? t("Click Analyze to get results")
                  : isRecording
                    ? t("Click the mic to stop")
                    : t("Tap the button to start recording")}
              </p>
            </div>

            {/* Timer */}
            {(isRecording || isDone) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <p
                  className="font-bold"
                  style={{
                    fontSize: 36,
                    color: isDone ? "#4caf50" : "var(--color-primary)",
                    letterSpacing: 1,
                  }}
                >
                  {formatTime(seconds)}
                </p>
                {isRecording && (
                  <p
                    className="font-semibold tracking-widest"
                    style={{ fontSize: 10, color: "var(--color-primary)" }}
                  >
                    {t("RECORDING BABY'S CRY...")}
                  </p>
                )}
              </motion.div>
            )}

            {/* Audio Preview */}
            {audioBlob && (
              <div className="w-full">
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t("Preview")}
                </p>
                <audio
                  controls
                  src={URL.createObjectURL(audioBlob)}
                  className="w-full"
                  style={{ borderRadius: 12 }}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-(--space-sm) w-full">
              {!isDone && (
                <button
                  onClick={() =>
                    isRecording ? stopRecording() : startRecording()
                  }
                  className="flex items-center justify-center gap-2 px-(--space-lg) py-(--space-sm) rounded-full font-bold border-2 transition hover:bg-pink-50 cursor-pointer"
                  style={{
                    borderColor: "var(--color-primary)",
                    color: "var(--color-primary)",
                    fontSize: 13,
                  }}
                >
                  {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
                  {isRecording ? t("Stop Recording") : t("Start Recording")}
                </button>
              )}

              {isDone && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleAnalyze}
                  className="flex items-center justify-center gap-2 px-(--space-lg) py-(--space-sm) rounded-full text-white font-bold transition hover:opacity-90 cursor-pointer"
                  style={{ background: "var(--color-primary)", fontSize: 13 }}
                >
                  <BarChart2 size={14} />
                  {t("Analyze Now")}
                </motion.button>
              )}

              {isDone && (
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-(--space-lg) py-(--space-sm) rounded-full font-bold border-2 transition hover:bg-gray-50 cursor-pointer"
                  style={{
                    borderColor: "#e5e7eb",
                    color: "#6b7280",
                    fontSize: 13,
                  }}
                >
                  {t("Record Again")}
                </button>
              )}
            </div>
            {/* 
            <p
              style={{
                fontSize: 12,
                color: "var(--color-muted)",
                textAlign: "center",
              }}
            >
              {t(
                "Tip: Be in a quiet place while you are recording for the most accurate results.",
              )}
            </p> */}
          </motion.div>

          {/*  Right: Side Cards  */}
          <div className="flex flex-col gap-(--space-md) ">
            {/* Live Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl p-(--space-md) border border-primary"
              // style={{ background: "white", boxShadow: "var(--shadow-md)" }}
            >
              <p
                className="font-bold text-sm mb-(--space-sm)"
                style={{ color: "var(--color-primary)" }}
              >
                {t("Live Insights")}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--color-muted)",
                  lineHeight: 1.6,
                }}
              >
                {t(
                  "Our AI listens for pitch, frequency, and intensity patterns unique to infants.",
                )}
              </p>
              <div
                className="flex gap-1 mt-(--space-sm) items-end"
                style={{ height: 28 }}
              >
                {[3, 5, 4, 7, 6, 5, 8, 4, 6, 5].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={
                      isRecording && !isDone
                        ? { scaleY: [1, h / 4, 1] }
                        : { scaleY: 1 }
                    }
                    transition={{
                      duration: 0.5,
                      repeat: isRecording ? Infinity : 0,
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
              <div></div>
            </motion.div>

            {/* Guidelines */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl p-(--space-md) border border-primary"
              // style={{ background: "white", boxShadow: "var(--shadow-md)" }}
            >
              <p
                className="font-bold text-sm mb-(--space-sm)"
                style={{ color: "var(--color-primary)" }}
              >
                {t("Guidelines")}
              </p>
              {guidelines.map((g, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <CheckCircle
                    size={13}
                    style={{ color: "var(--color-primary)" }}
                  />
                  <p style={{ fontSize: 12, color: "var(--color-muted)" }}>
                    {t(g)}
                  </p>
                </div>
              ))}
              <p className="font-bold text-primary p-y-(--space-md)  ">
                "{t("Every cry is a conversation")}"
              </p>
            </motion.div>

            {/* Quote */}
            {/* <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-(--space-md) text-center text-primary text-[12px] border border-primary"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <p
                className="font-bold"
              >
                "{t("Every cry is a conversation.")}"
              </p>
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryRecording;
