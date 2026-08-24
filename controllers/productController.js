const Product = require("../models/Product");

// =========================
// CREATE PRODUCT
// =========================
const createProduct = async (req, res) => {
    try {
        const {
            name,
            slug,
            description,
            shortDescription,
            price,
            originalPrice,
            discount,
            category,
            brand,
            sku,
            images,
            variants,
            specifications,
            tags,
            stock,
            isActive,
            isFeatured
        } = req.body;

        // Required fields
        if (!name || !description || price === undefined || !category) {
            return res.status(400).json({
                success: false,
                message: "Name, description, price and category are required"
            });
        }

        // Check duplicate slug
        if (slug) {
            const existingSlug = await Product.findOne({ slug });

            if (existingSlug) {
                return res.status(400).json({
                    success: false,
                    message: "Product slug already exists"
                });
            }
        }

        // Check duplicate SKU
        if (sku) {
            const existingSku = await Product.findOne({ sku });

            if (existingSku) {
                return res.status(400).json({
                    success: false,
                    message: "Product SKU already exists"
                });
            }
        }

        const product = await Product.create({
            name,
            slug,
            description,
            shortDescription,
            price,
            originalPrice,
            discount,
            category,
            brand,
            sku,
            images,
            variants,
            specifications,
            tags,
            stock,
            isActive,
            isFeatured,
            createdBy: req.user ? req.user._id : undefined
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error("Create product error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// GET ALL PRODUCTS
// =========================
const getProducts = async (req, res) => {
    try {
        const {
            search,
            category,
            brand,
            minPrice,
            maxPrice,
            featured,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        // Only active products for normal listing
        filter.isActive = true;

        // Search
        if (search) {
            filter.$text = {
                $search: search
            };
        }

        // Category
        if (category) {
            filter.category = category;
        }

        // Brand
        if (brand) {
            filter.brand = brand;
        }

        // Price range
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};

            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // Featured
        if (featured !== undefined) {
            filter.isFeatured = featured === "true";
        }

        const pageNumber = Math.max(Number(page), 1);
        const limitNumber = Math.min(Math.max(Number(limit), 1), 100);
        const skip = (pageNumber - 1) * limitNumber;

        const [products, total] = await Promise.all([
            Product.find(filter)
                .populate("category", "name slug")
                .populate("createdBy", "name email")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNumber),

            Product.countDocuments(filter)
        ]);

        res.status(200).json({
            success: true,
            products,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                total,
                pages: Math.ceil(total / limitNumber)
            }
        });

    } catch (error) {
        console.error("Get products error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// GET SINGLE PRODUCT
// =========================
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category", "name slug")
            .populate("createdBy", "name email");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        console.error("Get product error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// UPDATE PRODUCT
// =========================
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Prevent duplicate slug
        if (req.body.slug && req.body.slug !== product.slug) {
            const existingSlug = await Product.findOne({
                slug: req.body.slug,
                _id: { $ne: product._id }
            });

            if (existingSlug) {
                return res.status(400).json({
                    success: false,
                    message: "Product slug already exists"
                });
            }
        }

        // Prevent duplicate SKU
        if (req.body.sku && req.body.sku !== product.sku) {
            const existingSku = await Product.findOne({
                sku: req.body.sku,
                _id: { $ne: product._id }
            });

            if (existingSku) {
                return res.status(400).json({
                    success: false,
                    message: "Product SKU already exists"
                });
            }
        }

        Object.assign(product, req.body);

        const updatedProduct = await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        console.error("Update product error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// DELETE PRODUCT
// =========================
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error("Delete product error:", error.message);

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
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};