const Review = require("../models/Review");
const Product = require("../models/Product");

// =========================
// CREATE REVIEW
// =========================
const createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        if (!productId || !rating) {
            return res.status(400).json({
                success: false,
                message: "Product ID and rating are required"
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Prevent the same user from reviewing the same product twice
        const existingReview = await Review.findOne({
            user: req.user._id,
            product: productId
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product"
            });
        }

        const review = await Review.create({
            user: req.user._id,
            product: productId,
            rating,
            comment
        });

        const createdReview = await Review.findById(review._id)
            .populate("user", "name")
            .populate("product", "name");

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            review: createdReview
        });

    } catch (error) {
        console.error("Create review error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// GET PRODUCT REVIEWS
// =========================
const getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            product: req.params.productId
        })
            .populate("user", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            reviews
        });

    } catch (error) {
        console.error("Get reviews error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// UPDATE REVIEW
// =========================
const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const review = await Review.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        if (rating !== undefined) {
            if (rating < 1 || rating > 5) {
                return res.status(400).json({
                    success: false,
                    message: "Rating must be between 1 and 5"
                });
            }

            review.rating = rating;
        }

        if (comment !== undefined) {
            review.comment = comment;
        }

        await review.save();

        const updatedReview = await Review.findById(review._id)
            .populate("user", "name")
            .populate("product", "name");

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            review: updatedReview
        });

    } catch (error) {
        console.error("Update review error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// DELETE REVIEW
// =========================
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        await Review.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {
        console.error("Delete review error:", error.message);

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
    createReview,
    getProductReviews,
    updateReview,
    deleteReview
};