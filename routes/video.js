const express = require('express');
const router = express.Router();  // This initializes the router
const User = require('../models/user');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const Video = require('../models/video');
const { authenticateToken } = require("./userAuth");

//add video--admin
router.post("/add-video", authenticateToken, async (req, res) => {
    try {
        // Use req.user.id set by authenticateToken
        const user = await User.findById(req.user.id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You do not have access" });
        }

        // Create a new video
        const video = new Video({
            url: req.body.url,
            title: req.body.title,
            price: req.body.price,
            desc: req.body.desc,
            genre: req.body.genre,
            category:req.body.category,
            language: req.body.language,
            // Image path from `public/images`
        });

        // Save the video
        await video.save();
        return res.status(200).json({ message: "Video added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

});

//update video-details
router.put("/update-video", authenticateToken, async (req, res) => {
    try {
        const { videoid } = req.headers;
        await Video.findByIdAndUpdate(videoid, {
            url: req.body.url,
            title: req.body.title,
            price: req.body.price,
            desc: req.body.desc,
            genre: req.body.genre,
            category:req.body.category,
            language: req.body.language,

        });

        return res.status(200).json({ message: "Video Updated successfully" });
    } catch (error) {

        return res.status(500).json({ message: "An Error Occurred" });
    }
});

//delete video-admin
router.delete("/delete-video", authenticateToken, async (req, res) => {
    try {
        const { videoid } = req.headers;
        await Video.findByIdAndDelete(videoid);

        return res.status(200).json({ message: "Video Deleteted successfully" });

    } catch (error) {

        return res.status(500).json({ message: " an Error Occurred" });
    }
});

//get all video
router.get("/get-all-video", async (req, res) => {
    try {

        const videos = await Video.find().sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: videos,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//get recently added video
router.get("/get-recent-video", async (req, res) => {
    try {

        const videos = await Video.find().sort({ createdAt: -1 }).limit(10);
        return res.json({
            status: "Success",
            data: videos,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//get video by id
router.get("/get-video-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Video.findById(id).populate('reviews.user', 'username avatar');
        return res.json({
            status: "Success",
            data: video,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get All "CD" Videos
router.get("/get-cd-videos", async (req, res) => {
    try {
        const videos = await Video.find({ category: "CD" }).sort({ createdAt: -1 });
        return res.json({ status: "Success", data: videos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get All "DVD" Videos
router.get("/get-dvd-videos", async (req, res) => {
    try {
        const videos = await Video.find({ category: "DVD" }).sort({ createdAt: -1 });
        return res.json({ status: "Success", data: videos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Search Videos
router.get("/search-video", async (req, res) => {
    try {
        const { title } = req.query;

        // Only search by title using a case-insensitive regex
        if (!title) {
            return res.json({ status: "Success", data: [] });
        }

        // Create a case-insensitive regex for the title search
        const query = {
            title: new RegExp(title, 'i') // Case-insensitive search
        };

        const videos = await Video.find(query).sort({ createdAt: -1 });

        return res.json({ status: "Success", data: videos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;