const cartModel = require("../models/cart.model");
const Products = require("../models/products.model");


const productController = {

  // GET ALL PRODUCTS
 getAll: async (req, res) => {
  try {

    const {category,newArrival,featured,bestSeller, minPrice, maxPrice} = req.query;

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


    // Price filter
    if(minPrice || maxPrice){

      filter.price = {};

      if(minPrice){
        filter.price.$gte = Number(minPrice);
      }

      if(maxPrice){
        filter.price.$lte = Number(maxPrice);
      }

    }
    if (req.query.sale === "true") {

      filter.$expr = {$gt: ["$oldPrice", "$price"]};
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
      
      const {title,company,category,variants} = newData;

      const existingProduct = await Products.findOne({ title,company,  category });

      if (existingProduct) {

        variants.forEach((newVariant)=>{
          
          const oldVariant = existingProduct.variants.find((item)=> item.color === newVariant.color);

          if(oldVariant){
            
            newVariant.sizes.forEach((newSize)=>{

              const oldSize = oldVariant.sizes.find((item)=> item.size === newSize.size);

              if(oldSize){

                oldSize.stock += newSize.stock;

              }
              else{

                oldVariant.sizes.push(newSize);

              }


            });


          }
          else{

            existingProduct.variants.push(newVariant);

          }


        });



        await existingProduct.save();
          
        const updatedProduct = await Products.findById(existingProduct._id).populate("category");

        return res.status(200).json({message:"Product stock updated",product: updatedProduct });


      }



      
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