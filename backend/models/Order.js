const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  items: [
    {
      productId: String,
      name: String,
      monthlyRent: Number,
      months: Number,
      deposit: Number
    }
  ],

  customer: {
    name: String,
    phone: String,

    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String
  },

  total: Number,

  paymentStatus: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING"
  },

  orderStatus: {
    type: String,
    enum: ["PLACED", "CONFIRMED", "DELIVERED"],
    default: "PLACED"
  },

  deliveryDate: {
    type: Date
  },

  rentalStatus: {
    type: String,
    enum: ["ACTIVE", "RETURNED", "EXTENDED"],
    default: "ACTIVE"
  },

  rentalStartDate: {
    type: Date,
    default: Date.now
  },

  rentalEndDate: {
    type: Date
  },

  returnDate: {
    type: Date
  },

  paymentId: String

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);