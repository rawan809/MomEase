import axios from "axios";

const adminApi = axios.create({
  baseURL: "/api",
  headers: { "Accept-Language": "en" },
  validateStatus: (status) => status >= 200 && status < 300, // 👈 add here
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getUsers = async () => {
  const res = await adminApi.get("/Admin/users");
  return res.data;
};

export const getUserById = async (id: number) => {
  const res = await adminApi.get(`/Admin/users/${id}`);
  return res.data;
};

export const updateUser = async (id: number, data: any) => {
  const res = await adminApi.put(`/Admin/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await adminApi.delete(`/Admin/users/${id}`);
  return res.data;
};

export const updateUserRole = async (id: number, role: string) => {
  const res = await adminApi.put(`/Admin/users/${id}/role`, { role });
  return res.data;
};

export const updateUserStatus = async (id: number, isActive: boolean) => {
  const res = await adminApi.put(`/Admin/users/${id}/status`, { isActive });
  return res.data;
};
// Articles
export const getArticles = async () => {
  const res = await adminApi.get("/Articles");
  return res.data;
};

export const getArticleById = async (id: number) => {
  const res = await adminApi.get(`/Articles/${id}`);
  return res.data;
};

export const createArticle = async (data: any) => {
  const res = await adminApi.post("/Articles", data, {
    validateStatus: (status) => status >= 200 && status < 300, // 👈 accept 201
  });
  return res.data;
};

export const updateArticle = async (id: number, data: any) => {
  const res = await adminApi.put(`/Articles/${id}`, data, {
    validateStatus: (status) => status >= 200 && status < 300, // 👈 add this
  });
  return res.data;
};

export const deleteArticle = async (id: number) => {
  const res = await adminApi.delete(`/Articles/${id}`);
  return res.data;
};

export const searchArticles = async (query: string) => {
  const res = await adminApi.get(`/Articles/search?q=${query}`);
  return res.data;
};
// Community Posts
export const getCommunityPosts = async (pageNumber = 1, pageSize = 10) => {
  const res = await adminApi.get(
    `/community/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
  return res.data;
};

export const getCommunityPostById = async (id: number) => {
  const res = await adminApi.get(`/community/posts/${id}`);
  return res.data;
};

export const deleteCommunityPost = async (id: number) => {
  const res = await adminApi.delete(`/community/posts/${id}`);
  return res.data;
};
export { adminApi };
// Reports
export const getReports = async () => {
  const res = await adminApi.get("/community/reports");
  return res.data;
};

export const getPendingReports = async () => {
  const res = await adminApi.get("/community/reports/pending");
  return res.data;
};

export const getReviewedReports = async () => {
  const res = await adminApi.get("/community/reports/reviewed");
  return res.data;
};

export const reviewReport = async (
  id: number,
  action: string,
  adminNote: string,
) => {
  const res = await adminApi.put(`/community/reports/${id}/review`, {
    action,
    adminNote,
  });
  return res.data;
};

export const deleteReportedPost = async (postId: number) => {
  const res = await adminApi.delete(`/community/posts/${postId}`);
  return res.data;
};
