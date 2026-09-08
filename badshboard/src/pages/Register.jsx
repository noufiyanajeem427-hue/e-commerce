import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Store, ArrowRight, Shield, Eye, EyeOff } from 'lucide-react';
import { registerUser } from '../store/authSlice';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      navigate('/login');
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

      {/* Register Card */}
      <div className="auth-card">
        {/* Logo */}
        <div className="text-center">
          <div className="auth-logo">
            <Store />
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Start managing your store today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="form-label">Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                type="text"
                name="name"
                className="input-field"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                className="input-field"
                placeholder="admin@shop.com"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                className="input-field"
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={handleChange}
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

          {/* Confirm Password */}
          <div>
            <label className="form-label">Confirm Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="input-field"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-2 text-sm text-gray-500" style={{ marginBottom: '20px' }}>
            <Shield size={16} className="text-blue-500" />
            <span>Your data is secure and encrypted</span>
          </div>

          {/* Submit */}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;