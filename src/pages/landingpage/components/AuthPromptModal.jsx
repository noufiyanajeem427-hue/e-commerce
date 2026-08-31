import { useNavigate } from 'react-router-dom';
import { ShoppingBag, X } from 'lucide-react';

export default function AuthPromptModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl border border-slate-100 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900">You are not registered</h3>
        <p className="text-xs text-slate-500 mt-1.5 mb-6 leading-relaxed">
          Please log in or create an account to purchase items and manage your shopping cart.
        </p>

        <div className="space-y-2">
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-sm transition"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}