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

export const resendOtp = async (email: string) => {
  const response = await axios.post(`${API_URL}/resend-otp`, {
    email,
  });
  return response.data;
};
 
export const verifyEmail = async (email: string, otpCode: string) => {
  const response = await axios.post(`${API_URL}/verify-email`, {
    email,
    otpCode,
  });
  return response.data;
};