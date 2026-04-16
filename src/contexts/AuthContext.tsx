import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  refreshToken as refreshTokenApi,
  logoutUser as logoutApi,
} from "../../services/auth";

interface AuthContextType {
  user: any;
  token: string | null;
  refreshToken: string | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );
  const [user, setUser] = useState<any>(null);

  const isAuthenticated = !!token;

  //  Save tokens
  const saveTokens = (token: string, refreshToken: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    setToken(token);
    setRefreshToken(refreshToken);
  };

  //  Clear tokens
  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  //  Login
  const login = async (data: { email: string; password: string }) => {
    const res = await loginUser(data);

    saveTokens(res.token, res.refreshToken);
    setUser(res.user); 
  };

  //  Register
  const register = async (data: any) => {
    const res = await registerUser(data);

    saveTokens(res.token, res.refreshToken);
    setUser(res.user);
  };

  //  Refresh Token
  const refreshTokenHandler = async () => {
    if (!refreshToken) return;

    try {
      const res = await refreshTokenApi(refreshToken);
      saveTokens(res.token, res.refreshToken);
    } catch (err) {
      clearAuth();
    }
  };

  //  Logout
  const logout = async () => {
    if (refreshToken) {
      await logoutApi(refreshToken);
    }
    clearAuth();
  };

  //  Auto refresh on load
  useEffect(() => {
    if (!token && refreshToken) {
      refreshTokenHandler();
    }
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
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);