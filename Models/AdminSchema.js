const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const adminSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: Number,
    password: String,
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admins", adminSchema);

module.exports = Admin;
