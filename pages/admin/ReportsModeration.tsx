import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  X,
  AlertTriangle,
  CheckCircle,
  Trash2,
} from "lucide-react";
import {
  getReports,
  getPendingReports,
  getReviewedReports,
  reviewReport,
  deleteReportedPost,
} from "../../services/admin";

interface Report {
  reportId: number;
  postId: number;
  reporterId: number;
  reporterName: string;
  reason: string;
  reviewedByName: string | null;
  action: string | null;
  adminNote: string | null;
  createdAt: string;
  reviewedAt: string | null;
  isReviewed: boolean;
}

const getSeverityBadge = (reason: string) => {
  const r = reason?.toLowerCase();
  if (r?.includes("spam") || r?.includes("advertisement"))
    return { label: "High Severity", color: "#f44336", bg: "#fff3f3" };
  if (r?.includes("inappropriate") || r?.includes("harmful"))
    return { label: "High Severity", color: "#f44336", bg: "#fff3f3" };
  if (r?.includes("harassment"))
    return { label: "Medium Severity", color: "#ff9800", bg: "#fff8f0" };
  return { label: "Low Severity", color: "#4caf50", bg: "#f0fdf4" };
};

const getTypeBadge = (type: string) => ({
  label: type,
  color: "var(--color-primary)",
  bg: "#fff0f6",
});

const ReportsModeration = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filtered, setFiltered] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reviewForm, setReviewForm] = useState({ action: "", adminNote: "" });
  const [reviewing, setReviewing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const pendingCount = reports.filter((r) => !r.isReviewed).length;
  const highSeverityCount = reports.filter(
    (r) => getSeverityBadge(r.reason).label === "High Severity",
  ).length;
  const resolvedCount = reports.filter((r) => r.isReviewed && r.action).length;

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getReports();
      setReports(data?.data || []);
      setFiltered(data?.data || []);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    let result = [...reports];
    if (search) {
      result = result.filter(
        (r) =>
          r.reason?.toLowerCase().includes(search.toLowerCase()) ||
          r.reporterName?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (statusFilter === "Pending")
      result = result.filter((r) => !r.isReviewed);
    if (statusFilter === "Reviewed")
      result = result.filter((r) => r.isReviewed);
    setFiltered(result);
  }, [search, statusFilter, reports]);

  const handleReview = async () => {
    if (!selectedReport) return;
    try {
      setReviewing(true);
      await reviewReport(
        selectedReport.reportId,
        reviewForm.action,
        reviewForm.adminNote,
      );
      setSelectedReport(null);
      fetchReports();
    } catch (err) {
      console.error("Review failed:", err);
    } finally {
      setReviewing(false);
    }
  };

  const handleDelete = async (postId: number) => {
    try {
      const report = reports.find((r) => r.postId === postId);
      if (!report) return;

      await reviewReport(
        report.reportId,
        "DeletePost",
        "Post removed by admin",
      );
      setDeleteConfirm(null);
      setSelectedReport(null);
      fetchReports();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p style={{ color: "var(--color-primary)" }}>Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-(--space-md)">
      <div>
        <h1 className="font-bold text-2xl text-gray-800">
          Reports & Moderation
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
          Review and manage reported content and users
        </p>
      </div>

      <div className="grid grid-cols-3 gap-(--space-md)">
        {[
          {
            label: "Pending Reports",
            value: pendingCount,
            icon: AlertTriangle,
            color: "#ff9800",
            bg: "#fff8f0",
          },
          {
            label: "High Severity",
            value: highSeverityCount,
            icon: AlertTriangle,
            color: "#f44336",
            bg: "#fff3f3",
          },
          {
            label: "Resolved Today",
            value: resolvedCount,
            icon: CheckCircle,
            color: "#4caf50",
            bg: "#f0fdf4",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-white rounded-2xl p-(--space-md) flex items-center gap-(--space-md)"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: 44, height: 44, background: stat.bg }}
            >
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div>
              <p className="font-bold text-2xl text-gray-800">{stat.value}</p>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="bg-white rounded-2xl p-(--space-md) flex flex-wrap gap-(--space-md) items-center"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <div className="relative flex-1 min-w-48">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-muted)" }}
          />
          <input
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
            style={{
              background: "var(--color-background)",
              border: "1px solid #ffc8dd",
              fontSize: 13,
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} style={{ color: "var(--color-muted)" }} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm outline-none"
            style={{
              background: "var(--color-background)",
              border: "1px solid #ffc8dd",
              color: "var(--color-muted)",
              fontSize: 13,
            }}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Reviewed</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-(--space-sm)">
        {filtered.length === 0 ? (
          <div
            className="bg-white rounded-2xl text-center py-16"
            style={{
              boxShadow: "var(--shadow-md)",
              color: "var(--color-muted)",
            }}
          >
            No reports found.
          </div>
        ) : (
          filtered.map((report, i) => {
            const severity = getSeverityBadge(report.reason);
            return (
              <motion.div
                key={report.reportId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white rounded-2xl p-(--space-md) flex flex-col gap-(--space-sm)"
                style={{ boxShadow: "var(--shadow-md)" }}
              >
                <div className="flex items-center gap-(--space-sm) flex-wrap">
                  <div
                    className="flex items-center justify-center rounded-lg shrink-0"
                    style={{ width: 32, height: 32, background: "#fff0f6" }}
                  >
                    <AlertTriangle
                      size={14}
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <span
                    className="font-bold text-gray-800"
                    style={{ fontSize: 14 }}
                  >
                    REP-{String(report.reportId).padStart(3, "0")}
                  </span>

                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: "#fff0f6",
                      color: "var(--color-primary)",
                      border: "1px solid #ffc8dd",
                    }}
                  >
                    Post
                  </span>

                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: severity.bg, color: severity.color }}
                  >
                    {severity.label}
                  </span>

                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: report.isReviewed ? "#f0fdf4" : "#fff8f0",
                      color: report.isReviewed ? "#4caf50" : "#ff9800",
                    }}
                  >
                    {report.isReviewed ? "Reviewed" : "Pending"}
                  </span>

                  <span
                    className="text-xs ml-auto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Target POST-{String(report.postId).padStart(3, "0")} •
                    Reason: {report.reason}
                  </span>
                </div>

                <p className="text-gray-700" style={{ fontSize: 14 }}>
                  Reported for:{" "}
                  <span className="font-semibold">{report.reason}</span>
                </p>

                <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                  Reported by {report.reporterName} on{" "}
                  {new Date(report.createdAt).toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                {report.isReviewed && report.adminNote && (
                  <div
                    className="rounded-xl px-(--space-md) py-(--space-sm)"
                    style={{
                      background: "var(--color-background)",
                      fontSize: 13,
                      color: "var(--color-muted)",
                    }}
                  >
                    <span className="font-semibold">Admin Note:</span>{" "}
                    {report.adminNote}
                  </div>
                )}

                <div
                  className="flex gap-(--space-sm) pt-(--space-xs) border-t"
                  style={{ borderColor: "#fff0f6" }}
                >
                  <button
                    onClick={() => {
                      setSelectedReport(report);
                      setReviewForm({
                        action: report.action || "",
                        adminNote: report.adminNote || "",
                      });
                    }}
                    disabled={report.isReviewed}
                    className="flex items-center gap-1 px-(--space-md) py-2 rounded-xl text-xs font-semibold transition hover:opacity-80"
                    style={{
                      background: "#fff0f6",
                      color: "var(--color-primary)",
                    }}
                  >
                    <Eye size={13} />
                    Review
                  </button>
                  <button
                    onClick={() => {
                      setSelectedReport(report);
                      setReviewForm({ action: "Dismiss", adminNote: "" });
                    }}
                    disabled={report.isReviewed}
                    className="flex items-center gap-1 px-(--space-md) py-2 rounded-xl text-xs font-semibold transition hover:opacity-80"
                    style={{ background: "#fff8f0", color: "#ff9800" }}
                  >
                    <X size={13} />
                    Dismiss
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(report.postId)}
                    className="flex items-center gap-1 px-(--space-md) py-2 rounded-xl text-xs font-semibold transition hover:opacity-80"
                    style={{ background: "#fff3f3", color: "#f44336" }}
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <AnimatePresence>
        {selectedReport && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: "#00000050" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-(--space-lg) w-full max-w-md flex flex-col gap-(--space-md)"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">
                  Review REP-{String(selectedReport.reportId).padStart(3, "0")}
                </h3>
                <button onClick={() => setSelectedReport(null)}>
                  <X size={18} style={{ color: "var(--color-muted)" }} />
                </button>
              </div>

              <div
                className="rounded-2xl p-(--space-md) flex flex-col gap-(--space-xs)"
                style={{ background: "var(--color-background)" }}
              >
                <p className="text-sm">
                  <span className="font-semibold">Reporter:</span>{" "}
                  {selectedReport.reporterName}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Reason:</span>{" "}
                  {selectedReport.reason}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Post ID:</span>{" "}
                  {selectedReport.postId}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(selectedReport.createdAt).toLocaleDateString(
                    "en-US",
                  )}
                </p>
              </div>

              <div>
                <label
                  className="text-xs font-semibold mb-1 block"
                  style={{ color: "var(--color-muted)" }}
                >
                  Action
                </label>
                <select
                  value={reviewForm.action}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, action: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl text-sm outline-none"
                  style={{
                    background: "var(--color-background)",
                    border: "1px solid #ffc8dd",
                    fontSize: 13,
                  }}
                >
                  <option value="">Select action</option>
                  <option value="Dismiss">Dismiss</option>
                  <option value="Warn">Warn User</option>
                  <option value="DeletePost">Delete Post</option> {/* 👈 fix */}
                </select>
              </div>

              <div>
                <label
                  className="text-xs font-semibold mb-1 block"
                  style={{ color: "var(--color-muted)" }}
                >
                  Admin Note
                </label>
                <textarea
                  value={reviewForm.adminNote}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, adminNote: e.target.value })
                  }
                  rows={3}
                  placeholder="Add a note..."
                  className="w-full px-4 py-2 rounded-xl text-sm outline-none resize-none"
                  style={{
                    background: "var(--color-background)",
                    border: "1px solid #ffc8dd",
                    fontSize: 13,
                  }}
                />
              </div>

              <button
                onClick={handleReview}
                disabled={reviewing || !reviewForm.action}
                className="w-full py-(--space-sm) rounded-full text-white font-bold text-sm hover:opacity-90 transition"
                style={{
                  background: !reviewForm.action
                    ? "#f9a8c9"
                    : "var(--color-primary)",
                  cursor: !reviewForm.action ? "not-allowed" : "pointer",
                }}
              >
                {reviewing ? "Submitting..." : "Submit Review"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm !== null && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: "#00000050" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-(--space-lg) w-full max-w-sm text-center"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <div
                className="flex items-center justify-center rounded-full mx-auto mb-(--space-md)"
                style={{ width: 56, height: 56, background: "#fff3f3" }}
              >
                <Trash2 size={24} className="text-red-400" />
              </div>
              <h3 className="font-bold text-lg mb-(--space-xs)">
                Remove Post?
              </h3>
              <p
                className="text-sm mb-(--space-md)"
                style={{ color: "var(--color-muted)" }}
              >
                This will permanently delete the reported post.
              </p>
              <div className="flex gap-(--space-sm)">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-(--space-sm) rounded-full font-bold text-sm border-2 hover:bg-gray-50 transition"
                  style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 py-(--space-sm) rounded-full font-bold text-sm text-white hover:opacity-90 transition"
                  style={{ background: "#f44336" }}
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportsModeration;
