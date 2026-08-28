const express = require("express");

const {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All order routes require login
router.use(protect);

// Create order
router.post("/", createOrder);

// Get current user's orders
router.get("/", getMyOrders);

// Get single order
router.get("/:id", getOrderById);

// Cancel order
router.put("/:id/cancel", cancelOrder);

module.exports = router;