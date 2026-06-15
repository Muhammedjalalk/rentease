// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");

// // ➤ GET all products
// router.get("/", async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // ➤ GET single product
// router.get("/:id", async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // ➤ ADD product (Admin)
// router.post("/", async (req, res) => {
//     try {
//         const product = new Product(req.body);
//         const savedProduct = await product.save();
//         res.status(201).json(savedProduct);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");
// const multer = require("multer");

// // ✅ MULTER CONFIG
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // make sure folder exists
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// // ==============================
// // ➤ GET ALL PRODUCTS
// // ==============================
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     console.log("GET ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // ==============================
// // ➤ GET SINGLE PRODUCT
// // ==============================
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.json(product);
//   } catch (error) {
//     console.log("GET ONE ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // ==============================
// // ➤ ADD PRODUCT (WITH IMAGES)
// // ==============================
// router.post("/", upload.array("images", 4), async (req, res) => {
//   try {
//     const {
//       name,
//       category,
//       description,
//       monthlyRent,
//       deposit,
//       tenureOptions,
//       brand,
//       color,
//       material,
//       dimensions
//     } = req.body;

//     const product = new Product({
//       name,
//       category,
//       description,
//       monthlyRent,
//       deposit,
//       tenureOptions: tenureOptions
//         ? tenureOptions.split(",").map(Number)
//         : [],
//       images: req.files ? req.files.map(file => file.filename) : [],
//       specifications: {
//         brand,
//         color,
//         material,
//         dimensions
//       }
//     });

//     const savedProduct = await product.save();

//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.log("POST ERROR:", error);
//     res.status(400).json({ message: error.message });
//   }
// });

// // ==============================
// // ➤ DELETE PRODUCT
// // ==============================
// router.delete("/:id", async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Product deleted" });
//   } catch (error) {
//     console.log("DELETE ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // ==============================
// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");
// const multer = require("multer");

// // ================= MULTER CONFIG =================
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// // ================= GET ALL =================
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ================= GET ONE =================
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ================= CREATE =================
// router.post("/", upload.array("images", 4), async (req, res) => {
//   try {
//     const {
//       name,
//       category,
//       description,
//       monthlyRent,
//       deposit,
//       tenureOptions,
//       brand,
//       color,
//       material,
//       dimensions,
//         offer 
//     } = req.body;

//     const product = new Product({
//       name,
//       category,
//       description,
//       monthlyRent,
//       deposit,
//       tenureOptions: tenureOptions
//         ? tenureOptions.split(",").map(Number)
//         : [],
//       images: req.files.map(file => file.filename),
//       specifications: {
//         brand,
//         color,
//         material,
//         dimensions
//       }
//     });

//     const saved = await product.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.log("POST ERROR:", err);
//     res.status(400).json({ message: err.message });
//   }
// });

// // ================= UPDATE =================
// router.put("/:id", upload.array("images", 4), async (req, res) => {
//   try {
//     const {
//       name,
//       category,
//       description,
//       monthlyRent,
//       deposit,
//       tenureOptions,
//       brand,
//       color,
//       material,
//       dimensions
//     } = req.body;

//     const existingProduct = await Product.findById(req.params.id);

//     if (!existingProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // If new images uploaded → replace, else keep old
//     let images = existingProduct.images;
//     if (req.files && req.files.length > 0) {
//       images = req.files.map(file => file.filename);
//     }

//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         name,
//         category,
//         description,
//         monthlyRent,
//         deposit,
//         tenureOptions: tenureOptions
//           ? tenureOptions.split(",").map(Number)
//           : [],
//         images,
//         specifications: {
//           brand,
//           color,
//           material,
//           dimensions
//         }
//       },
//       { new: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     console.log("PUT ERROR:", err);
//     res.status(400).json({ message: err.message });
//   }
// });

// // ================= DELETE =================
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json({ message: "Product deleted successfully" });
//   } catch (err) {
//     console.log("DELETE ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");
// const multer = require("multer");

// // ================= MULTER CONFIG =================
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// // ================= GET ALL =================
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ================= GET ONE =================
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ================= CREATE PRODUCT =================
// router.post("/", upload.array("images", 4), async (req, res) => {
//   try {
//     const {
//       name,
//       category,
//       description,
//       monthlyRent,
//       deposit,
//       tenureOptions,
//       brand,
//       color,
//       material,
//       dimensions,
//       offer   // ✅ NEW
//     } = req.body;

//     // ✅ FIX OFFER (string → object)
//     let parsedOffer = {
//       isActive: false,
//       text: "",
//       discountPercent: 0
//     };

//     if (offer) {
//       parsedOffer = JSON.parse(offer);
//     }

//     const product = new Product({
//       name,
//       category,
//       description,
//       monthlyRent,
//       deposit,

//       // ✅ Convert "3,6,12" → [3,6,12]
//       tenureOptions: tenureOptions
//         ? tenureOptions.split(",").map(Number)
//         : [],

//       // ✅ Images
//       images: req.files ? req.files.map(file => file.filename) : [],

//       // ✅ Specifications
//       specifications: {
//         brand,
//         color,
//         material,
//         dimensions
//       },

//       // ✅ OFFER SAVE
//       offer: parsedOffer
//     });

//     const saved = await product.save();
//     res.status(201).json(saved);

//   } catch (err) {
//     console.log("POST ERROR:", err);
//     res.status(400).json({ message: err.message });
//   }
// });

// // ================= UPDATE PRODUCT =================
// router.put("/:id", upload.array("images", 4), async (req, res) => {
//   try {
//     const {
//       name,
//       category,
//       description,
//       monthlyRent,
//       deposit,
//       tenureOptions,
//       brand,
//       color,
//       material,
//       dimensions,
//       offer   // ✅ NEW
//     } = req.body;

//     const existingProduct = await Product.findById(req.params.id);

//     if (!existingProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // ✅ Keep old images if not updated
//     let images = existingProduct.images;
//     if (req.files && req.files.length > 0) {
//       images = req.files.map(file => file.filename);
//     }

//     // ✅ FIX OFFER
//     let parsedOffer = existingProduct.offer;
//     if (offer) {
//       parsedOffer = JSON.parse(offer);
//     }

//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         name,
//         category,
//         description,
//         monthlyRent,
//         deposit,

//         tenureOptions: tenureOptions
//           ? tenureOptions.split(",").map(Number)
//           : [],

//         images,

//         specifications: {
//           brand,
//           color,
//           material,
//           dimensions
//         },

//         // ✅ SAVE OFFER
//         offer: parsedOffer
//       },
//       { new: true }
//     );

//     res.json(updated);

//   } catch (err) {
//     console.log("PUT ERROR:", err);
//     res.status(400).json({ message: err.message });
//   }
// });

// // ================= DELETE =================
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json({ message: "Product deleted successfully" });

//   } catch (err) {
//     console.log("DELETE ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* ================= GET ALL ================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= GET ONE ================= */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= CREATE PRODUCT ================= */
router.post("/", upload.array("images", 4), async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      deposit,
      tenureOptions,
      brand,
      color,
      material,
      dimensions,
      offer
    } = req.body;

    // ================= FIX OFFER =================
    let parsedOffer = {
      isActive: false,
      text: "",
      discountPercent: 0
    };

    if (offer) {
      try {
        parsedOffer = JSON.parse(offer);
      } catch {
        parsedOffer = {
          isActive: false,
          text: "",
          discountPercent: 0
        };
      }
    }

    // ================= FIX TENURE (IMPORTANT) =================
    let parsedTenure = [];

    try {
      if (tenureOptions) {
        parsedTenure = JSON.parse(tenureOptions)
          .map(t => {
            const months = Number(t.months);
            const price = Number(t.price);

            return { months, price };
          })
          .filter(
            t =>
              Number.isFinite(t.months) &&
              Number.isFinite(t.price) &&
              t.months > 0 &&
              t.price > 0
          );
      }
    } catch (err) {
      parsedTenure = [];
    }

    const product = new Product({
      name,
      category,
      description,
      deposit: Number(deposit),

      tenureOptions: parsedTenure,

      images: req.files
        ? req.files.map(file => file.filename)
        : [],

      specifications: {
        brand,
        color,
        material,
        dimensions
      },

      offer: parsedOffer
    });

    const saved = await product.save();
    res.status(201).json(saved);

  } catch (err) {
    console.log("POST ERROR:", err);
    res.status(400).json({ message: err.message });
  }
});

/* ================= UPDATE PRODUCT ================= */
router.put("/:id", upload.array("images", 4), async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      deposit,
      tenureOptions,
      brand,
      color,
      material,
      dimensions,
      offer
    } = req.body;

    const existing = await Product.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ================= IMAGES =================
    let images = existing.images;

    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.filename);
    }

    // ================= OFFER =================
    let parsedOffer = existing.offer;

    if (offer) {
      try {
        parsedOffer = JSON.parse(offer);
      } catch {}
    }

    // ================= TENURE FIX =================
    let parsedTenure = [];

    try {
      if (tenureOptions) {
        parsedTenure = JSON.parse(tenureOptions)
          .map(t => {
            const months = Number(t.months);
            const price = Number(t.price);

            return { months, price };
          })
          .filter(
            t =>
              Number.isFinite(t.months) &&
              Number.isFinite(t.price) &&
              t.months > 0 &&
              t.price > 0
          );
      }
    } catch {
      parsedTenure = [];
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        description,
        deposit: Number(deposit),

        tenureOptions: parsedTenure,

        images,

        specifications: {
          brand,
          color,
          material,
          dimensions
        },

        offer: parsedOffer
      },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.log("PUT ERROR:", err);
    res.status(400).json({ message: err.message });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;