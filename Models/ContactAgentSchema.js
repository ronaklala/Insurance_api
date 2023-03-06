const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const contactAgentSchema = new mongoose.Schema(
  {
    uid: ObjectId,
    type: String,
    Category: String,
    City: String,
    aid: ObjectId,
    result: Number,
  },
  { timestamps: true }
);

const contactAgent = mongoose.model("contactAgents", contactAgentSchema);

module.exports = contactAgent;
