import { X, Search, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  'Home',
  'Electronics',
  'Mobile Accessories',
  'Fashion',
  'Beauty & Personal Care',
  'Home & Kitchen',
  'Grocery & Essentials',
  'Health & Wellness',
  'Sports & Fitness',
  'Books & Stationery',
  'Toys & Games',
  'Automotive',
  'Pet Supplies',
  'Gift Shop',
];

export default function Sidebar({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer content */}
      <div className="relative w-[82%] max-w-xs bg-white h-full flex flex-col justify-between shadow-xl z-10 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Header inside drawer */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-lg font-bold text-slate-900">
    Cart<span className="text-indigo-600">iva</span>
  </span>
            </div>
            <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-800">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, brands."
              className="w-full py-2.5 pl-4 pr-10 text-sm bg-gray-100/80 rounded-full focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-700"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3" />
          </div>

          {/* Categories list */}
          <nav className="flex flex-col divide-y divide-gray-50">
            {categories.map((item, idx) => (
              <a
                key={idx}
                href="#"
                className="py-3 text-sm font-medium text-slate-800 hover:text-indigo-600 transition"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Auth Buttons */}
        <div className="p-4 border-t border-gray-100 space-y-2 bg-white sticky bottom-0">
          <Link
            to="/login"
            className="block w-full py-3 text-center text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="block w-full py-3 text-center text-sm font-semibold text-slate-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}