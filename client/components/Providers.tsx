"use client";

import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { ShopProvider } from "../context/ShopContext";
import { CartDrawer } from "./CartDrawer";
import { QuickViewModal } from "./QuickViewModal";

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <ShopProvider>
        {children}
        <CartDrawer />
        <QuickViewModal />
      </ShopProvider>
    </AuthProvider>
  );
};

