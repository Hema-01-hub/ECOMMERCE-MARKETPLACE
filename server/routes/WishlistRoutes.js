const express = require("express");
const router = express.Router();

const Wishlist = require("../models/Wishlist");
const authMiddleware = require("../middleware/authMiddleware");

// Add to Wishlist
router.post("/add-to-wishlist", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;

    const item = await Wishlist.create({
      userId: req.user.id,
      productId
    });

    res.status(201).json({
      success: true,
      message: "Added to Wishlist ❤️",
      item
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// View Wishlist
router.get("/wishlist", authMiddleware, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      userId: req.user.id
    }).populate("productId");

    res.json(wishlist);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Remove from Wishlist
router.delete("/remove-wishlist/:id", authMiddleware, async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Removed from Wishlist ❌"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;