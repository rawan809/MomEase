import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const SkinUpload = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/skin-analysis/analyze", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      console.log("SKIN RESULT:", data);

      if (data?.success) {
        navigate("/skin-diagnosis/result", { state: { result: data } });
      } else {
        setError(data?.message || "Analysis failed. Please try again.");
      }
    } catch (err) {
      console.error("Skin analysis error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-(--space-lg) py-(--space-xl) pt-20"
      style={{ background: "var(--color-background)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-(--space-lg)"
      >
        <button
          onClick={() => navigate(-1)}
          className="text-primary font-semibold mb-(--space-sm) flex items-center gap-1 mx-auto hover:opacity-70 transition"
        >
          ‹ Skin Diagnosis
        </button>
        <h1 className="font-bold text-h2">Analyze Baby's Skin</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onClick={() => !preview && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className="cursor-pointer w-full max-w-lg rounded-3xl flex flex-col items-center justify-center transition-(--transition-fast)"
        style={{
          height: 280,
          background: isDragging ? "#ffe0ec" : "white",
          border: `2.5px dashed ${isDragging ? "var(--color-primary)" : "#ffb3c6"}`,
          boxShadow: "var(--shadow-md)",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-3xl"
          />
        ) : (
          <div className="flex flex-col items-center gap-(--space-md) px-(--space-lg) text-center">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 72, height: 72, background: "#ffe5ef" }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 16V8M12 8L9 11M12 8L15 11"
                  stroke="#ff3381"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="3"
                  y="15"
                  width="18"
                  height="6"
                  rx="2"
                  stroke="#ff3381"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div>
              <p
                className="font-bold text-(--text-small)"
                style={{ color: "var(--color-primary)" }}
              >
                Click to upload or drag & drop
              </p>
              <p className="text-muted" style={{ fontSize: "13px" }}>
                PNG, JPG, JPEG supported
              </p>
            </div>
          </div>
        )}
      </motion.div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-(--space-sm) text-(--text-small) font-semibold"
          style={{ color: "#f44336" }}
        >
          {error}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex gap-(--space-md) mt-(--space-lg) flex-wrap justify-center"
      >
        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-(--space-xs) px-(--space-lg) py-(--space-sm) rounded-full text-white font-bold transition-(--transition-fast) hover:opacity-90"
          style={{ background: "var(--color-primary)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 16V8M12 8L9 11M12 8L15 11"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="3"
              y="15"
              width="18"
              height="6"
              rx="2"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
          {preview ? "Change Photo" : "Upload Photo"}
        </button>

        {preview && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleAnalyze}
            disabled={loading}
            className="flex items-center gap-(--space-xs) px-(--space-lg) py-(--space-sm) rounded-full font-bold text-(--text-small) border-2 transition-(--transition-fast) hover:bg-pink-50"
            style={{
              borderColor: "var(--color-primary)",
              color: loading ? "#f9a8c9" : "var(--color-primary)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Analyzing..." : "Analyze Now →"}
          </motion.button>
        )}

        {preview && !loading && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => {
              setPreview(null);
              setFile(null);
            }}
            className="flex items-center gap-(--space-xs) px-(--space-md) py-(--space-sm) rounded-full font-bold text-(--text-small) border-2 transition-(--transition-fast) hover:bg-red-50"
            style={{ borderColor: "#e5e7eb", color: "#9ca3af" }}
          >
            ✕ Remove
          </motion.button>
        )}
      </motion.div>

      <p
        className="text-muted italic text-center mt-(--space-md)"
        style={{ fontSize: "13px" }}
      >
        This is guidance, not medical advice.
        <br />
        Trust your instincts — you know your baby best.
      </p>
    </section>
  );
};

export default SkinUpload;
