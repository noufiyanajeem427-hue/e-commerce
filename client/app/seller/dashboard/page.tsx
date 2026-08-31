"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Store,
  PlusCircle,
  Package,
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  Star,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  LogOut,
  ShoppingBag,
  Clock,
  ShieldCheck,
  Tag,
  Search,
  Filter,
  Trash2,
  Edit,
  ExternalLink,
  Crown,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import { useShop } from "../../../context/ShopContext";
import { Providers } from "../../../components/Providers";

interface SellerProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  image: string;
  status: "Active" | "Draft";
}

const INITIAL_SELLER_PRODUCTS: SellerProduct[] = [
  {
    id: "sp_01",
    name: "Master & Dynamic MW75 Active Noise-Cancelling Headphones",
    category: "Smart Electronics",
    price: 599,
    stock: 24,
    sales: 18,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
    status: "Active",
  },
  {
    id: "sp_02",
    name: "Minimalist Matte Ceramic Planter Set (Set of 3)",
    category: "Modern Home & Decor",
    price: 89,
    stock: 45,
    sales: 32,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=80",
    status: "Active",
  },
  {
    id: "sp_03",
    name: "Handcrafted Vegetable-Tanned Italian Leather Wallet",
    category: "Luxury Fashion",
    price: 145,
    stock: 12,
    sales: 9,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=80",
    status: "Active",
  },
];

function SellerDashboardContent() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { formatPrice } = useShop();

  const [products, setProducts] = useState<SellerProduct[]>(INITIAL_SELLER_PRODUCTS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form states
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Smart Electronics");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("10");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "analytics" | "orders">("products");

  // If user is not authenticated or not a seller
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#090D16] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center space-y-6">
          <Store className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold">Seller Access Required</h2>
          <p className="text-xs text-zinc-400">Please sign in to view your seller dashboard.</p>
          <Link
            href="/login?redirect=/seller/dashboard"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl"
          >
            Sign In to Store
          </Link>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalRevenue = products.reduce((acc, p) => acc + p.price * p.sales, 0);
  const totalUnitsSold = products.reduce((acc, p) => acc + p.sales, 0);
  const storeName = user.sellerInfo?.storeName || `${user.name.split(" ")[0]}'s Luxury Boutique`;
  const storeCategory = user.sellerInfo?.storeCategory || "Premium Goods";

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice) return;

    const newProd: SellerProduct = {
      id: `sp_${Date.now()}`,
      name: newTitle.trim(),
      category: newCategory,
      price: parseFloat(newPrice),
      stock: parseInt(newStock) || 1,
      sales: 0,
      image: newImageUrl.trim() || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80",
      status: "Active",
    };

    setProducts([newProd, ...products]);
    setIsAddModalOpen(false);
    setNewTitle("");
    setNewPrice("");
    setNewStock("10");
    setNewImageUrl("");
    toast.success(`"${newProd.name}" listed successfully!`);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Listing removed from store");
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Seller Navigation */}
      <header className="w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-6 py-3.5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-emerald-400 bg-clip-text text-transparent">
                  SELLER PORTAL
                </span>
                <span className="text-[8px] font-extrabold tracking-widest text-emerald-400 -mt-1 uppercase">
                  Cartiva Verified Merchant
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-zinc-800 text-xs">
              <span className="text-zinc-400">Store:</span>
              <span className="font-bold text-white bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg">
                {storeName}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-extrabold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>Customer Storefront</span>
            </Link>

            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-lg object-cover border border-emerald-500/40"
              />
              <span className="text-xs font-bold text-white hidden sm:inline">
                {user.name.split(" ")[0]}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Welcome Merchant Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/70 via-zinc-900 to-indigo-950/60 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <Crown className="w-3.5 h-3.5 text-amber-400" /> Merchant Pro Active
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {storeName}
              </h1>
              <p className="text-xs text-zinc-300 max-w-lg">
                Category: <strong className="text-white">{storeCategory}</strong> • Payout Status: <span className="text-emerald-400 font-bold">Daily Direct Transfer Active</span>
              </p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition flex items-center justify-center gap-2 self-start md:self-auto"
            >
              <PlusCircle className="w-4 h-4" /> List New Product
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-semibold">Total Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-white">{formatPrice(totalRevenue)}</p>
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.4% this month
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-semibold">Units Sold</span>
              <Package className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-2xl font-black text-white">{totalUnitsSold} items</p>
            <p className="text-[11px] text-indigo-400 font-semibold">59 orders completed</p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-semibold">Storefront Views</span>
              <Eye className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-white">4,820</p>
            <p className="text-[11px] text-amber-400 font-semibold">142 views today</p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-semibold">Seller Rating</span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <p className="text-2xl font-black text-white">4.9 / 5.0</p>
            <p className="text-[11px] text-zinc-400">From 48 customer reviews</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === "products"
                ? "bg-zinc-800 text-white border border-zinc-700"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Package className="w-4 h-4" /> Products Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === "orders"
                ? "bg-zinc-800 text-white border border-zinc-700"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" /> Recent Customer Orders (3)
          </button>
        </div>

        {/* Products Table Section */}
        {activeTab === "products" && (
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between gap-4">
              <h3 className="text-sm font-bold text-white">Active Product Listings</h3>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Add Listing
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-950/70 text-zinc-400 uppercase tracking-wider text-[10px] border-b border-zinc-800">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Sales</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-zinc-800/40 transition">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-zinc-700 shrink-0"
                        />
                        <span className="font-semibold text-white truncate max-w-xs">{product.name}</span>
                      </td>
                      <td className="p-3.5 text-zinc-400">{product.category}</td>
                      <td className="p-3.5 font-bold text-emerald-400">{formatPrice(product.price)}</td>
                      <td className="p-3.5">{product.stock} in stock</td>
                      <td className="p-3.5">{product.sales} sold</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {product.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Recent Store Orders</h3>
            <div className="space-y-3">
              {[
                { id: "ORD-9402", item: "MW75 Headphones", buyer: "Liam Vance", date: "Today, 08:30 AM", amount: 599, status: "Processing" },
                { id: "ORD-9391", item: "Ceramic Planter Set", buyer: "Hannah Wells", date: "Yesterday", amount: 89, status: "Shipped" },
                { id: "ORD-9380", item: "Italian Leather Wallet", buyer: "Arthur Pendelton", date: "2 days ago", amount: 145, status: "Delivered" },
              ].map((order) => (
                <div key={order.id} className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono text-[11px] text-amber-400 font-bold">{order.id}</span>
                    <p className="font-semibold text-white">{order.item} • Buyer: {order.buyer}</p>
                    <p className="text-[10px] text-zinc-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-400">{formatPrice(order.amount)}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal: Add New Product */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-emerald-400" /> List a New Product
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-zinc-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-300">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Handmade Ceramic Tea Set..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-emerald-400 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-300">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-emerald-400 transition cursor-pointer"
                  >
                    <option value="Smart Electronics" className="bg-zinc-900">Smart Electronics</option>
                    <option value="Luxury Fashion" className="bg-zinc-900">Luxury Fashion</option>
                    <option value="Modern Home & Decor" className="bg-zinc-900">Modern Home & Decor</option>
                    <option value="Organic Beauty" className="bg-zinc-900">Organic Beauty</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-300">Price (USD $) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="129.00"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-emerald-400 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-300">Stock Quantity</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    placeholder="10"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-emerald-400 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-300">Image URL (Optional)</label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-emerald-400 transition"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 py-4 px-6 text-center text-xs text-zinc-500">
        <p>© 2026 CARTIVA Merchant Platform. All store assets and payouts encrypted.</p>
      </footer>
    </div>
  );
}

export default function SellerDashboardPage() {
  return (
    <Providers>
      <Suspense fallback={<div className="min-h-screen bg-[#090D16] flex items-center justify-center text-white">Loading Dashboard...</div>}>
        <SellerDashboardContent />
      </Suspense>
    </Providers>
  );
}
