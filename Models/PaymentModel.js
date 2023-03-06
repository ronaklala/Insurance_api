const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const PaymentSchema = new mongoose.Schema(
  {
    aid: ObjectId,
    plan: String,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payments", PaymentSchema);

module.exports = Payment;
