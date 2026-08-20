"use client";

import React, { useState } from "react";
import { Sparkles, ArrowUp, Mail, ShieldCheck, Truck, Headphones, Lock, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    toast.success("Thank you for subscribing! Check your inbox for $20 off coupon.");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-zinc-950 text-zinc-400 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
              <p className="text-xs text-zinc-400">On all orders above $50</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Authentic Products</h4>
              <p className="text-xs text-zinc-400">Directly sourced from brands</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Dedicated Support</h4>
              <p className="text-xs text-zinc-400">Live chat & phone helpline</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Secure Encrypted Checkout</h4>
              <p className="text-xs text-zinc-400">256-Bit SSL protection</p>
            </div>
          </div>
        </div>

        {/* Newsletter & Brand Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-amber-400 bg-clip-text text-transparent">
                LUXE CART
              </span>
            </a>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Your premier destination for high-performance smart electronics, luxury fashion apparel, modern home aesthetics, and organic beauty solutions.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-zinc-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational • Instant Delivery</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-5 bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/20 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Mail className="w-4 h-4" /> Subscribe & Get $20 Voucher
            </div>

            <h4 className="text-lg font-bold text-white">
              Stay ahead of new drops and exclusive member flash sales.
            </h4>

            {subscribed ? (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Subscribed successfully! Coupon code LUXE20 sent to your email.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs rounded-xl px-4 py-2.5 outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition shadow-lg shadow-amber-500/20"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Shopping Navigation
              </h5>
              <ul className="space-y-2">
                <li><a href="#hero-slider" className="hover:text-amber-400 transition">Featured Slides</a></li>
                <li><a href="#categories-section" className="hover:text-amber-400 transition">Categories</a></li>
                <li><a href="#highest-viewed" className="hover:text-amber-400 transition">Highest Viewed</a></li>
                <li><a href="#trending-section" className="hover:text-amber-400 transition">Trending Now</a></li>
                <li><a href="#category-boxes" className="hover:text-amber-400 transition">Curated Boxes</a></li>
                <li><a href="#discount-slider" className="hover:text-amber-400 transition">Flash Deals</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Help & Legal
              </h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-400 transition">Order Tracking</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Scroll to top */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 LUXE CART E-Commerce. All rights reserved.</p>

          {/* Payment Badges */}
          <div className="flex items-center gap-3 font-semibold text-[11px] text-zinc-400">
            <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">VISA</span>
            <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">Mastercard</span>
            <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">PayPal</span>
            <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">Apple Pay</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl border border-zinc-800 transition"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
