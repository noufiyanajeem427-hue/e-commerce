const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ""
    },

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    selectedVariants: {
        type: Map,
        of: String
    }
});

const statusHistorySchema = new mongoose.Schema({
    status: {
        type: String,
        enum: [
            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled"
        ],
        required: true
    },

    note: {
        type: String
    },

    changedAt: {
        type: Date,
        default: Date.now
    }
});

const orderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: String,
            unique: true,
            index: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: {
            type: [orderItemSchema],
            required: true
        },

        shippingAddress: {
            fullName: {
                type: String,
                required: true
            },

            phone: {
                type: String,
                required: true
            },

            street: {
                type: String,
                required: true
            },

            city: {
                type: String,
                required: true
            },

            state: {
                type: String,
                required: true
            },

            pincode: {
                type: String,
                required: true
            },

            country: {
                type: String,
                default: "India"
            }
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "ONLINE"],
            required: true
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "pending",
            index: true
        },

        orderStatus: {
            type: String,
            enum: [
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled"
            ],
            default: "pending",
            index: true
        },

        statusHistory: {
            type: [statusHistorySchema],
            default: []
        },

        coupon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coupon",
            default: null
        },

        subtotal: {
            type: Number,
            required: true
        },

        shippingCharge: {
            type: Number,
            default: 0
        },

        taxAmount: {
            type: Number,
            default: 0
        },

        discountAmount: {
            type: Number,
            default: 0
        },

        totalAmount: {
            type: Number,
            required: true
        },

        estimatedDelivery: {
            type: Date
        },

        deliveredAt: {
            type: Date
        },

        cancelledAt: {
            type: Date
        },

        cancelReason: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

orderSchema.index({ orderNumber: 1 }, { unique: true });
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1 });

module.exports = mongoose.model("Order", orderSchema);