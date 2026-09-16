const express = require("express");

const {
    getAllUsers,
    deleteUser,
    toggleBlockUser,
    getDashboardStats
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Admin dashboard
router.get("/dashboard", protect, admin, getDashboardStats);

// User management
router.get("/users", protect, admin, getAllUsers);
router.delete("/users/:id", protect, admin, deleteUser);
router.put("/users/:id/block", protect, admin, toggleBlockUser);

module.exports = router;