const express = require("express");

const categoryRouter = express.Router();

const categoryController = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

categoryRouter.get("/category",categoryController.getAllCategories);
categoryRouter.get("/category/:id",authMiddleware, adminMiddleware, categoryController.getCategoryById);
categoryRouter.post("/category",authMiddleware, adminMiddleware, categoryController.createCategory);
categoryRouter.put("/category/:id", authMiddleware, adminMiddleware,categoryController.updateCategory);
categoryRouter.delete("/category/:id",authMiddleware, adminMiddleware,categoryController.deleteCategory);

module.exports = categoryRouter;