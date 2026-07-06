const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");


const userController = {
    register: async (req, res) => {
        try {
             
            const newUser = req.body;
            newUser.password = await bcrypt.hash(newUser.password, 10);
            const existingUser = await User.findOne({ email: newUser.email});
            if (existingUser){
                return res.status(400).json({message: "User already exists"})
            }
            const user = await User(newUser);
            await user.save();
            res.status(201).json({message: "User registered successfully"});

        }
        catch(error){
            console.log(error);
            res.status(500).json({message: "Internal server error"});

        }
    },
    login: async (req, res) => {

        const {email, password} = req.body;
        try{
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({message: "User not found"});
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({message: "Invalid password"});

            }
            const token = jwt.sign({id: user._id}, "secret_key", {expiresIn: "1h"});
            res.status(200).json({message: "Login successful", token: token});
        }
        catch(error){
            console.log(error);
            res.status(500).json({message: "Internal server error"});
        }
    }
}

module.exports = userController;