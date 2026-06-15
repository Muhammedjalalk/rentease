const express = require("express");
const router = express.Router();
const Rental = require("../models/Rental");

// Get Active Rentals
router.get("/active/:userId", async (req, res) => {
  try {
    const rentals = await Rental.find({
      user: req.params.userId,
      status: "ACTIVE",
    }).populate("product");

    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Return Rental
router.put("/return/:id", async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found",
      });
    }

    rental.status = "RETURNED";

    await rental.save();

    res.json({
      message: "Rental returned successfully",
      rental,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Extend Rental
router.put("/extend/:id", async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found",
      });
    }

    rental.endDate = new Date(
      rental.endDate.getTime() +
      30 * 24 * 60 * 60 * 1000
    );

    await rental.save();

    res.json({
      message: "Rental extended successfully",
      rental,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;