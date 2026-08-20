export default function Hero() {
  return (
    <div className="relative h-[420px] w-full bg-cover bg-center flex items-center justify-center text-center px-4" 
         style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80')` }}>
      <div className="max-w-md text-white">
        <h1 className="text-3xl font-extrabold tracking-tight mb-3 leading-tight">
          Fresh & Organic Grocery Sale
        </h1>
        <p className="text-sm text-gray-200 mb-6">
          Farm fresh essentials delivered to your doorstep
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition shadow-lg">
          Shop Now
        </button>
      </div>
      <div className="absolute bottom-3 flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
      </div>
    </div>
  );
}