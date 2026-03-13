import axios from "axios";

const API_URL = "http://momease.runasp.net/api";
const api = axios.create({
  baseURL: API_URL,
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
  const response = await api.get(`${API_URL}/articles/categories`);
  return response.data;
};

export const CategoryInfo = async (id: number) => {
  const response = await api.get(`${API_URL}/articles/categories/${id}`);
  return response.data;
};

// articles
export const ArticlesAPI = async (categoryId: number) => {
  const response = await api.get(`${API_URL}/Articles`, {
    params: {
      categoryId: categoryId,
    },
  });

  return response.data;
};

// saved

export const getSavedArticlesAPI = async () => {
  const response = await api.get(`${API_URL}/saved-articles`, {});

  return response.data;
};

export const AddSavedArticle = async (articleId: number) => {
  const response = await api.post(`${API_URL}/saved-articles`, {
    articleId,
  });
  return response.data;
};
export const DeleteSavedArticle = async (articleId: number) => {
  const response = await api.delete(
    `${API_URL}/saved-articles/${articleId}`
  );
  return response.data;
};
