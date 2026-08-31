import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Fresh & Organic Grocery Sale',
    subtitle: 'Farm fresh essentials delivered to your doorstep within hours',
    buttonText: 'Shop Groceries',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Latest Electronics & Tech',
    subtitle: 'Upgrade your home setup with up to 40% off top tech brands',
    buttonText: 'Explore Tech',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Trendy Fashion Collections',
    subtitle: 'Discover the latest seasonal arrivals in apparel and footwear',
    buttonText: 'View Fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Beauty & Skincare Essentials',
    subtitle: 'Nourish your skin with top-rated organic wellness products',
    buttonText: 'Shop Beauty',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'Modern Home & Kitchen',
    subtitle: 'Elevate your living space with stylish decor and cookware',
    buttonText: 'Explore Home',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80',
  },
  {
    id: 6,
    title: 'Audio & Smart Wearables',
    subtitle: 'Premium wireless headphones, earbuds, and smartwatches',
    buttonText: 'Shop Wearables',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80',
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-slide interval (4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Mobile Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    
    if (distance > 50) handleNext(); // Swiped left
    if (distance < -50) handlePrev(); // Swiped right

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div 
      className="relative h-[420px] w-full overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full bg-cover bg-center flex items-center justify-center text-center px-6 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('${slide.image}')`,
          }}
        >
          <div className="max-w-md text-white space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {slide.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-sm mx-auto">
              {slide.subtitle}
            </p>
            <div className="pt-2">
              <button className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold text-xs sm:text-sm px-7 py-3 rounded-xl transition shadow-lg">
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pagination Indicators (Dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 items-center bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-5 bg-indigo-500' : 'w-2 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}