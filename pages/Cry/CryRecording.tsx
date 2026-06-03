import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, BarChart2, CheckCircle } from "lucide-react";

const CryRecording = () => {
  const navigate = useNavigate();
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
      setError("Microphone access denied. Please allow microphone access.");
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
      className="min-h-screen flex items-center justify-center px-(--space-lg) py-(--space-xl)"
      style={{ background: "var(--color-background)" }}
    >
      <div className="max-w-4xl w-full mx-auto flex flex-col lg:flex-row gap-(--space-lg) items-start">
        <div className="flex flex-col gap-(--space-md) w-full lg:w-64 shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl p-(--space-md)"
            style={{ background: "white", boxShadow: "var(--shadow-md)" }}
          >
            <p
              className="font-bold text-sm mb-(--space-sm)"
              style={{ color: "var(--color-primary)" }}
            >
              Live Insights
            </p>
            <p
              style={{
                fontSize: 12,
                color: "var(--color-muted)",
                lineHeight: 1.6,
              }}
            >
              Our AI listens for pitch, frequency, and intensity patterns unique
              to infants.
            </p>
            <div className="flex gap-1 mt-(--space-sm) items-end">
              {[3, 5, 4, 7, 6, 5, 8, 4, 6, 5].map((h, i) => (
                <motion.div
                  key={i}
                  animate={
                    isRecording ? { scaleY: [1, h / 4, 1] } : { scaleY: 1 }
                  }
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  className="rounded-full"
                  style={{
                    width: 4,
                    height: h * 3,
                    background: "var(--color-primary)",
                    transformOrigin: "bottom",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-white rounded-3xl p-(--space-lg) flex flex-col items-center gap-(--space-md)"
          style={{ boxShadow: "var(--shadow-md)" }}
        >
          <div className="flex items-center gap-2">
            <BarChart2 size={16} style={{ color: "var(--color-primary)" }} />
            <p
              className="font-bold"
              style={{ color: "var(--color-primary)", fontSize: 14 }}
            >
              Crying Sound Analysis
            </p>
          </div>

          {error && (
            <div
              className="w-full px-(--space-md) py-(--space-sm) rounded-xl text-sm"
              style={{ background: "#fff3f3", color: "#f44336" }}
            >
              {error}
            </div>
          )}

          <motion.button
            onClick={() => {
              if (isDone) return;
              if (isRecording) stopRecording();
              else startRecording();
            }}
            animate={isRecording ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="flex items-center justify-center rounded-full text-white"
            style={{
              width: 120,
              height: 120,
              background: isDone ? "#4caf50" : "var(--color-primary)",
              boxShadow: isRecording
                ? "0 0 0 20px #ff338130, 0 0 0 40px #ff338115"
                : "var(--shadow-md)",
              cursor: isDone ? "default" : "pointer",
            }}
          >
            {isDone ? (
              <CheckCircle size={40} />
            ) : isRecording ? (
              <MicOff size={40} />
            ) : (
              <Mic size={40} />
            )}
          </motion.button>

          <p className="font-semibold text-gray-700">
            {isDone
              ? "Recording Complete!"
              : isRecording
                ? "Recording in progress..."
                : "Hold Phone Near Baby"}
          </p>

          <p style={{ fontSize: 13, color: "var(--color-muted)" }}>
            {isDone
              ? "Click Analyze to get results"
              : isRecording
                ? "Click the mic to stop"
                : "Tap the button to start recording"}
          </p>

          {(isRecording || isDone) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p
                className="font-bold"
                style={{
                  fontSize: 32,
                  color: isDone ? "#4caf50" : "var(--color-primary)",
                }}
              >
                {formatTime(seconds)}
              </p>
              {isRecording && (
                <p
                  className="font-semibold tracking-widest"
                  style={{ fontSize: 11, color: "var(--color-primary)" }}
                >
                  RECORDING BABY'S CRY...
                </p>
              )}
            </motion.div>
          )}

          {audioBlob && (
            <audio
              controls
              src={URL.createObjectURL(audioBlob)}
              className="w-full"
              style={{ borderRadius: 12 }}
            />
          )}

          <div className="flex flex-col gap-(--space-sm) w-full">
            {!isDone && (
              <button
                onClick={() =>
                  isRecording ? stopRecording() : startRecording()
                }
                className="flex items-center justify-center gap-2 px-(--space-lg) py-(--space-sm) rounded-full font-bold border-2 transition hover:bg-pink-50"
                style={{
                  borderColor: "var(--color-primary)",
                  color: "var(--color-primary)",
                  fontSize: 13,
                }}
              >
                {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
                {isRecording ? "Stop Recording" : "Start Recording"}
              </button>
            )}

            {isDone && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleAnalyze}
                className="flex items-center justify-center gap-2 px-(--space-lg) py-(--space-sm) rounded-full text-white font-bold transition hover:opacity-90"
                style={{ background: "var(--color-primary)", fontSize: 13 }}
              >
                <BarChart2 size={14} />
                Analyze Now
              </motion.button>
            )}

            {isDone && (
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-(--space-lg) py-(--space-sm) rounded-full font-bold border-2 transition hover:bg-gray-50"
                style={{
                  borderColor: "#e5e7eb",
                  color: "#6b7280",
                  fontSize: 13,
                }}
              >
                Record Again
              </button>
            )}
          </div>

          <p
            style={{
              fontSize: 12,
              color: "var(--color-muted)",
              textAlign: "center",
            }}
          >
            Tip: Be in a quiet place while you are recording for the most
            accurate results.
          </p>
        </motion.div>

        <div className="flex flex-col gap-(--space-md) w-full lg:w-56 shrink-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl p-(--space-md)"
            style={{ background: "white", boxShadow: "var(--shadow-md)" }}
          >
            <p
              className="font-bold text-sm mb-(--space-sm)"
              style={{ color: "var(--color-primary)" }}
            >
              Guidelines
            </p>
            {guidelines.map((g, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <CheckCircle
                  size={13}
                  style={{ color: "var(--color-primary)" }}
                />
                <p style={{ fontSize: 12, color: "var(--color-muted)" }}>{g}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-(--space-md)"
            style={{ background: "#fff0f6", boxShadow: "var(--shadow-md)" }}
          >
            <p
              className="font-bold italic"
              style={{ fontSize: 13, color: "var(--color-primary)" }}
            >
              "Every cry is a conversation."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CryRecording;
