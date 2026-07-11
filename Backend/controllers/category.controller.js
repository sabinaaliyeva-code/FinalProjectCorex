const Category = require("../models/categories.model");
const Products = require("../models/products.model");

const categoryController = {
  // GET ALL
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();

      const data = await Promise.all(
        categories.map(async (category) => {
          const products = await Products.find({
            category: category._id,
          });

          let stock = 0;

          products.forEach((product) => {
            product.variants.forEach((variant) => {
              variant.sizes.forEach((size) => {
                stock += size.stock;
              });
            });
          });

          return {
            ...category.toObject(),
            stock,
          };
        })
      );

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // GET BY ID
  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);

      if (!category) {
        return res.status(404).json({message: "Category not found",});
      }

      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({message: error.message,});
    }
  },

  // CREATE
  createCategory: async (req, res) => {
    try {
      const category = await Category.create(req.body);

      res.status(201).json({message: "Category created successfully",category,});
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  // UPDATE
  updateCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id,req.body,{ new: true });

      if (!category) {
        return res.status(404).json({message: "Category not found",});
      }

      res.status(200).json({message: "Category updated successfully",category, });
    } catch (error) {
      res.status(500).json({message: error.message,});
    }
  },

  // DELETE
  deleteCategory: async (req, res) => {
    try {
      const product = await Products.findOne({category: req.params.id,});

      if (product) {
        return res.status(400).json({message:"This category cannot be deleted because it contains products."});
      }

      const category = await Category.findByIdAndDelete(req.params.id);

      if (!category) {
        return res.status(404).json({message: "Category not found",});
      }

      res.status(200).json({
        message: "Category deleted successfully",});
    } catch (error) {
      res.status(500).json({message: error.message,});
    }
  },
};

module.exports = categoryController;