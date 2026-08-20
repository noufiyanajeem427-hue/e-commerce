const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            index: true,
            minlength: 3,
            maxlength: 20,
            uppercase: true,
            trim: true
        },

        discountType: {
            type: String,
            required: true,
            enum: ["percentage", "flat"]
        },

        discountValue: {
            type: Number,
            required: true,
            min: 0
        },

        minOrderAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        maxDiscount: {
            type: Number,
            default: null
        },

        usageLimit: {
            type: Number,
            default: null
        },

        usedCount: {
            type: Number,
            default: 0
        },

        perUserLimit: {
            type: Number,
            default: 1
        },

        usedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        isActive: {
            type: Boolean,
            default: true,
            index: true
        },

        expiresAt: {
            type: Date,
            required: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

// Active coupon validity queries
couponSchema.index({
    isActive: 1,
    expiresAt: 1
});

module.exports = mongoose.model("Coupon", couponSchema);