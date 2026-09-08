"use client";

import React from "react";
import { Order } from "../types";
import { useShop } from "../context/ShopContext";
import { numberToWords } from "../lib/numberToWords";
import {
  ShieldCheck,
  CheckCircle,
  Building,
  Mail,
  Phone,
  Globe,
  Sparkles,
  QrCode,
  Truck,
  CreditCard,
} from "lucide-react";

interface InvoiceViewProps {
  order: Order;
  id?: string;
  className?: string;
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({
  order,
  id = "printable-invoice",
  className = "",
}) => {
  const { formatPrice, currency } = useShop();

  const invoiceNumber = `INV-2026-${order.id.replace(/[^0-9]/g, "") || "948210"}`;
  const hsnCodes = ["61091000", "85176290", "42022290", "91021100", "33030010"];

  // Calculate tax breakdown (assuming 18% GST inclusive standard)
  const gstRate = 0.18;
  const taxableAmount = order.totalAmount / (1 + gstRate);
  const totalTax = order.totalAmount - taxableAmount;
  const cgst = totalTax / 2;
  const sgst = totalTax / 2;

  return (
    <div
      id={id}
      className={`bg-white text-slate-900 font-sans p-8 sm:p-12 max-w-[850px] mx-auto shadow-2xl rounded-2xl border border-slate-200 printable-invoice text-[12px] leading-relaxed relative ${className}`}
      style={{
        width: "100%",
        maxWidth: "850px",
        minHeight: "1120px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        color: "#0f172a",
      }}
    >
      {/* Top Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 rounded-t-2xl" />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-6 pt-2">
        {/* Company Logo & Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-amber-400 shadow-md">
              <span className="font-black text-xl tracking-tighter">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-950 tracking-wider">
                CARTIVA<span className="text-amber-500">.</span>
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 -mt-1">
                Luxury Lifestyle & Fashion
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-600 space-y-0.5 pt-1">
            <p className="font-bold text-slate-800">Cartiva Retail & Luxury Private Limited</p>
            <p>CIN: U52100MH2024PTC392810 | PAN: AABCC1234F</p>
            <p>GSTIN: <span className="font-mono font-semibold text-slate-800">27AABCC1234F1Z8</span></p>
            <p>Cartiva Tower, Level 14, High Street Tech Park, BKC, Mumbai - 400051</p>
            <div className="flex items-center gap-4 text-slate-500 pt-1 text-[10px]">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-amber-500" /> support@cartiva.com
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-amber-500" /> +91 1800-419-0123
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-amber-500" /> www.cartiva.com
              </span>
            </div>
          </div>
        </div>

        {/* Invoice Title & Status Badge */}
        <div className="text-right flex flex-col items-start sm:items-end justify-between self-stretch">
          <div className="space-y-1">
            <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-300 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-amber-800">
              Tax Invoice / Bill of Supply
            </div>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              (Original For Recipient)
            </p>
          </div>

          <div className="mt-4 sm:mt-0 text-left sm:text-right space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-700 font-extrabold text-[11px]">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> PAYMENT VERIFIED & PAID
            </div>
            <p className="text-[10px] text-slate-500">
              Invoice Generated: <span className="font-semibold text-slate-700">{order.orderDate}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Invoice Meta Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-slate-200 bg-slate-50/80 -mx-8 sm:-mx-12 px-8 sm:px-12 text-[11px]">
        <div>
          <span className="text-slate-500 uppercase font-bold text-[9px] tracking-wider block">
            Invoice Number
          </span>
          <span className="font-mono font-black text-slate-900">{invoiceNumber}</span>
        </div>
        <div>
          <span className="text-slate-500 uppercase font-bold text-[9px] tracking-wider block">
            Order Reference ID
          </span>
          <span className="font-mono font-black text-slate-900">{order.id}</span>
        </div>
        <div>
          <span className="text-slate-500 uppercase font-bold text-[9px] tracking-wider block">
            Payment Mode
          </span>
          <span className="font-bold text-slate-800 uppercase flex items-center gap-1">
            <CreditCard className="w-3 h-3 text-emerald-600" />
            {order.paymentMethod}
          </span>
        </div>
        <div>
          <span className="text-slate-500 uppercase font-bold text-[9px] tracking-wider block">
            Transaction ID
          </span>
          <span className="font-mono font-semibold text-slate-700 truncate block">
            {order.paymentDetails.transactionId}
          </span>
        </div>
      </div>

      {/* Billing & Shipping Address Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-slate-200 text-[11px]">
        {/* Bill To */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold uppercase tracking-wider text-[10px] text-slate-500">
              Billed To (Customer Details)
            </h3>
            <span className="text-[9px] font-bold text-slate-400">Place of Supply: {order.shippingAddress.state}</span>
          </div>
          <p className="font-extrabold text-slate-950 text-[13px]">{order.shippingAddress.fullName}</p>
          <p className="text-slate-600">{order.shippingAddress.streetAddress}</p>
          <p className="text-slate-600">
            {order.shippingAddress.city}, {order.shippingAddress.state} - <span className="font-semibold">{order.shippingAddress.pinCode}</span>
          </p>
          <p className="text-slate-600">
            <strong className="text-slate-700">Phone:</strong> {order.shippingAddress.phone}
          </p>
          <p className="text-slate-600">
            <strong className="text-slate-700">Email:</strong> {order.shippingAddress.email}
          </p>
        </div>

        {/* Ship To */}
        <div className="space-y-1.5 border-t sm:border-t-0 sm:border-l sm:border-slate-200 pt-4 sm:pt-0 sm:pl-8">
          <div className="flex items-center justify-between">
            <h3 className="font-bold uppercase tracking-wider text-[10px] text-slate-500">
              Shipped To (Delivery Destination)
            </h3>
            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Express Delivery
            </span>
          </div>
          <p className="font-extrabold text-slate-950 text-[13px]">{order.shippingAddress.fullName}</p>
          <p className="text-slate-600">{order.shippingAddress.streetAddress}</p>
          <p className="text-slate-600">
            {order.shippingAddress.city}, {order.shippingAddress.state} - <span className="font-semibold">{order.shippingAddress.pinCode}</span>
          </p>
          <p className="text-slate-600">
            <strong className="text-slate-700">Est. Delivery:</strong> {order.estimatedDelivery}
          </p>
          <p className="text-slate-600">
            <strong className="text-slate-700">Dispatch Hub:</strong> Cartiva Air Central Logistics, Mumbai
          </p>
        </div>
      </div>

      {/* Itemized Products Table */}
      <div className="py-6">
        <h3 className="font-bold uppercase tracking-wider text-[10px] text-slate-500 mb-3">
          Order Item Breakdown & Tax Classification
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-[10px] uppercase font-bold tracking-wider">
                <th className="p-2.5 rounded-l-lg w-8 text-center">#</th>
                <th className="p-2.5">Item Description & Specification</th>
                <th className="p-2.5 text-center">HSN/SAC</th>
                <th className="p-2.5 text-center">Qty</th>
                <th className="p-2.5 text-right">Unit Price</th>
                <th className="p-2.5 text-right">Tax (18%)</th>
                <th className="p-2.5 rounded-r-lg text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px]">
              {order.items.map((item, index) => {
                const itemTotal = item.priceAtPurchase * item.quantity;
                const itemTaxable = itemTotal / 1.18;
                const itemTax = itemTotal - itemTaxable;
                const hsn = hsnCodes[index % hsnCodes.length];

                return (
                  <tr key={index} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 text-center text-slate-500 font-bold">{index + 1}</td>
                    <td className="p-3">
                      <div className="font-extrabold text-slate-900">{item.product.name}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>Category: {item.product.category}</span>
                        {item.selectedSize && <span>• Size: <strong>{item.selectedSize}</strong></span>}
                        {item.selectedColor && <span>• Color: <strong>{item.selectedColor}</strong></span>}
                        <span>• SKU: CRT-{item.product.id}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center font-mono text-[10px] text-slate-600">{hsn}</td>
                    <td className="p-3 text-center font-bold text-slate-800">{item.quantity}</td>
                    <td className="p-3 text-right font-mono text-slate-700">
                      {formatPrice(item.priceAtPurchase)}
                    </td>
                    <td className="p-3 text-right font-mono text-slate-600 text-[10px]">
                      {formatPrice(itemTax)}
                    </td>
                    <td className="p-3 text-right font-mono font-extrabold text-slate-950">
                      {formatPrice(itemTotal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial Summary & Tax Computation */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-4 border-t border-slate-200">
        {/* Left column: Amount in words & Authentic Seal */}
        <div className="sm:col-span-7 space-y-4">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block">
              Total Amount in Words:
            </span>
            <p className="font-bold text-slate-800 text-[11px] italic">
              {numberToWords(order.totalAmount, currency)}
            </p>
          </div>

          <div className="p-3.5 border border-dashed border-slate-300 rounded-xl bg-slate-50/50 flex items-center gap-4">
            {/* Dynamic QR code representation */}
            <div className="w-16 h-16 bg-white border border-slate-300 rounded-lg p-1 flex flex-col items-center justify-center shrink-0 shadow-sm">
              <QrCode className="w-12 h-12 text-slate-800" />
              <span className="text-[7px] font-mono font-bold text-slate-500">SCAN VERIFY</span>
            </div>
            <div className="text-[10px] text-slate-600 space-y-0.5">
              <p className="font-bold text-slate-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Authenticity Guaranteed
              </p>
              <p>Scan QR code with any camera or banking app to verify tax registration and authenticity of this invoice.</p>
              <p className="font-mono text-[9px] text-slate-500">Security Hash: SHA256-CTVA-{order.id.slice(-6)}</p>
            </div>
          </div>

          {/* Tax Breakdown Table */}
          <div className="space-y-1 pt-1">
            <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">
              GST Tax Computation Breakdown (Included):
            </span>
            <div className="grid grid-cols-3 gap-2 text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[9px]">Taxable Amount</span>
                <span className="font-mono font-semibold">{formatPrice(taxableAmount)}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px]">CGST (9.0%)</span>
                <span className="font-mono font-semibold">{formatPrice(cgst)}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px]">SGST (9.0%)</span>
                <span className="font-mono font-semibold">{formatPrice(sgst)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Calculations & Grand Total */}
        <div className="sm:col-span-5 space-y-2 text-[11px]">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Gross Subtotal:</span>
              <span className="font-mono font-semibold text-slate-800">{formatPrice(order.subtotal)}</span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Coupon Discount ({order.couponApplied || "SPECIAL"}):</span>
                <span className="font-mono font-bold">-{formatPrice(order.discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Shipping & Logistics Fee:</span>
              <span className="font-mono font-bold text-emerald-700">
                {order.shippingFee === 0 ? "FREE (Standard)" : formatPrice(order.shippingFee)}
              </span>
            </div>

            <div className="flex justify-between text-slate-600 border-t border-slate-200 pt-2 text-[10px]">
              <span>Estimated Tax (18% GST Incl.):</span>
              <span className="font-mono font-semibold text-slate-700">{formatPrice(totalTax)}</span>
            </div>

            {/* Prominent Grand Total Box */}
            <div className="border-t-2 border-slate-900 pt-2.5 mt-2 flex justify-between items-center">
              <div>
                <span className="text-[12px] font-black uppercase text-slate-950 block">Grand Total</span>
                <span className="text-[9px] text-slate-500 font-semibold">(Inclusive of all taxes)</span>
              </div>
              <span className="font-mono text-xl font-black text-slate-950">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </div>

          {/* Official Seal and Signature */}
          <div className="pt-3 flex justify-between items-end px-2">
            {/* Rubber stamp graphic */}
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-600/60 p-1 flex flex-col items-center justify-center text-center rotate-[-6deg] select-none pointer-events-none opacity-85">
              <div className="w-full h-full rounded-full border border-emerald-600 flex flex-col items-center justify-center text-[7px] font-extrabold text-emerald-800 uppercase tracking-tighter leading-tight">
                <Sparkles className="w-2.5 h-2.5 text-amber-500 mb-0.5" />
                <span>CARTIVA LUXURY</span>
                <span className="text-[6px] text-emerald-600 font-black">AUDITED & APPROVED</span>
                <span className="text-[5px] font-mono text-slate-500">MUMBAI HUB</span>
              </div>
            </div>

            {/* Signature */}
            <div className="text-right space-y-1">
              <div className="font-serif italic text-lg text-slate-800 tracking-wider font-semibold border-b border-slate-400 pb-1 pr-2">
                Brijesh N.
              </div>
              <p className="text-[10px] font-extrabold text-slate-900 uppercase">Authorized Signatory</p>
              <p className="text-[9px] text-slate-500">Cartiva Fulfillment Network</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barcode & Footer Notice */}
      <div className="mt-8 pt-6 border-t border-slate-200 text-slate-500 space-y-3">
        {/* Barcode graphic */}
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-[2px] h-9">
            {[3,1,4,2,1,5,2,3,1,4,2,1,3,5,1,2,4,1,3,2,5,1,3,2,4,1,5,2,1,4,3,2,5,1].map((w, i) => (
              <div
                key={i}
                className="bg-slate-900 h-full"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] font-bold text-slate-600 tracking-widest">
            *{order.id.replace(/-/g, "")}*
          </span>
        </div>

        {/* Legal & Terms */}
        <div className="text-[9px] text-slate-500 space-y-1 text-center max-w-2xl mx-auto">
          <p className="font-semibold text-slate-700">
            Terms & Conditions: Goods sold are covered by 14 days genuine replacement and manufacturer warranty.
          </p>
          <p>
            This is an electronically generated Tax Invoice and does not require physical signature under the IT Act 2000.
            For invoice corrections or returns, email <strong>support@cartiva.com</strong> within 7 days of delivery.
          </p>
          <p className="text-[8px] text-slate-400">
            Cartiva Retail & Luxury Pvt Ltd • Registered in Mumbai, India • All disputes subject to Mumbai Jurisdiction
          </p>
        </div>
      </div>
    </div>
  );
};
