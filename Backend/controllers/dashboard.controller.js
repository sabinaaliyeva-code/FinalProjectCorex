const Product = require("../models/products.model");
const Order = require("../models/orders.model");
const User = require("../models/users.model");


const dashboardController = {
  getDashboard: async (req, res) => {
    try {
      // TOTAL COUNTS
      const totalProducts = await Product.countDocuments();
      const totalOrders = await Order.countDocuments();
      const totalUsers = await User.countDocuments();
      

      // ORDERS
      const orders = await Order.find();

      // DELIVERED ORDERS
      const deliveredOrders = orders.filter((order) => order.orderStatus === "Delivered");

      // TOTAL REVENUE
      const totalRevenue = deliveredOrders.reduce((sum, order) => sum + order.totalPrice, 0 );

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

      // REVENUE BY MONTH
      const revenueByMonth = [];

      for (let month = 0; month < 12; month++) {
        const revenue = deliveredOrders

          .filter((order) => new Date(order.createdAt).getMonth() === month)
          .reduce((sum, order) => sum + order.totalPrice, 0);

        revenueByMonth.push({ month: months[month], revenue,});
      }

      // SALES OVERVIEW
      const salesOverview = [];

      for (let month = 0; month < 12; month++) {
        let sold = 0;

        orders.forEach((order) => {
          if (new Date(order.createdAt).getMonth() === month) {

            order.items.forEach((item) => { sold += item.quantity; });
          }
        });

        salesOverview.push({ month: months[month], sold,});
      }

      // BEST SELLING PRODUCTS
      const topProducts = [];

      orders.forEach((order) => {
        order.items.forEach((item) => {
          const existingProduct = topProducts.find((product) => product.title === item.title);

          if (existingProduct) {
            existingProduct.sold += item.quantity;
          } else {
            topProducts.push({ title: item.title, sold: item.quantity, });
          }
        });
      });

      topProducts.sort((a, b) => b.sold - a.sold);

      const bestSellingProducts = topProducts.slice(0, 5);

      res.status(200).json({
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue,
        revenueByMonth,
        salesOverview,
        bestSellingProducts,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = dashboardController;