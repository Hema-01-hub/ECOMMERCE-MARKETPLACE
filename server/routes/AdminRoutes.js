const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// View All Orders (Admin Only)
router.get(
  "/all-orders",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("userId", "username email")
        .populate("items.productId");

      res.json(orders);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);
// Update Order Status - Admin Only
router.put(
  "/update-order-status/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { status } = req.body;

      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { returnDocument: "after" }
      );

      res.json({
        success: true,
        message: "Order Status Updated ✅",
        updatedOrder
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);
// View All Users - Admin Only
router.get(
  "/all-users",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const User = require("../models/User");

      const users = await User.find().select("-password");

      res.json(users);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

module.exports = router;