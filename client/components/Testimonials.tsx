"use client";

import React from "react";
import { TESTIMONIALS } from "../data/products";
import { Star, CheckCircle, Quote, MessageSquare } from "lucide-react";

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials-section" className="w-full bg-zinc-950 py-14 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <MessageSquare className="w-3.5 h-3.5" /> Verified Customer Feedback
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What 45,000+ Happy Shoppers Say
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-md">
            Real reviews from verified buyers across India, UK, USA, and worldwide. 4.9/5 overall customer satisfaction score.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 relative flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-xl"
            >
              {/* Quote Mark */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-zinc-800/80 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* User Profile Footer */}
              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      {review.name}
                      {review.verified && (
                        <span title="Verified Buyer">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-zinc-400">{review.location}</p>
                  </div>
                </div>

                <span className="text-[10px] text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded-md">
                  {review.purchasedProduct}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
