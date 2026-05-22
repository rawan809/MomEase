import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/utils/formatDate";
import { useCommunityInteractions } from "@/hooks/useCommunityInteractions";
import CommentOptions from "./CommentOptions";
import { useAuth } from "@/contexts/AuthContext";
import { toRelativeUrl } from "@/utils/imgBaseURL";

interface CommentProps {
  postId: number;
  commentCount: number;
  onCommentAdd?: () => void;
  postUserId: number;
}

// --- Dummy Data ---
// const DUMMY_COMMENTS: CommentData[] = [
//   {
//     commentId: 10,
//     postId: 28,
//     userId: 40,
//     userName: "Rawan Ghoniam",
//     userPhoto: null,
//     text: "wow, this is amazing! 😍",
//     createdAt: "2026-04-30T21:47:49.6060974",
//     updatedAt: null,
//   },
//   {
//     commentId: 11,
//     postId: 28,
//     userId: 41,
//     userName: "Om Yassin",
//     userPhoto: "https://github.com/shadcn.png",
//     text: "حطيله كيناكومب وبيبي اويل جونسون ولبسيه هدوم قطن وخديه بكرة عن دكتور الجلدية",
//     createdAt: "2026-05-01T10:30:00.0000000",
//     updatedAt: null,
//   },
// ];

function Comment({
  postId,
  commentCount,
  onCommentAdd,
  postUserId,
}: CommentProps) {
  const {
    comments,
    loading,
    fetchComments,
    addNewComment,
    removeComment,
    updateComment,
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
      // toast.err
    }
  };

  return (
    <Dialog onOpenChange={(open) => open && fetchComments()}>
      <DialogTrigger>
        <div className="flex items-center justify-center gap-2 bg-pink-50 text-pink-500 py-2 px-4 rounded-xl hover:bg-pink-100 transition w-full cursor-pointer">
          <MessageCircle size={18} />
          <span className="font-medium">{commentCount}</span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 h-[80vh] flex flex-col gap-0 p-0  border-none rounded-xl [&>button]:hidden overflow-auto hide-scrollbar">
        {/* Header */}
        <div className="p-6 pb-2 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Comments</h2>
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
                <div key={comment.commentId} className="flex gap-3">
                  <div>
                    {comment.userPhoto ? (
                      <img
                        src={toRelativeUrl(comment.userPhoto)}
                        className="w-12 aspect-square rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-12 aspect-square rounded-full object-cover border bg-gray-200 flex items-center justify-center text-2xl font-bold">
                        {comment.userName.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between ">
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {comment.userName}
                        </p>

                        <p className="text-[10px] text-gray-400">
                          {formatDate(comment.createdAt)}
                        </p>

                        {comment.updatedAt ? (
                          <p className="text-[10px] text-primary">
                            updated {formatDate(comment.updatedAt)}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                      {user?.userId === comment.userId && (
                        <CommentOptions
                          comment={comment}
                          onDelete={removeComment}
                          onUpdate={updateComment}
                        />
                      )}
                    </div>
                    <p
                      dir="auto"
                      className="text-sm text-gray-700 mt-1 leading-relaxed bg-gray-50 p-3 rounded-2xl rounded-tl-none"
                    >
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 mt-20">
              <MessageCircle size={48} className="mb-2 opacity-20" />
              <p>No comments yet. Be the first!</p>
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t bg-white rounded-xl sticky bottom-0 z-10">
          <div className="relative flex items-center bg-pink-50 rounded-full px-4 py-1 border border-pink-100">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
              className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
            />
            <Button
              onClick={handleSendComment}
              size="icon"
              variant="ghost"
              className="text-pink-500 hover:bg-transparent hover:text-pink-600"
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
