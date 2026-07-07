const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    
  title: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  stock: Number
    



});

const Products = mongoose.model("Products",productSchema);

module.exports = Products; 