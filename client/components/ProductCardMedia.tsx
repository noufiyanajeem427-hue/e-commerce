"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Product } from "../types";
import { useShop } from "../context/ShopContext";
import { useLongPress } from "../hooks/useLongPress";

interface ProductCardMediaProps {
  product: Product;
  aspectClass?: string;
  children?: React.ReactNode;
}

export const ProductCardMedia: React.FC<ProductCardMediaProps> = ({
  product,
  aspectClass = "aspect-4/3",
  children,
}) => {
  const router = useRouter();
  const { setQuickViewProduct } = useShop();

  const { isHolding, handlers } = useLongPress({
    onLongPress: () => {
      setQuickViewProduct(product);
    },
    onClick: () => {
      router.push(`/product/${product.id}`);
    },
    threshold: 450,
  });

  return (
    <div
      {...handlers}
      className={`relative w-full ${aspectClass} overflow-hidden bg-slate-950 cursor-pointer select-none group/media`}
      title="Click to view details • Press & hold for Quick View"
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 pointer-events-none ${
          isHolding ? "scale-95 brightness-110 filter" : ""
        }`}
        draggable={false}
      />

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-50 pointer-events-none" />

      {/* Holding visual feedback ring */}
      {isHolding && (
        <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-[2px] flex items-center justify-center pointer-events-none animate-in fade-in duration-200">
          <div className="px-3 py-1.5 rounded-full bg-black/80 border border-amber-400 text-amber-300 text-xs font-bold shadow-2xl animate-pulse">
            Quick Previewing...
          </div>
        </div>
      )}

      {/* Embedded badges / actions */}
      {children}
    </div>
  );
};
