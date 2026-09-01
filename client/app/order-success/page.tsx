"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useShop } from "../../context/ShopContext";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Providers } from "../../components/Providers";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  CreditCard,
  QrCode,
  Building2,
  Wallet,
  Banknote,
  Printer,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { orders, getOrderById, formatPrice } = useShop();

  const order = orderId ? getOrderById(orderId) : orders[0];

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 mb-6 shadow-2xl">
          <Package className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Order Not Found</h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8">
          We couldn't locate this order. Check your orders page or continue shopping.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl shadow-xl glow-gold transition"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "upi":
        return <QrCode className="w-4 h-4 text-emerald-400" />;
      case "card":
        return <CreditCard className="w-4 h-4 text-amber-400" />;
      case "netbanking":
        return <Building2 className="w-4 h-4 text-indigo-400" />;
      case "wallet":
        return <Wallet className="w-4 h-4 text-sky-400" />;
      case "cod":
        return <Banknote className="w-4 h-4 text-amber-300" />;
      default:
        return <CreditCard className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Celebratory Header */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 shadow-2xl shadow-emerald-500/20 animate-in zoom-in duration-500">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Payment Successful
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Thank You for Your Purchase!
          </h1>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto mt-1">
            Your payment has been authorized and your order is confirmed. A receipt has been sent to{" "}
            <span className="text-amber-400 font-semibold">{order.shippingAddress.email}</span>.
          </p>
        </div>

        {/* Action button bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-bold text-xs flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4" /> Download / Print Invoice
          </button>

          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg glow-gold transition"
          >
            <ShoppingBag className="w-4 h-4" /> Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Order Card */}
      <div className="glass-card rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl divide-y divide-zinc-800">
        {/* Order Meta Bar */}
        <div className="p-6 sm:p-7 bg-zinc-950/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-zinc-500 uppercase tracking-wider block font-bold text-[10px]">
              Order ID
            </span>
            <span className="font-mono font-black text-white text-sm">{order.id}</span>
          </div>

          <div>
            <span className="text-zinc-500 uppercase tracking-wider block font-bold text-[10px]">
              Date & Time
            </span>
            <span className="font-medium text-zinc-200">{order.orderDate}</span>
          </div>

          <div>
            <span className="text-zinc-500 uppercase tracking-wider block font-bold text-[10px]">
              Payment Mode
            </span>
            <span className="font-bold text-emerald-400 flex items-center gap-1.5 capitalize">
              {getPaymentIcon(order.paymentMethod)} {order.paymentMethod.toUpperCase()}
            </span>
          </div>

          <div>
            <span className="text-zinc-500 uppercase tracking-wider block font-bold text-[10px]">
              Estimated Delivery
            </span>
            <span className="font-bold text-amber-400">{order.estimatedDelivery}</span>
          </div>
        </div>

        {/* Live Delivery Progress Tracker */}
        <div className="p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" /> Package Delivery Status
            </h3>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
              Status: {order.orderStatus}
            </span>
          </div>

          <div className="relative pt-4 pb-2">
            {/* Progress line */}
            <div className="absolute top-7 left-6 right-6 h-1 bg-zinc-800 rounded-full">
              <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 w-1/4 rounded-full" />
            </div>

            {/* Tracker Steps */}
            <div className="relative flex justify-between text-center">
              {[
                { label: "Order Placed", done: true, active: true },
                { label: "Packed & Ready", done: false, active: false },
                { label: "Shipped via Air", done: false, active: false },
                { label: "Delivered", done: false, active: false },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 max-w-[80px]">
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-black z-10 transition ${
                      step.done
                        ? "bg-emerald-400 border-emerald-400 text-slate-950 shadow-md"
                        : "bg-zinc-900 border-zinc-700 text-zinc-500"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`text-[11px] font-semibold ${
                      step.active ? "text-amber-400" : "text-zinc-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ordered Items List */}
        <div className="p-6 sm:p-7 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-amber-400" /> Items in this Order ({order.items.length})
          </h3>

          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-zinc-800 bg-zinc-950"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{item.product.name}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Category: {item.product.category}{" "}
                      {item.selectedSize ? `• Size: ${item.selectedSize}` : ""}
                    </p>
                    <p className="text-[11px] text-zinc-500">Qty: {item.quantity}</p>
                  </div>
                </div>

                <div className="text-right font-mono font-extrabold text-sm text-emerald-400">
                  {formatPrice(item.priceAtPurchase * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address & Payment Summary Details */}
        <div className="p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-950/40">
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Delivery Address
            </h4>
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1 text-zinc-300">
              <p className="font-bold text-white text-sm">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.streetAddress}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}
              </p>
              <p className="pt-1 text-zinc-400 flex items-center gap-1">
                <Phone className="w-3 h-3 text-amber-400" /> {order.shippingAddress.phone}
              </p>
              <p className="text-zinc-400 flex items-center gap-1">
                <Mail className="w-3 h-3 text-amber-400" /> {order.shippingAddress.email}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Payment & Charges
            </h4>
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-zinc-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({order.couponApplied || "Promo"})</span>
                  <span className="font-mono">-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-mono text-emerald-400">
                  {order.shippingFee === 0 ? "FREE" : formatPrice(order.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-800 font-bold text-white text-sm">
                <span>Total Paid</span>
                <span className="font-mono text-emerald-400">{formatPrice(order.totalAmount)}</span>
              </div>
              <div className="pt-2 text-[10px] text-zinc-500 font-mono">
                Transaction ID: {order.paymentDetails.transactionId}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
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
            <OrderSuccessContent />
          </Suspense>
        </main>
        <Footer />
      </div>
    </Providers>
  );
}
