import { useState } from "react";
import {
  getComments,
  addComment,
  deleteComment,
  editComment,
  getReacts,
  getCommentReplies,
  deleteCommentReply,
  editCommentReply,
  addCommentReply,
} from "../../services/community";

export interface CommentType {
  commentId: number;
  postId: number;
  userId: number;
  userName: string;
  userPhoto: string | null;
  text: string;
  createdAt: string;
  updatedAt: string | null;
  repliesCount: number;
}
interface ReplyData {
  replyId: number;
  commentId: number;
  userId: number;
  userName: string;
  userPhoto: string | null;
  text: string;
  isMyReply: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface UserReaction {
  userId: number;
  userName: string;
  userPhoto: string | null;
  reactionType: string;
}

export function useCommunityInteractions(postId: number) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentReplies, setCommentReplies] = useState<
    Record<number, ReplyData[]>
  >({});

  const [loading, setLoading] = useState(false);
  const [reactions, setReactions] = useState<UserReaction[]>([]);
  const [loadingReactions, setLoadingReactions] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);

  // FETCH REACTIONS
  const fetchReactions = async () => {
    setLoadingReactions(true);
    try {
      const res = await getReacts(postId);
      if (!res.success) {
        throw new Error(res.message);
      }
      setReactions(res.data || []);
    } catch (err: any) {
      console.error(err);
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    } finally {
      setLoadingReactions(false);
    }
  };

  // FETCH COMMENTS
  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await getComments(postId);

      if (!res.success) {
        throw new Error(res.message);
      }

      setComments(res.data || []);
    } catch (err: any) {
      console.error(err);
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchCommentReplies = async (commentId: number) => {
    setLoadingReplies(true);
    try {
      const res = await getCommentReplies(postId, commentId);

      if (!res.success) {
        throw new Error(res.message);
      }

      setCommentReplies((prev) => ({
        ...prev,
        [commentId]: res.data || [],
      }));
    } catch (err: any) {
      console.error(err);
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    } finally {
      setLoadingReplies(false);
    }
  };

  // ADD COMMENT
  const addNewComment = async (text: string) => {
    if (!text.trim()) return;

    const tempComment: CommentType = {
      commentId: Date.now(), // temp id
      postId,
      userId: 0,
      userName: "You",
      userPhoto: null,
      text,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      repliesCount: 0,
    };

    setComments((prev) => [tempComment, ...prev]);

    try {
      const res = await addComment(postId, { text });

      if (!res.success) {
        throw new Error(res.message);
      }

      setComments((prev) =>
        prev.map((c) => (c.commentId === tempComment.commentId ? res.data : c)),
      );
    } catch (err: any) {
      // rollback
      setComments((prev) =>
        prev.filter((c) => c.commentId !== tempComment.commentId),
      );

      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  const addNewReply = async (text: string, commentId: number) => {
    if (!text.trim()) return;

    const tempReply: ReplyData = {
      replyId: Date.now(),
      commentId,
      userId: 0,
      userName: "You",
      userPhoto: null,
      text,
      isMyReply: true,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };

    setCommentReplies((prev) => ({
      ...prev,
      [commentId]: [...(prev[commentId] || []), tempReply],
    }));

    try {
      const res = await addCommentReply(postId, commentId, { text });

      if (!res.success) {
        throw new Error(res.message);
      }

      await fetchCommentReplies(commentId);
    } catch (err: any) {
      // rollback
      setCommentReplies((prev) => ({
        ...prev,
        [commentId]: (prev[commentId] || []).filter(
          (r) => r.replyId !== tempReply.replyId,
        ),
      }));

      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  // DELETE COMMENT
  const removeComment = async (commentId: number) => {
    const prev = comments;
    setComments((c) => c.filter((x) => x.commentId !== commentId));
    try {
      const res = await deleteComment(postId, commentId);
      if (!res.success) throw new Error(res.message);
    } catch (err: any) {
      setComments(prev); // rollback
      if (err?.response?.data?.message)
        throw new Error(err.response.data.message);
      throw err;
    }
  };

  const removeReply = async (commentId: number, replyId: number) => {
    const previousReplies = commentReplies[commentId] || [];

    setCommentReplies((prev) => ({
      ...prev,
      [commentId]: previousReplies.filter((reply) => reply.replyId !== replyId),
    }));

    try {
      const res = await deleteCommentReply(postId, commentId, replyId);

      if (!res.success) {
        throw new Error(res.message);
      }
    } catch (err: any) {
      // rollback
      setCommentReplies((prev) => ({
        ...prev,
        [commentId]: previousReplies,
      }));

      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  // EDIT COMMENT
  const updateComment = async (commentId: number, text: string) => {
    const prev = comments;
    setComments((c) =>
      c.map((x) => (x.commentId === commentId ? { ...x, text } : x)),
    );
    try {
      const res = await editComment(postId, commentId, { text });
      if (!res.success) throw new Error(res.message);
      setComments((c) =>
        c.map((x) => (x.commentId === commentId ? res.data : x)),
      );
    } catch (err: any) {
      setComments(prev); // rollback
      if (err?.response?.data?.message)
        throw new Error(err.response.data.message);
      throw err;
    }
  };
  const updateReply = async (
    commentId: number,
    replyId: number,
    text: string,
  ) => {
    const previousReplies = commentReplies[commentId] || [];

    setCommentReplies((prev) => ({
      ...prev,
      [commentId]: previousReplies.map((reply) =>
        reply.replyId === replyId
          ? {
              ...reply,
              text,
              updatedAt: new Date().toISOString(),
            }
          : reply,
      ),
    }));

    try {
      const res = await editCommentReply(postId, commentId, replyId, { text });

      if (!res.success) {
        throw new Error(res.message);
      }

      // نجيب الداتا الصح من السيرفر
      await fetchCommentReplies(commentId);
    } catch (err: any) {
      // rollback
      setCommentReplies((prev) => ({
        ...prev,
        [commentId]: previousReplies,
      }));

      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  return {
    comments,
    loading,
    fetchComments,
    addNewComment,
    addNewReply,
    removeComment,
    updateComment,
    fetchCommentReplies,
    commentReplies,
    reactions,
    loadingReactions,
    fetchReactions,
    setLoadingReplies,
    removeReply,
    updateReply,
  };
}
