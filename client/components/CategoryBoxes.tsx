"use client";

import React from "react";
import { CATEGORY_BOXES } from "../data/products";
import { ArrowRight, Star, ShoppingBag, Heart, Eye, Layers } from "lucide-react";
import { useShop } from "../context/ShopContext";

import Link from "next/link";
import { ProductCardMedia } from "./ProductCardMedia";

export const CategoryBoxes: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, formatPrice } = useShop();

  return (
    <section id="category-boxes" className="w-full bg-[#0B0F19] py-14 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-extrabold uppercase tracking-widest mb-2">
              <Layers className="w-3.5 h-3.5" /> Curated Collections
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Featured Category Hubs
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            Handpicked department collections grouped by luxury aesthetic, tech specs, and modern lifestyle.
          </p>
        </div>

        {/* Category Boxes: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORY_BOXES.map((box) => (
            <div
              key={box.id}
              className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between"
            >
              {/* Box Header Banner */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-lg font-black text-white tracking-tight">{box.title}</h3>
                  <p className="text-xs text-zinc-400 font-medium mt-0.5">{box.subtitle}</p>
                </div>
                <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  {box.products.length} Items
                </span>
              </div>

              {/* 4 Products 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3.5 flex-1">
                {box.products.map((product) => {
                  const isWish = isInWishlist(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group bg-zinc-950/80 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Product Thumbnail with Long Press Quick View & Single Click Slug */}
                      <ProductCardMedia product={product} aspectClass="aspect-4/3">
                        {/* Discount Badge */}
                        {product.discountPercentage && (
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-emerald-500 text-black text-[10px] font-extrabold shadow-md pointer-events-none">
                            -{product.discountPercentage}% OFF
                          </span>
                        )}

                        {/* Wishlist Icon */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          onTouchStart={(e) => e.stopPropagation()}
                          className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md border transition z-10 ${
                            isWish
                              ? "bg-rose-500/90 text-white border-rose-400 shadow-md"
                              : "bg-black/50 text-zinc-300 border-white/10 hover:bg-black/80 hover:text-rose-400"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWish ? "fill-white" : ""}`} />
                        </button>
                      </ProductCardMedia>

                      {/* Product Info */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                            <span className="text-[10px] font-medium text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-md">
                              {product.category}
                            </span>
                            <div className="flex items-center gap-1 text-amber-400 font-bold text-[10px]">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span>{product.rating}</span>
                            </div>
                          </div>

                          <Link href={`/product/${product.id}`} className="block">
                            <h4 className="text-xs font-bold text-white hover:text-amber-400 transition line-clamp-1">
                              {product.name}
                            </h4>
                          </Link>
                        </div>

                        {/* Price & Add Button */}
                        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-extrabold text-emerald-400">
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-[10px] text-zinc-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          </div>

                          <button
                            onClick={() => addToCart(product)}
                            className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition transform hover:scale-105"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
