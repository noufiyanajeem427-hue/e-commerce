import { useState } from 'react';
import { Star, Plus, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Laptops', 'Mobiles', 'Audio', 'Cameras', 'Gaming'];

const products = [
  {
    id: 1,
    category: 'Laptops',
    brand: 'Asus',
    title: 'Asus ROG Strix G16 (2024)',
    price: '₹1,54,990.00',
    rating: '4.8',
    reviews: '124',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80',
    description: 'High-performance gaming laptop equipped with the latest Intel Core i9 processor and RTX 4070 GPU.'
  },
  {
    id: 2,
    category: 'Mobiles',
    brand: 'Samsung',
    title: 'Samsung Galaxy S24 Ultra 5G',
    price: '₹1,29,999.00',
    rating: '4.9',
    reviews: '310',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80',
    description: 'Ultimate flagship smartphone featuring Galaxy AI, 200MP camera, and built-in S Pen.'
  },
  {
    id: 3,
    category: 'Audio',
    brand: 'Sony',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    price: '₹29,990.00',
    rating: '4.7',
    reviews: '89',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
    description: 'Industry-leading noise canceling headphones with exceptional audio quality and 30-hour battery life.'
  },
  {
    id: 4,
    category: 'Cameras',
    brand: 'Canon',
    title: 'Canon EOS R6 Mark II Mirrorless Camera',
    price: '₹2,15,995.00',
    rating: '4.9',
    reviews: '42',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80',
    description: 'Advanced full-frame mirrorless camera for professional photographers and videographers.'
  },
  {
    id: 5,
    category: 'Gaming',
    brand: 'Sony',
    title: 'PlayStation 5 Digital Edition Console',
    price: '₹44,990.00',
    rating: '4.8',
    reviews: '512',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80',
    description: 'Next-gen gaming console with ultra-high speed SSD and immersive haptic feedback.'
  },
  {
    id: 6,
    category: 'Laptops',
    brand: 'Apple',
    title: 'Apple MacBook Pro 14" M3 Pro',
    price: '₹1,99,900.00',
    rating: '4.9',
    reviews: '204',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80',
    description: 'Supercharged by Apple Silicon M3 Pro chip for peak efficiency and performance.'
  },
];

export default function TrendingProducts({ onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="py-6 px-4 bg-slate-50 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500" /> Trending Products
        </h2>
        {/* View All Button */}
        <button 
          onClick={() => navigate('/trending-products')} 
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition cursor-pointer"
        >
          View All 
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none select-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.slice(0, 4).map((item) => (
          <div 
            key={item.id} 
            onClick={() => onSelectProduct && onSelectProduct(item)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition cursor-pointer group"
          >
            <div>
              <div className="h-36 sm:h-44 w-full overflow-hidden bg-gray-100 relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                />
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
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevents navigating to details page when clicking '+'
                  if (onSelectProduct) onSelectProduct(item);
                }}
                className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}