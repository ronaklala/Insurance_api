const express = require("express");
const { default: mongoose } = require("mongoose");
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

router.post("/client/agent/get/:cat/:type/:city/:id", (req, res) => {
  contactAgent
    .find({
      uid: req.params.id,
      Category: req.params.cat,
      type: req.params.type,
      City: req.params.city,
    })
    .then((doc) => {
      if (doc.length === 1) {
        res.status(405).json({ message: "Already" });
      } else {
        Agent.find({
          credit: { $gte: 1 },
          category: req.params.cat,
          type: req.params.type,
          city: req.params.city,
        })
          .then((doc) => {
            if (doc.length === 0) {
              res.status(403).json({ message: "error" });
            } else {
              for (let i = 0; i < doc.length; i++) {
                Agent.findByIdAndUpdate(doc[i]._id, {
                  $inc: { credit: -1 },
                }).then(() => {
                  const newcontact = new contactAgent();
                  newcontact.uid = req.params.id;
                  newcontact.result = 0;
                  newcontact.City = req.params.city;
                  newcontact.Category = req.params.cat;
                  newcontact.type = req.params.type;
                  newcontact.save().then(() => {
                    res.status(200).json({ message: "Done" });
                  });
                });
              }
            }
          })
          .catch((err) => {
            res.json({ message: "error" }).status(403);
          });
      }
    });

  /* Finding all the agents with credit greater than or equal to 1, with the category, type and city as
  specified in the request parameters. */
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

router.get("/client/user/getApplications/:id", (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  contactAgent.find({ uid: id }).then((doc) => {
    res.status(200).json(doc);
  });
});

module.exports = router;
