"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "../context/ShopContext";
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, Check, Flame, Sparkles } from "lucide-react";

export const QuickViewModal: React.FC = () => {
  const router = useRouter();
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, formatPrice } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Default");

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    const added = addToCart(product, quantity, selectedSize, selectedColor);
    if (added) {
      setQuickViewProduct(null);
    }
  };

  const handleBuyNow = () => {
    setQuickViewProduct(null);
    router.push(
      `/checkout?productId=${encodeURIComponent(product.id)}&quantity=${quantity}&size=${encodeURIComponent(
        selectedSize
      )}&color=${encodeURIComponent(selectedColor)}`
    );
  };


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative w-full max-w-3xl transform overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800 text-left align-middle shadow-2xl transition-all animate-in zoom-in-95 duration-300">
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
            {/* Left Image Gallery */}
            <div className="md:col-span-6 relative">
              <div className="aspect-4/3 w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.discountPercentage && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-black text-xs font-extrabold rounded-xl shadow-md">
                  -{product.discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Right Details */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-indigo-950 border border-indigo-500/30 text-indigo-400 text-xs font-bold px-2.5 py-0.5 rounded-lg">
                    {product.category}
                  </span>
                  <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {product.rating} ({product.reviewsCount} reviews)
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {product.name}
                </h3>

                {product.activeViewers && (
                  <p className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 mt-1">
                    <Flame className="w-3 h-3 fill-amber-400" /> {product.activeViewers} people watching this item currently
                  </p>
                )}

                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl font-black text-emerald-400">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-zinc-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-3 border-t border-zinc-900">
                {/* Size Selector */}
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    Select Size
                  </label>
                  <div className="flex gap-2">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold border transition ${
                          selectedSize === size
                            ? "bg-amber-500 border-amber-400 text-black shadow-md"
                            : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity modifier */}
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    Quantity
                  </label>
                  <div className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 py-1 text-zinc-300 hover:text-white font-bold"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs font-bold min-w-[20px] text-center text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 py-1 text-zinc-300 hover:text-white font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="py-3 px-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-black" /> Add to Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3 px-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-black" /> Buy Now ({formatPrice(product.price * quantity)})
                  </button>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`/product/${product.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-bold text-xs rounded-xl border border-zinc-800 text-center transition"
                  >
                    View Full Product Page →
                  </a>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2.5 rounded-xl border transition ${
                      isWish
                        ? "bg-rose-500 text-white border-rose-400"
                        : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-rose-400"
                    }`}
                    title="Toggle Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWish ? "fill-white" : ""}`} />
                  </button>
                </div>
              </div>


              <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-2 border-t border-zinc-900">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Authentic Guarantee
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-indigo-400" /> Fast Express Shipping
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
