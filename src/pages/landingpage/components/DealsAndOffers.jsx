import { Plus } from 'lucide-react';

const deals = [
  {
    id: 1,
    category: 'Festive Decor',
    title: 'Handcrafted Diwali Toran/Door Hanging',
    price: '₹999.00',
    originalPrice: '₹1499.00',
    discount: 'SAVE 33%',
    image: 'https://images.unsplash.com/photo-1605883746910-ee44370e30f4?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    category: 'Tommy Hilfiger',
    title: 'Tommy Hilfiger Leather Wallet',
    price: '₹1999.00',
    originalPrice: '₹2999.00',
    discount: 'SAVE 33%',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    category: 'Fit Simplify',
    title: 'Fit Simplify Resistance Loop Exercise Bands',
    price: '₹999.00',
    originalPrice: '₹1499.00',
    discount: 'SAVE 33%',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    category: "Carter's",
    title: "Carter's Cotton Pajama Set",
    price: '₹1299.00',
    originalPrice: '₹1899.00',
    discount: 'SAVE 32%',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80',
  },
];

export default function DealsAndOffers() {
  return (
    <section className="py-6 px-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">💥</span>
          <h2 className="text-xl font-bold text-slate-900">Deals & Offers</h2>
        </div>
        <button className="text-xs font-semibold text-indigo-600 hover:underline">
          View All →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {deals.map((item) => (
          <div key={item.id} className="bg-slate-50/50 rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="relative">
              <span className="absolute top-2 left-2 bg-amber-500 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-md z-10 shadow-sm">
                ✨ {item.discount}
              </span>
              <div className="h-44 w-full overflow-hidden bg-gray-100">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
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