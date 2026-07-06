const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    
    title: String,
    description:String,
    price:Number,
    discount:Number,
    company:String,
    variants:[
        {
            size:String,
            color:String,
            stock:Number,
            image: String,
        }
    ],
    
    category:String,
    createdAt:{
        type:Date,
        default:Date.now,

    },
    productDetails:[{
        type: String,

    }],



});

const Products = mongoose.model("Products",productSchema);

module.exports = Products; 