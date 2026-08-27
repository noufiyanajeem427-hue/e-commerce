"use client";

import React from "react";
import { HIGHEST_VIEWED_PRODUCTS } from "../data/products";
import { Eye, Star, ShoppingBag, Heart, Eye as ViewIcon, Flame } from "lucide-react";
import { useShop } from "../context/ShopContext";

import Link from "next/link";
import { ProductCardMedia } from "./ProductCardMedia";

export const HighestViewed: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, formatPrice } = useShop();

  return (
    <section id="highest-viewed" className="w-full bg-[#090D16] py-14 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-extrabold uppercase tracking-widest mb-2">
              <Eye className="w-3.5 h-3.5" /> High Engagement Picks
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Highest Viewed Products
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            Premier products experiencing maximum shopper engagement and real-time product views today.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIGHEST_VIEWED_PRODUCTS.map((product) => {
            const isWish = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group relative glass-card rounded-3xl overflow-hidden transition-all duration-500 shadow-xl flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Image Showcase with Long Press -> Quick View, Single Click -> Slug */}
                <ProductCardMedia product={product} aspectClass="aspect-4/3">
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                    {product.badge && (
                      <span className="px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-amber-400 text-[11px] font-bold border border-amber-400/30 shadow-lg flex items-center gap-1">
                        {product.badge}
                      </span>
                    )}
                    {product.discountPercentage && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500 text-slate-950 text-[10px] font-black shadow-md w-max">
                        -{product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Button */}
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

                {/* Info Content */}
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
                      <h3 className="text-sm font-bold text-white hover:text-amber-400 transition line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Social proof line */}
                    {product.activeViewers && (
                      <p className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 mt-1.5">
                        <Flame className="w-3 h-3 fill-amber-400" /> {product.activeViewers} shoppers viewing right now
                      </p>
                    )}
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-emerald-400">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs text-slate-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg glow-indigo flex items-center gap-1.5 transition transform hover:scale-105"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add
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
