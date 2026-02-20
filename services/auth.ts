import axios from "axios";

const API_URL = "http://momease.runasp.net/api/Auth";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  age?: number;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};
export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};
