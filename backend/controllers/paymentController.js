
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createPayment = async (req, res) => {
  try {
    console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
    console.log("KEY SECRET:", process.env.RAZORPAY_KEY_SECRET);
    const amount = req.body.amount;

    console.log("AMOUNT FROM FRONTEND:", amount);
    console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "receipt_" + Date.now()
    });

    console.log("ORDER CREATED:", order.id);

    res.json(order);

  } catch (error) {
    console.error("RAZORPAY ERROR:", error);

    res.status(500).json({
      message: "Payment creation failed",
      error: error.message
    });
  }
};