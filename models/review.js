const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",

    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("Review", reviewSchema);