import { Mail } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="bg-indigo-600 text-white py-12 px-6 text-center space-y-6">
      <div className="max-w-md mx-auto space-y-3">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-xs text-indigo-100 leading-relaxed">
          Get the latest updates on new arrivals, special offers and promotions.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-3">
        <div className="relative flex items-center">
          <Mail className="w-5 h-5 text-gray-400 absolute left-4" />
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full py-3.5 pl-12 pr-4 bg-white text-slate-800 rounded-full text-sm focus:outline-none placeholder:text-gray-400 shadow-inner"
          />
        </div>

        <button className="w-full py-3.5 bg-[#0b1320] text-white rounded-full text-sm font-bold hover:bg-slate-900 transition shadow-md">
          Subscribe Now
        </button>

        <p className="text-[11px] text-indigo-200">
          We care about your data in our <a href="#" className="underline">privacy policy</a>.
        </p>
      </div>
    </section>
  );
}