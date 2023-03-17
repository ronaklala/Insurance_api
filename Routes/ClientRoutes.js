const express = require("express");
const { default: mongoose } = require("mongoose");
const contactAgent = require("../Models/ContactAgentSchema");
const Agent = require("../Models/InsuranceAgentSchema");
const User = require("../Models/UserSchema");
var nodemailer = require("nodemailer");
const ActivationMail = require("./AccountActivationMail");
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
    ActivationMail(msg, req.params.id);
  } else {
    msg = 2;
  }

  const agent = Agent.findByIdAndUpdate(req.params.id, {
    is_verified: msg,
  }).then((doc) => {
    res.status(200).json({ message: "Done" });
    ActivationMail(msg, req.params.id);
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
  let emails = [];

  Agent.find({
    city: req.params.city,
    type: req.params.type,
    category: req.params.cat,
  }).then((doc) => {
    for (let i = 0; i < doc.length; i++) {
      emails.push(doc[i].email);
    }

    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: "insuranceproject377@gmail.com",
        pass: "elpgvsftguesyvcy",
      },
    });
    transporter.verify((err, success) => {
      err
        ? console.log(err)
        : console.log(`=== Server is ready to take messages: ${success} ===`);
    });

    var mailOptions = {
      from: "Insurnace Email BOT 👥 <insuranceproject377@gmail.com>",
      to: emails,
      subject: "Client Request Appeared",
      html: `<!doctype html>
      <html lang="en-US">
      
      <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>New Account Email Template</title>
          <meta name="description" content="New Account Email Template.">
          <style type="text/css">
              a:hover {
                  text-decoration: underline !important;
              }
          </style>
      </head>
      
      <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
          
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
              style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
              <tr>
                  <td>
                      <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                          align="center" cellpadding="0" cellspacing="0">
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                  <a href="#" title="logo" target="_blank">
                                      <img width="180"
                                          src="https://i.ibb.co/KmbwVQg/logo-3e7528cb1aa6be19cf48.png"
                                          title="logo" alt="logo">
                                  </a>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                      style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                      <tr>
                                          <td style="padding:0 35px;">
                                              <h1
                                                  style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                  Someone has Requested to get insurance which you are providing. Login to Website Now or else you will miss the change to get a customer.
                                              </h1>
                                              <span
                                                  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                              <p
                                                  style="color:#455056; font-size:18px;line-height:20px; margin:0; font-weight: 500;">
                                                  <strong
                                                      style="display: block;font-size: 13px; margin: 0 0 4px; color:rgba(0,0,0,.64); font-weight:normal;">Type</strong>${req.params.type}
                                                  <strong
                                                      style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">City</strong>${req.params.city}
                                                  <strong
                                                      style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">Category</strong>${req.params.cat}
                                              </p>
      
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
          
      </body>
      
      </html>`,
    };

    contactAgent
      .find({
        uid: req.params.id,
        Category: req.params.cat,
        type: req.params.type,
        City: req.params.city,
      })
      .then((doc) => {
        if (doc.length >= 1) {
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
                  }).then(() => {});
                  const newcontact = new contactAgent();
                  newcontact.uid = req.params.id;
                  newcontact.result = 0;
                  newcontact.City = req.params.city;
                  newcontact.Category = req.params.cat;
                  newcontact.type = req.params.type;
                  newcontact.save().then(() => {
                    res.status(200).json({ message: "Done" });
                  });
                  transporter.sendMail(
                    mailOptions,
                    async function (error, info) {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log("Mail Sent" + info);
                      }
                    }
                  );
                }
              }
            })
            .catch((err) => {
              res.json({ message: "error" }).status(403);
            });
        }
      });
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
