import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Plus, ArrowLeft, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';

const allTrendingProducts = [
  { id: 1, category: 'Laptops', brand: 'Asus', title: 'Asus ROG Strix G16 (2024)', price: '₹1,54,990.00', rawPrice: 154990, rating: 4.8, reviews: '124', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80' },
  { id: 2, category: 'Components', brand: 'AMD', title: 'AMD Ryzen 9 7950X Desktop Processor', price: '₹54,999.00', rawPrice: 54999, rating: 4.9, reviews: '88', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=500&q=80' },
  { id: 3, category: 'Mobiles', brand: 'Samsung', title: 'Samsung Galaxy S24 Ultra 5G', price: '₹1,29,999.00', rawPrice: 129999, rating: 4.9, reviews: '310', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80' },
  { id: 4, category: 'Laptops', brand: 'Apple', title: 'Apple Mac mini M2 Pro', price: '₹1,29,900.00', rawPrice: 129900, rating: 4.7, reviews: '64', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80' },
  { id: 5, category: 'Audio', brand: 'Sony', title: 'Sony WH-1000XM5 Noise Canceling Headphones', price: '₹29,990.00', rawPrice: 29990, rating: 4.8, reviews: '215', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80' },
  { id: 6, category: 'Cameras', brand: 'Canon', title: 'Canon EOS R6 Mark II Mirrorless Camera', price: '₹2,15,995.00', rawPrice: 215995, rating: 4.9, reviews: '42', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80' },
  { id: 7, category: 'Gaming', brand: 'Sony', title: 'PlayStation 5 Console (Disc Version)', price: '₹54,990.00', rawPrice: 54990, rating: 4.9, reviews: '640', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80' },
  { id: 8, category: 'Wearables', brand: 'Apple', title: 'Apple Watch Series 9 GPS 45mm', price: '₹44,900.00', rawPrice: 44900, rating: 4.6, reviews: '180', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80' },
];

const categories = ['All', 'Laptops', 'Mobiles', 'Audio', 'Cameras', 'Gaming', 'Wearables', 'Components'];

const sortOptions = [
  { id: 'featured', label: 'Sort by: Featured' },
  { id: 'rating', label: 'Sort by: Highest Rated' },
  { id: 'low', label: 'Price: Low to High' },
  { id: 'high', label: 'Price: High to Low' },
];

export default function TrendingProductsPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products
  const filtered = selectedCat === 'All' 
    ? allTrendingProducts 
    : allTrendingProducts.filter(p => p.category === selectedCat);

  // Sort products
  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'low') return a.rawPrice - b.rawPrice;
    if (sortBy === 'high') return b.rawPrice - a.rawPrice;
    return 0; // Default: 'featured'
  });

  const selectedOptionLabel = sortOptions.find(opt => opt.id === sortBy)?.label;

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">🔥 All Trending Products</h1>
        <p className="text-sm text-slate-500 mt-1">Discover top-rated deals across all electronics and gadget categories.</p>
      </div>

      {/* Filter and Custom Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCat === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Custom Styled Dropdown */}
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center justify-between gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100/80 hover:bg-slate-200/70 border border-transparent rounded-xl transition-all duration-200 focus:outline-none cursor-pointer"
            >
              <span>{selectedOptionLabel}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Menu Popup */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white p-1.5 shadow-lg border border-slate-100 z-50">
              {sortOptions.map((option) => {
                const isSelected = option.id === sortBy;
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {sortedProducts.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="h-40 sm:h-48 w-full overflow-hidden bg-gray-100 relative group">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                  <span className="font-medium text-slate-400">{item.brand}</span>
                  <span className="flex items-center text-amber-500 font-semibold gap-0.5">
                    <Star className="w-3 h-3 fill-amber-500" /> {item.rating} <span className="text-slate-400 font-normal">({item.reviews})</span>
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2 leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="p-3 pt-0 flex justify-between items-center">
              <span className="text-sm font-extrabold text-indigo-600">{item.price}</span>
              <button className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition active:scale-95 cursor-pointer">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}