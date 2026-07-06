const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Access denied. No token provided."})
    }
    const decoded = jwt.verify(token, "secret");
    if(!decoded){
        return res.status(401).json({message: "Access denied. Invalid token."});
    }
    next();
}

module.exports = authMiddleware;