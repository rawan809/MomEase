import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getNotificationsRead,
  getNotifications,
  makeNotificationRead,
  deleteNotificationAPI,
  makeAllRead,
} from "../../services/notifications";

interface Notification {
  id: number;
  isRead: boolean;
  [key: string]: any;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  refreshNotifications: () => Promise<void>;
  markedAsRead: (id: number) => Promise<void>;
  markedAllAsRead: () => Promise<void>;
  deleteNotification: (id: number) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshNotifications = async () => {
    const data = await getNotifications();
    const countData = await getNotificationsRead();
    setNotifications(data.data);
    setUnreadCount(countData.count);
  };

  const markedAsRead = async (id: number) => {
    const target = notifications.find((n) => n.notificationId === id);

    if (target?.isRead) return;
    setNotifications((prev) =>
      prev.map((n) => (n.notificationId === id ? { ...n, isRead: true } : n)),
    );

    setUnreadCount((prev) => Math.max(0, prev - 1));
    try {
      await makeNotificationRead(id);
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const markedAllAsRead = async () => {
    const updatedNotifications = notifications.map((n) => ({
      ...n,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
    try {
      await makeAllRead();

      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all notifications as read", error);
    }
  };

  const deleteNotification = async (id: number) => {
    const previousNotifications = [...notifications];
    const previousCount = unreadCount;
    const filteredNotifications = notifications.filter(
      (n) => n.notificationId !== id,
    );
    const isUnread = notifications.find(
      (n) => n.notificationId === id && !n.read,
    );
    setNotifications(filteredNotifications);
    if (isUnread) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }

    try {
      await deleteNotificationAPI(id);
    } catch (error) {
      console.error("Failed to delete notification", error);
      setNotifications(previousNotifications);
      setUnreadCount(previousCount);
    }
  };

  useEffect(() => {
    refreshNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        refreshNotifications,
        markedAsRead,
        markedAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifs = () => useContext(NotificationContext);
