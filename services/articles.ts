import api from "./instance";
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
};

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

// search
export const searchArticles = async ({ query }: { query: string }) => {
  const response = await api.get(`/Articles/search`, { params: { query } });
  return response.data;
};

// search history
export const getSearchHistory = async () => {
  const response = await api.get(`/search/history`);
  return response.data;
};
export const deleteTerm = async (term: string) => {
  const response = await api.delete(`/search/history/${term}`);
  return response.data;
};

export const clearAllSearchHistory = async () => {
  const response = await api.delete(`/search/history`);
  return response.data;
};
