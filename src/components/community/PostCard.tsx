import React from "react";
import { Bookmark } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import PostText from "./PostText";
import PostImages from "./PostImages";
import Comment from "./Comment";
import Reactions from "./Reactions";
import { useState } from "react";
import PostOptions from "./PostOptions";

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
interface PostCardProps {
  post: Post;
  onDelete: (postId: number) => Promise<void>;
  onUpdate: (
    postId: number,
    data: {
      text: string;
      mediaFiles: File[];
      mediaIdsToDelete: number[];
    },
  ) => Promise<void>;
  report: (postId: number, reason: string) => Promise<void>;
  onSave?: (postId: number) => Promise<void>;
  onUnsave?: (postId: number) => Promise<void>;
  isSavedProp?: boolean;
  isMypost?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onDelete,
  onUpdate,
  report,
  onSave,
  onUnsave,
  isSavedProp,
  isMypost,
}) => {
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);

  // Initialize with prop or api data, defaulting to false
  // const [isSavedLocal, setIsSavedLocal] = useState(isSavedProp ?? post.isSaved ?? false);
  const [isSavedLocal, setIsSavedLocal] = useState(isSavedProp ?? false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToggle = async () => {
    if (isSaving) return;
    setIsSaving(true);
    const previousState = isSavedLocal;

    // Optimistic update
    setIsSavedLocal(!previousState);

    try {
      if (previousState && onUnsave) {
        await onUnsave(post.postId);
      } else if (!previousState && onSave) {
        await onSave(post.postId);
      }
    } catch (err) {
      // Revert on error
      setIsSavedLocal(previousState);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm     mb-4 lg:w-140 md:w-110 w-full">
      {/* Header: User Info */}
      <div className="flex justify-between items-center  mb-3">
        <div className="flex items-center gap-3">
          {post.userPhoto ? (
            <img
              src={`http://momease.runasp.net${post.userPhoto}`}
              className="w-12 aspect-square rounded-full object-cover border"
            />
          ) : (
            <div className="w-12 aspect-square rounded-full object-cover border bg-gray-200 flex items-center justify-center text-2xl font-bold">
              {post.userName.slice(0, 1)}
            </div>
          )}

          <div className="text-start">
            <h4 className="font-bold text-gray-900 text-sm">{post.userName}</h4>
            <p className="text-gray-400 text-xs">
              {formatDate(post.createdAt)}
            </p>
            {post.updatedAt ? (
              <p className="text-[10px] text-primary">
                updated {formatDate(post.updatedAt)}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <PostOptions
            post={post}
            onDelete={onDelete}
            onUpdate={onUpdate}
            report={report}
            isMyPost={isMypost || false}
          />
        </div>
      </div>

      {/* Post Text */}
      <PostText text={post.text} />

      {/* Post Media (Images) */}
      <PostImages media={post.media} />

      {/* Footer: Interactions */}
      <div className="grid grid-cols-3 gap-2">
        <Reactions
          postId={post.postId}
          initialCount={post.reactionsCount}
          myReaction={post.myReaction}
        />
        <Comment
          postId={post.postId}
          commentCount={commentsCount}
          onCommentAdd={() => setCommentsCount((prev) => prev + 1)}
          postUserId={post.userId}
        />

        <button
          onClick={handleSaveToggle}
          disabled={isSaving}
          className={`flex items-center justify-center gap-2 py-2 rounded-xl transition cursor-pointer ${
            isSavedLocal
              ? "bg-pink-100 text-pink-600"
              : "bg-pink-50 text-pink-500 hover:bg-pink-100"
          }`}
        >
          <Bookmark size={18} fill={isSavedLocal ? "#ff3381" : "transparent"} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
