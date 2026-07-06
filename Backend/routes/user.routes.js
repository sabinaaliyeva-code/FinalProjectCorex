const express = require('express');
const userController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/user.middleware');


const userRouter = express.Router();

userRouter.post('/register',userMiddleware, userController.register);
userRouter.post('/login', userMiddleware, userController.login);
userRouter.get('/checkToken',userMiddleware, userController.checkToken );

module.exports = userRouter;