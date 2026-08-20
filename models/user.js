const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            default: "India"
        },
        isDefault: {
            type: Boolean,
            default: false
        }
    }
);

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        phone: {
            type: String
        },

        avatar: {
            url: {
                type: String,
                default: ""
            },
            publicId: {
                type: String,
                default: ""
            }
        },

        role: {
            type: String,
            enum: ["customer", "admin", "superadmin"],
            default: "customer",
            index: true
        },

        addresses: {
            type: [addressSchema],
            default: []
        },

        isBlocked: {
            type: Boolean,
            default: false,
            index: true
        },

        resetPasswordToken: {
            type: String
        },

        resetPasswordExpire: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);