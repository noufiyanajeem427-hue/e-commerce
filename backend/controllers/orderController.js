const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// =========================
// CREATE ORDER
// =========================
const createOrder = async (req, res) => {
    try {
        const {
            items,
            shippingAddress,
            paymentMethod,
            subtotal: bodySubtotal,
            shippingCost: bodyShippingCost,
            tax: bodyTax,
            discount: bodyDiscount,
            total: bodyTotal
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

        let orderItems = [];
        let calculatedSubtotal = 0;

        // If items are passed directly in body (e.g. from frontend checkout)
        if (Array.isArray(items) && items.length > 0) {
            for (const item of items) {
                const prodId = item.product?._id || item.product?.id || item.product || item.productId;
                let prod = null;
                if (typeof prodId === "string" && prodId.match(/^[0-9a-fA-F]{24}$/)) {
                    prod = await Product.findById(prodId);
                }

                const unitPrice = prod ? prod.price : (item.price || item.product?.price || 0);
                const qty = item.quantity || 1;
                calculatedSubtotal += unitPrice * qty;

                orderItems.push({
                    product: prod ? prod._id : (typeof prodId === "string" && prodId.match(/^[0-9a-fA-F]{24}$/) ? prodId : undefined),
                    quantity: qty,
                    price: unitPrice,
                    variant: item.variant || (item.selectedSize ? `${item.selectedSize}/${item.selectedColor || "Default"}` : undefined)
                });

                if (prod && prod.stock >= qty) {
                    await Product.findByIdAndUpdate(prod._id, { $inc: { stock: -qty } });
                }
            }
        } else {
            // Otherwise use cart from DB
            const cart = await Cart.findOne({
                user: req.user._id
            }).populate("items.product");

            if (!cart || cart.items.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Your cart is empty"
                });
            }

            for (const item of cart.items) {
                const product = item.product;
                if (!product) continue;

                const itemTotal = product.price * item.quantity;
                calculatedSubtotal += itemTotal;

                orderItems.push({
                    product: product._id,
                    quantity: item.quantity,
                    price: product.price,
                    variant: item.variant
                });

                await Product.findByIdAndUpdate(product._id, {
                    $inc: { stock: -item.quantity }
                });
            }

            // Clear cart
            cart.items = [];
            await cart.save();
        }

        if (orderItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No items provided for the order"
            });
        }

        const subtotal = bodySubtotal !== undefined ? Number(bodySubtotal) : calculatedSubtotal;
        const shippingCost = bodyShippingCost !== undefined ? Number(bodyShippingCost) : (subtotal >= 1000 ? 0 : 50);
        const tax = bodyTax !== undefined ? Number(bodyTax) : (subtotal * 0.05);
        const discount = bodyDiscount !== undefined ? Number(bodyDiscount) : 0;
        const total = bodyTotal !== undefined ? Number(bodyTotal) : (subtotal + shippingCost + tax - discount);

        const order = await Order.create({
            user: req.user ? req.user._id : undefined,
            items: orderItems,
            shippingAddress: typeof shippingAddress === "object" ? shippingAddress : { street: String(shippingAddress) },
            paymentMethod,
            subtotal,
            shippingCost,
            tax,
            total,
            status: "pending"
        });

        const createdOrder = await Order.findById(order._id)
            .populate("items.product", "name price images")
            .populate("user", "name email");

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: createdOrder,
            data: createdOrder
        });

    } catch (error) {
        console.error("Create order error:", error.message);

        res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
};


// =========================
// GET ALL ORDERS (Admin / Dashboard)
// =========================
const getAllOrders = async (req, res) => {
    try {
        const { status, page = 1, limit = 50 } = req.query;
        const filter = {};

        if (status && status.trim()) {
            filter.status = status.toLowerCase().trim();
        }

        const pageNumber = Math.max(Number(page), 1);
        const limitNumber = Math.min(Math.max(Number(limit), 1), 100);
        const skip = (pageNumber - 1) * limitNumber;

        const [orders, total] = await Promise.all([
            Order.find(filter)
                .populate("items.product", "name price images")
                .populate("user", "name email phone")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNumber),

            Order.countDocuments(filter)
        ]);

        res.status(200).json({
            success: true,
            orders,
            data: orders,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                total,
                pages: Math.ceil(total / limitNumber) || 1
            }
        });

    } catch (error) {
        console.error("Get all orders error:", error.message);

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
        // If admin or seller, and wants all orders, check query or role
        const filter = (req.user?.role === "admin" && req.query.my !== "true")
            ? {}
            : { user: req.user._id };

        if (req.query.status) {
            filter.status = req.query.status.toLowerCase().trim();
        }

        const orders = await Order.find(filter)
            .populate("items.product", "name price images")
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders,
            data: orders
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
        const order = await Order.findById(req.params.id)
            .populate("items.product", "name price images")
            .populate("user", "name email phone");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            order,
            data: order
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
// UPDATE ORDER STATUS (Admin/Seller)
// =========================
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

        if (!status || !validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        const prevStatus = order.status;
        order.status = status.toLowerCase();

        // If cancelled from active state, return stock
        if (order.status === "cancelled" && prevStatus !== "cancelled") {
            for (const item of order.items) {
                if (item.product) {
                    await Product.findByIdAndUpdate(item.product, {
                        $inc: { stock: item.quantity }
                    });
                }
            }
        }

        await order.save();

        const updatedOrder = await Order.findById(order._id)
            .populate("items.product", "name price images")
            .populate("user", "name email");

        res.status(200).json({
            success: true,
            message: `Order status updated to ${status}`,
            order: updatedOrder,
            data: updatedOrder
        });

    } catch (error) {
        console.error("Update order status error:", error.message);

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
            if (item.product) {
                await Product.findByIdAndUpdate(
                    item.product,
                    {
                        $inc: {
                            stock: item.quantity
                        }
                    }
                );
            }
        }

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order,
            data: order
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
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder
};