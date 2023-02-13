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
  const agents = Agent.find({ is_verified: 0 })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/agent/get_single_agent/:id", (req, res) => {
  const id = req.params.id;

  const agent = Agent.findById(id).then((doc) => {
    res.json(doc);
  });
});

router.post("/admin/agent_login", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  const agent = Agent.find({ email: email }).then((doc) => {
    if (doc.length != 0) {
      if (doc[0].password === pass) {
        res.json(doc);
      } else {
        res.status(400).json({ mesage: "Passwords not match" });
      }
    } else {
      res.status(404).json({ message: "No EMailFound" });
    }
  });
});

router.post("/agent/update_agent/:id/:msg", (req, res) => {
  let msg;
  if (req.params.msg === "approve") {
    msg = 1;
  } else {
    msg = 2;
  }

  const agent = Agent.findByIdAndUpdate(req.params.id, {
    is_verified: msg,
  }).then((doc) => {
    res.status(200).json({ message: "Done" });
  });
});

router.get("/client/agents/get", (req, res) => {
  const agents = Agent.find({ is_verified: 1, credit: { $gte: 1 } })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/client/agent/get/:cat/:type/:city", (req, res) => {
  Agent.find({
    category: req.params.cat,
    type: req.params.type,
    city: req.params.city,
    credit: { $gte: 1 },
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
