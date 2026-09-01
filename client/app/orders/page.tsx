"use client";

import React from "react";
import Link from "next/link";
import { useShop } from "../../context/ShopContext";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Providers } from "../../components/Providers";
import {
  Package,
  Truck,
  ArrowRight,
  ShoppingBag,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

function OrdersContent() {
  const { orders, formatPrice } = useShop();

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 mb-6 shadow-2xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">No Orders Yet</h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8">
          You haven't placed any orders yet. Discover our curated collection and place your first order.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl shadow-xl glow-gold transition"
        >
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
        <Link href="/" className="hover:text-amber-400 transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="text-amber-400 font-semibold">My Orders</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Order History & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            View all your past purchases, track live shipping status, and view receipts.
          </p>
        </div>
        <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
          {orders.length} {orders.length === 1 ? "Order Placed" : "Orders Placed"}
        </div>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="glass-card rounded-3xl border border-zinc-800 overflow-hidden divide-y divide-zinc-800 transition hover:border-zinc-700"
          >
            {/* Header info */}
            <div className="p-5 bg-zinc-950/70 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Order ID</span>
                  <span className="font-mono font-black text-white">{order.id}</span>
                </div>
                <div className="border-l border-zinc-800 pl-4">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Placed On</span>
                  <span className="text-zinc-200">{order.orderDate}</span>
                </div>
                <div className="border-l border-zinc-800 pl-4">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Total Paid</span>
                  <span className="font-mono font-extrabold text-emerald-400">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {order.orderStatus}
                </span>
                <Link
                  href={`/order-success?orderId=${order.id}`}
                  className="px-4 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-bold transition flex items-center gap-1"
                >
                  View Invoice <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Items */}
            <div className="p-5 space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover border border-zinc-800 bg-zinc-950 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{item.product.name}</h4>
                      <p className="text-[11px] text-zinc-400">
                        Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-xs text-zinc-200">
                    {formatPrice(item.priceAtPurchase * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer delivery est */}
            <div className="p-4 bg-zinc-950/30 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>
                  Estimated Delivery: <strong className="text-zinc-200">{order.estimatedDelivery}</strong>
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 font-mono">
                Payment: {order.paymentMethod.toUpperCase()} ({order.paymentDetails.transactionId})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Providers>
      <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
        <Header />
        <main className="flex-1">
          <OrdersContent />
        </main>
        <Footer />
      </div>
    </Providers>
  );
}
