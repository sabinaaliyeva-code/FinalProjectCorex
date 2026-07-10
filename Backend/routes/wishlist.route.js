const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const wishlistController = require("../controllers/wishlist.controller");

const wishlistRouter = express.Router();

wishlistRouter.get("/wishlist",authMiddleware,wishlistController.getWishlist);
wishlistRouter.post("/wishlist/toggle",authMiddleware,wishlistController.toggleWishlist);
wishlistRouter.delete( "/wishlist",authMiddleware,wishlistController.clearWishlist);

module.exports = wishlistRouter;