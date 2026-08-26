const Cart = require("../models/Cart");
const Product = require("../models/Product");

// =========================
// GET USER CART
// =========================
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product");

        // Create empty cart if user doesn't have one
        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: []
            });
        }

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        console.error("Get cart error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// ADD ITEM TO CART
// =========================
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1, variant } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1"
            });
        }

        // Check product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (!product.isActive) {
            return res.status(400).json({
                success: false,
                message: "Product is not available"
            });
        }

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough stock available"
            });
        }

        let cart = await Cart.findOne({
            user: req.user._id
        });

        // Create cart if it doesn't exist
        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: []
            });
        }

        // Find existing item
        const existingItem = cart.items.find(
            item =>
                item.product.toString() === productId &&
                JSON.stringify(item.variant || {}) ===
                JSON.stringify(variant || {})
        );

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;

            if (newQuantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: "Requested quantity exceeds available stock"
                });
            }

            existingItem.quantity = newQuantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                variant
            });
        }

        await cart.save();

        await cart.populate("items.product");

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        console.error("Add to cart error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// UPDATE CART ITEM
// =========================
const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (quantity === undefined || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Valid quantity is required"
            });
        }

        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const item = cart.items.id(req.params.itemId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        const product = await Product.findById(item.product);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (quantity > product.stock) {
            return res.status(400).json({
                success: false,
                message: "Requested quantity exceeds available stock"
            });
        }

        item.quantity = quantity;

        await cart.save();

        await cart.populate("items.product");

        res.status(200).json({
            success: true,
            message: "Cart item updated",
            cart
        });

    } catch (error) {
        console.error("Update cart error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// REMOVE ITEM FROM CART
// =========================
const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const item = cart.items.id(req.params.itemId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        item.deleteOne();

        await cart.save();

        await cart.populate("items.product");

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
            cart
        });

    } catch (error) {
        console.error("Remove cart item error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// CLEAR CART
// =========================
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = [];

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            cart
        });

    } catch (error) {
        console.error("Clear cart error:", error.message);

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
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};