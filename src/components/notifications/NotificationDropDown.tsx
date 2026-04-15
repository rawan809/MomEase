import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import EmptyResponse from "../ui/EmptyResponse";
import { useNotifs } from "../../contexts/NotificationContext";

function NotificationDropDown() {
  const notifContext = useNotifs();

  if (!notifContext) return null; 

  const { notifications, unreadCount, markedAsRead } = notifContext;
  console.log(notifications);

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer relative ">
        <IoMdNotifications />
        {unreadCount > 0 ? (
          <div className="absolute -top-2 -right-2 bg-red-400 text-white text-[10px] font-bold w-fit h-4 flex items-center justify-center rounded-full border-2 border-white py-2 px-1">
            {unreadCount}
          </div>
        ) : null}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="max-h-90 w-90 overflow-auto hide p-5 hide-scrollbar"
      >
        <div className="flex items-center justify-between mb-4">
          <PopoverTitle className="font-semibold text-xl">
            Notifications
          </PopoverTitle>
          {unreadCount > 0 ? (
            <div className="bg-accent py-1 px-2 text-[12px] rounded-full">
              {unreadCount} new
            </div>
          ) : null}
        </div>
        {/* empty */}
        {notifications.length === 0 ? (
          <div className="h-40">
            <EmptyResponse title="No Notifications Found" />
          </div>
        ) : (
          <div>
            <div className="space-y-3 mb-10">
              {notifications.map((notify: any) => (
                <Notification
                  key={notify.notificationId}
                  title={notify.title}
                  body={notify.body}
                  date={notify.createdAt}
                  read={notify.isRead}
                  onClick={() => markedAsRead(notify.notificationId)}
                  notificationPage={false}
                />
              ))}
            </div>
            <div className=" border-t  flex items-center justify-center fixed bottom-0 bg-white w-full left-0 rounded-xl rounded-t-none">
              <Link
                className="text-center p-3 text-primary  hover:text-black transition-all duration-75  w-full"
                to={"/notifications"}
              >
                View All Notifications
              </Link>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default NotificationDropDown;
