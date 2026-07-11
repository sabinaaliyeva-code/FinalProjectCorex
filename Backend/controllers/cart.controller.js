const Cart = require("../models/cart.model");


const cartController = {

    // Get user from data
    getCart: async (req, res) => {

        try {
            
            const cart = await Cart.findOne({user: req.user.id}).populate({path: "items.product",populate: {path: "category",},})
            res.status(200).json(cart);
        
        } catch (error) {
            
            res.status(500).json({message: error.message});
        }

    },


    // Add item to data
    addToCart: async (req, res) => {

        try {

            const {product,selectedColor,selectedSize, quantity} = req.body;

            let cart = await Cart.findOne({user: req.user.id }).populate({path: "items.product",populate: {path: "category",},})

            if (!cart) {

                cart = new Cart({ user: req.user.id,items: [] });
            }

            const existingItem = cart.items.find(item =>item.product._id.toString() === product && item.selectedColor === selectedColor && item.selectedSize === selectedSize);


            if (existingItem) {

                existingItem.quantity += quantity || 1;

            } else {

                cart.items.push({product,selectedColor,selectedSize,quantity: quantity || 1});
            }

            await cart.save();
            res.status(201).json(cart);

        } catch (error) {

            res.status(500).json({message: error.message});
        }

    },


    // increase item from data
    increaseQuantity: async (req, res) => {

        try {

            const { productId } = req.params;
            const { selectedColor, selectedSize } = req.body;

            const cart = await Cart.findOne({user: req.user.id }).populate({path: "items.product",populate: {path: "category",},})
            const item = cart.items.find(item =>item.product._id.toString() === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize );

            if (!item) {

                return res.status(404).json({message: "Product not found in cart"});

            }


            item.quantity++;

            await cart.save();
            res.status(200).json(cart);

        } catch (error) {

            res.status(500).json({message: error.message});
        }

    },


    // Decrease item from data
    decreaseQuantity: async (req, res) => {

        try {

            const { productId } = req.params;
            const { selectedColor, selectedSize } = req.body;


            const cart = await Cart.findOne({user: req.user.id}).populate({path: "items.product",populate: {path: "category",},})
            const item = cart.items.find(item =>item.product._id.toString() === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize);


            if (!item) {

                return res.status(404).json({message: "Product not found in cart"});

            }
           
            if (item.quantity > 1) {item.quantity--;}
            
            await cart.save();
            res.status(200).json(cart);


        } catch (error) {

            res.status(500).json({message: error.message});

        }

    },


    // Delete Items from data
    removeFromCart: async (req, res) => {

        try {

            const { productId } = req.params;
            const { selectedColor, selectedSize } = req.body;


            const cart = await Cart.findOne({user: req.user.id}).populate({path: "items.product",populate: {path: "category",},})

            cart.items = cart.items.filter(item => !(item.product._id.toString() === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize));
            await cart.save();
            res.status(200).json(cart);


        } catch (error) {

            res.status(500).json({message: error.message});
        }

    },


    // DELETE all items from data
    clearCart: async (req, res) => {

        try {

            const cart = await Cart.findOne({user: req.user.id}).populate({path: "items.product",populate: {path: "category",},})
            
            cart.items = [];
            await cart.save();
            res.status(200).json(cart);


        } catch (error) {

            res.status(500).json({message: error.message});

        }

    }

};


module.exports = cartController;