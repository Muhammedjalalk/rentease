

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ LOGIN (THIS IS YOUR CODE)
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) return res.status(400).json({ message: "Wrong password" });

    // 🔥 TOKEN WITH ID
    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({
      token,
      user
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser };