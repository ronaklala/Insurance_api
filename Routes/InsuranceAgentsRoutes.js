const express = require("express");
const Agent = require("../Models/InsuranceAgentSchema");
const router = express.Router();

router.post("/agent/agent_register", (req, res) => {
  const agent = new Agent(req.body);

  agent
    .save()
    .then((doc) => {
      res.status(200).json({ message: "Added" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Internal Server Error" });
    });
});

router.get("/agent/get_agents_data_no_verification", (req, res) => {
  const agents = Agent.find({ is_verified: false })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
