import axios from "axios";

const API_URL = "/api";
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

// categories

export const ArticlesCategories = async () => {
  const response = await api.get(`/articles/categories`);
  return response.data;
};

export const CategoryInfo = async (id: number) => {
  const response = await api.get(`/articles/categories/${id}`);
  return response.data;
};

// articles
export const ArticlesAPI = async (categoryId: number) => {
  const response = await api.get(`/Articles/category/${categoryId}`);

  return response.data;
};
export const ArticleAPI = async (articleId: number) => {
  const response = await api.get(`/Articles/${articleId}`);

  return response.data;
};
export const AllarticlesApi = async () => {
  const response = await api.get(`/Articles`);

  return response.data;
}

// saved

export const getSavedArticlesAPI = async () => {
  const response = await api.get(`/saved-articles`, {});

  return response.data;
};

export const AddSavedArticle = async (articleId: number) => {
  const response = await api.post(`/saved-articles`, {
    articleId,
  });
  return response.data;
};
export const DeleteSavedArticle = async (articleId: number) => {
  const response = await api.delete(`/saved-articles/${articleId}`);
  return response.data;
};
