const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: "Placed"
  },
  
  paymentMethod: {
  type: String,
  enum: ["COD", "UPI", "Card"],
  default: "COD"
},

paymentStatus: {
  type: String,
  enum: ["Pending", "Paid"],
  default: "Pending"
}
});

module.exports = mongoose.model("Order", orderSchema);