import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingBag } from 'lucide-react';

// Central product inventory mapped by category
const MOCK_PRODUCTS = [
  // Electronics
  { id: 101, title: 'Wireless Noise Canceling Headphones', category: 'Electronics', price: '$199', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80' },
  { id: 102, title: 'MacBook Pro 16" M3', category: 'Electronics', price: '$2,499', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80' },
  { id: 103, title: 'Smart Home Bluetooth Speaker', category: 'Electronics', price: '$89', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=500&q=80' },

  // Mobile Tech
  { id: 201, title: 'iPhone 15 Pro Max', category: 'Mobile Tech', price: '$1,199', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80' },
  { id: 202, title: 'Galaxy S24 Ultra', category: 'Mobile Tech', price: '$1,299', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80' },

  // Fashion
  { id: 301, title: 'Casual Cotton T-Shirt Pack', category: 'Fashion', price: '$35', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80' },
  { id: 302, title: 'Denim Jacket Classic Fit', category: 'Fashion', price: '$75', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80' },

  // Groceries
  { id: 401, title: 'Fresh Organic Fruit Basket', category: 'Groceries', price: '$25', image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=500&q=80' },

  // Beauty Care
  { id: 501, title: 'Hydrating Face Serum', category: 'Beauty Care', price: '$42', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80' },

  // Home & Kitchen
  { id: 601, title: 'Stainless Steel Cookware Set', category: 'Home & Kitchen', price: '$150', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80' },

  // Watches
  { id: 701, title: 'Minimalist Analog Watch', category: 'Watches', price: '$120', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80' },

  // Sports & Fitness
  { id: 801, title: 'Non-Slip Yoga Mat', category: 'Sports & Fitness', price: '$30', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80' },

  // Footwear
  { id: 901, title: 'Pro Running Sneakers', category: 'Footwear', price: '$110', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' }
];

const CATEGORIES_LIST = [
  'All',
  'Electronics',
  'Mobile Tech',
  'Fashion',
  'Groceries',
  'Beauty Care',
  'Home & Kitchen',
  'Watches',
  'Sports & Fitness',
  'Footwear',
  'Baby & Kids',
  'Jewelry',
  'Bags & Luggage',
  'Books & Stationeries',
  'Automotive',
  'Pet Care',
  'Gaming Gear'
];

export default function AllProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract selected category from URL query parameter (e.g. ?category=Electronics)
  const activeCategory = searchParams.get('category') || 'All';
  const [searchQuery, setSearchQuery] = useState('');

  // Update selected category in URL
  const handleCategorySelect = (categoryName) => {
    if (categoryName === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: categoryName });
    }
  };

  // Filter products strictly matching category and search term
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'All' ||
      product.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
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
        <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
          {filteredProducts.length} Items
        </span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {activeCategory === 'All' ? 'All Products' : activeCategory}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Showing items available under {activeCategory === 'All' ? 'all departments' : `"${activeCategory}"`}.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
        {/* Horizontal Category Selector */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search in ${activeCategory}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs font-medium bg-slate-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 mt-4 shadow-xs">
          <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-600">
            No products found for "{activeCategory}"
          </p>
          <button
            onClick={() => handleCategorySelect('All')}
            className="mt-3 text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
          >
            Show All Departments
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