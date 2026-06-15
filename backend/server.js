

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const rentalRoutes = require("./routes/rentalRoutes");

require("dotenv").config();
console.log("ENV CHECK:", process.env.RAZORPAY_KEY_SECRET);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", userRoutes);
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/rentals", rentalRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/rentease")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));