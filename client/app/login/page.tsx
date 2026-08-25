"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  Crown,
  CheckCircle2,
  ArrowLeft,
  ShoppingBag,
  Star,
  Users,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Providers } from "../../components/Providers";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const { login, isAuthenticated, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, show status with quick jump to shop
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-[#090D16] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-amber-500 mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Already Signed In</h2>
            <p className="text-sm text-zinc-400 mt-1">
              You are currently authenticated as{" "}
              <span className="text-amber-400 font-semibold">{user.name}</span> ({user.email})
            </p>
          </div>
          <div className="p-4 bg-zinc-950/60 rounded-2xl border border-zinc-800 text-left flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-xl object-cover border border-zinc-700" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
              <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {user.tier}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push(redirectUrl)}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);
    if (success) {
      router.push(redirectUrl);
    }
  };


  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Top Simple Nav */}
      <header className="w-full border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-amber-400 bg-clip-text text-transparent">
                LUXE CART
              </span>
              <span className="text-[8px] font-bold tracking-widest text-indigo-400 -mt-1 uppercase">
                Artisanal Store
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition px-3 py-1.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
        </div>
      </header>

      {/* Main Dual-Column Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-zinc-900/70 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl">
          {/* Left Hero Perks Column (Hidden on small screens) */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-indigo-950/80 via-purple-950/50 to-zinc-950 p-8 flex-col justify-between relative border-r border-zinc-800/80">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <Crown className="w-3.5 h-3.5 text-amber-400" /> Luxe VIP Privilege
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-white leading-tight">
                  Welcome to the Pinnacle of Curated Luxury
                </h2>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Sign in to unlock tailored member discounts, express priority fulfillment, and early access to limited edition drops.
                </p>
              </div>

              {/* VIP Benefits List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Instant 20% First Order Coupon</h4>
                    <p className="text-[11px] text-zinc-400">Automatically credited upon signing in</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">256-Bit Encrypted Security</h4>
                    <p className="text-[11px] text-zinc-400">Zero-compromise checkout privacy</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Free Worldwide Express Delivery</h4>
                    <p className="text-[11px] text-zinc-400">On all qualifying member orders</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="relative z-10 pt-6 border-t border-zinc-800/80">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-[11px] text-zinc-300 italic">
                "Luxe Cart redefined high-end online retail for me. The customer care and prompt deliveries are truly bespoke."
              </p>
              <p className="text-[10px] font-bold text-zinc-400 mt-2">
                — Victoria Sterling, Verified Diamond Member
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-6">
              {/* Form Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Sign In to Luxe Cart
                </h1>
                <p className="text-xs text-zinc-400 mt-1.5">
                  Enter your email and password to manage your orders and wishlist.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alexander@luxecart.com"
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition"
                    />
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-zinc-300">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-[11px] text-amber-400 hover:text-amber-300 transition font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition"
                    />
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-zinc-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-amber-500 focus:ring-amber-400/30 accent-amber-500 cursor-pointer"
                    />
                    <span>Remember this device for 30 days</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs tracking-wide uppercase transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In to Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Link to Register */}
              <div className="pt-2 text-center text-xs text-zinc-400">
                Don't have a Luxe Cart account?{" "}
                <Link
                  href="/register"
                  className="font-bold text-amber-400 hover:text-amber-300 transition underline underline-offset-4"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer minimal info */}
      <footer className="w-full border-t border-zinc-900 py-4 px-6 text-center text-xs text-zinc-500">
        <p>© 2026 LUXE CART. All encrypted transactions protected by 256-Bit SSL.</p>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Providers>
      <Suspense fallback={<div className="min-h-screen bg-[#090D16] flex items-center justify-center text-white">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </Providers>
  );
}
