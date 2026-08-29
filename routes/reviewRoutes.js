const express = require("express");

const {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get reviews for a product
router.get("/product/:productId", getProductReviews);

// All write operations require login
router.post("/", protect, createReview);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

module.exports = router;