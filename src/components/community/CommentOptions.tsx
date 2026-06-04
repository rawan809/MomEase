import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import type { CommentType } from "@/hooks/useCommunityInteractions";
import { useState } from "react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import CommentEditDialog from "./CommentEditDialog";
import { useTranslation } from "react-i18next";

interface CommentOptionsProps {
  comment: CommentType;
  onDelete: (commentId: number) => Promise<void>;
  onUpdate: (commentId: number, text: string) => Promise<void>;
  canEdit?: boolean;
}

function CommentOptions({
  comment,
  onDelete,
  onUpdate,
  canEdit = true,
}: CommentOptionsProps) {
  const { t } = useTranslation();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger>
          <MoreVertical size={16} className="cursor-pointer" />
        </PopoverTrigger>

        <PopoverContent align="end" className="w-fit">
          <div className="space-y-1">
            {canEdit && (
              <div
                onClick={() => {
                  setPopoverOpen(false);
                  setEditDialogOpen(true);
                }}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-md p-2 cursor-pointer transition-all"
              >
                <FaRegEdit size={14} />
                {t("Edit")}
              </div>
            )}

            <div
              onClick={() => {
                setPopoverOpen(false);
                setDeleteDialogOpen(true);
              }}
              className="flex items-center gap-2 hover:bg-red-50 text-red-500 rounded-md p-2 cursor-pointer transition-all"
            >
              <FaRegTrashCan size={14} />
              {t("Delete")}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={() => onDelete(comment.commentId)}
        title={t("Delete Comment?")}
        description={t("Are you sure you want to delete this comment? This action cannot be undone.")}
        successMessage={t("Comment deleted")}
      />

      <CommentEditDialog
        open={editDialogOpen}
        initialText={comment.text}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={(text) => onUpdate(comment.commentId, text)}
      />
    </>
  );
}

export default CommentOptions;