const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  subcategory: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  offer: {
    type: Boolean,
    default: false
  },

  discountPercentage: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Product", productSchema);