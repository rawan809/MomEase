import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  getNotificationsRead,
  getNotifications,
  makeNotificationRead,
  deleteNotificationAPI,
  makeAllRead,
} from "../../services/notifications";
import { useAuth } from "./AuthContext";

interface Notification {
  id: number;
  notificationId: number; // تأكدت من استخدامك للاسم ده في الفلترة
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

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // لضمان عدم حدوث تداخل بين الـ Polling والعمليات اليدوية (المسح والقراءة)
  const isMutating = useRef(false); 

  const refreshNotifications = async () => {
    // لو بنعمل مسح أو قراءة حالياً، نوقف الـ أوتو ريفريش مؤقتاً عشان ميبوظش الـ State
    if (isMutating.current) return; 

    const token = localStorage.getItem("token");
    if (!token || !isAuthenticated) return;

    try {
      const [notifsRes, countRes] = await Promise.all([
        getNotifications(),
        getNotificationsRead()
      ]);
      
      // نتحقق مرة تانية إن مفيش أكشن حصل أثناء ما الـ API كان شغال في السكة
      if (!isMutating.current) {
        setNotifications(notifsRes.data || []);
        setUnreadCount(countRes.count || 0);
      }
    } catch (error) {
      console.error("Failed to refresh notifications", error);
    }
  };

  const markedAsRead = async (id: number) => {
    const target = notifications.find((n) => n.notificationId === id);
    if (!target || target.isRead) return;

    isMutating.current = true;

    // 1. تحديث الفرونت إند فوراً (Optimistic UI)
    setNotifications((prev) =>
      prev.map((n) => (n.notificationId === id ? { ...n, isRead: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      // 2. تبلغ السيرفر
      await makeNotificationRead(id);
    } catch (error) {
      console.error("Failed to mark notification as read", error);
      // في حالة الفشل، نرجع الداتا زي ما كانت
      refreshNotifications(); 
    } finally {
      isMutating.current = false;
    }
  };

  const markedAllAsRead = async () => {
    isMutating.current = true;
    
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);

    try {
      await makeAllRead();
    } catch (error) {
      console.error("Failed to mark all notifications as read", error);
      refreshNotifications();
    } finally {
      isMutating.current = false;
    }
  };

  const deleteNotification = async (id: number) => {
    isMutating.current = true;

    const previousNotifications = [...notifications];
    const previousCount = unreadCount;

    const filteredNotifications = notifications.filter((n) => n.notificationId !== id);
    const isUnread = notifications.find((n) => n.notificationId === id && !n.isRead);

    // 1. مسح من الفرونت فوراً
    setNotifications(filteredNotifications);
    if (isUnread) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }

    try {
      // 2. طلب المسح من السيرفر
      await deleteNotificationAPI(id);
    } catch (error) {
      console.error("Failed to delete notification", error);
      // لو السيرفر هنج، رجعي الإشعار تاني
      setNotifications(previousNotifications);
      setUnreadCount(previousCount);
    } finally {
      isMutating.current = false;
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    // أول جلب للبيانات
    refreshNotifications();

    // تشغيل الـ Polling بأمان كل 15 ثانية (زودتها شوية عشان ندي مساحة للـ APIs تخلص)
    const intervalId = setInterval(() => {
      refreshNotifications();
    }, 15000);

    // الـ Visibility Change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshNotifications();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAuthenticated]);

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