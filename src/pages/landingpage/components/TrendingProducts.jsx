import { Star, Plus } from 'lucide-react';

const products = [
  {
    id: 1,
    brand: 'Asus',
    title: 'Asus ROG Strix G16 (2024)',
    price: '₹154990.00',
    rating: '0.0',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    brand: 'AMD',
    title: 'AMD Ryzen 9 7950X Desktop Processor',
    price: '₹54999.00',
    rating: '0.0',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    brand: 'Samsung',
    title: 'Samsung Galaxy S24 Ultra 5G',
    price: '₹129999.00',
    rating: '0.0',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    brand: 'Apple',
    title: 'Apple Mac mini M2 Pro',
    price: '₹129900.00',
    rating: '0.0',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80',
  },
];

export default function TrendingProducts() {
  return (
    <section className="py-6 px-4 bg-slate-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          🔥 Trending Products
        </h2>
        <a href="#" className="text-xs font-semibold text-indigo-600 hover:underline">
          View All →
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {products.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="h-36 w-full overflow-hidden bg-gray-100">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                  <span>{item.brand}</span>
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
              <button className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}