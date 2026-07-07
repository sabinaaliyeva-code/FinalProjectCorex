const express = require('express');
const productController = require('../controllers/products.controller');
const endpoints = require('../constants/endpoints');
const authMiddleware = require('../middlewares/auth.middleware');



const productRouter = express.Router();

productRouter.get(endpoints.products.getAll, productController.getAll);
productRouter.get(endpoints.products.getByID,  authMiddleware,  productController.getByID);
productRouter.post(endpoints.products.Post,  authMiddleware, productController.Post);
productRouter.patch(endpoints.products.Patch, authMiddleware, productController.Patch);
productRouter.delete(endpoints.products.Delete, authMiddleware, productController.Delete);


module.exports = productRouter;