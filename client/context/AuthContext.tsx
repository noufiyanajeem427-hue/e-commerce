"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin" | "vip";
  tier: "Standard" | "Gold VIP" | "Diamond VIP";
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
  demoLogin: (type: "vip" | "admin" | "user") => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const DEMO_USERS: Record<"vip" | "admin" | "user", User> = {
  vip: {
    id: "usr_vip_8841",
    name: "Alexander Wright",
    email: "alexander.vip@luxecart.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "vip",
    tier: "Diamond VIP",
    joinedDate: "October 2024",
    ordersCount: 14,
  },
  admin: {
    id: "usr_adm_0001",
    name: "Elena Rostova (Admin)",
    email: "elena.admin@luxecart.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    role: "admin",
    tier: "Diamond VIP",
    joinedDate: "January 2024",
    ordersCount: 42,
  },
  user: {
    id: "usr_reg_9021",
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    role: "user",
    tier: "Gold VIP",
    joinedDate: "February 2026",
    ordersCount: 3,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore stored session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("luxe_auth_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to restore auth state", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (userData: User | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("luxe_auth_user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("luxe_auth_user");
    }
  };

  const login = async (email: string, password = ""): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600)); // Smooth simulated delay

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return false;
    }

    if (password && password.length < 4) {
      toast.error("Password must be at least 4 characters long");
      setIsLoading(false);
      return false;
    }

    // Check if it matches a preset or derive a mock user
    let loggedUser: User;
    if (email.toLowerCase().includes("admin")) {
      loggedUser = DEMO_USERS.admin;
    } else if (email.toLowerCase().includes("alex") || email.toLowerCase().includes("vip")) {
      loggedUser = DEMO_USERS.vip;
    } else {
      const derivedName = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      loggedUser = {
        id: `usr_${Math.random().toString(36).substring(2, 9)}`,
        name: derivedName || "Valued Member",
        email: email.toLowerCase(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        role: "user",
        tier: "Gold VIP",
        joinedDate: "Recently Joined",
        ordersCount: 0,
      };
    }

    saveUserSession(loggedUser);
    setIsLoading(false);
    toast.success(`Welcome back, ${loggedUser.name}!`);
    return true;
  };

  const register = async (name: string, email: string, password = ""): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

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
    toast.success(`Welcome to Luxe Cart, ${newUser.name}! Your 20% discount is active.`);
    return true;
  };

  const demoLogin = (type: "vip" | "admin" | "user") => {
    const selectedUser = DEMO_USERS[type];
    saveUserSession(selectedUser);
    toast.success(`Logged in as ${selectedUser.name} (${selectedUser.tier})`);
  };

  const logout = () => {
    saveUserSession(null);
    toast("You have signed out of Luxe Cart", { icon: "👋" });
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    saveUserSession(updated);
    toast.success("Profile updated successfully!");
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
