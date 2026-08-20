"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Flame,
  Percent,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { HIGHEST_VIEWED_PRODUCTS, TRENDING_PRODUCTS, RANDOM_PRODUCTS } from "../data/products";
import { Product, Currency } from "../types";

export const Header: React.FC = () => {
  const { totalCartCount, totalCartPriceUSD, wishlist, setIsCartOpen, setQuickViewProduct, currency, setCurrency, formatPrice } = useShop();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const allProducts: Product[] = [
    ...HIGHEST_VIEWED_PRODUCTS,
    ...TRENDING_PRODUCTS,
    ...RANDOM_PRODUCTS,
  ];

  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950 text-white text-xs py-2 px-4 border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-amber-500 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
              <Flame className="w-3 h-3 fill-black" /> AUTUMN DROP
            </span>
            <span className="hidden sm:inline">Free Express Delivery on orders over $50</span>
            <span className="sm:hidden">Free Shipping &gt; $50</span>
            <span className="hidden md:inline-block text-amber-300 font-bold ml-2">
              Use Coupon: LUXE20 (20% Off)
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-300 text-[11px]">
            <span className="hidden md:flex items-center gap-1 hover:text-white transition cursor-pointer">
              <PhoneCall className="w-3 h-3 text-indigo-400" /> Support: +1 (800) 888-LUXE
            </span>
            <div className="flex items-center gap-2 border-l border-zinc-700 pl-3">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent text-zinc-200 font-bold outline-none cursor-pointer hover:text-amber-400 transition"
              >
                <option value="USD" className="bg-zinc-900 text-white">USD ($)</option>
                <option value="EUR" className="bg-zinc-900 text-white">EUR (€)</option>
                <option value="GBP" className="bg-zinc-900 text-white">GBP (£)</option>
                <option value="INR" className="bg-zinc-900 text-white">INR (₹)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3"
            : "bg-zinc-950 border-b border-zinc-800 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-amber-400 bg-clip-text text-transparent">
                LUXE CART
              </span>
              <span className="text-[9px] font-bold tracking-widest text-indigo-400 -mt-1 uppercase">
                Artisanal Store
              </span>
            </div>
          </a>

          {/* Search Bar with Autocomplete Dropdown */}
          <div ref={searchRef} className="relative flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search premium headphones, watches, apparel, decor..."
                className="w-full bg-zinc-900/90 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-xs rounded-2xl pl-10 pr-10 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Search Popup */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {searchQuery.trim() === "" ? (
                  <div className="p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      Popular Searches
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Noise Cancelling Headphones", "Italian Leather Sneakers", "OLED Smartwatch", "Nordic Lamp", "Cashmere Hoodie"].map(
                        (tag) => (
                          <button
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] rounded-lg border border-zinc-700/60 transition"
                          >
                            {tag}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="p-2 space-y-1">
                    <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Matching Products ({filteredProducts.length})
                    </p>
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setQuickViewProduct(product);
                          setIsSearchFocused(false);
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-zinc-800/80 rounded-xl cursor-pointer transition group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-zinc-700"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-zinc-100 group-hover:text-amber-400 transition truncate">
                            {product.name}
                          </p>
                          <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md">
                            {product.category}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-emerald-400">{formatPrice(product.price)}</p>
                          <p className="text-[10px] text-zinc-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-zinc-400 text-xs">
                    No products matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions (Wishlist, Cart) */}
          <div className="flex items-center gap-3">
            {/* Wishlist Button */}
            <a
              href="#highest-viewed"
              className="relative p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-rose-400 border border-zinc-800 transition group"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-lg shadow-rose-500/40 animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </a>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs shadow-lg shadow-amber-500/20 transition group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-black transition-transform group-hover:scale-110" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-black text-amber-400 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-amber-400">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] font-medium text-black/80 leading-none">Cart</span>
                <span className="text-xs font-extrabold text-black">{formatPrice(totalCartPriceUSD)}</span>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Secondary Category Navigation Bar */}
        <div className="hidden md:block border-t border-zinc-800/60 mt-3 pt-2.5 pb-0.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-medium text-zinc-300">
            <div className="flex items-center gap-8">
              <a
                href="#hero-slider"
                className="hover:text-amber-400 transition flex items-center gap-1.5 font-semibold text-amber-400"
              >
                <Sparkles className="w-3.5 h-3.5" /> Featured
              </a>
              <a href="#categories-section" className="hover:text-amber-400 transition">
                Categories
              </a>
              <a href="#highest-viewed" className="hover:text-amber-400 transition">
                Most Viewed 🔥
              </a>
              <a href="#trending-section" className="hover:text-amber-400 transition">
                Trending Now
              </a>
              <a href="#category-boxes" className="hover:text-amber-400 transition">
                Category Boxes (4x4)
              </a>
              <a href="#discount-slider" className="hover:text-amber-400 transition text-rose-400 font-semibold flex items-center gap-1">
                <Percent className="w-3.5 h-3.5" /> Flash Sales
              </a>
              <a href="#random-products" className="hover:text-amber-400 transition">
                Discover Random
              </a>
              <a href="#testimonials-section" className="hover:text-amber-400 transition text-zinc-300 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Buyer Reviews
              </a>
            </div>

            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
              <CheckCircle className="w-3.5 h-3.5" /> Verified Store
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
