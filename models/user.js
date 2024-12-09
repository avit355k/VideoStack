const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // Removes whitespace from both ends
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address',
        ],
    },
    password: {
        type: String,
        required: true,
        // Ensures password has at least 6 characters
    },
    address: {
        type: String,
        required: true,

    },
    avatar: {
        type: String,
        default: "images/logo/user.png",
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', 'admin'],
    },
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        }
    ],
    otp: {
        type: Number,
    },
    otpExpiry: {
        type: Date,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
