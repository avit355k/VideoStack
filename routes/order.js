const router = require('express').Router();
const User = require('../models/user');
const { authenticateToken } = require("./userAuth");
const Video = require('../models/video');
const Order = require("../models/orders");

// Place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOrder = new Order({ user: id, video: orderData._id });
            const orderDataFromDb = await newOrder.save();

            // Saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
            });

            // Clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id }
            });
        }

        return res.json({
            status: "Success",
            message: "Order Placed Successfully",
        });

    } catch (error) {
        console.log("Error placing order:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get order history of a particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "video" },
        });

        const ordersData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: ordersData,
        });

    } catch (error) {
        console.log("Error fetching order history:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all orders -- admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const ordersData = await Order.find()
            .populate("video")
            .populate("user")
            .sort({ createdAt: -1 });

        return res.json({
            status: "Success",
            data: ordersData,
        });

    } catch (error) {
        console.log("Error fetching all orders:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update order status -- admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Update the order's status
        await Order.findByIdAndUpdate(id, { status: req.body.status });

        return res.json({
            status: "Success",
            message: "Status Updated Successfully",
        });

    } catch (error) {
        console.log("Error updating order status:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

module.exports = router;
