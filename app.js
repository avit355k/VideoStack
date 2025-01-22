const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");


require("dotenv").config();
require("./connection/conn");

// Import routes

const User = require("./routes/user");
const Video = require("./routes/video");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Review = require("./routes/review");
const Orders = require("./routes/order");
const Search = require("./routes/search");
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Serve static files from the public/images directory
app.use("/images", express.static(path.join(__dirname, "public/images")));
// Use the routes from user.js
app.use("/api/v1", User);
app.use("/api/v1", Video);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Review);
app.use("/api/v1", Orders);
app.use("/api/v1", Search);



app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

 