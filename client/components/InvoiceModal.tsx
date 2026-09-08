"use client";

import React, { useState } from "react";
import { Order } from "../types";
import { InvoiceView } from "./InvoiceView";
import { downloadInvoicePdf } from "../lib/generateInvoicePdf";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  X,
  Download,
  Printer,
  ExternalLink,
  Loader2,
  FileCheck2,
  Share2,
} from "lucide-react";

interface InvoiceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen || !order) return null;

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      toast.loading("Generating high-resolution PDF invoice...", {
        id: "pdf-gen",
      });

      const success = await downloadInvoicePdf(
        `modal-invoice-${order.id}`,
        order.id,
        `Cartiva_Tax_Invoice_${order.id}.pdf`
      );

      if (success) {
        toast.success("PDF Invoice downloaded successfully!", {
          id: "pdf-gen",
          icon: "📄",
        });
      } else {
        toast.error("Failed to generate PDF. Please try printing to PDF.", {
          id: "pdf-gen",
        });
      }
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Error creating PDF invoice.", { id: "pdf-gen" });
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
      const url = `${window.location.origin}/invoice/${order.id}`;
      navigator.clipboard.writeText(url);
      toast.success("Invoice link copied to clipboard!", { icon: "🔗" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl my-auto bg-[#0f172a] rounded-3xl border border-zinc-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Top Control Bar */}
        <div className="px-5 py-4 bg-zinc-950 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white">Official Tax Invoice</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase">
                  Verified
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400">{order.id}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition disabled:opacity-50 cursor-pointer"
              title="Download official PDF copy"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>

            <button
              onClick={handleShare}
              className="hidden sm:flex px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-bold text-xs items-center gap-1.5 transition cursor-pointer"
              title="Copy invoice link"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>

            <Link
              href={`/invoice/${order.id}`}
              target="_blank"
              className="hidden md:flex px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-bold text-xs items-center gap-1.5 transition"
              title="Open full page invoice"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Full Page
            </Link>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition ml-1 cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable Invoice Content */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 bg-slate-950/70 flex justify-center">
          <div className="w-full max-w-[850px]">
            <InvoiceView order={order} id={`modal-invoice-${order.id}`} />
          </div>
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="px-6 py-3 bg-zinc-950/90 border-t border-zinc-800 text-[11px] text-zinc-400 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <span>
            Billed To: <strong className="text-zinc-200">{order.shippingAddress.fullName}</strong> ({order.shippingAddress.email})
          </span>
          <span className="font-mono text-emerald-400 font-bold">
            Total Amount: {order.currency} {order.totalAmount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
