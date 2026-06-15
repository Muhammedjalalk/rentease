const express = require("express");
const router = express.Router();

const {
  createOrder,
  returnRental,
  extendRental
} = require("../controllers/orderController");

const auth = require('../middleware/authMiddleware')

router.post("/create", auth, createOrder);

router.put("/return/:id", auth, returnRental);

router.put("/extend/:id", auth, extendRental);

module.exports = router;