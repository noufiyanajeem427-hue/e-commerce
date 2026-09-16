const express = require("express");

const {
    createCoupon,
    getCoupons,
    getCouponByCode,
    updateCoupon,
    deleteCoupon
} = require("../controllers/couponController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create coupon
router.post("/", protect, createCoupon);

// Get all coupons
router.get("/", protect, getCoupons);

// Get coupon by code
router.get("/code/:code", protect, getCouponByCode);

// Update coupon
router.put("/:id", protect, updateCoupon);

// Delete coupon
router.delete("/:id", protect, deleteCoupon);

module.exports = router;