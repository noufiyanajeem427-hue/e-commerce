import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Plus, Search, SlidersHorizontal, ChevronDown, Check, ShoppingBag } from 'lucide-react';

const catalogProducts = [
  { id: 1, category: 'Laptops', brand: 'Asus', title: 'Asus ROG Strix G16 (2024)', price: '₹1,54,990.00', rawPrice: 154990, rating: 4.8, reviews: '124', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80' },
  { id: 2, category: 'Components', brand: 'AMD', title: 'AMD Ryzen 9 7950X Desktop Processor', price: '₹54,999.00', rawPrice: 54999, rating: 4.9, reviews: '88', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=500&q=80' },
  { id: 3, category: 'Mobiles', brand: 'Samsung', title: 'Samsung Galaxy S24 Ultra 5G', price: '₹1,29,999.00', rawPrice: 129999, rating: 4.9, reviews: '310', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80' },
  { id: 4, category: 'Audio', brand: 'Sony', title: 'Sony WH-1000XM5 Wireless Headphones', price: '₹29,990.00', rawPrice: 29990, rating: 4.8, reviews: '215', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80' },
  { id: 5, category: 'Wearables', brand: 'Apple', title: 'Apple Watch Series 9 GPS 45mm', price: '₹44,900.00', rawPrice: 44900, rating: 4.7, reviews: '180', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80' },
  { id: 6, category: 'Cameras', brand: 'Canon', title: 'Canon EOS R6 Mark II Mirrorless', price: '₹2,15,995.00', rawPrice: 215995, rating: 4.9, reviews: '42', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80' },
  { id: 7, category: 'Gaming', brand: 'Sony', title: 'PlayStation 5 Disc Edition', price: '₹54,990.00', rawPrice: 54990, rating: 4.9, reviews: '640', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80' },
  { id: 8, category: 'Footwear', brand: 'Nike', title: 'Nike Air Max 270 Sport', price: '₹12,995.00', rawPrice: 12995, rating: 4.6, reviews: '95', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
  { id: 9, category: 'Laptops', brand: 'Apple', title: 'Apple MacBook Air M3 13"', price: '₹1,14,900.00', rawPrice: 114900, rating: 4.8, reviews: '150', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80' },
  { id: 10, category: 'Lifestyle', brand: 'Ray-Ban', title: 'Ray-Ban Classic Aviator Sunglasses', price: '₹8,590.00', rawPrice: 8590, rating: 4.5, reviews: '210', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80' },
];

const categories = ['All', 'Laptops', 'Mobiles', 'Audio', 'Cameras', 'Gaming', 'Wearables', 'Footwear', 'Lifestyle'];

const sortOptions = [
  { id: 'featured', label: 'Sort by: Featured' },
  { id: 'rating', label: 'Sort by: Highest Rated' },
  { id: 'low', label: 'Price: Low to High' },
  { id: 'high', label: 'Price: High to Low' },
];

export default function AllProductsPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = catalogProducts.filter((p) => {
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'low') return a.rawPrice - b.rawPrice;
    if (sortBy === 'high') return b.rawPrice - a.rawPrice;
    return 0;
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
        <span className="text-xs font-medium text-slate-500">{sortedProducts.length} Items Found</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
          <ShoppingBag className="w-7 h-7 text-indigo-600" /> Explore All Products
        </h1>
        <p className="text-sm text-slate-500 mt-1">Browse our complete inventory across all product categories.</p>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
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

        {/* Search and Sort */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs font-medium bg-slate-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800"
            />
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center justify-between gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer whitespace-nowrap"
            >
              <span>{selectedOptionLabel}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white p-1.5 shadow-lg border border-slate-100 z-50">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-xs font-semibold rounded-xl transition cursor-pointer ${
                      option.id === sortBy ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{option.label}</span>
                    {option.id === sortBy && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sortedProducts.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="h-40 w-full overflow-hidden bg-gray-100 relative group">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                  <span className="font-medium text-slate-400">{item.brand}</span>
                  <span className="flex items-center text-amber-500 font-semibold gap-0.5">
                    <Star className="w-3 h-3 fill-amber-500" /> {item.rating}
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