import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Gem, Search, Filter, SlidersHorizontal, ShoppingBag } from 'lucide-react';

// Mock/Sample products array (Replace or merge with your API call)
const SAMPLE_PRODUCTS = [
  { id: 101, title: 'iPhone 15 Pro Max', brand: 'APPLE', category: 'Tech', price: '$1,199', rating: 4.8, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60' },
  { id: 102, title: 'MacBook Air M3', brand: 'APPLE', category: 'Tech', price: '$1,099', rating: 4.9, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60' },
  { id: 103, title: 'AirPods Pro 2', brand: 'APPLE', category: 'Tech', price: '$249', rating: 4.7, image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&auto=format&fit=crop&q=60' },
  { id: 104, title: 'Apple Watch Ultra 2', brand: 'APPLE', category: 'Tech', price: '$799', rating: 4.8, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60' },
  { id: 201, title: 'Galaxy S24 Ultra', brand: 'SAMSUNG', category: 'Tech', price: '$1,299', rating: 4.7, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60' },
  { id: 301, title: 'Air Force 1 Ultra', brand: 'NIKE', category: 'Sportswear', price: '$130', rating: 4.6, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60' },
  { id: 401, title: 'Ultraboost Light', brand: 'ADIDAS', category: 'Sportswear', price: '$190', rating: 4.5, image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=60' },
];

export default function BrandProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const brandParam = searchParams.get('brand'); // e.g. "APPLE"
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  // Clear or switch brand filter directly from page header
  const handleRemoveBrandFilter = () => {
    searchParams.delete('brand');
    setSearchParams(searchParams);
  };

  // Filter products by selected brand, search term, and category
  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesBrand = !brandParam || product.brand.toUpperCase() === brandParam.toUpperCase();
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesCategory && matchesSearch;
  });

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
        <span className="text-xs font-semibold text-slate-500 bg-slate-200/60 px-3 py-1 rounded-full">
          {filteredProducts.length} Items Found
        </span>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Gem className="w-6 h-6 text-sky-500 fill-sky-500" />
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Official Store Page</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
            {brandParam ? `${brandParam.toUpperCase()} Collection` : 'All Featured Products'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing official products and direct warranty items for {brandParam || 'all brands'}.
          </p>
        </div>

        {brandParam && (
          <button
            onClick={handleRemoveBrandFilter}
            className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs px-4 py-2.5 rounded-2xl transition cursor-pointer border border-indigo-200"
          >
            <span>Showing: <strong>{brandParam}</strong></span>
            <span className="ml-1 bg-indigo-200 text-indigo-800 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">✕</span>
          </button>
        )}
      </div>

      {/* Search & Filter Options Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search ${brandParam || 'brand'} products...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs font-medium bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800 shadow-xs"
          />
        </div>

        {/* Categories & Sorting */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {['All', 'Tech', 'Sportswear'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl focus:outline-none cursor-pointer shadow-xs"
          >
            <option value="popular">Most Popular</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-xs">
          <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No Products Found</h3>
          <p className="text-slate-500 text-xs mt-1">No items match your selected brand or search criteria.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); handleRemoveBrandFilter(); }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-50 mb-3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-black px-2 py-0.5 rounded-lg tracking-wider uppercase shadow-2xs">
                  {product.brand}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-indigo-600 transition">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-indigo-600 font-black text-base">{product.price}</span>
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                    ★ {product.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}