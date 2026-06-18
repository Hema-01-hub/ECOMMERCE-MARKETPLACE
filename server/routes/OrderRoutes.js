const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

// Place Order
router.post("/place-order", authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;

    const order = await Order.create({
  userId: req.user.id,
  items,
  totalAmount,
  paymentMethod,
  paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid"
});

    await Cart.deleteMany({ userId: req.user.id });

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully ✅",
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View My Orders
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("items.productId");

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;