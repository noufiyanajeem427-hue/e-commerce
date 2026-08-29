import { useState } from 'react';
import { Store, Menu, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../../../context/CartContext"; // Adjust path if needed
import Sidebar from './Sidebar';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { totalItemCount } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-40">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Store className="w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            Cart<span className="text-indigo-600">iva</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/cart')}
            className="relative p-1 rounded-xl text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-scaleIn">
                {totalItemCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="text-gray-700 p-1 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}