const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

// ===============================
// Add Product (Protected Route)
// ===============================
router.post("/add-product", authMiddleware, async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product Added Successfully ✅",
      product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ===============================
// Get All Products
// ===============================
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// Update Product
// ===============================
router.put("/update-product/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after"
      }
    );

    res.json({
      success: true,
      message: "Product Updated Successfully ✅",
      updatedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// Delete Product
// ===============================
router.delete("/delete-product/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product Deleted Successfully ✅"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// Search Products
// ===============================
router.get("/search-products", async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const products = await Product.find({
      title: {
        $regex: keyword,
        $options: "i"
      }
    });

    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;