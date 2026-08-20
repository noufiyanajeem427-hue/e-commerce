"use client";

import React from "react";
import { useShop } from "../context/ShopContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalCartPriceUSD, clearCart, formatPrice } =
    useShop();

  if (!isCartOpen) return null;

  const freeShippingThresholdUSD = 50;
  const freeShippingProgress = Math.min((totalCartPriceUSD / freeShippingThresholdUSD) * 100, 100);
  const remainingForFreeShippingUSD = Math.max(freeShippingThresholdUSD - totalCartPriceUSD, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-zinc-100 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Your Shopping Cart</h2>
              <span className="bg-zinc-800 text-zinc-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {cart.length} {cart.length === 1 ? "item" : "items"}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-zinc-900/80 border-b border-zinc-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              {remainingForFreeShippingUSD > 0 ? (
                <span className="text-zinc-300">
                  Add <strong className="text-amber-400">{formatPrice(remainingForFreeShippingUSD)}</strong> for Free Express Shipping
                </span>
              ) : (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> You unlocked Free Express Shipping!
                </span>
              )}
              <span className="font-mono text-zinc-400 text-[11px]">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl relative group hover:border-zinc-700 transition"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover border border-zinc-800 bg-zinc-950"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-zinc-500 hover:text-rose-400 transition p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Category: {item.product.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-extrabold text-emerald-400">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      {/* Quantity Modifier Buttons */}
                      <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-zinc-800 text-zinc-300 rounded-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold px-1 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-zinc-800 text-zinc-300 rounded-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-zinc-500 space-y-3">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="text-base font-bold text-zinc-300">Your cart is empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs">
                  Browse our high-viewed products or flash deals to add items to your cart.
                </p>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-800 bg-zinc-950 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-200">{formatPrice(totalCartPriceUSD)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Shipping</span>
                  <span className="font-mono text-emerald-400">
                    {totalCartPriceUSD >= freeShippingThresholdUSD ? "FREE" : formatPrice(4.99)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-900">
                  <span>Total Due</span>
                  <span className="font-mono text-emerald-400">
                    {formatPrice(totalCartPriceUSD + (totalCartPriceUSD >= freeShippingThresholdUSD ? 0 : 4.99))}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    alert("Proceeding to checkout with total: " + formatPrice(totalCartPriceUSD));
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-xs text-zinc-500 hover:text-rose-400 transition text-center"
                >
                  Clear Shopping Cart
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit SSL Encrypted & Guaranteed
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
