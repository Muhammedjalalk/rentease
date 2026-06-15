

const Order = require("../models/Order");
exports.extendRental = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    order.rentalStatus = "EXTENDED";

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};