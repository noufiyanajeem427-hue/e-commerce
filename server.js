const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// =========================
// DATABASE CONNECTION
// =========================
connectDB();

// =========================
// MIDDLEWARE
// =========================
app.use(cors());
app.use(express.json());

// =========================
// AUTH ROUTES
// =========================
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// =========================
// TEST ROUTE
// =========================
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Shop Sathi Backend is running!"
    });
});

// =========================
// SERVER
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});