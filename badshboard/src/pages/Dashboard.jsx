import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ IMPORTANT
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ useNavigate hook
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalRevenue: 45231.89,
        totalOrders: 2847,
        totalProducts: 1234,
        totalCustomers: 5678,
        revenueChange: 12.5,
        ordersChange: 8.2,
        productsChange: -3.1,
        customersChange: 5.4,
        recentOrders: [
          { id: 'ORD-001', customer: 'John Doe', amount: 129.99, status: 'Processing' },
          { id: 'ORD-002', customer: 'Jane Smith', amount: 89.50, status: 'Shipped' },
          { id: 'ORD-003', customer: 'Rah Johnson', amount: 245.00, status: 'Delivered' },
          { id: 'ORD-004', customer: 'Alice Brown', amount: 67.80, status: 'Pending' },
          { id: 'ORD-005', customer: 'Charlie Wilson', amount: 189.99, status: 'Delivered' },
        ]
      });
      setLoading(false);
    }, 500);
  }, []);

  // ✅ Add Product Button Handler
  const handleAddProduct = () => {
    console.log('Add Product clicked!'); // Debug log
    navigate('/products');
  };

  const statCards = [
    { 
      title: 'Total Revenue', 
      value: `$${stats?.totalRevenue?.toFixed(2) || '0.00'}`, 
      icon: DollarSign, 
      color: 'blue',
      bg: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: stats?.revenueChange || 0
    },
    { 
      title: 'Total Orders', 
      value: stats?.totalOrders || 0, 
      icon: ShoppingCart, 
      color: 'emerald',
      bg: 'from-emerald-500 to-emerald-600',
      lightBg: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      change: stats?.ordersChange || 0
    },
    { 
      title: 'Products', 
      value: stats?.totalProducts || 0, 
      icon: Package, 
      color: 'purple',
      bg: 'from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: stats?.productsChange || 0
    },
    { 
      title: 'Customers', 
      value: stats?.totalCustomers || 0, 
      icon: Users, 
      color: 'orange',
      bg: 'from-orange-500 to-orange-600',
      lightBg: 'bg-orange-50',
      textColor: 'text-orange-600',
      change: stats?.customersChange || 0
    },
  ];

  const statusColors = {
    Pending: 'bg-amber-100 text-amber-700',
    Processing: 'bg-blue-100 text-blue-700',
    Shipped: 'bg-purple-100 text-purple-700',
    Delivered: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
  };

  const statusDots = {
    Pending: 'bg-amber-500',
    Processing: 'bg-blue-500',
    Shipped: 'bg-purple-500',
    Delivered: 'bg-green-500',
    Cancelled: 'bg-red-500',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ===== PAGE HEADER ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Here's what's happening with your store today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="
            px-4 py-2.5 rounded-xl
            bg-white border border-slate-200
            text-slate-600 font-medium text-sm
            hover:bg-slate-50 hover:border-slate-300
            transition-all duration-200
            flex items-center gap-2
          ">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export
          </button>
          
          {/* ✅ Add Product Button - Fixed */}
          <button 
            onClick={handleAddProduct}
            className="
              px-4 py-2.5 rounded-xl
              bg-gradient-to-r from-blue-600 to-purple-600
              text-white font-medium text-sm
              hover:shadow-lg hover:shadow-blue-500/25
              transition-all duration-200
              flex items-center gap-2
              cursor-pointer
            "
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change >= 0;
          return (
            <div 
              key={stat.title}
              className="
                bg-white rounded-2xl p-6
                shadow-sm hover:shadow-md
                border border-slate-100
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-800 mt-1.5">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {isPositive ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                      {Math.abs(stat.change)}%
                    </span>
                    <span className="text-xs text-slate-400">vs last month</span>
                  </div>
                </div>
                <div className={`
                  p-3 rounded-xl ${stat.lightBg}
                  flex items-center justify-center
                `}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${stat.bg} transition-all duration-1000`}
                  style={{ width: `${Math.min(Math.abs(stat.change) * 2, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== MAIN CONTENT GRID ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* ===== REVENUE CHART ===== */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Revenue Overview
              </h3>
              <p className="text-sm text-slate-400 mt-0.5">
                Monthly revenue and order statistics
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="
                px-3 py-1.5 rounded-lg text-sm font-medium
                bg-blue-50 text-blue-600
                hover:bg-blue-100
                transition-colors
              ">
                This Month
              </button>
              <button className="
                px-3 py-1.5 rounded-lg text-sm font-medium
                text-slate-500 hover:bg-slate-50
                transition-colors
              ">
                Week
              </button>
              <button className="
                px-3 py-1.5 rounded-lg text-sm font-medium
                text-slate-500 hover:bg-slate-50
                transition-colors
              ">
                Year
              </button>
            </div>
          </div>

          <div className="h-72 flex items-center justify-center bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-xl border border-slate-100">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-slate-600 font-medium">Revenue Chart</p>
              <p className="text-sm text-slate-400">(Coming soon)</p>
            </div>
          </div>
        </div>

        {/* ===== RECENT ORDERS ===== */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Recent Orders
              </h3>
              <p className="text-sm text-slate-400 mt-0.5">
                Latest 5 orders
              </p>
            </div>
            <button className="
              text-sm text-blue-600 hover:text-blue-700
              font-medium flex items-center gap-1
              transition-colors
            ">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            {stats?.recentOrders?.slice(0, 5).map((order, index) => (
              <div 
                key={index}
                className="
                  flex items-center justify-between p-3
                  rounded-xl hover:bg-slate-50
                  transition-all duration-200
                "
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 text-sm">
                      {order.id}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {order.customer}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="font-semibold text-slate-800 text-sm">
                    ${order.amount.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1.5 justify-end mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDots[order.status] || 'bg-slate-400'}`} />
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status] || 'bg-slate-100 text-slate-600'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;