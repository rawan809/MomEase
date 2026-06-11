import { useEffect, useState } from "react";
import { Send, CornerDownRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { formatDate } from "@/utils/formatDate";
import { useCommunityInteractions } from "@/hooks/useCommunityInteractions";
import { useTranslation } from "react-i18next";
import { toRelativeUrl } from "@/utils/imgBaseURL";
import ReplyOptions from "./ReplyOptions";

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

interface RepliesSectionProps {
  commentId: number;
  postId: number;
  replies: ReplyData[];
  onFetch: () => void;
  onAddReply: (text: string) => Promise<void>;
  repliesCount: number;
}

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

function ReplyRow({
  reply,
  onDelete,
  onUpdate,
}: {
  reply: ReplyData;
  onUpdate: (text: string) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const { i18n } = useTranslation();
  const isAr = i18n.language.startsWith("ar");

  return (
    <div className="flex gap-2 mt-2 items-start">
      <Avatar photo={reply.userPhoto} name={reply.userName} size="sm" />

      <div className="flex-1">
        <div className="flex justify-between items-center">
          <p className="text-xs font-bold text-gray-900">{reply.userName}</p>
          {reply.isMyReply && (
            <ReplyOptions
              text={reply.text}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          )}
        </div>

        <p className="text-[10px] text-gray-400 mb-1">
          {formatDate(reply.createdAt)}
        </p>
        {reply.updatedAt && (
          <p className="text-[10px] text-primary">
            {isAr ? "تم التحديث" : "Updated"} {formatDate(reply.updatedAt)}
          </p>
        )}
        <p
          dir="auto"
          className="text-xs text-gray-700 bg-pink-50 px-3 py-2 rounded-2xl rounded-tl-none leading-relaxed"
        >
          {reply.text}
        </p>
      </div>
    </div>
  );
}

export function RepliesSection({
  postId,
  commentId,
  replies,
  onFetch,
  onAddReply,
  repliesCount,
}: RepliesSectionProps) {
  const { removeReply, updateReply } = useCommunityInteractions(postId);
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showInput, setShowInput] = useState(false);

  // فحص ما إذا كانت اللغة الحالية هي العربية
  const isAr = i18n.language.startsWith("ar");

  const handleToggleReplies = () => {
    if (!open) {
      onFetch();
    }
    setOpen((v) => !v);
  };

  const handleSend = async () => {
    if (!replyText.trim()) return;
    try {
      await onAddReply(replyText);
      setReplyText("");
      setShowInput(false);
    } catch (err) {
      console.error(err);
    }
  };

  // صياغة نص الردود بناءً على العدد واللغة المحددة
  const getRepliesToggleText = () => {
    if (open) {
      return isAr ? "إخفاء الردود" : "Hide replies";
    }

    if (isAr) {
      return `${repliesCount} ${repliesCount === 1 ? "رد" : "ردود"}`;
    } else {
      return `${repliesCount} ${repliesCount === 1 ? "reply" : "replies"}`;
    }
  };

  return (
    <div className="ms-11 mt-1">
      {/* action bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowInput((v) => !v)}
          className="flex items-center gap-1 text-[14px] text-primary/80 hover:text-pink-600 font-semibold transition cursor-pointer"
        >
          {/* <CornerDownRight size={12} /> */}
          {isAr ? "رد" : "Reply"}
        </button>

        {repliesCount > 0 && (
          <button
            onClick={handleToggleReplies}
            className="flex items-center gap-1 text-[14px] text-gray-400 hover:text-gray-600 font-semibold transition  cursor-pointer"
          >
            {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {getRepliesToggleText()}
          </button>
        )}
      </div>

      {/* reply input */}
      {showInput && (
        <div className="mt-2 flex items-center bg-pink-50 rounded-full px-3 py-1 border border-pink-100 gap-2">
          <Input
            placeholder={isAr ? "اكتب رداً..." : "Write a reply..."}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-sm h-8 px-0"
          />
          <Button
            onClick={handleSend}
            size="icon"
            variant="ghost"
            className="text-primary/50 hover:bg-transparent hover:text-primary h-7 w-7 shrink-0"
          >
            <Send size={15} className="fill-current" />
          </Button>
        </div>
      )}

      {/* replies list */}
      {open && (
        <div className="mt-2 space-y-3 border-s-2 border-pink-100 ps-3">
          {replies.map((reply) => (
            <ReplyRow
              key={reply.replyId}
              reply={reply}
              onDelete={() => removeReply(commentId, reply.replyId)}
              onUpdate={(text) => updateReply(commentId, reply.replyId, text)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
