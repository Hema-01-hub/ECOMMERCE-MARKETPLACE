const express = require("express");
const router = express.Router();

const Review = require("../models/Review");
const authMiddleware = require("../middleware/authMiddleware");

// Add Review
router.post("/add-review", authMiddleware, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const review = await Review.create({
      userId: req.user.id,
      productId,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      message: "Review Added Successfully ⭐",
      review
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get Reviews for a Product
router.get("/reviews/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId
    })
    .populate("userId", "username");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;