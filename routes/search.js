const express = require('express');
const router = express.Router();
const Video = require('../models/video');

router.get('/search', async (req, res) => {
    try {
        const query = req.query.q; // Get the search query from the request
        if (!query) {
            return res.status(400).json({ message: 'Query parameter is required' });
        }

        const regex = new RegExp(query, 'i'); // 'i' for case-insensitive search

        // Search videos by title, genre, or language
        const results = await Video.find({
            $or: [
                { title: { $regex: regex } },
                { genre: { $regex: regex } },
                { language: { $regex: regex } }
            ]
        }).limit(10); // Limit results for performance

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;