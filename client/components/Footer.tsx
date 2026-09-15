"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowUp,
  Mail,
  ShieldCheck,
  Truck,
  Headphones,
  Lock,
  CheckCircle2,
  X,
  FileText,
  Shield,
  Clock,
  HelpCircle,
} from "lucide-react";
import toast from "react-hot-toast";

type PolicyType = "shipping" | "privacy" | "terms" | null;

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    toast.success("Thank you for subscribing! Check your inbox for $20 off coupon.");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="w-full bg-zinc-950 text-zinc-400 border-t border-zinc-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Value Proposition Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
                <p className="text-xs text-zinc-400">On all orders above $50</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">100% Authentic Products</h4>
                <p className="text-xs text-zinc-400">Directly sourced from brands</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">24/7 Dedicated Support</h4>
                <p className="text-xs text-zinc-400">Live chat & phone helpline</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Secure Encrypted Checkout</h4>
                <p className="text-xs text-zinc-400">256-Bit SSL protection</p>
              </div>
            </div>
          </div>

          {/* Newsletter & Brand Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Brand Info */}
            <div className="lg:col-span-4 space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-amber-400 bg-clip-text text-transparent">
                  CARTIVA
                </span>
              </Link>

              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                Your premier destination for high-performance smart electronics, luxury fashion apparel, modern home aesthetics, and organic beauty solutions.
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-zinc-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational • Instant Delivery</span>
              </div>
            </div>

            {/* Newsletter Box */}
            <div className="lg:col-span-5 bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/20 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Mail className="w-4 h-4" /> Subscribe & Get $20 Voucher
              </div>

              <h4 className="text-lg font-bold text-white">
                Stay ahead of new drops and exclusive member flash sales.
              </h4>

              {subscribed ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Subscribed successfully! Coupon code CARTIVA20 sent to your email.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs rounded-xl px-4 py-2.5 outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
                  Shopping Navigation
                </h5>
                <ul className="space-y-2">
                  <li><Link href="/#hero-slider" className="hover:text-amber-400 transition">Featured Slides</Link></li>
                  <li><Link href="/#categories-section" className="hover:text-amber-400 transition">Categories</Link></li>
                  <li><Link href="/#highest-viewed" className="hover:text-amber-400 transition">Highest Viewed</Link></li>
                  <li><Link href="/#trending-section" className="hover:text-amber-400 transition">Trending Now</Link></li>
                  <li><Link href="/#category-boxes" className="hover:text-amber-400 transition">Curated Boxes</Link></li>
                  <li><Link href="/#discount-slider" className="hover:text-amber-400 transition">Flash Deals</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
                  Account & Help
                </h5>
                <ul className="space-y-2">
                  <li><Link href="/login" className="hover:text-amber-400 transition text-amber-400/90 font-semibold">Sign In to Account</Link></li>
                  <li><Link href="/become-seller" className="hover:text-amber-400 transition text-amber-300 font-semibold">💼 Become a Seller</Link></li>
                  <li><Link href="/register" className="hover:text-amber-400 transition text-indigo-400 font-semibold">Join VIP Membership</Link></li>
                  <li><Link href="/orders" className="hover:text-amber-400 transition">Order Tracking</Link></li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActivePolicy("shipping")}
                      className="hover:text-amber-400 transition text-left cursor-pointer"
                    >
                      Shipping Policy
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActivePolicy("privacy")}
                      className="hover:text-amber-400 transition text-left cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActivePolicy("terms")}
                      className="hover:text-amber-400 transition text-left cursor-pointer"
                    >
                      Terms of Service
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Rights & Scroll to top */}
          <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <p>© 2026 CARTIVA E-Commerce. All rights reserved.</p>

            {/* Payment Badges */}
            <div className="flex items-center gap-3 font-semibold text-[11px] text-zinc-400">
              <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">VISA</span>
              <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">Mastercard</span>
              <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">PayPal</span>
              <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">Apple Pay</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl border border-zinc-800 transition cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Policy Modal Dialog */}
      {activePolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  {activePolicy === "shipping" && <Truck className="w-5 h-5" />}
                  {activePolicy === "privacy" && <Shield className="w-5 h-5" />}
                  {activePolicy === "terms" && <FileText className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {activePolicy === "shipping" && "Shipping & Delivery Policy"}
                    {activePolicy === "privacy" && "Privacy & Data Protection Policy"}
                    {activePolicy === "terms" && "Terms & Conditions of Service"}
                  </h3>
                  <p className="text-xs text-zinc-400">Cartiva Luxury E-Commerce • Updated 2026</p>
                </div>
              </div>
              <button
                onClick={() => setActivePolicy(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto space-y-4 text-xs text-zinc-300 leading-relaxed pr-2">
              {activePolicy === "shipping" && (
                <>
                  <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-2">
                    <h4 className="font-bold text-amber-400 text-sm">🚚 Express Global Delivery</h4>
                    <p>
                      All orders above $50 qualify for complimentary Express Air Shipping. Standard delivery takes 2–4 business days, while priority express delivery arrives within 24–48 hours.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-white">Real-Time Dispatch Tracking</h5>
                    <p>
                      Once your order is processed and packaged, you receive an instantaneous unique tracking ID (e.g. ORD-XXXXXX-IN) accessible via your{" "}
                      <Link href="/orders" onClick={() => setActivePolicy(null)} className="text-amber-400 hover:underline">
                        Order History
                      </Link>{" "}
                      dashboard.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-white">Insured & Tamper-Proof Packaging</h5>
                    <p>
                      Every luxury shipment is sealed with holographic authenticity security bands and insured against transit damage or loss.
                    </p>
                  </div>
                </>
              )}

              {activePolicy === "privacy" && (
                <>
                  <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-2">
                    <h4 className="font-bold text-emerald-400 text-sm">🔒 256-Bit SSL Data Encryption</h4>
                    <p>
                      Cartiva respects your confidential shopping privacy. We do not sell, rent, or trade your personal profile data, purchase history, or contact details to any third-party advertisers.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-white">Zero Raw Card Storage</h5>
                    <p>
                      Payment credentials are processed via isolated 256-bit tokenized gateway simulators. No credit card CVVs or net banking passwords are stored on our servers.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-white">Your Data Sovereignty</h5>
                    <p>
                      You may export your complete order invoices in official PDF format or request account anonymization at any time.
                    </p>
                  </div>
                </>
              )}

              {activePolicy === "terms" && (
                <>
                  <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-2">
                    <h4 className="font-bold text-indigo-400 text-sm">📜 Premium Marketplace Terms</h4>
                    <p>
                      By accessing Cartiva, users agree to respectful community guidelines, authentic review submissions, and verified transaction fulfillment.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-white">30-Day Money-Back Guarantee</h5>
                    <p>
                      Items in original condition with tags intact can be returned within 30 days for an instant wallet credit or original payment method refund.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-white">Authentic Manufacturer Warranties</h5>
                    <p>
                      All electronics and curated accessories come with standard 1-year brand warranties and certified GST tax invoices.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-zinc-800 pt-4 mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setActivePolicy("shipping")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    activePolicy === "shipping"
                      ? "bg-amber-400/20 text-amber-400 border border-amber-400/40"
                      : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  Shipping
                </button>
                <button
                  onClick={() => setActivePolicy("privacy")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    activePolicy === "privacy"
                      ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/40"
                      : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  Privacy
                </button>
                <button
                  onClick={() => setActivePolicy("terms")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    activePolicy === "terms"
                      ? "bg-indigo-400/20 text-indigo-400 border border-indigo-400/40"
                      : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  Terms
                </button>
              </div>

              <button
                onClick={() => setActivePolicy(null)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

