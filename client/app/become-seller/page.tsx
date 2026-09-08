"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Store,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Zap,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Package,
  Layers,
  Building2,
  CreditCard,
  Check,
  HelpCircle,
  Users,
  LogIn,
} from "lucide-react";
import { useAuth, SellerInfo } from "../../context/AuthContext";
import { Providers } from "../../components/Providers";

function BecomeSellerForm() {
  const router = useRouter();
  const { user, isAuthenticated, becomeSeller, isLoading } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Store profile
  const [storeName, setStoreName] = useState("");
  const [storeCategory, setStoreCategory] = useState("Smart Electronics");
  const [storeDescription, setStoreDescription] = useState("");

  // Step 2: Contact info
  const [businessEmail, setBusinessEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [taxId, setTaxId] = useState("");

  // Step 3: Payout info
  const [accountHolder, setAccountHolder] = useState(user?.name || "");
  const [bankDetails, setBankDetails] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Populate default user info if logged in
  React.useEffect(() => {
    if (user) {
      if (!businessEmail) setBusinessEmail(user.email);
      if (!accountHolder) setAccountHolder(user.name);
    }
  }, [user]);

  // If user is already a seller
  if (isAuthenticated && user?.isSeller) {
    return (
      <div className="min-h-screen bg-[#090D16] text-white flex flex-col justify-between">
        <header className="border-b border-zinc-800 bg-zinc-950/70 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-amber-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold tracking-tight bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
                CARTIVA
              </span>
            </Link>
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-zinc-900 border border-emerald-500/30 rounded-3xl p-8 text-center shadow-2xl shadow-emerald-500/10 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400">
              <Store className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Verified Seller Active
              </span>
              <h2 className="text-2xl font-black text-white mt-3">You are Already a Seller!</h2>
              <p className="text-xs text-zinc-400 mt-2">
                Store: <span className="text-white font-bold">{user.sellerInfo?.storeName || "Your Cartiva Store"}</span> ({user.sellerInfo?.storeCategory || "Merchant"})
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <Link
                href="/seller/dashboard"
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2"
              >
                <Store className="w-4 h-4" /> Open Seller Dashboard
              </Link>
              <Link
                href="/"
                className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-xl transition"
              >
                Continue Customer Shopping
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // If user is not logged in, prompt to log in first
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#090D16] text-white flex flex-col justify-between">
        <header className="border-b border-zinc-800 bg-zinc-950/70 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-amber-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold tracking-tight bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
                CARTIVA
              </span>
            </Link>
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 mx-auto flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
              <Briefcase className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">Sign In to Become a Seller</h2>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                Please sign in to your customer account first or create one to register your store and start selling on Cartiva.
              </p>
            </div>

            <div className="p-4 bg-zinc-950/70 rounded-2xl border border-zinc-800/80 text-left space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Zero listing fees for first 30 days</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Direct daily payout to your account</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Instant conversion from customer to seller</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/login?redirect=/become-seller"
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Sign In First
              </Link>
              <Link
                href="/register"
                className="flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition border border-zinc-700 flex items-center justify-center gap-2"
              >
                Create Account
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!storeName.trim()) return;
      setStep(2);
    } else if (step === 2) {
      if (!businessEmail.trim() || !phone.trim()) return;
      setStep(3);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;

    setIsSubmitting(true);
    const sellerData: SellerInfo = {
      storeName: storeName.trim(),
      storeCategory,
      businessEmail: businessEmail.trim(),
      phone: phone.trim(),
      address: address.trim(),
      bankDetails: bankDetails.trim() || "Account on file",
    };

    const success = await becomeSeller(sellerData);
    setIsSubmitting(false);

    if (success) {
      router.push("/seller/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="w-full border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-amber-400 bg-clip-text text-transparent">
                CARTIVA
              </span>
              <span className="text-[8px] font-bold tracking-widest text-amber-400 -mt-1 uppercase">
                Merchant Partner Network
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-300">
              <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
              <span>Customer: <strong className="text-white">{user.name}</strong></span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition px-3 py-1.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Hero Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Store className="w-3.5 h-3.5 text-amber-400" /> Start Selling Today
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Elevate Your Brand to Global Buyers
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Convert your customer account into a verified merchant storefront in just 2 minutes. Reach over 500,000 discerning luxury shoppers.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">85% Revenue Share</h3>
            <p className="text-xs text-zinc-400">Industry-leading payout rates with transparent low transaction fees.</p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Instant Storefront</h3>
            <p className="text-xs text-zinc-400">Add products right away with our intuitive seller dashboard and live analytics.</p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Verified Merchant Badge</h3>
            <p className="text-xs text-zinc-400">Boost buyer trust instantly with official Cartiva merchant verification.</p>
          </div>
        </div>

        {/* Multi-step Registration Box */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Steps Progress Indicator */}
          <div className="border-b border-zinc-800/80 bg-zinc-950/60 p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div
                onClick={() => step > 1 && setStep(1)}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border transition cursor-pointer ${
                  step === 1
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold"
                    : step > 1
                    ? "bg-zinc-800/80 border-zinc-700 text-emerald-400"
                    : "border-transparent text-zinc-500"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  step === 1 ? "bg-amber-500 text-black" : step > 1 ? "bg-emerald-500 text-black" : "bg-zinc-800 text-zinc-400"
                }`}>
                  {step > 1 ? <Check className="w-3.5 h-3.5" /> : "1"}
                </div>
                <span className="hidden sm:inline">Store Details</span>
              </div>

              <div
                onClick={() => step > 2 && setStep(2)}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border transition ${
                  step === 2
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold"
                    : step > 2
                    ? "bg-zinc-800/80 border-zinc-700 text-emerald-400 cursor-pointer"
                    : "border-transparent text-zinc-500"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  step === 2 ? "bg-amber-500 text-black" : step > 2 ? "bg-emerald-500 text-black" : "bg-zinc-800 text-zinc-400"
                }`}>
                  {step > 2 ? <Check className="w-3.5 h-3.5" /> : "2"}
                </div>
                <span className="hidden sm:inline">Business Info</span>
              </div>

              <div
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border transition ${
                  step === 3
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold"
                    : "border-transparent text-zinc-500"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  step === 3 ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                }`}>
                  3
                </div>
                <span className="hidden sm:inline">Payout & Terms</span>
              </div>
            </div>
          </div>

          {/* Form Step 1: Store Details */}
          {step === 1 && (
            <form onSubmit={handleNext} className="p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Step 1: Set Up Your Storefront</h3>
                <p className="text-xs text-zinc-400">Choose your store name and select what primary category you sell.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                    <span>Store / Brand Name *</span>
                    <span className="text-[10px] text-zinc-500">Visible to customers</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="e.g. Apex Artisans, Nordic Design Studio..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Primary Product Category *
                  </label>
                  <select
                    value={storeCategory}
                    onChange={(e) => setStoreCategory(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition cursor-pointer"
                  >
                    <option value="Smart Electronics" className="bg-zinc-900">Smart Electronics & Tech</option>
                    <option value="Luxury Fashion" className="bg-zinc-900">Luxury Fashion & Apparel</option>
                    <option value="Modern Home & Decor" className="bg-zinc-900">Modern Home & Living</option>
                    <option value="Organic Beauty" className="bg-zinc-900">Organic Beauty & Fragrances</option>
                    <option value="Fine Timepieces & Jewelry" className="bg-zinc-900">Fine Timepieces & Jewelry</option>
                    <option value="Artisanal Handcrafts" className="bg-zinc-900">Artisanal Handcrafts</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Store Bio / Short Description
                  </label>
                  <textarea
                    rows={3}
                    value={storeDescription}
                    onChange={(e) => setStoreDescription(e.target.value)}
                    placeholder="Tell buyers about your craftsmanship, quality standards, or brand mission..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={!storeName.trim()}
                  className="py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2 disabled:opacity-50"
                >
                  Continue to Business Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Form Step 2: Contact & Identity */}
          {step === 2 && (
            <form onSubmit={handleNext} className="p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Step 2: Business & Contact Information</h3>
                <p className="text-xs text-zinc-400">Used for customer inquiries, order dispatching, and seller verification.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      placeholder="e.g. orders@yourbrand.com"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Contact Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Dispatch Warehouse / Business Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, City, State/Province, Country"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                    <span>Tax ID / VAT / GSTIN (Optional)</span>
                    <span className="text-[10px] text-zinc-500">For automated tax invoices</span>
                  </label>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder="e.g. US-EIN-9281920 or GSTIN"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs rounded-xl transition flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={!businessEmail.trim() || !phone.trim()}
                  className="py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2 disabled:opacity-50"
                >
                  Continue to Payout Setup <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Form Step 3: Payout Details & Final Activation */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Step 3: Payout Preferences & Agreement</h3>
                <p className="text-xs text-zinc-400">Tell us where you want your product sales revenue transferred.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Beneficiary / Account Holder Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      placeholder="Full Name / Company Name"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Bank IBAN / Account / UPI ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={bankDetails}
                      onChange={(e) => setBankDetails(e.target.value)}
                      placeholder="e.g. Bank Account or PayPal / UPI ID"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition"
                    />
                  </div>
                </div>

                <div className="p-4 bg-zinc-950/70 border border-zinc-800 rounded-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-amber-500 focus:ring-amber-400/30 accent-amber-500 cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-xs text-zinc-300 cursor-pointer leading-relaxed">
                      I agree to the <strong className="text-amber-400">Cartiva Merchant Terms</strong>, authentic product guarantee policy, and 85% revenue disbursement protocol.
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs rounded-xl transition flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={!agreeTerms || isSubmitting}
                  className="py-3 px-8 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-black text-xs tracking-wide uppercase rounded-xl shadow-lg shadow-emerald-500/25 transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Store className="w-4 h-4" />
                      <span>Activate Seller Account</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 py-6 px-6 text-center text-xs text-zinc-500">
        <p>© 2026 CARTIVA Merchant Network. Encrypted 256-bit SSL transaction protection.</p>
      </footer>
    </div>
  );
}

export default function BecomeSellerPage() {
  return (
    <Providers>
      <Suspense fallback={<div className="min-h-screen bg-[#090D16] flex items-center justify-center text-white">Loading...</div>}>
        <BecomeSellerForm />
      </Suspense>
    </Providers>
  );
}
