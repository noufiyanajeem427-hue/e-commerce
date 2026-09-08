import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Store, ArrowRight } from 'lucide-react';
import { loginUser } from '../store/authSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate('/');
    } catch (error) {
      // Error handled in slice
    }
  };

  return (
    <div className="auth-container">
      {/* Decorative Circles */}
      <div 
        className="deco-circle animate-float"
        style={{
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'rgba(59, 130, 246, 0.06)',
        }}
      />
      <div 
        className="deco-circle animate-float-delayed"
        style={{
          bottom: '-25%',
          left: '-12%',
          width: '450px',
          height: '450px',
          background: 'rgba(79, 70, 229, 0.06)',
        }}
      />

      {/* Login Card */}
      <div className="auth-card">
        {/* Logo */}
        <div className="text-center">
          <div className="auth-logo">
            <Store />
          </div>
          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-subtitle">Sign in to manage your store</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                className="input-field"
                placeholder="admin@shop.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;