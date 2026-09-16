const Coupon = require("../models/Coupon");

// =========================
// CREATE COUPON
// =========================
const createCoupon = async (req, res) => {
    try {
        const {
            code,
            discountType,
            discountValue,
            minimumOrderValue,
            maximumDiscount,
            expiryDate,
            usageLimit,
            isActive
        } = req.body;

        if (!code || !discountType || discountValue === undefined || !expiryDate) {
            return res.status(400).json({
                success: false,
                message: "Code, discount type, discount value and expiry date are required"
            });
        }

        if (!["percentage", "fixed"].includes(discountType)) {
            return res.status(400).json({
                success: false,
                message: "Discount type must be percentage or fixed"
            });
        }

        if (discountValue <= 0) {
            return res.status(400).json({
                success: false,
                message: "Discount value must be greater than 0"
            });
        }

        if (
            discountType === "percentage" &&
            discountValue > 100
        ) {
            return res.status(400).json({
                success: false,
                message: "Percentage discount cannot exceed 100"
            });
        }

        const existingCoupon = await Coupon.findOne({
            code: code.toUpperCase()
        });

        if (existingCoupon) {
            return res.status(400).json({
                success: false,
                message: "Coupon code already exists"
            });
        }

        const coupon = await Coupon.create({
            code: code.toUpperCase(),
            discountType,
            discountValue,
            minimumOrderValue,
            maximumDiscount,
            expiryDate,
            usageLimit,
            isActive: isActive !== undefined ? isActive : true,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Coupon created successfully",
            coupon
        });

    } catch (error) {
        console.error("Create coupon error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// GET ALL COUPONS
// =========================
const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            coupons
        });

    } catch (error) {
        console.error("Get coupons error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// GET COUPON BY CODE
// =========================
const getCouponByCode = async (req, res) => {
    try {
        const code = req.params.code.toUpperCase();

        const coupon = await Coupon.findOne({
            code,
            isActive: true
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found or inactive"
            });
        }

        // Check expiry
        if (new Date(coupon.expiryDate) < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Coupon has expired"
            });
        }

        // Check usage limit
        if (
            coupon.usageLimit !== undefined &&
            coupon.usedCount >= coupon.usageLimit
        ) {
            return res.status(400).json({
                success: false,
                message: "Coupon usage limit reached"
            });
        }

        res.status(200).json({
            success: true,
            coupon
        });

    } catch (error) {
        console.error("Get coupon error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// UPDATE COUPON
// =========================
const updateCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        if (req.body.code) {
            req.body.code = req.body.code.toUpperCase();

            const existingCoupon = await Coupon.findOne({
                code: req.body.code,
                _id: { $ne: coupon._id }
            });

            if (existingCoupon) {
                return res.status(400).json({
                    success: false,
                    message: "Coupon code already exists"
                });
            }
        }

        Object.assign(coupon, req.body);

        const updatedCoupon = await coupon.save();

        res.status(200).json({
            success: true,
            message: "Coupon updated successfully",
            coupon: updatedCoupon
        });

    } catch (error) {
        console.error("Update coupon error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// DELETE COUPON
// =========================
const deleteCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        await Coupon.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Coupon deleted successfully"
        });

    } catch (error) {
        console.error("Delete coupon error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// EXPORT
// =========================
module.exports = {
    createCoupon,
    getCoupons,
    getCouponByCode,
    updateCoupon,
    deleteCoupon
};