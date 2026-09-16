const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// =========================
// GET ALL USERS
// =========================
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {
        console.error("Get all users error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// DELETE USER
// =========================
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        console.error("Delete user error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// BLOCK / UNBLOCK USER
// =========================
const toggleBlockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.isBlocked = !user.isBlocked;

        await user.save();

        res.status(200).json({
            success: true,
            message: user.isBlocked
                ? "User blocked successfully"
                : "User unblocked successfully",
            isBlocked: user.isBlocked
        });

    } catch (error) {
        console.error("Toggle block user error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// GET ADMIN DASHBOARD STATS
// =========================
const getDashboardStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalProducts,
            totalOrders,
            revenueAggregation,
            recentOrdersRaw
        ] = await Promise.all([
            User.countDocuments({ role: "user" }),
            Product.countDocuments(),
            Order.countDocuments(),
            Order.aggregate([
                { $match: { status: { $ne: "cancelled" } } },
                { $group: { _id: null, totalRevenue: { $sum: "$total" } } }
            ]),
            Order.find()
                .populate("user", "name email")
                .populate("items.product", "name price images")
                .sort({ createdAt: -1 })
                .limit(5)
        ]);

        const totalRevenue = revenueAggregation[0]?.totalRevenue || 0;
        const totalCustomers = totalUsers > 0 ? totalUsers : await User.countDocuments();

        const recentOrders = recentOrdersRaw.map((o) => ({
            id: o._id.toString(),
            customer: o.user?.name || o.shippingAddress?.fullName || "Guest Customer",
            amount: o.total,
            status: o.status.charAt(0).toUpperCase() + o.status.slice(1),
            itemsCount: o.items.length,
            createdAt: o.createdAt
        }));

        const statsData = {
            totalRevenue,
            totalOrders,
            totalProducts,
            totalCustomers,
            revenueChange: 12.5,
            ordersChange: 8.2,
            productsChange: 3.1,
            customersChange: 5.4,
            recentOrders
        };

        res.status(200).json({
            success: true,
            stats: statsData,
            data: statsData
        });

    } catch (error) {
        console.error("Dashboard stats error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    getAllUsers,
    deleteUser,
    toggleBlockUser,
    getDashboardStats
};