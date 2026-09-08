import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings,
  Store,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  Tag,
  BarChart3,
  Bell,
  Sun,
  Moon,
  Gift
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import toast from 'react-hot-toast';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isDark, setIsDark] = useState(false);

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/customers', icon: Users, label: 'Customers' },
    { path: '/categories', icon: Tag, label: 'Categories' },
    { path: '/coupons', icon: Gift, label: 'Coupons' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-full z-50
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-20'}
        flex flex-col
        bg-slate-900
      `}>
        
        {/* Top Gradient Line */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        {/* ===== HEADER / LOGO ===== */}
        <div className={`
          flex items-center justify-between p-4 
          border-b border-white/5
          ${isOpen ? 'px-6' : 'px-4'}
        `}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
              bg-gradient-to-br from-blue-500 to-purple-500
              shadow-lg shadow-purple-500/30
            `}>
              <Store className="w-5 h-5 text-white" />
            </div>
            
            <div className={`
              transition-all duration-300
              ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}
            `}>
              <h1 className="text-lg font-bold text-white">
                Shop<span className="text-blue-400">Ease</span>
              </h1>
              <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">
                Admin Panel
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              p-1.5 rounded-lg text-white/40 hover:text-white 
              hover:bg-white/10 transition-all duration-300
            `}
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* ===== USER PROFILE ===== */}
        <div className={`
          flex items-center gap-3 p-3 mx-3 mt-4
          rounded-xl bg-white/5 border border-white/5
          ${isOpen ? 'px-4' : 'px-3 justify-center'}
        `}>
          <div className="relative flex-shrink-0">
            <div className="
              w-9 h-9 rounded-xl flex items-center justify-center
              bg-gradient-to-br from-blue-500 to-purple-500
            ">
              <span className="text-white font-bold text-sm">
                {user?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
          </div>

          <div className={`
            flex-1 min-w-0 transition-all duration-300
            ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}
          `}>
            <p className="text-sm font-semibold text-white truncate">
              {user?.name || 'Admin User'}
            </p>
            <p className="text-xs text-white/40 truncate capitalize">
              {user?.role || 'Administrator'}
            </p>
          </div>

          <button className={`
            p-1 rounded-lg text-white/20 hover:text-white hover:bg-white/10 
            transition-all duration-300
            ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}
          `}>
            <Bell className="w-4 h-4" />
          </button>
        </div>

        {/* ===== NAVIGATION ===== */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  group flex items-center gap-3 px-4 py-2.5 rounded-xl
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-500/20 text-white' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                  }
                  ${!isOpen ? 'justify-center' : ''}
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />

                <span className={`
                  text-sm font-medium whitespace-nowrap
                  transition-all duration-300
                  ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}
                `}>
                  {item.label}
                </span>

                {/* Tooltip */}
                {!isOpen && (
                  <div className="
                    absolute left-full ml-4 px-3 py-1.5 rounded-lg
                    bg-slate-800 text-white text-xs font-medium
                    opacity-0 group-hover:opacity-100
                    pointer-events-none transition-all duration-300
                    whitespace-nowrap shadow-lg
                    border border-white/10
                  ">
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* ===== BOTTOM ===== */}
        <div className="p-4 border-t border-white/5 space-y-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`
              w-full flex items-center gap-3 px-4 py-2 rounded-xl
              text-white/30 hover:text-white hover:bg-white/5
              transition-all duration-300
              ${!isOpen ? 'justify-center' : ''}
            `}
          >
            {isDark ? (
              <Sun className="w-5 h-5 flex-shrink-0" />
            ) : (
              <Moon className="w-5 h-5 flex-shrink-0" />
            )}
            <span className={`
              text-sm font-medium whitespace-nowrap
              transition-all duration-300
              ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}
            `}>
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-4 py-2 rounded-xl
              text-red-400/40 hover:text-red-400 hover:bg-red-500/10
              transition-all duration-300
              ${!isOpen ? 'justify-center' : ''}
            `}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={`
              text-sm font-medium whitespace-nowrap
              transition-all duration-300
              ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}
            `}>
              Logout
            </span>
          </button>

          <div className={`
            text-center text-[10px] text-white/20 font-mono
            transition-all duration-300
            ${isOpen ? 'opacity-100' : 'opacity-0'}
          `}>
            v2.0.0
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;