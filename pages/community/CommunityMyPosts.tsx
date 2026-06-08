import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PostCard from "@/components/community/PostCard";
import PostSkeleton from "@/components/community/PostSkeleton";
import { useAuth } from "@/contexts/AuthContext";
import type { Post } from "@/hooks/useCommunity";

interface CommunityContextType {
  posts: Post[];
  loading: boolean;
  fetchMyPosts: () => Promise<void>;
  removePost: (postId: number) => Promise<void>;
  updatePost: (
    postId: number,
    args: { text: string; mediaFiles: File[]; mediaIdsToDelete: number[] },
  ) => Promise<void>;
  myPosts: Post[];
  reportPosts: (postId: number, reason: string) => Promise<void>;
  savePosts: (postId: number) => Promise<void>;
  removeSavedPost: (postId: number) => Promise<void>;
  savedPosts: Post[];
}

export default function CommunityMyPosts() {
  const {
    myPosts,
    loading,
    fetchMyPosts,
    removePost,
    updatePost,
    reportPosts,
    savePosts,
    removeSavedPost,
    savedPosts,
  } = useOutletContext<CommunityContextType>();

  const { user } = useAuth();

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <>
      <div>
        {myPosts.map((post) => (
          <PostCard
            key={`my-${post.postId}`}
            post={post}
            onDelete={removePost}
            onUpdate={updatePost}
            report={reportPosts}
            onSave={() => savePosts(post.postId)}
            onUnsave={() => removeSavedPost(post.postId)}
            isSavedProp={savedPosts.some((p) => p.postId === post.postId)}
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
