const express = require("express");

const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// CATEGORY ROUTES
// =========================

// Get all categories
router.get("/", getCategories);

// Get single category
router.get("/:id", getCategoryById);

// Create category - login required
router.post("/", protect, createCategory);

// Update category - login required
router.put("/:id", protect, updateCategory);

// Delete category - login required
router.delete("/:id", protect, deleteCategory);

module.exports = router;