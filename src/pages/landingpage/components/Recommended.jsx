import { Star, Plus, ThumbsUp } from 'lucide-react';

const recommendedProducts = [
  {
    id: 1,
    brand: 'JanSport',
    title: 'JanSport SuperBreak One Backpack',
    price: '₹2999.00',
    rating: '0.0',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    brand: 'Supergoop!',
    title: 'Supergoop! Unseen Sunscreen SPF 40',
    price: '₹2999.00',
    rating: '0.0',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    brand: 'UGG',
    title: "UGG Women's Classic Short Boot",
    price: '₹14999.00',
    rating: '0.0',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    brand: 'Ray-Ban',
    title: 'Ray-Ban Classic Wayfarer Sunglasses',
    price: '₹8999.00',
    rating: '0.0',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80',
  },
];

export default function Recommended() {
  return (
    <section className="py-6 px-4 bg-slate-50">
      <div className="flex items-center gap-2 mb-4">
        <ThumbsUp className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-bold text-slate-900">
          Recommended For You
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendedProducts.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col justify-between">
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
    </section>
  );
}