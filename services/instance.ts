import axios from "axios";

const api = axios.create({
  baseURL: "/api",
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

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/Auth/refresh-token")
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const res = await axios.post("/api/Auth/refresh-token", {
            refreshToken,
          });
          const newToken = res.data.data.accessToken;
          const newRefresh = res.data.data.refreshToken;

          localStorage.setItem("token", newToken);
          localStorage.setItem("refreshToken", newRefresh);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (err) {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
