import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, ChevronDown, Check } from 'lucide-react';

const allDeals = [
  { id: 1, category: 'Festive Decor', brand: 'Festive Home', title: 'Handcrafted Diwali Toran/Door Hanging', price: '₹999.00', originalPrice: '₹1,499.00', rawPrice: 999, discount: 'SAVE 33%', discountPercent: 33, rating: 4.8, image: 'https://images.unsplash.com/photo-1605883746910-ee44370e30f4?auto=format&fit=crop&w=500&q=80', description: 'Beautiful traditional handcrafted door hanging decoration for festive occasions.' },
  { id: 2, category: 'Accessories', brand: 'Tommy Hilfiger', title: 'Tommy Hilfiger Leather Wallet', price: '₹1,999.00', originalPrice: '₹2,999.00', rawPrice: 1999, discount: 'SAVE 33%', discountPercent: 33, rating: 4.7, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80', description: 'Premium genuine leather bi-fold wallet featuring multiple card slots and sleek design.' },
  { id: 3, category: 'Fitness', brand: 'Fit Simplify', title: 'Fit Simplify Resistance Loop Exercise Bands', price: '₹999.00', originalPrice: '₹1,499.00', rawPrice: 999, discount: 'SAVE 33%', discountPercent: 33, rating: 4.6, image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=500&q=80', description: 'Set of heavy-duty latex resistance loop bands for workout, stretching, and physical therapy.' },
  { id: 4, category: 'Apparel', brand: "Carter's", title: "Carter's Cotton Pajama Set", price: '₹1,299.00', originalPrice: '₹1,899.00', rawPrice: 1299, discount: 'SAVE 32%', discountPercent: 32, rating: 4.8, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80', description: 'Soft 100% breathable cotton pajama set designed for ultimate night-time comfort.' },
  { id: 5, category: 'Audio', brand: 'JBL', title: 'JBL Flip 6 Wireless Bluetooth Speaker', price: '₹8,999.00', originalPrice: '₹13,999.00', rawPrice: 8999, discount: 'SAVE 36%', discountPercent: 36, rating: 4.9, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=500&q=80', description: 'Portable waterproof speaker with powerful sound and deep bass.' },
  { id: 6, category: 'Footwear', brand: 'Puma', title: 'Puma Unisex Running Shoes', price: '₹2,499.00', originalPrice: '₹4,999.00', rawPrice: 2499, discount: 'SAVE 50%', discountPercent: 50, rating: 4.5, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80', description: 'Lightweight and breathable running shoes designed for everyday performance.' },
  { id: 7, category: 'Home', brand: 'Milton', title: 'Stainless Steel Insulated Water Bottle (1L)', price: '₹699.00', originalPrice: '₹1,199.00', rawPrice: 699, discount: 'SAVE 41%', discountPercent: 41, rating: 4.6, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80', description: 'Double-walled vacuum insulated flask that keeps drinks hot or cold for 24 hours.' },
  { id: 8, category: 'Accessories', brand: 'Fossil', title: 'Fossil Minimalist Chronograph Watch', price: '₹6,495.00', originalPrice: '₹10,995.00', rawPrice: 6495, discount: 'SAVE 40%', discountPercent: 40, rating: 4.7, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', description: 'Sleek chronograph watch with genuine leather strap and minimalist dial.' },
];

const categories = ['All', 'Festive Decor', 'Accessories', 'Fitness', 'Apparel', 'Audio', 'Footwear', 'Home'];

const sortOptions = [
  { id: 'discount', label: 'Biggest Discount' },
  { id: 'low', label: 'Price: Low to High' },
  { id: 'high', label: 'Price: High to Low' },
];

export default function DealsAndOffersPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('discount');
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

  // Direct Product Navigation Handler
  const handleDealSelect = (deal) => {
    const id = deal._id || deal.id || '1';
    navigate(`/product/${id}`, { state: { product: deal } });
  };

  const filteredDeals = allDeals.filter((item) => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
    if (sortBy === 'low') return a.rawPrice - b.rawPrice;
    if (sortBy === 'high') return b.rawPrice - a.rawPrice;
    return 0;
  });

  const selectedOptionLabel = sortOptions.find(opt => opt.id === sortBy)?.label;

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 max-w-7xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <span className="text-xs font-medium text-slate-500">{sortedDeals.length} Active Deals</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
          💥 Exclusive Deals & Offers
        </h1>
        <p className="text-sm text-slate-500 mt-1">Limited-time price cuts and bundle offers on premium items.</p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCat === cat
                  ? 'bg-amber-500 text-black'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs font-medium bg-slate-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-800"
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
                      option.id === sortBy ? 'bg-amber-50 text-amber-700' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{option.label}</span>
                    {option.id === sortBy && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedDeals.map((item) => (
          <div 
            key={item.id} 
            onClick={() => handleDealSelect(item)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition cursor-pointer group"
          >
            <div className="relative">
              <span className="absolute top-2 left-2 bg-amber-500 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-md z-10 shadow-sm">
                ✨ {item.discount}
              </span>
              <div className="h-44 w-full overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                />
              </div>
              <div className="p-3">
                <span className="text-xs text-slate-500 block mb-1">{item.category}</span>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2 leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="p-3 pt-0 flex justify-between items-center">
              <div>
                <div className="text-sm font-extrabold text-indigo-600">{item.price}</div>
                <div className="text-xs text-slate-400 line-through">{item.originalPrice}</div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDealSelect(item);
                }}
                className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}