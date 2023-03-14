const express = require("express");
const Agent = require("../Models/InsuranceAgentSchema");
const contactAgent = require("../Models/ContactAgentSchema");
const Payment = require("../Models/PaymentModel");
const { default: mongoose } = require("mongoose");
const User = require("../Models/UserSchema");
var nodemailer = require("nodemailer");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51JGN72SBUj7Zk1FJw3eNZPtEhgK7VeDuUAu1rQPlrw1dW8qfFFaTxfUesKFfRRpC0ZTob0aDgzx4FEAk8DPldocF00lzYh1dQB"
);
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "https://insurance-api-five.vercel.app";

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
  "/agent/get_clients/:type/:category/:city",
  (req, res) => {
    const posts = contactAgent
      .aggregate([
        {
          $match: {
            result: { $lte: 0 },
            type: req.params.type,
            Category: req.params.category,
            City: req.params.city,
          },
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

router.post("/agent/StartWork/:id/:agent", (req, res) => {
  contactAgent.findById(req.params.id).then((doc) => {
    if (doc.aid === undefined) {
      contactAgent
        .findByIdAndUpdate(req.params.id, { result: 1, aid: req.params.agent })
        .then((doc) => {
          const data = {
            agent: null,
            client: null,
          };
          res.status(200).json({ message: "Done" });
          Agent.findById(req.params.agent).then((document) => {
            data.agent = document;
            User.findById(doc.uid).then((docs) => {
              data.client = docs;

              /*
              ---------------Mailer-----------------------
              */

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
                  : console.log(
                      `=== Server is ready to take messages: ${success} ===`
                    );
              });

              // transporter.use("compile", hbs(handlebarOptions));

              var mailOptions = {
                from: "Insurnace Email BOT 👥 <insuranceproject377@gmail.com>",
                to: data.client.email,
                subject: "Agent Replied",
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
                                                            Congratulations an Agent Has Decided to Work with you. Get the Details Below
                                                        </h1>
                                                        <span
                                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                        <p
                                                            style="color:#455056; font-size:18px;line-height:20px; margin:0; font-weight: 500;">
                                                            <strong
                                                                style="display: block;font-size: 13px; margin: 0 0 4px; color:rgba(0,0,0,.64); font-weight:normal;">Name</strong>${data.agent.name}
                                                            <strong
                                                                style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">City</strong>${data.agent.city}
                                                            <strong
                                                                style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">Category</strong>${data.agent.category}

                                                                <strong
                                                                style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">Phone Number</strong>${data.agent.phone}

                                                                <strong
                                                                style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">Email Address</strong>${data.agent.email}
                                                        </p>
                
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;You can contact them with the details given above. Thanks For using our Platform</td>
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
              transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                  console.log("Error" + error);
                } else {
                  console.log("Mail Sent" + info);
                }
              });
            });
          });
        });
    } else {
      res.status(405).json({ message: "Already Taken" });
    }
  });
});

router.post("/update/agent/", (req, res) => {
  /* Updating the profile image of the agent. */
  Agent.findByIdAndUpdate(req.body.agent_id, {
    profile_img: req.body.image,
  }).then((doc) => {
    res.json({ message: "Done" });
  });
});

router.post("/create-checkout-session/:pid/:plan/:aid", async (req, res) => {
  const session = await stripe.checkout.sessions
    .create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: req.params.pid,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:
        `${YOUR_DOMAIN}/success_payment/` +
        req.params.plan +
        "/" +
        req.params.aid +
        "/bdc1e778af50d37a791b04decdff766c806ed59c40bc240ef12eaf15a36ce8a75572505f26fa588ad4c9602304b58fce9",
      cancel_url: `${YOUR_DOMAIN}/canceled`,
    })
    .then((doc) => {
      res.redirect(303, doc.url);
    });
});

router.get("/success_payment/:plan/:aid/:rand", (req, res) => {
  if (req.params.plan === "standard") {
    Agent.findByIdAndUpdate(req.params.aid, { $inc: { credit: 20 } }).then(
      (doc) => {
        const payment = new Payment();
        payment.aid = req.params.aid;
        payment.plan = req.params.plan;

        payment.save().then((doc) => {
          res.redirect("https://insurance-agents.vercel.app/Payment-Success");
        });
      }
    );
  } else if (req.params.plan === "Gold") {
    Agent.findByIdAndUpdate(req.params.aid, { $inc: { credit: 50 } }).then(
      (doc) => {
        const payment = new Payment();
        payment.aid = req.params.aid;
        payment.plan = req.params.plan;

        payment.save().then((doc) => {
          res.redirect("https://insurance-agents.vercel.app/Payment-Success");
        });
      }
    );
  } else if (req.params.plan === "Platinum") {
    Agent.findByIdAndUpdate(req.params.aid, { $inc: { credit: 100 } }).then(
      (doc) => {
        const payment = new Payment();
        payment.aid = req.params.aid;
        payment.plan = req.params.plan;

        payment.save().then((doc) => {
          res.redirect("http://localhost:3001/Payment-Success");
        });
      }
    );
  }
});

router.get("/agent/get_txn/:id", (req, res) => {
  Payment.find({ aid: req.params.id }).then((doc) => {
    res.json(doc);
  });
});

router.get("/agent/get_headers/:aid", (req, res) => {
  const id = mongoose.mongo.ObjectId(req.params.aid);

  let data = {
    nop: "",
    tca: "",
    tcd: "",
    credits: "",
  };

  Promise.all([
    Payment.find({ aid: id }).count().exec(),
    Agent.find({ _id: id }).exec(),
    contactAgent.count().exec(),
    contactAgent.find({ aid: id }).count().exec(),
  ]).then((counts) => {
    (data.nop = counts[0]),
      (data.tca = counts[2]),
      (data.tcd = counts[3]),
      (data.credits = counts[1][0].credit),
      res.json(data);
  });
});

module.exports = router;
