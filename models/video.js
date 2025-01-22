const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
        enum: ['Drama', 'Thriller', 'Comedy', 'Romance', 'Anime', 'Action', 'Horror', 'Biography', 'Sports','Science Fiction', 'Music',],
    },
    category: {
        type: String,
        required: true,
        enum: ['CD', 'DVD'],
    },
    language: {
        type: String,
        required: true,
        enum: ['Hindi', 'English', 'Bengali', 'Malayalam', 'Telegu', 'Tamil']
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    avgrating: {
        type: Number,
        default: 0, // Average rating
    },
    reviewCount: {
        type: Number,
        default: 0, // Number of reviews
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Video', videoSchema);
