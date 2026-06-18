const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

// Add to Cart
router.post("/add-to-cart", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cartItem = await Cart.create({
      userId: req.user.id,
      productId,
      quantity
    });

    res.status(201).json({
      success: true,
      message: "Product Added to Cart ✅",
      cartItem
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View Cart
router.get("/cart", authMiddleware, async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id }).populate("productId");

    res.json(cartItems);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove from Cart
router.delete("/remove-cart/:id", authMiddleware, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product Removed from Cart ✅"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;