const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const adminMiddleware = (req, res, next) => {
  try {

    if (!req.user) {
      return res.status(401).json({message: "Unauthorized. Please login first.",});
    }

    if (req.user.role !== "Admin") {
        return res.status(403).json({message: "Access denied. Admin only.",
      });
    }

    next();

  } catch (error) {

    res.status(500).json({ message: error.message,});

  }
};

module.exports = adminMiddleware;