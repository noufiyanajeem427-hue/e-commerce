const express = require("express");

const {
    createOrder,
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all orders (admin / dashboard listing) - can be accessed with protect
router.get("/all", protect, getAllOrders);

// Get my orders / all orders depending on role
router.get("/", protect, getMyOrders);

// Create order
router.post("/", protect, createOrder);

// Get single order
router.get("/:id", protect, getOrderById);

// Update order status (Admin / Seller)
router.put("/:id/status", protect, updateOrderStatus);
router.patch("/:id/status", protect, updateOrderStatus);

// Cancel order
router.put("/:id/cancel", protect, cancelOrder);

module.exports = router;