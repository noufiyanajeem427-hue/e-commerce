import { Clock, Star, Plus } from 'lucide-react';

const recentItems = [
  {
    id: 1,
    brand: 'Asus',
    title: 'Asus ROG Strix G16 (2024)',
    price: '₹154990.00',
    rating: '0.0',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    brand: 'AMD',
    title: 'AMD Ryzen 9 7950X Desktop Processor',
    price: '₹54999.00',
    rating: '0.0',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=500&q=80',
  },
];

export default function RecentlyViewed() {
  return (
    <section className="py-6 px-4 bg-white">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-bold text-slate-900">Recently Viewed</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {recentItems.map((item) => (
          <div key={item.id} className="bg-slate-50/50 rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="h-44 w-full overflow-hidden bg-gray-100">
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

      {/* View All Products Action Button */}
      <div className="mt-8 text-center">
        <button className="px-6 py-2.5 rounded-full border border-indigo-200 text-indigo-600 font-medium text-sm hover:bg-indigo-50 transition">
          View All Products
        </button>
      </div>
    </section>
  );
}