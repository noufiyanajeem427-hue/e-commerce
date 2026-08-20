const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    isMain: {
        type: Boolean,
        default: false
    }
});

const variantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    }
});

const specificationSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 200,
            trim: true
        },

        slug: {
            type: String,
            unique: true,
            index: true,
            lowercase: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        shortDescription: {
            type: String,
            maxlength: 300
        },

        price: {
            type: Number,
            required: true,
            min: 0,
            index: true
        },

        originalPrice: {
            type: Number,
            min: 0
        },

        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        brand: {
            type: String,
            trim: true,
            index: true
        },

        sku: {
            type: String,
            unique: true,
            sparse: true,
            uppercase: true,
            trim: true
        },

        images: {
            type: [imageSchema],
            default: []
        },

        variants: {
            type: [variantSchema],
            default: []
        },

        specifications: {
            type: [specificationSchema],
            default: []
        },

        tags: {
            type: [String],
            default: []
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            index: true
        },

        isActive: {
            type: Boolean,
            default: true,
            index: true
        },

        isFeatured: {
            type: Boolean,
            default: false,
            index: true
        },

        ratings: {
            average: {
                type: Number,
                default: 0,
                min: 0,
                max: 5,
                index: true
            },
            count: {
                type: Number,
                default: 0
            }
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

// Text search index
productSchema.index({
    name: "text",
    description: "text",
    tags: "text",
    brand: "text"
});

// Compound indexes
productSchema.index({ isActive: 1, isFeatured: 1 });
productSchema.index({ isActive: 1, price: 1 });

module.exports = mongoose.model("Product", productSchema);