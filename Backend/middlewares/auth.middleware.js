const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, "secret_key");

        req.user = decoded;   // ← ƏN VACİB SƏTİR

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Access denied. Invalid token."
        });
    }
};

module.exports = authMiddleware;