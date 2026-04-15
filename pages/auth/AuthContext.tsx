import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthUser {
  token: string | null;
  firstName: string | null;
  role: string | null;
  userId: string | null;
}

interface AuthContextType {
  user: AuthUser;
  setUserData: (data: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser>({
    token: localStorage.getItem("token"),
    firstName: localStorage.getItem("firstName"),
    role: localStorage.getItem("role"),
    userId: localStorage.getItem("userId"),
  });

  const setUserData = (data: AuthUser) => {
    localStorage.setItem("token", data.token || "");
    localStorage.setItem("firstName", data.firstName || "");
    localStorage.setItem("role", data.role || "");
    localStorage.setItem("userId", data.userId || "");
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser({ token: null, firstName: null, role: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ user, setUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
