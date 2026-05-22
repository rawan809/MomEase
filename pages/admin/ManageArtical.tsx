import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  Pencil,
  Trash2,
  Tag,
  Clock,
  X,
} from "lucide-react";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/admin";

interface Article {
  articleId: number;
  title: string;
  imageUrl: string;
  shortDescription: string;
  categoryName: string;
  categoryId: number;
  readingTimeMinutes: number;
  isSaved: boolean;
  content?: string;
  sourceUrl?: string;
  sourceName?: string;
}

const CATEGORIES = [
  { id: 1, name: "Postpartum Care" },
  { id: 2, name: "Baby Development" },
  { id: 3, name: "Baby Sleep" },
  { id: 4, name: "Feeding & Nutrition" },
  { id: 5, name: "Baby Health" },
];

const emptyForm = {
  title: "",
  shortDescription: "",
  imageUrl: "",
  categoryName: "",
  categoryId: 0,
  readingTimeMinutes: 2,
  content: "",
  sourceUrl: "",
  sourceName: "",
};

const ManageArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filtered, setFiltered] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(
    null,
  );

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await getArticles();
      const list = data?.data || data || [];
      setArticles(list);
      setFiltered(list);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const categoryNames = ["All", ...CATEGORIES.map((c) => c.name)];

  useEffect(() => {
    let result = [...articles];
    if (search) {
      result = result.filter(
        (a) =>
          a.title?.toLowerCase().includes(search.toLowerCase()) ||
          a.categoryName?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (categoryFilter !== "All") {
      result = result.filter((a) => a.categoryName === categoryFilter);
    }
    setFiltered(result);
  }, [search, categoryFilter, articles]);

  const openAdd = () => {
    setEditArticle(null);
    setForm(emptyForm);
    setSaveStatus(null);
    setShowModal(true);
  };

  const openEdit = (article: Article) => {
    setEditArticle(article);
    setForm({
      title: article.title,
      shortDescription: article.shortDescription || "",
      imageUrl: article.imageUrl || "",
      categoryName: article.categoryName || "",
      categoryId: article.categoryId || 0,
      readingTimeMinutes: article.readingTimeMinutes || 2,
      content: article.content || "",
      sourceUrl: article.sourceUrl || "",
      sourceName: article.sourceName || "",
    });
    setSaveStatus(null);
    setShowModal(true);
  };
  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveStatus(null);

      if (
        !form.title ||
        !form.content ||
        !form.categoryId ||
        form.categoryId === 0
      ) {
        console.log("❌ Invalid form:", form);
        setSaveStatus("error");
        return;
      }

      const payload = {
        categoryId: Number(form.categoryId),
        title: form.title.trim(),
        content: form.content.trim(),
        titleAr: form.title.trim(),
        contentAr: form.content.trim(),
        imageUrl: form.imageUrl?.trim() || "",
        sourceUrl: form.sourceUrl?.trim() || "",
        sourceName: form.sourceName?.trim() || "",
      };

      console.log("🚀 Sending payload:", payload);

      if (editArticle) {
        await updateArticle(editArticle.articleId, payload);
      } else {
        await createArticle(payload);
      }

      setSaveStatus("success");

      setTimeout(() => {
        setShowModal(false);
        setSaveStatus(null);
        fetchArticles();
      }, 1500);
    } catch (err: any) {
      console.error("❌ FULL ERROR:", err.response?.data || err);
      console.error("❌ VALIDATION ERRORS:", err.response?.data?.errors);

      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      await deleteArticle(id);
      setDeleteConfirm(null);
      fetchArticles();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p style={{ color: "var(--color-primary)" }}>Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-(--space-md)">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl text-gray-800">Manage Articles</h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
            Create and manage educational content
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-(--space-md) py-(--space-sm) rounded-full text-white font-semibold text-sm hover:opacity-90 transition"
          style={{ background: "var(--color-primary)" }}
        >
          <Plus size={16} />
          Add New Article
        </button>
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
            placeholder="Search articles..."
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm outline-none"
            style={{
              background: "var(--color-background)",
              border: "1px solid #ffc8dd",
              color: "var(--color-muted)",
              fontSize: 13,
            }}
          >
            {categoryNames.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="bg-white rounded-2xl overflow-hidden flex flex-col"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        {filtered.length === 0 ? (
          <div
            className="text-center py-16"
            style={{ color: "var(--color-muted)" }}
          >
            No articles found.
          </div>
        ) : (
          filtered.map((article, i) => (
            <motion.div
              key={article.articleId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="flex items-center gap-(--space-md) p-(--space-md) hover:bg-pink-50 transition"
              style={{ borderBottom: "1px solid #fff0f6" }}
            >
              <div
                className="relative shrink-0"
                style={{ width: 80, height: 64 }}
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="rounded-xl object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    const next = (e.target as HTMLImageElement)
                      .nextElementSibling;
                    if (next) next.classList.remove("hidden");
                  }}
                />
                <div
                  className="hidden rounded-xl w-full h-full items-center justify-center text-white text-xs font-bold absolute top-0 left-0 flex"
                  style={{ background: "var(--color-accent)" }}
                >
                  No Image
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <h3
                  className="font-bold text-gray-800 truncate"
                  style={{ fontSize: 15 }}
                >
                  {article.title}
                </h3>
                <p
                  className="text-sm truncate"
                  style={{ color: "var(--color-muted)", fontSize: 13 }}
                >
                  {article.shortDescription}
                </p>
                <div className="flex items-center gap-(--space-md) mt-1 flex-wrap">
                  <span
                    className="flex items-center gap-1 text-xs"
                    style={{ color: "var(--color-muted)" }}
                  >
                    <Tag size={12} style={{ color: "var(--color-primary)" }} />
                    {article.categoryName}
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs"
                    style={{ color: "var(--color-muted)" }}
                  >
                    <Clock
                      size={12}
                      style={{ color: "var(--color-primary)" }}
                    />
                    {article.readingTimeMinutes} min read
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(article)}
                  className="p-2 rounded-xl hover:bg-white transition"
                  title="Edit"
                >
                  <Pencil size={16} style={{ color: "var(--color-primary)" }} />
                </button>
                <button
                  onClick={() => setDeleteConfirm(article.articleId)}
                  className="p-2 rounded-xl hover:bg-white transition"
                  title="Delete"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: "#00000050" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-(--space-lg) w-full max-w-lg max-h-[90vh] overflow-y-auto"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <div className="flex items-center justify-between mb-(--space-md)">
                <h3 className="font-bold text-lg">
                  {editArticle ? "Edit Article" : "Add New Article"}
                </h3>
                <button onClick={() => setShowModal(false)}>
                  <X size={18} style={{ color: "var(--color-muted)" }} />
                </button>
              </div>

              <div className="flex flex-col gap-(--space-sm) ">
                {/* Text fields */}
                {[
                  { label: "Title", key: "title", type: "text" },
                  { label: "Image URL", key: "imageUrl", type: "text" },
                  { label: "Source Name", key: "sourceName", type: "text" },
                  { label: "Source URL", key: "sourceUrl", type: "text" },
                  {
                    label: "Short Description",
                    key: "shortDescription",
                    type: "textarea",
                  },
                  { label: "Content", key: "content", type: "textarea" },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label
                      className="text-xs font-semibold mb-1 block"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {label}
                    </label>
                    {type === "textarea" ? (
                      <textarea
                        value={form[key as keyof typeof form] as string}
                        onChange={(e) =>
                          setForm({ ...form, [key]: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-2 rounded-xl text-sm outline-none resize-none"
                        style={{
                          background: "var(--color-background)",
                          border: "1px solid #ffc8dd",
                          fontSize: 13,
                        }}
                      />
                    ) : (
                      <input
                        value={form[key as keyof typeof form] as string}
                        onChange={(e) =>
                          setForm({ ...form, [key]: e.target.value })
                        }
                        className="input"
                      />
                    )}
                  </div>
                ))}

                <div>
                  <label
                    className="text-xs font-semibold mb-1 block"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Category
                  </label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => {
                      const selected = CATEGORIES.find(
                        (c) => c.id === Number(e.target.value),
                      );
                      setForm({
                        ...form,
                        categoryId: Number(e.target.value),
                        categoryName: selected?.name || "",
                      });
                    }}
                    className="w-full px-4 py-2 rounded-xl text-sm outline-none"
                    style={{
                      background: "var(--color-background)",
                      border: "1px solid #ffc8dd",
                      fontSize: 13,
                    }}
                  >
                    <option value={0}>Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="text-xs font-semibold mb-1 block"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Reading Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={form.readingTimeMinutes}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        readingTimeMinutes: Number(e.target.value),
                      })
                    }
                    className="input"
                    min={1}
                  />
                </div>

                {saveStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-(--space-md) py-(--space-sm) rounded-xl"
                    style={{
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <span style={{ color: "#4caf50", fontSize: 13 }}>
                      ✓ Article {editArticle ? "updated" : "created"}{" "}
                      successfully!
                    </span>
                  </motion.div>
                )}

                {saveStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-(--space-md) py-(--space-sm) rounded-xl"
                    style={{
                      background: "#fff3f3",
                      border: "1px solid #fecaca",
                    }}
                  >
                    <span style={{ color: "#f44336", fontSize: 13 }}>
                      ✗ Failed to save. Please try again.
                    </span>
                  </motion.div>
                )}

                <button
                  onClick={handleSave}
                  disabled={saving || saveStatus === "success"}
                  className="w-full py-(--space-sm) rounded-full text-white font-bold mt-(--space-sm) transition"
                  style={{
                    background:
                      saveStatus === "success"
                        ? "#4caf50"
                        : saveStatus === "error"
                          ? "#f44336"
                          : saving
                            ? "#f9a8c9"
                            : "var(--color-primary)",
                    cursor:
                      saving || saveStatus === "success"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {saveStatus === "success"
                    ? "✓ Saved!"
                    : saveStatus === "error"
                      ? "✗ Failed — Try Again"
                      : saving
                        ? "Saving..."
                        : editArticle
                          ? "Save Changes"
                          : "Add Article"}
                </button>
              </div>
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
                Delete Article?
              </h3>
              <p
                className="text-sm mb-(--space-md)"
                style={{ color: "var(--color-muted)" }}
              >
                This action cannot be undone.
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
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageArticles;
