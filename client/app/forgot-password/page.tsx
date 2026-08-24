"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import {
  Sparkles,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { Providers } from "../../components/Providers";
import toast from "react-hot-toast";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSent(true);
    toast.success("Password reset instructions sent!");
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
            href="/login"
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition px-3 py-1.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          {isSent ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Reset Email Sent</h2>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We've dispatched a secure password reset link to{" "}
                  <span className="text-amber-400 font-semibold">{email}</span>. Please check your inbox or spam folder.
                </p>
              </div>
              <div className="p-4 bg-zinc-950/60 rounded-2xl border border-zinc-800/80 text-xs text-zinc-400 text-left space-y-2">
                <div className="flex items-center gap-2 text-zinc-300 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-amber-400" /> Security Notice
                </div>
                <p>The reset link will remain active for 30 minutes. If you did not request this, please disregard the email.</p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wide transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  Return to Sign In <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <KeyRound className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Reset Your Password</h1>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  Enter the email address registered with your Luxe Cart account and we'll send you instructions to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Account Email</label>
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs tracking-wide uppercase transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 text-center text-xs text-zinc-400">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-bold text-amber-400 hover:text-amber-300 transition underline underline-offset-4"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer minimal info */}
      <footer className="w-full border-t border-zinc-900 py-4 px-6 text-center text-xs text-zinc-500">
        <p>© 2026 LUXE CART. Secure Account Recovery.</p>
      </footer>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Providers>
      <Suspense fallback={<div className="min-h-screen bg-[#090D16] flex items-center justify-center text-white">Loading...</div>}>
        <ForgotPasswordForm />
      </Suspense>
    </Providers>
  );
}
