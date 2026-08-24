const express = require("express");

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// PRODUCT ROUTES
// =========================

// Get all products
router.get("/", getProducts);

// Get single product
router.get("/:id", getProductById);

// Create product - login required
router.post("/", protect, createProduct);

// Update product - login required
router.put("/:id", protect, updateProduct);

// Delete product - login required
router.delete("/:id", protect, deleteProduct);

module.exports = router;