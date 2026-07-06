const Products = require("../models/products.model");

const productController ={
getAll :  async (req, res)=>{

    try{
       const product=await Products.find({});
       res.send(product);
    }
    catch (error){
       console.log(error);
    }

 },
 getByID :  async (req, res)=>{
   
    try{
      const id=req.params.id;
      

      const product= await Products.findById(id);
      res.send(product);
    }
    catch (error){
      console.log(error);

    }


},
Post : async (req, res)=>{

    try{
       const newData=req.body;
       await Products.create(newData);
       res.send("Success");
   
    }
    catch (error){
      console.log(error);
    }
    
},
Patch :  async (req, res)=>{
   
    try{
      const id=req.params.id;
      const updateData=req.body;

      await Products.findByIdAndUpdate(id, updateData);
      res.send("success");
    }
    catch (error){
      console.log(error);

    }


},
Delete :  async (req, res)=>{
   
    try{
      const id=req.params.id;
      const updateData=req.body;

      await Products.findByIdAndDelete(id);
      res.send("success");
    }
    catch (error){
      console.log(error);

    }


}
}

module.exports = productController;