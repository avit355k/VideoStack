const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { authenticateToken } = require("./userAuth");
require('dotenv').config();

// Sign Up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Validate username length
        if (username.length < 4) {
            return res.status(400).json({ message: "Username length must be greater than 3" });
        }

        // Check if username exists
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Validate password length
        if (password.length <= 6) {
            return res.status(400).json({ message: "Password length must be greater than 6" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address,
        });

        await newUser.save();
        return res.status(201).json({ message: "Sign up successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Sign In
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password, role } = req.body;
        console.log(`Sign-in attempt for user: ${username},Role: ${role}`);  // Log username,role

        // Find user by username and role
        const existingUser = await User.findOne({ username, role });
        if (!existingUser) {
            console.log("Invalid username or role");
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check if password matches
        const isMatch = await bcrypt.compare(password, existingUser.password);
        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", existingUser.password);
        console.log("Password Match:", isMatch);
        if (!isMatch) {
            console.log("Invalid password");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const authClaims = {
            id: existingUser._id,
            name: existingUser.username,
            role: existingUser.role,
        };

        const token = jwt.sign(authClaims, process.env.JWT_SECRET, { expiresIn: "30d" });
        console.log("Token generated:", token);  // Log token generation

        return res.status(200).json({
            id: existingUser._id,
            role: existingUser.role,
            token: token,
        });
    } catch (error) {
        console.error("Sign-in error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get User Information
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const data = await User.findById(userId).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update Address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { address } = req.body;
        await User.findByIdAndUpdate(userId, { address: address });
        return res.status(200).json({ message: "Address updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Forgot Password: Generate OTP and Send Email
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User with this email does not exist" });
        }

        // Generate a 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000);

        // Set OTP expiry to 10 minutes from now
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        // Update user document
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send email with OTP
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is ${otp}. It will expire in 10 minutes.`,
        });
        console.log("OTP email sent");
        res.status(200).json({ message: "OTP sent to email" });
    } catch (mailError) {
        console.error("Failed to send email:", mailError);
        return res.status(500).json({ message: "Failed to send OTP email" });
    }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User with this email does not exist" });
        }

        // Check if OTP is valid
        if (user.otp !== parseInt(otp) || user.otpExpiry < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// Reset Password
router.post("/reset-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User with this email does not exist" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        console.log(`Password reset successfully for user: ${email}`);
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
