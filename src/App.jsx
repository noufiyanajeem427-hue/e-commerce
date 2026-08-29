import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingpage/Landingpage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import TrendingProductsPage from './pages/landingpage/TrendingProductsPage';
import FeaturedBrandsPage from './pages/landingpage/FeaturedBrandsPage';
import AllProductsPage from './pages/landingpage/AllProductsPage';
import DealsAndOffersPage from './pages/landingpage/DealsAndOffersPage'; 
import ProductDetailPage from './pages/landingpage/ProductDetailPage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/landingpage/CartPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/trending-products" element={<TrendingProductsPage />} />
          <Route path="/featured-brands" element={<FeaturedBrandsPage />} />
          <Route path="/all-products" element={<AllProductsPage />} />
          <Route path="/deals" element={<DealsAndOffersPage />} /> 
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;