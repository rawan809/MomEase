import { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import Notification from "@/components/notifications/Notification";
import { useNotifs } from "@/contexts/NotificationContext";
import EmptyResponse from "@/components/UI/EmptyResponse";
import { useNavigate } from "react-router-dom";
import { getNotificationRoute } from "@/utils/notificationNavigation";
import { useTranslation } from "react-i18next";
// import LoadingState from "@/components/UI/LoadingState";

function Notifications() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const notifContext = useNotifs();

  if (!notifContext) return null;

  const {
    notifications,
    unreadCount,
    markedAsRead,
    markedAllAsRead,
    deleteNotification,
  } = notifContext;

  const handleNotificationClick = (notify: any) => {
    markedAsRead(notify.notificationId);

    const route = getNotificationRoute(notify.actionUrl);

    if (route) {
      navigate(route);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-10xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-4 items-center">
            <div className="bg-pink-100 p-3 rounded-full text-primary">
              <IoMdNotifications size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t("Notifications")}
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                {t("unread_count", { count: unreadCount })}
              </p>
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-5 py-2 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer text-sm"
            onClick={markedAllAsRead}
          >
            <IoCheckmarkDoneOutline size={18} />
            {t("Mark all as read")}
          </button>
        </div>

        {/* Filter Section */}
        <div className="flex gap-2 mt-5 p-1 bg-gray-100/50 w-fit rounded-2xl border border-gray-200">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              filter === "all"
                ? "bg-white text-primary shadow-sm ring-1 ring-black/5"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("All")}
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              filter === "unread"
                ? "bg-white text-primary shadow-sm ring-1 ring-black/5"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t("Unread")}
          </button>
        </div>

        {/* Content Section */}
        {filter === "unread" ? (
          notifications.length === 0 ? (
            <div className="h-40 flex items-center justify-center">
              <p>{t("Loading...")}</p>
            </div>
          ) : notifications.filter((n) => !n.isRead).length === 0 ? (
            <div className="h-[40vh]">
              <EmptyResponse title={t("No UnRead Notifications")} />
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {notifications
                .filter((n) => !n.isRead)
                .map((notify: any) => (
                  <Notification
                    markAsRead={() => markedAsRead(notify.notificationId)}
                    key={notify.notificationId}
                    title={notify.title}
                    body={notify.body}
                    date={notify.createdAt}
                    read={notify.isRead}
                    onClick={() => handleNotificationClick(notify)}
                    notificationPage={true}
                    deleteNotification={() =>
                      deleteNotification(notify.notificationId)
                    }
                  />
                ))}
            </div>
          )
        ) : filter === "all" ? (
          notifications.length === 0 ? (
            <div className="h-[40vh]">
              <EmptyResponse title={t("No Notifications")} />
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {notifications.map((notify: any) => (
                <Notification
                  markAsRead={() => markedAsRead(notify.notificationId)}
                  key={notify.notificationId}
                  title={notify.title}
                  body={notify.body}
                  date={notify.createdAt}
                  read={notify.isRead}
                  onClick={() => handleNotificationClick(notify)}
                  notificationPage={true}
                  deleteNotification={() =>
                    deleteNotification(notify.notificationId)
                  }
                />
              ))}
            </div>
          )
        ) : null}
      </div>
    </section>
  );
}

export default Notifications;
