const express = require("express");

const categoryRouter = express.Router();

const categoryController = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");

categoryRouter.get("/category",categoryController.getAllCategories);
categoryRouter.get("/category/:id", categoryController.getCategoryById);
categoryRouter.post("/category", categoryController.createCategory);
categoryRouter.put("/category/:id", categoryController.updateCategory);
categoryRouter.delete("/category/:id",categoryController.deleteCategory);

module.exports = categoryRouter;