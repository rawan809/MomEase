import PostCard from "@/components/community/PostCard";
import { useParams } from "react-router-dom";
import { useCommunityPosts } from "@/hooks/useCommunity";
import { useEffect } from "react";

function CommunityPost() {
  const params = useParams();
  const postId = Number(params?.postId?.slice(1));
  const {
    post,
    fetchPost,
    removePost,
    updatePost,
    reportPosts,
    savePosts,
    removeSavedPost,
  } = useCommunityPosts();
  useEffect(() => {
    fetchPost(postId);
  }, [postId]);
  if (!post) {
    return null;
  }

  return (
    <div>
      <PostCard
        post={post}
        onDelete={removePost}
        onUpdate={updatePost}
        report={reportPosts}
        onSave={() => savePosts(post.postId)}
        onUnsave={() => removeSavedPost(post.postId)}
        isSavedProp={post.isSaved}
        isMypost={post.isMyPost}
      />
    </div>
  );
}

export default CommunityPost;
