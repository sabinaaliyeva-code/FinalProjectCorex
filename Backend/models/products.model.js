const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      default: 0,
    },
    sizes: [
      {
        type: Number,
      },
    ],
    variants: [
      {
        color: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        hex: {
          type: String,
          required: true,
        },
        stock: {
          type: Number,
          required: true,
        },

      },
    ],
  },
  {
    timestamps: true,
  }
);



const Products = mongoose.model("Products",productSchema);

module.exports = Products; 