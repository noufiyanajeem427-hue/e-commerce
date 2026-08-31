import { Plus } from 'lucide-react';

const newArrivals = [
  {
    id: 1,
    category: 'Gift Shop',
    title: 'Traditional Festive Kurta Set',
    price: '₹3499.00',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80',
    description: 'Elegant traditional festive kurta set crafted with fine fabrics and intricate detailing.'
  },
  {
    id: 2,
    category: 'Fashion',
    title: 'Texas Instruments TI-84 Plus CE Graphing Calculator',
    price: '₹11999.00',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80',
    description: 'Full-color high-resolution backlit display graphing calculator for math and science.'
  },
  {
    id: 3,
    category: 'Fashion',
    title: 'Luxury Sports Car Matte Black Model',
    price: '₹24999.00',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=500&q=80',
    description: 'Die-cast scale model featuring premium matte finish and detailed interior.'
  },
  {
    id: 4,
    category: 'Gift Shop',
    title: 'Handcrafted Diwali Toran/Door Hanging',
    price: '₹1299.00',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1605883746910-ee44370e30f4?auto=format&fit=crop&w=500&q=80',
    description: 'Beautiful traditional handcrafted door hanging decoration for festive occasions.'
  },
];

export default function NewArrivals({ onSelectProduct }) {
  return (
    <section className="py-6 px-4 bg-white max-w-7xl mx-auto">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        New Arrivals
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {newArrivals.map((item) => (
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
                <span className="text-xs text-slate-500 block mb-1">{item.category}</span>
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
                className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition active:scale-95 cursor-pointer"
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