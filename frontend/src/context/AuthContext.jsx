import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("smart-food-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("smart-food-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("smart-food-user");
    }
  }, [user]);

  const login = async (values) => {
    const loggedUser = await loginUser(values);
    setUser(loggedUser);
    return loggedUser;
  };

  const register = async (values) => {
    const newUser = await registerUser(values);
    setUser(newUser);
    return newUser;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
