const express = require("express");
const User = require("../Models/UserSchema");
const router = express.Router();

router.post("/client/user/add", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  user
    .save()
    .then((doc) => {
      res.status(200).json({ message: "User added" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error" });
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

module.exports = router;
