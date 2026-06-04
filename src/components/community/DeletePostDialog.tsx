import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { useTranslation } from "react-i18next";

interface DeletePostDialogProps {
  postId: number;
  open: boolean;
  onClose: () => void;
  onDelete: (postId: number) => Promise<void>;
}

function DeletePostDialog({
  postId,
  open,
  onClose,
  onDelete,
}: DeletePostDialogProps) {
  const { t } = useTranslation();

  return (
    <ConfirmDeleteDialog
      open={open}
      onClose={onClose}
      onDelete={() => onDelete(postId)}
      title={t("Delete Post?")}
      description={t("Are you sure you want to delete this post? This action cannot be undone.")}
      successMessage={t("Post deleted successfully")}
    />
  );
}

export default DeletePostDialog;