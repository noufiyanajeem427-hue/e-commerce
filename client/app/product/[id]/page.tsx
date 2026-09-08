"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Providers } from "../../../components/Providers";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { useShop } from "../../../context/ShopContext";
import { getProductByIdOrSlug, getAllProducts } from "../../../data/products";
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Flame,
  ChevronRight,
  Sparkles,
  Check,
  Eye,
  ArrowLeft,
  Share2,
  Lock,
} from "lucide-react";
import toast from "react-hot-toast";

interface PageProps {
  params: Promise<{ id: string }>;
}

function ProductDetailContent({ id }: { id: string }) {
  const router = useRouter();
  const product = getProductByIdOrSlug(id);
  const { addToCart, toggleWishlist, isInWishlist, formatPrice, setIsCartOpen } = useShop();

  const [selectedImage, setSelectedImage] = useState<string>(product?.image || "");
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0] || "Default");
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || "M");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "reviews">("overview");

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 mb-6 shadow-2xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Product Not Found</h1>
        <p className="text-zinc-400 max-w-md text-sm mb-6">
          The item you are looking for might have been removed or the link has expired.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg glow-gold transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>
    );
  }

  const isWish = isInWishlist(product.id);
  const allProducts = getAllProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    router.push(
      `/checkout?productId=${encodeURIComponent(product.id)}&quantity=${quantity}&size=${encodeURIComponent(
        selectedSize
      )}&color=${encodeURIComponent(selectedColor)}`
    );
  };


  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-amber-400 transition flex items-center gap-1">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
        <span className="text-zinc-300">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
        <span className="text-amber-400 font-semibold truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl group">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.badge && (
                <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 text-xs font-black shadow-lg">
                  {product.badge}
                </span>
              )}
              {product.discountPercentage && (
                <span className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black shadow-lg">
                  -{product.discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Wishlist & Share floating actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
                className={`p-3 rounded-2xl backdrop-blur-md border transition shadow-lg ${
                  isWish
                    ? "bg-rose-500/90 text-white border-rose-400 shadow-rose-500/30"
                    : "bg-black/60 text-zinc-300 border-white/10 hover:bg-black/80 hover:text-rose-400"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWish ? "fill-white" : ""}`} />
              </button>
              <button
                onClick={handleShare}
                aria-label="Share"
                className="p-3 rounded-2xl bg-black/60 text-zinc-300 border border-white/10 hover:bg-black/80 hover:text-amber-400 backdrop-blur-md transition shadow-lg"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Live active viewers counter pill */}
            {product.activeViewers && (
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto px-3.5 py-2 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-amber-500/30 flex items-center gap-2 text-xs text-amber-300 font-semibold shadow-xl">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
                <span>{product.activeViewers} shoppers viewing this live</span>
              </div>
            )}
          </div>

          {/* Additional thumbnails if available */}
          <div className="flex gap-3">
            {[product.image, product.image, product.image].slice(0, 3).map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${
                  selectedImage === img
                    ? "border-amber-400 ring-2 ring-amber-400/20"
                    : "border-zinc-800 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Information & Purchase Controls */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest rounded-xl">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-amber-400 text-sm font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-zinc-500 font-normal">
                  ({product.reviewsCount} verified reviews)
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Price Section */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-baseline gap-4">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                {formatPrice(product.price)}
              </span>
              <span className="text-lg text-zinc-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              {product.discountPercentage && (
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 rounded-lg">
                  Save {formatPrice(product.originalPrice - product.price)} (
                  {product.discountPercentage}% Off)
                </span>
              )}
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                  <span>Color Option</span>
                  <span className="text-zinc-200">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c)}
                      className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === c
                          ? "border-amber-400 scale-110 shadow-lg shadow-amber-400/20"
                          : "border-zinc-700 hover:border-zinc-500"
                      }`}
                      style={{ backgroundColor: c }}
                    >
                      {selectedColor === c && (
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                  <span>Select Size</span>
                  <span className="text-zinc-200">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedSize === s
                          ? "bg-amber-400 text-slate-950 font-black shadow-md glow-gold"
                          : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center transition"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center transition"
                  >
                    +
                  </button>
                </div>
                {product.inStock ? (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    In Stock (Ready to Ship)
                  </span>
                ) : (
                  <span className="text-xs text-rose-400 font-semibold">Out of Stock</span>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-2xl shadow-xl glow-gold flex items-center justify-center gap-2 transition transform hover:scale-[1.02]"
              >
                <ShoppingBag className="w-5 h-5 text-slate-950" /> Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 transition transform hover:scale-[1.02]"
              >
                <Sparkles className="w-5 h-5 text-slate-950" /> Buy Now
              </button>
            </div>

            {/* Trust and Guarantee Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-zinc-800/80 text-xs text-zinc-400">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/50">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Fast Express Delivery</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/50">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Authentic Item</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/50">
                <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Encrypted Safe Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Overview, Specs, Reviews */}
      <div className="mt-16 border-t border-zinc-800 pt-10">
        <div className="flex gap-4 border-b border-zinc-800/80 pb-4">
          {[
            { id: "overview", label: "Overview & Features" },
            { id: "specs", label: "Specifications" },
            { id: "reviews", label: `Reviews (${product.reviewsCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2 px-2 text-sm font-bold transition border-b-2 ${
                activeTab === tab.id
                  ? "text-amber-400 border-amber-400"
                  : "text-zinc-500 border-transparent hover:text-zinc-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === "overview" && (
            <div className="space-y-4 text-zinc-300 text-sm leading-relaxed max-w-3xl">
              <p>{product.description}</p>
              <p>
                Crafted with precision engineering and high-grade materials to deliver an ultra-premium
                experience. Backed by full brand warranty and hassle-free returns.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-zinc-400 pt-2">
                <li>Factory calibrated and inspected for peak durability</li>
                <li>Ergonomic, modern styling suited for everyday elegance</li>
                <li>Certified eco-friendly packaging and conscious logistics</li>
              </ul>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-2xl">
              <dl className="divide-y divide-zinc-800/80 text-sm">
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-zinc-500 font-medium">Category</dt>
                  <dd className="text-zinc-200 col-span-2">{product.category}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-zinc-500 font-medium">Model ID</dt>
                  <dd className="text-zinc-200 col-span-2">{product.id.toUpperCase()}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-zinc-500 font-medium">Delivery Speed</dt>
                  <dd className="text-zinc-200 col-span-2">
                    {product.deliveryEst || "2-4 Business Days"}
                  </dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-zinc-500 font-medium">Availability</dt>
                  <dd className="text-emerald-400 font-semibold col-span-2">In Stock</dd>
                </div>
              </dl>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-center pr-4 border-r border-zinc-800">
                  <div className="text-3xl font-black text-amber-400">{product.rating}</div>
                  <div className="text-xs text-zinc-500">out of 5</div>
                </div>
                <div className="text-xs text-zinc-400">
                  <p className="font-semibold text-white">Top Rated by Shoppers</p>
                  <p>Over 98% of customers recommended this product for quality and style.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h2 className="text-2xl font-black text-white mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/product/${rel.id}`}
                className="group glass-card rounded-2xl overflow-hidden border border-zinc-800/80 p-4 transition-all hover:border-amber-500/40 flex flex-col justify-between"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-zinc-950 mb-3">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white group-hover:text-amber-400 transition truncate">
                    {rel.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-black text-emerald-400">
                      {formatPrice(rel.price)}
                    </span>
                    <span className="text-[11px] text-zinc-500 line-through">
                      {formatPrice(rel.originalPrice)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);

  return (
    <Providers>
      <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
        <Header />
        <main className="flex-1">
          <ProductDetailContent id={resolvedParams.id} />
        </main>
        <Footer />
      </div>
    </Providers>
  );
}
