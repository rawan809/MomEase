import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  refreshToken as refreshTokenApi,
  logoutUser as logoutApi,
} from "../../services/auth";

interface UserType {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  refreshToken: string | null;
  login: (data: { email: string; password: string }) => Promise<any>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: (data: {
    accessToken: string;
    refreshToken: string;
    user: UserType;
  }) => void;
  loginWithFacebook: (data: {
    accessToken: string;
    refreshToken: string;
    user: UserType;
  }) => void;
  isAuthenticated: boolean;
}

let isRefreshing = false;

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken"),
  );

  const [user, setUser] = useState<UserType | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!token;

  // Save auth data
  const saveAuthData = (
    newToken: string,
    newRefreshToken: string,
    userData: UserType,
  ) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(newToken);
    setRefreshToken(newRefreshToken);
    setUser(userData);
  };

  // Clear auth
  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  // Normalize user data
  const mapUserData = (data: any): UserType => ({
    userId: data.userId,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role,
  });

  // Login
  const login = async (data: { email: string; password: string }) => {
    const res = await loginUser({
      ...data,
      email: data.email.trim(),
    });

    const authData = res.data;
    const userData = mapUserData(authData);

    saveAuthData(authData.accessToken, authData.refreshToken, userData);

    return res;
  };

  // Register
  // const register = async (data: any) => {
  //   const res = await registerUser(data);

  //   const authData = res.data;
  //   const userData = mapUserData(authData);

  //   saveAuthData(authData.accessToken, authData.refreshToken, userData);
  // };
  const register = async (data: any) => {
    const cleanedData = {
      ...data,
      email: data.email?.trim(),
      firstName: data.firstName?.trim(),
      lastName: data.lastName?.trim(),
    };

    const res = await registerUser(cleanedData);

    const authData = res.data;
    const userData = mapUserData(authData);

    saveAuthData(authData.accessToken, authData.refreshToken, userData);
  };

  // Refresh token
  const refreshTokenHandler = async () => {
    if (isRefreshing) return;

    const storedRefresh = localStorage.getItem("refreshToken");
    if (!storedRefresh) return;

    isRefreshing = true;

    try {
      const res = await refreshTokenApi(storedRefresh);

      const authData = res.data;
      const userData = mapUserData(authData);

      saveAuthData(authData.accessToken, authData.refreshToken, userData);
    } catch (err: any) {
      console.log("refresh failed", err.response?.data);
      clearAuth();
    } finally {
      isRefreshing = false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      if (refreshToken) {
        await logoutApi(refreshToken);
      }
    } catch (error) {
      console.log(error);
    } finally {
      clearAuth();
    }
  };

  // Google login — stores tokens + user in context & localStorage
  const loginWithGoogle = (data: {
    accessToken: string;
    refreshToken: string;
    user: UserType;
  }) => {
    saveAuthData(data.accessToken, data.refreshToken, data.user);
  };

  const loginWithFacebook = (data: {
    accessToken: string;
    refreshToken: string;
    user: UserType;
  }) => {
    saveAuthData(data.accessToken, data.refreshToken, data.user);
  };

  // Token expiry helper
  const getTokenExpiry = (jwt: string) => {
    try {
      const payload = JSON.parse(atob(jwt.split(".")[1]));
      return payload.exp * 1000;
    } catch {
      return null;
    }
  };

  // On load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRefresh = localStorage.getItem("refreshToken");

    if (!storedToken && storedRefresh) {
      refreshTokenHandler();
      return;
    }

    if (storedToken) {
      const expiry = getTokenExpiry(storedToken);
      if (!expiry) return;

      const timeLeft = expiry - Date.now();

      if (timeLeft <= 60 * 1000) {
        refreshTokenHandler();
      }
    }
  }, []);

  // Auto refresh timer
  useEffect(() => {
    if (!token) return;

    const expiry = getTokenExpiry(token);
    if (!expiry) return;

    const timeout = expiry - Date.now() - 60 * 1000;

    if (timeout <= 0) {
      refreshTokenHandler();
      return;
    }

    const timer = setTimeout(() => {
      refreshTokenHandler();
    }, timeout);

    return () => clearTimeout(timer);
  }, [token]);

  // On tab return
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;

      const storedToken = localStorage.getItem("token");
      const storedRefresh = localStorage.getItem("refreshToken");

      if (!storedToken && storedRefresh) {
        refreshTokenHandler();
        return;
      }

      if (storedToken) {
        const expiry = getTokenExpiry(storedToken);
        if (!expiry) return;

        const timeLeft = expiry - Date.now();

        if (timeLeft <= 60 * 1000) {
          refreshTokenHandler();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        login,
        register,
        logout,
        loginWithGoogle,
        isAuthenticated,
        loginWithFacebook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
