import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2,
  Image,
  DollarSign,
  Package,
  AlertCircle,
  Loader2
} from 'lucide-react';
import API from '../services/api';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '',
    isFeatured: false,
    isActive: true,
    images: [],
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setFetchingCategories(true);
    try {
      const response = await API.get('/categories');
      console.log('Categories response:', response.data);
      
      if (response.data.success && response.data.data.length > 0) {
        setCategories(response.data.data);
      } else {
        // ✅ FIXED: Real ObjectId format use karein
        setCategories([
          { _id: '65f8a1b2c3d4e5f6a7b8c9d0', name: 'Electronics' },
          { _id: '65f8a1b2c3d4e5f6a7b8c9d1', name: 'Fashion' },
          { _id: '65f8a1b2c3d4e5f6a7b8c9d2', name: 'Home & Kitchen' },
          { _id: '65f8a1b2c3d4e5f6a7b8c9d3', name: 'Books' },
          { _id: '65f8a1b2c3d4e5f6a7b8c9d4', name: 'Sports' },
          { _id: '65f8a1b2c3d4e5f6a7b8c9d5', name: 'Beauty' },
          { _id: '65f8a1b2c3d4e5f6a7b8c9d6', name: 'Toys' },
        ]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // ✅ FIXED: Real ObjectId format
      setCategories([
        { _id: '65f8a1b2c3d4e5f6a7b8c9d0', name: 'Electronics' },
        { _id: '65f8a1b2c3d4e5f6a7b8c9d1', name: 'Fashion' },
        { _id: '65f8a1b2c3d4e5f6a7b8c9d2', name: 'Home & Kitchen' },
        { _id: '65f8a1b2c3d4e5f6a7b8c9d3', name: 'Books' },
        { _id: '65f8a1b2c3d4e5f6a7b8c9d4', name: 'Sports' },
      ]);
      toast.error('Could not load categories. Using default categories.');
    } finally {
      setFetchingCategories(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageAdd = () => {
    const url = prompt('Enter image URL:');
    if (url && url.trim()) {
      try {
        new URL(url.trim());
        setImageUrls([...imageUrls, url.trim()]);
        setFormData({
          ...formData,
          images: [...formData.images, { url: url.trim(), publicId: `img_${Date.now()}` }],
        });
      } catch {
        toast.error('Please enter a valid image URL');
      }
    }
  };

  const handleImageRemove = (index) => {
    const newImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImages);
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.stock || Number(formData.stock) < 0) newErrors.stock = 'Valid stock is required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        category: formData.category,  // ✅ This is now a real ObjectId
        stock: parseInt(formData.stock),
        images: formData.images,
        isFeatured: formData.isFeatured,
        isActive: formData.isActive,
      };

      console.log('Submitting product:', payload);

      const response = await API.post('/products', payload);
      
      if (response.data.success) {
        toast.success('Product created successfully! 🎉');
        navigate('/products');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/products')}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Add New Product</h1>
            <p className="text-slate-500 text-sm mt-0.5">Fill in the details to add a new product</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/products')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Product
              </>
            )}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.name ? 'border-red-500' : 'border-slate-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter product description"
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.description ? 'border-red-500' : 'border-slate-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Pricing & Stock</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                      errors.price ? 'border-red-500' : 'border-slate-200'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                  />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.price}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Original Price ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Stock <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                      errors.stock ? 'border-red-500' : 'border-slate-200'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
                  />
                </div>
                {errors.stock && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.stock}
                  </p>
                )}
              </div>

              {/* ✅ CATEGORY */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.category ? 'border-red-500' : 'border-slate-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white`}
                >
                  <option value="">Select category</option>
                  {fetchingCategories ? (
                    <option value="" disabled>Loading categories...</option>
                  ) : categories.length === 0 ? (
                    <option value="" disabled>No categories available</option>
                  ) : (
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))
                  )}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.category}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Product Images</h3>
              <button
                onClick={handleImageAdd}
                className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center gap-1.5 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Image
              </button>
            </div>

            {imageUrls.length === 0 ? (
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
                <Image className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500">No images added yet</p>
                <p className="text-sm text-slate-400">Click "Add Image" to add product images</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-xl border border-slate-200"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                      }}
                    />
                    <button
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Status</h3>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Active</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-slate-700">Featured Product</span>
              </label>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <h4 className="font-semibold text-slate-800 mb-2">💡 Quick Tips</h4>
            <ul className="text-sm text-slate-600 space-y-1.5">
              <li>• Use clear product names</li>
              <li>• Add detailed descriptions</li>
              <li>• Upload high-quality images</li>
              <li>• Set competitive prices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;