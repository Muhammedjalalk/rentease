const Order = require("../models/Order");
exports.returnRental = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    order.rentalStatus = "RETURNED";
    order.returnDate = new Date();

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};