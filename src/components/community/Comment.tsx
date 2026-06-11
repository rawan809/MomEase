import { useEffect, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/dialog";
import { ScrollArea } from "@/components/UI/scroll-area";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { formatDate } from "@/utils/formatDate";
import { useCommunityInteractions } from "@/hooks/useCommunityInteractions";
import CommentOptions from "./CommentOptions";
import { useAuth } from "@/contexts/AuthContext";
import { toRelativeUrl } from "@/utils/imgBaseURL";
import { useTranslation } from "react-i18next";
import { RepliesSection } from "./RepliesSection";

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

interface CommentProps {
  isMypost?: boolean;
  postId: number;
  commentCount: number;
  onCommentAdd?: () => void;
  postUserId: number;
}

// const DUMMY_REPLIES: Record<number, ReplyData[]> = {
//   78: [
//     {
//       replyId: 22,
//       commentId: 78,
//       userId: 19,
//       userName: "sohaila ahmed",
//       userPhoto:
//         "http://momease.runasp.net/uploads/profiles/93bdcf3b-2f0a-4371-bbd7-831e8bc91c54.jpg",
//       text: "string",
//       isMyReply: false,
//       createdAt: "2026-06-09T01:15:39.920325",
//       updatedAt: null,
//     },
//     {
//       replyId: 23,
//       commentId: 78,
//       userId: 19,
//       userName: "sohaila ahmed",
//       userPhoto:
//         "http://momease.runasp.net/uploads/profiles/93bdcf3b-2f0a-4371-bbd7-831e8bc91c54.jpg",
//       text: "hi",
//       isMyReply: true,
//       createdAt: "2026-06-09T01:39:00.1936215",
//       updatedAt: null,
//     },
//     {
//       replyId: 24,
//       commentId: 78,
//       userId: 19,
//       userName: "sohaila ahmed",
//       userPhoto:
//         "http://momease.runasp.net/uploads/profiles/93bdcf3b-2f0a-4371-bbd7-831e8bc91c54.jpg",
//       text: "xx",
//       isMyReply: false,
//       createdAt: "2026-06-09T01:41:27.3355766",
//       updatedAt: null,
//     },
//     {
//       replyId: 25,
//       commentId: 78,
//       userId: 19,
//       userName: "sohaila ahmed",
//       userPhoto:
//         "http://momease.runasp.net/uploads/profiles/93bdcf3b-2f0a-4371-bbd7-831e8bc91c54.jpg",
//       text: "x",
//       isMyReply: false,
//       createdAt: "2026-06-09T03:17:16.3492473",
//       updatedAt: null,
//     },
//   ],
// };

function Avatar({
  photo,
  name,
  size = "sm",
}: {
  photo: string | null;
  name: string;
  size?: "sm" | "md";
}) {
  const dim = size === "md" ? "w-10" : "w-8";
  const text = size === "md" ? "text-base" : "text-sm";

  return photo ? (
    <img
      src={toRelativeUrl(photo)}
      className={`${dim} aspect-square rounded-full object-cover border shrink-0`}
    />
  ) : (
    <div
      className={`${dim} aspect-square rounded-full border bg-pink-100 text-primary flex items-center justify-center ${text} font-bold shrink-0`}
    >
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}

function Comment({
  isMypost,
  postId,
  commentCount,
  onCommentAdd,
}: CommentProps) {
  const { t } = useTranslation();
  const {
    comments,
    loading,
    fetchComments,
    addNewComment,
    removeComment,
    updateComment,
    fetchCommentReplies,
    commentReplies,
    addNewReply,
    removeReply,
    updateReply,
  } = useCommunityInteractions(postId);
  const { user } = useAuth();

  const [newComment, setNewComment] = useState("");

  const handleSendComment = async () => {
    if (!newComment.trim()) return;
    try {
      await addNewComment(newComment);
      setNewComment("");
      onCommentAdd?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog onOpenChange={(open) => open && fetchComments()}>
      <DialogTrigger>
        <div className="flex items-center justify-center gap-2 bg-pink-50 text-primary py-2 px-4 rounded-xl hover:bg-pink-100 transition w-full cursor-pointer">
          <MessageCircle size={18} />
          <span className="font-medium">{commentCount}</span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 h-[80vh] flex flex-col gap-0 p-0 border-none rounded-xl [&>button]:hidden overflow-auto hide-scrollbar">
        {/* Header */}
        <div className="p-6 pb-2 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {t("Comments")}
            </h2>
            <span className="text-gray-500 font-semibold">
              {comments.length}
            </span>
          </div>
        </div>

        {/* Comments List */}
        <ScrollArea className="flex-1 px-6">
          {loading ? (
            <div className="flex flex-col gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 bg-gray-100 animate-pulse rounded-xl w-full"
                />
              ))}
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-6 py-4">
              {comments.map((comment) => (
                <div key={comment.commentId}>
                  {/* comment row */}
                  <div className="flex gap-3 items-start">
                    <Avatar
                      photo={comment.userPhoto}
                      name={comment.userName}
                      size="md"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {comment.userName}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {formatDate(comment.createdAt)}
                          </p>
                          {comment.updatedAt && (
                            <p className="text-[10px] text-primary">
                              {t("updated")} {formatDate(comment.updatedAt)}
                            </p>
                          )}
                        </div>
                        {(user?.userId === comment.userId || isMypost) && (
                          <CommentOptions
                            comment={comment}
                            onDelete={removeComment}
                            onUpdate={updateComment}
                            canEdit={user?.userId === comment.userId}
                          />
                        )}
                      </div>
                      <p
                        dir="auto"
                        className="text-sm text-gray-700 mt-1 leading-relaxed bg-gray-50 px-3 py-2 rounded-2xl rounded-tl-none"
                      >
                        {comment.text}
                      </p>
                    </div>
                  </div>

                  {/* replies section */}
                  <RepliesSection
                    commentId={comment.commentId}
                    postId={postId}
                    replies={commentReplies[comment.commentId] || []}
                    onFetch={() => fetchCommentReplies(comment.commentId)}
                    onAddReply={(text) => addNewReply(text, comment.commentId)}
                    repliesCount={comment.repliesCount}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 mt-20">
              <MessageCircle size={48} className="mb-2 opacity-20" />
              <p>{t("No comments yet. Be the first!")}</p>
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t bg-white rounded-xl sticky bottom-0 z-10">
          <div className="relative flex items-center bg-pink-50 rounded-full px-4 py-1 border border-pink-100">
            <Input
              placeholder={t("Write a comment...")}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
              className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
            />
            <Button
              onClick={handleSendComment}
              size="icon"
              variant="ghost"
              className="text-primary/80 hover:bg-transparent hover:text-primary"
            >
              <Send size={20} className="fill-current" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Comment;
