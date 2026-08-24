import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gem, Search } from 'lucide-react';

const allBrands = [
  { id: 1, name: 'APPLE', category: 'Tech', itemCount: '120+ Products', bg: 'bg-slate-50' },
  { id: 2, name: 'SAMSUNG', category: 'Tech', itemCount: '210+ Products', bg: 'bg-blue-50/50' },
  { id: 3, name: 'NIKE', category: 'Sportswear', itemCount: '340+ Products', bg: 'bg-amber-50/40' },
  { id: 4, name: 'ADIDAS', category: 'Sportswear', itemCount: '290+ Products', bg: 'bg-slate-50' },
  { id: 5, name: 'SONY', category: 'Tech', itemCount: '150+ Products', bg: 'bg-slate-50' },
  { id: 6, name: 'LG', category: 'Tech', itemCount: '95+ Products', bg: 'bg-rose-50/40' },
  { id: 7, name: 'PUMA', category: 'Sportswear', itemCount: '180+ Products', bg: 'bg-emerald-50/40' },
  { id: 8, name: 'ASUS', category: 'Tech', itemCount: '110+ Products', bg: 'bg-indigo-50/40' },
  { id: 9, name: 'DELL', category: 'Tech', itemCount: '85+ Products', bg: 'bg-cyan-50/40' },
  { id: 10, name: 'CANON', category: 'Tech', itemCount: '65+ Products', bg: 'bg-red-50/40' },
  { id: 11, name: 'ZARA', category: 'Lifestyle', itemCount: '420+ Products', bg: 'bg-purple-50/40' },
  { id: 12, name: 'BOSE', category: 'Tech', itemCount: '45+ Products', bg: 'bg-slate-50' },
  { id: 13, name: 'PHILIPS', category: 'Lifestyle', itemCount: '130+ Products', bg: 'bg-blue-50/30' },
  { id: 14, name: 'UNDER ARMOUR', category: 'Sportswear', itemCount: '160+ Products', bg: 'bg-orange-50/40' },
  { id: 15, name: 'ROLEX', category: 'Lifestyle', itemCount: '25+ Products', bg: 'bg-emerald-50/50' },
  { id: 16, name: 'HP', category: 'Tech', itemCount: '140+ Products', bg: 'bg-sky-50/40' },
  { id: 17, name: 'GUCCI', category: 'Lifestyle', itemCount: '80+ Products', bg: 'bg-amber-50/50' },
  { id: 18, name: 'LEVI\'S', category: 'Lifestyle', itemCount: '200+ Products', bg: 'bg-rose-50/30' },
];

const categories = ['All', 'Tech', 'Sportswear', 'Lifestyle'];

export default function FeaturedBrandsPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter logic
  const filteredBrands = allBrands.filter((brand) => {
    const matchesCategory = selectedCat === 'All' || brand.category === selectedCat;
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <span className="text-xs font-medium text-slate-500">{filteredBrands.length} Brands Available</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
          <Gem className="w-7 h-7 text-sky-500 fill-sky-500" /> Featured Brands
        </h1>
        <p className="text-sm text-slate-500 mt-1">Browse official stores and verified top marketplace partners.</p>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCat === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search brand name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs font-medium bg-slate-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800"
          />
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            className={`${brand.bg} border border-slate-100/80 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}
          >
            <span className="font-black tracking-widest text-slate-800 text-sm sm:text-base group-hover:scale-105 transition-transform">
              {brand.name}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 mt-1">
              {brand.itemCount}
            </span>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBrands.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 mt-4">
          <p className="text-sm font-semibold text-slate-600">No brands found matching "{searchQuery}"</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCat('All'); }}
            className="mt-2 text-xs font-semibold text-indigo-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}