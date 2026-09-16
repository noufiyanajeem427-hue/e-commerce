const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");

// =========================
// CREATE PRODUCT
// =========================
const createProduct = async (req, res) => {
    try {
        let {
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

        // Auto resolve category to ObjectId
        let categoryId = category;
        if (category && (!mongoose.Types.ObjectId.isValid(category) || typeof category === "string")) {
            let catDoc = null;
            if (mongoose.Types.ObjectId.isValid(category)) {
                catDoc = await Category.findById(category);
            }
            if (!catDoc) {
                catDoc = await Category.findOne({
                    $or: [
                        { name: new RegExp(`^${category}$`, "i") },
                        { slug: new RegExp(`^${category}$`, "i") }
                    ]
                });
            }
            if (!catDoc) {
                const catSlug = typeof category === "string" ? category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") : "general";
                catDoc = await Category.create({
                    name: typeof category === "string" ? category : "General",
                    slug: catSlug || `cat-${Date.now()}`
                });
            }
            categoryId = catDoc._id;
        }

        // Auto generate slug if not provided
        if (!slug && name) {
            slug = name
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
            slug = `${slug}-${Date.now().toString(36)}`;
        }

        // Check duplicate slug
        if (slug) {
            const existingSlug = await Product.findOne({ slug });
            if (existingSlug) {
                slug = `${slug}-${Date.now().toString(36)}`;
            }
        }

        // Auto generate SKU if not provided
        if (!sku) {
            sku = `SKU-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
        }

        // Normalize images
        let formattedImages = [];
        if (Array.isArray(images)) {
            formattedImages = images.map((img, idx) => {
                if (typeof img === "string") {
                    return { url: img, publicId: `img_${Date.now()}_${idx}`, isMain: idx === 0 };
                }
                return {
                    url: img.url || "",
                    publicId: img.publicId || `img_${Date.now()}_${idx}`,
                    isMain: img.isMain || idx === 0
                };
            }).filter(img => img.url);
        } else if (typeof images === "string" && images.trim()) {
            formattedImages = [{ url: images.trim(), publicId: `img_${Date.now()}`, isMain: true }];
        }

        const product = await Product.create({
            name,
            slug,
            description,
            shortDescription: shortDescription || description.slice(0, 150),
            price: Number(price),
            originalPrice: originalPrice ? Number(originalPrice) : undefined,
            discount: discount ? Number(discount) : 0,
            category: categoryId,
            brand: brand || "Generic",
            sku,
            images: formattedImages,
            variants: variants || [],
            specifications: specifications || [],
            tags: tags || [],
            stock: stock !== undefined ? Number(stock) : 0,
            isActive: isActive !== undefined ? isActive : true,
            isFeatured: isFeatured !== undefined ? isFeatured : false,
            createdBy: req.user ? req.user._id : undefined
        });

        const populatedProduct = await Product.findById(product._id)
            .populate("category", "name slug")
            .populate("createdBy", "name email");

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: populatedProduct,
            data: populatedProduct
        });

    } catch (error) {
        console.error("Create product error:", error.message);

        res.status(500).json({
            success: false,
            message: error.message || "Server error"
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
            all,
            isActive,
            page = 1,
            limit = 50
        } = req.query;

        const filter = {};

        // If 'all' is explicitly true, don't restrict isActive; otherwise check isActive query or default true
        if (all === "true") {
            // Include both active and inactive (for admin/dashboard)
        } else if (isActive !== undefined) {
            filter.isActive = isActive === "true";
        } else {
            filter.isActive = true;
        }

        // Search with text or regex
        if (search && search.trim()) {
            filter.$or = [
                { name: { $regex: search.trim(), $options: "i" } },
                { description: { $regex: search.trim(), $options: "i" } },
                { brand: { $regex: search.trim(), $options: "i" } }
            ];
        }

        // Category
        if (category) {
            if (mongoose.Types.ObjectId.isValid(category)) {
                filter.category = category;
            } else {
                const catDoc = await Category.findOne({
                    $or: [
                        { name: new RegExp(`^${category}$`, "i") },
                        { slug: new RegExp(`^${category}$`, "i") }
                    ]
                });
                if (catDoc) {
                    filter.category = catDoc._id;
                } else {
                    filter.category = new mongoose.Types.ObjectId();
                }
            }
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
            data: products,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                total,
                pages: Math.ceil(total / limitNumber) || 1
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
        const idOrSlug = req.params.id;
        let product;

        if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
            product = await Product.findById(idOrSlug)
                .populate("category", "name slug")
                .populate("createdBy", "name email");
        }

        if (!product) {
            product = await Product.findOne({ slug: idOrSlug })
                .populate("category", "name slug")
                .populate("createdBy", "name email");
        }

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product,
            data: product
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

        Object.assign(product, req.body);

        const updatedProduct = await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
            data: updatedProduct
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
// TOGGLE PRODUCT STATUS
// =========================
const toggleProductStatus = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        product.isActive = !product.isActive;
        await product.save();

        res.status(200).json({
            success: true,
            message: `Product ${product.isActive ? "activated" : "deactivated"} successfully`,
            product,
            data: product
        });

    } catch (error) {
        console.error("Toggle product status error:", error.message);

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
    toggleProductStatus,
    deleteProduct
};