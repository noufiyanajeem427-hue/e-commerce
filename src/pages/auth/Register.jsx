import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Navbar from '../landingpage/components/Navbar';
import Footer from '../landingpage/components/Footer';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50 max-w-md md:max-w-7xl mx-auto border-x border-gray-100 shadow-sm flex flex-col justify-between relative">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100/80">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Create an account
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 font-medium">
              Already have an account?{' '}
              <a href="/login" className="text-indigo-600 hover:underline font-semibold">
                Sign in here
              </a>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 text-slate-800 placeholder:text-slate-300 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 text-slate-800 placeholder:text-slate-300 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="1234567890"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 text-slate-800 placeholder:text-slate-300 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 text-slate-800 placeholder:text-slate-300 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 text-slate-800 placeholder:text-slate-300 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all mt-2"
            >
              Create Account
            </button>
          </form>

        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3.5 rounded-full shadow-xl hover:bg-indigo-700 transition z-30">
        ✨
      </button>

      <Footer />
    </div>
  );
}