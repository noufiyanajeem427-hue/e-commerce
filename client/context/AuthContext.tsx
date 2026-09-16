"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

import { authApi } from "../lib/api";

export interface SellerInfo {
  storeName: string;
  storeCategory: string;
  businessEmail: string;
  phone: string;
  address?: string;
  bankDetails?: string;
  joinedAsSellerDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "seller" | "admin";
  isSeller?: boolean;
  sellerInfo?: SellerInfo;
  tier: "Standard" | "Gold VIP" | "Diamond VIP" | "Seller Pro";
  joinedDate: string;
  ordersCount: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  demoLogin: (type: "admin" | "user") => void;
  updateProfile: (updatedData: Partial<User>) => void;
  becomeSeller: (sellerData: SellerInfo) => Promise<boolean>;
}

const DEMO_USERS: Record<"admin" | "user", User> = {
  admin: {
    id: "usr_adm_0001",
    name: "Elena Rostova (Admin)",
    email: "elena.admin@cartiva.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    role: "admin",
    tier: "Standard",
    joinedDate: "January 2024",
    ordersCount: 42,
  },
  user: {
    id: "usr_reg_9021",
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    role: "user",
    tier: "Standard",
    joinedDate: "February 2026",
    ordersCount: 3,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore stored session on mount & sync with backend
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem("luxe_auth_user");
        const storedToken = localStorage.getItem("luxe_auth_token") || localStorage.getItem("token");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        if (storedToken) {
          try {
            const res = await authApi.getMe();
            const backendUser = res.user || res.data;
            if (backendUser) {
              const mapped: User = {
                id: backendUser._id || backendUser.id || "usr_01",
                name: backendUser.name || "User",
                email: backendUser.email || "",
                avatar: backendUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(backendUser.email || "user")}`,
                role: backendUser.role || "user",
                isSeller: backendUser.role === "seller",
                tier: backendUser.role === "admin" ? "Standard" : "Gold VIP",
                joinedDate: "Member",
                ordersCount: 0,
              };
              setUser(mapped);
              localStorage.setItem("luxe_auth_user", JSON.stringify(mapped));
            }
          } catch (err) {
            // If backend is not running or token expired, keep local user
            console.warn("Backend auth verification notice:", err);
          }
        }
      } catch (err) {
        console.error("Failed to restore auth state", err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const saveUserSession = (userData: User | null, token?: string) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("luxe_auth_user", JSON.stringify(userData));
      if (token) {
        localStorage.setItem("luxe_auth_token", token);
        localStorage.setItem("token", token);
      }
    } else {
      localStorage.removeItem("luxe_auth_user");
      localStorage.removeItem("luxe_auth_token");
      localStorage.removeItem("token");
    }
  };

  const login = async (email: string, password = ""): Promise<boolean> => {
    setIsLoading(true);

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return false;
    }

    // First try backend API login
    try {
      const res = await authApi.login(email, password);
      const token = res.token || res.data?.token;
      const backendUser = res.user || res.data?.user || res.data;

      const loggedUser: User = {
        id: backendUser?._id || backendUser?.id || `usr_${Date.now()}`,
        name: backendUser?.name || email.split("@")[0],
        email: backendUser?.email || email.toLowerCase(),
        avatar: backendUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        role: backendUser?.role || (email.toLowerCase().includes("admin") ? "admin" : "user"),
        isSeller: backendUser?.role === "seller",
        tier: backendUser?.role === "admin" ? "Standard" : "Gold VIP",
        joinedDate: "Active",
        ordersCount: 0,
      };

      saveUserSession(loggedUser, token);
      setIsLoading(false);
      toast.success(`Welcome back, ${loggedUser.name}!`);
      return true;
    } catch (apiErr: any) {
      console.warn("Backend API login returned error, checking demo mode", apiErr);

      // Check Demo user accounts
      const isDemoAccount = [
        DEMO_USERS.admin.email,
        DEMO_USERS.user.email,
      ].includes(email.toLowerCase());

      if (isDemoAccount && password && password !== "password123") {
        toast.error("Incorrect password. Demo accounts use: password123");
        setIsLoading(false);
        return false;
      }

      if (isDemoAccount || !apiErr.response) {
        let loggedUser: User;
        if (email.toLowerCase().includes("admin")) {
          loggedUser = DEMO_USERS.admin;
        } else {
          const derivedName = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          loggedUser = {
            id: `usr_${Math.random().toString(36).substring(2, 9)}`,
            name: derivedName || "Valued Member",
            email: email.toLowerCase(),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
            role: "user",
            tier: "Standard",
            joinedDate: "Recently Joined",
            ordersCount: 0,
          };
        }

        saveUserSession(loggedUser);
        setIsLoading(false);
        toast.success(`Welcome back, ${loggedUser.name}!`);
        return true;
      }

      toast.error(apiErr.response?.data?.message || "Login failed. Please check your credentials.");
      setIsLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string, password = ""): Promise<boolean> => {
    setIsLoading(true);

    if (!name.trim()) {
      toast.error("Please enter your full name");
      setIsLoading(false);
      return false;
    }

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setIsLoading(false);
      return false;
    }

    try {
      const res = await authApi.register(name, email, password);
      const token = res.token || res.data?.token;
      const backendUser = res.user || res.data?.user || res.data;

      const newUser: User = {
        id: backendUser?._id || backendUser?.id || `usr_${Date.now()}`,
        name: name.trim(),
        email: email.toLowerCase(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        role: "user",
        tier: "Gold VIP",
        joinedDate: "Just now",
        ordersCount: 0,
      };

      saveUserSession(newUser, token);
      setIsLoading(false);
      toast.success(`Welcome to Cartiva, ${newUser.name}! Your account is active.`);
      return true;
    } catch (apiErr: any) {
      console.warn("Backend register error, fallback to local:", apiErr);
      if (apiErr.response?.data?.message) {
        toast.error(apiErr.response.data.message);
        setIsLoading(false);
        return false;
      }

      const newUser: User = {
        id: `usr_${Math.random().toString(36).substring(2, 9)}`,
        name: name.trim(),
        email: email.toLowerCase(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        role: "user",
        tier: "Gold VIP",
        joinedDate: "Just now",
        ordersCount: 0,
      };

      saveUserSession(newUser);
      setIsLoading(false);
      toast.success(`Welcome to Cartiva, ${newUser.name}! Your account is active.`);
      return true;
    }
  };

  const demoLogin = (type: "admin" | "user") => {
    const selectedUser = DEMO_USERS[type];
    saveUserSession(selectedUser);
    toast.success(`Logged in as ${selectedUser.name} (${selectedUser.tier})`);
  };

  const logout = () => {
    saveUserSession(null);
    toast("You have signed out of Cartiva", { icon: "👋" });
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    saveUserSession(updated);
    toast.success("Profile updated successfully!");
  };

  const becomeSeller = async (sellerData: SellerInfo): Promise<boolean> => {
    if (!user) {
      toast.error("Please sign in first to become a seller");
      return false;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulated processing delay

    const updatedUser: User = {
      ...user,
      role: "seller",
      isSeller: true,
      tier: "Seller Pro",
      sellerInfo: {
        ...sellerData,
        joinedAsSellerDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      },
    };

    saveUserSession(updatedUser);
    setIsLoading(false);
    toast.success(`🎉 Congratulations! Your store "${sellerData.storeName}" is now active!`, {
      duration: 5000,
    });
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        demoLogin,
        updateProfile,
        becomeSeller,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
