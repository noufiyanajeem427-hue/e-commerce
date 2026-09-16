const express = require("express");

const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All wishlist routes require login
router.use(protect);

// Get current user's wishlist
router.get("/", getWishlist);

// Add product to wishlist
router.post("/", addToWishlist);

// Remove product from wishlist
router.delete("/:productId", removeFromWishlist);

// Clear wishlist
router.delete("/", clearWishlist);

module.exports = router;