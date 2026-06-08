import { useState, useEffect } from "react";
import { ThumbsUp, Heart, HandFist, Lightbulb } from "lucide-react";

import { Dialog, DialogContent } from "@/components/UI/dialog";
import { ScrollArea } from "@/components/UI/scroll-area";
import { useCommunityInteractions } from "@/hooks/useCommunityInteractions";
import { toRelativeUrl } from "@/utils/imgBaseURL";
import { useTranslation } from "react-i18next";

interface ReactionListDialogProps {
  open: boolean;
  postId: number;
  onClose: () => void;
}

export default function ReactionListDialog({
  open,
  postId,
  onClose,
}: ReactionListDialogProps) {
  const { t } = useTranslation();
  const { reactions, loadingReactions, fetchReactions } =
    useCommunityInteractions(postId);
  const [activeTab, setActiveTab] = useState<string>("ALL");

  useEffect(() => {
    if (open) {
      fetchReactions();
      setActiveTab("ALL");
    }
  }, [open, postId]);

  // Group reactions by type and compute counts
  const reactionGroups = reactions.reduce(
    (acc, curr) => {
      const t = curr.reactionType.toUpperCase();
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Get active lists based on tab
  const filteredReactions =
    activeTab === "ALL"
      ? reactions
      : reactions.filter((r) => r.reactionType.toUpperCase() === activeTab);

  const getReactionBadge = (type: string) => {
    const t = type.toUpperCase();
    if (t === "LIKE") {
      return (
        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-sm border border-white">
          <ThumbsUp size={10} className="fill-current" />
        </div>
      );
    }
    if (t === "LOVE") {
      return (
        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white shadow-sm border border-white">
          <Heart size={10} className="fill-current" />
        </div>
      );
    }
    if (t === "SUPPORT") {
      return (
        <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-sm border border-white">
          <HandFist size={10} className="fill-current" />
        </div>
      );
    }
    if (t === "HELPFUL") {
      return (
        <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-sm border border-white">
          <Lightbulb size={10} className="fill-current" />
        </div>
      );
    }
    // Fallback
    return (
      <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center text-white shadow-sm border border-white text-[8px]">
        <ThumbsUp />
      </div>
    );
  };

  const getReactionIconForTab = (type: string) => {
    const t = type.toUpperCase();
    if (t === "LIKE")
      return (
        <span className="text-blue-500">
          <ThumbsUp size={15} />
        </span>
      );
    if (t === "LOVE")
      return (
        <span className="text-red-500">
          <Heart size={15} />
        </span>
      );
    if (t === "SUPPORT")
      return (
        <span className="text-purple-500">
          <HandFist size={15} />
        </span>
      );
    if (t === "HELPFUL")
      return (
        <span className="text-amber-500">
          <Lightbulb size={15} />
        </span>
      );
    return (
      <span>
        <ThumbsUp size={15} />
      </span>
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md max-h-[85vh] flex flex-col gap-0 p-0 border-none rounded-xl overflow-hidden bg-white "
      >
        {/* Header section with Close button and Tabs */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
          <div className="flex items-center justify-between p-4 pb-2">
            {/* Title / Info */}
            <h3 className="text-lg font-bold text-gray-800">
              {t("Reactions")} ({reactions.length})
            </h3>

            {/* Close Button */}
            {/* <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X size={16} className="text-gray-500" />
            </button> */}
          </div>

          {/* Tabs List */}
          <div className="flex items-center gap-1.5 px-4 overflow-x-auto hide-scrollbar select-none">
            {/* "All" Tab */}
            <button
              onClick={() => setActiveTab("ALL")}
              className={`pb-3 pt-1 text-sm font-semibold whitespace-nowrap transition-all border-b-3 px-2 flex items-center gap-1 cursor-pointer ${
                activeTab === "ALL"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>{t("All")}</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                {reactions.length}
              </span>
            </button>

            {/* Individual Reaction Tabs */}
            {Object.keys(reactionGroups).map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`pb-3 pt-1 text-sm font-semibold whitespace-nowrap transition-all border-b-3 px-2 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === type
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <span>{getReactionIconForTab(type)}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                  {reactionGroups[type]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable list of users */}
        <ScrollArea className="flex-1 p-4 max-h-[55vh]">
          {loadingReactions ? (
            <div className="space-y-4 py-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 animate-pulse rounded-full" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-100 animate-pulse rounded w-28" />
                      <div className="h-3 bg-gray-100 animate-pulse rounded w-20" />
                    </div>
                  </div>
                  <div className="w-20 h-8 bg-gray-100 animate-pulse rounded-xl" />
                </div>
              ))}
            </div>
          ) : filteredReactions.length > 0 ? (
            <div className="space-y-4">
              {filteredReactions.map((item) => (
                <div
                  key={item.userId}
                  className="flex items-center justify-between py-1 transition-colors duration-150"
                >
                  {/* User Profile Info */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {item.userPhoto ? (
                        <img
                          src={toRelativeUrl(item.userPhoto)}
                          alt={t("Profile of {{name}}", { name: item.userName })}
                          className="w-12 h-12 rounded-full object-cover border border-gray-100"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border border-primary/20">
                          {item.userName.slice(0, 1)}
                        </div>
                      )}
                      {/* Reaction Badge on Bottom Right of Avatar */}
                      <div className="absolute -bottom-1 ">
                        {getReactionBadge(item.reactionType)}
                      </div>
                    </div>

                    <div className="text-start">
                      <h4 className="font-semibold  text-sm">
                        {item.userName}
                      </h4>
                      {/* <p className="text-gray-400 text-xs mt-0.5">
                        {t("Community Member")}
                      </p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 mt-14 pb-10">
              <ThumbsUp size={40} className="mb-2 opacity-20" />
              <p className="text-sm">{t("No reactions here yet.")}</p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}