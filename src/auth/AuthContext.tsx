import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = { name: string; email: string; role: "escultor" | "coleccionista" };

type AuthCtx = {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>({ user: null, login: () => {}, logout: () => {} });
const KEY = "ignia.auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);
  const login = (u: User) => {
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };
  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };
  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);
