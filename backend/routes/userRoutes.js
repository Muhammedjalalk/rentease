// const express = require("express");
// const router = express.Router();

// const User = require("../models/User");
// const authMiddleware = require("../models/middleware/authMiddleware");
// const {
//   getProfile,
//   updateProfile,
//   changePassword,
//   uploadAvatar
// } = require("../controllers/userController");

// // ✅ ADD ADDRESS
// router.post("/address", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (req.body.isDefault) {
//       user.addresses.forEach(addr => addr.isDefault = false);
//     }

//     user.addresses.push(req.body);

//     await user.save();

//     res.json(user.addresses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update Adrass

// router.put("/address/:id", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     const address = user.addresses.id(req.params.id);

//     if (!address) {
//       return res.status(404).json({ message: "Address not found" });
//     }

//     Object.assign(address, req.body);

//     await user.save();

//     res.json(user.addresses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ✅ GET ADDRESS
// router.get("/address", authMiddleware, async (req, res) => {
//   const user = await User.findById(req.user.id);
//   res.json(user.addresses);
// });
// // Delete Address
// router.delete("/address/:id", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     user.addresses.pull(req.params.id);

//     await user.save();

//     res.json({
//       message: "Address deleted"
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post(
//   "/avatar",
//   authMiddleware,
//   upload.single("avatar"),
//   uploadAvatar
// );

// module.exports = router;

const express = require("express");
const router = express.Router();

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
  uploadAvatar
} = require("../controllers/userController");

// =====================
// PROFILE ROUTES
// =====================

router.get("/profile", authMiddleware, getProfile);

router.put("/profile", authMiddleware, updateProfile);

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

router.post(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadAvatar
);

// =====================
// ADDRESS ROUTES
// =====================

// ADD ADDRESS
router.post("/address", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (req.body.isDefault) {
      user.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    user.addresses.push(req.body);

    await user.save();

    res.json(user.addresses);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// GET ALL ADDRESSES
router.get("/address", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json(user.addresses);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// UPDATE ADDRESS
router.put("/address/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const address = user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({
        message: "Address not found"
      });
    }

    Object.assign(address, req.body);

    await user.save();

    res.json(user.addresses);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// DELETE ADDRESS
router.delete("/address/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.addresses.pull(req.params.id);

    await user.save();

    res.json({
      message: "Address deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;