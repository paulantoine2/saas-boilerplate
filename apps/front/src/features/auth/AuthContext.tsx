import React, { createContext, useState, ReactNode } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

function hasValidCookie(): boolean {
  const name = "adonis-session";
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) {
    const session = JSON.parse(decodeURIComponent(match[2]));
    if (session && new Date(session.expires) > new Date()) {
      return true;
    }
  }
  return false;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(hasValidCookie);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
