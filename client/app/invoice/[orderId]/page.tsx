"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useShop } from "../../../context/ShopContext";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { Providers } from "../../../components/Providers";
import { InvoiceView } from "../../../components/InvoiceView";
import { downloadInvoicePdf } from "../../../lib/generateInvoicePdf";
import { Order } from "../../../types";
import toast from "react-hot-toast";
import {
  Download,
  Printer,
  Share2,
  ArrowLeft,
  ChevronRight,
  Package,
  Loader2,
  CheckCircle2,
  FileText,
} from "lucide-react";

interface InvoicePageProps {
  params: Promise<{ orderId: string }>;
}

function InvoiceDetailContent({ orderId }: { orderId: string }) {
  const { orders, getOrderById } = useShop();
  const [mounted, setMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [order, setOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    let found = getOrderById(orderId);
    if (!found) {
      try {
        const saved = localStorage.getItem("luxe_orders");
        if (saved) {
          const list: Order[] = JSON.parse(saved);
          found = list.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
        }
      } catch (e) {
        console.error("Error reading saved orders:", e);
      }
    }
    // If still not found, check orders array or fallback to most recent
    if (!found && orders.length > 0) {
      found = orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase()) || orders[0];
    }
    setOrder(found);
  }, [orderId, orders, getOrderById]);

  const handleDownloadPdf = async () => {
    if (!order) return;
    try {
      setIsDownloading(true);
      toast.loading("Generating high-resolution PDF invoice...", {
        id: "pdf-gen-page",
      });

      const success = await downloadInvoicePdf(
        `page-invoice-${order.id}`,
        order.id,
        `Cartiva_Tax_Invoice_${order.id}.pdf`
      );

      if (success) {
        toast.success("PDF Invoice downloaded successfully!", {
          id: "pdf-gen-page",
          icon: "📄",
        });
      } else {
        toast.error("Failed to generate PDF. Please use the Print button to save as PDF.", {
          id: "pdf-gen-page",
        });
      }
    } catch (err) {
      console.error("Error generating PDF:", err);
      toast.error("Error creating PDF.", { id: "pdf-gen-page" });
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Invoice URL copied to clipboard!", { icon: "🔗" });
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 mb-6 shadow-2xl">
          <FileText className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Invoice Not Found</h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8">
          We couldn't find an invoice with ID <code className="text-amber-400 font-mono">{orderId}</code>.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/orders"
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold rounded-2xl transition"
          >
            View All Orders
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl shadow-xl glow-gold transition"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Top Navigation & Controls Bar */}
      <div className="no-print space-y-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-zinc-400">
            <Link href="/" className="hover:text-amber-400 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <Link href="/orders" className="hover:text-amber-400 transition">
              My Orders
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-amber-400 font-semibold font-mono">Invoice #{order.id}</span>
          </nav>

          <Link
            href="/orders"
            className="text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Orders
          </Link>
        </div>

        {/* Action Header Card */}
        <div className="glass-card rounded-2xl p-5 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-[10px] uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Official Tax Document
              </span>
              <span className="text-xs text-zinc-400 font-mono">ID: {order.id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Tax Invoice & Bill of Sale</h1>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-xl glow-gold transition cursor-pointer disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Download PDF Invoice
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print Document
            </button>

            <button
              onClick={handleShare}
              className="px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              title="Copy invoice link"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Actual Printable Invoice Component */}
      <div className="flex justify-center pb-12">
        <InvoiceView order={order} id={`page-invoice-${order.id}`} />
      </div>
    </div>
  );
}

export default function InvoicePage({ params }: InvoicePageProps) {
  const resolvedParams = use(params);

  return (
    <Providers>
      <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
        <div className="no-print">
          <Header />
        </div>
        <main className="flex-1">
          <InvoiceDetailContent orderId={resolvedParams.orderId} />
        </main>
        <div className="no-print">
          <Footer />
        </div>
      </div>
    </Providers>
  );
}
