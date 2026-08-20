import React from "react";
import { Providers } from "../components/Providers";
import { Header } from "../components/Header";
import { AutoSlider } from "../components/AutoSlider";
import { Categories } from "../components/Categories";
import { HighestViewed } from "../components/HighestViewed";
import { TrendingProducts } from "../components/TrendingProducts";
import { CategoryBoxes } from "../components/CategoryBoxes";
import { DiscountSlider } from "../components/DiscountSlider";
import { RandomProducts } from "../components/RandomProducts";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <Providers>
      <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
        {/* 1. Header (Server Pre-rendered + Client Hydrated) */}
        <Header />

        <main className="flex-1">
          {/* 2. Auto Slider (Server Pre-rendered HTML) */}
          <AutoSlider />

          {/* 3. Categories (catrogiers) */}
          <Categories />

          {/* 4. Highest Viewed (higherview) */}
          <HighestViewed />

          {/* 5. Trending (tranding) */}
          <TrendingProducts />

          {/* 6. Category Boxes (4-4 products each) */}
          <CategoryBoxes />

          {/* 7. Discount Slider (silder discount) */}
          <DiscountSlider />

          {/* 8. Random Products (projdects randams) */}
          <RandomProducts />

          {/* 9. Verified Customer Testimonials */}
          <Testimonials />
        </main>

        {/* 10. Footer */}
        <Footer />
      </div>
    </Providers>
  );
}
