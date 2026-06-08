export const formatDate = (createdAt: string) => {
  const date = new Date(createdAt);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
  );

  const messageDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, 
  };

  if (messageDay.getTime() === today.getTime()) {
    return date.toLocaleTimeString([], timeOptions);
  }

  if (messageDay.getTime() === yesterday.getTime()) {
    return `Yesterday ${date.toLocaleTimeString([], timeOptions)}`;
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    ...timeOptions, // بندمج خيارات الوقت هنا كمان
  });
};