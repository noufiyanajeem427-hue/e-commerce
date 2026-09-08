"use client";

import React from "react";
import { CATEGORIES } from "../data/products";
import { ArrowUpRight, Laptop, Shirt, Home, Sparkles, Footprints, Watch } from "lucide-react";

const getIcon = (name: string) => {
  switch (name) {
    case "Laptop":
      return <Laptop className="w-5 h-5" />;
    case "Shirt":
      return <Shirt className="w-5 h-5" />;
    case "Home":
      return <Home className="w-5 h-5" />;
    case "Sparkles":
      return <Sparkles className="w-5 h-5" />;
    case "Footprints":
      return <Footprints className="w-5 h-5" />;
    case "Watch":
      return <Watch className="w-5 h-5" />;
    default:
      return <Sparkles className="w-5 h-5" />;
  }
};

export const Categories: React.FC = () => {
  return (
    <section id="categories-section" className="w-full bg-[#090D16] py-14 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-amber-400 uppercase">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
              Explore Store Categories
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            Handcrafted luxury items categorized into curated lifestyle collections designed for seamless browsing.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href="#trending-section"
              className="group relative rounded-3xl overflow-hidden glass-card p-5 flex flex-col justify-between transition-all duration-500 min-h-[230px]"
            >
              {/* Background Image Overlay */}
              <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/80 to-transparent" />
              </div>

              {/* Icon Pill */}
              <div className="relative z-10 flex items-center justify-between">
                <div
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-lg`}
                >
                  {getIcon(cat.iconName)}
                </div>
                <span className="p-2 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 group-hover:text-amber-400 group-hover:bg-slate-800 transition">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 mt-auto pt-4">
                <span className="text-[10px] font-extrabold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  {cat.itemCount} Items
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition leading-tight">
                  {cat.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
