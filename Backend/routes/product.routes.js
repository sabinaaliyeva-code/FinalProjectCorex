const express = require('express');
const productController = require('../controllers/products.controller');
const endpoints = require('../constants/endpoints');


const productRouter = express.Router();

productRouter.get(endpoints.products.getAll, productController.getAll);
productRouter.get(endpoints.products.getByID,  productController.getByID);
productRouter.post(endpoints.products.Post, productController.Post);
productRouter.patch(endpoints.products.Patch, productController.Patch);
productRouter.delete(endpoints.products.Delete, productController.Delete);


module.exports = productRouter;