"use client";

import React from "react";
import { CATEGORY_BOXES } from "../data/products";
import { ArrowRight, Star, ShoppingBag, Heart, Eye, Layers } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const CategoryBoxes: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, formatPrice } = useShop();

  return (
    <section id="category-boxes" className="w-full bg-zinc-950 py-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" /> Curated Category Highlights
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Category Showcase (4 Products Each)
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-md">
            Specially organized category boxes featuring exactly 4 premier products inside each tailored collection block.
          </p>
        </div>

        {/* 4 Category Showcase Containers */}
        <div className="space-y-12">
          {CATEGORY_BOXES.map((box) => (
            <div
              key={box.id}
              className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl"
            >
              {/* Category Box Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-zinc-800 gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    {box.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">{box.subtitle}</p>
                </div>

                <a
                  href="#trending-section"
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl transition"
                >
                  Explore All Category Items
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 4-Product Grid Inside This Category Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {box.products.map((product) => {
                  const isWish = isInWishlist(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group bg-zinc-950/80 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Product Thumbnail Image */}
                      <div className="relative aspect-4/3 w-full bg-zinc-900 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-40" />

                        {/* Discount Badge */}
                        {product.discountPercentage && (
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-emerald-500 text-black text-[10px] font-extrabold shadow-md">
                            -{product.discountPercentage}% OFF
                          </span>
                        )}

                        {/* Wishlist Icon */}
                        <button
                          onClick={() => toggleWishlist(product)}
                          className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md border transition z-10 ${
                            isWish
                              ? "bg-rose-500/90 text-white border-rose-400 shadow-md"
                              : "bg-black/50 text-zinc-300 border-white/10 hover:bg-black/80 hover:text-rose-400"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWish ? "fill-white" : ""}`} />
                        </button>

                        {/* Quick View Button */}
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="absolute inset-x-3 bottom-2 py-1.5 bg-black/80 backdrop-blur-md text-white text-[11px] font-semibold rounded-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-1 hover:bg-white hover:text-black z-10"
                        >
                          <Eye className="w-3 h-3" /> Quick View
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                            <span className="text-[10px] font-medium text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-md">
                              {product.category}
                            </span>
                            <div className="flex items-center gap-1 text-amber-400 font-bold text-[10px]">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span>{product.rating}</span>
                            </div>
                          </div>

                          <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition line-clamp-1">
                            {product.name}
                          </h4>
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
