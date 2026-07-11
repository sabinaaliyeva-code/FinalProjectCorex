const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    oldPrice: {
      type: Number,
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
      min: 0,
      max: 5,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

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

        sizes: [
          {
            size: {
              type: Number,
              required: true,
            },

            stock: {
              type: Number,
              required: true,
              min: 0,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);


const Products = mongoose.model("Products", productSchema);

module.exports = Products;