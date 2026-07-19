const cartModel = require("../models/cart.model");
const Products = require("../models/products.model");


const productController = {

  // GET ALL PRODUCTS
 getAll: async (req, res) => {
  try {

    const {category,newArrival,featured,bestSeller} = req.query;

    const filter = {};

    // Category Card filter
    if(category){
       filter.category = category;
    }


    // New arrival filter
    if(newArrival === "true"){
      filter.isNewArrival = true;
    }


    // Featured filter
    if(featured === "true"){
      filter.isFeatured = true;
    }


    // Best Seller filter
    if(bestSeller === "true"){
      filter.isBestSeller = true;
    }


    


    const products = await Products.find(filter).populate("category");
    res.status(200).json(products);


  }catch(error){

    res.status(500).json({message:error.message});
  }
},


  // GET PRODUCT BY ID
  getByID: async (req, res) => {

    try {

      const product = await Products.findById(req.params.id).populate("category");


      if (!product) {
        return res.status(404).json({ message: "Product not found"});
      }
      
      res.status(200).json(product);


    } catch (error) {

      res.status(500).json({message: error.message});

    }

  },


  // CREATE PRODUCT
  Post: async (req, res) => {

    try {

      const newData = req.body;

      const product = await Products.create(newData);
      
      res.status(201).json({message:"Product created successfully",product});



    } catch(error){

      res.status(500).json({message:error.message});

    }

  },


  // UPDATE PRODUCT
  Patch: async (req,res)=>{

    try {


      const product = await Products.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          returnDocument: "after",
        }
      ).populate("category");


      if(!product){

        return res.status(404).json({message:"Product not found"});

      }

      const newProduct = await Products.findById(product._id).populate("category");

      res.status(200).json({message:"Product updated successfully",product:newProduct});



    } catch(error){

      res.status(500).json({message:error.message});

    }

  },


  // DELETE PRODUCT
  Delete: async(req,res)=>{

    try {


      const product = await Products.findByIdAndDelete(req.params.id);

      if(!product){

        return res.status(404).json({message:"Product not found"});

      }

      await cartModel.updateMany( {},
          {
            $pull: {
              items: {
                product: req.params.id,
              },
            },
          }
      );




      res.status(200).json({message:"Product deleted successfully"});



    } catch(error){

      res.status(500).json({message:error.message});

    }

  }


};


module.exports = productController;