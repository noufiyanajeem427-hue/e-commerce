import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, ShoppingBag } from 'lucide-react';

// Example product database (replace with your backend API call)
const ALL_PRODUCTS = [
  { id: 1, title: 'Wireless Noise Canceling Headphones', category: 'Electronics', price: '$199', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' },
  { id: 2, title: 'iPhone 15 Pro Max', category: 'Mobile Tech', price: '$1,199', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60' },
  { id: 3, title: 'Casual Cotton T-Shirt Pack', category: 'Fashion', price: '$35', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60' },
  { id: 4, title: 'Fresh Organic Fruit Basket', category: 'Groceries', price: '$25', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=60' },
  { id: 5, title: 'Hydrating Face Serum', category: 'Beauty Care', price: '$42', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60' },
  { id: 6, title: 'Stainless Steel Cookware Set', category: 'Home & Kitchen', price: '$150', image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=60' },
  { id: 7, title: 'Minimalist Analog Watch', category: 'Watches', price: '$120', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60' },
  { id: 8, title: 'Non-Slip Yoga Mat', category: 'Sports & Fitness', price: '$30', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop&q=60' },
  { id: 9, title: 'Pro Running Sneakers', category: 'Footwear', price: '$110', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60' },
];

const categoryList = [
  'All',
  'Electronics',
  'Mobile Tech',
  'Fashion',
  'Groceries',
  'Beauty Care',
  'Home & Kitchen',
  'Watches',
  'Sports & Fitness',
  'Footwear'
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read current category from URL search params (e.g., ?category=Electronics)
  const currentCategory = searchParams.get('category') || 'All';

  const handleSelectCategory = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Filter products by selected category
  const filteredProducts = ALL_PRODUCTS.filter((product) => 
    currentCategory === 'All' || product.category.toLowerCase() === currentCategory.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
          {filteredProducts.length} Products
        </span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {currentCategory === 'All' ? 'All Products' : currentCategory}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore products available under {currentCategory === 'All' ? 'all categories' : currentCategory}.
        </p>
      </div>

      {/* Category Pills Bar */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-4 mb-6">
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSelectCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              currentCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Items Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-xs">
          <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-600">No products found in "{currentCategory}"</p>
          <button 
            onClick={() => handleSelectCategory('All')}
            className="mt-3 text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
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
                  {product.category}
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