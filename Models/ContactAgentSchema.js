const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const contactAgentSchema = new mongoose.Schema(
  {
    uid: ObjectId,
    aid: ObjectId,
    result: Number,
  },
  { timestamps: true }
);

const contactAgent = mongoose.model("contactAgents", contactAgentSchema);

module.exports = contactAgent;
