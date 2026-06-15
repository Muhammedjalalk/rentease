
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },

  deposit: { type: Number, required: true },

  // ✅ TENURE PRICING
  tenureOptions: [
    {
      months: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],

  // ✅ IMAGES
  images: { type: [String], default: [] },

  // ✅ SPECIFICATIONS
  specifications: {
    brand: String,
    color: String,
    material: String,
    dimensions: String
  },

  availability: { type: Boolean, default: true },

  // ✅ OFFER
  offer: {
    isActive: { type: Boolean, default: false },
    text: { type: String, default: "" },
    discountPercent: { type: Number, default: 0 }
  }

}, { timestamps: true });


module.exports = mongoose.model("Product", productSchema);