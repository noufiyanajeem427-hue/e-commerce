import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Gem, Search, ShoppingBag } from 'lucide-react';

// Mock product inventory mapped by brand
const MOCK_PRODUCTS = [
  // APPLE
  { id: 101, title: 'iPhone 15 Pro Max', brand: 'APPLE', price: '$1,199', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60' },
  { id: 102, title: 'MacBook Pro 16" M3', brand: 'APPLE', price: '$2,499', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60' },
  { id: 103, title: 'AirPods Max', brand: 'APPLE', price: '$549', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60' },
  { id: 104, title: 'Apple Watch Ultra 2', brand: 'APPLE', price: '$799', image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=500&auto=format&fit=crop&q=60' },
  
  // SAMSUNG
  { id: 201, title: 'Galaxy S24 Ultra', brand: 'SAMSUNG', price: '$1,299', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60' },
  { id: 202, title: 'Galaxy Z Fold 5', brand: 'SAMSUNG', price: '$1,799', image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=60' },
  { id: 203, title: 'Galaxy Watch 6', brand: 'SAMSUNG', price: '$299', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60' },

  // NIKE
  { id: 301, title: 'Nike Air Max 270', brand: 'NIKE', price: '$160', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60' },
  { id: 302, title: 'Nike Air Force 1', brand: 'NIKE', price: '$115', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60' },
  { id: 303, title: 'Nike Tech Fleece Hoodie', brand: 'NIKE', price: '$130', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=60' },

  // ADIDAS
  { id: 401, title: 'Adidas Ultraboost Light', brand: 'ADIDAS', price: '$190', image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=60' },
  { id: 402, title: 'Adidas Samba OG', brand: 'ADIDAS', price: '$100', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500&auto=format&fit=crop&q=60' },

  // SONY
  { id: 501, title: 'Sony WH-1000XM5', brand: 'SONY', price: '$399', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' },
  { id: 502, title: 'PlayStation 5 Console', brand: 'SONY', price: '$499', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format&fit=crop&q=60' },
];

export default function BrandProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get active brand from URL parameter (e.g., ?brand=APPLE)
  const currentBrand = searchParams.get('brand') || 'APPLE';
  const [searchQuery, setSearchQuery] = useState('');

  // Switch brands via URL query params
  const handleBrandChange = (brandName) => {
    setSearchParams({ brand: brandName });
  };

  // Filter items matching selected brand and search bar
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesBrand = product.brand.toUpperCase() === currentBrand.toUpperCase();
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 max-w-7xl mx-auto">
      {/* Back Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/featured-brands')} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Brands
        </button>
        <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
          {filteredProducts.length} Items Found
        </span>
      </div>

      {/* Brand Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5 uppercase">
          <Gem className="w-7 h-7 text-sky-500 fill-sky-500" /> {currentBrand} Official Catalog
        </h1>
        <p className="text-sm text-slate-500 mt-1">Showing all authentic items available from {currentBrand}.</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 bg-white p-3 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search within ${currentBrand}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-slate-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800"
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 mt-4 shadow-xs">
          <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-600">No products found for {currentBrand}</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-3 text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs hover:shadow-md transition duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100 mb-3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                  {product.brand}
                </span>
                <h3 className="font-bold text-slate-900 text-sm truncate group-hover:text-indigo-600 transition">
                  {product.title}
                </h3>
                <div className="text-slate-900 font-black text-base mt-2">
                  {product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}