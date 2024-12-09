const express = require('express').Router();
const User = require('../models/user');
const { authenticateToken } = require("./userAuth");
const router = require('./video');


//put videos to add to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { videoid, id } = req.headers;
        const userData = await User.findById(id);
        const isVideoinCart = userData.cart.includes(videoid);

        if (isVideoinCart) {
            return res.json({
                status: "Success",
                message: "video is already in cart",
            });
        }
        await User.findByIdAndUpdate(id, {
            $push: { cart: videoid }
        });
        return res.json({
            status: "Success",
            message: "video added to cart",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//remove videos from add to cart list
router.put("/remove-video-from-cart/:videoid", authenticateToken, async (req, res) => {
    try {
        const { videoid } = req.params; 
        const { id } = req.headers;

        await User.findByIdAndUpdate(id, {
            $pull: { cart: videoid } 
        });
        return res.json({
            status: "Success",
            message: "video removed from cart",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//get cart videos of a particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cartVideos = userData.cart.reverse();
        return res.json({
            status: "Success",
            data: cartVideos,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;