const express = require("express");

const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All cart routes require login
router.use(protect);

// Get current user's cart
router.get("/", getCart);

// Add product to cart
router.post("/", addToCart);

// Update cart item quantity
router.put("/:itemId", updateCartItem);

// Remove item from cart
router.delete("/:itemId", removeFromCart);

// Clear entire cart
router.delete("/", clearCart);

module.exports = router;