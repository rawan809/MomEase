import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

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
  return (
    <ConfirmDeleteDialog
      open={open}
      onClose={onClose}
      onDelete={() => onDelete(postId)}
      title="Delete Post?"
      description="Are you sure you want to delete this post? This action cannot be undone."
      successMessage="Post deleted successfully"
    />
  );
}

export default DeletePostDialog;
