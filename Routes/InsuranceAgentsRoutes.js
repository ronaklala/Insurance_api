const express = require("express");
const Agent = require("../Models/InsuranceAgentSchema");
const contactAgent = require("../Models/ContactAgentSchema");
const router = express.Router();

router.post("/agent/agent_register", (req, res) => {
  const check = Agent.find({ email: req.body.email }).then((doc) => {
    if (doc.length === 0) {
      const agent = new Agent(req.body);

      agent
        .save()
        .then((doc) => {
          res.status(200).json({ message: "Added" });
        })
        .catch((err) => {
          res.status(400).json({ message: "Internal Server Error" });
        });
    } else {
      res.status(403).json({ message: "Already Exist" });
    }
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

router.get(
  "/agent/get_clients/",
  (req, res) => {
    let doc = [];
    const posts = contactAgent
      .aggregate([
        {
          $match: { result: { $lte: 0 } },
        },
        {
          $lookup: {
            from: "users",
            localField: "uid",
            foreignField: "_id",
            as: "user_details",
          },
        },
      ])
      .then((data) => {
        res.json(data);
      });
  },
  []
);

router.post("/agent/StartWork/:id", (req, res) => {
  contactAgent.findByIdAndUpdate(req.params.id, { result: 1 }).then((doc) => {
    Agent.findByIdAndUpdate(doc.aid, { $inc: { credit: -1 } }).then((doc) => {
      res.status(200).json({ message: "Started Work" });
    });
  });
});

module.exports = router;
