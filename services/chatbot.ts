import axios from "axios";

const API_URL = "/api/ChatBot";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Accept-Language": "en",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// send
export const sendMessage = async (userId: number, message: string) => {
  const response = await api.post(`/send`, {
    userId,
    message,
  });
  return response.data;
};

// history

export const getHistory = async () => {
  const response = await api.get(`/history`);
  return response.data;
};
