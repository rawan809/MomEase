import api from "./instance";



export const getNotifications = async () => {
  const response = await api.get(`/notifications`);
  return response.data;
};

export const getNotificationsRead = async () => {
  const response = await api.get(`/notifications/unread-count`);
  return response.data;
};

export const makeNotificationRead = async (id: number) => {
  const response = await api.put(`/notifications/${id}/read`);
  return response.data;
};

export const makeAllRead = async () => {
  const response = await api.put(`/notifications/mark-all-read`);
  return response.data;
};

export const deleteNotificationAPI = async (id: number) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};



