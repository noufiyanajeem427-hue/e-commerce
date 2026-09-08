"use client";

import React, { useState, useEffect } from "react";
import { FLASH_DEALS } from "../data/products";
import { Percent, Clock, ShoppingBag, ChevronLeft, ChevronRight, Copy, Check, Flame } from "lucide-react";
import { useShop } from "../context/ShopContext";
import toast from "react-hot-toast";
import Link from "next/link";
import { ProductCardMedia } from "./ProductCardMedia";

export const DiscountSlider: React.FC = () => {
  const [dealIndex, setDealIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const { addToCart, formatPrice } = useShop();

  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 24, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    toast.success(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const nextDeal = () => {
    setDealIndex((prev) => (prev + 1) % FLASH_DEALS.length);
  };

  const prevDeal = () => {
    setDealIndex((prev) => (prev - 1 + FLASH_DEALS.length) % FLASH_DEALS.length);
  };

  const activeDeal = FLASH_DEALS[dealIndex];
  const product = activeDeal.product;

  return (
    <section id="discount-slider" className="w-full bg-zinc-950 py-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-rose-950 via-purple-950 to-zinc-950 border border-rose-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header & Countdown */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-rose-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500 text-black flex items-center justify-center font-black shadow-lg shadow-rose-500/30">
                <Percent className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-rose-400" /> Limited Time Flash Discount
                </span>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Super Saver Deals Slider
                </h2>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-3 bg-zinc-900/90 border border-rose-500/30 px-4 py-2.5 rounded-2xl">
              <Clock className="w-4 h-4 text-rose-400 animate-spin-slow" />
              <span className="text-xs text-zinc-400 font-semibold uppercase">Ends In:</span>
              <div className="flex items-center gap-1.5 font-mono text-sm font-black text-white">
                <span className="bg-rose-500/20 text-rose-300 px-2 py-1 rounded-lg border border-rose-500/30">
                  {String(timeLeft.hours).padStart(2, "0")}h
                </span>
                <span>:</span>
                <span className="bg-rose-500/20 text-rose-300 px-2 py-1 rounded-lg border border-rose-500/30">
                  {String(timeLeft.minutes).padStart(2, "0")}m
                </span>
                <span>:</span>
                <span className="bg-rose-500/20 text-rose-300 px-2 py-1 rounded-lg border border-rose-500/30">
                  {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
              </div>
            </div>
          </div>

          {/* Deal Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-rose-500/30 shadow-2xl">
                <ProductCardMedia product={product} aspectClass="aspect-square">
                  <span className="absolute top-4 left-4 px-3 py-1 bg-rose-500 text-black font-extrabold text-xs rounded-xl shadow-lg pointer-events-none">
                    {activeDeal.discountBadge}
                  </span>
                </ProductCardMedia>
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-zinc-800 text-rose-400 text-xs font-bold border border-rose-500/30">
                  {product.category}
                </span>
                <span className="text-xs text-amber-400 font-bold">
                  ★ {product.rating} ({product.reviewsCount} customer reviews)
                </span>
              </div>

              <Link href={`/product/${product.id}`} className="block">
                <h3 className="text-2xl sm:text-3xl font-black text-white hover:text-rose-400 transition leading-tight">
                  {product.name}
                </h3>
              </Link>

              <p className="text-sm text-zinc-300 leading-relaxed max-w-xl">
                {product.description}
              </p>

              {/* Price Callout */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-emerald-400">
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg text-zinc-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                  Save {formatPrice(product.originalPrice - product.price)} TODAY
                </span>
              </div>

              {/* Stock Progress Bar */}
              <div className="space-y-2 max-w-md">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-300">
                    Stock Remaining: <strong className="text-amber-400">{product.stockLeft} items</strong>
                  </span>
                  <span className="text-rose-400 font-bold">{activeDeal.stockSoldPercent}% Claimed</span>
                </div>
                <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${activeDeal.stockSoldPercent}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons & Coupon */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => addToCart(product)}
                  className="px-6 py-3.5 bg-rose-500 hover:bg-rose-400 text-black font-extrabold text-sm rounded-2xl shadow-lg shadow-rose-500/30 flex items-center gap-2 transition transform hover:scale-105"
                >
                  <ShoppingBag className="w-4 h-4 text-black" /> Claim Deal Now
                </button>

                <Link
                  href={`/product/${product.id}`}
                  className="px-5 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm rounded-2xl border border-zinc-700 transition"
                >
                  View Details
                </Link>

                {/* Copy Coupon Pill */}
                <button
                  onClick={() => handleCopy("FLASH50")}
                  className="px-4 py-3 bg-zinc-900/90 border border-amber-500/30 hover:border-amber-400 text-amber-400 text-xs font-mono font-bold rounded-2xl flex items-center gap-2 transition"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>Use Coupon: FLASH50</span>
                </button>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-between pt-6 mt-8 border-t border-rose-500/20">
            <div className="flex items-center gap-2">
              {FLASH_DEALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setDealIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === dealIndex ? "w-8 bg-rose-500" : "w-2 bg-zinc-700"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevDeal}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextDeal}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
