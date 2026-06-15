const Order = require("../models/Order");
exports.createOrder = async (req, res) => {
  try {
    const order = new Order({
      userId: req.user.id,
      items: req.body.items,
      customer: req.body.customer,
      total: req.body.total,

      rentalStatus: "ACTIVE",
      rentalStartDate: new Date()
    });

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
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