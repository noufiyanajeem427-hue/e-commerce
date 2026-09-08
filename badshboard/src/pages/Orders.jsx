import React, { useState, useEffect } from 'react';
import { Eye, Search, Package } from 'lucide-react';
import API from '../services/api';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      const url = statusFilter ? `/orders?status=${statusFilter}` : '/orders';
      const response = await API.get(url);
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
      if (selectedOrder) {
        const updated = await API.get(`/orders/${orderId}`);
        setSelectedOrder(updated.data.data);
      }
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const viewOrderDetail = async (orderId) => {
    try {
      const response = await API.get(`/orders/${orderId}`);
      setSelectedOrder(response.data.data);
      setShowDetail(true);
    } catch (error) {
      toast.error('Failed to fetch order details');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Orders</h1>
          <p className="page-subtitle">Manage and track customer orders</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <select
              className="input-modern"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200/60">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-500">Order #</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-500">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-500">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-500">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-dark-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-100/60 hover:bg-primary-50/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-dark-700">{order.orderNumber}</td>
                    <td className="py-3 px-4 text-dark-600">{order.user?.name || 'Unknown'}</td>
                    <td className="py-3 px-4 font-semibold text-dark-800">${order.totalAmount?.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.orderStatus] || 'bg-gray-100 text-gray-700'}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-dark-500 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => viewOrderDetail(order._id)}
                        className="p-1.5 rounded-lg hover:bg-primary-50 text-dark-400 hover:text-primary-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <p className="text-center text-dark-400 py-8">No orders found</p>
            )}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {showDetail && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-dark-800">Order Details</h2>
                <p className="text-sm text-dark-400">{selectedOrder.orderNumber}</p>
              </div>
              <button 
                onClick={() => { setShowDetail(false); setSelectedOrder(null); }}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-dark-400" />
              </button>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-dark-400">Status</p>
                <p className="font-semibold text-dark-800 capitalize">{selectedOrder.orderStatus}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-dark-400">Payment</p>
                <p className="font-semibold text-dark-800 capitalize">{selectedOrder.paymentMethod}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-dark-400">Total</p>
                <p className="font-semibold text-dark-800">${selectedOrder.totalAmount?.toFixed(2)}</p>
              </div>
            </div>

            {/* Status Update */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-dark-700 mb-2">Update Status</label>
              <div className="flex gap-2 flex-wrap">
                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(selectedOrder._id, status)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedOrder.orderStatus === status
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-dark-600 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="mb-4">
              <h3 className="font-semibold text-dark-800 mb-3">Items</h3>
              <div className="space-y-2">
                {selectedOrder.items?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-primary-600" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-dark-700">{item.name}</p>
                        <p className="text-sm text-dark-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-dark-800">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            {selectedOrder.shippingAddress && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-dark-800 mb-2">Shipping Address</h3>
                <p className="text-dark-600">{selectedOrder.shippingAddress.fullName}</p>
                <p className="text-dark-600">{selectedOrder.shippingAddress.street}</p>
                <p className="text-dark-600">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                <p className="text-dark-600">{selectedOrder.shippingAddress.country}</p>
                <p className="text-dark-600">Phone: {selectedOrder.shippingAddress.phone}</p>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <Button variant="secondary" onClick={() => { setShowDetail(false); setSelectedOrder(null); }}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;