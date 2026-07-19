const Order = require("../models/orders.model");
const Cart = require("../models/cart.model");
const Product = require("../models/products.model");


const ordersController = {
    getUserOrders: async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user.id,
    })
      .populate({path: "items.product",  populate: { path: "category", }, }).sort({ createdAt: -1 });

      res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({ message: error.message,});

  }
},

   getAllOrders: async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user") .populate({path: "items.product",populate: { path: "category", },}).sort({ createdAt: -1 });
       
      res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({ message: error.message,});

  }
},

  updateOrderStatus: async (req, res) => {
  try {

    const { id } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus,
      },
      {
         returnDocument: "after",
      }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found", });
    }

    res.status(200).json(order);

  } catch (error) {

    res.status(500).json({message: error.message, });

  }
},
createOrder: async (req, res) => {
  try {

    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({user: req.user.id, }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty",});
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of cart.items) {

      const product = item.product;
      const variant = product.variants.find((v) => v.color === item.selectedColor);

      if (!variant) {
        return res.status(400).json({ message: `${product.title}: Color not found`, });
      }

      const size = variant.sizes.find( (s) => s.size === item.selectedSize );

      if (!size) {
        return res.status(400).json({ message: `${product.title}: Size not found`, });
      }

      if (size.stock < item.quantity) {
        return res.status(400).json({ message: `${product.title}: Only ${size.stock} left in stock`, });
      }

      subtotal += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        title: product.title,
        image: variant.image,
        color: item.selectedColor,
        size: item.selectedSize,
        quantity: item.quantity,
        price: product.price,
      });

    }

    const shippingPrice = subtotal >= 200 ? 0 : 10;

    let discount = 0;
    const totalPrice =  subtotal + shippingPrice - discount;
    const order = await Order.create({

      user: req.user.id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingPrice,
      discount,
      totalPrice,

    });

    for (const item of cart.items) {

      const product = item.product;

      const variant = product.variants.find((v) => v.color === item.selectedColor);
      const size = variant.sizes.find( (s) => s.size === item.selectedSize );

      size.stock -= item.quantity;

      await product.save();

    }


    cart.items = [];

    await cart.save();

    res.status(201).json({message: "Order created successfully", order, });

  } catch (error) {

    res.status(500).json({ message: error.message,  });

  }
},


cancelOrder: async (req, res) => {
  try {

    const { id } = req.params;

    const order = await Order.findOne({ _id: id, user: req.user.id, });

    if (!order) {
      return res.status(404).json({  message: "Order not found",  });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({ message: "Order is already cancelled", });
    }

    if (order.orderStatus === "Shipped" || order.orderStatus === "Delivered" ) {

      return res.status(400).json({ message: "Order cannot be cancelled",});
    }

    

    for (const item of order.items) {

      const product = await Product.findById(item.product);

      if (!product) continue;

      const variant = product.variants.find( (v) => v.color === item.color );

      if (!variant) continue;

      const size = variant.sizes.find((s) => s.size == item.size );

      if (!size) continue;

      size.stock += item.quantity;

      await product.save();
    }

    order.orderStatus = "Cancelled";

    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order,});

  } catch (error) {

    res.status(500).json({ message: error.message, });

  }
},
  


};


module.exports = ordersController;