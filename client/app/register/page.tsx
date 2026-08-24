"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  Gift,
  CheckCircle2,
  ArrowLeft,
  Check,
  Star,
  Sparkle,
  Truck,
  HeartHandshake,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Providers } from "../../components/Providers";

function RegisterForm() {
  const router = useRouter();
  const { register, demoLogin, isAuthenticated, user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [receiveOffers, setReceiveOffers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

    if (score === 1) return { score: 1, label: "Weak", color: "bg-rose-500", text: "text-rose-400" };
    if (score === 2) return { score: 2, label: "Fair", color: "bg-amber-500", text: "text-amber-400" };
    if (score === 3) return { score: 3, label: "Strong", color: "bg-indigo-500", text: "text-indigo-400" };
    return { score: 4, label: "Ultra Secure", color: "bg-emerald-500", text: "text-emerald-400" };
  };

  const strength = getPasswordStrength();

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-[#090D16] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-amber-500 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Account Active</h2>
            <p className="text-sm text-zinc-400 mt-1">
              You are signed in as <span className="text-amber-400 font-semibold">{user.name}</span>
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            Go to Store <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const handleFillDemo = () => {
    setName("Julian Hawthorne");
    setEmail("julian.hawthorne@example.com");
    setPassword("LuxePass2026!");
    setConfirmPassword("LuxePass2026!");
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setErrorMsg("Please accept the terms of service to continue");
      return;
    }

    setIsSubmitting(true);
    const success = await register(name, email, password);
    setIsSubmitting(false);

    if (success) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
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

      {/* Main Content Form */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-zinc-900/70 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl">
          {/* Left Column: Perks & Rewards */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-indigo-950/90 via-purple-950/60 to-zinc-950 p-8 flex-col justify-between relative border-r border-zinc-800/80">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Gift className="w-3.5 h-3.5 text-amber-400" /> New Member Welcome Pack
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-white leading-tight">
                  Join the Inner Circle of Luxury Curations
                </h2>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Create your account today and gain immediate access to our exclusive welcome benefits and VIP concierge features.
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <Sparkle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">20% Off Welcome Voucher</h4>
                    <p className="text-[11px] text-zinc-400">Coupon code LUXE20 activated</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Complimentary Express Shipping</h4>
                    <p className="text-[11px] text-zinc-400">Priority fulfillment on all orders</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Hassle-Free 30-Day Returns</h4>
                    <p className="text-[11px] text-zinc-400">Free pickup & instantaneous refunds</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust badge footer */}
            <div className="relative z-10 pt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified SSL Safe</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-white">4.9 / 5.0</span>
                <span className="text-[11px] text-zinc-500">(18.4k reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Register Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-5">
              {/* Heading */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    Create Your Account
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    Sign up in seconds and start enjoying bespoke privileges.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="px-2.5 py-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition"
                >
                  ⚡ Auto-Fill Demo
                </button>
              </div>

              {/* Error Box if any */}
              {errorMsg && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Julian Hawthorne"
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition"
                    />
                    <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. julian@example.com"
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition"
                    />
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Password & Strength Meter */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
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

                  {/* Dynamic Strength Bar */}
                  {password && (
                    <div className="pt-1.5 space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-zinc-400">Password Strength:</span>
                        <span className={`font-bold ${strength.text}`}>{strength.label}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 h-1.5">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`h-full rounded-full transition-all duration-300 ${
                              step <= strength.score ? strength.color : "bg-zinc-800"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition"
                    />
                    <CheckCircle2 className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-2 pt-1 text-xs text-zinc-400">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-amber-500 focus:ring-amber-400/30 accent-amber-500 cursor-pointer"
                    />
                    <span>
                      I agree to the{" "}
                      <span className="text-zinc-200 underline">Terms of Service</span> and{" "}
                      <span className="text-zinc-200 underline">Privacy Policy</span>.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={receiveOffers}
                      onChange={(e) => setReceiveOffers(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-amber-500 focus:ring-amber-400/30 accent-amber-500 cursor-pointer"
                    />
                    <span className="text-zinc-300">
                      Send me exclusive 20% discount coupon and secret flash sale alerts.
                    </span>
                  </label>
                </div>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs tracking-wide uppercase transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Link to Login */}
              <div className="pt-2 text-center text-xs text-zinc-400">
                Already have a Luxe Cart account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-amber-400 hover:text-amber-300 transition underline underline-offset-4"
                >
                  Sign In here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer minimal info */}
      <footer className="w-full border-t border-zinc-900 py-4 px-6 text-center text-xs text-zinc-500">
        <p>© 2026 LUXE CART. All rights reserved. Secure Encrypted Registration.</p>
      </footer>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Providers>
      <Suspense fallback={<div className="min-h-screen bg-[#090D16] flex items-center justify-center text-white">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </Providers>
  );
}
