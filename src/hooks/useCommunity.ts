import { useState } from "react";
import {
  GetPosts,
  createPost,
  editPost,
  GetMyPosts,
  deletePost,
  reportPost,
  savePost,
  deleteSavedpost,
  getSavedPosts,
  GetPost,
} from "../../services/community";

export interface PostMedia {
  mediaId: number;
  mediaUrl: string;
  mediaType: "Photo" | "Video";
  order: number;
}

export interface Post {
  postId: number;
  userId: number;
  userName: string;
  userPhoto: string | null;
  text: string | null;
  media: PostMedia[];
  commentsCount: number;
  reactionsCount: number;
  myReaction: string | null;
  createdAt: string;
  updatedAt: string | null;
  isSaved?: boolean;
  isMyPost?: boolean;
}

export function useCommunityPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post>();

  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  // fetch post
  const fetchPost = async (id: number) => {
    setLoading(true);

    try {
      const res = await GetPost(id);

      if (!res.success) {
        throw new Error(res.message);
      }

      setPost(res.data);
    } catch (err: any) {
      console.log(err);

      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };
  //   fetch posts
  const fetchPosts = async (page = 1) => {
    setLoading(true);
    if (page === 1) {
      setPosts([]);
    }

    try {
      const res = await GetPosts({
        pageNumber: page,
        pageSize: 5,
      });

      const { success, message, data } = res;

      if (!success) {
        throw new Error(message);
      }

      if (page === 1) {
        setPosts(data.posts);
      } else {
        setPosts((prev) => [...prev, ...data.posts]);
      }

      setHasNextPage(data.hasNextPage);
      setPageNumber(data.pageNumber);
    } catch (err: any) {
      console.log(err);

      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPosts = async () => {
    setLoading(true);
    try {
      const res = await GetMyPosts();

      const { success, message, data } = res;

      if (!success) {
        throw new Error(message);
      }

      setMyPosts(Array.isArray(data.posts) ? data.posts : []);
    } catch (err: any) {
      console.log(err);

      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedPosts = async () => {
    setLoading(true);
    try {
      const res = await getSavedPosts();
      const { success, message, data } = res;

      if (!success) throw new Error(message);

      const normalized = data.map((item: any) => item.post);

      setSavedPosts(normalized);
    } catch (err: any) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addPost = async ({
    text,
    mediaFiles,
  }: {
    text?: string;
    mediaFiles?: File[];
  }) => {
    try {
      const res = await createPost({
        text,
        mediaFile: mediaFiles,
      });

      if (!res.success) {
        throw new Error(res.message);
      }

      setPosts((prev) => [res.data, ...prev]);
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  };

  const loadMore = () => {
    if (!hasNextPage || loading) return;
    fetchPosts(pageNumber + 1);
  };

  const removePost = async (postId: number) => {
    try {
      const res = await deletePost(postId);
      if (!res.success) throw new Error(res.message);
      setPosts((prev) => prev.filter((p) => p.postId !== postId));
      setMyPosts((prev) => prev.filter((p) => p.postId !== postId));
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  };

  const updatePost = async (
    postId: number,
    {
      text,
      mediaFiles,
      mediaIdsToDelete,
    }: {
      text: string;
      mediaFiles: File[];
      mediaIdsToDelete: number[];
    },
  ) => {
    try {
      const res = await editPost({
        id: postId,
        text,
        NewMediaFiles: mediaFiles,
        MediaIdsToDelete: mediaIdsToDelete,
      });

      if (!res.success) throw new Error(res.message);

      const updater = (prev: Post[]) =>
        prev.map((p) => (p.postId === postId ? res.data : p));

      setPosts(updater);
      setMyPosts(updater);
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  };

  const reportPosts = async (postId: number, reason: string) => {
    try {
      const res = await reportPost(postId, reason);
      if (!res.success) throw new Error(res.message);
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  };

  const savePosts = async (postId: number) => {
    try {
      const res = await savePost(postId);
      if (!res.success) throw new Error(res.message);
      const postToSave = posts.find((p) => p.postId === postId);
      if (postToSave) {
        setSavedPosts((prev) => [postToSave, ...prev]);
      }
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err.message;
      throw new Error(errorMsg);
    }
  };

  const removeSavedPost = async (postId: number) => {
    try {
      const res = await deleteSavedpost(postId);
      if (!res.success) throw new Error(res.message);

      setSavedPosts((prev) => prev.filter((p) => p.postId !== postId));
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err.message;
      throw new Error(errorMsg);
    }
  };

  return {
    posts,
    loading,
    fetchPosts,
    fetchMyPosts,
    loadMore,
    hasNextPage,
    addPost,
    updatePost,
    removePost,
    myPosts,
    reportPosts,
    fetchSavedPosts,
    savedPosts,
    savePosts,
    removeSavedPost,
    fetchPost,
    post,
  };
}
