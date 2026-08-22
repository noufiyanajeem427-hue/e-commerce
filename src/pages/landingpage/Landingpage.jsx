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
  return (
    <div className="min-h-screen bg-white max-w-md md:max-w-7xl mx-auto border-x border-gray-100 shadow-sm relative">
      <Navbar />
      <Hero />
      <Categories />
      <TrendingProducts />
      <NewArrivals />
      <Recommended />
      <RecentlyViewed />
      <FeaturedBrands />
      <DealsAndOffers />
      <Testimonials />
      <Newsletter />
      <Footer />
      
      <button className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3.5 rounded-full shadow-xl hover:bg-indigo-700 transition z-30">
        ✨
      </button>
    </div>
  );
}