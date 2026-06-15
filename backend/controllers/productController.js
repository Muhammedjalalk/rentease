// const Product = require("../models/Product");

// // ✅ Add Product
// exports.addProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     const savedProduct = await product.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Get All Products (with optional filter)
// exports.getProducts = async (req, res) => {
//   try {
//     const { category } = req.query;

//     let filter = {};
//     if (category) {
//       filter.category = category;
//     }

//     const products = await Product.find(filter);
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Get Single Product
// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Update Product
// exports.updateProduct = async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Delete Product
// exports.deleteProduct = async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);

//     if (!deletedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const Product = require("../models/Product");

// ================= ADD PRODUCT =================
exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      deposit,
      tenureOptions,
      offer,
      brand,
      color,
      material,
      dimensions
    } = req.body;

    // ✅ BASIC VALIDATION
    if (!name || !category || !deposit) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // ================= TENURE SAFE PARSE =================
    let parsedTenure = [];
    try {
      const raw = JSON.parse(tenureOptions || "[]");

      parsedTenure = raw
        .map(t => ({
          months: Number(t.months),
          price: Number(t.price),
        }))
        .filter(t =>
          Number.isFinite(t.months) &&
          Number.isFinite(t.price) &&
          t.months > 0 &&
          t.price > 0
        );
    } catch {
      return res.status(400).json({ message: "Invalid tenure format" });
    }

    if (parsedTenure.length === 0) {
      return res.status(400).json({ message: "Add valid tenure" });
    }

    // ================= OFFER SAFE PARSE =================
    let parsedOffer = {};
    try {
      parsedOffer = JSON.parse(offer || "{}");
    } catch {
      return res.status(400).json({ message: "Invalid offer format" });
    }

    // ================= IMAGES =================
    const images = req.files?.map(file => file.filename) || [];

    // ================= CREATE PRODUCT =================
    const product = new Product({
      name,
      category,
      description,
      deposit: Number(deposit),

      tenureOptions: parsedTenure,
      offer: parsedOffer,
      images,

      specifications: {
        brand,
        color,
        material,
        dimensions
      }
    });

    await product.save();

    res.status(201).json(product);

  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET ALL =================
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// ================= GET ONE =================
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch {
    res.status(500).json({ message: "Error fetching product" });
  }
};

// ================= UPDATE =================
exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      deposit,
      tenureOptions,
      offer,
      brand,
      color,
      material,
      dimensions
    } = req.body;

    // ================= TENURE SAFE PARSE =================
    let parsedTenure = [];
    try {
      const raw = JSON.parse(tenureOptions || "[]");

      parsedTenure = raw
        .map(t => ({
          months: Number(t.months),
          price: Number(t.price),
        }))
        .filter(t =>
          Number.isFinite(t.months) &&
          Number.isFinite(t.price) &&
          t.months > 0 &&
          t.price > 0
        );
    } catch {
      return res.status(400).json({ message: "Invalid tenure format" });
    }

    // ================= OFFER SAFE PARSE =================
    let parsedOffer = {};
    try {
      parsedOffer = JSON.parse(offer || "{}");
    } catch {
      return res.status(400).json({ message: "Invalid offer format" });
    }

    // ================= IMAGES =================
    const newImages = req.files?.map(file => file.filename) || [];

    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ================= UPDATE DATA =================
    const updatedData = {
      name,
      category,
      description,
      deposit: Number(deposit),

      tenureOptions: parsedTenure,
      offer: parsedOffer,

      specifications: {
        brand,
        color,
        material,
        dimensions
      },

      // ✅ SAFE IMAGE HANDLING
      images:
        newImages.length > 0
          ? newImages
          : existingProduct.images
    };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(product);

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= DELETE =================
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};