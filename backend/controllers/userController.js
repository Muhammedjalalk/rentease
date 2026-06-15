


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    await user.save();

    res.json({
      message: "Profile updated",
      user
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect"
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    res.json({
      message: "Password changed successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
};
// Uploade
const uploadAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.avatar = req.file.filename;

    await user.save();

    res.json({
      message: "Avatar uploaded",
      avatar: user.avatar
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
module.exports = {
  getProfile,
  updateProfile,
  changePassword,
   uploadAvatar
};