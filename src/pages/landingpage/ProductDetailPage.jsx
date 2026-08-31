import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Star, ShoppingBag, Heart, Share2, 
  Truck, ShieldCheck, RotateCcw, Plus, Minus, X, LogIn, UserPlus 
} from 'lucide-react';
import { useCart } from '../../context/CartContext'; // Adjust path if needed

export default function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!product) {
      setLoading(true);
      fetch(`/api/products/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Product not found');
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setSelectedImage(data.image || data.images?.[0] || '');
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setSelectedImage(product.image || product.images?.[0] || '');
    }
  }, [id, product]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity); 
    setShowAuthModal(true);        
   };
   
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-500 mb-4">The item you are looking for might have been removed.</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const galleryImages = product.images || [product.image];

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 max-w-7xl mx-auto relative">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-2 rounded-full border border-slate-200 transition cursor-pointer ${
              isWishlisted ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
          <button className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition cursor-pointer">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="h-80 sm:h-[420px] w-full bg-slate-100 rounded-2xl overflow-hidden relative">
            <img 
              src={selectedImage || product.image} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
            {product.discount && (
              <span className="absolute top-3 left-3 bg-amber-500 text-black text-xs font-extrabold px-2.5 py-1 rounded-md shadow-sm">
                ✨ {product.discount}
              </span>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition cursor-pointer flex-shrink-0 ${
                    selectedImage === img ? 'border-indigo-600' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
              <span>{product.category || 'General'}</span>
              <span>Brand: <strong className="text-slate-700 font-semibold">{product.brand || 'Generic'}</strong></span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug mb-3">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating || '4.5'}</span>
              </div>
              <span className="text-xs text-slate-400">({product.reviews || '50+'} ratings & reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-medium text-slate-400 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            <div className="mb-6 border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description || 'No detailed description available for this product at the moment.'}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Quantity</h3>
              <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button 
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition cursor-pointer shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="py-3.5 px-6 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition cursor-pointer active:scale-95"
              >
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
              <div className="flex flex-col items-center gap-1 p-2">
                <Truck className="w-4 h-4 text-indigo-600" />
                <span className="text-[10px] font-semibold text-slate-600">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span className="text-[10px] font-semibold text-slate-600">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2">
                <RotateCcw className="w-4 h-4 text-indigo-600" />
                <span className="text-[10px] font-semibold text-slate-600">7-Day Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <h2 className="text-xl font-extrabold text-slate-900">Sign in to Complete Purchase</h2>
              <p className="text-xs text-slate-500 mt-1">Please log in or create an account to proceed to instant checkout.</p>
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
          </div>
        </div>
      )}
    </div>
  );
}