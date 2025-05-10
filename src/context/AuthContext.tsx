
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string) => {
    // Fixed credentials
    if (username === "admin" && password === "tatto") {
      setIsAuthenticated(true);
      localStorage.setItem("auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
