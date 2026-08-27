"use client";

import React, { useState } from "react";
import { RANDOM_PRODUCTS } from "../data/products";
import { Product } from "../types";
import { Shuffle, Star, ShoppingBag, Heart, Eye, Sparkles } from "lucide-react";
import { useShop } from "../context/ShopContext";
import toast from "react-hot-toast";

import Link from "next/link";
import { ProductCardMedia } from "./ProductCardMedia";

export const RandomProducts: React.FC = () => {
  const [productsList, setProductsList] = useState<Product[]>(RANDOM_PRODUCTS);
  const [isShuffling, setIsShuffling] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist, formatPrice } = useShop();

  const handleShuffle = () => {
    setIsShuffling(true);
    const shuffled = [...productsList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setTimeout(() => {
      setProductsList(shuffled);
      setIsShuffling(false);
      toast("Shuffled product recommendations!", { icon: "🔀" });
    }, 400);
  };

  return (
    <section id="random-products" className="w-full bg-zinc-950 py-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Endless Discovery
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Random Products & Recommendations
            </h2>
          </div>

          {/* Shuffle Action Button */}
          <button
            onClick={handleShuffle}
            disabled={isShuffling}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold text-xs rounded-2xl shadow-lg shadow-emerald-500/20 transition transform active:scale-95 disabled:opacity-50"
          >
            <Shuffle className={`w-4 h-4 ${isShuffling ? "animate-spin" : ""}`} />
            <span>Shuffle Items</span>
          </button>
        </div>

        {/* Products Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${
            isShuffling ? "opacity-30" : "opacity-100"
          }`}
        >
          {productsList.map((product) => {
            const isWish = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group relative bg-zinc-900/80 border border-zinc-800 rounded-3xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                {/* Image with Long-Press Quick View & Single Click Slug */}
                <ProductCardMedia product={product} aspectClass="aspect-4/3">
                  {/* Discount Badge */}
                  {product.discountPercentage && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-emerald-500 text-black text-[10px] font-extrabold shadow-md pointer-events-none">
                      -{product.discountPercentage}% OFF
                    </span>
                  )}

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
                        : "bg-black/50 text-zinc-300 border-white/10 hover:bg-black/80 hover:text-rose-400"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWish ? "fill-white" : ""}`} />
                  </button>
                </ProductCardMedia>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                      <span className="bg-zinc-800 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-zinc-500 font-normal">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <Link href={`/product/${product.id}`} className="block">
                      <h3 className="text-sm font-bold text-white hover:text-emerald-400 transition line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-emerald-400">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs text-zinc-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition transform hover:scale-105"
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
