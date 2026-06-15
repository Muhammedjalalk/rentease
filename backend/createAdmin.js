const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

async function createAdmin() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/rentease");
    console.log("✅ DB Connected");

    const hashed = await bcrypt.hash("admin123", 10);

    const admin = await Admin.create({
      email: "admin@gmail.com",
      password: hashed
    });

    console.log("✅ Admin created:", admin);

    process.exit();
  } catch (err) {
    console.log("❌ Error:", err);
  }
}

createAdmin();