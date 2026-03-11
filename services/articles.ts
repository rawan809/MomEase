import axios from "axios";

const API_URL = "http://momease.runasp.net/api";


// categories

export const ArticlesCategories = async () => {
  const response = await axios.get(`${API_URL}/articles/categories`);
  return response.data;
};
