import { useNavigate } from 'react-router-dom'; // 1. Added missing import
import { Wand2 } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import TrendingProducts from './components/TrendingProducts';
import FeaturedBrands from './components/FeaturedBrands';
import DealsAndOffers from './components/DealsAndOffers';
import RecentlyViewed from './components/RecentlyViewed';
import Recommended from './components/Recommended';
import NewArrivals from './components/NewArrivals';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleProductClick = (productData) => {
    const id = productData._id || productData.id || '1';
    // Navigate and pass mock data in route state
    navigate(`/product/${id}`, { state: { product: productData } });
  };

  return (
    <div className="min-h-screen bg-white max-w-md md:max-w-7xl mx-auto border-x border-gray-100 shadow-sm relative">
      <Navbar />
      <Hero />
      <Categories />
      
      {/* 2. Pass handleProductClick to components displaying products */}
      <TrendingProducts onSelectProduct={handleProductClick} />
      <NewArrivals onSelectProduct={handleProductClick} />
      <Recommended onSelectProduct={handleProductClick} />
      <RecentlyViewed onSelectProduct={handleProductClick} />
      <DealsAndOffers onSelectProduct={handleProductClick} />

      <FeaturedBrands />
      <Testimonials />
      <Newsletter />
      <Footer />
      
      <button className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-3 rounded-full shadow-lg shadow-indigo-500/25 transition-all duration-300 flex items-center gap-2.5 z-40 cursor-pointer">
        <Wand2 className="w-5 h-5 text-amber-300" />
        <span className="text-xs font-bold tracking-wide">Ask AI</span>
      </button>
    </div>
  );
}