import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import { MdError } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
// import { useAuth } from "@/contexts/AuthContext";
import DeletePostDialog from "./DeletePostDialog";
import ReportPost from "./ReportPost";
import PostFormDialog from "./PostFormDialog";
import type { Post } from "./PostCard";

interface PostOptionsProps {
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
  isMyPost: boolean;
}

function PostOptions({ post, onDelete, onUpdate, report,isMyPost }: PostOptionsProps) {
  // const { user } = useAuth();
  // const isMyPost = user?.userId === post.userId;

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger className="cursor-pointer">
          <MoreVertical size={20} />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-fit">
          <div className="space-y-1">
            {isMyPost ? (
              <>
                <div
                  onClick={() => {
                    setPopoverOpen(false);
                    setEditDialogOpen(true);
                  }}
                  className="flex items-center gap-2 hover:bg-gray-100 rounded-md p-2 cursor-pointer transition-all"
                >
                  <FaRegEdit size={16} />
                  <span>Edit post</span>
                </div>
                <div
                  onClick={() => {
                    setPopoverOpen(false);
                    setDeleteDialogOpen(true);
                  }}
                  className="flex items-center gap-2 hover:bg-red-50 text-red-500 rounded-md p-2 cursor-pointer transition-all"
                >
                  <FaRegTrashCan size={16} />
                  <span>Delete post</span>
                </div>
              </>
            ) : (
              <div
                onClick={() => {
                  setPopoverOpen(false);
                  setReportDialogOpen(true);
                }}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-md p-2 cursor-pointer transition-all"
              >
                <MdError size={16} />
                <span>Report post</span>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <PostFormDialog
        mode="edit"
        post={post}
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={(data) => onUpdate(post.postId, data)}
      />

      <DeletePostDialog
        postId={post.postId}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={onDelete}
      />

      <ReportPost
        postId={post.postId}
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        report={report}
      />
    </>
  );
}

export default PostOptions;
