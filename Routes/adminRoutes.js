const express = require("express");
const Admin = require("../Models/AdminSchema");
const router = express.Router();
const CryptoJS = require("crypto-js");
const User = require("../Models/UserSchema");
const Agent = require("../Models/InsuranceAgentSchema");

router.post("/admin/add", (req, res) => {
  let { name, email, password, phone } = req.body;
  password = CryptoJS.AES.encrypt(password, "Insurance").toString();
  const admins = new Admin({ name, email, password, phone });

  admins
    .save()
    .then((doc) => {
      res.status(200).json({ message: "Admin Added" });
    })
    .catch((err) => {
      res.status(403).json({ message: "Internal Server Error" });
    });
});

router.post("/admin/login", (req, res) => {
  const admins = Admin.findOne({ email: req.body.email })
    .then((doc) => {
      const password = CryptoJS.AES.decrypt(doc.password, "Insurance").toString(
        CryptoJS.enc.Utf8
      );
      if (password === req.body.password) {
        res.status(200).json({ message: "logged in" });
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: "No Admin Found" });
    });
});

router.get("/view-admins", (req, res) => {
  const admin = Admin.find({})
    .sort({ _id: -1 })
    .then((doc) => {
      if (doc) {
        res.json(doc);
      }
    });
});

router.get("/view-users", (req, res) => {
  const users = User.find({})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/admin/home", (req, res) => {
  let data = {
    users: null,
    unverified_agents: null,
    verified_agents: null,
    admins: null,
  };

  Promise.all([
    User.count().exec(),
    Agent.find({ is_verified: 0 }).count().exec(),
    Agent.find({ is_verified: 1 }).count().exec(),
    Admin.count().exec(),
  ]).then((counts) => {
    (data.users = counts[0]),
      (data.unverified_agents = counts[1]),
      (data.verified_agents = counts[2]),
      (data.admins = counts[3]);

    res.json(data);
  });
});

module.exports = router;
