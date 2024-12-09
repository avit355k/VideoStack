const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Review = require("../models/review");
const Video = require("../models/video");
const User = require('../models/user');
const { authenticateToken } = require("./userAuth");

// Add a review
router.post("/add-review", authenticateToken, async (req, res) => {
    try {
        const { videoid, id } = req.headers; // User ID and Video ID from headers
        const { rating, comment, name } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const video = await Video.findById(videoid);
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found." });
        }

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: "Rating must be between 1 and 5." });
        }

        const existingReview = await Review.findOne({ user: id, video: videoid });
        if (existingReview) {
            return res.status(400).json({ success: false, message: "You have already reviewed this video." });
        }

        const review = new Review({
            name,
            user: id,
            video: videoid,
            rating,
            comment,
        });

        await review.save();

        // Update video with new review details
        video.reviews.push(review._id);
        video.reviewCount++;
        video.avgrating = ((video.avgrating * (video.reviewCount - 1)) + rating) / video.reviewCount;

        await video.save();

        return res.status(201).json({ success: true, message: "Review added successfully.", review });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update a review
router.put("/update-review", authenticateToken, async (req, res) => {
    try {
        const { videoid, id } = req.headers; // User ID and Video ID from headers
        const { rating, comment } = req.body;

        if (!mongoose.Types.ObjectId.isValid(videoid) || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid user or video ID." });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const video = await Video.findById(videoid);
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found." });
        }

        const review = await Review.findOne({ user: id, video: videoid });
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found." });
        }

        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).json({ success: false, message: "Rating must be between 1 and 5." });
        }

        // Update review fields
        if (rating !== undefined) review.rating = rating;
        if (comment !== undefined) review.comment = comment;

        await review.save();

        // Update the video's average rating and review count
        const reviews = await Review.find({ video: videoid });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        video.avgrating = totalRating / reviews.length;

        await video.save();

        return res.status(200).json({ success: true, message: "Review updated successfully.", review });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Fetch a user's review for a video
router.get("/get-user-review/:videoid/:id", async (req, res) => {
    try {
        const { videoid, id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(videoid) || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid user or video ID." });
        }

        const review = await Review.findOne({ video: videoid, user: id });
        if (!review) {
            return res.status(404).json({ success: false, message: "No review found." });
        }

        return res.status(200).json({ success: true, data: review });
    } catch (error) {
        console.error("Error in /get-user-review:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error." });
    }
});

// Fetch all reviews for a video
router.get("/get-all-reviews/:videoid", async (req, res) => {
    try {
        const { videoid } = req.params;
        console.log("Video ID received:", videoid);
        // Validate video ID
        if (!mongoose.Types.ObjectId.isValid(videoid)) {
            return res.status(400).json({
                success: false,
                message: "Invalid video ID provided.",
            });
        }

        // Check if video exists
        const video = await Video.findById(videoid);
        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found.",
            });
        }

        // Fetch all reviews related to the video
        const reviews = await Review.find({ video: videoid })
            .populate("user", "name email") // Populate user details
            .select("-__v") // Exclude unnecessary fields
            .sort({ createdAt: -1 }); // Sort by most recent reviews

        // Check if reviews exist
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No reviews found for this video.",
            });
        }

        // Construct the response
        return res.status(200).json({
            success: true,
            message: `${reviews.length} reviews found for the video.`,
            reviews,
        });
    } catch (error) {
        console.error("Error in /get-all-reviews:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Please try again later.",
        });
    }
});


// Example: Define this in your backend if not already present
router.get("/review-summary/:videoid", async (req, res) => {
    const { videoid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoid)) {
        return res.status(400).json({ success: false, message: "Invalid video ID." });
    }

    try {
        const video = await Video.findById(videoid).populate("reviews");
        if (!video) {
            return res.status(404).json({ success: false, message: "Video not found." });
        }

        // Calculate the average rating
        const avgRating = video.reviews.reduce((acc, review) => acc + review.rating, 0) / video.reviews.length;

        return res.status(200).json({
            success: true,
            data: {
                totalReviews: video.reviews.length,
                avgRating: avgRating || 0,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error." });
    }
});

module.exports = router;