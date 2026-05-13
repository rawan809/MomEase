import { useState } from "react";
import { getComments, addComment, deleteComment, editComment } from "../../services/community";

export interface CommentType {
  commentId: number;
  postId: number;
  userId: number;
  userName: string;
  userPhoto: string | null;
  text: string;
  createdAt: string;
  updatedAt: string | null;
}

export function useCommunityInteractions(postId: number) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);

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

  // DELETE COMMENT
  const removeComment = async (commentId: number) => {
    const prev = comments;
    setComments((c) => c.filter((x) => x.commentId !== commentId));
    try {
      const res = await deleteComment(postId, commentId);
      if (!res.success) throw new Error(res.message);
    } catch (err: any) {
      setComments(prev); // rollback
      if (err?.response?.data?.message) throw new Error(err.response.data.message);
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
      if (err?.response?.data?.message) throw new Error(err.response.data.message);
      throw err;
    }
  };

  return {
    comments,
    loading,
    fetchComments,
    addNewComment,
    removeComment,
    updateComment,
  };
}
