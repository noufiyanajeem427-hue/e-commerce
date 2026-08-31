const express = require("express");//express is a web application framework for Node.js that simplifies the process of building web applications and APIs. It provides a set of features and tools for handling HTTP requests, routing, middleware, and more.
const dotenv = require("dotenv");
const cors = require("cors");//cors is a middleware for Express.js that enables Cross-Origin Resource Sharing (CORS). CORS is a security feature implemented by web browsers that restricts web pages from making requests to a different domain than the one that served the web page. The cors middleware allows you to configure and enable CORS for your Express application, allowing it to handle requests from different origins.
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
// ROUTES
// =========================
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

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