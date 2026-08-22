const express = require("express");

const {
    registerUser,
    loginUser,
    getCurrentUser
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// AUTH ROUTES
// =========================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get current logged-in user
router.get("/me", protect, getCurrentUser);

module.exports = router;