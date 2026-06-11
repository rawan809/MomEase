import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/popover";
import { MoreVertical } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import CommentEditDialog from "./CommentEditDialog";
import { useTranslation } from "react-i18next";

interface ReplyOptionsProps {
  text: string;
  onDelete: () => Promise<void>;
  onUpdate: (text: string) => Promise<void>;
}

function ReplyOptions({
  text,
  onDelete,
  onUpdate,
}: ReplyOptionsProps) {
  const { t } = useTranslation();

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger >
          <div>
            <MoreVertical size={14} className="cursor-pointer" />
          </div>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-fit">
          <div className="space-y-1">
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
        onDelete={onDelete}
        title={t("Delete Reply?")}
        description={t(
          "Are you sure you want to delete this reply? This action cannot be undone."
        )}
        successMessage={t("Reply deleted")}
      />

      <CommentEditDialog
        open={editDialogOpen}
        initialText={text}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={onUpdate}
      />
    </>
  );
}

export default ReplyOptions;