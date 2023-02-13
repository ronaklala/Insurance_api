const express = require("express");
const Admin = require("../Models/AdminSchema");
const router = express.Router();
const CryptoJS = require("crypto-js");
const User = require("../Models/UserSchema");

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

module.exports = router;
