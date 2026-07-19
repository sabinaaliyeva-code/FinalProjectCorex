const express = require("express");
const dashboardRouter = express.Router();

const dashboardController = require("../controllers/dashboard.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

// GET DASHBOARD
dashboardRouter.get( "/dashboard", authMiddleware,adminMiddleware,dashboardController.getDashboard);

module.exports = dashboardRouter;