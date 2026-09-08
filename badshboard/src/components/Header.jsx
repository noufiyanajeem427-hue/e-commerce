import React from 'react';
import { useSelector } from 'react-redux';
import { Menu, Bell, User, Circle } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="header-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Good Morning! 👋</h2>
            <p className="text-sm text-slate-400">Welcome back, {user?.name || 'Admin'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
          
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-700">{user?.name || 'Admin'}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role || 'Admin'}</p>
            </div>
            <Circle className="w-2 h-2 text-emerald-500 fill-emerald-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;