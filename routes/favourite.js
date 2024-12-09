const express = require('express').Router();
const User = require('../models/user');
const { authenticateToken } = require("./userAuth");
const router = require('./video');

//add videos to favourites
router.put("/add-video-to-favourite", authenticateToken, async (req, res) => {
    try {
        const { videoid, id } = req.headers;
        const userData = await User.findById(id);
        const isVideoFavourite = userData.favourites.includes(videoid);
        if (isVideoFavourite) {
            return res.status(200).json({ message: "video is already in favourites list" });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: videoid } });
        return res.status(200).json({ message: "video is added to favourites list" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Remove videos from favourites list
router.put("/delete-video-from-favourite", authenticateToken, async (req, res) => {
    try {
        const { videoid, id } = req.headers;
        const userData = await User.findById(id);
        
        if (!userData.favourites.includes(videoid)) {
            return res.status(404).json({ message: "Video not found in favourites list" });
        }

        await User.findByIdAndUpdate(id, { $pull: { favourites: videoid } });
        return res.status(200).json({ message: "Video is removed from favourites list" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//get favourite videos of a particular user
router.get("/get-favourite-video", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouritesVideo = userData.favourites;
        return res.json({
            status: "Success",
            data: favouritesVideo,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;