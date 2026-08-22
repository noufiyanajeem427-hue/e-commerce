import { ShoppingBag, ShieldCheck, Truck, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b1320] text-slate-300 pt-10 pb-8 px-5 border-t border-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Brand & Tagline */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white">
            <ShoppingBag className="w-6 h-6 text-indigo-400" />
            <span className="text-xl font-bold tracking-tight">Shop Shathi</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-md">
            Your ultimate online shopping destination. We deliver the best products at the best prices, straight to your doorstep with guaranteed security.
          </p>
        </div>

        {/* Feature Cards / Trust Badges */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-[#131d2e] p-3 rounded-xl border border-slate-800/80 flex flex-col items-center text-center space-y-1.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] font-bold tracking-wider text-slate-200 uppercase leading-tight">
              SECURE<br />PAYMENT
            </span>
          </div>

          <div className="bg-[#131d2e] p-3 rounded-xl border border-slate-800/80 flex flex-col items-center text-center space-y-1.5">
            <Truck className="w-5 h-5 text-sky-400" />
            <span className="text-[10px] font-bold tracking-wider text-slate-200 uppercase leading-tight">
              FAST<br />SHIPPING
            </span>
          </div>

          <div className="bg-[#131d2e] p-3 rounded-xl border border-slate-800/80 flex flex-col items-center text-center space-y-1.5">
            <CreditCard className="w-5 h-5 text-indigo-400" />
            <span className="text-[10px] font-bold tracking-wider text-slate-200 uppercase leading-tight">
              EASY<br />RETURNS
            </span>
          </div>
        </div>

        {/* Social Media Links (Using Inline SVGs) */}
        <div className="flex items-center gap-3 pt-2">
          {/* Facebook */}
          <a href="#" className="w-9 h-9 rounded-full bg-[#131d2e] hover:bg-indigo-600 transition flex items-center justify-center text-slate-300 hover:text-white border border-slate-800">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a href="#" className="w-9 h-9 rounded-full bg-[#131d2e] hover:bg-indigo-600 transition flex items-center justify-center text-slate-300 hover:text-white border border-slate-800">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="#" className="w-9 h-9 rounded-full bg-[#131d2e] hover:bg-indigo-600 transition flex items-center justify-center text-slate-300 hover:text-white border border-slate-800">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a href="#" className="w-9 h-9 rounded-full bg-[#131d2e] hover:bg-indigo-600 transition flex items-center justify-center text-slate-300 hover:text-white border border-slate-800">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        {/* Navigation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">COMPANY</h3>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">Become a Seller</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">HELP & SUPPORT</h3>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition">Customer Support</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">SHOP</h3>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#" className="hover:text-white transition">Electronics</a></li>
              <li><a href="#" className="hover:text-white transition">Fashion</a></li>
              <li><a href="#" className="hover:text-white transition">Home & Kitchen</a></li>
              <li><a href="#" className="hover:text-white transition">Health & Beauty</a></li>
              <li><a href="#" className="text-indigo-400 font-bold hover:underline flex items-center gap-1 mt-1">All Products →</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom / Copyright */}
        <div className="border-t border-slate-800/80 pt-6 mt-8 text-center space-y-3 text-xs text-slate-500">
          <p>© 2026 Shop Shathi. All rights reserved.</p>
          <div className="flex justify-center gap-4 text-slate-400 text-[11px]">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}