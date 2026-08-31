import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cartiva | Modern Premium E-Commerce & Multi-Vendor Marketplace",
  description:
    "Cartiva is your premier destination for next-gen electronics, luxury apparel, modern home decor, and radiance beauty items with fast express shipping and exclusive discounts.",
  keywords: [
    "Cartiva",
    "Cartiva ecommerce",
    "online shopping",
    "premium electronics",
    "fashion apparel",
    "home aesthetics",
    "luxury marketplace",
    "seller portal"
  ],
  authors: [{ name: "Cartiva Team" }],
  openGraph: {
    title: "Cartiva | Modern Premium E-Commerce Store",
    description:
      "Shop top-tier electronics, designer apparel, living decor, and premium accessories on Cartiva with guaranteed fast express delivery.",
    url: "https://cartiva.store",
    siteName: "Cartiva",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartiva | Modern Premium E-Commerce Store",
    description:
      "Shop top-tier electronics, designer apparel, living decor, and premium accessories on Cartiva with guaranteed fast express delivery.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}
