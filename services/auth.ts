import api from "./instance";
import axios from "axios";

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
  const response = await api.post(`/Auth/register`, data);
  return response.data;
};
export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  const response = await api.post(`/Auth/login`, data);
  return response.data;
};

export const userData = async () => {
  const response = await api.get(`/Auth/me`);
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await axios.post("/api/Auth/refresh-token", {
    refreshToken,
  });

  return response.data;
};
export const revokeToken = async (refreshToken: string) => {
  const response = await api.post(`/Auth/revoke-token`, { refreshToken });
  return response.data;
};

export const logoutUser = async (refreshToken: string) => {
  const response = await api.post(`/Auth/logout`, { refreshToken });
  return response.data;
};

export const resendOtp = async (email: string) => {
  const response = await api.post(`/Auth/resend-otp`, {
    email,
  });
  return response.data;
};

export const verifyEmail = async (email: string, otpCode: string) => {
  const response = await api.post(`/Auth/verify-email`, {
    email,
    otpCode,
  });
  return response.data;
};
export const googleLogin = async (idToken: string) => {
  const response = await api.post(`/Auth/google-login`, {
    idToken: idToken,
  });

  return response.data;
};
export const facebookLogin = async (accessToken: string) => {
  const res = await api.post("/Auth/facebook", { accessToken });
  return res.data;
};

export const forgetPassword = async (email: string) => {
  const response = await api.post(`/Auth/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (
  email: string,
  otpCode: string,
  newPassword: string,
) => {
  const response = await api.post(`/Auth/reset-password`, {
    email,
    otpCode,
    newPassword,
  });
  return response.data;
};
