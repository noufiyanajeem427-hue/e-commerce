import { useNavigate } from 'react-router-dom';
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
import ChatWidget from './components/ChatWidget'; 

export default function LandingPage() {
  const navigate = useNavigate();

  const handleProductClick = (productData) => {
    const id = productData._id || productData.id || '1';
    navigate(`/product/${id}`, { state: { product: productData } });
  };

  return (
    <div className="min-h-screen bg-white max-w-md md:max-w-7xl mx-auto border-x border-gray-100 shadow-sm relative">
      <Navbar />
      <Hero />
      <Categories />
   
      <TrendingProducts onSelectProduct={handleProductClick} />
      <NewArrivals onSelectProduct={handleProductClick} />
      <Recommended onSelectProduct={handleProductClick} />
      <RecentlyViewed onSelectProduct={handleProductClick} />
      <DealsAndOffers onSelectProduct={handleProductClick} />

      <FeaturedBrands />
      <Testimonials />
      <Newsletter />
      <Footer />
      <ChatWidget />
    </div>
  );
}