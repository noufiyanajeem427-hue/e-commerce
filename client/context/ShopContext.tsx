"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { Product, CartItem, Currency, Order } from "../types";
import toast, { Toaster } from "react-hot-toast";

const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string }> = {
  USD: { rate: 1.0, symbol: "$" },
  EUR: { rate: 0.92, symbol: "€" },
  GBP: { rate: 0.78, symbol: "£" },
  INR: { rate: 84.5, symbol: "₹" },
};

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInUSD: number) => string;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => boolean;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => boolean;
  isInWishlist: (productId: string) => boolean;
  totalCartCount: number;
  totalCartPriceUSD: number;
  createOrder: (orderData: Omit<Order, "id" | "orderDate" | "orderStatus" | "estimatedDelivery">) => Order;
  getOrderById: (orderId: string) => Order | undefined;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currency, setCurrency] = useState<Currency>("INR");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("luxe_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("luxe_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem("luxe_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedCurrency = localStorage.getItem("luxe_currency") as Currency;
      if (savedCurrency && CURRENCY_RATES[savedCurrency]) {
        setCurrency(savedCurrency);
      } else {
        setCurrency("INR");
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage ONLY AFTER hydration is complete
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("luxe_cart", JSON.stringify(cart));
      localStorage.setItem("luxe_wishlist", JSON.stringify(wishlist));
      localStorage.setItem("luxe_orders", JSON.stringify(orders));
      localStorage.setItem("luxe_currency", currency);
    } catch (e) {
      console.error("Error saving state to localStorage", e);
    }
  }, [cart, wishlist, orders, currency, isHydrated]);

  const formatPrice = (amountInUSD: number): string => {
    const info = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = amountInUSD * info.rate;

    if (currency === "INR") {
      return `${info.symbol}${Math.round(converted).toLocaleString("en-IN")}`;
    }
    return `${info.symbol}${converted.toFixed(2)}`;
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    selectedColor?: string
  ): boolean => {
    if (!isAuthenticated) {
      toast.error("Please login to your account first to add items to cart!", {
        icon: "🔒",
        duration: 3500,
      });
      router.push("/login");
      return false;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedSize, selectedColor }];
      }
    });

    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-zinc-900 border border-emerald-500/30 text-white shadow-2xl rounded-2xl pointer-events-auto flex items-center p-4 gap-4`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-xl object-cover border border-zinc-700"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-emerald-400">Added to Cart</p>
            <p className="text-sm font-medium text-zinc-100 truncate">{product.name}</p>
            <p className="text-xs text-zinc-400">{formatPrice(product.price)}</p>
          </div>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              setIsCartOpen(true);
            }}
            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs rounded-xl transition"
          >
            View Cart
          </button>
        </div>
      ),
      { duration: 3000 }
    );
    return true;
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    toast.error("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (
    orderData: Omit<Order, "id" | "orderDate" | "orderStatus" | "estimatedDelivery">
  ): Order => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ORD-${randomDigits}-IN`;

    const now = new Date();
    const orderDate = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);
    const estimatedDelivery = estDate.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      orderDate,
      orderStatus: "Order Placed",
      estimatedDelivery,
    };

    // Update state
    setOrders((prev) => [newOrder, ...prev]);

    // Synchronously write to localStorage so navigating away never drops the order
    try {
      const savedRaw = localStorage.getItem("luxe_orders");
      const existingList: Order[] = savedRaw ? JSON.parse(savedRaw) : [];
      const updatedList = [newOrder, ...existingList.filter((o) => o.id !== newOrder.id)];
      localStorage.setItem("luxe_orders", JSON.stringify(updatedList));
    } catch (e) {
      console.error("Error writing new order to localStorage", e);
    }

    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    const foundInState = orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
    if (foundInState) return foundInState;

    try {
      const raw = localStorage.getItem("luxe_orders");
      if (raw) {
        const storedOrders: Order[] = JSON.parse(raw);
        return storedOrders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
      }
    } catch (e) {
      console.error("Error finding order in localStorage", e);
    }
    return undefined;
  };

  const toggleWishlist = (product: Product): boolean => {
    if (!isAuthenticated) {
      toast.error("Please login to your account first to save favorites!", {
        icon: "🔒",
        duration: 3500,
      });
      router.push("/login");
      return false;
    }

    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      toast("Removed from Wishlist", { icon: "💔" });
    } else {
      setWishlist((prev) => [...prev, product]);
      toast("Added to Wishlist!", { icon: "💖" });
    }
    return true;
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const totalCartPriceUSD = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        currency,
        setCurrency,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        totalCartCount,
        totalCartPriceUSD,
        createOrder,
        getOrderById,
      }}
    >
      <Toaster position="bottom-right" reverseOrder={false} />
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};

