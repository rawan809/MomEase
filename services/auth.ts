import axios from "axios";

const api = axios.create({
  baseURL: "/api/Auth",
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
  const response = await api.post(`/register`, data);
  return response.data;
};
export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  const response = await api.post(`/login`, data);
  return response.data;
};

export const resendOtp = async (email: string) => {
  const response = await api.post(`/resend-otp`, {
    email,
  });
  return response.data;
};

export const verifyEmail = async (email: string, otpCode: string) => {
  const response = await api.post(`/verify-email`, {
    email,
    otpCode,
  });
  return response.data;
};
export const googleLogin = async (idToken: string) => {
  const response = await api.post(`/google-login`, {
    idToken: idToken,
  });

  return response.data;
};

export const forgetPassword = async (email: string) => {
  const response = await api.post(`/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (
  email: string,
  otpCode: string,
  newPassword: string,
) => {
  const response = await api.post(`/reset-password`, {
    email,
    otpCode,
    newPassword,
  });
  return response.data;
};
