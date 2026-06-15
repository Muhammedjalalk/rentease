// const express = require("express");
// const router = express.Router();

// const { registerUser, loginUser } = require("../controllers/authController");

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// module.exports = router;
// const express = require("express");
// const router = express.Router();

// const { registerUser, loginUser } = require("../controllers/authController");
// const { getProfile, updateProfile } = require("../controllers/userController");

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// // 👤 Profile Management
// router.get("/profile", getProfile);
// router.put("/profile", updateProfile);

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");

// const authMiddleware = require("../models/middleware/authMiddleware");
// const User = require("../models/User");

// const { registerUser, loginUser } = require("../controllers/authController");
// const { getProfile, updateProfile } = require("../controllers/userController");

// // Register & Login
// router.post("/register", registerUser);
// router.post("/login", loginUser);

// // Profile
// router.get("/profile", authMiddleware, getProfile);
// router.put("/profile", authMiddleware, updateProfile);

// // Change Password
// router.put("/change-password", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     const match = await bcrypt.compare(req.body.oldPassword, user.password);
//     if (!match) return res.status(400).send("Wrong password");

//     user.password = await bcrypt.hash(req.body.newPassword, 10);
//     await user.save();

//     res.send("Password updated");
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const productController = require("../controllers/productController");
// const multer = require("multer");
// const { registerUser, loginUser } = require("../controllers/authController");
// const { getProfile, updateProfile } = require("../controllers/userController");

// // ================= MULTER SETUP =================
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // make sure this folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });
// // ✅ AUTH ROUTES
// router.post("/register", registerUser);
// router.post("/login", loginUser);

// router.get("/profile", authMiddleware, getProfile);
// router.put("/profile", authMiddleware, updateProfile);

// // ================= ROUTES =================

// // ✅ ADD PRODUCT (IMPORTANT FIX)
// router.post(
//   "/",
//   upload.array("images", 4),   // 🔥 MUST for FormData
//   productController.addProduct
// );

// // ✅ GET ALL PRODUCTS
// router.get("/", productController.getProducts);

// // ✅ GET SINGLE PRODUCT
// router.get("/:id", productController.getProductById);

// // ✅ UPDATE PRODUCT
// router.put(
//   "/:id",
//   upload.array("images", 4),   // 🔥 IMPORTANT for update also
//   productController.updateProduct
// );

// // ✅ DELETE PRODUCT
// router.delete("/:id", productController.deleteProduct);

// module.exports = router;
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const { registerUser, loginUser } = require("../controllers/authController");
const { getProfile, updateProfile } = require("../controllers/userController");
const authMiddleware = require('../middleware/authMiddleware')// ✅ FIX

// ================= MULTER SETUP =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ✅ AUTH ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

// ================= ROUTES =================

// ADD PRODUCT
router.post("/", upload.array("images", 4), productController.addProduct);

// GET ALL PRODUCTS
router.get("/", productController.getProducts);

// GET SINGLE PRODUCT
router.get("/:id", productController.getProductById);

// UPDATE PRODUCT
router.put("/:id", upload.array("images", 4), productController.updateProduct);

// DELETE PRODUCT
router.delete("/:id", productController.deleteProduct);

module.exports = router;