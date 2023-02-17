const express = require("express");
const contactAgent = require("../Models/ContactAgentSchema");
const Agent = require("../Models/InsuranceAgentSchema");
const User = require("../Models/UserSchema");
const router = express.Router();

router.post("/client/user/add", (req, res) => {
  const check = User.find({ email: req.body.email }).then((doc) => {
    if (doc.length === 0) {
      const user = new User(req.body);

      user
        .save()
        .then((doc) => {
          res.status(200).json({ message: "User added" });
        })
        .catch((err) => {
          res.status(400).json({ message: "Error" });
        });
    } else {
      res.status(403).json({ message: "Already There" });
    }
  });
});

router.post("/client/user/login", (req, res) => {
  const user = User.find({ email: req.body.email })
    .then((doc) => {
      if (doc.length === 0) {
        res.status(400).json({ message: "No Doc Found" });
      }
      if (doc[0].pass === req.body.password) {
        res.status(200).json(doc);
      } else {
        res.status(401).json({ message: "Incorrect Email" });
      }
    })
    .catch((err) => {});
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

router.get("/client/agent/:id", (req, res) => {
  const agent = Agent.findById(req.params.id)
    .then((doc) => {
      if (doc) {
        res.json(doc);
      } else {
        res.status(404).json(null);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/client/contact/agent/:uid/:aid", (req, res) => {
  const detail = contactAgent
    .find({ uid: req.params.uid, aid: req.params.aid })
    .then((doc) => {
      if (doc.length === 0) {
        const contact = new contactAgent();

        contact.uid = req.params.uid;
        contact.aid = req.params.aid;
        contact.result = 0;

        contact.save().then((doc) => {
          res.status(200).json({ message: "Data Saved Successfully" });
        });
      } else {
        res.status(403).json({ message: "Already COntact" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: "Internal Error" });
    });
});

module.exports = router;
