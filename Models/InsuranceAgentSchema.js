const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const AgentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: Number,
    password: String,
    city: String,
    brand: String,
    type: String,
    category: String,
    document: String,
    is_verified: Number,
    credit: Number,
    profile_img: "",
    isVisible: Number,
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agents", AgentSchema);

module.exports = Agent;
