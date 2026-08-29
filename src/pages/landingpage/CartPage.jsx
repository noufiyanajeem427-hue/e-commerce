import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, ArrowRight, X, LogIn, UserPlus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalItemCount } = useCart();
  const navigate = useNavigate();

  // Modal State for Checkout Authentication
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Helper to parse price strings like "$120.00" or numeric 120
  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    return parseFloat(priceStr.toString().replace(/[^0-9.]/g, '')) || 0;
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    // Optional: Check if user is logged in via localStorage/Token here
    // const token = localStorage.getItem('token');
    // if (token) { navigate('/checkout'); return; }

    setShowAuthModal(true);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-slate-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl text-sm hover:bg-indigo-700 transition cursor-pointer shadow-md shadow-indigo-200"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 max-w-6xl mx-auto relative">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Continue Shopping
      </button>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
        Your Cart <span className="text-slate-400 font-normal text-xl">({totalItemCount} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 flex gap-4 items-center shadow-sm">
              <img 
                src={item.image || item.images?.[0]} 
                alt={item.title} 
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl bg-slate-100 flex-shrink-0" 
              />
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 truncate text-base">{item.title}</h3>
                <p className="text-xs text-slate-400 mb-2">{item.brand || 'Generic'}</p>
                <div className="text-indigo-600 font-extrabold text-lg">{item.price}</div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                    className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                    className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit space-y-4">
          <h2 className="font-extrabold text-lg text-slate-900">Order Summary</h2>
          
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="text-emerald-600 font-bold">Free</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 flex justify-between font-black text-slate-900 text-lg">
            <span>Total</span>
            <span className="text-indigo-600">${subtotal.toFixed(2)}</span>
          </div>

          <button 
            onClick={handleProceedToCheckout}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl transition cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-indigo-200 active:scale-95"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Auth / Checkout Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-100">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Sign in to Checkout</h2>
              <p className="text-xs text-slate-500 mt-1">Please log in or create an account to finalize your order details.</p>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-200"
              >
                <LogIn className="w-4 h-4" /> Log In
              </button>

              <button 
                onClick={() => navigate('/register')}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" /> Create New Account
              </button>
            </div>

            <div className="mt-6 text-center text-[11px] text-slate-400">
              By continuing, you agree to our Terms of Service & Privacy Policy.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}