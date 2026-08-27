"use client";

import React, { useState } from "react";
import { TRENDING_PRODUCTS } from "../data/products";
import { Flame, Star, ShoppingBag, Heart, Eye } from "lucide-react";
import { useShop } from "../context/ShopContext";

import Link from "next/link";
import { ProductCardMedia } from "./ProductCardMedia";

const CATEGORY_TABS = ["All", "Electronics", "Fashion", "Home", "Beauty"];

export const TrendingProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const { addToCart, toggleWishlist, isInWishlist, formatPrice } = useShop();

  const filteredProducts =
    activeTab === "All"
      ? TRENDING_PRODUCTS
      : TRENDING_PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section id="trending-section" className="w-full bg-[#090D16] py-14 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-2">
              <Flame className="w-3.5 h-3.5 fill-amber-400" /> Hot Right Now
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Trending Products
            </h2>
          </div>

          {/* Interactive Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  activeTab === tab
                    ? "bg-amber-400 text-slate-950 glow-gold shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isWish = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group relative glass-card rounded-3xl overflow-hidden transition-all duration-500 shadow-xl flex flex-col justify-between"
              >
                {/* Image with Single Click -> Slug Page, Long Press -> Quick View */}
                <ProductCardMedia product={product} aspectClass="aspect-4/3">
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10 pointer-events-none">
                    {product.badge && (
                      <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 text-[11px] font-black shadow-md">
                        {product.badge}
                      </span>
                    )}
                    {product.discountPercentage && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500 text-slate-950 text-[10px] font-black">
                        -{product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className={`absolute top-3 right-3 p-2.5 rounded-2xl backdrop-blur-md border transition z-10 ${
                      isWish
                        ? "bg-rose-500/90 text-white border-rose-400 shadow-lg shadow-rose-500/30"
                        : "bg-black/50 text-slate-300 border-white/10 hover:bg-black/80 hover:text-rose-400"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWish ? "fill-white" : ""}`} />
                  </button>
                </ProductCardMedia>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                      <span className="bg-slate-800/80 border border-white/5 px-2.5 py-0.5 rounded-md text-[10px] font-semibold">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-slate-500 font-normal">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <Link href={`/product/${product.id}`} className="block">
                      <h3 className="text-base font-bold text-white hover:text-amber-400 transition line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Color swatches preview */}
                    {product.colors && (
                      <div className="flex items-center gap-1.5 mt-2.5">
                        <span className="text-[10px] text-slate-500 font-medium">Available:</span>
                        {product.colors.map((c, i) => (
                          <span
                            key={i}
                            className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-sm"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-emerald-400">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs text-slate-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg glow-gold flex items-center gap-1.5 transition transform hover:scale-105"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-slate-950" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
