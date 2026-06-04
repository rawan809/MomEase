import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import PostCard from "../../src/components/community/PostCard";
import PostSkeleton from "../../src/components/community/PostSkeleton";
import { useAuth } from "../../src/contexts/AuthContext";
import type { Post } from "../../src/hooks/useCommunity";

interface CommunityContextType {
  posts: Post[];
  loading: boolean;
  fetchPosts: (page?: number) => Promise<void>;
  loadMore: () => void;
  hasNextPage: boolean;
  addPost: (args: { text?: string; mediaFiles?: File[] }) => Promise<void>;
  updatePost: (
    postId: number,
    args: { text: string; mediaFiles: File[]; mediaIdsToDelete: number[] },
  ) => Promise<void>;
  removePost: (postId: number) => Promise<void>;
  myPosts: Post[];
  reportPosts: (postId: number, reason: string) => Promise<void>;
  fetchSavedPosts: () => Promise<void>;
  savedPosts: Post[];
  savePosts: (postId: number) => Promise<void>;
  removeSavedPost: (postId: number) => Promise<void>;
}

export default function CommunityFeed() {
  const {
    posts,
    loading,
    fetchPosts,
    loadMore,
    hasNextPage,
    removePost,
    updatePost,
    reportPosts,
    savePosts,
    removeSavedPost,
  } = useOutletContext<CommunityContextType>();

  const { user } = useAuth();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchPosts(1);
  }, []);

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      },
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, loading]);

  return (
    <>
      <div>
        {posts.map((post) => (
          <PostCard
            key={`feed-${post.postId}`}
            post={post}
            onDelete={removePost}
            onUpdate={updatePost}
            report={reportPosts}
            onSave={() => savePosts(post.postId)}
            onUnsave={() => removeSavedPost(post.postId)}
            isSavedProp={post.isSaved}
            isMypost={post.isMyPost || post.userId === user?.userId}
          />
        ))}
      </div>

      {loading && (
        <div>
          <PostSkeleton />
        </div>
      )}
      {hasNextPage && <div ref={loadMoreRef} className="h-10" />}
    </>
  );
}
