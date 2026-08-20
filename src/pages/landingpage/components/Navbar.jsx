import { useState } from 'react';
import { ShoppingBag, Menu, ShoppingCart } from 'lucide-react';
import Sidebar from './Sidebar';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-pink-500" />
          </div>
          <span className="text-xl font-bold text-indigo-600">Shop Shathi</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              2
            </span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="text-gray-700 p-1 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Sidebar Drawer */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}