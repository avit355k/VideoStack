const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ message: "authentication token Required" });
    }
    jwt.verify(token, "videoStore123", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "token expired.please sign in again" });
        }
        req.user = user;
        next();
    });

};


module.exports = { authenticateToken };