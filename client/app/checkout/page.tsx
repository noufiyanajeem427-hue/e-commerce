"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useShop } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthContext";
import { getProductByIdOrSlug } from "../../data/products";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Providers } from "../../components/Providers";
import { PaymentMethod, ShippingAddress, OrderItem } from "../../types";
import {
  ShieldCheck,
  Truck,
  Lock,
  CreditCard,
  QrCode,
  Building2,
  Wallet,
  Banknote,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Tag,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  User as UserIcon,
  Check,
  Loader2,
  Copy,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, formatPrice, totalCartPriceUSD, clearCart, createOrder, currency } = useShop();
  const { user, isAuthenticated } = useAuth();

  // Direct product purchase query params
  const directProductId = searchParams.get("productId");
  const directQty = parseInt(searchParams.get("quantity") || "1", 10);
  const directSize = searchParams.get("size") || "M";
  const directColor = searchParams.get("color") || "Default";

  // Build items list
  const checkoutItems: OrderItem[] = useMemo(() => {
    if (directProductId) {
      const prod = getProductByIdOrSlug(directProductId);
      if (prod) {
        return [
          {
            product: prod,
            quantity: directQty,
            selectedSize: directSize,
            selectedColor: directColor,
            priceAtPurchase: prod.price,
          },
        ];
      }
    }
    return cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      priceAtPurchase: item.product.price,
    }));
  }, [directProductId, directQty, directSize, directColor, cart]);

  // Shipping Form State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user?.name || "",
    phone: "",
    email: user?.email || "",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
    deliveryNotes: "",
  });

  // Shipping speed
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");

  // Coupon State
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent?: number; flatDiscount?: number } | null>(null);

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");

  // UPI State
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>("gpay");
  const [customUpiId, setCustomUpiId] = useState("");
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  // Card State
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [saveCard, setSaveCard] = useState(true);

  // Net Banking State
  const [selectedBank, setSelectedBank] = useState("HDFC");

  // Wallet State
  const [selectedWallet, setSelectedWallet] = useState("paytm");

  // COD State
  const [captchaCode, setCaptchaCode] = useState("7482");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");

  // Populate user data if logged in
  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name,
        email: prev.email || user.email,
      }));
    }
  }, [user]);

  // Calculations
  const rawSubtotalUSD = useMemo(() => {
    return checkoutItems.reduce((acc, item) => acc + item.priceAtPurchase * item.quantity, 0);
  }, [checkoutItems]);

  const discountAmountUSD = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountPercent) {
      return (rawSubtotalUSD * appliedCoupon.discountPercent) / 100;
    }
    if (appliedCoupon.flatDiscount) {
      return Math.min(appliedCoupon.flatDiscount, rawSubtotalUSD);
    }
    return 0;
  }, [appliedCoupon, rawSubtotalUSD]);

  const shippingFeeUSD = useMemo(() => {
    if (appliedCoupon?.code === "FREESHIP") return 0;
    if (shippingMethod === "express") return 5.99;
    return rawSubtotalUSD >= 50 ? 0 : 4.99;
  }, [shippingMethod, rawSubtotalUSD, appliedCoupon]);

  const finalTotalUSD = Math.max(0, rawSubtotalUSD - discountAmountUSD + shippingFeeUSD);

  // Coupon handling
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (!clean) return;

    if (clean === "CARTIVA20" || clean === "PLANT20") {
      setAppliedCoupon({ code: clean, discountPercent: 20 });
      toast.success("Coupon applied! 20% discount active 🎉");
    } else if (clean === "FIRST10") {
      setAppliedCoupon({ code: clean, discountPercent: 10 });
      toast.success("Coupon applied! 10% discount active 🎉");
    } else if (clean === "FREESHIP") {
      setAppliedCoupon({ code: clean });
      toast.success("Coupon applied! Free shipping unlocked 🚀");
    } else {
      toast.error("Invalid coupon code. Try 'CARTIVA20' or 'FREESHIP'");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast("Coupon removed", { icon: "ℹ️" });
  };

  // Card formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 2) {
      raw = raw.slice(0, 2) + "/" + raw.slice(2);
    }
    setCardExpiry(raw);
  };

  const handleVerifyUpi = () => {
    if (customUpiId.includes("@") && customUpiId.length > 5) {
      setIsUpiVerified(true);
      toast.success("UPI ID Verified: Valid Virtual Payment Address");
    } else {
      toast.error("Please enter a valid UPI ID (e.g., username@okhdfcbank)");
    }
  };

  // Detect card brand
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s/g, "");
    if (clean.startsWith("4")) return "Visa";
    if (clean.startsWith("5")) return "MasterCard";
    if (clean.startsWith("60") || clean.startsWith("65") || clean.startsWith("81")) return "RuPay";
    if (clean.startsWith("34") || clean.startsWith("37")) return "Amex";
    return "Card";
  };

  // Payment Execution & Order Creation
  const handleCompleteOrder = async () => {
    // Validations
    if (!address.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!address.phone.trim() || address.phone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!address.streetAddress.trim()) {
      toast.error("Please enter your street delivery address");
      return;
    }
    if (!address.city.trim()) {
      toast.error("Please enter your city");
      return;
    }
    if (!address.pinCode.trim()) {
      toast.error("Please enter your PIN / Postal code");
      return;
    }

    if (checkoutItems.length === 0) {
      toast.error("Your checkout is empty. Please select products.");
      return;
    }

    // Payment validation
    if (paymentMethod === "upi" && !selectedUpiApp && !isUpiVerified && !customUpiId) {
      toast.error("Please select a UPI payment app or enter a valid UPI ID");
      return;
    }

    if (paymentMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16) {
        toast.error("Please enter a valid 16-digit card number");
        return;
      }
      if (!cardExpiry || cardExpiry.length < 5) {
        toast.error("Please enter valid card expiry (MM/YY)");
        return;
      }
      if (!cardCvv || cardCvv.length < 3) {
        toast.error("Please enter valid CVV");
        return;
      }
    }

    if (paymentMethod === "cod" && enteredCaptcha !== captchaCode) {
      toast.error("Security code mismatch! Please enter the 4-digit code shown.");
      return;
    }

    // Processing animation flow
    setIsProcessing(true);
    setProcessingStep("Connecting to 256-Bit SSL Payment Gateway...");
    await new Promise((r) => setTimeout(r, 800));

    if (paymentMethod === "upi") {
      setProcessingStep("Waiting for UPI token authorization...");
      await new Promise((r) => setTimeout(r, 1000));
    } else if (paymentMethod === "card") {
      setProcessingStep(`Verifying ${getCardBrand(cardNumber)} with 3D-Secure protocol...`);
      await new Promise((r) => setTimeout(r, 1100));
    } else if (paymentMethod === "netbanking") {
      setProcessingStep(`Establishing encrypted tunnel with ${selectedBank} Bank...`);
      await new Promise((r) => setTimeout(r, 900));
    } else if (paymentMethod === "wallet") {
      setProcessingStep(`Authorizing balance deduction from ${selectedWallet.toUpperCase()}...`);
      await new Promise((r) => setTimeout(r, 800));
    } else {
      setProcessingStep("Confirming Cash on Delivery booking...");
      await new Promise((r) => setTimeout(r, 700));
    }

    setProcessingStep("Payment Verified! Generating Tax Invoice & Tracking...");
    await new Promise((r) => setTimeout(r, 700));

    // Construct payment details
    const randomTxn = `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const paymentDetails = {
      upiId: paymentMethod === "upi" ? customUpiId || `${selectedUpiApp.toLowerCase()}@cartiva` : undefined,
      cardLast4: paymentMethod === "card" ? cardNumber.replace(/\s/g, "").slice(-4) : undefined,
      cardBrand: paymentMethod === "card" ? getCardBrand(cardNumber) : undefined,
      bankName: paymentMethod === "netbanking" ? selectedBank : undefined,
      walletProvider: paymentMethod === "wallet" ? selectedWallet : undefined,
      transactionId: randomTxn,
      paymentStatus: "Completed" as const,
    };

    // Save order
    const created = createOrder({
      items: checkoutItems,
      subtotal: rawSubtotalUSD,
      discount: discountAmountUSD,
      couponApplied: appliedCoupon?.code,
      shippingFee: shippingFeeUSD,
      totalAmount: finalTotalUSD,
      currency: currency,
      shippingAddress: address,
      paymentMethod,
      paymentDetails,
    });

    // If checkout was from cart, clear cart
    if (!directProductId) {
      clearCart();
    }

    setIsProcessing(false);
    toast.success("🎉 Payment successful! Order confirmed.", { duration: 4000 });
    router.push(`/order-success?orderId=${created.id}`);
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 mb-6 shadow-2xl">
          <Lock className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">No Items for Checkout</h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8">
          Your cart is currently empty or no product was selected. Add products to proceed with payment.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl shadow-xl glow-gold transition"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Checkout Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-amber-500/40 flex items-center justify-center mb-6 shadow-2xl shadow-amber-500/20 relative">
            <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
            <Sparkles className="w-5 h-5 text-emerald-400 absolute -top-2 -right-2 animate-bounce" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Processing Your Payment</h2>
          <p className="text-amber-400 font-semibold text-sm max-w-md animate-pulse">
            {processingStep}
          </p>
          <div className="flex items-center gap-2 mt-6 text-xs text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Do not refresh or close this window</span>
          </div>
        </div>
      )}

      {/* Breadcrumb & Title */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
          <Link href="/" className="hover:text-amber-400 transition">
            Store
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-amber-400 font-semibold">Secure Checkout & Payment</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Checkout & Payment</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Secure
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Complete your shipping address and select your preferred payment mode below.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column (7 cols): Address & Payment Selector */}
        <div className="lg:col-span-7 space-y-8">
          {/* STEP 1: Shipping Address */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                  1
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    Delivery & Shipping Address
                  </h2>
                  <p className="text-xs text-zinc-400">Where should we deliver your order?</p>
                </div>
              </div>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Express Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-amber-400" /> Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" /> Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" /> Email for Invoice & Tracking *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. name@example.com"
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Street Address / Flat / Society *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 402, Green Orchid Towers, SG Highway"
                  value={address.streetAddress}
                  onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ahmedabad / Mumbai"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">State *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gujarat / Maharashtra"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">PIN / Postal Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 380015"
                  value={address.pinCode}
                  onChange={(e) => setAddress({ ...address, pinCode: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">Landmark / Delivery Note</label>
                <input
                  type="text"
                  placeholder="e.g. Near City Center Mall"
                  value={address.deliveryNotes}
                  onChange={(e) => setAddress({ ...address, deliveryNotes: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition"
                />
              </div>
            </div>

            {/* Shipping Speed Selection */}
            <div className="pt-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2.5">
                Delivery Options
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setShippingMethod("standard")}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    shippingMethod === "standard"
                      ? "bg-amber-400/10 border-amber-400 text-white shadow-md"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        shippingMethod === "standard" ? "border-amber-400 bg-amber-400" : "border-zinc-600"
                      }`}
                    >
                      {shippingMethod === "standard" && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Standard Delivery</div>
                      <div className="text-[11px] text-zinc-400">3-5 Business Days</div>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-400">
                    {rawSubtotalUSD >= 50 ? "FREE" : formatPrice(4.99)}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod("express")}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    shippingMethod === "express"
                      ? "bg-amber-400/10 border-amber-400 text-white shadow-md"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        shippingMethod === "express" ? "border-amber-400 bg-amber-400" : "border-zinc-600"
                      }`}
                    >
                      {shippingMethod === "express" && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <Truck className="w-3 h-3 text-amber-400" /> Express Air Delivery
                      </div>
                      <div className="text-[11px] text-zinc-400">1-2 Business Days</div>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-400">{formatPrice(5.99)}</span>
                </label>
              </div>
            </div>
          </div>

          {/* STEP 2: Payment Method Options */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                  2
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">Select Payment Mode</h2>
                  <p className="text-xs text-zinc-400">Choose your preferred safe payment method</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> 100% Encrypted
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: "upi", label: "UPI & QR", icon: QrCode },
                { id: "card", label: "Card", icon: CreditCard },
                { id: "netbanking", label: "NetBanking", icon: Building2 },
                { id: "wallet", label: "Wallets", icon: Wallet },
                { id: "cod", label: "Cash (COD)", icon: Banknote },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = paymentMethod === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setPaymentMethod(tab.id as PaymentMethod)}
                    className={`py-3 px-2 rounded-2xl border transition flex flex-col items-center justify-center gap-1.5 text-xs font-bold ${
                      active
                        ? "bg-amber-400 text-slate-950 border-amber-400 shadow-lg glow-gold scale-[1.02]"
                        : "bg-zinc-900/70 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: UPI & QR CODE */}
            {paymentMethod === "upi" && (
              <div className="space-y-6 pt-2 animate-in fade-in duration-300">
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row items-center gap-6">
                  {/* Interactive QR Code Simulator */}
                  <div className="relative p-3 rounded-2xl bg-white text-black text-center shadow-xl shrink-0">
                    <div className="w-36 h-36 border-4 border-slate-900 rounded-xl p-1 flex flex-col items-center justify-center relative overflow-hidden bg-white">
                      {/* Stylized QR Matrix */}
                      <div className="grid grid-cols-6 gap-1 w-full h-full p-1 opacity-90">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-xs ${
                              [0, 1, 4, 5, 6, 7, 10, 11, 24, 25, 28, 29, 30, 31, 34, 35, 14, 21].includes(i)
                                ? "bg-slate-950"
                                : i % 3 === 0
                                ? "bg-emerald-600"
                                : "bg-transparent"
                            }`}
                          />
                        ))}
                      </div>
                      {/* Animated Scanner Laser Bar */}
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse shadow-md" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-900 mt-1.5">
                      Scan with any UPI App
                    </p>
                    <p className="text-[11px] font-mono font-bold text-emerald-700">
                      {formatPrice(finalTotalUSD)}
                    </p>
                  </div>

                  <div className="flex-1 space-y-3 text-center sm:text-left">
                    <h3 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" /> Instant UPI Payment
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Scan the QR code with Google Pay, PhonePe, Paytm, BHIM, or any banking UPI app for 0% extra fee.
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
                      {[
                        { id: "gpay", name: "Google Pay", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
                        { id: "phonepe", name: "PhonePe", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
                        { id: "paytm", name: "Paytm UPI", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
                        { id: "bhim", name: "BHIM / Any UPI", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
                      ].map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setSelectedUpiApp(app.id)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                            selectedUpiApp === app.id
                              ? "bg-amber-400 text-slate-950 border-amber-400 shadow-md"
                              : `${app.color} hover:bg-white/10`
                          }`}
                        >
                          {selectedUpiApp === app.id && <Check className="w-3 h-3" />}
                          {app.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Or enter UPI ID */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                    <span>Or Pay via UPI ID (VPA)</span>
                    <span className="text-[11px] text-zinc-400">e.g. mobile@upi, name@okhdfcbank</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter UPI ID (e.g. 9876543210@paytm)"
                      value={customUpiId}
                      onChange={(e) => {
                        setCustomUpiId(e.target.value);
                        setIsUpiVerified(false);
                      }}
                      className="flex-1 px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyUpi}
                      className={`px-5 py-3 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        isUpiVerified
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                      }`}
                    >
                      {isUpiVerified ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Verified
                        </>
                      ) : (
                        "Verify VPA"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CREDIT / DEBIT CARD */}
            {paymentMethod === "card" && (
              <div className="space-y-6 pt-2 animate-in fade-in duration-300">
                {/* 3D Animated Card Preview */}
                <div className="relative w-full max-w-sm mx-auto aspect-[1.58/1] rounded-3xl p-6 bg-gradient-to-tr from-slate-950 via-zinc-900 to-amber-950/40 border border-amber-500/30 text-white shadow-2xl shadow-amber-500/10 flex flex-col justify-between overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-7 rounded-md bg-amber-400/90 border border-amber-300 flex items-center justify-center">
                        <div className="w-5 h-4 border border-slate-950/50 rounded-xs grid grid-cols-2" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                        EMV Chip
                      </span>
                    </div>
                    <span className="font-extrabold text-sm tracking-wider uppercase text-amber-400">
                      {getCardBrand(cardNumber)}
                    </span>
                  </div>

                  <div className="space-y-1 relative z-10">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-400 block font-mono">
                      Card Number
                    </span>
                    <p className="font-mono text-lg sm:text-xl font-bold tracking-widest text-zinc-100">
                      {cardNumber || "•••• •••• •••• ••••"}
                    </p>
                  </div>

                  <div className="flex justify-between items-end relative z-10 text-xs">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-zinc-400 block font-mono">
                        Cardholder Name
                      </span>
                      <p className="font-bold uppercase tracking-wider text-zinc-200 truncate max-w-[170px]">
                        {cardHolder || address.fullName || "YOUR NAME"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-widest text-zinc-400 block font-mono">
                        Expires
                      </span>
                      <p className="font-mono font-bold text-zinc-200">{cardExpiry || "MM/YY"}</p>
                    </div>
                  </div>
                </div>

                {/* Card Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Card Number *</label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="4532 •••• •••• 8890"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Cardholder Name *</label>
                    <input
                      type="text"
                      placeholder="Name as printed on card"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">Expiry Date (MM/YY) *</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                      <span>CVV / CVC *</span>
                      <span className="text-[10px] text-zinc-400">3-4 digits on back</span>
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                      className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-amber-400 focus:ring-0"
                  />
                  <span>Securely save this card for faster future checkouts (PCI-DSS compliant)</span>
                </label>
              </div>
            )}

            {/* TAB 3: NET BANKING */}
            {paymentMethod === "netbanking" && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-300">
                <label className="text-xs font-bold text-zinc-300 block">Popular Indian Banks</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    "HDFC Bank",
                    "State Bank of India",
                    "ICICI Bank",
                    "Axis Bank",
                    "Kotak Mahindra",
                    "Punjab National Bank",
                  ].map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-3 rounded-xl border text-xs font-bold transition text-left flex items-center justify-between ${
                        selectedBank === bank
                          ? "bg-amber-400 text-slate-950 border-amber-400 shadow-md font-extrabold"
                          : "bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      <span className="truncate">{bank}</span>
                      {selectedBank === bank && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-zinc-400">All Other Supported Banks</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra">Kotak Mahindra Bank</option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                    <option value="IndusInd Bank">IndusInd Bank</option>
                    <option value="Yes Bank">Yes Bank</option>
                    <option value="Federal Bank">Federal Bank</option>
                    <option value="IDFC First Bank">IDFC First Bank</option>
                    <option value="Union Bank of India">Union Bank of India</option>
                  </select>
                </div>
              </div>
            )}

            {/* TAB 4: WALLETS & PAY LATER */}
            {paymentMethod === "wallet" && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-300">
                <label className="text-xs font-bold text-zinc-300 block">Select Digital Wallet / PayLater</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "paytm", name: "Paytm Wallet", badge: "Instant Cashback" },
                    { id: "amazonpay", name: "Amazon Pay Balance", badge: "Fast 1-Click" },
                    { id: "phonepe", name: "PhonePe Wallet", badge: "Zero Fee" },
                    { id: "simpl", name: "Simpl PayLater", badge: "Pay in 15 days" },
                    { id: "lazypay", name: "LazyPay Credit", badge: "Interest Free" },
                  ].map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setSelectedWallet(w.id)}
                      className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                        selectedWallet === w.id
                          ? "bg-amber-400 text-slate-950 border-amber-400 shadow-md font-extrabold"
                          : "bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{w.name}</div>
                        <div className={`text-[10px] ${selectedWallet === w.id ? "text-slate-900" : "text-zinc-400"}`}>
                          {w.badge}
                        </div>
                      </div>
                      {selectedWallet === w.id && <Check className="w-4 h-4 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: CASH ON DELIVERY */}
            {paymentMethod === "cod" && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-300">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-zinc-300 leading-relaxed">
                    <p className="font-bold text-amber-300">Cash on Delivery (Pay at Doorstep)</p>
                    <p className="mt-0.5">
                      Please keep exact cash ready at the time of delivery. Delivery partner accepts UPI payment at delivery as well.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-300">Anti-Spam Verification Code *</label>
                  <div className="flex items-center gap-3">
                    <div className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 font-mono text-lg font-black tracking-widest text-amber-400 line-through select-none">
                      {captchaCode}
                    </div>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="Enter code"
                      value={enteredCaptcha}
                      onChange={(e) => setEnteredCaptcha(e.target.value)}
                      className="w-36 px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm font-mono text-white text-center focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Order Summary & Final CTA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-zinc-800 sticky top-28 space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-white pb-3 border-b border-zinc-800 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
                {checkoutItems.length} {checkoutItems.length === 1 ? "item" : "items"}
              </span>
            </h2>

            {/* Item list */}
            <div className="max-h-64 overflow-y-auto space-y-3.5 pr-1">
              {checkoutItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 p-2.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-xl object-cover border border-zinc-800 shrink-0 bg-zinc-950"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                    <p className="text-[11px] text-zinc-400">
                      Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ""}
                    </p>
                    <p className="text-xs font-extrabold text-emerald-400">
                      {formatPrice(item.priceAtPurchase * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <div className="pt-2 border-t border-zinc-800/80 space-y-2">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" /> Apply Discount Coupon
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      Coupon <strong>{appliedCoupon.code}</strong> applied!
                    </span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs font-bold text-rose-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. CARTIVA20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs uppercase font-mono text-white focus:outline-none focus:border-amber-400 transition"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-xl transition shadow-md"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 pt-3 border-t border-zinc-800 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Items Subtotal</span>
                <span className="font-mono text-zinc-200">{formatPrice(rawSubtotalUSD)}</span>
              </div>

              {discountAmountUSD > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-{formatPrice(discountAmountUSD)}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-400">
                <span>Estimated Shipping</span>
                <span className="font-mono text-emerald-400">
                  {shippingFeeUSD === 0 ? "FREE" : formatPrice(shippingFeeUSD)}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-white pt-3 border-t border-zinc-800">
                <span>Total Amount Due</span>
                <span className="font-mono text-emerald-400 text-lg sm:text-xl">
                  {formatPrice(finalTotalUSD)}
                </span>
              </div>
            </div>

            {/* Big Action Button */}
            <button
              type="button"
              onClick={handleCompleteOrder}
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <Lock className="w-5 h-5 text-slate-950" />
              <span>
                {paymentMethod === "cod"
                  ? `Confirm Order (${formatPrice(finalTotalUSD)})`
                  : `Pay & Place Order (${formatPrice(finalTotalUSD)})`}
              </span>
            </button>

            {/* Safe badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-zinc-400">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-zinc-900/40 border border-zinc-800/40">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Buyer Protection</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-zinc-900/40 border border-zinc-800/40">
                <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Fast Insured Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Providers>
      <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
        <Header />
        <main className="flex-1">
          <Suspense
            fallback={
              <div className="min-h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
              </div>
            }
          >
            <CheckoutContent />
          </Suspense>
        </main>
        <Footer />
      </div>
    </Providers>
  );
}
