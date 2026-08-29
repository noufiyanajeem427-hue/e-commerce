import { useNavigate } from 'react-router-dom';
import { Gem } from 'lucide-react';

const brands = [
  { name: 'APPLE', bg: 'bg-slate-50' },
  { name: 'SAMSUNG', bg: 'bg-blue-50/50' },
  { name: 'NIKE', bg: 'bg-amber-50/40' },
  { name: 'ADIDAS', bg: 'bg-slate-50' },
  { name: 'SONY', bg: 'bg-slate-50' },
  { name: 'LG', bg: 'bg-rose-50/40' },
];

export default function FeaturedBrands() {
  const navigate = useNavigate();

  const handleBrandClick = (brandName) => {
    // Navigates directly to the products view for this brand
    navigate(`/featured-brands?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <section className="py-6 px-4 bg-white max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Gem className="w-5 h-5 text-sky-500 fill-sky-500" />
          <h2 className="text-xl font-bold text-slate-900">Featured Brands</h2>
        </div>
        <button 
          onClick={() => navigate('/featured-brands')}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition cursor-pointer"
        >
          View All 
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {brands.map((brand, idx) => (
          <div
            key={idx}
            onClick={() => handleBrandClick(brand.name)}
            className={`${brand.bg} border border-slate-100 rounded-2xl p-6 flex items-center justify-center cursor-pointer hover:shadow-md transition active:scale-95`}
          >
            <span className="font-black tracking-widest text-slate-800 text-sm sm:text-base">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}