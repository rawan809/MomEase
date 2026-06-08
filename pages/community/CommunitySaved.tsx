import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PostCard from "@/components/community/PostCard";
import PostSkeleton from "@/components/community/PostSkeleton";
import { useAuth } from "@/contexts/AuthContext";
import type { Post } from "@/hooks/useCommunity";

interface CommunityContextType {
  posts: Post[];
  loading: boolean;
  fetchSavedPosts: () => Promise<void>;
  removePost: (postId: number) => Promise<void>;
  updatePost: (
    postId: number,
    args: { text: string; mediaFiles: File[]; mediaIdsToDelete: number[] },
  ) => Promise<void>;
  reportPosts: (postId: number, reason: string) => Promise<void>;
  savePosts: (postId: number) => Promise<void>;
  removeSavedPost: (postId: number) => Promise<void>;
  savedPosts: Post[];
}

export default function CommunitySaved() {
  const {
    savedPosts,
    loading,
    fetchSavedPosts,
    removePost,
    updatePost,
    reportPosts,
    savePosts,
    removeSavedPost,
  } = useOutletContext<CommunityContextType>();

  const { user } = useAuth();

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  return (
    <>
      <div>
        {savedPosts.map((post) => (
          <PostCard
            key={`saved-${post.postId}`}
            post={post}
            onDelete={removePost}
            onUpdate={updatePost}
            report={reportPosts}
            onSave={() => savePosts(post.postId)}
            onUnsave={() => removeSavedPost(post.postId)}
            isSavedProp={true}
            isMypost={post.isMyPost || post.userId === user?.userId}
          />
        ))}
      </div>
      {loading && (
        <div>
          <PostSkeleton />
        </div>
      )}
    </>
  );
}
