import { FaShieldHeart } from "react-icons/fa6";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { formatDate } from "@/utils/formatDate";

interface NotificationProps {
  title: string;
  body: string;
  date: string;
  read: boolean;
  notificationPage: boolean;
  type?: "order" | "system" | "alert";
  onClick?: () => void;
  deleteNotification?: () => void;
}

function Notification({
  title,
  body,
  date,
  read,
  onClick,
  notificationPage,
  deleteNotification,
}: NotificationProps) {
  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation(); // يمنع تفعيل الـ onClick بتاع الديف الأب
    if (onClick) onClick();
  };

  return (
    <div
      className={`flex gap-5 items-start rounded-xl p-3 border-2 transition-all cursor-pointer ${
        read ? " bg-gray-50/50" : "border-accent bg-white shadow-sm"
      } hover:bg-pink-50`}
      onClick={onClick}
    >
      {/* Icon Section */}
      <div
        className={`aspect-square rounded-full p-2 border-2 ${read ? "text-gray-400 border-gray-200" : "text-primary border-accent"}`}
      >
        <FaShieldHeart size={20} />
      </div>

      {/* Content Section */}
      <div className="w-full space-y-2">
        <div className="flex justify-between items-center w-full">
          <p
            className={`font-semibold ${read ? "text-gray-600" : "text-gray-900"}`}
          >
            {title}
          </p>
          {!read && (
            <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm"></div>
          )}
        </div>

        <p className={`text-sm ${read ? "text-gray-500" : "text-gray-700"}`}>
          {body}
        </p>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <p className="text-[12px] text-gray-400">{formatDate(date)}</p>

          <div className="flex items-center gap-4">
            {/* when not read*/}
            {!read && (
              <button
                onClick={handleMarkAsRead}
                className="text-primary text-sm font-medium flex items-center gap-1 hover:underline underline-offset-4"
              >
                <IoCheckmarkDoneOutline size={16} />
                mark as read
              </button>
            )}

            {notificationPage && (
              <button
                className="text-gray-400 text-sm font-medium flex items-center gap-1 hover:text-red-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification?.();
                }} // لمنع فتح الإشعار عند المسح
              >
                <FaRegTrashCan size={14} />
                delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
