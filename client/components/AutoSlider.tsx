"use client";

import React, { useState, useEffect, useRef } from "react";
import { HERO_SLIDES } from "../data/products";
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, Tag, ShieldCheck, Truck, RefreshCw, Sparkles } from "lucide-react";

export const AutoSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section id="hero-slider" className="relative w-full overflow-hidden bg-[#090D16] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br ${currentSlide.bgGradient} transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.8)] min-h-[460px] sm:min-h-[520px] flex items-center`}
        >
          {/* Ambient Glow Orbs */}
          <div className="absolute -top-32 -right-32 w-[450px] h-[450px] bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Slide Content */}
          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-12 items-center">
            {/* Left Text Content */}
            <div className="lg:col-span-7 space-y-6 animate-in fade-in slide-in-from-left-6 duration-500">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest backdrop-blur-xl shadow-lg shimmer-badge">
                <Sparkles className="w-3.5 h-3.5" />
                {currentSlide.tag}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] font-sans">
                {currentSlide.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
                {currentSlide.subtitle}
              </p>

              {/* Discount Tag & CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl glow-gold flex items-center gap-2">
                  <Tag className="w-4 h-4 fill-slate-950" />
                  {currentSlide.discount}
                </div>

                <a
                  href="#trending-section"
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-xl glow-indigo flex items-center gap-2 transition transform hover:-translate-y-0.5"
                >
                  {currentSlide.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Trust Features Bar */}
              <div className="pt-6 flex flex-wrap items-center gap-6 text-slate-400 text-xs font-semibold border-t border-white/10">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 2-Year Official Warranty
                </span>
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-400" /> Free Express Dispatch
                </span>
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-amber-400" /> 30-Day Money Back Guarantee
                </span>
              </div>
            </div>

            {/* Right Graphic Card Showcase */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-white/15 group">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md text-slate-200 text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/10">
                  Featured Product Drop
                </span>
              </div>
            </div>
          </div>

          {/* Prev / Next Slide Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-950/60 hover:bg-slate-950/90 text-white border border-white/10 backdrop-blur-md transition z-20 hover:scale-105"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-950/60 hover:bg-slate-950/90 text-white border border-white/10 backdrop-blur-md transition z-20 hover:scale-105"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Indicators & Play/Pause */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? "w-8 bg-amber-400 glow-gold" : "w-2.5 bg-slate-600 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}

            <div className="w-px h-4 bg-slate-700 mx-1" />

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-slate-300 hover:text-white transition p-1"
              title={isPlaying ? "Pause Auto Slider" : "Play Auto Slider"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
