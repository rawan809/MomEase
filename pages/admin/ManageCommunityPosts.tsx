import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  Trash2,
  X,
  MessageCircle,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  getCommunityPosts,
  deleteCommunityPost,
  adminApi,
} from "../../services/admin";

interface Post {
  postId: number;
  userId: number;
  userName: string;
  userPhoto: string | null;
  text: string;
  media: any[];
  commentsCount: number;
  reactionsCount: number;
  myReaction: string | null;
  createdAt: string;
  updatedAt: string | null;
}

interface Comment {
  commentId: number;
  postId: number;
  userId: number;
  userName: string;
  userPhoto: string | null;
  text: string;
  createdAt: string;
}

interface Reaction {
  userId: number;
  userName: string;
  userPhoto: string | null;
  reactionType: string;
  createdAt: string;
}

const UserAvatar = ({
  name,
  photo,
  size = 36,
}: {
  name: string;
  photo: string | null;
  size?: number;
}) => {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-bold shrink-0"
      style={{
        width: size,
        height: size,
        background: "var(--color-primary)",
        fontSize: size * 0.35,
      }}
    >
      {name?.[0]?.toUpperCase()}
    </div>
  );
};

const ManageCommunityPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filtered, setFiltered] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [comments, setComments] = useState<Comment[]>([]);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingReactions, setLoadingReactions] = useState(false);
  const [deleteCommentConfirm, setDeleteCommentConfirm] = useState<{
    postId: number;
    commentId: number;
  } | null>(null);

  const fetchPosts = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const data = await getCommunityPosts(pageNumber);
      const posts = data?.data;
      setPosts(posts?.posts || []);
      setFiltered(posts?.posts || []);
      setHasNextPage(posts?.hasNextPage || false);
      setTotalCount(posts?.totalCount || 0);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    if (!search) {
      setFiltered(posts);
      return;
    }
    setFiltered(
      posts.filter(
        (p) =>
          p.text?.toLowerCase().includes(search.toLowerCase()) ||
          p.userName?.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, posts]);

  const fetchComments = async (postId: number) => {
    try {
      setLoadingComments(true);
      const res = await adminApi.get(`/community/posts/${postId}/comments`);
      setComments(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setLoadingComments(false);
    }
  };

  const fetchReactions = async (postId: number) => {
    try {
      setLoadingReactions(true);
      const res = await adminApi.get(`/community/posts/${postId}/reactions`);
      setReactions(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch reactions:", err);
    } finally {
      setLoadingReactions(false);
    }
  };

  const handleOpenPost = (post: Post) => {
    setSelectedPost(post);
    setShowComments(false);
    setShowReactions(false);
    setComments([]);
    setReactions([]);
  };

  const handleToggleComments = () => {
    if (!showComments && selectedPost) {
      fetchComments(selectedPost.postId);
    }
    setShowComments(!showComments);
  };

  const handleToggleReactions = () => {
    if (!showReactions && selectedPost) {
      fetchReactions(selectedPost.postId);
    }
    setShowReactions(!showReactions);
  };

  const handleDeleteComment = async (postId: number, commentId: number) => {
    try {
      await adminApi.delete(`/community/posts/${postId}/comments/${commentId}`);
      setDeleteCommentConfirm(null);
      fetchComments(postId);
      setPosts((prev) =>
        prev.map((p) =>
          p.postId === postId
            ? { ...p, commentsCount: p.commentsCount - 1 }
            : p,
        ),
      );
    } catch (err) {
      console.error("Delete comment failed:", err);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await deleteCommunityPost(id);
      setDeleteConfirm(null);
      setSelectedPost(null);
      fetchPosts(page);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p style={{ color: "var(--color-primary)" }}>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-(--space-md)">
      <div>
        <h1 className="font-bold text-2xl text-gray-800">
          Manage Community Posts
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
          Monitor and moderate community content ({totalCount} total posts)
        </p>
      </div>

      <div
        className="bg-white rounded-2xl p-(--space-md)"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-muted)" }}
          />
          <input
            placeholder="Search posts..."
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
      </div>

      {filtered.length === 0 ? (
        <div
          className="bg-white rounded-2xl text-center py-16"
          style={{ boxShadow: "var(--shadow-md)", color: "var(--color-muted)" }}
        >
          No posts found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-(--space-md)">
          {filtered.map((post, i) => (
            <motion.div
              key={post.postId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-white rounded-2xl p-(--space-md) flex flex-col gap-(--space-sm)"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-(--space-sm)">
                  <UserAvatar
                    name={post.userName}
                    photo={`http://momease.runasp.net${post.userPhoto}`}
                  />
                  <div>
                    <p
                      className="font-semibold text-gray-800"
                      style={{ fontSize: 14 }}
                    >
                      {post.userName}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--color-muted)" }}>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "#f0fdf4",
                    color: "#4caf50",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  Active
                </span>
              </div>

              <p
                className="text-gray-700 line-clamp-3"
                style={{ fontSize: 14 }}
              >
                {post.text}
              </p>

              {post.media?.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {post.media.slice(0, 3).map((m, idx) => (
                    <img
                      key={idx}
                      src={m.mediaUrl}
                      alt="media"
                      className="rounded-xl object-cover"
                      style={{ width: 64, height: 48 }}
                    />
                  ))}
                </div>
              )}

              <div
                className="flex items-center gap-(--space-md)"
                style={{ fontSize: 13, color: "var(--color-muted)" }}
              >
                <span className="flex items-center gap-1">
                  <MessageCircle
                    size={13}
                    style={{ color: "var(--color-primary)" }}
                  />
                  {post.commentsCount} comments
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={13} style={{ color: "var(--color-primary)" }} />
                  {post.reactionsCount} reactions
                </span>
              </div>

              <div
                className="flex gap-(--space-sm) pt-(--space-xs) border-t"
                style={{ borderColor: "#fff0f6" }}
              >
                <button
                  onClick={() => handleOpenPost(post)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold transition hover:opacity-80"
                  style={{
                    background: "#fff0f6",
                    color: "var(--color-primary)",
                  }}
                >
                  <Eye size={13} />
                  View Full
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-(--space-md)">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-(--space-md) py-(--space-xs) rounded-full text-sm font-semibold transition"
          style={{
            background: page === 1 ? "#f3f4f6" : "var(--color-primary)",
            color: page === 1 ? "#9ca3af" : "white",
            cursor: page === 1 ? "not-allowed" : "pointer",
          }}
        >
          ← Prev
        </button>
        <span className="text-sm" style={{ color: "var(--color-muted)" }}>
          Page {page}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNextPage}
          className="px-(--space-md) py-(--space-xs) rounded-full text-sm font-semibold transition"
          style={{
            background: !hasNextPage ? "#f3f4f6" : "var(--color-primary)",
            color: !hasNextPage ? "#9ca3af" : "white",
            cursor: !hasNextPage ? "not-allowed" : "pointer",
          }}
        >
          Next →
        </button>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: "#00000050" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-(--space-lg) w-full max-w-lg max-h-[90vh] overflow-y-auto hide-scrollbar"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <div className="flex items-center justify-between mb-(--space-md)">
                <h3 className="font-bold text-lg">Post Details</h3>
                <button onClick={() => setSelectedPost(null)}>
                  <X size={18} style={{ color: "var(--color-muted)" }} />
                </button>
              </div>

              <div className="flex items-center gap-(--space-sm) mb-(--space-md)">
                <UserAvatar
                  name={selectedPost.userName}
                  photo={`http://momease.runasp.net${selectedPost.userPhoto}`}
                  size={40}
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {selectedPost.userName}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--color-muted)" }}>
                    {new Date(selectedPost.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>

              <p
                className="text-gray-700 mb-(--space-md)"
                style={{ fontSize: 14, lineHeight: 1.7 }}
              >
                {selectedPost.text}
              </p>

              {selectedPost.media?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-(--space-md)">
                  {selectedPost.media.map((m, idx) => (
                    <img
                      key={idx}
                      src={m.mediaUrl}
                      alt="media"
                      className="rounded-xl object-cover"
                      style={{ width: 100, height: 80 }}
                    />
                  ))}
                </div>
              )}

              <div
                className="flex gap-(--space-md) py-(--space-sm) border-t border-b mb-(--space-md)"
                style={{ borderColor: "#fff0f6", fontSize: 13 }}
              >
                <span
                  className="flex items-center gap-1"
                  style={{ color: "var(--color-muted)" }}
                >
                  <MessageCircle
                    size={14}
                    style={{ color: "var(--color-primary)" }}
                  />
                  {selectedPost.commentsCount} comments
                </span>
                <span
                  className="flex items-center gap-1"
                  style={{ color: "var(--color-muted)" }}
                >
                  <Heart size={14} style={{ color: "var(--color-primary)" }} />
                  {selectedPost.reactionsCount} reactions
                </span>
              </div>

              <div className="mb-(--space-sm)">
                <button
                  onClick={handleToggleComments}
                  className="w-full flex items-center justify-between px-(--space-md) py-(--space-sm) rounded-xl transition"
                  style={{ background: "var(--color-background)" }}
                >
                  <span
                    className="font-semibold text-sm flex items-center gap-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <MessageCircle size={14} />
                    Comments ({selectedPost.commentsCount})
                  </span>
                  {showComments ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>

                <AnimatePresence>
                  {showComments && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      {loadingComments ? (
                        <p
                          className="text-center py-4 text-sm"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Loading...
                        </p>
                      ) : comments.length === 0 ? (
                        <p
                          className="text-center py-4 text-sm"
                          style={{ color: "var(--color-muted)" }}
                        >
                          No comments yet.
                        </p>
                      ) : (
                        <div className="flex flex-col gap-(--space-sm) mt-(--space-sm)">
                          {comments.map((comment) => (
                            <div
                              key={comment.commentId}
                              className="flex items-start gap-(--space-sm) p-(--space-sm) rounded-xl"
                              style={{ background: "var(--color-background)" }}
                            >
                              <UserAvatar
                                name={comment.userName}
                                photo={comment.userPhoto}
                                size={28}
                              />
                              <div className="flex-1 min-w-0">
                                <p
                                  className="font-semibold"
                                  style={{
                                    fontSize: 12,
                                    color: "var(--color-primary)",
                                  }}
                                >
                                  {comment.userName}
                                </p>
                                <p
                                  className="text-gray-700"
                                  style={{ fontSize: 13 }}
                                >
                                  {comment.text}
                                </p>
                                <p
                                  style={{
                                    fontSize: 11,
                                    color: "var(--color-muted)",
                                  }}
                                >
                                  {new Date(
                                    comment.createdAt,
                                  ).toLocaleDateString("en-US")}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mb-(--space-md)">
                <button
                  onClick={handleToggleReactions}
                  className="w-full flex items-center justify-between px-(--space-md) py-(--space-sm) rounded-xl transition"
                  style={{ background: "var(--color-background)" }}
                >
                  <span
                    className="font-semibold text-sm flex items-center gap-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <Heart size={14} />
                    Reactions ({selectedPost.reactionsCount})
                  </span>
                  {showReactions ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>

                <AnimatePresence>
                  {showReactions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      {loadingReactions ? (
                        <p
                          className="text-center py-4 text-sm"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Loading...
                        </p>
                      ) : reactions.length === 0 ? (
                        <p
                          className="text-center py-4 text-sm"
                          style={{ color: "var(--color-muted)" }}
                        >
                          No reactions yet.
                        </p>
                      ) : (
                        <div className="flex flex-col gap-(--space-sm) mt-(--space-sm)">
                          {reactions.map((reaction, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-(--space-sm) p-(--space-sm) rounded-xl"
                              style={{ background: "var(--color-background)" }}
                            >
                              <UserAvatar
                                name={reaction.userName}
                                photo={reaction.userPhoto}
                                size={28}
                              />
                              <p
                                className="font-semibold flex-1"
                                style={{ fontSize: 13 }}
                              >
                                {reaction.userName}
                              </p>
                              <span
                                className="px-2 py-0.5 rounded-full text-xs font-semibold"
                                style={{
                                  background: "#fff0f6",
                                  color: "var(--color-primary)",
                                }}
                              >
                                {reaction.reactionType}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => {
                  setSelectedPost(null);
                  setDeleteConfirm(selectedPost.postId);
                }}
                className="w-full py-(--space-sm) rounded-full text-white font-bold text-sm hover:opacity-90 transition"
                style={{ background: "#f44336" }}
              >
                Delete Post
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
                Delete Post?
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
                  onClick={() => handleDeletePost(deleteConfirm)}
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

      <AnimatePresence>
        {deleteCommentConfirm !== null && (
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
                Delete Comment?
              </h3>
              <p
                className="text-sm mb-(--space-md)"
                style={{ color: "var(--color-muted)" }}
              >
                This action cannot be undone.
              </p>
              <div className="flex gap-(--space-sm)">
                <button
                  onClick={() => setDeleteCommentConfirm(null)}
                  className="flex-1 py-(--space-sm) rounded-full font-bold text-sm border-2 hover:bg-gray-50 transition"
                  style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    handleDeleteComment(
                      deleteCommentConfirm.postId,
                      deleteCommentConfirm.commentId,
                    )
                  }
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

export default ManageCommunityPosts;
