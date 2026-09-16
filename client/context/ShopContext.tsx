"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { Product, CartItem, Currency, Order } from "../types";
import toast, { Toaster } from "react-hot-toast";
import { orderApi, productApi } from "../lib/api";

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
  liveProducts: Product[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInUSD: number) => string;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  addToCart: (
    product: Product,
    quantity?: number,
    selectedSize?: string,
    selectedColor?: string,
    redirectUrl?: string
  ) => boolean;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product, redirectUrl?: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  totalCartCount: number;
  totalCartPriceUSD: number;
  createOrder: (orderData: Omit<Order, "id" | "orderDate" | "orderStatus" | "estimatedDelivery">) => Promise<Order>;
  getOrderById: (orderId: string) => Order | undefined;
  refreshOrders: () => Promise<void>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [liveProducts, setLiveProducts] = useState<Product[]>([]);
  const [currency, setCurrency] = useState<Currency>("INR");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved state from localStorage on mount & fetch live products / orders
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

    // Fetch live products from backend
    productApi.getAll({ limit: 50 })
      .then((res) => {
        const rawProds = res.products || res.data || [];
        if (Array.isArray(rawProds) && rawProds.length > 0) {
          const mapped: Product[] = rawProds.map((p: any) => ({
            id: p._id || p.id,
            name: p.name,
            category: p.category?.name || p.category || "General",
            price: p.price || 0,
            originalPrice: p.originalPrice || (p.price ? p.price * 1.2 : 0),
            rating: p.ratings?.average || 4.8,
            reviewsCount: p.ratings?.count || 12,
            image: (p.images && p.images[0]?.url) || (p.images && typeof p.images[0] === "string" ? p.images[0] : "") || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
            description: p.description || "",
            inStock: (p.stock || 0) > 0,
            stockLeft: p.stock || 10,
            discountPercentage: p.discount || 0,
          }));
          setLiveProducts(mapped);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch live backend products:", err);
      });
  }, []);

  // Fetch backend orders when user is authenticated
  const refreshOrders = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await orderApi.getMyOrders();
      const backendOrders = res.orders || res.data || [];
      if (Array.isArray(backendOrders) && backendOrders.length > 0) {
        const mappedOrders: Order[] = backendOrders.map((o: any) => ({
          id: o._id || o.id,
          items: (o.items || []).map((it: any) => ({
            product: it.product ? {
              id: it.product._id || it.product.id || "item_01",
              name: it.product.name || "Product",
              category: "General",
              price: it.price || it.product.price || 0,
              originalPrice: (it.price || it.product.price || 0) * 1.2,
              rating: 5,
              reviewsCount: 1,
              image: (it.product.images && it.product.images[0]?.url) || (it.product.images && typeof it.product.images[0] === "string" ? it.product.images[0] : "") || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
              description: "",
              inStock: true
            } : {
              id: "item_01",
              name: "Product Item",
              category: "General",
              price: it.price || 0,
              originalPrice: (it.price || 0) * 1.2,
              rating: 5,
              reviewsCount: 1,
              image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
              description: "",
              inStock: true
            },
            quantity: it.quantity || 1,
            priceAtPurchase: it.price || 0
          })),
          subtotal: o.subtotal || 0,
          discount: o.discount || 0,
          shippingFee: o.shippingCost || 0,
          totalAmount: o.total || 0,
          currency: "INR",
          shippingAddress: {
            fullName: o.shippingAddress?.fullName || user?.name || "Customer",
            phone: o.shippingAddress?.phone || "",
            email: o.shippingAddress?.email || user?.email || "",
            streetAddress: o.shippingAddress?.streetAddress || o.shippingAddress?.street || "",
            city: o.shippingAddress?.city || "",
            state: o.shippingAddress?.state || "",
            pinCode: o.shippingAddress?.pinCode || "",
          },
          paymentMethod: (o.paymentMethod as any) || "upi",
          paymentDetails: {
            transactionId: `TXN-${o._id?.slice(-8) || "0000"}`,
            paymentStatus: "Completed"
          },
          orderStatus: (o.status ? o.status.charAt(0).toUpperCase() + o.status.slice(1) : "Order Placed") as any,
          orderDate: o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Today",
          estimatedDelivery: "3-5 Business Days"
        }));

        setOrders(mappedOrders);
        localStorage.setItem("luxe_orders", JSON.stringify(mappedOrders));
      }
    } catch (err) {
      console.warn("Could not sync backend orders:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshOrders();
    }
  }, [isAuthenticated]);

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
    selectedColor?: string,
    redirectUrl?: string
  ): boolean => {
    if (!isAuthenticated) {
      toast.error("Please login to your account first to add items to cart!", {
        icon: "🔒",
        duration: 3500,
      });
      const currentUrl = typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`
        : "/";
      const target = redirectUrl || currentUrl;
      router.push(`/login?redirect=${encodeURIComponent(target)}`);
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

  const createOrder = async (
    orderData: Omit<Order, "id" | "orderDate" | "orderStatus" | "estimatedDelivery">
  ): Promise<Order> => {
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

    let newOrder: Order = {
      ...orderData,
      id: orderId,
      orderDate,
      orderStatus: "Order Placed",
      estimatedDelivery,
    };

    // Try posting to backend API
    try {
      const payload = {
        items: orderData.items.map((it) => ({
          product: it.product.id,
          quantity: it.quantity,
          price: it.priceAtPurchase,
          variant: `${it.selectedSize || "M"}/${it.selectedColor || "Default"}`,
        })),
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        subtotal: orderData.subtotal,
        discount: orderData.discount,
        shippingCost: orderData.shippingFee,
        total: orderData.totalAmount,
      };

      const res = await orderApi.create(payload);
      const createdBackendOrder = res.order || res.data;
      if (createdBackendOrder?._id) {
        newOrder = {
          ...newOrder,
          id: createdBackendOrder._id,
        };
      }
    } catch (err) {
      console.warn("Could not save order directly to backend, saved to local cache:", err);
    }

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

  const toggleWishlist = (product: Product, redirectUrl?: string): boolean => {
    if (!isAuthenticated) {
      toast.error("Please login to your account first to save favorites!", {
        icon: "🔒",
        duration: 3500,
      });
      const currentUrl = typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`
        : "/";
      const target = redirectUrl || currentUrl;
      router.push(`/login?redirect=${encodeURIComponent(target)}`);
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
        liveProducts,
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
        refreshOrders,
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

