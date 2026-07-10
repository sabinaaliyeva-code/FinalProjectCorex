const express = require('express');
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const cartRouter = express.Router();

cartRouter.get("/cart", authMiddleware, cartController.getCart);
cartRouter.post("/cart", authMiddleware, cartController.addToCart);
cartRouter.put("/cart/increase/:productId", authMiddleware, cartController.increaseQuantity);
cartRouter.put("/cart/decrease/:productId", authMiddleware, cartController.decreaseQuantity);
cartRouter.delete("/cart/:productId", authMiddleware, cartController.removeFromCart);
cartRouter.delete("/cart", authMiddleware, cartController.clearCart);

module.exports = cartRouter;