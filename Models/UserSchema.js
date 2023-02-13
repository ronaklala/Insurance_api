const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: Number,
    pass: String,
    city: String,
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
