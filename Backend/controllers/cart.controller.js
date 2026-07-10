const Cart = require("../models/cart.model");


const cartController = {

    // GET /cart
    getCart: async (req, res) => {

        try {
            
            const cart = await Cart.findOne({user: req.user.id}).populate("items.product");
            res.status(200).json(cart);
        
        } catch (error) {
            
            res.status(500).json({message: error.message});
        }

    },


    // POST /cart
    addToCart: async (req, res) => {

        try {

            const {product,selectedColor,selectedSize, quantity} = req.body;

            let cart = await Cart.findOne({user: req.user.id });

            if (!cart) {

                cart = new Cart({ user: req.user.id,items: [] });
            }

            const existingItem = cart.items.find(item =>item.product.toString() === product && item.selectedColor === selectedColor && item.selectedSize === selectedSize);


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


    // PUT /cart/increase/:productId
    increaseQuantity: async (req, res) => {

        try {

            const { productId } = req.params;
            const { selectedColor, selectedSize } = req.body;

            const cart = await Cart.findOne({user: req.user.id });
            const item = cart.items.find(item =>item.product.toString() === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize );

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


    // PUT /cart/decrease/:productId
    decreaseQuantity: async (req, res) => {

        try {

            const { productId } = req.params;
            const { selectedColor, selectedSize } = req.body;


            const cart = await Cart.findOne({user: req.user.id});
            const item = cart.items.find(item =>item.product.toString() === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize);


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


    // DELETE /cart/:productId
    removeFromCart: async (req, res) => {

        try {

            const { productId } = req.params;
            const { selectedColor, selectedSize } = req.body;


            const cart = await Cart.findOne({user: req.user.id});

            cart.items = cart.items.filter(item => !(item.product.toString() === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize));
            await cart.save();
            res.status(200).json(cart);


        } catch (error) {

            res.status(500).json({message: error.message});
        }

    },


    // DELETE /cart
    clearCart: async (req, res) => {

        try {

            const cart = await Cart.findOne({user: req.user.id});
            
            cart.items = [];
            await cart.save();
            res.status(200).json(cart);


        } catch (error) {

            res.status(500).json({message: error.message});

        }

    }

};


module.exports = cartController;