const express = require("express");
const orderRouter = express.Router();

const ordersController = require("../controllers/orders.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");



orderRouter.post( "/orders",  authMiddleware, ordersController.createOrder);
orderRouter.get( "/orders/user", authMiddleware, ordersController.getUserOrders);
orderRouter.get( "/orders", authMiddleware,adminMiddleware, ordersController.getAllOrders);
orderRouter.patch( "/orders/:id",authMiddleware, adminMiddleware,ordersController.updateOrderStatus);
orderRouter.patch( "/orders/cancel/:id", authMiddleware,ordersController.cancelOrder);

module.exports = orderRouter;