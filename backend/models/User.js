

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },

  password: String,

  role: {
    type: String,
    enum: ["user", "admin", "staff"],
    default: "user"
  },

  phone: {
    type: String,
    default: ""
  },

  avatar: {
    type: String,
    default: ""
  },

  addresses: [
  {
    name: String,          // 👈 add this
    phone: String,         // 👈 add this

    line1: String,
    city: String,
    state: String,
    pincode: String,

    type: {                // 👈 add this
      type: String,
      enum: ["Home", "Office", "Other"],
      default: "Home"
    },

    isDefault: { type: Boolean, default: false }
  }
],

  isActive: {
    type: Boolean,
    default: true
  },

  lastLogin: Date
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);