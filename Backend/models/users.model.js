const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName:String,
    lastName:String,
    email:{
        type:String,
        unique:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    password:{
        type:String,
        required:true,

    }
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;