const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// =========================
// CREATE ORDER
// =========================
const createOrder = async (req, res) => {
    try {
        const {
            shippingAddress,
            paymentMethod
        } = req.body;

        if (!shippingAddress) {
            return res.status(400).json({
                success: false,
                message: "Shipping address is required"
            });
        }

        if (!paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Payment method is required"
            });
        }

        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty"
            });
        }

        let subtotal = 0;
        const orderItems = [];

        for (const item of cart.items) {
            const product = item.product;

            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: "A product in your cart no longer exists"
                });
            }

            if (!product.isActive) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} is not available`
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Not enough stock for ${product.name}`
                });
            }

            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price,
                variant: item.variant
            });
        }

        // Basic totals
        const shippingCost = subtotal >= 1000 ? 0 : 50;
        const tax = subtotal * 0.05;
        const total = subtotal + shippingCost + tax;

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            subtotal,
            shippingCost,
            tax,
            total,
            status: "pending"
        });

        // Reduce product stock
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(
                item.product._id,
                {
                    $inc: {
                        stock: -item.quantity
                    }
                }
            );
        }

        // Clear cart
        cart.items = [];
        await cart.save();

        const createdOrder = await Order.findById(order._id)
            .populate("items.product", "name price images")
            .populate("user", "name email");

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: createdOrder
        });

    } catch (error) {
        console.error("Create order error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// GET MY ORDERS
// =========================
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        })
            .populate("items.product", "name price images")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error("Get my orders error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// GET SINGLE ORDER
// =========================
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        })
            .populate("items.product", "name price images")
            .populate("user", "name email");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Get order error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// CANCEL ORDER
// =========================
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (order.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "Only pending orders can be cancelled"
            });
        }

        order.status = "cancelled";

        await order.save();

        // Return stock
        for (const item of order.items) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: item.quantity
                    }
                }
            );
        }

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order
        });

    } catch (error) {
        console.error("Cancel order error:", error.message);

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
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder
};