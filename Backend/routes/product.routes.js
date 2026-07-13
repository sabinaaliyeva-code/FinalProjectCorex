const express = require('express');
const productController = require('../controllers/products.controller');
const endpoints = require('../constants/endpoints');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');



const productRouter = express.Router();

productRouter.get(endpoints.products.getAll, productController.getAll);
productRouter.get(endpoints.products.getByID,   productController.getByID);
productRouter.post(endpoints.products.Post,  authMiddleware,adminMiddleware, productController.Post);
productRouter.patch(endpoints.products.Patch, authMiddleware,adminMiddleware, productController.Patch);
productRouter.delete(endpoints.products.Delete, authMiddleware, adminMiddleware, productController.Delete);


module.exports = productRouter;