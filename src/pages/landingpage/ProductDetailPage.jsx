import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Star, ShoppingBag, Heart, Share2, 
  Truck, ShieldCheck, RotateCcw, Plus, Minus, X, LogIn, UserPlus 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

// Helper function to generate category-aware specifications dynamically
const getProductSpecifications = (product) => {
  const category = (product?.category || '').toLowerCase();

  // If the product object already has backend specs, use them directly
  if (product?.keyAttributes && product?.keyAttributes.length > 0) {
    return {
      keyAttributes: product.keyAttributes,
      techSpecs: product.technicalSpecifications || [],
      highlights: product.highlights || []
    };
  }

  // 1. Fashion & Clothing
  if (category.includes('fashion') || category.includes('clothing') || category.includes('wear')) {
    return {
      highlights: [
        'Premium high-density fabric with breathable weave',
        'Pre-shrunk finish to maintain fit after multiple washes',
        'Reinforced double-stitched hems for high durability'
      ],
      keyAttributes: [
        { label: 'Material', value: '100% Organic Cotton' },
        { label: 'Fit Type', value: 'Regular Fit' },
        { label: 'Pattern', value: 'Solid / Textured' },
        { label: 'Sleeve Length', value: 'Standard / Full' },
        { label: 'Care Instructions', value: 'Machine wash cold, tumble dry low' },
        { label: 'Country of Origin', value: 'India' }
      ],
      techSpecs: [
        { label: 'Fabric Weight', value: '180 GSM' },
        { label: 'Weave Type', value: 'Combed Compact' }
      ]
    };
  }

  // 2. Mobile Tech & Smartphones
  if (category.includes('mobile') || category.includes('phone')) {
    return {
      highlights: [
        'Stunning high-refresh display with vivid OLED technology',
        'Advanced multi-lens camera setup with AI scene optimization',
        'All-day battery life with fast charging capabilities'
      ],
      keyAttributes: [
        { label: 'Display Size', value: '6.7-inch Super Retina' },
        { label: 'RAM', value: product.specs?.ram || '8 GB' },
        { label: 'Storage', value: product.specs?.storage || '128 GB / 256 GB' },
        { label: 'Operating System', value: 'Android 14 / iOS' },
        { label: 'Battery Capacity', value: '5000 mAh' },
        { label: 'Fast Charging', value: '67W Super Fast Charge' },
        { label: 'Main Camera', value: '50 MP + 12 MP + 8 MP' },
        { label: 'Front Camera', value: '32 MP HD' },
        { label: 'Connectivity', value: '5G Dual SIM, Wi-Fi 6, Bluetooth 5.3' },
        { label: 'Biometrics', value: 'In-display Fingerprint & Face Unlock' },
        { label: 'In The Box', value: 'Smartphone, Type-C Cable, SIM Ejector, Documentation' }
      ],
      techSpecs: [
        { label: 'Processor Chipset', value: 'Octa-Core 4nm Processor' },
        { label: 'Display Resolution', value: '2400 x 1080 Pixels (FHD+)' },
        { label: 'Refresh Rate', value: '120 Hz' }
      ]
    };
  }

  // 3. Footwear / Shoes
  if (category.includes('footwear') || category.includes('shoe') || category.includes('sneaker')) {
    return {
      highlights: [
        'Ergonomic cushioned midsole for high impact absorption',
        'Breathable mesh upper keeps feet cool and dry',
        'Anti-skid rubber outsole with multi-surface traction grid'
      ],
      keyAttributes: [
        { label: 'Outer Material', value: 'Breathable Mesh & Synthetic' },
        { label: 'Sole Material', value: 'EVA Rubber' },
        { label: 'Closure', value: 'Lace-Up' },
        { label: 'Ankle Height', value: 'Low-Top' },
        { label: 'Insole', value: 'Memory Foam Cushioning' },
        { label: 'Warranty', value: '3 Months Manufacturer Defect Warranty' }
      ],
      techSpecs: [
        { label: 'Arch Type', value: 'Neutral Support' },
        { label: 'Weight (Single Shoe)', value: '280 grams' }
      ]
    };
  }

  // 4. Beauty & Personal Care
  if (category.includes('beauty') || category.includes('care') || category.includes('skincare')) {
    return {
      highlights: [
        'Dermatologically tested formulation safe for sensitive skin',
        'Dermatologist-recommended active ingredients',
        'Cruelty-free, paraben-free, and 100% vegan ingredients'
      ],
      keyAttributes: [
        { label: 'Skin Type', value: 'All Skin Types' },
        { label: 'Item Volume', value: '50 ml / 1.7 fl. oz.' },
        { label: 'Formulation', value: 'Lightweight Liquid Serum' },
        { label: 'Key Ingredients', value: 'Hyaluronic Acid, Niacinamide, Vitamin C' },
        { label: 'Expiry Date', value: '24 Months from Manufacturing' },
        { label: 'Country of Origin', value: 'India' }
      ],
      techSpecs: [
        { label: 'pH Level', value: '5.5 Balanced' },
        { label: 'Safety Standard', value: 'Dermatologically Approved' }
      ]
    };
  }

  // 5. Electronics & Laptops (Default for tech/computers)
  return {
    highlights: [
      'Superb processing efficiency and next-generation architecture',
      'Rich, high-fidelity color representation and resolution',
      'Highly durable build quality with extended component longevity'
    ],
    keyAttributes: [
      { label: 'Processor', value: product.specs?.processor || 'Intel Core i7 12th Gen' },
      { label: 'RAM', value: product.specs?.ram || '16 GB' },
      { label: 'Storage', value: product.specs?.storage || '512 GB SSD' },
      { label: 'Display Size', value: product.specs?.display || '15.6 Inch' },
      { label: 'Screen Resolution', value: product.specs?.resolution || '1920 x 1080 (FHD)' },
      { label: 'Graphics', value: product.specs?.gpu || 'Integrated HD Graphics' },
      { label: 'Operating System', value: product.specs?.os || 'Windows 11 Home' },
      { label: 'Battery Backup', value: 'Up to 8 Hours' },
      { label: 'Connectivity', value: 'Wi-Fi 6, Bluetooth 5.2, USB Type-C' },
      { label: 'Warranty Period', value: '1 Year Standard Brand Warranty' },
      { label: 'In The Box Contents', value: `${product.title}, Power Adapter, User Manual` }
    ],
    techSpecs: [
      { label: 'Processor', value: product.specs?.processor || 'Intel Core i7 12th Gen' },
      { label: 'RAM', value: product.specs?.ram || '16 GB' },
      { label: 'Storage', value: product.specs?.storage || '512 GB SSD' }
    ]
  };
};

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
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const galleryImages = product.images || [product.image];
  const dynamicSpecs = getProductSpecifications(product);

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 max-w-7xl mx-auto relative">
      {/* Top Navigation */}
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

      {/* Main Product Hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs mb-8">
        {/* Images Column */}
        <div className="flex flex-col gap-4">
          <div className="h-80 sm:h-[420px] w-full bg-slate-100 rounded-2xl overflow-hidden relative">
            <img 
              src={selectedImage || product.image} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
            {product.discount && (
              <span className="absolute top-3 left-3 bg-amber-500 text-black text-xs font-extrabold px-2.5 py-1 rounded-md shadow-xs">
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

        {/* Info Column */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider block mb-1">
              {product.category || 'General'}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug mb-2">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating || '4.5'}</span>
              </div>
              <span className="text-xs text-slate-400">({product.reviews || '0'} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-medium text-slate-400 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {product.description || `Premium quality ${product.title} designed for maximum satisfaction and durability.`}
            </p>

            {/* Key Features & Highlights */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Key Features & Highlights
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {dynamicSpecs.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
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
            {/* Purchase Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button 
                onClick={handleAddToCart}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm transition cursor-pointer active:scale-95 shadow-md shadow-indigo-100"
              >
                Buy Now
              </button>
            </div>

            {/* Service badges */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-indigo-600 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Free Shipping</p>
                  <p className="text-slate-400">On orders over ₹499</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">100% Secure</p>
                  <p className="text-slate-400">Encrypted Checkout</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-4 h-4 text-slate-500 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Non-returnable</p>
                  <p className="text-slate-400">Final sale item</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Specifications & Details Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
          Specifications & Product Details
        </h2>

        <h3 className="text-sm font-bold text-slate-800 mb-3">Key Attributes</h3>
        <div className="divide-y divide-slate-100 text-xs sm:text-sm mb-8">
          {dynamicSpecs.keyAttributes.map((attr, index) => (
            <div key={index} className="grid grid-cols-2 py-3">
              <span className="text-slate-500 font-medium">{attr.label}</span>
              <span className="text-slate-800 font-medium">{attr.value}</span>
            </div>
          ))}
        </div>

        {dynamicSpecs.techSpecs.length > 0 && (
          <>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              Technical Specifications
            </h2>
            <div className="divide-y divide-slate-100 text-xs sm:text-sm mb-8">
              {dynamicSpecs.techSpecs.map((tech, index) => (
                <div key={index} className="grid grid-cols-2 py-3">
                  <span className="text-slate-500 font-medium">{tech.label}</span>
                  <span className="text-slate-800 font-medium">{tech.value}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
          Warranty & Shipping
        </h2>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
          Customer Reviews
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          No reviews yet. Be the first to review this product!
        </p>
      </div>

      {/* Modal Auth */}
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