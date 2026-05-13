import Navbar from "../src/components/ui/Navbar";
import PostCard from "../src/components/community/PostCard";
import PostFormDialog from "../src/components/community/PostFormDialog";
import Explore from "../src/components/community/Explore";
import { useState, useEffect, useRef } from "react";
import { useCommunityPosts } from "../src/hooks/useCommunity";
import PostSkeleton from "../src/components/community/PostSkeleton";
import { FaArrowUp } from "react-icons/fa";
import { useAuth } from "../src/contexts/AuthContext";

function Community() {
  const [ActiveTap, setActiveTap] = useState("feed");

  const {
    posts,
    loadMore,
    loading,
    hasNextPage,
    addPost,
    updatePost,
    removePost,
    fetchMyPosts,
    fetchPosts,
    myPosts,
    reportPosts,
    fetchSavedPosts,
    savedPosts,
    removeSavedPost,
    savePosts,
  } = useCommunityPosts();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ActiveTap === "feed") {
      fetchPosts(1);
    }

    if (ActiveTap === "myPosts") {
      fetchMyPosts();
    }

    if (ActiveTap === "saved") {
      fetchSavedPosts();
    }
  }, [ActiveTap]);

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

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();

  return (
    <>
      <button
        onClick={() =>
          scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="fixed bottom-5 right-5 z-50 bg-primary text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all"
      >
        <FaArrowUp />
      </button>
      <section
        ref={scrollRef}
        className="bg-accent/50 overflow-auto hide-scrollbar"
      >
        <Navbar />
        <div className="w-full md:max-w-7xl sm:mx-auto py-20 px-(--space-lg) ">
          <div className="h-[calc(100vh-10rem)]  ">
            {/* <div className="fixed top-20 left-[max(2rem,calc((100vw-80rem)/2))]   h-[calc(100vh-5rem)] lg:w-50 md:w-40 hidden md:block">
            left
          </div> */}
            {/* DESKTOP SIDEBAR */}
            <div className="fixed top-20 right-[max(2rem,calc((100vw-80rem)/2))] h-[calc(100vh-5rem)] lg:w-50 md:w-40 hidden md:flex pt-5 justify-start items-center flex-col gap-5">
              <PostFormDialog mode="create" onSubmit={addPost} />
              <Explore activeTap={ActiveTap} setActiveTap={setActiveTap} />
            </div>

            {/* MOBILE VERSION */}
            <div className="md:hidden flex flex-col gap-4 mb-4">
              <PostFormDialog mode="create" onSubmit={addPost} />
              <Explore activeTap={ActiveTap} setActiveTap={setActiveTap} />
            </div>
            <div className="text-center flex justify-center flex-col md:items-center gap-4 pt-5 ">
              {ActiveTap === "feed" ? (
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
              ) : null}

              {ActiveTap === "myPosts" ? (
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
                      isSavedProp={savedPosts.some(
                        (p) => p.postId === post.postId,
                      )}
                      isMypost={post.isMyPost || post.userId === user?.userId}
                    />
                  ))}
                </div>
              ) : null}

              {ActiveTap === "saved" ? (
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
              ) : null}

              {/* loadMore posts */}
              {loading && (
                <div>
                  <PostSkeleton />
                </div>
              )}
              {hasNextPage && <div ref={loadMoreRef} className="h-10" />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Community;
