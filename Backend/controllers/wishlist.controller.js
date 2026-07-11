const Wishlist = require("../models/wishlist.model");


const wishlistController = {

  // GET WISHLIST
  getWishlist: async (req, res) => {

    try {

      let wishlist = await Wishlist.findOne({user: req.user.id }).populate({path: "products",populate: { path: "category", },})

      if (!wishlist) {
        wishlist = await Wishlist.create({user: req.user.id,products: []});
      }
      
      res.status(200).json(wishlist);

    } catch (error) {

      res.status(500).json({message: error.message});

    }

  },


  // TOGGLE WISHLIST
  toggleWishlist: async (req, res) => {

    try {

      const { productId } = req.body;


      let wishlist = await Wishlist.findOne({ user: req.user.id}).populate({path: "products",populate: { path: "category", },})



      if (!wishlist) {
        wishlist = await Wishlist.create({user: req.user.id, products: []})
      }

      const exists = wishlist.products.some((product) => product._id.toString() === productId);


      if (exists) {

        wishlist.products = wishlist.products.filter((product) => product._id.toString() !== productId);

      } else {

        wishlist.products.push(productId);

      }


      await wishlist.save();
      await wishlist.populate({path: "products",populate: { path: "category", },});
      res.status(200).json(wishlist);


    } catch (error) {

      res.status(500).json({message: error.message });

    }

  },


  // CLEAR WISHLIST
  clearWishlist: async (req, res) => {

    try {

      const wishlist = await Wishlist.findOne({user: req.user.id}).populate({path: "products",populate: { path: "category", },})



      if (!wishlist) {

        return res.status(404).json({message: "Wishlist not found"});

      }


      wishlist.products = [];

      await wishlist.save();


      res.status(200).json({message: "Wishlist cleared"});


    } catch (error) {

      res.status(500).json({message: error.message});

    }

  }

};


module.exports = wishlistController;