import { useNavigate } from 'react-router-dom';
import { Clock, Star, Plus } from 'lucide-react';

const recentItems = [
  {
    id: 1,
    brand: 'Asus',
    title: 'Asus ROG Strix G16 (2024)',
    price: '₹1,54,990.00',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80',
    description: 'High-performance gaming laptop equipped with the latest Intel Core i9 processor and RTX 4070 GPU.'
  },
  {
    id: 2,
    brand: 'AMD',
    title: 'AMD Ryzen 9 7950X Desktop Processor',
    price: '₹54,999.00',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=500&q=80',
    description: '16 cores and 32 processing threads for demanding gamers and creators.'
  },
  {
    id: 3,
    brand: 'Sony',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    price: '₹29,990.00',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
    description: 'Industry-leading noise canceling headphones with exceptional audio quality.'
  },
  {
    id: 4,
    brand: 'Apple',
    title: 'Apple Watch Series 9 GPS 45mm',
    price: '₹44,900.00',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80',
    description: 'Powerful health tracker with Double Tap gesture and brighter Always-On display.'
  },
];

export default function RecentlyViewed({ onSelectProduct }) {
  const navigate = useNavigate();

  return (
    <section className="py-6 px-4 bg-white max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-bold text-slate-900">Recently Viewed</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {recentItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onSelectProduct && onSelectProduct(item)}
            className="bg-slate-50/50 rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition cursor-pointer group"
          >
            <div>
              <div className="h-44 w-full overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                />
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
                  e.stopPropagation();
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

      {/* View All Products Action Button */}
      <div className="mt-8 text-center">
        <button 
          onClick={() => navigate('/all-products')}
          className="px-6 py-2.5 rounded-full border border-indigo-200 text-indigo-600 font-medium text-sm hover:bg-indigo-50 transition cursor-pointer active:scale-95"
        >
          View All Products
        </button>
      </div>
    </section>
  );
}