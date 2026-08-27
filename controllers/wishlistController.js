const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// =========================
// GET WISHLIST
// =========================
const getWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({
            user: req.user._id
        }).populate("products");

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: req.user._id,
                products: []
            });
        }

        res.status(200).json({
            success: true,
            wishlist
        });

    } catch (error) {
        console.error("Get wishlist error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// ADD PRODUCT TO WISHLIST
// =========================
const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let wishlist = await Wishlist.findOne({
            user: req.user._id
        });

        if (!wishlist) {
            wishlist = new Wishlist({
                user: req.user._id,
                products: []
            });
        }

        // Check if product already exists
        const alreadyAdded = wishlist.products.some(
            id => id.toString() === productId
        );

        if (alreadyAdded) {
            return res.status(400).json({
                success: false,
                message: "Product already exists in wishlist"
            });
        }

        wishlist.products.push(productId);

        await wishlist.save();

        await wishlist.populate("products");

        res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            wishlist
        });

    } catch (error) {
        console.error("Add wishlist error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// REMOVE PRODUCT FROM WISHLIST
// =========================
const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({
            user: req.user._id
        });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found"
            });
        }

        const productExists = wishlist.products.some(
            id => id.toString() === productId
        );

        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: "Product is not in wishlist"
            });
        }

        wishlist.products = wishlist.products.filter(
            id => id.toString() !== productId
        );

        await wishlist.save();

        await wishlist.populate("products");

        res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
            wishlist
        });

    } catch (error) {
        console.error("Remove wishlist error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// CLEAR WISHLIST
// =========================
const clearWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({
            user: req.user._id
        });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found"
            });
        }

        wishlist.products = [];

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Wishlist cleared successfully",
            wishlist
        });

    } catch (error) {
        console.error("Clear wishlist error:", error.message);

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
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
};